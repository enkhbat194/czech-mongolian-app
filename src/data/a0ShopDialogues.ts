import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0ShopMicroDialogues: Record<string, DialogueScenario> = {
  'a0-8-a': {
    id:'a0-8-a-dialogue', titleMn:'Богино яриа — уут хүсэх', contextMn:'Та дэлгүүрийн кассан дээр уут авах гэж байна.',
    steps:[
      { id:'a08a-d1', speaker:'Ажилтан', staffCzech:'Chcete tašku?', staffMn:'Уут хэрэгтэй юу?', promptMn:'Та уут авна гэж хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Ano, tašku, prosím.','Тийм, уут өгнө үү.'],['c','Kdy končíme?','Бид хэзээ тарах вэ?']]), correctId:'b', feedbackMn:'Уут авах бол Ano, tašku, prosím. гэж хариулна.' },
      { id:'a08a-d2', speaker:'Ажилтан', staffCzech:'Dobře. Ještě něco?', staffMn:'За. Өөр зүйл авах уу?', promptMn:'Та өөр зүйл авахгүй гэж эелдгээр хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Dám si polévku.','Шөл авъя.']]), correctId:'a', feedbackMn:'Өөр зүйл авахгүй бол Ne, děkuji. гэж хэлнэ.' },
    ],
  },
  'a0-8-b': {
    id:'a0-8-b-dialogue', titleMn:'Богино яриа — баримт хүсэх', contextMn:'Та худалдан авалтын баримт авах гэж байна.',
    steps:[
      { id:'a08b-d1', speaker:'Ажилтан', staffCzech:'Chcete účtenku?', staffMn:'Баримт хэрэгтэй юу?', promptMn:'Та баримт авна гэж хариулаарай.', choices:choices([['a','S sebou, prosím.','Авч явъя.'],['b','Jdu na nádraží.','Би галт тэрэгний буудал руу явж байна.'],['c','Ano, účtenku, prosím.','Тийм, баримт өгнө үү.']]), correctId:'c', feedbackMn:'Баримт авах бол Ano, účtenku, prosím. гэж хариулна.' },
      { id:'a08b-d2', speaker:'Ажилтан', staffCzech:'Tady je účtenka.', staffMn:'Баримт энд байна.', promptMn:'Та баримтаа авсандаа талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Účtenku, prosím.','Баримт өгнө үү.'],['c','Je zima.','Хүйтэн байна.']]), correctId:'a', feedbackMn:'Баримтаа авсны дараа Děkuji. гэж талархана.' },
    ],
  },
  'a0-8-c': {
    id:'a0-8-c-dialogue', titleMn:'Богино яриа — бараа заах', contextMn:'Та дэлгүүрт бараа зааж авах гэж байна.',
    steps:[
      { id:'a08c-d1', speaker:'Ажилтан', staffCzech:'Dobrý den. Co si přejete?', staffMn:'Сайн байна уу. Та юу авах вэ?', promptMn:'Та бараагаа зааж хэлээрэй.', choices:choices([['a','Dobrý den. Kdy máte čas?','Сайн байна уу. Та хэзээ завтай вэ?'],['b','Dobrý den. Tohle, prosím.','Сайн байна уу. Үүнийг авъя.'],['c','Na shledanou.','Баяртай.']]), correctId:'b', feedbackMn:'Бараа зааж авахдаа Tohle, prosím. гэж хэлнэ.' },
      { id:'a08c-d2', speaker:'Ажилтан', staffCzech:'Dobře. Ještě něco?', staffMn:'За. Өөр зүйл авах уу?', promptMn:'Та өөр зүйл авахгүй гэж хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Tohle, prosím.','Үүнийг авъя.'],['c','Kolik je hodin?','Цаг хэд болж байна?']]), correctId:'a', feedbackMn:'Яриаг үргэлжлүүлэхгүй бол Ne, děkuji. гэж хариулна.' },
    ],
  },
  'a0-8-d': {
    id:'a0-8-d-dialogue', titleMn:'Богино яриа — үнэ өндөр байна', contextMn:'Та үнэ асуугаад, үнэтэй санагдаж байгааг хэлж байна.',
    steps:[
      { id:'a08d-d1', speaker:'Ажилтан', staffCzech:'To je všechno?', staffMn:'Ингээд бүгд үү?', promptMn:'Та үнийг асуугаарай.', choices:choices([['a','Tašku, prosím.','Уут өгнө үү.'],['b','Kolik to stojí?','Энэ хэд вэ?'],['c','Pracuji tady.','Би энд ажилладаг.']]), correctId:'b', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
      { id:'a08d-d2', speaker:'Ажилтан', staffCzech:'Je to dvě stě korun.', staffMn:'Хоёр зуун крон байна.', promptMn:'Та үнэ өндөр санагдаж байгааг хэлээрэй.', choices:choices([['a','Mám čas.','Би завтай.'],['b','Menu, prosím.','Цэс өгнө үү.'],['c','To je drahé.','Энэ үнэтэй байна.']]), correctId:'c', feedbackMn:'Үнэ өндөр санагдвал To je drahé. гэж хэлж болно.' },
    ],
  },
};

