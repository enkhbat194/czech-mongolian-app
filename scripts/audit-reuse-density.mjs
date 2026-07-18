import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const load = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const countMatches = (haystack, needle) => {
  if (!needle) return 0;
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
};

const wordFiles = [
  'src/data/czechWords.ts',
  'src/data/a0PeopleWords.ts',
  'src/data/a0WeatherWords.ts',
  'src/data/a0SafetyWords.ts',
  'src/data/a0FirstWeekWords.ts',
];

const sourceFiles = fs.readdirSync(path.join(root, 'src/data'))
  .filter((name) => name.endsWith('.ts'))
  .map((name) => `src/data/${name}`);

const vocabulary = wordFiles.map(load).join('\n');
const cards = [...vocabulary.matchAll(/\{\s*id:'([^']+)'\s*,\s*czech:'([^']+)'[\s\S]*?mongolian:'([^']+)'[\s\S]*?lessonId:'(l\d{3})'/g)]
  .map((match) => ({
    id: match[1],
    czech: match[2],
    mongolian: match[3],
    lessonId: match[4],
  }));

const lessonDefinitionFiles = [
  'src/data/a0ReferenceLessons.ts',
  'src/data/a0ReferenceNewLessons.ts',
].filter(exists);
const dialogueFiles = sourceFiles.filter((file) => /Dialogues|RealityDialogues/.test(path.basename(file)));
const memoryFiles = [
  'src/data/a0MemoryPlan.ts',
  'src/data/a0ExerciseMemoryMap.ts',
].filter(exists);
const nonVocabularyDataFiles = sourceFiles.filter((file) => !wordFiles.includes(file));

const joined = (files) => files.map(load).join('\n');
const lessonDefinitions = joined(lessonDefinitionFiles);
const dialogues = joined(dialogueFiles);
const memory = joined(memoryFiles);
const nonVocabularyData = joined(nonVocabularyDataFiles);

const byLesson = new Map();
const missing = [];
const weak = [];
const rows = cards.map((card) => {
  const definitionIdHits = countMatches(lessonDefinitions, card.id);
  const memoryIdHits = countMatches(memory, card.id);
  const dataIdHits = countMatches(nonVocabularyData, card.id);
  const dialoguePhraseHits = countMatches(dialogues, card.czech);
  const dataPhraseHits = countMatches(nonVocabularyData, card.czech);
  const totalReuseHits = definitionIdHits + memoryIdHits + dataIdHits + dialoguePhraseHits + dataPhraseHits;

  let status = 'OK';
  if (definitionIdHits === 0 && memoryIdHits === 0 && dataIdHits === 0 && dialoguePhraseHits === 0 && dataPhraseHits === 0) {
    status = 'MISSING';
    missing.push(card);
  } else if (dialoguePhraseHits === 0 || totalReuseHits < 3) {
    status = 'WEAK';
    weak.push({ ...card, totalReuseHits, dialoguePhraseHits, dataPhraseHits, definitionIdHits, memoryIdHits });
  } else if (dialoguePhraseHits >= 2 && totalReuseHits >= 6) {
    status = 'STRONG';
  }

  const current = byLesson.get(card.lessonId) || { total: 0, STRONG: 0, OK: 0, WEAK: 0, MISSING: 0 };
  current.total += 1;
  current[status] += 1;
  byLesson.set(card.lessonId, current);

  return { ...card, status, totalReuseHits, dialoguePhraseHits, dataPhraseHits, definitionIdHits, memoryIdHits };
});

console.log('A0 reuse density audit');
console.log(`cards: ${cards.length}`);
console.log(`source files: definitions=${lessonDefinitionFiles.length}, dialogues=${dialogueFiles.length}, memory=${memoryFiles.length}`);
console.log('');
console.log('By lesson:');
for (const lessonId of [...byLesson.keys()].sort()) {
  const item = byLesson.get(lessonId);
  console.log(`${lessonId}: total=${item.total} STRONG=${item.STRONG} OK=${item.OK} WEAK=${item.WEAK} MISSING=${item.MISSING}`);
}

const weakest = weak
  .sort((a, b) => a.totalReuseHits - b.totalReuseHits || a.dialoguePhraseHits - b.dialoguePhraseHits || a.lessonId.localeCompare(b.lessonId))
  .slice(0, 30);

if (weakest.length) {
  console.log('');
  console.log('Weakest items, non-blocking report:');
  for (const item of weakest) {
    console.log(`- ${item.lessonId} ${item.id} "${item.czech}" — total=${item.totalReuseHits}, dialogue=${item.dialoguePhraseHits}, memory=${item.memoryIdHits}`);
  }
}

if (missing.length) {
  console.error('');
  console.error('Missing items:');
  for (const item of missing) console.error(`- ${item.lessonId} ${item.id} "${item.czech}"`);
  process.exitCode = 1;
} else {
  console.log('');
  console.log('PASS');
}

if (!rows.length) {
  console.error('No A0 cards parsed. Reuse audit parser is stale.');
  process.exitCode = 1;
}
