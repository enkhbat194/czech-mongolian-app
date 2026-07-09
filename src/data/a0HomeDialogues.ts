import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0HomeMicroDialogues: Record<string, DialogueScenario> = {
  'a0-9-a': {
    id:'a0-9-a-dialogue', titleMn:'Богино яриа — түлхүүр байна', contextMn:'Та байрны түлхүүртэйгээ хэлж байна.',
    steps:[
      { id:'a09a-d1', speaker:'Ажилтан', staffCzech:'Máte klíč?', staffMn:'Түлхүүр байгаа юу?', promptMn:'Та түлхүүртэйгээ хэлээрэй.', choices:choices([['a','Mám klíč.','Надад түлхүүр байна.'],['b','Je zima.','Хүйтэн байна.'],['c','Bolí mě hlava.','Миний толгой өвдөж байна.']]), correctId:'a', feedbackMn:'Түлхүүртэй бол Mám klíč. гэж хэлнэ.' },
      { id:'a09a-d2', speaker:'Ажилтан', staffCzech:'Kde je pokoj?', staffMn:'Өрөө хаана байна?', promptMn:'Та энд гэж хариулаарай.', choices:choices([['a','Tady.','Энд.'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Slyším vás.','Би таныг сонсож байна.']]), correctId:'a', feedbackMn:'Асуудал байгаа газрыг Tady. гэж зааж болно.' },
    ],
  },
  'a0-9-b': {
    id:'a0-9-b-dialogue', titleMn:'Богино яриа — түлхүүр байхгүй', contextMn:'Та байранд асуудалтай, түлхүүргүй байна.',
    steps:[
      { id:'a09b-d1', speaker:'Ажилтан', staffCzech:'Jaký problém?', staffMn:'Ямар асуудал вэ?', promptMn:'Та түлхүүр байхгүйгээ хэлээрэй.', choices:choices([['a','Nemám klíč.','Надад түлхүүр байхгүй.'],['b','Mám klíč.','Надад түлхүүр байна.'],['c','Platím kartou.','Би картаар төлнө.']]), correctId:'a', feedbackMn:'Түлхүүргүй бол Nemám klíč. гэж хэлнэ.' },
      { id:'a09b-d2', speaker:'Ажилтан', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Neteče voda.','Ус гарахгүй байна.'],['c','Účtenku, prosím.','Баримт өгнө үү.']]), correctId:'a', feedbackMn:'Тусламж авсны дараа Děkuji. гэж хэлнэ.' },
    ],
  },
  'a0-9-c': {
    id:'a0-9-c-dialogue', titleMn:'Богино яриа — ус гарахгүй', contextMn:'Та өрөөнд ус гарахгүй байгааг хэлж байна.',
    steps:[
      { id:'a09c-d1', speaker:'Ажилтан', staffCzech:'Jaký problém?', staffMn:'Ямар асуудал вэ?', promptMn:'Та ус гарахгүй байгааг хэлээрэй.', choices:choices([['a','Neteče voda.','Ус гарахгүй байна.'],['b','Je zima.','Хүйтэн байна.'],['c','Slyším vás.','Би таныг сонсож байна.']]), correctId:'a', feedbackMn:'Ус гарахгүй бол Neteče voda. гэж хэлнэ.' },
      { id:'a09c-d2', speaker:'Ажилтан', staffCzech:'Kde je problém?', staffMn:'Асуудал хаана байна?', promptMn:'Та энд гэж хариулаарай.', choices:choices([['a','Tady.','Энд.'],['b','Dobrý den.','Сайн байна уу.'],['c','Jak to mám brát?','Үүнийг яаж уух вэ?']]), correctId:'a', feedbackMn:'Асуудлын газрыг Tady. гэж заана.' },
    ],
  },
  'a0-9-d': {
    id:'a0-9-d-dialogue', titleMn:'Богино яриа — хүйтэн байна', contextMn:'Та өрөө хүйтэн байгааг хэлж байна.',
    steps:[
      { id:'a09d-d1', speaker:'Ажилтан', staffCzech:'Jaký problém?', staffMn:'Ямар асуудал вэ?', promptMn:'Та хүйтэн байгааг хэлээрэй.', choices:choices([['a','Je zima.','Хүйтэн байна.'],['b','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['c','Tohle, prosím.','Үүнийг авъя.']]), correctId:'a', feedbackMn:'Хүйтэн байвал Je zima. гэж хэлнэ.' },
      { id:'a09d-d2', speaker:'Ажилтан', staffCzech:'Dobře. Ukážu vám.', staffMn:'За. Би танд үзүүлж өгнө.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Bolí mě břicho.','Миний гэдэс өвдөж байна.'],['c','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.']]), correctId:'a', feedbackMn:'Děkuji. = Баярлалаа.' },
    ],
  },
};

export const a0HomeFinalDialogue: DialogueScenario = {
  id:'a0-9-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та байрны ажилтанд асуудал байгааг хэлж, тусламж авч байна.',
  steps:[
    { id:'a09final-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд асуудал байгааг хэлээрэй.', choices:choices([['a','Dobrý den. Je problém.','Сайн байна уу. Асуудал байна.'],['b','Dobrý den. Tohle, prosím.','Сайн байна уу. Үүнийг авъя.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Яриаг Dobrý den. Je problém. гэж эхэлж болно.' },
    { id:'a09final-d2', speaker:'Ажилтан', staffCzech:'Jaký problém?', staffMn:'Ямар асуудал вэ?', promptMn:'Та түлхүүр байхгүйгээ хэлээрэй.', choices:choices([['a','Nemám klíč.','Надад түлхүүр байхгүй.'],['b','Mám teplotu.','Би халуурч байна.'],['c','Platím hotově.','Би бэлнээр төлнө.']]), correctId:'a', feedbackMn:'Түлхүүр байхгүй бол Nemám klíč. гэж хэлнэ.' },
    { id:'a09final-d3', speaker:'Ажилтан', staffCzech:'Kde je pokoj?', staffMn:'Өрөө хаана байна?', promptMn:'Та энд гэж заагаарай.', choices:choices([['a','Tady.','Энд.'],['b','Nerozumím.','Би ойлгохгүй байна.'],['c','Účtenku, prosím.','Баримт өгнө үү.']]), correctId:'a', feedbackMn:'Tady. = Энд.' },
    { id:'a09final-d4', speaker:'Ажилтан', staffCzech:'Dobře. Ukážu vám.', staffMn:'За. Би танд үзүүлж өгнө.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Je zima.','Хүйтэн байна.'],['c','Tašku, prosím.','Уут өгнө үү.']]), correctId:'a', feedbackMn:'Яриаг Děkuji. гэж хаана.' },
  ],
};
