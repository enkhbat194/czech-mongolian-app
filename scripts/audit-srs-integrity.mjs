import { readFile } from 'node:fs/promises';

const [engine, home, path, layout] = await Promise.all([
  readFile('src/components/lessons/A0LessonEngineV5.tsx', 'utf8'),
  readFile('src/pages/HomePage.tsx', 'utf8'),
  readFile('src/pages/LearningPathPage.tsx', 'utf8'),
  readFile('src/components/Layout/Layout.tsx', 'utf8'),
]);

const start = engine.indexOf('  const finish = () => {');
const end = engine.indexOf('  const startSpeaking = () => {');

if (start < 0 || end < 0 || end <= start) {
  console.error('SRS integrity audit failed: lesson finish boundary was not found.');
  process.exit(1);
}

const finishBody = engine.slice(start, end);
const forbidden = ['store.updateSRSCard(', 'store.markWordLearned('];
const required = ['store.addXP(', 'store.addMinutes(', 'store.updateStreak(', 'store.completeLesson(', 'store.unlockNextLesson('];
const failures = [
  ...forbidden.filter((token) => finishBody.includes(token)).map((token) => `Lesson completion must not call ${token}`),
  ...required.filter((token) => !finishBody.includes(token)).map((token) => `Lesson completion is missing ${token}`),
];

if (!home.includes("setPage('a0Lesson')")) failures.push('Home must open the unified A0 lesson route.');
if (home.includes('const lessonPage')) failures.push('Home must not keep a legacy per-lesson route map.');
if (!path.includes("setPage('a0Lesson')")) failures.push('Course Map must open the unified A0 lesson route.');
if (!layout.includes("currentPage === 'a0Lesson'")) failures.push('Layout must render the unified A0 lesson route.');
if (!layout.includes('sentenceBuilder: SentenceBuilderPage')) failures.push('Layout must register Sentence Builder.');

if (failures.length) {
  console.error('Core learning integrity audit failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Core learning integrity audit: PASS');
console.log('Completion, mastery, Home, Course Map, and Layout contracts agree.');
