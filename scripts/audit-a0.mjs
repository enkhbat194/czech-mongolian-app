import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
const warnings = [];

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function addFailure(message) {
  failures.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function normalizeCzech(text) {
  return text
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?—-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const vocabulary = readFile('src/data/czechWords.ts');
const lessonMap = readFile('src/data/lessons.ts');
const referenceLessons = readFile('src/data/a0ReferenceLessons.ts') + '\n' + readFile('src/data/a0ReferenceNewLessons.ts');
const memoryPlan = readFile('src/data/a0MemoryPlan.ts');

const cards = [];
for (const match of vocabulary.matchAll(/\{\s*id:'([^']+)'\s*,\s*czech:'([^']+)'[\s\S]*?lessonId:'(l\d{3})'/g)) {
  cards.push({ id: match[1], czech: match[2], lessonId: match[3] });
}

if (cards.length === 0) addFailure('canonical vocabulary parser found no cards');

const cardIds = new Set();
const phrases = new Map();
const counts = new Map();
for (const card of cards) {
  if (cardIds.has(card.id)) addFailure(`duplicate card id: ${card.id}`);
  cardIds.add(card.id);

  const normalized = normalizeCzech(card.czech);
  const prior = phrases.get(normalized);
  if (prior) addFailure(`duplicate Czech phrase: ${card.czech} (${prior.id} / ${card.id})`);
  phrases.set(normalized, card);

  counts.set(card.lessonId, (counts.get(card.lessonId) || 0) + 1);
}

const readyLessons = [];
for (const match of lessonMap.matchAll(/\{\s*id:'(l\d{3})'[\s\S]*?wordCount:(\d+)[\s\S]*?status:'ready'\s*\}/g)) {
  readyLessons.push({ id: match[1], wordCount: Number(match[2]) });
}

if (readyLessons.length !== 6) addFailure(`expected 6 ready lessons, found ${readyLessons.length}`);

for (const lesson of readyLessons) {
  const actualCount = counts.get(lesson.id) || 0;
  if (actualCount === 0) addFailure(`${lesson.id} is ready but has no cards`);
  if (lesson.wordCount !== actualCount) addFailure(`${lesson.id} metadata=${lesson.wordCount}, canonical=${actualCount}`);
  if (!referenceLessons.includes(`${lesson.id}: defineA0Lesson`)) addFailure(`${lesson.id} has no executable lesson definition`);
}

const memoryIds = new Set();
for (const match of memoryPlan.matchAll(/id:\s*'([^']+)'/g)) memoryIds.add(match[1]);
for (const card of cards) {
  if (readyLessons.some((lesson) => lesson.id === card.lessonId) && !memoryIds.has(card.id)) {
    addWarning(`${card.id} has no direct memory target`);
  }
}

console.log('A0 structural audit');
console.log(`canonical cards: ${cards.length}`);
for (const lesson of readyLessons) console.log(`${lesson.id}: ${counts.get(lesson.id) || 0} cards`);

if (warnings.length) {
  console.log('\nwarnings:');
  warnings.forEach((message) => console.log(`- ${message}`));
}

if (failures.length) {
  console.error('\nfailures:');
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log('\nPASS');
}
