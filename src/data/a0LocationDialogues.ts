import type { DialogueScenario } from './a0Dialogues';

export const a0LocationMicroDialogues: Record<string, DialogueScenario> = {
  'a0-3-a': {
    id: 'a0-3-a-dialogue', titleMn: 'Богино яриа — ариун цэврийн өрөө', contextMn: 'Та танихгүй газарт ороод ариун цэврийн өрөө асууж байна.',
    steps: [{
      id: 'a03a-d1', speaker: 'Ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.', promptMn: 'Ариун цэврийн өрөө хаана байгааг эелдгээр асуугаарай.',
      choices: [{ id: 'a', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' }, { id: 'b', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Prosím, kde je toaleta? = Уучлаарай, ариун цэврийн өрөө хаана байна?'
    }],
  },
  'a0-3-b': {
    id: 'a0-3-b-dialogue', titleMn: 'Богино яриа — энд, тэнд', contextMn: 'Ажилтан таны хажуугийн хаалгыг зааж хариулж байна.',
    steps: [{
      id: 'a03b-d1', speaker: 'Ажилтан', staffCzech: 'Toaleta je tady.', staffMn: 'Ариун цэврийн өрөө энд байна.', promptMn: 'Та ойрхон байгааг ойлгосон бол талархаарай.',
      choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Tam.', mongolian: 'Тэнд.' }, { id: 'c', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' }], correctId: 'a', feedbackMn: 'Tady. = Энд. Байрлалыг ойлгосон бол Děkuji. гэж хариулна.'
    }],
  },
  'a0-3-c': {
    id: 'a0-3-c-dialogue', titleMn: 'Богино яриа — дэлгүүр ба эмийн сан', contextMn: 'Та ойр хавийн дэлгүүр болон эмийн санг асууж байна.',
    steps: [
      {
        id: 'a03c-d1', speaker: 'Ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.', promptMn: 'Дэлгүүр хаана байгааг асуугаарай.',
        choices: [{ id: 'a', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' }, { id: 'b', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' }, { id: 'c', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' }], correctId: 'a', feedbackMn: 'Kde je obchod? = Дэлгүүр хаана байна?'
      },
      {
        id: 'a03c-d2', speaker: 'Ажилтан', staffCzech: 'Obchod je tam.', staffMn: 'Дэлгүүр тэнд байна.', promptMn: 'Та эмийн сан бас асуугаарай.',
        choices: [{ id: 'a', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' }, { id: 'b', text: 'Ne, děkuji.', mongolian: 'Үгүй, баярлалаа.' }, { id: 'c', text: 'Tam.', mongolian: 'Тэнд.' }], correctId: 'a', feedbackMn: 'Kde je lékárna? = Эмийн сан хаана байна?'
      },
      {
        id: 'a03c-d3', speaker: 'Ажилтан', staffCzech: 'Lékárna je tady.', staffMn: 'Эмийн сан энд байна.', promptMn: 'Та мэдээллийг ойлгосон бол талархаарай.',
        choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' }, { id: 'c', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' }], correctId: 'a', feedbackMn: 'Lékárna je tady. = Эмийн сан энд байна. Ойлгосон бол Děkuji. гэдэг.'
      },
    ],
  },
  'a0-3-d': {
    id: 'a0-3-d-dialogue', titleMn: 'Богино яриа — буудлыг тодруулах', contextMn: 'Та газрын зураг зааж галт тэрэгний буудлын байрлалыг тодруулж байна.',
    steps: [
      {
        id: 'a03d-d1', speaker: 'Ажилтан', staffCzech: 'Nádraží?', staffMn: 'Галт тэрэгний буудал уу?', promptMn: 'Та газрын зураг дээр “энд үү, тэнд үү?” гэж тодруулаарай.',
        choices: [{ id: 'a', text: 'Tady, nebo tam?', mongolian: 'Энд үү, тэнд үү?' }, { id: 'b', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' }, { id: 'c', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' }], correctId: 'a', feedbackMn: 'Tady, nebo tam? = Энд үү, тэнд үү? Газрын зураг, заасан чиглэлийг тодруулахад хэрэглэнэ.'
      },
      {
        id: 'a03d-d2', speaker: 'Ажилтан', staffCzech: 'Tam.', staffMn: 'Тэнд.', promptMn: 'Та чиглэлийг ойлгосон бол талархаарай.',
        choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Tady.', mongolian: 'Энд.' }, { id: 'c', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' }], correctId: 'a', feedbackMn: 'Tam. = Тэнд. Ойлгосон бол Děkuji. гэж хэлж болно.'
      },
    ],
  },
};

