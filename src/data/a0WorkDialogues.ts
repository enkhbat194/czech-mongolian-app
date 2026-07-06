import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0WorkMicroDialogues: Record<string, DialogueScenario> = {
  'a0-6-a': {
    id:'a0-6-a-dialogue', titleMn:'Богино яриа — энд ажилладаг уу?', contextMn:'Та ажлын эхний өдөр ахлагчтайгаа уулзаж байна.',
    steps:[
      { id:'a06a-d1', speaker:'Ахлагч', staffCzech:'Pracujete tady?', staffMn:'Та энд ажилладаг уу?', promptMn:'Та энд ажилладгаа хэлээрэй.', choices:choices([['a','Mám směnu.','Би ээлжтэй.'],['b','Je hotovo?','Дууссан уу?'],['c','Pracuji tady.','Би энд ажилладаг.']]), correctId:'c', feedbackMn:'Pracuji tady. = Би энд ажилладаг.' },
    ],
  },
  'a0-6-b': {
    id:'a0-6-b-dialogue', titleMn:'Богино яриа — эхлэх, тарах цаг', contextMn:'Ахлагч ажлын эхлэх цагийг хэллээ. Та тарах цагаа тодруулж байна.',
    steps:[
      { id:'a06b-d1', speaker:'Ахлагч', staffCzech:'Začínáme v osm.', staffMn:'Бид найман цагт эхэлнэ.', promptMn:'Та ажил хэзээ тарахыг асуугаарай.', choices:choices([['a','Kdy je přestávka?','Завсарлага хэзээ вэ?'],['b','Kdy končíme?','Бид хэзээ тарах вэ?'],['c','Pracujete tady?','Та энд ажилладаг уу?']]), correctId:'b', feedbackMn:'Začínáme v osm. гэдгийг сонссоны дараа Kdy končíme? гэж тарах цагаа асууж болно.' },
      { id:'a06b-d2', speaker:'Ахлагч', staffCzech:'V pět.', staffMn:'Таван цагт.', promptMn:'Та цаг хэлж өгсөнд талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Ve dvanáct.','Арван хоёр цагт.'],['c','Mám směnu.','Би ээлжтэй.']]), correctId:'a', feedbackMn:'V pět. = Таван цагт.' },
    ],
  },
  'a0-6-c': {
    id:'a0-6-c-dialogue', titleMn:'Богино яриа — ээлж ба завсарлага', contextMn:'Та өнөөдрийн ажлын хуваарийг тодруулж байна.',
    steps:[
      { id:'a06c-d1', speaker:'Ахлагч', staffCzech:'Dnes?', staffMn:'Өнөөдөр үү?', promptMn:'Та өнөөдөр ээлжтэй гэдгээ хэлээрэй.', choices:choices([['a','Mám směnu.','Би ээлжтэй.'],['b','Nemám čas.','Би завгүй.'],['c','Je hotovo?','Дууссан уу?']]), correctId:'a', feedbackMn:'Mám směnu. = Би ээлжтэй.' },
      { id:'a06c-d2', speaker:'Ахлагч', staffCzech:'Začínáme v osm.', staffMn:'Бид найман цагт эхэлнэ.', promptMn:'Та завсарлага хэзээ болохыг асуугаарай.', choices:choices([['a','Kdy končíme?','Бид хэзээ тарах вэ?'],['b','Kdy je přestávka?','Завсарлага хэзээ вэ?'],['c','Co mám dělat?','Би юу хийх вэ?']]), correctId:'b', feedbackMn:'Kdy je přestávka? = Завсарлага хэзээ вэ?' },
      { id:'a06c-d3', speaker:'Ахлагч', staffCzech:'Ve dvanáct.', staffMn:'Арван хоёр цагт.', promptMn:'Та мэдээллийг ойлгосон бол талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','V pět.','Таван цагт.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Ve dvanáct. = Арван хоёр цагт.' },
    ],
  },
  'a0-6-d': {
    id:'a0-6-d-dialogue', titleMn:'Богино яриа — шинэ даалгавар', contextMn:'Ахлагч танд шинэ даалгавар өглөө. Та юу хийхээ асууж байна.',
    steps:[
      { id:'a06d-d1', speaker:'Ахлагч', staffCzech:'Nový úkol.', staffMn:'Шинэ даалгавар.', promptMn:'Та юу хийхээ асуугаарай.', choices:choices([['a','Co mám dělat?','Би юу хийх вэ?'],['b','Kdy končíme?','Бид хэзээ тарах вэ?'],['c','Pracuji tady.','Би энд ажилладаг.']]), correctId:'a', feedbackMn:'Co mám dělat? = Би юу хийх вэ?' },
      { id:'a06d-d2', speaker:'Ахлагч', staffCzech:'Ukážu vám.', staffMn:'Би танд үзүүлж өгнө.', promptMn:'Та үзүүлж өгөхөөр болсонд нь талархаарай.', choices:choices([['a','Nerozumím.','Би ойлгохгүй байна.'],['b','Děkuji.','Баярлалаа.'],['c','Mám směnu.','Би ээлжтэй.']]), correctId:'b', feedbackMn:'Ukážu vám. = Би танд үзүүлж өгнө.' },
    ],
  },
  'a0-6-e': {
    id:'a0-6-e-dialogue', titleMn:'Богино яриа — ойлгохгүй үед үзүүлж өгөхийг хүсэх', contextMn:'Ахлагч даалгавар дууссан эсэхийг асууж байна. Та даалгаврыг бүрэн ойлгоогүй тул биеэр нь үзүүлж өгөхийг хүснэ.',
    steps:[
      { id:'a06e-d1', speaker:'Ахлагч', staffCzech:'Je hotovo?', staffMn:'Дууссан уу?', promptMn:'Та ойлгохгүй байгаагаа хэлээд биеэр нь үзүүлж өгөхийг хүсээрэй.', choices:choices([['a','Hotovo.','Дууссан.'],['b','Nerozumím. Ukažte mi, prosím.','Би ойлгохгүй байна. Надад үзүүлж өгнө үү.'],['c','Kdy je přestávka?','Завсарлага хэзээ вэ?']]), correctId:'b', feedbackMn:'Ойлгохгүй бол Nerozumím. гэж хэлээд Ukažte mi, prosím. гэж тодруулж болно.' },
      { id:'a06e-d2', speaker:'Ахлагч', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та тусалсанд нь талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Na shledanou.','Баяртай.'],['c','V pět.','Таван цагт.']]), correctId:'a', feedbackMn:'Dobře. гэсэн хариуны дараа Děkuji. гэж хэлнэ.' },
    ],
  },
};

