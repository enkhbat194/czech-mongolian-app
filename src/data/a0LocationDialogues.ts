import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0LocationMicroDialogues: Record<string, DialogueScenario> = {
  'a0-3-a': {
    id: 'a0-3-a-dialogue', titleMn: 'Богино яриа — ариун цэврийн өрөө', contextMn: 'Та том барилгын үүдэнд байна. Та эхлээд ариун цэврийн өрөөг олох хэрэгтэй.',
    steps: [
      { id:'a03a-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та ариун цэврийн өрөө хаана байгааг эелдгээр асуугаарай.', choices:choices([['a','Prosím, kde je toaleta?','Ариун цэврийн өрөө хаана вэ?'],['b','Kde je lékárna?','Эмийн сан хаана вэ?'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Prosím, kde je toaleta? = Ариун цэврийн өрөө хаана вэ?' },
      { id:'a03a-d2', speaker:'Ажилтан', staffCzech:'Toaleta je tady.', staffMn:'Ариун цэврийн өрөө энд байна.', promptMn:'Та чиглэлийг ойлгосон бол талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Tam.','Тэнд.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Toaleta je tady. = Ариун цэврийн өрөө энд байна.' },
    ],
  },
  'a0-3-b': {
    id: 'a0-3-b-dialogue', titleMn: 'Богино яриа — энд үү, тэнд үү?', contextMn: 'Та газрын зураг дээр галт тэрэгний буудлыг заагаад байрлалыг тодруулж байна.',
    steps: [
      { id:'a03b-d1', speaker:'Ажилтан', staffCzech:'Hledáte nádraží?', staffMn:'Та галт тэрэгний буудал хайж байна уу?', promptMn:'Та газрын зураг дээрх хоёр сонголтын аль нь болохыг асуугаарай.', choices:choices([['a','Tady, nebo tam?','Энд үү, тэнд үү?'],['b','Kde je obchod?','Дэлгүүр хаана вэ?'],['c','Kde je lékárna?','Эмийн сан хаана вэ?']]), correctId:'a', feedbackMn:'Tady, nebo tam? = Энд үү, тэнд үү?' },
      { id:'a03b-d2', speaker:'Ажилтан', staffCzech:'Tam.', staffMn:'Тэнд.', promptMn:'Та хариуг ойлгосон бол талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Tady.','Энд.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Tam. = Тэнд.' },
    ],
  },
  'a0-3-c': {
    id: 'a0-3-c-dialogue', titleMn: 'Богино яриа — ус авах дэлгүүр', contextMn: 'Та ус авахын тулд ойрхон дэлгүүр хайж байна.',
    steps: [
      { id:'a03c-d1', speaker:'Ажилтан', staffCzech:'Dobrý den. Co potřebujete?', staffMn:'Сайн байна уу. Танд юу хэрэгтэй вэ?', promptMn:'Та дэлгүүр хаана байгааг асуугаарай.', choices:choices([['a','Kde je obchod?','Дэлгүүр хаана вэ?'],['b','Prosím, kde je toaleta?','Ариун цэврийн өрөө хаана вэ?'],['c','Kde je lékárna?','Эмийн сан хаана вэ?']]), correctId:'a', feedbackMn:'Kde je obchod? = Дэлгүүр хаана вэ?' },
      { id:'a03c-d2', speaker:'Ажилтан', staffCzech:'Obchod je tam.', staffMn:'Дэлгүүр тэнд байна.', promptMn:'Та чиглэл авсандаа талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Tady.','Энд.'],['c','Kde je lékárna?','Эмийн сан хаана вэ?']]), correctId:'a', feedbackMn:'Obchod je tam. = Дэлгүүр тэнд байна.' },
    ],
  },
  'a0-3-d': {
    id: 'a0-3-d-dialogue', titleMn: 'Богино яриа — эмийн сан', contextMn: 'Та эмийн сан хайж байна.',
    steps: [
      { id:'a03d-d1', speaker:'Ажилтан', staffCzech:'Dobrý den. Co potřebujete?', staffMn:'Сайн байна уу. Танд юу хэрэгтэй вэ?', promptMn:'Та эмийн сан хаана байгааг асуугаарай.', choices:choices([['a','Kde je lékárna?','Эмийн сан хаана вэ?'],['b','Kde je obchod?','Дэлгүүр хаана вэ?'],['c','Tady, nebo tam?','Энд үү, тэнд үү?']]), correctId:'a', feedbackMn:'Kde je lékárna? = Эмийн сан хаана вэ?' },
      { id:'a03d-d2', speaker:'Ажилтан', staffCzech:'Lékárna je tady.', staffMn:'Эмийн сан энд байна.', promptMn:'Та мэдээллийг ойлгосон бол талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Nerozumím.','Би ойлгохгүй байна.'],['c','Kde je obchod?','Дэлгүүр хаана вэ?']]), correctId:'a', feedbackMn:'Lékárna je tady. = Эмийн сан энд байна.' },
    ],
  },
};

