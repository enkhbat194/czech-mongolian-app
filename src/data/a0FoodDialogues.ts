import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0FoodMicroDialogues: Record<string, DialogueScenario> = {
  'a0-7-a': {
    id:'a0-7-a-dialogue', titleMn:'Богино яриа — цэс хүсэх', contextMn:'Та кафед орж, эхлээд цэс хүсэж байна.',
    steps:[
      { id:'a07a-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд цэс хүсээрэй.', choices:choices([['a','Dobrý den. Menu, prosím.','Сайн байна уу. Цэс өгнө үү.'],['b','Kdy končíme?','Бид хэзээ тарах вэ?'],['c','Jdu na nádraží.','Би галт тэрэгний буудал руу явж байна.']]), correctId:'a', feedbackMn:'Кафед эхлээд Dobrý den. гэж мэндлээд Menu, prosím. гэж хүснэ.' },
      { id:'a07a-d2', speaker:'Ажилтан', staffCzech:'Co si dáte?', staffMn:'Та юу авах вэ?', promptMn:'Та энэ асуулт захиалга асууж байгааг танина.', choices:choices([['a','Dám si kávu.','Би кофе авъя.'],['b','Je hotovo?','Дууссан уу?'],['c','Pracuji tady.','Би энд ажилладаг.']]), correctId:'a', feedbackMn:'Co si dáte? гэвэл захиалга хэлнэ.' },
    ],
  },
  'a0-7-b': {
    id:'a0-7-b-dialogue', titleMn:'Богино яриа — кофе захиалах', contextMn:'Ажилтан таны захиалгыг асууж байна.',
    steps:[
      { id:'a07b-d1', speaker:'Ажилтан', staffCzech:'Co si dáte?', staffMn:'Та юу авах вэ?', promptMn:'Та кофе авах гэж байна. Зөв захиалгыг сонго.', choices:choices([['a','Dám si čaj.','Би цай авъя.'],['b','Dám si kávu.','Би кофе авъя.'],['c','Menu, prosím.','Цэс өгнө үү.']]), correctId:'b', feedbackMn:'Dám si kávu. = Би кофе авъя.' },
      { id:'a07b-d2', speaker:'Ажилтан', staffCzech:'Ještě něco?', staffMn:'Өөр зүйл үү?', promptMn:'Та цай авахгүй гэж богино хариулаарай.', choices:choices([['a','Ne, děkuji.','Үгүй, баярлалаа.'],['b','Dám si čaj.','Би цай авъя.'],['c','Kde je lékárna?','Эмийн сан хаана байна?']]), correctId:'a', feedbackMn:'Ne, děkuji. нь эелдэг татгалзах reuse phrase.' },
    ],
  },
  'a0-7-c': {
    id:'a0-7-c-dialogue', titleMn:'Богино яриа — авч явах', contextMn:'Та кофегоо авч явах гэж байна.',
    steps:[
      { id:'a07c-d1', speaker:'Ажилтан', staffCzech:'Tady, nebo s sebou?', staffMn:'Энд хэрэглэх үү, авч явах уу?', promptMn:'Та авч явах гэж байгаагаа хэлээрэй.', choices:choices([['a','Tady.','Энд.'],['b','S sebou, prosím.','Авч явъя, гуйя.'],['c','Kolik to stojí?','Энэ хэд вэ?']]), correctId:'b', feedbackMn:'S sebou, prosím. = Авч явъя, гуйя.' },
    ],
  },
  'a0-7-d': {
    id:'a0-7-d-dialogue', titleMn:'Богино яриа — үнэ ба төлбөр', contextMn:'Та захиалгынхаа үнийг асууж, төлбөрийн хэлбэрээ хэлж байна.',
    steps:[
      { id:'a07d-d1', speaker:'Ажилтан', staffCzech:'Hotovo.', staffMn:'Боллоо.', promptMn:'Та үнэ асуугаарай.', choices:choices([['a','Kolik to stojí?','Энэ хэд вэ?'],['b','Dám si kávu.','Би кофе авъя.'],['c','Menu, prosím.','Цэс өгнө үү.']]), correctId:'a', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
      { id:'a07d-d2', speaker:'Ажилтан', staffCzech:'Platíte kartou?', staffMn:'Та картаар төлөх үү?', promptMn:'Та картаар төлнө гэж хариулаарай.', choices:choices([['a','Ano, platím kartou.','Тийм, картаар төлнө.'],['b','Platím hotově.','Би бэлнээр төлнө.'],['c','Nemám peníze.','Надад мөнгө байхгүй.']]), correctId:'a', feedbackMn:'Platíte kartou? гэсэн асуултад Ano, platím kartou. гэж хариулж болно.' },
    ],
  },
};

export const a0FoodFinalDialogue: DialogueScenario = {
  id:'a0-7-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та кафед орж, цэс хүсэж, кофе захиалж, авч явахаа хэлж, төлбөрөө картаар хийж байна.',
  steps:[
    { id:'a07final-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд цэс хүсээрэй.', choices:choices([['a','Dobrý den. Menu, prosím.','Сайн байна уу. Цэс өгнө үү.'],['b','Dobrý den. Kde je nádraží?','Сайн байна уу. Галт тэрэгний буудал хаана байна?'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Энэ нөхцөлд Dobrý den. Menu, prosím. гэж эхэлнэ.' },
    { id:'a07final-d2', speaker:'Ажилтан', staffCzech:'Prosím. Co si dáte?', staffMn:'За. Та юу авах вэ?', promptMn:'Та кофе захиалаарай.', choices:choices([['a','Dám si kávu, prosím.','Би кофе авъя, гуйя.'],['b','Potřebuji telefon.','Надад утас хэрэгтэй.'],['c','Kdy končíme?','Бид хэзээ тарах вэ?']]), correctId:'a', feedbackMn:'Co si dáte? гэвэл Dám si ... загвараар захиална.' },
    { id:'a07final-d3', speaker:'Ажилтан', staffCzech:'Tady, nebo s sebou?', staffMn:'Энд хэрэглэх үү, авч явах уу?', promptMn:'Та авч явна гэж хэлээрэй.', choices:choices([['a','S sebou, prosím.','Авч явъя, гуйя.'],['b','Tady, nebo tam?','Энд үү, тэнд үү?'],['c','Děkuji.','Баярлалаа.']]), correctId:'a', feedbackMn:'S sebou, prosím. = Авч явъя, гуйя.' },
    { id:'a07final-d4', speaker:'Ажилтан', staffCzech:'Hotovo.', staffMn:'Боллоо.', promptMn:'Та үнийг асуугаарай.', choices:choices([['a','Kolik to stojí?','Энэ хэд вэ?'],['b','Dám si polévku.','Би шөл авъя.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Үнэ асуухдаа Kolik to stojí? гэж хэлнэ.' },
    { id:'a07final-d5', speaker:'Ажилтан', staffCzech:'Platíte kartou?', staffMn:'Та картаар төлөх үү?', promptMn:'Та картаар төлнө гэж хариулаарай.', choices:choices([['a','Ano, platím kartou.','Тийм, картаар төлнө.'],['b','Ne, nemám kartu.','Үгүй, надад карт байхгүй.'],['c','Menu, prosím.','Цэс өгнө үү.']]), correctId:'a', feedbackMn:'Ano, platím kartou. = Тийм, картаар төлнө.' },
    { id:'a07final-d6', speaker:'Ажилтан', staffCzech:'Děkuji.', staffMn:'Баярлалаа.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['b','Kolik to stojí?','Энэ хэд вэ?'],['c','S sebou, prosím.','Авч явъя, гуйя.']]), correctId:'a', feedbackMn:'Яриаг Děkuji. Na shledanou. гэж хаана.' },
  ],
};
