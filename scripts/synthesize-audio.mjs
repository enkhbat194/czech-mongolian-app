#!/usr/bin/env node

/**
 * Generates app-owned Czech MP3 assets from an Azure Speech resource.
 *
 * Secrets stay only in .env.local. Do not put Azure keys in Git or chat.
 * Usage:
 *   npm run audio:dry
 *   npm run audio:generate
 *   node scripts/synthesize-audio.mjs --manifest audio/manifests/a0-1-sample.json --force
 */

import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const PROJECT_ROOT = process.cwd();
const DEFAULT_MANIFEST = 'audio/manifests/a0-1-sample.json';
const AUDIO_ROOT = path.resolve(PROJECT_ROOT, 'public/audio');

function hasFlag(name) {
  return process.argv.includes(name);
}

function valueAfter(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseEnv(content) {
  const parsed = {};
  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/gu, '');
    parsed[key] = value;
  }
  return parsed;
}

async function loadLocalEnvironment() {
  const envPath = path.resolve(PROJECT_ROOT, '.env.local');
  if (!await exists(envPath)) return;
  const local = parseEnv(await readFile(envPath, 'utf8'));
  for (const [key, value] of Object.entries(local)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function escapeXml(value) {
  return value
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&apos;');
}

function ensureSafeRelativeFile(file) {
  if (typeof file !== 'string' || !file.endsWith('.mp3')) {
    throw new Error('Manifest item.file нь .mp3 өргөтгөлтэй байх ёстой.');
  }
  const resolved = path.resolve(AUDIO_ROOT, file);
  if (!resolved.startsWith(`${AUDIO_ROOT}${path.sep}`)) {
    throw new Error(`Аюулгүй бус audio зам: ${file}`);
  }
  return resolved;
}

function createSsml({ text, voice, locale, rate = '-8%' }) {
  return [
    '<speak version="1.0" xml:lang="' + escapeXml(locale) + '">',
    '<voice name="' + escapeXml(voice) + '">',
    '<prosody rate="' + escapeXml(rate) + '">' + escapeXml(text) + '</prosody>',
    '</voice>',
    '</speak>',
  ].join('');
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function synthesize({ endpoint, key, outputFormat, locale, defaultVoice, item }) {
  const ssml = createSsml({
    text: item.text,
    voice: item.voice ?? defaultVoice,
    locale,
    rate: item.rate ?? '-8%',
  });

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'Ocp-Apim-Subscription-Key': key,
          'X-Microsoft-OutputFormat': outputFormat,
          'User-Agent': 'czech-mongolian-app-audio-builder',
        },
        body: ssml,
      });

      if (response.ok) return Buffer.from(await response.arrayBuffer());

      const responseText = (await response.text()).slice(0, 500);
      const retryable = response.status === 429 || response.status >= 500;
      lastError = new Error(`${item.id}: Azure HTTP ${response.status} — ${responseText}`);
      if (!retryable || attempt === 3) throw lastError;
      const retryAfter = Number(response.headers.get('retry-after'));
      await sleep(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 1200);
    } catch (error) {
      lastError = error;
      if (attempt === 3) throw error;
      await sleep(attempt * 1200);
    }
  }
  throw lastError;
}

async function main() {
  const manifestArg = valueAfter('--manifest') ?? DEFAULT_MANIFEST;
  const manifestPath = path.resolve(PROJECT_ROOT, manifestArg);
  const dryRun = hasFlag('--dry-run');
  const force = hasFlag('--force');

  if (!await exists(manifestPath)) {
    throw new Error(`Manifest олдсонгүй: ${manifestArg}`);
  }

  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const { locale, defaultVoice, outputFormat, items } = manifest;
  if (!locale || !defaultVoice || !outputFormat || !Array.isArray(items) || items.length === 0) {
    throw new Error('Manifest дотор locale, defaultVoice, outputFormat, items заавал байна.');
  }

  const summary = { created: 0, skipped: 0, failed: 0 };
  console.log(`Audio manifest: ${manifestArg}`);
  console.log(`Items: ${items.length}; voice: ${defaultVoice}; format: ${outputFormat}`);

  if (dryRun) {
    for (const item of items) {
      ensureSafeRelativeFile(item.file);
      if (!item.id || !item.text) throw new Error('Manifest item нь id, text-тэй байх ёстой.');
      console.log(`[DRY RUN] ${item.id} -> public/audio/${item.file}`);
    }
    console.log('Dry run амжилттай. Azure руу хүсэлт илгээгээгүй.');
    return;
  }

  await loadLocalEnvironment();
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) {
    throw new Error('Azure-ийн local credential болон region дутуу байна. audio/README.md зааврыг дага.');
  }

  const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  for (const item of items) {
    const destination = ensureSafeRelativeFile(item.file);
    if (!item.id || !item.text) {
      console.error(`Алгасав: id эсвэл text дутуу item.`);
      summary.failed += 1;
      continue;
    }

    if (!force && await exists(destination)) {
      console.log(`[SKIP] ${item.id} -> public/audio/${item.file}`);
      summary.skipped += 1;
      continue;
    }

    try {
      const mp3 = await synthesize({ endpoint, key, outputFormat, locale, defaultVoice, item });
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, mp3);
      console.log(`[OK] ${item.id} -> public/audio/${item.file}`);
      summary.created += 1;
    } catch (error) {
      console.error(`[FAILED] ${error instanceof Error ? error.message : String(error)}`);
      summary.failed += 1;
    }
  }

  console.log(`Дууслаа: шинээр ${summary.created}, алгассан ${summary.skipped}, алдаатай ${summary.failed}.`);
  if (summary.failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`Audio generation зогслоо: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
