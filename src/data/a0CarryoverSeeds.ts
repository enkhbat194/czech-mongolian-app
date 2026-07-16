export const a0CarryoverSeedOrder: Record<string, string[]> = {
  l002: [
    'a0c0001',
    'a0c0013',
    'a0c0021',
    'a0c0326',
    'a0c0327',
    'a0c0005',
    'a0c0003',
    'a0c0006',
    'a0c0012',
    'a0c0016',
    'a0c0017',
    'a0c0019',
  ],
  l003: [
    'a0c0044',
    'a0c0001',
    'a0c0326',
    'a0c0327',
    'a0c0005',
    'a0c0006',
    'a0c0025',
    'a0c0043',
    'a0c0027',
    'a0c0029',
    'a0c0003',
  ],
};

export function getA0CarryoverSeedRank(lessonId: string, targetId: string) {
  const rank = a0CarryoverSeedOrder[lessonId]?.indexOf(targetId) ?? -1;
  return rank === -1 ? Number.MAX_SAFE_INTEGER : rank;
}