import { czechWords } from './czechWords';
import { a0FirstWeekWords } from './a0FirstWeekWords';
import { repairA0AliasLanguage, repairA0WordLanguage } from './a0LanguageCorrections';
import { a0PeopleWords } from './a0PeopleWords';
import { a0SafetyWords } from './a0SafetyWords';
import { a0WeatherWords } from './a0WeatherWords';

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
  'food-request', 'food-pattern', 'food-response', 'food-question', 'payment-question', 'payment-pattern',
  'shop-request', 'shop-price', 'home-pattern', 'home-problem',
  'health-pattern', 'health-problem', 'health-request', 'health-question',
  'phone-response', 'phone-repair', 'phone-request',
  'people-pattern', 'weather-pattern', 'weather-feeling', 'clothes-request',
  'safety-urgent', 'safety-pattern', 'safety-request', 'safety-status',
  'first-week-status', 'first-week-pattern', 'first-week-help',
]);

const explicitActiveIds = new Set([
  'a0c0001', 'a0c0003', 'a0c0005', 'a0c0006', 'a0c0012', 'a0c0013', 'a0c0016', 'a0c0017', 'a0c0019', 'a0c0021', 'a0c0326', 'a0c0327',
  'a0c0048', 'a0c0049', 'a0c0101', 'a0c0102', 'a0c0103', 'a0c0104',
  'a0c0106', 'a0c0108', 'a0c0112', 'a0c0114', 'a0c0115', 'a0c0116',
  'a0c0120', 'a0c0122', 'a0c0123', 'a0c0124',
  'a0c0128', 'a0c0129', 'a0c0130', 'a0c0131', 'a0c0132',
  'a0c0134', 'a0c0135', 'a0c0136', 'a0c0137', 'a0c0139', 'a0c0140',
  'a0c0143', 'a0c0144', 'a0c0145', 'a0c0146', 'a0c0147',
  'a0c0154', 'a0c0155', 'a0c0156', 'a0c0157', 'a0c0158', 'a0c0159',
  'a0c0161', 'a0c0162', 'a0c0163', 'a0c0164', 'a0c0165', 'a0c0169', 'a0c0170',
  'a0c0171', 'a0c0172', 'a0c0176', 'a0c0177', 'a0c0178', 'a0c0179', 'a0c0180',
  'a0c0182', 'a0c0183', 'a0c0184', 'a0c0185', 'a0c0186',
]);

const aliasMap: Record<string, string[]> = {
  a0c0001: ['Dobrý den.'],
  a0c0002: ['Ahoj.'],
  a0c0003: ['Na shledanou.'],
  a0c0004: ['Prosím.'],
  a0c0005: ['Děkuji.', 'Děkuji. Na shledanou.'],
  a0c0006: ['Ano.', 'Ano, děkuji.', 'Ano, prosím.'],
  a0c0007: ['Ne.', 'Ne, děkuji.'],
  a0c0013: ['Jmenuji se {userName}.', 'Dobrý den. Jmenuji se {userName}.'],
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
  a0c0063: ['Prosím, kde je zastávka?'],
  a0c0064: ['Autobusem, prosím.'],
  a0c0065: ['Tramvají, prosím.'],
  a0c0081: ['Dnes mám čas.', 'Zítra večer mám čas.'],
  a0c0082: ['Teď nemám čas.'],
  a0c0099: ['Nerozumím. Ukažte mi, prosím.'],
  a0c0100: ['Mluvím moc rychle?'],
  a0c0101: ['V pět.'],
  a0c0102: ['Ve dvanáct.'],
  a0c0103: ['Nový úkol.'],
  a0c0104: ['Ukážu vám.'],
  a0c0106: ['Dobrý den. Menu, prosím.'],
  a0c0108: ['Dám si kávu, prosím.', 'Dám si kávu, prosím. S sebou, prosím.'],
  a0c0109: ['Dám si čaj, prosím.'],
  a0c0110: ['Dám si polévku, prosím.'],
  a0c0115: ['Ano, platím kartou.', 'Kolik to stojí? Platím kartou.'],
  a0c0116: ['Ne, platím hotově.'],
  a0c0120: ['Ano, tašku, prosím.'],
  a0c0122: ['Ano, účtenku, prosím.'],
  a0c0123: ['Dobrý den. Tohle, prosím.'],
  a0c0129: ['Je problém. Nemám klíč.'],
  a0c0130: ['Dobrý den. Je problém.'],
  a0c0134: ['Bolí mě hlava.', 'Bolí mě hlava. Máte něco na bolest?'],
  a0c0135: ['Bolí mě břicho.'],
  a0c0136: ['Bolí mě v krku.'],
  a0c0139: ['Máte něco na bolest?'],
  a0c0143: ['Ano, slyším vás.'],
  a0c0146: ['Napište mi to, prosím.', 'Ještě jednou, prosím. Napište mi to, prosím.'],
  a0c0147: ['Pošlete mi SMS, prosím.'],
  a0c0149: ['Moje rodina.'],
  a0c0155: ['Ano, mám dítě.'],
  a0c0156: ['Ano, mám děti.'],
  a0c0157: ['Ano, jsem tady s rodinou.'],
  a0c0158: ['Ne, jsem tady sám.'],
  a0c0159: ['Ano, jsem tady sama.'],
  a0c0165: ['Ano, je mi zima.'],
  a0c0166: ['Ano, je mi teplo.'],
  a0c0172: ['Mám problém. Potřebuji pomoc.'],
  a0c0182: ['Ano, jsem nový.'],
  a0c0183: ['Ano, jsem nová.'],
  a0c0184: ['Učím se česky. Mluvte prosím pomalu.'],
};

function normalizeCzech(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    // Keep Czech diacritics and urgent !: být/byt and pomoc/Pomoc! are different uses.
    .replace(/[.,?—-]/g, '')
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

const allMemoryWords = [...czechWords, ...a0PeopleWords, ...a0WeatherWords, ...a0SafetyWords, ...a0FirstWeekWords]
  .map((word) => repairA0WordLanguage(word));

export const a0MemoryTargets: A0MemoryTarget[] = allMemoryWords.map((word) => {
  const priority: MemoryPriority = explicitActiveIds.has(word.id) || activeCategories.has(word.category) ? 'active' : 'support';
  const aliases = aliasMap[word.id]?.map((alias) => repairA0AliasLanguage(alias, word.lessonId));
  return { id: word.id, lessonId: word.lessonId, czech: word.czech, mongolian: word.mongolian, priority, aliases, requiredCoverage: priority === 'active' ? activeCoverage : supportCoverage };
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

export function getA0MemoryPlanByLesson() {
  return lessonOrder.map((lessonId) => ({ lessonId, targets: a0MemoryTargets.filter((target) => target.lessonId === lessonId) }));
}
