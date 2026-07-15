import '../helpers/localStorageStub';
import { describe, expect, it } from 'vitest';
import { normalizeCard, sm2, type SRSCard } from '../../src/stores/useAppStore';

function card(overrides: Partial<SRSCard> = {}): SRSCard {
  return normalizeCard({ wordId: 'w1', ...overrides });
}

function daysFromNow(iso: string) {
  return Math.round((new Date(iso).getTime() - Date.now()) / (24 * 60 * 60 * 1000));
}

describe('sm2', () => {
  it('walks the interval ladder 1, 3, 7, 14, 30 on repeated success', () => {
    const expected = [
      { repetitionsBefore: 0, interval: 1 },
      { repetitionsBefore: 1, interval: 3 },
      { repetitionsBefore: 2, interval: 7 },
      { repetitionsBefore: 3, interval: 14 },
      { repetitionsBefore: 4, interval: 30 },
      { repetitionsBefore: 9, interval: 30 },
    ];
    for (const { repetitionsBefore, interval } of expected) {
      const result = sm2(card({ repetitions: repetitionsBefore }), 4);
      expect(result.repetitions).toBe(repetitionsBefore + 1);
      expect(result.interval).toBe(interval);
      expect(daysFromNow(result.nextReview)).toBe(interval);
    }
  });

  it('resets repetitions and schedules for today on failure', () => {
    const result = sm2(card({ repetitions: 4, interval: 14 }), 1);
    expect(result.repetitions).toBe(0);
    expect(result.interval).toBe(0);
    expect(daysFromNow(result.nextReview)).toBe(0);
  });

  it('raises ease factor on perfect answers and lowers it on failures', () => {
    const up = sm2(card({ easeFactor: 2.5 }), 5);
    expect(up.easeFactor).toBeCloseTo(2.6, 5);

    const down = sm2(card({ easeFactor: 2.5 }), 0);
    expect(down.easeFactor).toBeCloseTo(1.7, 5);
  });

  it('never lets ease factor drop below 1.3', () => {
    let current = card({ easeFactor: 1.4 });
    for (let round = 0; round < 5; round += 1) current = sm2(current, 0);
    expect(current.easeFactor).toBe(1.3);
  });

  it('stores the answered quality on the card', () => {
    expect(sm2(card(), 2).quality).toBe(2);
    expect(sm2(card(), 5).quality).toBe(5);
  });
});

describe('normalizeCard (localStorage migration)', () => {
  it('fills every missing smart-review field on a legacy card', () => {
    const legacy = normalizeCard({
      wordId: 'w2',
      interval: 7,
      repetitions: 3,
      easeFactor: 2.2,
      quality: 4,
    });
    expect(legacy.interval).toBe(7);
    expect(legacy.repetitions).toBe(3);
    expect(legacy.exposures).toBe(0);
    expect(legacy.correctAttempts).toBe(0);
    expect(legacy.incorrectAttempts).toBe(0);
    expect(legacy.lastResponseTimeMs).toBe(0);
    expect(legacy.lastMistakeType).toBe('none');
    expect(legacy.correctStreak).toBe(0);
    expect(legacy.lastAnswerAt).toBe('');
    expect(legacy.lastConfusedWith).toBe('');
  });

  it('sanitizes unknown mistake types from old storage', () => {
    const withBadData = normalizeCard({
      wordId: 'w3',
      lastMistakeType: 'weird-legacy-value' as never,
      lastConfusedWith: 42 as never,
    });
    expect(withBadData.lastMistakeType).toBe('none');
    expect(withBadData.lastConfusedWith).toBe('');
  });
});
