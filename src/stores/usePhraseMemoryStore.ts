import { a0MemoryTargets, getPriorActiveTargetIds } from '../data/a0MemoryPlan';
import { getA0CarryoverSeedRank } from '../data/a0CarryoverSeeds';
import { useAppStore, type AppState, type SRSAttemptMeta, type SRSMistakeType, type SRSCard } from './useAppStore';

export interface PhraseMemory {
  targetId: string;
  exposures: number;
  correctAttempts: number;
  incorrectAttempts: number;
  repetitions: number;
  nextReview: string;
  lastSeen: string;
  lastResponseTimeMs: number;
  lastMistakeType: SRSMistakeType;
  correctStreak: number;
  lastAnswerAt: string;
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
    lastResponseTimeMs: card.lastResponseTimeMs,
    lastMistakeType: card.lastMistakeType,
    correctStreak: card.correctStreak,
    lastAnswerAt: card.lastAnswerAt,
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

function weaknessScore(memory: PhraseMemory) {
  return memory.incorrectAttempts * 4 - memory.correctAttempts + (memory.repetitions <= 1 ? 2 : 0);
}

const stableActions = {
  recordExposure: (targetId: string) => {
    if (isKnownMemoryTarget(targetId)) useAppStore.getState().activateWordForReview(targetId);
  },
  recordAttempt: (targetId: string, correct: boolean, attempt?: SRSAttemptMeta) => {
    if (isKnownMemoryTarget(targetId)) useAppStore.getState().updateSRSCard(targetId, correct ? 4 : 1, attempt);
  },
  getCarryoverTargetIds: (lessonId: string, limit = 3) => {
    const phrases = getPhrases(useAppStore.getState().progress.srsCards);
    const now = new Date();
    return [...getPriorActiveTargetIds(lessonId)]
      .sort((left, right) => {
        const a = phrases[left];
        const b = phrases[right];
        const aMissing = !a ? 1 : 0;
        const bMissing = !b ? 1 : 0;
        if (aMissing !== bMissing) return bMissing - aMissing;
        const aDue = a && new Date(a.nextReview) <= now ? 1 : 0;
        const bDue = b && new Date(b.nextReview) <= now ? 1 : 0;
        if (aDue !== bDue) return bDue - aDue;
        const aWeakness = a ? weaknessScore(a) : 0;
        const bWeakness = b ? weaknessScore(b) : 0;
        if (aWeakness !== bWeakness) return bWeakness - aWeakness;
        const aSeedRank = getA0CarryoverSeedRank(lessonId, left);
        const bSeedRank = getA0CarryoverSeedRank(lessonId, right);
        if (aSeedRank !== bSeedRank) return aSeedRank - bSeedRank;
        return (a?.lastSeen || '').localeCompare(b?.lastSeen || '');
      })
      .slice(0, limit);
  },
  getTodayReviewTargetIds: (limit = 5) => {
    const phrases = getPhrases(useAppStore.getState().progress.srsCards);
    const now = new Date();
    return Object.values(phrases)
      .filter((memory) => {
        const target = a0MemoryTargets.find((item) => item.id === memory.targetId);
        return target?.priority === 'active' && memory.exposures > 0 && new Date(memory.nextReview) <= now;
      })
      .sort((left, right) => {
        const delta = weaknessScore(right) - weaknessScore(left);
        return delta || new Date(left.nextReview).getTime() - new Date(right.nextReview).getTime();
      })
      .slice(0, limit)
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