export const a0ShopFinalDialogue: DialogueScenario = {
  id:'a0-8-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та дэлгүүрт бараа авч, үнэ асууж, уут болон баримт хүсэж, картаар төлж байна.',
  steps:[
    { id:'a08final-d1', speaker:'Ажилтан', staffCzech:'Dobrý den. Co si přejete?', staffMn:'Сайн байна уу. Та юу авах вэ?', promptMn:'Та бараагаа зааж хэлээрэй.', choices:choices([['a','Dobrý den. Menu, prosím.','Сайн байна уу. Цэс өгнө үү.'],['b','Na shledanou.','Баяртай.'],['c','Dobrý den. Tohle, prosím.','Сайн байна уу. Үүнийг авъя.']]), correctId:'c', feedbackMn:'Дэлгүүрт бараа заахдаа Dobrý den. Tohle, prosím. гэж эхэлж болно.' },
    { id:'a08final-d2', speaker:'Ажилтан', staffCzech:'Dobře. Ještě něco?', staffMn:'За. Өөр зүйл авах уу?', promptMn:'Та үнийг асуугаарай.', choices:choices([['a','Kolik to stojí?','Энэ хэд вэ?'],['b','Kdy končíme?','Бид хэзээ тарах вэ?'],['c','S sebou, prosím.','Авч явъя.']]), correctId:'a', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
    { id:'a08final-d3', speaker:'Ажилтан', staffCzech:'Chcete tašku?', staffMn:'Уут хэрэгтэй юу?', promptMn:'Та уут авна гэж хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Dám si kávu.','Кофе авъя.'],['c','Ano, tašku, prosím.','Тийм, уут өгнө үү.']]), correctId:'c', feedbackMn:'Уут авах бол Ano, tašku, prosím. гэж хариулна.' },
    { id:'a08final-d4', speaker:'Ажилтан', staffCzech:'Platíte kartou, nebo hotově?', staffMn:'Та картаар төлөх үү, бэлнээр төлөх үү?', promptMn:'Та картаар төлнө гэж хэлээрэй.', choices:choices([['a','Platím kartou.','Картаар төлнө.'],['b','Platím hotově.','Бэлнээр төлнө.'],['c','Nemám čas.','Би завгүй.']]), correctId:'a', feedbackMn:'Картаар төлөхдөө Platím kartou. гэж хариулж болно.' },
    { id:'a08final-d5', speaker:'Ажилтан', staffCzech:'Chcete účtenku?', staffMn:'Баримт хэрэгтэй юу?', promptMn:'Та баримт авна гэж хариулаарай.', choices:choices([['a','Ne, nemám kartu.','Үгүй, надад карт байхгүй.'],['b','Ano, účtenku, prosím.','Тийм, баримт өгнө үү.'],['c','To je drahé.','Энэ үнэтэй байна.']]), correctId:'b', feedbackMn:'Баримт авах бол Ano, účtenku, prosím. гэж хариулна.' },
    { id:'a08final-d6', speaker:'Ажилтан', staffCzech:'Tady je účtenka. Děkuji.', staffMn:'Баримт энд байна. Баярлалаа.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Účtenku, prosím.','Баримт өгнө үү.'],['b','Tohle, prosím.','Үүнийг авъя.'],['c','Děkuji. Na shledanou.','Баярлалаа. Баяртай.']]), correctId:'c', feedbackMn:'Яриаг Děkuji. Na shledanou. гэж хаана.' },
  ],
};
