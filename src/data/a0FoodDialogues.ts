import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0FoodMicroDialogues: Record<string, DialogueScenario> = {
  'a0-7-a': {
    id:'a0-7-a-dialogue', titleMn:'Богино яриа — цэс хүсэх', contextMn:'Та кафед орж, эхлээд цэс хүсэж байна.',
    steps:[
      { id:'a07a-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд цэс хүсээрэй.', choices:choices([['a','Kdy končíme?','Бид хэзээ тарах вэ?'],['b','Dobrý den. Menu, prosím.','Сайн байна уу. Цэс өгнө үү.'],['c','Jdu na nádraží.','Би галт тэрэгний буудал руу явж байна.']]), correctId:'b', feedbackMn:'Кафед эхлээд Dobrý den. гэж мэндлээд Menu, prosím. гэж хүснэ.' },
      { id:'a07a-d2', speaker:'Ажилтан', staffCzech:'Tady je menu. Co si dáte?', staffMn:'Цэс энд байна. Та юу авах вэ?', promptMn:'Та кофе авах гэж байгаагаа эелдгээр хэлээрэй.', choices:choices([['a','Dám si kávu, prosím.','Кофе авъя.'],['b','Je hotovo?','Дууссан уу?'],['c','Pracuji tady.','Би энд ажилладаг.']]), correctId:'a', feedbackMn:'Co si dáte? гэвэл Dám si ... загвараар захиална.' },
    ],
  },
  'a0-7-b': {
    id:'a0-7-b-dialogue', titleMn:'Богино яриа — кофе захиалах', contextMn:'Ажилтан таны захиалгыг асууж байна.',
    steps:[
      { id:'a07b-d1', speaker:'Ажилтан', staffCzech:'Co si dáte?', staffMn:'Та юу авах вэ?', promptMn:'Та кофе авах гэж байна. Зөв захиалгыг сонго.', choices:choices([['a','Dám si čaj.','Цай авъя.'],['b','Menu, prosím.','Цэс өгнө үү.'],['c','Dám si kávu, prosím.','Кофе авъя.']]), correctId:'c', feedbackMn:'Dám si kávu, prosím. = Кофе авъя.' },
      { id:'a07b-d2', speaker:'Ажилтан', staffCzech:'Dáte si ještě něco?', staffMn:'Та өөр зүйл авах уу?', promptMn:'Та өөр зүйл авахгүй гэж эелдгээр хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Dám si čaj.','Цай авъя.'],['c','Kde je lékárna?','Эмийн сан хаана байна?']]), correctId:'a', feedbackMn:'Ne, děkuji. нь эелдэг татгалзах reuse phrase.' },
    ],
  },
  'a0-7-c': {
    id:'a0-7-c-dialogue', titleMn:'Богино яриа — авч явах', contextMn:'Та кофегоо авч явах гэж байна.',
    steps:[
      { id:'a07c-d1', speaker:'Ажилтан', staffCzech:'Kávu tady, nebo s sebou?', staffMn:'Кофегоо энд уух уу, авч явах уу?', promptMn:'Та авч явах гэж байгаагаа хэлээрэй.', choices:choices([['a','Tady.','Энд.'],['b','Kolik to stojí?','Энэ хэд вэ?'],['c','S sebou, prosím.','Авч явъя.']]), correctId:'c', feedbackMn:'S sebou, prosím. = Авч явъя.' },
      { id:'a07c-d2', speaker:'Ажилтан', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та ойлгосноо товч батлаарай.', choices:choices([['a','Ano, děkuji.','Тийм, баярлалаа.'],['b','Dám si kávu.','Кофе авъя.'],['c','Kde je zastávka?','Буудал хаана байна?']]), correctId:'a', feedbackMn:'Захиалга ойлгогдсоны дараа Ano, děkuji. гэж хариулж болно.' },
    ],
  },
  'a0-7-d': {
    id:'a0-7-d-dialogue', titleMn:'Богино яриа — үнэ ба төлбөр', contextMn:'Та захиалгынхаа үнийг асууж, төлбөрийн хэлбэрээ хэлж байна.',
    steps:[
      { id:'a07d-d1', speaker:'Ажилтан', staffCzech:'Káva je hotová.', staffMn:'Кофе бэлэн боллоо.', promptMn:'Та үнэ асуугаарай.', choices:choices([['a','Dám si kávu.','Кофе авъя.'],['b','Kolik to stojí?','Энэ хэд вэ?'],['c','Menu, prosím.','Цэс өгнө үү.']]), correctId:'b', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
      { id:'a07d-d2', speaker:'Ажилтан', staffCzech:'Platíte kartou, nebo hotově?', staffMn:'Та картаар төлөх үү, бэлнээр төлөх үү?', promptMn:'Та картаар төлнө гэж хариулаарай.', choices:choices([['a','Platím hotově.','Бэлнээр төлнө.'],['b','Nemám peníze.','Надад мөнгө байхгүй.'],['c','Platím kartou.','Картаар төлнө.']]), correctId:'c', feedbackMn:'Картаар төлөх бол Platím kartou. гэж хэлнэ.' },
    ],
  },
};

export const a0FoodFinalDialogue: DialogueScenario = {
  id:'a0-7-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та кафед орж, цэс хүсэж, кофе захиалж, авч явахаа хэлж, төлбөрөө картаар хийж байна.',
  steps:[
    { id:'a07final-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд цэс хүсээрэй.', choices:choices([['a','Na shledanou.','Баяртай.'],['b','Dobrý den. Menu, prosím.','Сайн байна уу. Цэс өгнө үү.'],['c','Dobrý den. Kde je nádraží?','Сайн байна уу. Галт тэрэгний буудал хаана байна?']]), correctId:'b', feedbackMn:'Энэ нөхцөлд Dobrý den. Menu, prosím. гэж эхэлнэ.' },
    { id:'a07final-d2', speaker:'Ажилтан', staffCzech:'Tady je menu. Co si dáte?', staffMn:'Цэс энд байна. Та юу авах вэ?', promptMn:'Та кофе захиалаарай.', choices:choices([['a','Dám si kávu, prosím.','Кофе авъя.'],['b','Potřebuji telefon.','Надад утас хэрэгтэй.'],['c','Kdy končíme?','Бид хэзээ тарах вэ?']]), correctId:'a', feedbackMn:'Co si dáte? гэвэл Dám si ... загвараар захиална.' },
    { id:'a07final-d3', speaker:'Ажилтан', staffCzech:'Kávu tady, nebo s sebou?', staffMn:'Кофегоо энд уух уу, авч явах уу?', promptMn:'Та авч явна гэж хэлээрэй.', choices:choices([['a','Tady, nebo tam?','Энд үү, тэнд үү?'],['b','Děkuji.','Баярлалаа.'],['c','S sebou, prosím.','Авч явъя.']]), correctId:'c', feedbackMn:'S sebou, prosím. = Авч явъя.' },
    { id:'a07final-d4', speaker:'Ажилтан', staffCzech:'Káva je hotová.', staffMn:'Кофе бэлэн боллоо.', promptMn:'Та үнийг асуугаарай.', choices:choices([['a','Kolik to stojí?','Энэ хэд вэ?'],['b','Dám si polévku.','Шөл авъя.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
    { id:'a07final-d5', speaker:'Ажилтан', staffCzech:'Platíte kartou, nebo hotově?', staffMn:'Та картаар төлөх үү, бэлнээр төлөх үү?', promptMn:'Та картаар төлнө гэж хариулаарай.', choices:choices([['a','Ne, nemám kartu.','Үгүй, надад карт байхгүй.'],['b','Platím kartou.','Картаар төлнө.'],['c','Menu, prosím.','Цэс өгнө үү.']]), correctId:'b', feedbackMn:'Platím kartou. = Картаар төлнө.' },
    { id:'a07final-d6', speaker:'Ажилтан', staffCzech:'Děkuji.', staffMn:'Баярлалаа.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Kolik to stojí?','Энэ хэд вэ?'],['b','S sebou, prosím.','Авч явъя.'],['c','Děkuji. Na shledanou.','Баярлалаа. Баяртай.']]), correctId:'c', feedbackMn:'Яриаг Děkuji. Na shledanou. гэж хаана.' },
  ],
};
