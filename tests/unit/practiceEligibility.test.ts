import '../helpers/localStorageStub';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '../../src/stores/useAppStore';
import { isSrsEligiblePracticeTarget, usePhraseMemoryStore } from '../../src/stores/usePhraseMemoryStore';
import { a0MemoryTargets } from '../../src/data/a0MemoryPlan';

const realTargetId = a0MemoryTargets[0]!.id;

describe('isSrsEligiblePracticeTarget', () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it('rejects ids that are not A0 memory targets at all', () => {
    expect(isSrsEligiblePracticeTarget('not-a-real-target')).toBe(false);
  });

  it('rejects a real memory target the learner has never been introduced to', () => {
    expect(isSrsEligiblePracticeTarget(realTargetId)).toBe(false);
  });

  it('accepts a memory target once the learner has met it in a lesson', () => {
    useAppStore.getState().activateWordForReview(realTargetId);
    expect(isSrsEligiblePracticeTarget(realTargetId)).toBe(true);
  });

  it('guarded practice write leaves SRS untouched for unintroduced items', () => {
    const before = useAppStore.getState().progress;
    expect(before.srsCards[realTargetId]).toBeUndefined();

    // What every practice page now does before updateSRSCard:
    if (isSrsEligiblePracticeTarget(realTargetId)) {
      useAppStore.getState().updateSRSCard(realTargetId, 5);
    }

    const after = useAppStore.getState().progress;
    expect(after.srsCards[realTargetId]).toBeUndefined();
    expect(after.learnedWords).not.toContain(realTargetId);
  });

  it('eligible target still records mastery evidence normally', () => {
    useAppStore.getState().activateWordForReview(realTargetId);
    if (isSrsEligiblePracticeTarget(realTargetId)) {
      useAppStore.getState().updateSRSCard(realTargetId, 5);
    }
    const card = useAppStore.getState().progress.srsCards[realTargetId];
    expect(card).toBeDefined();
    expect(card?.correctAttempts).toBe(1);
    expect(card?.quality).toBe(5);
  });

  it('lesson-flow recordAttempt behavior is unchanged by the guard', () => {
    // recordExposure (card shown in lesson) then recordAttempt, as A0LessonEngine does.
    usePhraseMemoryStore.getState().recordExposure(realTargetId);
    usePhraseMemoryStore.getState().recordAttempt(realTargetId, true);
    const card = useAppStore.getState().progress.srsCards[realTargetId];
    expect(card?.correctAttempts).toBe(1);
    expect(useAppStore.getState().progress.introducedWords).toContain(realTargetId);
  });
});
