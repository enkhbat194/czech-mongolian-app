import { useAppStore } from './useAppStore';

// A0LessonEngineV5 calls markWordLearned() immediately followed by
// updateSRSCard(..., 4) at lesson completion. That event only means a card was
// introduced, not that the learner successfully recalled it. Intercept only
// that synchronous legacy pair while preserving later exercise/review updates.
// The global marker prevents Vite hot reload from wrapping the actions again.
const bridgeKey = Symbol.for('czech-mn-a0-srs-bridge-installed');
const bridgeRegistry = globalThis as typeof globalThis & Record<symbol, boolean | undefined>;

if (!bridgeRegistry[bridgeKey]) {
  bridgeRegistry[bridgeKey] = true;

  const legacyCompletionIds = new Set<string>();
  const originalMarkWordLearned = useAppStore.getState().markWordLearned;
  const originalUpdateSRSCard = useAppStore.getState().updateSRSCard;

  useAppStore.setState({
    markWordLearned: (wordId) => {
      legacyCompletionIds.add(wordId);
      originalMarkWordLearned(wordId);
      queueMicrotask(() => legacyCompletionIds.delete(wordId));
    },
    updateSRSCard: (wordId, quality) => {
      if (legacyCompletionIds.delete(wordId)) return;
      originalUpdateSRSCard(wordId, quality);
    },
  });
}
