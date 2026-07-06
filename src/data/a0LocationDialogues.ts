import type { DialogueScenario } from './a0Dialogues';

export const a0LocationMicroDialogues: Record<string, DialogueScenario> = {
  'a0-3-a': {
    id: 'a0-3-a-dialogue',
    titleMn: 'Богино яриа — ариун цэврийн өрөө',
    contextMn: 'Та танихгүй газарт ороод ариун цэврийн өрөө асууж байна.',
    steps: [
      {
        id: 'a03a-d1', speaker: 'Ажилтан', staffCzech: 'Dobrý den. Potřebujete pomoc?', staffMn: 'Сайн байна уу. Танд тусламж хэрэгтэй юу?',
        promptMn: 'Тусламж хэрэгтэй байгаагаа эелдгээр хэлээрэй.',
        choices: [
          { id: 'a', text: 'Potřebuji pomoc, prosím.', mongolian: 'Надад туслаач, гуйя.' },
          { id: 'b', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' },
          { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
        ], correctId: 'a', feedbackMn: 'Эхлээд тусламж хүсэх нь яриаг аюулгүй, эелдэг эхлүүлнэ.'
      },
      {
        id: 'a03a-d2', speaker: 'Ажилтан', staffCzech: 'Co hledáte?', staffMn: 'Та юу хайж байна вэ?',
        promptMn: 'Ариун цэврийн өрөө хаана байгааг асуугаарай.',
        choices: [
          { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
          { id: 'b', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' },
          { id: 'c', text: 'Tam.', mongolian: 'Тэнд.' },
        ], correctId: 'b', feedbackMn: 'Prosím, kde je toaleta? = Уучлаарай, ариун цэврийн өрөө хаана байна?'
      },
      {
        id: 'a03a-d3', speaker: 'Ажилтан', staffCzech: 'Toaleta je tady.', staffMn: 'Ариун цэврийн өрөө энд байна.',
        promptMn: 'Эелдгээр баярлалаа гэж хэлээрэй.',
        choices: [
          { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
          { id: 'b', text: 'Tam.', mongolian: 'Тэнд.' },
          { id: 'c', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' },
        ], correctId: 'a', feedbackMn: 'Tady. = Энд. Тусалсан хүнд Děkuji. гэж хэлнэ.'
      },
    ],
  },
  'a0-3-b': {
    id: 'a0-3-b-dialogue',
    titleMn: 'Богино яриа — дэлгүүр ба эмийн сан',
    contextMn: 'Та ойр хавийн дэлгүүр болон эмийн санг асууж байна.',
    steps: [
      {
        id: 'a03b-d1', speaker: 'Ажилтан', staffCzech: 'Co hledáte?', staffMn: 'Та юу хайж байна вэ?',
        promptMn: 'Дэлгүүр хаана байгааг асуугаарай.',
        choices: [
          { id: 'a', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
          { id: 'b', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' },
          { id: 'c', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' },
        ], correctId: 'a', feedbackMn: 'Kde je obchod? = Дэлгүүр хаана байна?'
      },
      {
        id: 'a03b-d2', speaker: 'Ажилтан', staffCzech: 'Obchod je tam. Potřebujete ještě něco?', staffMn: 'Дэлгүүр тэнд байна. Танд өөр зүйл хэрэгтэй юу?',
        promptMn: 'Танд өөр зүйл хэрэгтэй байгааг хэлээрэй.',
        choices: [
          { id: 'a', text: 'Ano, prosím.', mongolian: 'Тийм, гуйя.' },
          { id: 'b', text: 'Ne, děkuji.', mongolian: 'Үгүй, баярлалаа.' },
          { id: 'c', text: 'Tam.', mongolian: 'Тэнд.' },
        ], correctId: 'a', feedbackMn: 'Ano, prosím. = Тийм, гуйя.'
      },
      {
        id: 'a03b-d3', speaker: 'Ажилтан', staffCzech: 'Co hledáte?', staffMn: 'Та юу хайж байна вэ?',
        promptMn: 'Эмийн сан хаана байгааг асуугаарай.',
        choices: [
          { id: 'a', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
          { id: 'b', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' },
          { id: 'c', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' },
        ], correctId: 'b', feedbackMn: 'Kde je lékárna? = Эмийн сан хаана байна?'
      },
      {
        id: 'a03b-d4', speaker: 'Ажилтан', staffCzech: 'Lékárna je tady.', staffMn: 'Эмийн сан энд байна.',
        promptMn: 'Яриаг эелдгээр дуусгаарай.',
        choices: [
          { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
          { id: 'b', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
          { id: 'c', text: 'Ne.', mongolian: 'Үгүй.' },
        ], correctId: 'a', feedbackMn: 'Тусалсан хүнд Děkuji. гэж хэлнэ.'
      },
    ],
  },
  'a0-3-c': {
    id: 'a0-3-c-dialogue',
    titleMn: 'Богино яриа — газрын зураг дээр',
    contextMn: 'Та газрын зураг дээр галт тэрэгний буудлыг олж, заасан чиглэлийг тодруулж байна.',
    steps: [
      {
        id: 'a03c-d1', speaker: 'Ажилтан', staffCzech: 'Co hledáte?', staffMn: 'Та юу хайж байна вэ?',
        promptMn: 'Галт тэрэгний буудал хаана байгааг асуугаарай.',
        choices: [
          { id: 'a', text: 'Kde je nádraží?', mongolian: 'Галт тэрэгний буудал хаана байна?' },
          { id: 'b', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
          { id: 'c', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' },
        ], correctId: 'a', feedbackMn: 'Kde je nádraží? = Галт тэрэгний буудал хаана байна?'
      },
      {
        id: 'a03c-d2', speaker: 'Ажилтан', staffCzech: 'Vidíte mapu?', staffMn: 'Та газрын зургийг харж байна уу?',
        promptMn: 'Заасан байрлалыг “энд үү, тэнд үү?” гэж тодруулаарай.',
        choices: [
          { id: 'a', text: 'Tady, nebo tam?', mongolian: 'Энд үү, тэнд үү?' },
          { id: 'b', text: 'Ano, děkuji.', mongolian: 'Тийм, баярлалаа.' },
          { id: 'c', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' },
        ], correctId: 'a', feedbackMn: 'Tady, nebo tam? = Энд үү, тэнд үү?'
      },
      {
        id: 'a03c-d3', speaker: 'Ажилтан', staffCzech: 'Tam.', staffMn: 'Тэнд.',
        promptMn: 'Заасан байрлалыг ойлгоогүй бол удаан ярихыг хүсээрэй.',
        choices: [
          { id: 'a', text: 'Nerozumím. Mluvte prosím pomalu.', mongolian: 'Би ойлгохгүй байна. Удаан ярьж өгнө үү.' },
          { id: 'b', text: 'Tady.', mongolian: 'Энд.' },
          { id: 'c', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' },
        ], correctId: 'a', feedbackMn: 'Ойлгохгүй бол хамгаалах хэллэгээ шууд хэрэглэнэ.'
      },
    ],
  },
};

export const a0LocationFinalDialogue: DialogueScenario = {
  id: 'a0-3-final-dialogue',
  titleMn: 'Төгсгөлийн бодит яриа',
  contextMn: 'Та танихгүй барилгад орж, хэрэгтэй газруудаа асууж байна.',
  steps: [
    {
      id: 'a03f-1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den. Co potřebujete?', staffMn: 'Сайн байна уу. Танд юу хэрэгтэй вэ?',
      promptMn: 'Эелдгээр тусламж хүсээрэй.',
      choices: [
        { id: 'a', text: 'Potřebuji pomoc, prosím.', mongolian: 'Надад туслаач, гуйя.' },
        { id: 'b', text: 'Chci jídlo.', mongolian: 'Би хоол хүсэж байна.' },
        { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
      ], correctId: 'a', feedbackMn: 'Тусламж хүсээд дараа нь байршлаа асууж болно.'
    },
    {
      id: 'a03f-2', speaker: 'Ресепшний ажилтан', staffCzech: 'Co hledáte?', staffMn: 'Та юу хайж байна вэ?',
      promptMn: 'Ариун цэврийн өрөө хаана байгааг асуугаарай.',
      choices: [
        { id: 'a', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' },
        { id: 'b', text: 'Kde je nádraží?', mongolian: 'Галт тэрэгний буудал хаана байна?' },
        { id: 'c', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' },
      ], correctId: 'a', feedbackMn: 'Эелдэгээр асуухдаа Prosím, kde je …? гэж эхэлж болно.'
    },
    {
      id: 'a03f-3', speaker: 'Ресепшний ажилтан', staffCzech: 'Toaleta je tady. Potřebujete ještě něco?', staffMn: 'Ариун цэврийн өрөө энд байна. Танд өөр зүйл хэрэгтэй юу?',
      promptMn: 'Дэлгүүр хаана байгааг асуугаарай.',
      choices: [
        { id: 'a', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
        { id: 'b', text: 'Tady, nebo tam?', mongolian: 'Энд үү, тэнд үү?' },
        { id: 'c', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
      ], correctId: 'a', feedbackMn: 'Kde je obchod? = Дэлгүүр хаана байна?'
    },
    {
      id: 'a03f-4', speaker: 'Ресепшний ажилтан', staffCzech: 'Obchod je tam.', staffMn: 'Дэлгүүр тэнд байна.',
      promptMn: 'Эмийн сан хаана байгааг асуугаарай.',
      choices: [
        { id: 'a', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' },
        { id: 'b', text: 'Kde je toaleta?', mongolian: 'Ариун цэврийн өрөө хаана байна?' },
        { id: 'c', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' },
      ], correctId: 'a', feedbackMn: 'Kde je lékárna? = Эмийн сан хаана байна?'
    },
    {
      id: 'a03f-5', speaker: 'Ресепшний ажилтан', staffCzech: 'Lékárna je tady. Potřebujete ještě něco?', staffMn: 'Эмийн сан энд байна. Танд өөр зүйл хэрэгтэй юу?',
      promptMn: 'Галт тэрэгний буудал хаана байгааг асуугаарай.',
      choices: [
        { id: 'a', text: 'Kde je nádraží?', mongolian: 'Галт тэрэгний буудал хаана байна?' },
        { id: 'b', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
        { id: 'c', text: 'Tady.', mongolian: 'Энд.' },
      ], correctId: 'a', feedbackMn: 'Kde je nádraží? = Галт тэрэгний буудал хаана байна?'
    },
    {
      id: 'a03f-6', speaker: 'Ресепшний ажилтан', staffCzech: 'Nádraží je tam.', staffMn: 'Галт тэрэгний буудал тэнд байна.',
      promptMn: 'Заасан чиглэлийг ойлгохгүй бол хамгаалах хэллэгээ хэрэглээрэй.',
      choices: [
        { id: 'a', text: 'Nerozumím. Mluvte prosím pomalu.', mongolian: 'Би ойлгохгүй байна. Удаан ярьж өгнө үү.' },
        { id: 'b', text: 'Tady, nebo tam?', mongolian: 'Энд үү, тэнд үү?' },
        { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
      ], correctId: 'a', feedbackMn: 'Ойлгохгүй бол эхлээд удаан ярихыг хүснэ.'
    },
    {
      id: 'a03f-7', speaker: 'Ресепшний ажилтан', staffCzech: 'Nádraží je tam.', staffMn: 'Галт тэрэгний буудал тэнд байна.',
      promptMn: 'Тодруулж асуугаарай: энд үү, тэнд үү?',
      choices: [
        { id: 'a', text: 'Tady, nebo tam?', mongolian: 'Энд үү, тэнд үү?' },
        { id: 'b', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' },
        { id: 'c', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' },
      ], correctId: 'a', feedbackMn: 'Tady, nebo tam? нь заасан байрлалыг тодруулах богино асуулт.'
    },
    {
      id: 'a03f-8', speaker: 'Ресепшний ажилтан', staffCzech: 'Tam. Na shledanou.', staffMn: 'Тэнд. Баяртай.',
      promptMn: 'Яриаг эелдгээр дуусгаарай.',
      choices: [
        { id: 'a', text: 'Děkuji. Na shledanou.', mongolian: 'Баярлалаа. Баяртай.' },
        { id: 'b', text: 'Ahoj.', mongolian: 'Сайн уу.' },
        { id: 'c', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' },
      ], correctId: 'a', feedbackMn: 'Тусалсан хүнд баярлаад, яриаг албан хэлбэрээр дуусгаж болно.'
    },
  ],
};