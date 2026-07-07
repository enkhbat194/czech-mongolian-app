import { readFile } from 'node:fs/promises';

const pages = [
  'src/pages/SpeakingPage.tsx',
  'src/pages/InteractiveLearningPage.tsx',
];

const forbiddenPatterns = [
  { pattern: /Math\.random\s*\(/, label: 'random scoring' },
  { pattern: /\bsimulate\s*\(/i, label: 'simulated pronunciation result' },
  { pattern: /MOCK_SCORE/, label: 'mock pronunciation score' },
];

let failed = false;
for (const filePath of pages) {
  const content = await readFile(filePath, 'utf8');
  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(content)) {
      console.error(`Pronunciation integrity audit failed: ${filePath} contains ${label}.`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log('Pronunciation integrity audit: PASS');
