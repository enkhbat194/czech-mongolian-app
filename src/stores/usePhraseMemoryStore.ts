import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { a0MemoryTargets, getPriorActiveTargetIds } from '../data/a0MemoryPlan';
import { getA0CarryoverSeedRank } from '../data/a0CarryoverSeeds';

export interface PhraseMemory {
  targetId: string;
  exposures: number;
  correctAttempts: number;
  incorrectAttempts: number;
  repetitions: number;
  nextReview: string;
  lastSeen: string;
}

interface PhraseMemoryState {
  phrases: Record<string, PhraseMemory>;
  recordExposure: (targetId: string) => void;
  recordAttempt: (targetId: string, correct: boolean) => void;
  getCarryoverTargetIds: (lessonId: string, limit?: number) => string[];
  getTodayReviewTargetIds: (limit?: number) => string[];
}

function tomorrowIso() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString();
}

function createMemory(targetId: string): PhraseMemory {
  const now = new Date().toISOString();
  return {
    targetId,
    exposures: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    repetitions: 0,
    nextReview: tomorrowIso(),
    lastSeen: now,
  };
}

function nextReviewDate(repetitions: number, correct: boolean) {
  const date = new Date();
  const days = correct
    ? repetitions <= 1 ? 1 : repetitions === 2 ? 3 : repetitions === 3 ? 7 : repetitions === 4 ? 14 : 30
    : 0;
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function weaknessScore(memory: PhraseMemory) {
  return memory.incorrectAttempts * 4 - memory.correctAttempts + (memory.repetitions === 0 ? 2 : 0);
}

export const usePhraseMemoryStore = create<PhraseMemoryState>()(
  persist(
    (set, get) => ({
      phrases: {},

      recordExposure: (targetId) => {
        const { phrases } = get();
        const existing = phrases[targetId] || createMemory(targetId);
        set({
          phrases: {
            ...phrases,
            [targetId]: {
              ...existing,
              exposures: existing.exposures + 1,
              lastSeen: new Date().toISOString(),
            },
          },
        });
      },

      recordAttempt: (targetId, correct) => {
        const { phrases } = get();
        const existing = phrases[targetId] || createMemory(targetId);
        const repetitions = correct ? existing.repetitions + 1 : 0;
        set({
          phrases: {
            ...phrases,
            [targetId]: {
              ...existing,
              exposures: existing.exposures + 1,
              correctAttempts: existing.correctAttempts + (correct ? 1 : 0),
              incorrectAttempts: existing.incorrectAttempts + (correct ? 0 : 1),
              repetitions,
              nextReview: nextReviewDate(repetitions, correct),
              lastSeen: new Date().toISOString(),
            },
          },
        });
      },

      getCarryoverTargetIds: (lessonId, limit = 3) => {
        const now = new Date();
        const priorIds = getPriorActiveTargetIds(lessonId);
        const { phrases } = get();

        return [...priorIds]
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

            const aSeen = a ? new Date(a.lastSeen).getTime() : 0;
            const bSeen = b ? new Date(b.lastSeen).getTime() : 0;
            return aSeen - bSeen;
          })
          .slice(0, limit);
      },

      getTodayReviewTargetIds: (limit = 5) => {
        const now = new Date();
        const { phrases } = get();

        return Object.values(phrases)
          .filter((memory) => {
            const target = a0MemoryTargets.find((item) => item.id === memory.targetId);
            return target?.priority === 'active' && memory.exposures > 0;
          })
          .sort((left, right) => {
            const leftWeak = left.incorrectAttempts > 0 ? 1 : 0;
            const rightWeak = right.incorrectAttempts > 0 ? 1 : 0;
            if (leftWeak !== rightWeak) return rightWeak - leftWeak;

            const leftDue = new Date(left.nextReview) <= now ? 1 : 0;
            const rightDue = new Date(right.nextReview) <= now ? 1 : 0;
            if (leftDue !== rightDue) return rightDue - leftDue;

            const leftScore = weaknessScore(left);
            const rightScore = weaknessScore(right);
            if (leftScore !== rightScore) return rightScore - leftScore;

            return new Date(left.nextReview).getTime() - new Date(right.nextReview).getTime();
          })
          .slice(0, limit)
          .map((memory) => memory.targetId);
      },
    }),
    {
      name: 'czech-mn-a0-phrase-memory-v1',
    },
  ),
);