import { readFile } from 'node:fs/promises';
import { stableShuffle } from '../src/utils/stableShuffleCore.mjs';

const failures = [];
const warnings = [];

// 1. Property test: with session-scoped seeds the correct answer must land on
// every position with roughly uniform frequency, for every target id.
const SESSION_COUNT = 200;
const TARGET_COUNT = 50;
const CHOICE_COUNT = 4;
const PER_TARGET_MIN = 0.10;
const PER_TARGET_MAX = 0.45;
const GLOBAL_MIN = 0.20;
const GLOBAL_MAX = 0.30;

const globalCounts = new Array(CHOICE_COUNT).fill(0);

for (let targetIndex = 0; targetIndex < TARGET_COUNT; targetIndex += 1) {
  const targetId = `t${String(targetIndex).padStart(4, '0')}`;
  const counts = new Array(CHOICE_COUNT).fill(0);

  for (let session = 0; session < SESSION_COUNT; session += 1) {
    const seed = `session-${session}:${targetId}-today-final`;
    const choices = stableShuffle(['correct', 'd1', 'd2', 'd3'], seed);
    const position = choices.indexOf('correct');
    if (position < 0) {
      failures.push(`stableShuffle lost an element for seed ${seed}`);
      break;
    }
    counts[position] += 1;
    globalCounts[position] += 1;
  }

  counts.forEach((count, position) => {
    const share = count / SESSION_COUNT;
    if (share < PER_TARGET_MIN || share > PER_TARGET_MAX) {
      failures.push(`${targetId}: position ${position + 1} share ${(share * 100).toFixed(1)}% is outside ${PER_TARGET_MIN * 100}%-${PER_TARGET_MAX * 100}%`);
    }
  });

  const distinctPositions = counts.filter((count) => count > 0).length;
  if (distinctPositions < CHOICE_COUNT) {
    failures.push(`${targetId}: correct answer only ever appears on ${distinctPositions}/${CHOICE_COUNT} positions across sessions`);
  }
}

globalCounts.forEach((count, position) => {
  const share = count / (SESSION_COUNT * TARGET_COUNT);
  if (share < GLOBAL_MIN || share > GLOBAL_MAX) {
    failures.push(`global: position ${position + 1} share ${(share * 100).toFixed(1)}% is outside ${GLOBAL_MIN * 100}%-${GLOBAL_MAX * 100}%`);
  }
});

// Sanity check of the method itself: a constant seed (no session component)
// must pin the correct answer to one position — the regression this audit exists to prevent.
{
  const positions = new Set();
  for (let session = 0; session < SESSION_COUNT; session += 1) {
    positions.add(stableShuffle(['correct', 'd1', 'd2', 'd3'], 't0000-today-final').indexOf('correct'));
  }
  if (positions.size !== 1) {
    failures.push('method sanity check failed: constant seed should produce a constant position');
  }
}

// 2. Static checks: review surfaces must compose their shuffle seeds with a
// session seed, and the shuffle implementation must have a single source.
const [today, carryover, dialogueRunner, lessonEngine] = await Promise.all([
  readFile('src/pages/TodayReviewPage.tsx', 'utf8'),
  readFile('src/components/lessons/A0CarryoverReview.tsx', 'utf8'),
  readFile('src/components/lessons/DialogueRunner.tsx', 'utf8'),
  readFile('src/components/lessons/A0LessonEngineV5.tsx', 'utf8'),
]);

if (!/stableShuffle\([^)]*`\$\{sessionSeed\}/.test(today)) {
  failures.push('TodayReviewPage must include sessionSeed in its shuffle seeds.');
}
if (!/stableShuffle\([^)]*`\$\{sessionSeed\}/.test(carryover)) {
  failures.push('A0CarryoverReview must include sessionSeed in its shuffle seeds.');
}
if (!/`\$\{sessionSeed\}:/.test(dialogueRunner)) {
  failures.push('DialogueRunner must keep its session-scoped dialogue choice seed.');
}
if (!/shuffle\(exercise\.choices,\s*`\$\{sessionSeed\}/.test(lessonEngine)) {
  failures.push('A0LessonEngineV5 must include sessionSeed in its exercise choice seed.');
}

const { execSync } = await import('node:child_process');
const localShuffleDefinitions = execSync(
  "grep -rln 'function stableShuffle' src --include='*.ts' --include='*.tsx' --include='*.mjs' || true",
  { encoding: 'utf8' },
).split('\n').filter(Boolean).filter((file) => !file.startsWith('src/utils/stableShuffleCore'));
if (localShuffleDefinitions.length > 0) {
  failures.push(`stableShuffle must only be defined in src/utils/stableShuffleCore.mjs; found copies in: ${localShuffleDefinitions.join(', ')}`);
}

// 3. Content-level report (warning only, content itself is not touched):
// dialogue data may not depend on the runner shuffle staying in place forever.
const correctIdCounts = { a: 0, b: 0, c: 0 };
const dataFiles = execSync("grep -rlo \"correctId:'[a-c]'\" src/data || true", { encoding: 'utf8' }).split('\n').filter(Boolean);
for (const file of dataFiles) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/correctId:'([a-c])'/g)) {
    const key = match[1];
    if (key === 'a' || key === 'b' || key === 'c') correctIdCounts[key] += 1;
  }
}
const totalCorrectIds = correctIdCounts.a + correctIdCounts.b + correctIdCounts.c;
if (totalCorrectIds > 0) {
  const aShare = correctIdCounts.a / totalCorrectIds;
  if (aShare > 0.6) {
    warnings.push(`dialogue data places the correct choice first in ${(aShare * 100).toFixed(0)}% of steps (${correctIdCounts.a}/${totalCorrectIds}); safe only while DialogueRunner keeps shuffling — flagged for a future content pass.`);
  }
}

warnings.forEach((warning) => console.warn(`WARN: ${warning}`));

if (failures.length) {
  console.error('Answer position audit failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Answer position audit: PASS');
console.log(`Checked ${TARGET_COUNT} targets x ${SESSION_COUNT} sessions; global position shares: ${globalCounts.map((count) => `${((count / (SESSION_COUNT * TARGET_COUNT)) * 100).toFixed(1)}%`).join(' / ')}`);
