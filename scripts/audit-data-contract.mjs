import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const load = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const issues = [];
const wordFiles = [
  'src/data/czechWords.ts',
  'src/data/a0PeopleWords.ts',
  'src/data/a0WeatherWords.ts',
  'src/data/a0SafetyWords.ts',
  'src/data/a0FirstWeekWords.ts',
];

function normalizeCzech(text) {
  return text
    .toLocaleLowerCase('cs-CZ')
    // Czech accent marks can distinguish different words: být = байх, byt = байр.
    // Keep diacritics when checking canonical card uniqueness.
    .replace(/[.,!?—-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferSpeechType(targetText) {
  const normalized = normalizeCzech(targetText);
  const tokenCount = normalized ? normalized.split(' ').length : 0;
  if (/[.!?]/.test(targetText) || tokenCount >= 4) return 'sentence';
  if (tokenCount >= 2) return 'phrase';
  return 'word';
}

const vocabulary = wordFiles.map(load).join('\n');
const contract = load('src/data/lessonDataContract.ts');
const cards = [...vocabulary.matchAll(/\{\s*id:'([^']+)'\s*,\s*czech:'([^']+)'[\s\S]*?mongolian:'([^']*)'[\s\S]*?lessonId:'(l\d{3})'[\s\S]*?difficulty:'(easy|medium|hard)'\s*\}/g)]
  .map((match) => ({ id: match[1], czech: match[2], mongolian: match[3], lessonId: match[4], difficulty: match[5] }));

if (!contract.includes('targetText?: string')) issues.push('contract is missing targetText field');
if (!contract.includes('speechType?: A0SpeechType')) issues.push('contract is missing speechType field');
if (!contract.includes('acceptedVariants?: readonly string[]')) issues.push('contract is missing acceptedVariants field');
if (!contract.includes('audioPath?: string')) issues.push('contract is missing audioPath field');
if (!contract.includes('memoryTargetIds?: readonly string[]')) issues.push('contract is missing memoryTargetIds field');
if (!contract.includes('reuseOnly?: boolean')) issues.push('contract is missing reuseOnly field');
if (!cards.length) issues.push('no vocabulary cards found');

const ids = new Set();
const phrases = new Set();

for (const card of cards) {
  if (ids.has(card.id)) issues.push(`duplicate card id: ${card.id}`);
  ids.add(card.id);

  const normalizedPhrase = normalizeCzech(card.czech);
  if (!normalizedPhrase) issues.push(`${card.id} has empty Czech text`);
  if (phrases.has(normalizedPhrase)) issues.push(`duplicate Czech phrase: ${card.czech}`);
  phrases.add(normalizedPhrase);

  if (!card.mongolian.trim()) issues.push(`${card.id} has empty Mongolian translation`);

  const targetText = card.czech.trim();
  const speechType = inferSpeechType(targetText);
  const acceptedVariants = [targetText].map((item) => item.trim()).filter(Boolean);
  const audioPath = `/audio/words/${card.id}.mp3`;
  const memoryTargetIds = [card.id];

  if (!targetText) issues.push(`${card.id} has no effective targetText`);
  if (!['word', 'phrase', 'sentence'].includes(speechType)) issues.push(`${card.id} has invalid effective speechType`);
  if (!acceptedVariants.length) issues.push(`${card.id} has no effective acceptedVariants`);
  if (!audioPath.match(/^\/audio\/words\/a0c\d{4}\.mp3$/)) issues.push(`${card.id} has invalid effective audioPath: ${audioPath}`);
  if (!memoryTargetIds.length) issues.push(`${card.id} has no effective memoryTargetIds`);
}

console.log('A0 data contract audit');
console.log(`${cards.length} cards checked`);

if (issues.length) {
  console.error(issues.map((issue) => `- ${issue}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS');
}
