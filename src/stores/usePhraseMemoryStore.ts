import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getPriorActiveTargetIds } from '../data/a0MemoryPlan';

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
}

function createMemory(targetId: string): PhraseMemory {
  const now = new Date().toISOString();
  return {
    targetId,
    exposures: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    repetitions: 0,
    nextReview: now,
    lastSeen: now,
  };
}

function nextReviewDate(repetitions: number, correct: boolean) {
  const date = new Date();
  const days = correct
    ? repetitions <= 1 ? 1 : repetitions === 2 ? 3 : repetitions === 3 ? 7 : 14
    : 0;
  date.setDate(date.getDate() + days);
  return date.toISOString();
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

            const aWeakness = a ? a.incorrectAttempts * 3 - a.correctAttempts : 0;
            const bWeakness = b ? b.incorrectAttempts * 3 - b.correctAttempts : 0;
            if (aWeakness !== bWeakness) return bWeakness - aWeakness;

            const aSeen = a ? new Date(a.lastSeen).getTime() : 0;
            const bSeen = b ? new Date(b.lastSeen).getTime() : 0;
            return aSeen - bSeen;
          })
          .slice(0, limit);
      },
    }),
    {
      name: 'czech-mn-a0-phrase-memory-v1',
    },
  ),
);