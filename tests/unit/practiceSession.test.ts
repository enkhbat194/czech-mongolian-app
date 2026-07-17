import { describe, expect, it } from 'vitest';
import {
  appendSinglePracticeRetry,
  claimPracticeKey,
  createPracticeSessionSeed,
} from '../../src/utils/practiceSession';

describe('practice session helpers', () => {
  it('creates scoped session seeds that change between runs', () => {
    const first = createPracticeSessionSeed('listening');
    const second = createPracticeSessionSeed('listening');
    expect(first.startsWith('listening:')).toBe(true);
    expect(second.startsWith('listening:')).toBe(true);
    expect(second).not.toBe(first);
  });

  it('claims an answer key only once', () => {
    const claimed = new Set<string>();
    expect(claimPracticeKey(claimed, '0:a0c0001')).toBe(true);
    expect(claimPracticeKey(claimed, '0:a0c0001')).toBe(false);
    expect(claimPracticeKey(claimed, '1:a0c0001')).toBe(true);
  });

  it('queues each missed target for one retry only', () => {
    const queued = new Set<string>();
    const first = { id: 'a0c0001', value: 'one' };
    const second = { id: 'a0c0002', value: 'two' };
    const initial = [first, second];
    const once = appendSinglePracticeRetry(initial, first, queued);
    const twice = appendSinglePracticeRetry(once, first, queued);

    expect(once).toHaveLength(3);
    expect(once[2]).toBe(first);
    expect(twice).toHaveLength(3);
  });
});
