import { a0ReferenceLessons } from './a0ReferenceLessons';
import { a0MemoryTargets, type A0MemoryTarget } from './a0MemoryPlan';
import { getA0PhraseRole } from './a0PhraseRoles';
import { allCzechWords } from './allCzechWords';
import { normalizeCzechForContract } from './lessonDataContract';
import { personalizeLearnerText } from '../utils/learnerName';

export type PracticeGenderForm = 'male' | 'female' | 'neutral';

const GENDER_BANNED_NORMALIZED: Record<PracticeGenderForm, ReadonlySet<string>> = {
  male: new Set(['jsem nova', 'jsem tady sama']),
  female: new Set(['jsem novy', 'jsem tady sam']),
  neutral: new Set(['jsem novy', 'jsem nova', 'jsem tady sam', 'jsem tady sama']),
};

function containsHardcodedName(czech: string) {
  return /\beba\b/.test(normalizeCzechForContract(czech));
}

function hasUsableLearnerName(userName: string) {
  const value = userName.trim();
  return Boolean(value && value !== 'Суралцагч');
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

export function isBannedProductionText(czech: string, genderForm: PracticeGenderForm = 'neutral') {
  return GENDER_BANNED_NORMALIZED[genderForm].has(normalizeCzechForContract(czech)) || containsHardcodedName(czech);
}

function isProfileTargetAllowed(target: A0MemoryTarget, genderForm: PracticeGenderForm, userName: string) {
  if (getA0PhraseRole(target) !== 'profile-dependent') return true;
  if (target.czech.includes('{userName}')) return hasUsableLearnerName(userName);
  return !isBannedProductionText(target.czech, genderForm);
}

const activeTargets = a0MemoryTargets.filter((target) => target.priority === 'active');

export function getA0LearnerSayTargets(
  genderForm: PracticeGenderForm = 'neutral',
  userName = '',
): readonly A0MemoryTarget[] {
  return activeTargets.filter((target) => {
    const role = getA0PhraseRole(target);
    if (role !== 'learner-say' && role !== 'profile-dependent') return false;
    if (!isProfileTargetAllowed(target, genderForm, userName)) return false;
    return !isA0StaffOnlyText(target.czech) && !containsHardcodedName(target.czech);
  });
}

export function getA0ListeningTargets(
  genderForm: PracticeGenderForm = 'neutral',
  userName = '',
): readonly A0MemoryTarget[] {
  return activeTargets.filter((target) => {
    const role = getA0PhraseRole(target);
    if (role === 'support-only') return false;
    if (!isProfileTargetAllowed(target, genderForm, userName)) return false;
    return !containsHardcodedName(target.czech);
  });
}

const ipaByNormalizedCzech = new Map(
  allCzechWords.filter((word) => word.ipa).map((word) => [normalizeCzechForContract(word.czech), word.ipa]),
);

export function getA0PhraseIpa(czech: string): string {
  return ipaByNormalizedCzech.get(normalizeCzechForContract(czech)) ?? '';
}

export function personalizeA0PracticeTarget(target: A0MemoryTarget, userName: string): A0MemoryTarget {
  return {
    ...target,
    czech: personalizeLearnerText(target.czech, userName),
    mongolian: personalizeLearnerText(target.mongolian, userName),
    aliases: target.aliases?.map((alias) => personalizeLearnerText(alias, userName)),
  };
}

function tokenCount(czech: string) {
  return normalizeCzechForContract(czech).split(' ').filter(Boolean).length;
}

// Legacy session picker: introduced targets are first, then unknown targets may fill
// the remainder. New learner-facing practice pages must use pickIntroducedPracticeTargets.
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

export function pickIntroducedPracticeTargets(
  pool: readonly A0MemoryTarget[],
  introducedIds: readonly string[],
  limit: number,
): A0MemoryTarget[] {
  const introduced = new Set(introducedIds);
  return pool
    .filter((target) => introduced.has(target.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.max(0, limit));
}

export function getA0SpeakingPool(
  genderForm: PracticeGenderForm = 'neutral',
  userName = '',
): readonly A0MemoryTarget[] {
  return getA0LearnerSayTargets(genderForm, userName);
}

// Short phrases only: production typing must not dead-end a beginner.
export function getA0ProductionPool(
  maxTokens = 4,
  genderForm: PracticeGenderForm = 'neutral',
  userName = '',
): readonly A0MemoryTarget[] {
  return getA0LearnerSayTargets(genderForm, userName).filter((target) => tokenCount(target.czech) <= maxTokens);
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

export function buildA0FillBlankQuestions(
  introducedIds: readonly string[],
  limit = 10,
  genderForm: PracticeGenderForm = 'neutral',
  userName = '',
): A0FillBlankQuestion[] {
  const fullPool = getA0LearnerSayTargets(genderForm, userName)
    .filter((target) => tokenCount(target.czech) >= 2)
    .map((target) => personalizeA0PracticeTarget(target, userName));
  const introduced = new Set(introducedIds);
  const introducedPool = fullPool.filter((target) => introduced.has(target.id));
  const productionPhraseSet = new Set(fullPool.map((target) => normalizeCzechForContract(target.czech)));
  const picked = [...introducedPool].sort(() => Math.random() - 0.5).slice(0, Math.max(0, limit));
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
    for (const other of introducedPool) {
      if (distractors.length >= 3) break;
      if (other.id === target.id) continue;
      const otherPieces = other.czech.split(' ').filter(Boolean);
      const candidate = otherPieces[otherPieces.length - 1];
      if (!candidate) continue;
      const candidateNormalized = normalizeCzechForContract(candidate);
      if (!candidateNormalized || seen.has(candidateNormalized)) continue;
      const completed = `${beforeNormalized} ${candidateNormalized}`.trim();
      if (productionPhraseSet.has(completed)) continue;
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
