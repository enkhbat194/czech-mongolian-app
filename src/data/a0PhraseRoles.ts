import type { A0MemoryTarget, MemoryPriority } from './a0MemoryPlan';

export type A0PhraseRole = 'learner-say' | 'recognition-only' | 'profile-dependent' | 'support-only';

function normalize(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    .replace(/[.,?!…—-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const LEARNER_SAY = new Set([
  'dobrý den', 'děkuji', 'prosím', 'ano', 'ne', 'na shledanou', 'dobře', 'špatně',
  'jsem z mongolska', 'nerozumím', 'mluvte prosím pomalu',
  'potřebuji pomoc', 'potřebuji vodu', 'potřebuji telefon', 'chci vodu', 'chci jídlo',
  'chci něco k jídlu', 'chci tohle', 'nemám peníze', 'nemám kartu',
  'prosím kde je toaleta', 'kde je obchod', 'kde je lékárna', 'kde je nádraží',
  'tady nebo tam', 'kde je zastávka', 'jdu na nádraží',
  'kolik je hodin', 'mám čas', 'nemám čas', 'zítra večer mám čas', 'ano v osm',
  'máme schůzku v osm', 'pracuji tady', 'kdy končíme', 'mám směnu',
  'kdy je přestávka', 'co mám dělat', 'je hotovo', 'ukažte mi prosím',
  'kávu prosím', 'tady prosím', 's sebou prosím', 'platím kartou', 'platím hotově',
  'účet prosím', 'ještě tohle prosím', 'nemám klíč', 'je problém s vodou',
  'není voda', 'je mi zima', 'nejsem v pořádku', 'mám horečku', 'potřebuji lék',
  'napište mi to prosím', 'zopakujte to prosím', 'pošlete mi sms prosím',
  'mluvím trochu česky', 'mám rodinu', 'mám dítě', 'mám děti',
  'jsem tady s rodinou', 'potřebuji bundu', 'potřebuji čepici',
  'nemám bundu', 'nemám čepici', 'pomoc', 'mám problém',
  'zavolejte prosím doktora', 'zavolejte prosím sanitku',
]);

const PROFILE_EXACT = new Set([
  'jsem nový', 'jsem nová', 'jsem tady sám', 'jsem tady sama',
]);

const LEARNER_PREFIXES = [
  'jmenuji se ',
  'dám si ',
  'bolí mě ',
];

export function resolveA0PhraseRole(czech: string, priority: MemoryPriority): A0PhraseRole {
  const normalized = normalize(czech);

  if (normalized.startsWith('jmenuji se ') || PROFILE_EXACT.has(normalized)) {
    return 'profile-dependent';
  }
  if (priority === 'support') return 'support-only';
  if (LEARNER_SAY.has(normalized) || LEARNER_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return 'learner-say';
  }
  return 'recognition-only';
}

export function getA0PhraseRole(target: Pick<A0MemoryTarget, 'czech' | 'priority'>): A0PhraseRole {
  return resolveA0PhraseRole(target.czech, target.priority);
}
