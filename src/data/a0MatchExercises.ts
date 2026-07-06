export interface A0MatchPair {
  id: string;
  czech: string;
  mongolian: string;
}

export interface A0MatchExercise {
  id: string;
  type: 'match';
  titleMn: string;
  promptMn: string;
  pairs: A0MatchPair[];
  feedbackMn: string;
}

export const a0MatchExercisesBySourceId: Record<string, A0MatchExercise> = {
  'a0-1-b-4': {
    id: 'a0-1-b-4-match',
    type: 'match',
    titleMn: 'Утга тааруулах',
    promptMn: 'Чех хэллэг ба Монгол утгыг зөв хослуул.',
    pairs: [
      { id: 'name', czech: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' },
      { id: 'ask-name', czech: 'Jak se jmenujete?', mongolian: 'Таны нэр хэн бэ?' },
      { id: 'who', czech: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
    ],
    feedbackMn: 'Нэрээ хэлэх болон нэр асуух хэллэгүүдийг зөв таарууллаа.',
  },
  'a0-1-c-5': {
    id: 'a0-1-c-5-match',
    type: 'match',
    titleMn: 'Утга тааруулах',
    promptMn: 'Чехийн хамгаалах хэллэг ба Монгол утгыг зөв хослуул.',
    pairs: [
      { id: 'from-mongolia', czech: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.' },
      { id: 'dont-understand', czech: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' },
      { id: 'slowly', czech: 'Mluvte prosím pomalu.', mongolian: 'Удаан ярьж өгнө үү.' },
    ],
    feedbackMn: 'Өөрийгөө танилцуулах болон ойлгохгүй үед хэрэглэх хэллэгүүдийг зөв таарууллаа.',
  },
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
      { id: 'station', czech: 'Kde je nádraží?', mongolian: 'Галт тэрэгний буудал хаана байна?' },
    ],
    feedbackMn: 'Хэрэгтэй газраа асуух хэллэгүүдийг зөв таарууллаа.',
  },
};

export function getA0MatchExercise(sourceExerciseId: string): A0MatchExercise | undefined {
  return a0MatchExercisesBySourceId[sourceExerciseId];
}