export function createPracticeSessionSeed(scope: string): string {
  const randomPart = typeof globalThis.crypto?.getRandomValues === 'function'
    ? Array.from(globalThis.crypto.getRandomValues(new Uint32Array(2)))
      .map((value) => value.toString(36))
      .join('-')
    : Math.random().toString(36).slice(2);
  return `${scope}:${Date.now().toString(36)}:${randomPart}`;
}

export function claimPracticeKey(claimed: Set<string>, key: string): boolean {
  if (claimed.has(key)) return false;
  claimed.add(key);
  return true;
}

export function appendSinglePracticeRetry<T extends { id: string }>(
  queue: readonly T[],
  item: T,
  queuedIds: Set<string>,
): T[] {
  if (!claimPracticeKey(queuedIds, item.id)) return [...queue];
  return [...queue, item];
}
