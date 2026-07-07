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
  'pattern', 'survival', 'direction-pattern', 'transport-pattern', 'time-pattern', 'meeting-pattern',
  'job-pattern', 'job-question', 'job-survival', 'job-response', 'listening-pattern',
]);

const explicitActiveIds = new Set([
  'a0c0001', 'a0c0003', 'a0c0005', 'a0c0006', 'a0c0012', 'a0c0013', 'a0c0016', 'a0c0017', 'a0c0019', 'a0c0021', 'a0c0326', 'a0c0327',
  'a0c0048', 'a0c0049', 'a0c0101', 'a0c0102', 'a0c0103', 'a0c0104',
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
  a0c0064: ['Autobus, prosím.'],
  a0c0065: ['Tramvaj, prosím.'],
  a0c0081: ['Dnes mám čas.', 'Zítra večer mám čas.'],
  a0c0082: ['Teď nemám čas.'],
  a0c0099: ['Nerozumím. Ukažte mi, prosím.'],
  a0c0100: ['Mluvím moc rychle?'],
  a0c0101: ['V pět.'],
  a0c0102: ['Ve dvanáct.'],
  a0c0103: ['Nový úkol.'],
  a0c0104: ['Ukážu vám.'],
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

function containsTokenSequence(text: string, candidate: string) {
  const textTokens = normalizeCzech(text).split(' ').filter(Boolean);
  const candidateTokens = normalizeCzech(candidate).split(' ').filter(Boolean);
  if (!candidateTokens.length || candidateTokens.length > textTokens.length) return false;

  return textTokens.some((_, startIndex) => candidateTokens.every(
    (token, offset) => textTokens[startIndex + offset] === token,
  ));
}

export const a0MemoryTargets: A0MemoryTarget[] = czechWords.map((word) => {
  const priority: MemoryPriority = explicitActiveIds.has(word.id) || activeCategories.has(word.category) ? 'active' : 'support';
  return { id: word.id, lessonId: word.lessonId, czech: word.czech, mongolian: word.mongolian, priority, aliases: aliasMap[word.id], requiredCoverage: priority === 'active' ? activeCoverage : supportCoverage };
});

const lessonOrder = ['l001', 'l002', 'l003', 'l004', 'l005', 'l006', 'l007', 'l008', 'l009', 'l010', 'l011', 'l012', 'l013', 'l014', 'l015'];

export function getA0MemoryTarget(id: string) {
  return a0MemoryTargets.find((target) => target.id === id);
}

/**
 * Returns every memory target evidenced by a Czech reply. A direct card or alias
 * match comes first; longer composed replies can additionally credit each exact
 * card-sized phrase they contain. Token matching prevents false positives such
 * as matching "Ano" inside "Na shledanou".
 */
export function getA0MemoryTargetsByCzech(text: string) {
  const normalized = normalizeCzech(text);
  if (!normalized) return [];

  const directMatches = a0MemoryTargets.filter((target) => {
    const candidates = [target.czech, ...(target.aliases || [])];
    return candidates.some((candidate) => normalizeCzech(candidate) === normalized);
  });
  const containedMatches = a0MemoryTargets.filter((target) => {
    const candidates = [target.czech, ...(target.aliases || [])];
    return candidates.some((candidate) => containsTokenSequence(text, candidate));
  });

  return [...directMatches, ...containedMatches]
    .filter((target, index, list) => list.findIndex((item) => item.id === target.id) === index)
    .sort((left, right) => {
      const leftDirect = directMatches.some((target) => target.id === left.id) ? 1 : 0;
      const rightDirect = directMatches.some((target) => target.id === right.id) ? 1 : 0;
      if (leftDirect !== rightDirect) return rightDirect - leftDirect;
      return right.czech.length - left.czech.length;
    });
}

export function getA0MemoryTargetByCzech(text: string) {
  return getA0MemoryTargetsByCzech(text)[0];
}

export function getPriorActiveTargetIds(lessonId: string) {
  const lessonIndex = lessonOrder.indexOf(lessonId);
  if (lessonIndex <= 0) return [];
  return a0MemoryTargets
    .filter((target) => target.priority === 'active' && lessonOrder.indexOf(target.lessonId) < lessonIndex)
    .map((target) => target.id);
}
