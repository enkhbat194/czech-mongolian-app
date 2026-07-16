import '../helpers/localStorageStub';
import { describe, expect, it } from 'vitest';
import { getAdaptiveTargetCount, type PhraseMemory } from '../../src/stores/usePhraseMemoryStore';

const DAY_MS = 24 * 60 * 60 * 1000;
const now = new Date('2026-07-15T12:00:00.000Z');

function strongMemory(targetId: string, overrides: Partial<PhraseMemory> = {}): PhraseMemory {
  return {
    targetId,
    exposures: 6,
    correctAttempts: 4,
    incorrectAttempts: 0,
    repetitions: 3,
    nextReview: new Date(now.getTime() + 3 * DAY_MS).toISOString(),
    lastSeen: now.toISOString(),
    quality: 4,
    lastResponseTimeMs: 900,
    lastMistakeType: 'none',
    correctStreak: 3,
    lastAnswerAt: now.toISOString(),
    lastConfusedWith: '',
    ...overrides,
  };
}

function phrasesFor(memories: PhraseMemory[]): Record<string, PhraseMemory> {
  return Object.fromEntries(memories.map((memory) => [memory.targetId, memory]));
}

describe('getAdaptiveTargetCount', () => {
  it('returns 0 for an empty target list', () => {
    expect(getAdaptiveTargetCount([], {}, now)).toBe(0);
  });

  it('defaults to 3 when the learner is in good shape', () => {
    const ids = ['a', 'b', 'c', 'd', 'e'];
    const phrases = phrasesFor(ids.map((id) => strongMemory(id)));
    expect(getAdaptiveTargetCount(ids, phrases, now)).toBe(3);
  });

  it('escalates to 4 when three targets are due', () => {
    const due = { nextReview: new Date(now.getTime() - 60 * 1000).toISOString() };
    const phrases = phrasesFor([
      strongMemory('a', due),
      strongMemory('b', due),
      strongMemory('c', due),
      strongMemory('d'),
      strongMemory('e'),
    ]);
    expect(getAdaptiveTargetCount(['a', 'b', 'c', 'd', 'e'], phrases, now)).toBe(4);
  });

  it('escalates to 5 when two targets are overdue by a day or more', () => {
    const overdue = { nextReview: new Date(now.getTime() - 2 * DAY_MS).toISOString() };
    const phrases = phrasesFor([
      strongMemory('a', overdue),
      strongMemory('b', overdue),
      strongMemory('c'),
      strongMemory('d'),
      strongMemory('e'),
      strongMemory('f'),
    ]);
    expect(getAdaptiveTargetCount(['a', 'b', 'c', 'd', 'e', 'f'], phrases, now)).toBe(5);
  });

  it('escalates to 5 when three targets have never been seen (missing counts as weak too)', () => {
    const phrases = phrasesFor([strongMemory('d'), strongMemory('e')]);
    expect(getAdaptiveTargetCount(['a', 'b', 'c', 'd', 'e'], phrases, now)).toBe(5);
  });

  it('never returns more than the number of available targets', () => {
    const phrases = phrasesFor([]);
    expect(getAdaptiveTargetCount(['a', 'b'], phrases, now)).toBe(2);
    expect(getAdaptiveTargetCount(['a'], phrases, now)).toBe(1);
  });
});
