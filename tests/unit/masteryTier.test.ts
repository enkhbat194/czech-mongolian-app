import '../helpers/localStorageStub';
import { describe, expect, it } from 'vitest';
import { getMasteryTier, type PhraseMemory } from '../../src/stores/usePhraseMemoryStore';

function memory(overrides: Partial<PhraseMemory>): PhraseMemory {
  return {
    targetId: 't1',
    exposures: 5,
    correctAttempts: 0,
    incorrectAttempts: 0,
    repetitions: 2,
    nextReview: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    quality: 3,
    lastResponseTimeMs: 0,
    lastMistakeType: 'none',
    correctStreak: 0,
    lastAnswerAt: '',
    lastConfusedWith: '',
    ...overrides,
  };
}

describe('getMasteryTier', () => {
  it('returns NEW when there is no memory or almost no exposure', () => {
    expect(getMasteryTier(undefined)).toBe('NEW');
    expect(getMasteryTier(memory({ exposures: 1 }))).toBe('NEW');
  });

  it('returns WEAK when mistakes outweigh correct answers', () => {
    expect(getMasteryTier(memory({ correctAttempts: 2, incorrectAttempts: 3 }))).toBe('WEAK');
  });

  it('returns WEAK for low repetitions even with correct answers', () => {
    expect(getMasteryTier(memory({ correctAttempts: 3, repetitions: 1 }))).toBe('WEAK');
  });

  it('returns FAMILIAR at two correct answers and two repetitions', () => {
    expect(getMasteryTier(memory({ correctAttempts: 2, repetitions: 2, quality: 3 }))).toBe('FAMILIAR');
  });

  it('returns STRONG at three correct, three repetitions, quality four', () => {
    expect(getMasteryTier(memory({ correctAttempts: 3, repetitions: 3, quality: 4 }))).toBe('STRONG');
  });

  it('returns MASTERED only with the correct streak in place', () => {
    const mastered = memory({ correctAttempts: 5, repetitions: 4, quality: 4, correctStreak: 2 });
    expect(getMasteryTier(mastered)).toBe('MASTERED');
    expect(getMasteryTier({ ...mastered, correctStreak: 1 })).toBe('STRONG');
  });

  it('demotes a mastered-looking card back to WEAK after enough mistakes', () => {
    expect(getMasteryTier(memory({ correctAttempts: 5, incorrectAttempts: 6, repetitions: 4, quality: 4, correctStreak: 2 }))).toBe('WEAK');
  });
});