export const a0WorkFinalDialogue: DialogueScenario = {
  id:'a0-6-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та ажлын эхний өдрөө ахлагчтайгаа ажлын цаг, завсарлага, шинэ даалгавраа тодруулж байна.',
  steps:[
    { id:'a06final-d1', speaker:'Ахлагч', staffCzech:'Dobrý den. Pracujete tady?', staffMn:'Сайн байна уу. Та энд ажилладаг уу?', promptMn:'Та албан ёсоор мэндлээд энд ажилладгаа хэлээрэй.', choices:choices([['a','Dobrý den. Pracuji tady.','Сайн байна уу. Би энд ажилладаг.'],['b','Mám čas.','Би завтай.'],['c','Jdu na nádraží.','Би галт тэрэгний буудал руу явж байна.']]), correctId:'a', feedbackMn:'Dobrý den. Pracuji tady. гэдэг нь энэ нөхцөлд байгалийн хариу.' },
    { id:'a06final-d2', speaker:'Ахлагч', staffCzech:'Začínáme v osm.', staffMn:'Бид найман цагт эхэлнэ.', promptMn:'Та завсарлага хэзээ болохыг асуугаарай.', choices:choices([['a','Kdy končíme?','Бид хэзээ тарах вэ?'],['b','Kdy je přestávka?','Завсарлага хэзээ вэ?'],['c','Co mám dělat?','Би юу хийх вэ?']]), correctId:'b', feedbackMn:'Эхлэх цагийг сонссоны дараа Kdy je přestávka? гэж лавлаж болно.' },
    { id:'a06final-d3', speaker:'Ахлагч', staffCzech:'Ve dvanáct.', staffMn:'Арван хоёр цагт.', promptMn:'Та тарах цагаа асуугаарай.', choices:choices([['a','Kdy končíme?','Бид хэзээ тарах вэ?'],['b','Je hotovo?','Дууссан уу?'],['c','Pracujete tady?','Та энд ажилладаг уу?']]), correctId:'a', feedbackMn:'Kdy končíme? = Бид хэзээ тарах вэ?' },
    { id:'a06final-d4', speaker:'Ахлагч', staffCzech:'V pět.', staffMn:'Таван цагт.', promptMn:'Та цаг хэлж өгсөнд талархаарай.', choices:choices([['a','Mám směnu.','Би ээлжтэй.'],['b','Děkuji.','Баярлалаа.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'b', feedbackMn:'V pět. = Таван цагт.' },
    { id:'a06final-d5', speaker:'Ахлагч', staffCzech:'Nový úkol.', staffMn:'Шинэ даалгавар.', promptMn:'Та юу хийхээ асуугаарай.', choices:choices([['a','Je hotovo?','Дууссан уу?'],['b','Co mám dělat?','Би юу хийх вэ?'],['c','Kdy máte čas?','Та хэзээ завтай вэ?']]), correctId:'b', feedbackMn:'Шинэ даалгавар сонсвол Co mám dělat? гэж асууж болно.' },
    { id:'a06final-d6', speaker:'Ахлагч', staffCzech:'Ukážu vám.', staffMn:'Би танд үзүүлж өгнө.', promptMn:'Та тусалж байгаад нь талархаад яриаг дуусгаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Na shledanou.','Баяртай.'],['c','Ukažte mi, prosím.','Надад үзүүлж өгнө үү.']]), correctId:'a', feedbackMn:'Энд ахлагч аль хэдийн үзүүлж өгнө гэж хэлсэн тул Děkuji. гэсэн хариу зөв.' },
  ],
};
