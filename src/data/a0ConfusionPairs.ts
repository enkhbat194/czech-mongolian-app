import { normalizeCzechForContract } from './lessonDataContract';
import type { A0MemoryTarget } from './a0MemoryPlan';

// Canonical Czech text is never rewritten here; normalized text is used only
// as a lookup key so diacritic pairs like byt/být stay distinct in data and UI.
const KNOWN_CONFUSION_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['Mám dítě.', 'Mám děti.'],
  ['Jsem nový.', 'Jsem nová.'],
  ['Je mi zima.', 'Dnes je zima.'],
  ['Je mi teplo.', 'Dnes je teplo.'],
  ['Potřebuji bundu.', 'Potřebuji čepici.'],
  ['Zavolejte prosím doktora.', 'Zavolejte prosím sanitku.'],
  ['Zavolejte prosím policii.', 'Zavolejte prosím sanitku.'],
  ['Mám klíč.', 'Nemám klíč.'],
  ['Jsem v pořádku.', 'Nejsem v pořádku.'],
  ['Prší.', 'Sněží.'],
];

const knownPairPartners: ReadonlyMap<string, ReadonlySet<string>> = (() => {
  const partners = new Map<string, Set<string>>();
  const link = (from: string, to: string) => {
    const existing = partners.get(from) ?? new Set<string>();
    existing.add(to);
    partners.set(from, existing);
  };
  for (const [left, right] of KNOWN_CONFUSION_PAIRS) {
    const normalizedLeft = normalizeCzechForContract(left);
    const normalizedRight = normalizeCzechForContract(right);
    link(normalizedLeft, normalizedRight);
    link(normalizedRight, normalizedLeft);
  }
  return partners;
})();

function toTokens(normalized: string): string[] {
  return normalized ? normalized.split(' ') : [];
}

function hasNegationTwin(candidateTokens: string[], targetTokenSet: ReadonlySet<string>) {
  return candidateTokens.some((token) =>
    targetTokenSet.has(`ne${token}`) || (token.startsWith('ne') && targetTokenSet.has(token.slice(2))));
}

function scoreCandidate(target: A0MemoryTarget, targetNormalized: string, candidate: A0MemoryTarget) {
  const candidateNormalized = normalizeCzechForContract(candidate.czech);
  const targetTokens = toTokens(targetNormalized);
  const targetTokenSet = new Set(targetTokens);
  const candidateTokens = toTokens(candidateNormalized);

  let score = 0;
  if (knownPairPartners.get(targetNormalized)?.has(candidateNormalized)) score += 100;
  if (candidateNormalized === targetNormalized) score += 60;
  if (hasNegationTwin(candidateTokens, targetTokenSet)) score += 25;

  const sharedTokens = candidateTokens.filter((token) => targetTokenSet.has(token)).length;
  score += sharedTokens * 12;

  const targetFirst = targetTokens[0];
  const candidateFirst = candidateTokens[0];
  if (targetFirst && candidateFirst && targetFirst === candidateFirst) score += 15;
  if (candidateTokens.length === targetTokens.length) score += 4;

  if (candidate.lessonId === target.lessonId) score += 10;
  else if (candidate.lessonId < target.lessonId) score += 6;

  return score;
}

export function getA0ConfusionChoices(
  target: A0MemoryTarget,
  pool: readonly A0MemoryTarget[],
  limit: number,
): A0MemoryTarget[] {
  if (limit <= 0) return [];

  const targetNormalized = normalizeCzechForContract(target.czech);
  const seen = new Set<string>([target.id]);
  const scored: Array<{ candidate: A0MemoryTarget; score: number }> = [];

  for (const candidate of pool) {
    if (seen.has(candidate.id)) continue;
    seen.add(candidate.id);
    scored.push({ candidate, score: scoreCandidate(target, targetNormalized, candidate) });
  }

  return scored
    .sort((left, right) => right.score - left.score || left.candidate.id.localeCompare(right.candidate.id))
    .slice(0, limit)
    .map((item) => item.candidate);
}
