import { a0ReferenceLessons } from './a0ReferenceLessons';
import { a0MemoryTargets, type A0MemoryTarget } from './a0MemoryPlan';
import { czechWords } from './czechWords';
import { normalizeCzechForContract } from './lessonDataContract';

// Practice pools are derived from what the learner actually says in the A0
// dialogues (correct replies) plus each lesson's take-away phrases. Staff-side
// lines are never learner production material, and gender-marked forms are
// held back from production until a learner profile exists.

const BANNED_PRODUCTION_NORMALIZED = new Set([
  'jsem novy',
  'jsem nova',
  'jsem tady sam',
  'jsem tady sama',
]);

function containsHardcodedName(czech: string) {
  return /\beba\b/.test(normalizeCzechForContract(czech));
}

const learnerSayNormalized = new Set<string>();
const staffNormalized = new Set<string>();

for (const lesson of Object.values(a0ReferenceLessons)) {
  const scenarios = [...Object.values(lesson.microDialogues), lesson.finalDialogue];
  for (const scenario of scenarios) {
    for (const step of scenario.steps) {
      staffNormalized.add(normalizeCzechForContract(step.staffCzech));
      const correct = step.choices.find((choice) => choice.id === step.correctId);
      if (correct) learnerSayNormalized.add(normalizeCzechForContract(correct.text));
    }
  }
  for (const phrase of lesson.completionPhrases) {
    learnerSayNormalized.add(normalizeCzechForContract(phrase));
  }
}

export function isA0StaffOnlyText(czech: string) {
  const normalized = normalizeCzechForContract(czech);
  return staffNormalized.has(normalized) && !learnerSayNormalized.has(normalized);
}

export function isBannedProductionText(czech: string) {
  return BANNED_PRODUCTION_NORMALIZED.has(normalizeCzechForContract(czech)) || containsHardcodedName(czech);
}

function isLearnerSayTarget(target: A0MemoryTarget) {
  const normalized = normalizeCzechForContract(target.czech);
  return learnerSayNormalized.has(normalized)
    && !isA0StaffOnlyText(target.czech)
    && !isBannedProductionText(target.czech);
}

const learnerSayTargets: readonly A0MemoryTarget[] = a0MemoryTargets.filter(
  (target) => target.priority === 'active' && isLearnerSayTarget(target),
);

export function getA0LearnerSayTargets(): readonly A0MemoryTarget[] {
  return learnerSayTargets;
}

const ipaByNormalizedCzech = new Map(
  czechWords.filter((word) => word.ipa).map((word) => [normalizeCzechForContract(word.czech), word.ipa]),
);

export function getA0PhraseIpa(czech: string): string {
  return ipaByNormalizedCzech.get(normalizeCzechForContract(czech)) ?? '';
}

function tokenCount(czech: string) {
  return normalizeCzechForContract(czech).split(' ').filter(Boolean).length;
}

// Introduced phrases first, so practice reinforces what a lesson already
// taught; the rest fill up the session for learners who raced ahead.
export function pickPracticeTargets(
  pool: readonly A0MemoryTarget[],
  introducedIds: readonly string[],
  limit: number,
): A0MemoryTarget[] {
  const introduced = new Set(introducedIds);
  const known = pool.filter((target) => introduced.has(target.id));
  const unknown = pool.filter((target) => !introduced.has(target.id));
  const order = (items: A0MemoryTarget[]) => [...items].sort(() => Math.random() - 0.5);
  return [...order(known), ...order(unknown)].slice(0, Math.max(0, limit));
}

export function getA0SpeakingPool(): readonly A0MemoryTarget[] {
  return learnerSayTargets;
}

// Short phrases only: production typing must not dead-end a beginner.
export function getA0ProductionPool(maxTokens = 4): readonly A0MemoryTarget[] {
  return learnerSayTargets.filter((target) => tokenCount(target.czech) <= maxTokens);
}

export interface A0FillBlankQuestion {
  id: string;
  czech: string;
  mongolian: string;
  before: string;
  answer: string;
  after: string;
  options: string[];
}

export function buildA0FillBlankQuestions(introducedIds: readonly string[], limit = 10): A0FillBlankQuestion[] {
  const pool = learnerSayTargets.filter((target) => tokenCount(target.czech) >= 2);
  const picked = pickPracticeTargets(pool, introducedIds, limit);
  const questions: A0FillBlankQuestion[] = [];

  for (const target of picked) {
    const pieces = target.czech.split(' ').filter(Boolean);
    if (pieces.length < 2) continue;
    const answer = pieces[pieces.length - 1];
    if (!answer) continue;
    const before = pieces.slice(0, -1).join(' ');
    const answerNormalized = normalizeCzechForContract(answer);
    const beforeNormalized = normalizeCzechForContract(before);

    const distractors: string[] = [];
    const seen = new Set([answerNormalized]);
    for (const other of pool) {
      if (distractors.length >= 3) break;
      if (other.id === target.id) continue;
      const otherPieces = other.czech.split(' ').filter(Boolean);
      const candidate = otherPieces[otherPieces.length - 1];
      if (!candidate) continue;
      const candidateNormalized = normalizeCzechForContract(candidate);
      if (!candidateNormalized || seen.has(candidateNormalized)) continue;
      // A distractor must not complete the prompt into another real phrase,
      // otherwise the question has two defensible answers.
      if (learnerSayNormalized.has(`${beforeNormalized} ${candidateNormalized}`.trim())) continue;
      seen.add(candidateNormalized);
      distractors.push(candidate.replace(/[.,!?]+$/, '') + (answer.match(/[.,!?]+$/)?.[0] ?? ''));
    }
    if (distractors.length < 2) continue;

    questions.push({
      id: target.id,
      czech: target.czech,
      mongolian: target.mongolian,
      before,
      answer,
      after: '',
      options: [answer, ...distractors].sort(() => Math.random() - 0.5),
    });
  }
  return questions;
}
