import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0TimeMicroDialogues: Record<string, DialogueScenario> = {
  'a0-5-a': {
    id:'a0-5-a-dialogue', titleMn:'Богино яриа — цаг асуух', contextMn:'Та цаг харах боломжгүй болсон тул явган зорчигчоос асууж байна.',
    steps:[
      { id:'a05a-d1', speaker:'Явган зорчигч', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та цаг хэд болж байгааг асуугаарай.', choices:choices([['a','Kdy máte čas?','Та хэзээ завтай вэ?'],['b','Kolik je hodin?','Цаг хэд болж байна?'],['c','Kam jedete?','Та хаашаа явж байна?']]), correctId:'b', feedbackMn:'Kolik je hodin? = Цаг хэд болж байна?' },
      { id:'a05a-d2', speaker:'Явган зорчигч', staffCzech:'Ve dvanáct.', staffMn:'Арван хоёр цагт.', promptMn:'Та цаг хэлж өгсөнд талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Nemám čas.','Би завгүй.'],['c','V pět.','Таван цагт.']]), correctId:'a', feedbackMn:'Ve dvanáct. = Арван хоёр цагт.' },
    ],
  },
  'a0-5-b': {
    id:'a0-5-b-dialogue', titleMn:'Богино яриа — уулзах өдөр, цагийн хэсэг', contextMn:'Та найзтайгаа уулзах өдрөө болон өглөө, оройг тохирч байна.',
    steps:[
      { id:'a05b-d1', speaker:'Найз', staffCzech:'Dnes, nebo zítra?', staffMn:'Өнөөдөр үү, маргааш уу?', promptMn:'Та маргаашийг сонгоорой.', choices:choices([['a','večer','орой'],['b','zítra','маргааш'],['c','dnes','өнөөдөр']]), correctId:'b', feedbackMn:'zítra = маргааш.' },
      { id:'a05b-d2', speaker:'Найз', staffCzech:'Ráno, nebo večer?', staffMn:'Өглөө юу, орой юу?', promptMn:'Та оройг сонгоорой.', choices:choices([['a','ráno','өглөө'],['b','teď','одоо'],['c','večer','орой']]), correctId:'c', feedbackMn:'večer = орой.' },
    ],
  },
  'a0-5-c': {
    id:'a0-5-c-dialogue', titleMn:'Богино яриа — завтай эсэх', contextMn:'Та эхлээд одоо завгүйгээ, дараа нь маргааш орой завтайгаа хэлж байна.',
    steps:[
      { id:'a05c-d1', speaker:'Найз', staffCzech:'Kdy máte čas?', staffMn:'Та хэзээ завтай вэ?', promptMn:'Та одоогоор завгүй байгаагаа хэлээрэй.', choices:choices([['a','Mám čas.','Би завтай.'],['b','Kdy?','Хэзээ?'],['c','Nemám čas.','Би завгүй.']]), correctId:'c', feedbackMn:'Nemám čas. = Би завгүй.' },
      { id:'a05c-d2', speaker:'Найз', staffCzech:'Zítra večer?', staffMn:'Маргааш орой юу?', promptMn:'Та маргааш орой завтай гэдгээ хэлээрэй.', choices:choices([['a','Mám čas.','Би завтай.'],['b','Nemám čas.','Би завгүй.'],['c','Ráno.','Өглөө.']]), correctId:'a', feedbackMn:'Mám čas. = Би завтай.' },
    ],
  },
  'a0-5-d': {
    id:'a0-5-d-dialogue', titleMn:'Богино яриа — уулзалтын цаг', contextMn:'Та уулзалтын цагийг сүүлчийн удаа баталж байна.',
    steps:[
      { id:'a05d-d1', speaker:'Найз', staffCzech:'Máme schůzku v osm.', staffMn:'Бид найман цагт уулзалттай.', promptMn:'Та цагийг ойлгосон бол талархаарай.', choices:choices([['a','Nerozumím.','Би ойлгохгүй байна.'],['b','Děkuji.','Баярлалаа.'],['c','Kdy?','Хэзээ?']]), correctId:'b', feedbackMn:'Máme schůzku v osm. = Бид найман цагт уулзалттай.' },
    ],
  },
};

export const a0TimeFinalDialogue: DialogueScenario = {
  id:'a0-5-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та Ленатай маргааш оройн уулзалтаа найман цагт тохирч байна.',
  steps:[
    { id:'a05final-d1', speaker:'Лена', staffCzech:'Dobrý den. Jak se máte?', staffMn:'Сайн байна уу. Та сайн уу?', promptMn:'Та мэндлээд, сайн байгаагаа эелдгээр хэлээрэй.', choices:choices([['a','Dobře, děkuji.','Сайн, баярлалаа.'],['b','Nemám čas.','Би завгүй.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Өмнө сурсан мэндчилгээ, талархлаа жинхэнэ яриандаа дахин ашиглана.' },
    { id:'a05final-d2', speaker:'Лена', staffCzech:'Kdy máte čas?', staffMn:'Та хэзээ завтай вэ?', promptMn:'Та маргааш орой завтайгаа хэлээрэй.', choices:choices([['a','Dnes ráno.','Өнөөдөр өглөө.'],['b','Zítra večer.','Маргааш орой.'],['c','Teď nemám čas.','Би одоо завгүй.']]), correctId:'b', feedbackMn:'zítra + večer = маргааш орой.' },
    { id:'a05final-d3', speaker:'Лена', staffCzech:'Máme schůzku v osm.', staffMn:'Бид найман цагт уулзалттай.', promptMn:'Та уулзалтын цагийг ойлгосноо батлаад талархаарай.', choices:choices([['a','Ano, děkuji.','Тийм, баярлалаа.'],['b','V pět.','Таван цагт.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Ano, děkuji. = Тийм, баярлалаа.' },
    { id:'a05final-d4', speaker:'Лена', staffCzech:'Na shledanou.', staffMn:'Баяртай.', promptMn:'Та яриаг албан хэлбэрээр дуусгаарай.', choices:choices([['a','Ahoj.','Сайн уу.'],['b','Na shledanou.','Баяртай.'],['c','Ne.','Үгүй.']]), correctId:'b', feedbackMn:'Na shledanou. = Албан болон саармаг баяртай.' },
  ],
};