export const a0LocationFinalDialogue: DialogueScenario = {
  id: 'a0-3-final-dialogue', titleMn: 'Төгсгөлийн бодит яриа', contextMn: 'Та танихгүй барилгад орж, эхлээд ариун цэврийн өрөө, дараа нь дэлгүүр, эмийн сан, буудал асууж байна.',
  steps: [
    {
      id: 'a03final-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.', promptMn: 'Ариун цэврийн өрөө хаана байгааг эелдгээр асуугаарай.',
      choices: [{ id: 'a', text: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?' }, { id: 'b', text: 'Chci jídlo.', mongolian: 'Би хоол хүсэж байна.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Эелдэгээр асуухдаа Prosím, kde je …? гэж эхэлж болно.'
    },
    {
      id: 'a03final-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Toaleta je tady.', staffMn: 'Ариун цэврийн өрөө энд байна.', promptMn: 'Та дэлгүүр хаана байгааг асуугаарай.',
      choices: [{ id: 'a', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' }, { id: 'b', text: 'Tady, nebo tam?', mongolian: 'Энд үү, тэнд үү?' }, { id: 'c', text: 'Děkuji.', mongolian: 'Баярлалаа.' }], correctId: 'a', feedbackMn: 'Kde je obchod? = Дэлгүүр хаана байна?'
    },
    {
      id: 'a03final-d3', speaker: 'Ресепшний ажилтан', staffCzech: 'Obchod je tam.', staffMn: 'Дэлгүүр тэнд байна.', promptMn: 'Та эмийн сан хаана байгааг асуугаарай.',
      choices: [{ id: 'a', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?' }, { id: 'b', text: 'Kde je toaleta?', mongolian: 'Ариун цэврийн өрөө хаана байна?' }, { id: 'c', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' }], correctId: 'a', feedbackMn: 'Kde je lékárna? = Эмийн сан хаана байна?'
    },
    {
      id: 'a03final-d4', speaker: 'Ресепшний ажилтан', staffCzech: 'Lékárna je tady.', staffMn: 'Эмийн сан энд байна.', promptMn: 'Та галт тэрэгний буудал хаана байгааг асуугаарай.',
      choices: [{ id: 'a', text: 'Kde je nádraží?', mongolian: 'Галт тэрэгний буудал хаана байна?' }, { id: 'b', text: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?' }, { id: 'c', text: 'Tady.', mongolian: 'Энд.' }], correctId: 'a', feedbackMn: 'Kde je nádraží? = Галт тэрэгний буудал хаана байна?'
    },
    {
      id: 'a03final-d5', speaker: 'Ресепшний ажилтан', staffCzech: 'Nádraží je tam.', staffMn: 'Галт тэрэгний буудал тэнд байна.', promptMn: 'Та бүх чиглэлийг ойлгосон бол эелдгээр яриаг дуусгаарай.',
      choices: [{ id: 'a', text: 'Děkuji. Na shledanou.', mongolian: 'Баярлалаа. Баяртай.' }, { id: 'b', text: 'Ahoj.', mongolian: 'Сайн уу.' }, { id: 'c', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' }], correctId: 'a', feedbackMn: 'Бүх мэдээллийг авсан бол Děkuji. Na shledanou. гэж яриаг эелдгээр дуусгана.'
    },
  ],
};
