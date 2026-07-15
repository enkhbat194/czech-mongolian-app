import { a0MemoryTargets, getPriorActiveTargetIds } from '../data/a0MemoryPlan';
import { getA0CarryoverSeedRank } from '../data/a0CarryoverSeeds';
import { useAppStore, type AppState, type SRSAttemptMeta, type SRSMistakeType, type SRSCard } from './useAppStore';

const MIN_ADAPTIVE_TARGETS = 2;
const DEFAULT_ADAPTIVE_TARGETS = 3;
const MAX_ADAPTIVE_TARGETS = 5;
const OVERDUE_DAY_MS = 24 * 60 * 60 * 1000;

export interface PhraseMemory {
  targetId: string;
  exposures: number;
  correctAttempts: number;
  incorrectAttempts: number;
  repetitions: number;
  nextReview: string;
  lastSeen: string;
  quality: SRSCard['quality'];
  lastResponseTimeMs: number;
  lastMistakeType: SRSMistakeType;
  correctStreak: number;
  lastAnswerAt: string;
  lastConfusedWith: string;
}

interface PhraseMemoryState {
  phrases: Record<string, PhraseMemory>;
  recordExposure: (targetId: string) => void;
  recordAttempt: (targetId: string, correct: boolean, attempt?: SRSAttemptMeta) => void;
  getCarryoverTargetIds: (lessonId: string, limit?: number) => string[];
  getTodayReviewTargetIds: (limit?: number) => string[];
}

let cachedCards: Record<string, SRSCard> | null = null;
let cachedPhrases: Record<string, PhraseMemory> = {};

function toPhraseMemory(card: SRSCard): PhraseMemory {
  return {
    targetId: card.wordId,
    exposures: card.exposures,
    correctAttempts: card.correctAttempts,
    incorrectAttempts: card.incorrectAttempts,
    repetitions: card.repetitions,
    nextReview: card.nextReview,
    lastSeen: card.lastReview,
    quality: card.quality,
    lastResponseTimeMs: card.lastResponseTimeMs,
    lastMistakeType: card.lastMistakeType,
    correctStreak: card.correctStreak,
    lastAnswerAt: card.lastAnswerAt,
    lastConfusedWith: card.lastConfusedWith,
  };
}

function isKnownMemoryTarget(targetId: string) {
  return a0MemoryTargets.some((target) => target.id === targetId);
}

function getPhrases(cards: Record<string, SRSCard>) {
  if (cachedCards === cards) return cachedPhrases;
  cachedCards = cards;
  cachedPhrases = Object.fromEntries(
    Object.entries(cards)
      .filter(([id]) => isKnownMemoryTarget(id))
      .map(([id, card]) => [id, toPhraseMemory(card)]),
  );
  return cachedPhrases;
}

export type MasteryTier = 'NEW' | 'WEAK' | 'FAMILIAR' | 'STRONG' | 'MASTERED';

export function getMasteryTier(memory: PhraseMemory | undefined): MasteryTier {
  if (!memory || memory.exposures <= 1) return 'NEW';
  if (memory.incorrectAttempts > memory.correctAttempts || memory.repetitions <= 1) return 'WEAK';
  if (memory.correctAttempts >= 5 && memory.repetitions >= 4 && memory.quality >= 4 && memory.correctStreak >= 2) return 'MASTERED';
  if (memory.correctAttempts >= 3 && memory.repetitions >= 3 && memory.quality >= 4) return 'STRONG';
  if (memory.correctAttempts >= 2 && memory.repetitions >= 2) return 'FAMILIAR';
  return 'WEAK';
}

function weaknessScore(memory: PhraseMemory) {
  return memory.incorrectAttempts * 4 - memory.correctAttempts + (memory.repetitions <= 1 ? 2 : 0) + (memory.correctStreak === 0 ? 1 : 0);
}

function isDue(memory: PhraseMemory | undefined, now: Date) {
  return memory ? new Date(memory.nextReview) <= now : false;
}

function isOverdue(memory: PhraseMemory | undefined, now: Date) {
  if (!memory) return false;
  return now.getTime() - new Date(memory.nextReview).getTime() >= OVERDUE_DAY_MS;
}

function isWeak(memory: PhraseMemory | undefined) {
  if (!memory) return true;
  return memory.incorrectAttempts > 0 || memory.repetitions <= 1 || memory.correctStreak === 0 || memory.quality < 4;
}

function clampTargetCount(value: number, total: number) {
  if (total <= 0) return 0;
  const upper = Math.min(MAX_ADAPTIVE_TARGETS, total);
  const lower = Math.min(MIN_ADAPTIVE_TARGETS, upper);
  return Math.min(upper, Math.max(lower, value));
}

