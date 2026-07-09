import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const load = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const issues = [];

const expectedReadyLessonCount = 11;
// Czech accent marks can distinguish different words: být = байх, byt = байр.
// Do not strip diacritics when checking canonical card uniqueness.
const normalize = (text) => text.toLocaleLowerCase('cs-CZ').replace(/[.,!?—-]/g, '').replace(/\s+/g, ' ').trim();
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

if (readyIds.length !== expectedReadyLessonCount) issues.push(`ready lesson count must be ${expectedReadyLessonCount}, found ${readyIds.length}`);
if (!lessons.includes("wordCount:cardCount('l001')")) issues.push('ready lesson counts must be derived from canonical vocabulary');
for (const lessonId of readyIds) {
  if (!(totals.get(lessonId) || 0)) issues.push(`${lessonId} has no canonical cards`);
  if (!definitions.includes(`${lessonId}: defineA0Lesson`)) issues.push(`${lessonId} has no executable definition`);
}

const forbiddenLearnerTerms = [
  { label: 'A0-д / A0 дээр', pattern: /\bA0(?:-д|\s+д|\s+дээр|\s+түвшин(?:д)?)\b/i },
  { label: 'staff', pattern: /\bstaff\b/i },
  { label: 'formal', pattern: /\bformal\b/i },
  { label: 'chunk', pattern: /\bchunk\b/i },
  { label: 'pattern', pattern: /\bpattern\b/i },
  { label: 'case', pattern: /\bcase\b/i },
  { label: 'accusative', pattern: /\baccusative\b/i },
  { label: 'nominative', pattern: /\bnominative\b/i },
  { label: 'genitive', pattern: /\bgenitive\b/i },
  { label: 'dative', pattern: /\bdative\b/i },
  { label: 'locative', pattern: /\blocative\b/i },
  { label: 'instrumental', pattern: /\binstrumental\b/i },
  { label: 'noun', pattern: /\bnoun\b/i },
  { label: 'verb', pattern: /\bverb\b/i },
  { label: 'adjective', pattern: /\badjective\b/i },
  { label: 'adverb', pattern: /\badverb\b/i },
  { label: 'preposition', pattern: /\bpreposition\b/i },
];

const learnerFieldPattern = /(?:titleMn|canDoMn|description|mongolian|exampleTranslation|promptMn|feedbackMn|text|a0c\d{4}):'((?:\\'|[^'])*)'/g;
const auditFiles = ['src/data/lessons.ts', 'src/data/czechWords.ts', ...fs.readdirSync(path.join(root, 'src/data')).filter((name) => /^a0.*\.ts$/.test(name)).map((name) => `src/data/${name}`)];

for (const file of auditFiles) {
  const content = load(file);
  for (const match of content.matchAll(learnerFieldPattern)) {
    const value = match[1];
    for (const term of forbiddenLearnerTerms) {
      if (term.pattern.test(value)) issues.push(`learner-facing technical term "${term.label}" in ${file}: ${value}`);
    }
  }
}

console.log('A0 audit');
for (const lessonId of readyIds) console.log(`${lessonId}: ${totals.get(lessonId) || 0} cards`);
if (issues.length) {
  console.error(issues.map((item) => `- ${item}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS');
}
