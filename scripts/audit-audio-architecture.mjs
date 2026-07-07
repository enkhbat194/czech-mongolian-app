import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const sourceRoot = 'src';
const sharedSpeechPath = 'src/components/audio/czechSpeech.ts';
const compatibilityAdapterPath = 'src/components/lessons/dialogueAudio.ts';
const runtimeTokens = ['speechSynthesis', 'SpeechSynthesisUtterance'];

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
  }));

  return files.flat();
}

function fail(message) {
  console.error(`Audio architecture audit failed: ${message}`);
  process.exitCode = 1;
}

const sourceFiles = await collectSourceFiles(sourceRoot);
const sharedSpeech = await readFile(sharedSpeechPath, 'utf8');

for (const token of runtimeTokens) {
  if (!sharedSpeech.includes(token)) fail(`${sharedSpeechPath} must own the browser speech fallback.`);
}

for (const requiredExport of ['export function speakText', 'export function speakCzech', 'export function speakMongolian', 'export function cancelSpeech']) {
  if (!sharedSpeech.includes(requiredExport)) fail(`${sharedSpeechPath} is missing ${requiredExport}.`);
}

const adapter = await readFile(compatibilityAdapterPath, 'utf8');
if (!adapter.includes("from '../audio/czechSpeech'")) fail(`${compatibilityAdapterPath} must delegate to ${sharedSpeechPath}.`);
for (const token of runtimeTokens) {
  if (adapter.includes(token)) fail(`${compatibilityAdapterPath} must not reimplement ${token}.`);
}

const legacyCallSites = [];
for (const filePath of sourceFiles) {
  const relativePath = relative('.', filePath);
  if (relativePath === sharedSpeechPath || relativePath === compatibilityAdapterPath) continue;

  const content = await readFile(filePath, 'utf8');
  if (runtimeTokens.some((token) => content.includes(token))) legacyCallSites.push(relativePath);
}

if (legacyCallSites.length > 0) {
  fail(`direct browser TTS remains outside the shared helper:\n${legacyCallSites.map((filePath) => `  - ${filePath}`).join('\n')}`);
} else {
  console.log('Audio architecture audit: PASS');
  console.log(`Shared helper: ${sharedSpeechPath}`);
  console.log('Legacy browser-TTS call sites: 0');
}