function getAdaptiveTargetCount(targetIds: string[], phrases: Record<string, PhraseMemory>, now: Date) {
  const total = targetIds.length;
  if (total <= 0) return 0;

  const stats = targetIds.reduce(
    (acc, targetId) => {
      const memory = phrases[targetId];
      acc.missing += memory ? 0 : 1;
      acc.due += isDue(memory, now) ? 1 : 0;
      acc.overdue += isOverdue(memory, now) ? 1 : 0;
      acc.weak += isWeak(memory) ? 1 : 0;
      return acc;
    },
    { missing: 0, due: 0, overdue: 0, weak: 0 },
  );

  if (stats.overdue >= 2 || stats.missing + stats.due + stats.weak >= 5) return clampTargetCount(5, total);
  if (stats.due >= 3 || stats.weak >= 3 || stats.missing >= 3) return clampTargetCount(4, total);
  return clampTargetCount(DEFAULT_ADAPTIVE_TARGETS, total);
}

const stableActions = {
  recordExposure: (targetId: string) => {
    if (isKnownMemoryTarget(targetId)) useAppStore.getState().activateWordForReview(targetId);
  },
  recordAttempt: (targetId: string, correct: boolean, attempt?: SRSAttemptMeta) => {
    if (isKnownMemoryTarget(targetId)) useAppStore.getState().updateSRSCard(targetId, correct ? 4 : 1, attempt);
  },
  getCarryoverTargetIds: (lessonId: string, limit?: number) => {
    const phrases = getPhrases(useAppStore.getState().progress.srsCards);
    const now = new Date();
    const candidateIds = [...getPriorActiveTargetIds(lessonId)];
    const targetLimit = limit ?? getAdaptiveTargetCount(candidateIds, phrases, now);
    return candidateIds
      .sort((left, right) => {
        const a = phrases[left];
        const b = phrases[right];
        const aMissing = !a ? 1 : 0;
        const bMissing = !b ? 1 : 0;
        if (aMissing !== bMissing) return bMissing - aMissing;
        const aDue = isDue(a, now) ? 1 : 0;
        const bDue = isDue(b, now) ? 1 : 0;
        if (aDue !== bDue) return bDue - aDue;
        const aOverdue = isOverdue(a, now) ? 1 : 0;
        const bOverdue = isOverdue(b, now) ? 1 : 0;
        if (aOverdue !== bOverdue) return bOverdue - aOverdue;
        const aWeakness = a ? weaknessScore(a) : 0;
        const bWeakness = b ? weaknessScore(b) : 0;
        if (aWeakness !== bWeakness) return bWeakness - aWeakness;
        const aSeedRank = getA0CarryoverSeedRank(lessonId, left);
        const bSeedRank = getA0CarryoverSeedRank(lessonId, right);
        if (aSeedRank !== bSeedRank) return aSeedRank - bSeedRank;
        return (a?.lastSeen || '').localeCompare(b?.lastSeen || '');
      })
      .slice(0, targetLimit);
  },
  getTodayReviewTargetIds: (limit?: number) => {
    const phrases = getPhrases(useAppStore.getState().progress.srsCards);
    const now = new Date();
    const dueMemories = Object.values(phrases)
      .filter((memory) => {
        const target = a0MemoryTargets.find((item) => item.id === memory.targetId);
        return target?.priority === 'active' && memory.exposures > 0 && isDue(memory, now);
      });
    const targetLimit = limit ?? getAdaptiveTargetCount(dueMemories.map((memory) => memory.targetId), phrases, now);
    return dueMemories
      .sort((left, right) => {
        const delta = weaknessScore(right) - weaknessScore(left);
        return delta || new Date(left.nextReview).getTime() - new Date(right.nextReview).getTime();
      })
      .slice(0, targetLimit)
      .map((memory) => memory.targetId);
  },
};

function getPhraseMemoryState(app: AppState): PhraseMemoryState {
  return {
    phrases: getPhrases(app.progress.srsCards),
    ...stableActions,
  };
}

type Selector<T> = (state: PhraseMemoryState) => T;
type PhraseMemoryHook = {
  <T>(selector: Selector<T>): T;
  getState: () => PhraseMemoryState;
};

export const usePhraseMemoryStore: PhraseMemoryHook = Object.assign(
  <T,>(selector: Selector<T>) => useAppStore((app) => selector(getPhraseMemoryState(app))),
  {
    getState: () => getPhraseMemoryState(useAppStore.getState()),
  },
);
