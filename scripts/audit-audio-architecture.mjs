import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const sourceRoot = 'src';
const sharedSpeechPath = 'src/components/audio/czechSpeech.ts';
const compatibilityAdapterPath = 'src/components/lessons/dialogueAudio.ts';
const forbiddenRuntimeTokens = ['speechSynthesis', 'SpeechSynthesisUtterance'];

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

for (const filePath of sourceFiles) {
  const content = await readFile(filePath, 'utf8');
  const relativePath = relative('.', filePath);

  if (relativePath === sharedSpeechPath) continue;

  for (const token of forbiddenRuntimeTokens) {
    if (content.includes(token)) {
      fail(`${relativePath} contains ${token}. Only ${sharedSpeechPath} may implement browser TTS.`);
    }
  }
}

const sharedSpeech = await readFile(sharedSpeechPath, 'utf8');
for (const token of forbiddenRuntimeTokens) {
  if (!sharedSpeech.includes(token)) {
    fail(`${sharedSpeechPath} must remain the single browser TTS implementation.`);
  }
}

const adapter = await readFile(compatibilityAdapterPath, 'utf8');
if (!adapter.includes("from '../audio/czechSpeech'")) {
  fail(`${compatibilityAdapterPath} must delegate to ${sharedSpeechPath}.`);
}

console.log('Audio architecture audit: PASS');