export const a0LocationFinalDialogue: DialogueScenario = {
  id: 'a0-3-final-dialogue', titleMn: 'Төгсгөлийн бодит яриа', contextMn: 'Та худалдааны төвийн мэдээллийн ширээн дээр эмийн сан болон ариун цэврийн өрөөний байршлыг асууж байна.',
  steps: [
    { id:'a03final-d1', speaker:'Мэдээллийн ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та албан ёсоор мэндлээрэй.', choices:choices([['a','Dobrý den.','Сайн байна уу.'],['b','Ahoj.','Сайн уу.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Мэдээллийн ширээн дээр Dobrý den. гэж эхэлнэ.' },
    { id:'a03final-d2', speaker:'Мэдээллийн ажилтан', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та эмийн сан хаана байгааг эелдгээр асуугаарай.', choices:choices([['a','Kde je lékárna?','Эмийн сан хаана вэ?'],['b','Prosím, kde je toaleta?','Ариун цэврийн өрөө хаана вэ?'],['c','Nemám peníze.','Надад мөнгө байхгүй.']]), correctId:'a', feedbackMn:'Kde je lékárna? = Эмийн сан хаана вэ?' },
    { id:'a03final-d3', speaker:'Мэдээллийн ажилтан', staffCzech:'Lékárna je tam.', staffMn:'Эмийн сан тэнд байна.', promptMn:'Та тэнд үү гэдгийг баталгаажуулаарай.', choices:choices([['a','Tam?','Тэнд үү?'],['b','Tady?','Энд үү?'],['c','Kde je obchod?','Дэлгүүр хаана вэ?']]), correctId:'a', feedbackMn:'Сонссон байрлалаа богиноор давтаж баталгаажуулж болно.' },
    { id:'a03final-d4', speaker:'Мэдээллийн ажилтан', staffCzech:'Ano, tam.', staffMn:'Тийм, тэнд.', promptMn:'Та талархаад, ариун цэврийн өрөө хаана байгааг асуугаарай.', choices:choices([['a','Děkuji. Prosím, kde je toaleta?','Баярлалаа. Ариун цэврийн өрөө хаана вэ?'],['b','Kde je obchod?','Дэлгүүр хаана вэ?'],['c','Tady, nebo tam?','Энд үү, тэнд үү?']]), correctId:'a', feedbackMn:'Нэг мэдээллээ авсны дараа талархаад дараагийн хэрэгтэй газраа асууж болно.' },
    { id:'a03final-d5', speaker:'Мэдээллийн ажилтан', staffCzech:'Toaleta je tady.', staffMn:'Ариун цэврийн өрөө энд байна.', promptMn:'Та энд гэдгийг ойлгосон бол талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Tam.','Тэнд.'],['c','Nemám kartu.','Надад карт байхгүй.']]), correctId:'a', feedbackMn:'Toaleta je tady. = Ариун цэврийн өрөө энд байна.' },
    { id:'a03final-d6', speaker:'Мэдээллийн ажилтан', staffCzech:'Na shledanou.', staffMn:'Баяртай.', promptMn:'Та бүх мэдээллээ авсан бол эелдгээр яриаг дуусгаарай.', choices:choices([['a','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['b','Ahoj.','Сайн уу.'],['c','Nemám kartu.','Надад карт байхгүй.']]), correctId:'a', feedbackMn:'Děkuji. Na shledanou. гэж эелдгээр хаана.' },
  ],
};
