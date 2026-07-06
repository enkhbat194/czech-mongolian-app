import { a0MemoryTargets } from '../data/a0MemoryPlan';
import { usePhraseMemoryStore } from './usePhraseMemoryStore';

const lessonOrder = ['l001', 'l002', 'l003', 'l004', 'l005', 'l006'];

usePhraseMemoryStore.setState({
  getCarryoverTargetIds: (lessonId: string, limit = 3) => {
    const lessonIndex = lessonOrder.indexOf(lessonId);
    if (lessonIndex <= 0) return [];
    const phrases = usePhraseMemoryStore.getState().phrases;
    return a0MemoryTargets
      .filter((target) => target.priority === 'active' && lessonOrder.indexOf(target.lessonId) < lessonIndex)
      .sort((left, right) => {
        const a = phrases[left.id];
        const b = phrases[right.id];
        const aScore = a ? a.incorrectAttempts * 4 - a.correctAttempts : 2;
        const bScore = b ? b.incorrectAttempts * 4 - b.correctAttempts : 2;
        return bScore - aScore;
      })
      .slice(0, limit)
      .map((target) => target.id);
  },
});
