import { describe, expect, it } from 'vitest';
import { getA0ConfusionChoices } from '../../src/data/a0ConfusionPairs';
import type { A0MemoryTarget } from '../../src/data/a0MemoryPlan';

const coverage = { card: 1, recognition: 1, retrieval: 1, dialogue: 1, carryover: 0 };

function target(id: string, lessonId: string, czech: string): A0MemoryTarget {
  return { id, lessonId, czech, mongolian: `${czech}-mn`, priority: 'active', requiredCoverage: coverage };
}

const mamDite = target('t1', 'l012', 'Mám dítě.');
const mamDeti = target('t2', 'l012', 'Mám děti.');
const prsi = target('t3', 'l013', 'Prší.');
const snezi = target('t4', 'l013', 'Sněží.');
const mamKlic = target('t5', 'l009', 'Mám klíč.');
const nemamKlic = target('t6', 'l009', 'Nemám klíč.');
const unrelated = target('t7', 'l001', 'Dobrý den.');

const pool = [mamDeti, prsi, snezi, mamKlic, nemamKlic, unrelated];

describe('getA0ConfusionChoices', () => {
  it('ranks the known confusion partner first', () => {
    const choices = getA0ConfusionChoices(mamDite, pool, 3);
    expect(choices[0]?.id).toBe(mamDeti.id);
  });

  it('ranks a negation twin above unrelated phrases', () => {
    const choices = getA0ConfusionChoices(mamKlic, pool, pool.length);
    const negationRank = choices.findIndex((item) => item.id === nemamKlic.id);
    const unrelatedRank = choices.findIndex((item) => item.id === unrelated.id);
    expect(negationRank).toBeGreaterThanOrEqual(0);
    expect(negationRank).toBeLessThan(unrelatedRank);
  });

  it('never returns the target itself or duplicate ids', () => {
    const choices = getA0ConfusionChoices(mamDite, [mamDite, mamDeti, mamDeti, prsi], 4);
    const ids = choices.map((item) => item.id);
    expect(ids).not.toContain(mamDite.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('respects the limit and handles empty pools', () => {
    expect(getA0ConfusionChoices(mamDite, pool, 2)).toHaveLength(2);
    expect(getA0ConfusionChoices(mamDite, [], 3)).toEqual([]);
    expect(getA0ConfusionChoices(mamDite, pool, 0)).toEqual([]);
  });

  it('is deterministic for the same inputs', () => {
    const first = getA0ConfusionChoices(prsi, pool, 3).map((item) => item.id);
    const second = getA0ConfusionChoices(prsi, pool, 3).map((item) => item.id);
    expect(first).toEqual(second);
  });
});
