import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { a0MemoryTargets, getPriorActiveTargetIds } from '../data/a0MemoryPlan';
import { getA0CarryoverSeedRank } from '../data/a0CarryoverSeeds';
import { useAppStore } from './useAppStore';

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
  return { targetId, exposures: 0, correctAttempts: 0, incorrectAttempts: 0, repetitions: 1, nextReview: tomorrowIso(), lastSeen: now };
}

function weaknessScore(memory: PhraseMemory) {
  return memory.incorrectAttempts * 4 - memory.correctAttempts + (memory.repetitions <= 1 ? 2 : 0);
}

export const usePhraseMemoryStore = create<PhraseMemoryState>()(
  persist(
    (set, get) => ({
      phrases: {},
      recordExposure: (targetId) => {
        const app = useAppStore.getState();
        app.activateWordForReview(targetId);
        const card = useAppStore.getState().progress.srsCards[targetId];
        const { phrases } = get();
        const existing = phrases[targetId] || createMemory(targetId);
        set({
          phrases: {
            ...phrases,
            [targetId]: {
              ...existing,
              exposures: existing.exposures + 1,
              repetitions: card?.repetitions ?? existing.repetitions,
              nextReview: card?.nextReview ?? existing.nextReview,
              lastSeen: new Date().toISOString(),
            },
          },
        });
      },
      recordAttempt: (targetId, correct) => {
        useAppStore.getState().updateSRSCard(targetId, correct ? 4 : 1);
        const card = useAppStore.getState().progress.srsCards[targetId];
        const { phrases } = get();
        const existing = phrases[targetId] || createMemory(targetId);
        set({
          phrases: {
            ...phrases,
            [targetId]: {
              ...existing,
              exposures: existing.exposures + 1,
              correctAttempts: existing.correctAttempts + (correct ? 1 : 0),
              incorrectAttempts: existing.incorrectAttempts + (correct ? 0 : 1),
              repetitions: card?.repetitions ?? existing.repetitions,
              nextReview: card?.nextReview ?? existing.nextReview,
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
            return target?.priority === 'active' && memory.exposures > 0 && new Date(memory.nextReview) <= now;
          })
          .sort((left, right) => {
            const leftScore = weaknessScore(left);
            const rightScore = weaknessScore(right);
            if (leftScore !== rightScore) return rightScore - leftScore;
            return new Date(left.nextReview).getTime() - new Date(right.nextReview).getTime();
          })
          .slice(0, limit)
          .map((memory) => memory.targetId);
      },
    }),
    { name: 'czech-mn-a0-phrase-memory-v1' },
  ),
);
