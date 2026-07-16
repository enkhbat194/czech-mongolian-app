import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0HomeMicroDialogues: Record<string, DialogueScenario> = {
  'a0-9-a': {
    id:'a0-9-a-dialogue', titleMn:'Богино яриа — түлхүүр байна', contextMn:'Та байрандаа ирээд түлхүүртэйгээ хэлж байна.',
    steps:[
      { id:'a09a-d1', speaker:'Ажилтан', staffCzech:'Máte klíč?', staffMn:'Түлхүүр байгаа юу?', promptMn:'Та түлхүүртэйгээ хэлээрэй.', choices:choices([['a','Mám klíč.','Надад түлхүүр байна.'],['b','Je zima.','Хүйтэн байна.'],['c','Bolí mě hlava.','Миний толгой өвдөж байна.']]), correctId:'a', feedbackMn:'Түлхүүртэй бол Mám klíč. гэж хэлнэ.' },
      { id:'a09a-d2', speaker:'Ажилтан', staffCzech:'Dobře. Pokoj je tady.', staffMn:'За. Өрөө энд байна.', promptMn:'Та ойлгосноо талархаж хариулаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Slyším vás.','Би таныг сонсож байна.']]), correctId:'a', feedbackMn:'Тусламж авсны дараа Děkuji. гэж хэлнэ.' },
    ],
  },
  'a0-9-b': {
    id:'a0-9-b-dialogue', titleMn:'Богино яриа — түлхүүр байхгүй', contextMn:'Та байранд асуудалтай, түлхүүргүй байна.',
    steps:[
      { id:'a09b-d1', speaker:'Ажилтан', staffCzech:'Jaký problém?', staffMn:'Ямар асуудал вэ?', promptMn:'Та түлхүүр байхгүйгээ хэлээрэй.', choices:choices([['a','Nemám klíč.','Надад түлхүүр байхгүй.'],['b','Mám klíč.','Надад түлхүүр байна.'],['c','Platím kartou.','Би картаар төлнө.']]), correctId:'a', feedbackMn:'Түлхүүргүй бол Nemám klíč. гэж хэлнэ.' },
      { id:'a09b-d2', speaker:'Ажилтан', staffCzech:'Dobře. Pomůžu vám.', staffMn:'За. Би танд тусалъя.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Neteče voda.','Ус гарахгүй байна.'],['c','Účtenku, prosím.','Баримт өгнө үү.']]), correctId:'a', feedbackMn:'Тусламж авсны дараа Děkuji. гэж хэлнэ.' },
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
      { id:'a09d-d1', speaker:'Ажилтан', staffCzech:'Je ještě nějaký problém?', staffMn:'Өөр асуудал байна уу?', promptMn:'Та хүйтэн байгааг хэлээрэй.', choices:choices([['a','Je zima.','Хүйтэн байна.'],['b','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['c','Tohle, prosím.','Үүнийг авъя.']]), correctId:'a', feedbackMn:'Хүйтэн байвал Je zima. гэж хэлнэ.' },
      { id:'a09d-d2', speaker:'Ажилтан', staffCzech:'Dobře. Ukážu vám.', staffMn:'За. Би танд үзүүлж өгнө.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Bolí mě břicho.','Миний гэдэс өвдөж байна.'],['c','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.']]), correctId:'a', feedbackMn:'Děkuji. = Баярлалаа.' },
    ],
  },
};

