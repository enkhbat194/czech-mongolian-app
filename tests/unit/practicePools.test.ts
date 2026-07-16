import '../helpers/localStorageStub';
import { describe, expect, it } from 'vitest';
import {
  buildA0FillBlankQuestions,
  getA0LearnerSayTargets,
  getA0ListeningTargets,
  getA0ProductionPool,
  getA0SpeakingPool,
  isA0StaffOnlyText,
  isBannedProductionText,
  pickIntroducedPracticeTargets,
  pickPracticeTargets,
} from '../../src/data/a0PracticePools';
import { getA0PhraseRole } from '../../src/data/a0PhraseRoles';
import { a0MemoryTargets } from '../../src/data/a0MemoryPlan';
import { normalizeCzechForContract } from '../../src/data/lessonDataContract';

const BANNED_HARDCODED = ['Jak se máš?', 'Kde je záchod?'];

describe('A0 practice pools', () => {
  it('assigns every memory target a defined pedagogical role', () => {
    const allowed = new Set(['learner-say', 'recognition-only', 'profile-dependent', 'support-only']);
    expect(a0MemoryTargets.every((target) => allowed.has(getA0PhraseRole(target)))).toBe(true);
  });

  it('learner-say pool is non-empty and contains only production-safe active targets', () => {
    const pool = getA0LearnerSayTargets();
    expect(pool.length).toBeGreaterThan(20);
    expect(pool.every((target) => target.priority === 'active')).toBe(true);
    expect(pool.every((target) => ['learner-say', 'profile-dependent'].includes(getA0PhraseRole(target)))).toBe(true);
  });

  it('excludes previously hardcoded non-canonical phrases from the speaking pool', () => {
    const czech = new Set(getA0SpeakingPool().map((target) => normalizeCzechForContract(target.czech)));
    for (const banned of BANNED_HARDCODED) {
      expect(czech.has(normalizeCzechForContract(banned))).toBe(false);
    }
  });

  it('never offers staff-only lines as learner production material', () => {
    const pool = getA0LearnerSayTargets();
    expect(pool.some((target) => isA0StaffOnlyText(target.czech))).toBe(false);
    expect(isA0StaffOnlyText('Dobrý den. Co si přejete?')).toBe(true);
  });

  it('keeps recognition-only material available for listening', () => {
    const pool = getA0ListeningTargets();
    expect(pool.length).toBeGreaterThan(getA0LearnerSayTargets().length);
    expect(pool.some((target) => getA0PhraseRole(target) === 'recognition-only')).toBe(true);
    expect(pool.every((target) => getA0PhraseRole(target) !== 'support-only')).toBe(true);
  });

  it('bans hardcoded-name and gender-form phrases from production', () => {
    expect(isBannedProductionText('Jmenuji se Eba.')).toBe(true);
    expect(isBannedProductionText('Jsem nový.')).toBe(true);
    expect(isBannedProductionText('Jsem nová.')).toBe(true);
    expect(isBannedProductionText('Jsem tady sám.')).toBe(true);
    expect(isBannedProductionText('Jsem tady sama.')).toBe(true);
    expect(isBannedProductionText('Nerozumím.')).toBe(false);

    const pool = getA0LearnerSayTargets();
    expect(pool.some((target) => isBannedProductionText(target.czech))).toBe(false);
    expect(pool.some((target) => /eba/i.test(target.czech))).toBe(false);
  });

  it('keeps production typing pools short', () => {
    const pool = getA0ProductionPool(4);
    expect(pool.length).toBeGreaterThan(5);
    for (const target of pool) {
      expect(normalizeCzechForContract(target.czech).split(' ').length).toBeLessThanOrEqual(4);
    }
  });

  it('prefers introduced targets when picking a legacy session', () => {
    const pool = getA0LearnerSayTargets();
    const introduced = [pool[3]!.id, pool[7]!.id];
    const picked = pickPracticeTargets(pool, introduced, 5);
    expect(picked.slice(0, 2).map((target) => target.id).sort()).toEqual([...introduced].sort());
    expect(picked).toHaveLength(5);
  });

  it('strict introduced picker never exposes unseen targets', () => {
    const pool = getA0ListeningTargets();
    expect(pickIntroducedPracticeTargets(pool, [], 10)).toEqual([]);
    const introduced = [pool[1]!.id, pool[4]!.id, pool[8]!.id];
    const picked = pickIntroducedPracticeTargets(pool, introduced, 10);
    expect(picked.map((target) => target.id).sort()).toEqual([...introduced].sort());
  });
});

describe('buildA0FillBlankQuestions', () => {
  const questions = buildA0FillBlankQuestions([], 30);

  it('produces real phrase-pattern blanks', () => {
    expect(questions.length).toBeGreaterThan(5);
    for (const question of questions) {
      expect(question.before.length).toBeGreaterThan(0);
      expect(question.options).toContain(question.answer);
      expect(question.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('never uses the hardcoded name as a blank answer', () => {
    for (const question of questions) {
      expect(/eba/i.test(question.answer)).toBe(false);
      expect(/eba/i.test(question.czech)).toBe(false);
    }
  });

  it('has exactly one defensible answer per question', () => {
    const learnerSay = new Set(getA0LearnerSayTargets().map((target) => normalizeCzechForContract(target.czech)));
    for (const question of questions) {
      const beforeNormalized = normalizeCzechForContract(question.before);
      const wrongOptions = question.options.filter((option) => option !== question.answer);
      for (const option of wrongOptions) {
        const completed = `${beforeNormalized} ${normalizeCzechForContract(option)}`.trim();
        expect(learnerSay.has(completed)).toBe(false);
      }
      const duplicates = new Set(question.options.map((option) => normalizeCzechForContract(option)));
      expect(duplicates.size).toBe(question.options.length);
    }
  });
});
