import { useAppStore } from './useAppStore';

// A0LessonEngineV5 calls markWordLearned() immediately followed by
// updateSRSCard(..., 4) at lesson completion. That event only means a card was
// introduced, not that the learner successfully recalled it. Intercept exactly
// that legacy pair while preserving normal exercise and review updates.
const legacyCompletionIds = new Set<string>();
const originalMarkWordLearned = useAppStore.getState().markWordLearned;
const originalUpdateSRSCard = useAppStore.getState().updateSRSCard;

useAppStore.setState({
  markWordLearned: (wordId) => {
    legacyCompletionIds.add(wordId);
    originalMarkWordLearned(wordId);
  },
  updateSRSCard: (wordId, quality) => {
    if (legacyCompletionIds.delete(wordId)) return;
    originalUpdateSRSCard(wordId, quality);
  },
});