export const a0HomeFinalDialogue: DialogueScenario = {
  id:'a0-9-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та байранд ирээд өрөө, түлхүүр, ус, хүйтэн гэсэн асуудлаа дарааллаар хэлж тусламж авч байна.',
  steps:[
    { id:'a09final-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд нэрээ хэлээрэй.', choices:choices([['a','Dobrý den. Jmenuji se Eba.','Сайн байна уу. Миний нэр Эба.'],['b','Dobrý den. Menu, prosím.','Сайн байна уу. Цэс өгнө үү.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Байр дээр ч мэндлээд нэрээ хэлэх хэллэг давтагдана.' },
    { id:'a09final-d2', speaker:'Ажилтан', staffCzech:'Mluvíte česky?', staffMn:'Та чехээр ярьдаг уу?', promptMn:'Та ойлгоход хэцүү байвал удаан ярихыг хүсээрэй.', choices:choices([['a','Nerozumím. Mluvte prosím pomalu.','Би ойлгохгүй байна. Удаан ярьж өгнө үү.'],['b','Platím kartou.','Би картаар төлнө.'],['c','Dám si kávu.','Би кофе авъя.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед өмнөх хичээлийн Nerozumím. Mluvte prosím pomalu. дахин хэрэглэнэ.' },
    { id:'a09final-d3', speaker:'Ажилтан', staffCzech:'Jaký problém?', staffMn:'Ямар асуудал вэ?', promptMn:'Та асуудал байгааг ерөнхийд нь хэлээрэй.', choices:choices([['a','Je problém.','Асуудал байна.'],['b','Je hotovo?','Дууссан уу?'],['c','Kolik je hodin?','Цаг хэд болж байна?']]), correctId:'a', feedbackMn:'Асуудлыг эхлүүлэх богино өгүүлбэр нь Je problém.' },
    { id:'a09final-d4', speaker:'Ажилтан', staffCzech:'Máte klíč?', staffMn:'Түлхүүр байгаа юу?', promptMn:'Та түлхүүр байхгүйгээ хэлээрэй.', choices:choices([['a','Nemám klíč.','Надад түлхүүр байхгүй.'],['b','Mám klíč.','Надад түлхүүр байна.'],['c','Mám teplotu.','Би халуурч байна.']]), correctId:'a', feedbackMn:'Түлхүүргүй бол Nemám klíč. гэж хэлнэ.' },
    { id:'a09final-d5', speaker:'Ажилтан', staffCzech:'Kde je problém?', staffMn:'Асуудал хаана байна?', promptMn:'Та өрөө энд гэж заагаарай.', choices:choices([['a','Pokoj je tady.','Өрөө энд байна.'],['b','Obchod je tam.','Дэлгүүр тэнд байна.'],['c','Autobus je tady.','Автобус энд байна.']]), correctId:'a', feedbackMn:'pokoj болон tady-г хамт ашиглаж байна.' },
    { id:'a09final-d6', speaker:'Ажилтан', staffCzech:'Je problém s vodou?', staffMn:'Устай холбоотой асуудал байна уу?', promptMn:'Та ус гарахгүй байгааг хэлээрэй.', choices:choices([['a','Neteče voda.','Ус гарахгүй байна.'],['b','Potřebuji vodu.','Надад ус хэрэгтэй.'],['c','Chci vodu.','Би ус хүсэж байна.']]), correctId:'a', feedbackMn:'Усны асуудал бол Neteče voda.' },
    { id:'a09final-d7', speaker:'Ажилтан', staffCzech:'Ještě něco?', staffMn:'Өөр асуудал байна уу?', promptMn:'Та хүйтэн байгааг хэлээрэй.', choices:choices([['a','Je zima.','Хүйтэн байна.'],['b','Dnes je teplo.','Өнөөдөр дулаахан байна.'],['c','To je drahé.','Энэ үнэтэй байна.']]), correctId:'a', feedbackMn:'Өрөө хүйтэн байвал Je zima. гэж хэлнэ.' },
    { id:'a09final-d8', speaker:'Ажилтан', staffCzech:'Dobře. Pomůžu vám.', staffMn:'За. Би танд тусалъя.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['b','Účtenku, prosím.','Баримт өгнө үү.'],['c','S sebou, prosím.','Авч явъя.']]), correctId:'a', feedbackMn:'Děkuji. Na shledanou. гэж яриаг хаана.' },
  ],
};
