import { readFile } from 'node:fs/promises';

const [engine, home, path, layout, todayReview, phraseMemory] = await Promise.all([
  readFile('src/components/lessons/A0LessonEngineV5.tsx', 'utf8'),
  readFile('src/pages/HomePage.tsx', 'utf8'),
  readFile('src/pages/LearningPathPage.tsx', 'utf8'),
  readFile('src/components/Layout/Layout.tsx', 'utf8'),
  readFile('src/pages/TodayReviewPage.tsx', 'utf8'),
  readFile('src/stores/usePhraseMemoryStore.ts', 'utf8'),
]);

const failures = [];

// Extract a named arrow function body by counting braces, so the audit does
// not depend on indentation or on which function happens to come next.
function extractArrowFunctionBody(source, name, label) {
  const match = new RegExp(`const ${name}\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>\\s*\\{`).exec(source);
  if (!match) {
    failures.push(`${label}: const ${name} = () => { ... } was not found.`);
    return null;
  }
  let depth = 0;
  for (let index = match.index + match[0].length - 1; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(match.index, index + 1);
    }
  }
  failures.push(`${label}: const ${name} body has unbalanced braces.`);
  return null;
}

// Lesson completion only records study time, XP, streak, and progression.
// Card mastery may only change through card/exercise/dialogue attempt evidence.
const lessonFinish = extractArrowFunctionBody(engine, 'finish', 'A0LessonEngineV5');
if (lessonFinish) {
  const forbidden = ['store.updateSRSCard(', 'store.markWordLearned(', 'recordAttempt(', 'recordExposure('];
  const required = ['store.addXP(', 'store.addMinutes(', 'store.updateStreak(', 'store.completeLesson(', 'store.unlockNextLesson('];
  failures.push(
    ...forbidden.filter((token) => lessonFinish.includes(token)).map((token) => `Lesson completion must not call ${token}`),
    ...required.filter((token) => !lessonFinish.includes(token)).map((token) => `Lesson completion is missing ${token}`),
  );
}

// Today review completion must also stay free of mastery writes.
const reviewFinish = extractArrowFunctionBody(todayReview, 'finish', 'TodayReviewPage');
if (reviewFinish) {
  const forbidden = ['updateSRSCard(', 'recordAttempt(', 'recordExposure('];
  failures.push(
    ...forbidden.filter((token) => reviewFinish.includes(token)).map((token) => `Today review completion must not call ${token}`),
  );
}

// Mastery tiers must have exactly one definition, in the derived wrapper.
const tierDefinitions = (phraseMemory.match(/function getMasteryTier/g) ?? []).length;
if (tierDefinitions !== 1) {
  failures.push(`usePhraseMemoryStore must define getMasteryTier exactly once (found ${tierDefinitions}).`);
}
for (const [label, source] of [['A0LessonEngineV5', engine], ['TodayReviewPage', todayReview]]) {
  if (/function getMasteryTier/.test(source)) {
    failures.push(`${label} must import getMasteryTier from usePhraseMemoryStore, not define its own.`);
  }
}

// The repair loop must keep its per-target cap so a session can never loop forever.
if (!/MAX_REPAIRS_PER_TARGET/.test(todayReview) || !/<\s*MAX_REPAIRS_PER_TARGET/.test(todayReview)) {
  failures.push('TodayReviewPage must keep the MAX_REPAIRS_PER_TARGET repair cap and compare against it.');
}

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
console.log('Completion, mastery, repair cap, Home, Course Map, and Layout contracts agree.');
