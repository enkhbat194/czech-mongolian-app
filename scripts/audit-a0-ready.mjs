import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const load = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const issues = [];

const normalize = (text) => text.toLocaleLowerCase('cs-CZ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,!?—-]/g, '').replace(/\s+/g, ' ').trim();
const vocabulary = load('src/data/czechWords.ts');
const lessons = load('src/data/lessons.ts');
const definitions = load('src/data/a0ReferenceLessons.ts') + '\n' + load('src/data/a0ReferenceNewLessons.ts');

const cards = [...vocabulary.matchAll(/\{\s*id:'([^']+)'\s*,\s*czech:'([^']+)'[\s\S]*?lessonId:'(l\d{3})'/g)].map((m) => ({ id: m[1], czech: m[2], lessonId: m[3] }));
const readyIds = [...lessons.matchAll(/\{\s*id:'(l\d{3})'[\s\S]*?status:'ready'\s*\}/g)].map((m) => m[1]);
const ids = new Set();
const phrases = new Set();
const totals = new Map();

for (const card of cards) {
  if (ids.has(card.id)) issues.push(`duplicate id: ${card.id}`);
  ids.add(card.id);
  const phrase = normalize(card.czech);
  if (phrases.has(phrase)) issues.push(`duplicate Czech phrase: ${card.czech}`);
  phrases.add(phrase);
  totals.set(card.lessonId, (totals.get(card.lessonId) || 0) + 1);
}

if (readyIds.length !== 6) issues.push(`ready lesson count must be 6, found ${readyIds.length}`);
if (!lessons.includes("wordCount:cardCount('l001')")) issues.push('ready lesson counts must be derived from canonical vocabulary');
for (const lessonId of readyIds) {
  if (!(totals.get(lessonId) || 0)) issues.push(`${lessonId} has no canonical cards`);
  if (!definitions.includes(`${lessonId}: defineA0Lesson`)) issues.push(`${lessonId} has no executable definition`);
}

console.log('A0 audit');
for (const lessonId of readyIds) console.log(`${lessonId}: ${totals.get(lessonId) || 0} cards`);
if (issues.length) {
  console.error(issues.map((item) => `- ${item}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS');
}
