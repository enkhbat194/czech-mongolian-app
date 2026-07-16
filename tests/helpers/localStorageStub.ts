// Importing the zustand stores pulls in persist(), which reads localStorage at
// module load. Node has no localStorage, so give it a minimal in-memory one.
const backing = new Map<string, string>();

if (!('localStorage' in globalThis) || globalThis.localStorage === undefined) {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (key: string) => backing.get(key) ?? null,
      setItem: (key: string, value: string) => void backing.set(key, String(value)),
      removeItem: (key: string) => void backing.delete(key),
      clear: () => void backing.clear(),
      key: (index: number) => [...backing.keys()][index] ?? null,
      get length() {
        return backing.size;
      },
    } satisfies Storage,
    configurable: true,
  });
}

export {};
