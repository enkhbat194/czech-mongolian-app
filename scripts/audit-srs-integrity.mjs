import { readFile } from 'node:fs/promises';

const enginePath = 'src/components/lessons/A0LessonEngineV5.tsx';
const engine = await readFile(enginePath, 'utf8');
const start = engine.indexOf('  const finish = () => {');
const end = engine.indexOf('  const startSpeaking = () => {');

if (start < 0 || end < 0 || end <= start) {
  console.error('SRS integrity audit failed: lesson finish boundary was not found.');
  process.exit(1);
}

const finishBody = engine.slice(start, end);
const forbidden = ['store.updateSRSCard(', 'store.markWordLearned('];
const failures = forbidden.filter((token) => finishBody.includes(token));
const required = ['store.addXP(', 'store.addMinutes(', 'store.updateStreak(', 'store.completeLesson(', 'store.unlockNextLesson('];
const missing = required.filter((token) => !finishBody.includes(token));

if (failures.length || missing.length) {
  console.error('SRS integrity audit failed.');
  for (const token of failures) console.error(`- Lesson completion must not call ${token}`);
  for (const token of missing) console.error(`- Lesson completion is missing ${token}`);
  process.exit(1);
}

console.log('SRS integrity audit: PASS');
console.log('Lesson completion awards progression only; mastery comes from attempt evidence.');
