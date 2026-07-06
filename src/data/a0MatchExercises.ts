import type { A0MatchPair } from './a0LessonSchema';

export interface A0MatchExercise {
  id: string;
  type: 'match';
  titleMn: string;
  promptMn: string;
  pairs: A0MatchPair[];
  feedbackMn: string;
}

/**
 * Түр adapter: A0.3 raw source дараагийн content cleanup хүртэл энэ map-аас
 * direct match exercise рүү normalise хийнэ. Шинэ A0.x хичээл match-ээ
 * тухайн lesson data дотроо шууд `type: 'match'` хэлбэрээр бичнэ.
 */
export const a0MatchExercisesBySourceId: Record<string, A0MatchExercise> = {
  'a0-3-a-4': {
    id: 'a0-3-a-4-match',
    type: 'match',
    titleMn: 'Утга тааруулах',
    promptMn: 'Байршил асуух болон зааж хариулах хэллэгүүдийг зөв хослуул.',
    pairs: [
      { id: 'toilet', czech: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' },
      { id: 'here', czech: 'Tady.', mongolian: 'Энд.' },
      { id: 'there', czech: 'Tam.', mongolian: 'Тэнд.' },
    ],
    feedbackMn: 'Байршил асуух болон зааж хариулах хэллэгүүдийг зөв таарууллаа.',
  },
  'a0-3-b-3': {
    id: 'a0-3-b-3-match',
    type: 'match',
    titleMn: 'Утга тааруулах',
    promptMn: 'Хэрэгтэй газраа асуух Чех хэллэгийг Монгол утгатай нь зөв хослуул.',
    pairs: [
      { id: 'shop', czech: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
      { id: 'pharmacy', czech: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' },
      { id: 'there', czech: 'Tam.', mongolian: 'Тэнд.' },
    ],
    feedbackMn: 'Дэлгүүр, эмийн сан асуух болон заасан хариуг зөв таарууллаа.',
  },
};

export function getA0MatchExercise(sourceExerciseId: string): A0MatchExercise | undefined {
  return a0MatchExercisesBySourceId[sourceExerciseId];
}