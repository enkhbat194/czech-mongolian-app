import { czechWords } from './czechWords';

export type MemoryPriority = 'active' | 'support';

export interface A0MemoryTarget {
  id: string;
  lessonId: string;
  czech: string;
  mongolian: string;
  priority: MemoryPriority;
  aliases?: string[];
  requiredCoverage: {
    card: number;
    recognition: number;
    retrieval: number;
    dialogue: number;
    carryover: number;
  };
}

const activeCoverage = { card: 1, recognition: 2, retrieval: 2, dialogue: 2, carryover: 2 };
const supportCoverage = { card: 1, recognition: 1, retrieval: 1, dialogue: 1, carryover: 0 };

const activeCategories = new Set([
  'pattern',
  'survival',
  'direction-pattern',
  'transport-pattern',
  'time-pattern',
  'meeting-pattern',
  'job-pattern',
  'job-question',
  'job-survival',
]);

const explicitActiveIds = new Set([
  'a0c0001', 'a0c0003', 'a0c0005', 'a0c0006', 'a0c0012', 'a0c0013', 'a0c0016', 'a0c0017', 'a0c0019', 'a0c0021', 'a0c0326', 'a0c0327',
  'a0c0048', 'a0c0049',
]);

const aliasMap: Record<string, string[]> = {
  a0c0001: ['Dobrý den.'],
  a0c0002: ['Ahoj.'],
  a0c0003: ['Na shledanou.'],
  a0c0004: ['Prosím.'],
  a0c0005: ['Děkuji.', 'Děkuji. Na shledanou.'],
  a0c0006: ['Ano.', 'Ano, děkuji.', 'Ano, prosím.'],
  a0c0007: ['Ne.', 'Ne, děkuji.'],
  a0c0013: ['Jmenuji se Eba.'],
  a0c0017: ['Dobře, děkuji.'],
  a0c0019: ['Odkud jste?', 'Odkud?'],
  a0c0027: ['Ano, potřebuji vodu.'],
  a0c0035: ['Ano, chci něco k jídlu.'],
  a0c0047: ['Kde je toaleta?'],
  a0c0048: ['Tady', 'Toaleta je tady.', 'Lékárna je tady.'],
  a0c0049: ['Tam', 'Obchod je tam.', 'Nádraží je tam.'],
  a0c0051: ['Prosím, kde je obchod?'],
  a0c0053: ['Prosím, kde je lékárna?'],
  a0c0055: ['Prosím, kde je nádraží?'],
};

function normalizeCzech(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?—-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export const a0MemoryTargets: A0MemoryTarget[] = czechWords.map((word) => {
  const priority: MemoryPriority = explicitActiveIds.has(word.id) || activeCategories.has(word.category) ? 'active' : 'support';
  return {
    id: word.id,
    lessonId: word.lessonId,
    czech: word.czech,
    mongolian: word.mongolian,
    priority,
    aliases: aliasMap[word.id],
    requiredCoverage: priority === 'active' ? activeCoverage : supportCoverage,
  };
});

const lessonOrder = ['l001', 'l002', 'l003', 'l004', 'l005', 'l006', 'l007', 'l008', 'l009', 'l010', 'l011', 'l012', 'l013', 'l014', 'l015'];

export function getA0MemoryTarget(id: string) {
  return a0MemoryTargets.find((target) => target.id === id);
}

export function getA0MemoryTargetByCzech(text: string) {
  const normalized = normalizeCzech(text);
  return a0MemoryTargets.find((target) => {
    const candidates = [target.czech, ...(target.aliases || [])];
    return candidates.some((candidate) => normalizeCzech(candidate) === normalized);
  });
}

export function getPriorActiveTargetIds(lessonId: string) {
  const lessonIndex = lessonOrder.indexOf(lessonId);
  if (lessonIndex <= 0) return [];
  return a0MemoryTargets
    .filter((target) => target.priority === 'active' && lessonOrder.indexOf(target.lessonId) < lessonIndex)
    .map((target) => target.id);
}
