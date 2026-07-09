import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0ShopMicroDialogues: Record<string, DialogueScenario> = {
  'a0-8-a': {
    id:'a0-8-a-dialogue', titleMn:'Богино яриа — уут хүсэх', contextMn:'Та дэлгүүрийн кассан дээр уут авах гэж байна.',
    steps:[
      { id:'a08a-d1', speaker:'Ажилтан', staffCzech:'Chcete tašku?', staffMn:'Уут авах уу?', promptMn:'Та уут авна гэж хариулаарай.', choices:choices([['a','Ano, tašku, prosím.','Тийм, уут өгнө үү.'],['b','Ne, děkuji.','Үгүй, баярлалаа.'],['c','Kdy končíme?','Бид хэзээ тарах вэ?']]), correctId:'a', feedbackMn:'Уут авах бол Ano, tašku, prosím. гэж хариулна.' },
      { id:'a08a-d2', speaker:'Ажилтан', staffCzech:'Ještě něco?', staffMn:'Өөр зүйл авах уу?', promptMn:'Та өөр зүйл авахгүй гэж эелдгээр хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Dám si polévku.','Би шөл авъя.']]), correctId:'a', feedbackMn:'Өөр зүйл авахгүй бол Ne, děkuji. гэж хэлнэ.' },
    ],
  },
  'a0-8-b': {
    id:'a0-8-b-dialogue', titleMn:'Богино яриа — баримт хүсэх', contextMn:'Та худалдан авалтын баримт авах гэж байна.',
    steps:[
      { id:'a08b-d1', speaker:'Ажилтан', staffCzech:'Chcete účtenku?', staffMn:'Баримт авах уу?', promptMn:'Та баримт авна гэж хариулаарай.', choices:choices([['a','Ano, účtenku, prosím.','Тийм, баримт өгнө үү.'],['b','S sebou, prosím.','Авч явна, гуйя.'],['c','Jdu na nádraží.','Би галт тэрэгний буудал руу явж байна.']]), correctId:'a', feedbackMn:'Баримт авах бол Ano, účtenku, prosím. гэж хариулна.' },
      { id:'a08b-d2', speaker:'Ажилтан', staffCzech:'Prosím.', staffMn:'За.', promptMn:'Та баримтаа хүсээрэй.', choices:choices([['a','Účtenku, prosím.','Баримт өгнө үү.'],['b','Dám si čaj.','Би цай авъя.'],['c','Je zima.','Хүйтэн байна.']]), correctId:'a', feedbackMn:'Баримт хүсэхдээ Účtenku, prosím. гэж хэлнэ.' },
    ],
  },
  'a0-8-c': {
    id:'a0-8-c-dialogue', titleMn:'Богино яриа — бараа заах', contextMn:'Та дэлгүүрт бараа зааж авах гэж байна.',
    steps:[
      { id:'a08c-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд бараагаа зааж хэлээрэй.', choices:choices([['a','Dobrý den. Tohle, prosím.','Сайн байна уу. Үүнийг авъя.'],['b','Dobrý den. Kdy máte čas?','Сайн байна уу. Та хэзээ завтай вэ?'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Бараа зааж авахдаа Tohle, prosím. гэж хэлнэ.' },
      { id:'a08c-d2', speaker:'Ажилтан', staffCzech:'Ještě něco?', staffMn:'Өөр зүйл авах уу?', promptMn:'Та өөр зүйл авахгүй гэж хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Tohle, prosím.','Үүнийг авъя.'],['c','Kolik je hodin?','Цаг хэд болж байна?']]), correctId:'a', feedbackMn:'Яриаг үргэлжлүүлэхгүй бол Ne, děkuji. гэж хариулна.' },
    ],
  },
  'a0-8-d': {
    id:'a0-8-d-dialogue', titleMn:'Богино яриа — үнэ өндөр байна', contextMn:'Та үнэ асуугаад, үнэтэй санагдаж байгааг хэлж байна.',
    steps:[
      { id:'a08d-d1', speaker:'Ажилтан', staffCzech:'Hotovo.', staffMn:'Боллоо.', promptMn:'Та үнийг асуугаарай.', choices:choices([['a','Kolik to stojí?','Энэ хэд вэ?'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Pracuji tady.','Би энд ажилладаг.']]), correctId:'a', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
      { id:'a08d-d2', speaker:'Ажилтан', staffCzech:'Je to dvě stě korun.', staffMn:'Хоёр зуун крон байна.', promptMn:'Та үнэ өндөр санагдаж байгааг хэлээрэй.', choices:choices([['a','To je drahé.','Энэ үнэтэй байна.'],['b','Mám čas.','Би завтай.'],['c','Menu, prosím.','Цэс өгнө үү.']]), correctId:'a', feedbackMn:'Үнэ өндөр санагдвал To je drahé. гэж хэлж болно.' },
    ],
  },
};

export const a0ShopFinalDialogue: DialogueScenario = {
  id:'a0-8-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та дэлгүүрт бараа авч, үнэ асууж, уут болон баримт хүсэж, картаар төлж байна.',
  steps:[
    { id:'a08final-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд бараагаа зааж хэлээрэй.', choices:choices([['a','Dobrý den. Tohle, prosím.','Сайн байна уу. Үүнийг авъя.'],['b','Dobrý den. Menu, prosím.','Сайн байна уу. Цэс өгнө үү.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Дэлгүүрт бараа заахдаа Dobrý den. Tohle, prosím. гэж эхэлж болно.' },
    { id:'a08final-d2', speaker:'Ажилтан', staffCzech:'Prosím.', staffMn:'За.', promptMn:'Та үнийг асуугаарай.', choices:choices([['a','Kolik to stojí?','Энэ хэд вэ?'],['b','Kdy končíme?','Бид хэзээ тарах вэ?'],['c','S sebou, prosím.','Авч явна, гуйя.']]), correctId:'a', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
    { id:'a08final-d3', speaker:'Ажилтан', staffCzech:'Chcete tašku?', staffMn:'Уут авах уу?', promptMn:'Та уут авна гэж хариулаарай.', choices:choices([['a','Ano, tašku, prosím.','Тийм, уут өгнө үү.'],['b','Ne, děkuji.','Үгүй, баярлалаа.'],['c','Dám si kávu.','Би кофе авъя.']]), correctId:'a', feedbackMn:'Уут авах бол Ano, tašku, prosím. гэж хариулна.' },
    { id:'a08final-d4', speaker:'Ажилтан', staffCzech:'Platíte kartou?', staffMn:'Та картаар төлөх үү?', promptMn:'Та картаар төлнө гэж хэлээрэй.', choices:choices([['a','Ano, platím kartou.','Тийм, картаар төлнө.'],['b','Platím hotově.','Би бэлнээр төлнө.'],['c','Nemám čas.','Би завгүй.']]), correctId:'a', feedbackMn:'Картаар төлөхдөө Ano, platím kartou. гэж хариулж болно.' },
    { id:'a08final-d5', speaker:'Ажилтан', staffCzech:'Chcete účtenku?', staffMn:'Баримт авах уу?', promptMn:'Та баримт авна гэж хариулаарай.', choices:choices([['a','Ano, účtenku, prosím.','Тийм, баримт өгнө үү.'],['b','Ne, nemám kartu.','Үгүй, надад карт байхгүй.'],['c','To je drahé.','Энэ үнэтэй байна.']]), correctId:'a', feedbackMn:'Баримт авах бол Ano, účtenku, prosím. гэж хариулна.' },
    { id:'a08final-d6', speaker:'Ажилтан', staffCzech:'Děkuji.', staffMn:'Баярлалаа.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['b','Účtenku, prosím.','Баримт өгнө үү.'],['c','Tohle, prosím.','Үүнийг авъя.']]), correctId:'a', feedbackMn:'Яриаг Děkuji. Na shledanou. гэж хаана.' },
  ],
};
