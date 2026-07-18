import { readFile } from 'node:fs/promises';

const pages = [
  'src/pages/SpeakingPage.tsx',
  'src/pages/InteractiveLearningPage.tsx',
];

const forbiddenPatterns = [
  { pattern: /\bsimulate(?:Pronunciation|Recognition|Score)?\s*\(/i, label: 'simulated pronunciation result' },
  { pattern: /\b(?:mock|random)(?:Pronunciation|Recognition|Score)\b/i, label: 'mock pronunciation score' },
  { pattern: /\b(?:setPronunciationScore|setRecognitionScore|setAccuracyScore)\s*\(/i, label: 'automatic pronunciation score setter' },
  { pattern: /\bMOCK_SCORE\b/i, label: 'mock pronunciation score constant' },
];

function hasRandomScoring(content) {
  const lines = content.split('\n');
  return lines.some((line, index) => {
    if (!line.includes('Math.random')) return false;
    const context = lines.slice(Math.max(0, index - 3), index + 4).join(' ');
    return /\b(score|accuracy|pronunciation|recognition)\b/i.test(context);
  });
}

let failed = false;
for (const filePath of pages) {
  const content = await readFile(filePath, 'utf8');
  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(content)) {
      console.error(`Pronunciation integrity audit failed: ${filePath} contains ${label}.`);
      failed = true;
    }
  }
  if (hasRandomScoring(content)) {
    console.error(`Pronunciation integrity audit failed: ${filePath} uses Math.random near pronunciation scoring logic.`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Pronunciation integrity audit: PASS');
console.log('Random exercise ordering is allowed; simulated pronunciation scoring is not.');
