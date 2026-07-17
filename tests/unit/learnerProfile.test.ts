import '../helpers/localStorageStub';
import { describe, expect, it } from 'vitest';
import { personalizeLearnerText, resolveLearnerName } from '../../src/utils/learnerName';
import {
  getA0LearnerSayTargets,
  getA0ProductionPool,
  isBannedProductionText,
} from '../../src/data/a0PracticePools';
import { normalizeCzechForContract } from '../../src/data/lessonDataContract';

describe('personalizeLearnerText', () => {
  it('replaces the canonical userName token in Czech and Mongolian', () => {
    expect(personalizeLearnerText('Jmenuji se {userName}.', 'Enkhbat')).toBe('Jmenuji se Enkhbat.');
    expect(personalizeLearnerText('Jste {userName}?', 'Enkhbat')).toBe('Jste Enkhbat?');
    expect(personalizeLearnerText('Намайг {userName} гэдэг.', 'Enkhbat')).toBe('Намайг Enkhbat гэдэг.');
  });

  it('keeps legacy Eba content compatible during migration', () => {
    expect(personalizeLearnerText('Jmenuji se Eba.', 'Enkhbat')).toBe('Jmenuji se Enkhbat.');
    expect(personalizeLearnerText('Миний нэр Эба.', 'Enkhbat')).toBe('Миний нэр Enkhbat.');
  });

  it('falls back to an ellipsis when the name is empty or the default', () => {
    expect(personalizeLearnerText('Jmenuji se {userName}.', '')).toBe('Jmenuji se ….');
    expect(personalizeLearnerText('Jmenuji se {userName}.', 'Суралцагч')).toBe('Jmenuji se ….');
    expect(resolveLearnerName('  ')).toBe('…');
  });

  it('leaves unrelated text and partial matches untouched', () => {
    expect(personalizeLearnerText('Nerozumím.', 'Enkhbat')).toBe('Nerozumím.');
    expect(personalizeLearnerText('Ebala', 'Enkhbat')).toBe('Ebala');
  });
});

describe('gender-form production protection', () => {
  const male = ['Jsem nový.', 'Jsem tady sám.'];
  const female = ['Jsem nová.', 'Jsem tady sama.'];

  it('neutral profiles get no gendered production forms at all', () => {
    for (const czech of [...male, ...female]) {
      expect(isBannedProductionText(czech, 'neutral')).toBe(true);
    }
    const pool = getA0LearnerSayTargets('neutral');
    const normalized = new Set(pool.map((target) => normalizeCzechForContract(target.czech)));
    for (const czech of [...male, ...female]) {
      expect(normalized.has(normalizeCzechForContract(czech))).toBe(false);
    }
  });

  it('male profiles may produce male forms but never female forms', () => {
    for (const czech of male) expect(isBannedProductionText(czech, 'male')).toBe(false);
    for (const czech of female) expect(isBannedProductionText(czech, 'male')).toBe(true);
  });

  it('female profiles may produce female forms but never male forms', () => {
    for (const czech of female) expect(isBannedProductionText(czech, 'female')).toBe(false);
    for (const czech of male) expect(isBannedProductionText(czech, 'female')).toBe(true);
  });

  it('never exposes the sample name in any gender pool', () => {
    for (const genderForm of ['male', 'female', 'neutral'] as const) {
      const pool = getA0ProductionPool(6, genderForm);
      expect(pool.some((target) => /eba/i.test(target.czech))).toBe(false);
    }
  });
});
