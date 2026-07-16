import { describe, expect, it } from 'vitest';
import { stableShuffle } from '../../src/utils/stableShuffle';

describe('stableShuffle', () => {
  const items = ['a', 'b', 'c', 'd', 'e'];

  it('is deterministic for the same seed', () => {
    expect(stableShuffle(items, 'seed-1')).toEqual(stableShuffle(items, 'seed-1'));
  });

  it('produces different orders for different seeds', () => {
    const orders = new Set(
      Array.from({ length: 50 }, (_, index) => stableShuffle(items, `seed-${index}`).join('')),
    );
    expect(orders.size).toBeGreaterThan(1);
  });

  it('keeps exactly the same elements', () => {
    const shuffled = stableShuffle(items, 'any-seed');
    expect([...shuffled].sort()).toEqual([...items].sort());
  });

  it('does not mutate its input', () => {
    const input = ['x', 'y', 'z'];
    stableShuffle(input, 'seed');
    expect(input).toEqual(['x', 'y', 'z']);
  });

  it('handles empty and single-element arrays', () => {
    expect(stableShuffle([], 'seed')).toEqual([]);
    expect(stableShuffle(['only'], 'seed')).toEqual(['only']);
  });

  it('spreads the first element across all positions when the seed varies', () => {
    const positions = new Set<number>();
    for (let session = 0; session < 100; session += 1) {
      positions.add(stableShuffle(['correct', 'd1', 'd2', 'd3'], `s-${session}:t1`).indexOf('correct'));
    }
    expect(positions.size).toBe(4);
  });

  it('pins the order when the seed is constant (why session seeds matter)', () => {
    const positions = new Set<number>();
    for (let session = 0; session < 100; session += 1) {
      positions.add(stableShuffle(['correct', 'd1', 'd2', 'd3'], 't1-fixed').indexOf('correct'));
    }
    expect(positions.size).toBe(1);
  });
});
