import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0TimeMicroDialogues: Record<string, DialogueScenario> = {
  'a0-5-a': {
    id:'a0-5-a-dialogue', titleMn:'Богино яриа — цаг асуух', contextMn:'Та цаг харах боломжгүй болсон тул явган зорчигчоос асууж байна.',
    steps:[
      { id:'a05a-d1', speaker:'Явган зорчигч', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та цаг хэд болж байгааг асуугаарай.', choices:choices([['a','Kolik je hodin?','Цаг хэд болж байна?'],['b','Kdy máte čas?','Та хэзээ завтай вэ?'],['c','Kam jedete?','Та хаашаа явж байна?']]), correctId:'a', feedbackMn:'Kolik je hodin? = Цаг хэд болж байна?' },
      { id:'a05a-d2', speaker:'Явган зорчигч', staffCzech:'Je dvanáct.', staffMn:'Арван хоёр болж байна.', promptMn:'Та цаг хэлж өгсөнд талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Nemám čas.','Би завгүй.'],['c','V pět.','Таван цагт.']]), correctId:'a', feedbackMn:'Je dvanáct. = Арван хоёр болж байна.' },
    ],
  },
  'a0-5-b': {
    id:'a0-5-b-dialogue', titleMn:'Богино яриа — уулзах өдөр, цагийн хэсэг', contextMn:'Та найзтайгаа уулзах өдрөө болон өглөө, оройг тохирч байна.',
    steps:[
      { id:'a05b-d1', speaker:'Найз', staffCzech:'Máte čas dnes, nebo zítra?', staffMn:'Та өнөөдөр завтай юу, маргааш уу?', promptMn:'Та маргааш орой завтай гэдгээ хэлээрэй.', choices:choices([['a','Zítra večer mám čas.','Маргааш орой завтай.'],['b','Dnes ráno.','Өнөөдөр өглөө.'],['c','Teď nemám čas.','Би одоо завгүй.']]), correctId:'a', feedbackMn:'Zítra večer mám čas. = Маргааш орой завтай.' },
      { id:'a05b-d2', speaker:'Найз', staffCzech:'Dobře. Večer?', staffMn:'За, орой гэж үү?', promptMn:'Та орой гэдгийг батлаарай.', choices:choices([['a','Ano, večer.','Тийм, орой.'],['b','Ne, ráno.','Үгүй, өглөө.'],['c','Teď.','Одоо.']]), correctId:'a', feedbackMn:'Орой гэдгийг Ano, večer. гэж товч баталж болно.' },
    ],
  },
  'a0-5-c': {
    id:'a0-5-c-dialogue', titleMn:'Богино яриа — завтай эсэх', contextMn:'Та эхлээд одоо завгүйгээ, дараа нь маргааш орой завтайгаа хэлж байна.',
    steps:[
      { id:'a05c-d1', speaker:'Найз', staffCzech:'Máte čas teď?', staffMn:'Та одоо завтай юу?', promptMn:'Та одоогоор завгүй байгаагаа хэлээрэй.', choices:choices([['a','Teď nemám čas.','Би одоо завгүй.'],['b','Mám čas.','Би завтай.'],['c','Kdy?','Хэзээ?']]), correctId:'a', feedbackMn:'Teď nemám čas. = Би одоо завгүй.' },
      { id:'a05c-d2', speaker:'Найз', staffCzech:'A zítra večer?', staffMn:'Тэгвэл маргааш орой яах вэ?', promptMn:'Та маргааш орой завтай гэдгээ хэлээрэй.', choices:choices([['a','Zítra večer mám čas.','Маргааш орой завтай.'],['b','Nemám čas.','Би завгүй.'],['c','Ráno.','Өглөө.']]), correctId:'a', feedbackMn:'Zítra večer mám čas. = Маргааш орой завтай.' },
    ],
  },
  'a0-5-d': {
    id:'a0-5-d-dialogue', titleMn:'Богино яриа — уулзалтын цаг', contextMn:'Та уулзалтын цагийг сүүлчийн удаа баталж байна.',
    steps:[
      { id:'a05d-d1', speaker:'Найз', staffCzech:'Máme schůzku v osm.', staffMn:'Бид найман цагт уулзалттай.', promptMn:'Та цагийг ойлгосон бол талархаарай.', choices:choices([['a','Ano, děkuji.','Тийм, баярлалаа.'],['b','Nerozumím.','Би ойлгохгүй байна.'],['c','Kdy?','Хэзээ?']]), correctId:'a', feedbackMn:'Máme schůzku v osm. = Бид найман цагт уулзалттай.' },
    ],
  },
};

export const a0TimeFinalDialogue: DialogueScenario = {
  id:'a0-5-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та Ленатай маргааш оройн уулзалтаа найман цагт тохирч байна.',
  steps:[
    { id:'a05final-d1', speaker:'Лена', staffCzech:'Dobrý den. Jak se máte?', staffMn:'Сайн байна уу. Та сайн байна уу?', promptMn:'Та мэндлээд, сайн байгаагаа эелдгээр хэлээрэй.', choices:choices([['a','Dobře, děkuji.','Сайн, баярлалаа.'],['b','Nemám čas.','Би завгүй.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Өмнө сурсан мэндчилгээ, талархлаа жинхэнэ яриандаа дахин ашиглана.' },
    { id:'a05final-d2', speaker:'Лена', staffCzech:'Kdy máte čas?', staffMn:'Та хэзээ завтай вэ?', promptMn:'Та маргааш орой завтай гэдгээ хэлээрэй.', choices:choices([['a','Zítra večer mám čas.','Маргааш орой завтай.'],['b','Dnes ráno.','Өнөөдөр өглөө.'],['c','Teď nemám čas.','Би одоо завгүй.']]), correctId:'a', feedbackMn:'zítra + večer = маргааш орой.' },
    { id:'a05final-d3', speaker:'Лена', staffCzech:'V osm?', staffMn:'Найман цагт уу?', promptMn:'Та уулзалтын цагийг батлаарай.', choices:choices([['a','Ano, v osm.','Тийм, найман цагт.'],['b','V pět.','Таван цагт.'],['c','Ve dvanáct.','Арван хоёр цагт.']]), correctId:'a', feedbackMn:'Сонссон цагийг Ano, v osm. гэж баталж болно.' },
    { id:'a05final-d4', speaker:'Лена', staffCzech:'Máme schůzku v osm.', staffMn:'Бид найман цагт уулзалттай.', promptMn:'Та уулзалтын цагийг ойлгосноо батлаад талархаарай.', choices:choices([['a','Ano, děkuji.','Тийм, баярлалаа.'],['b','V pět.','Таван цагт.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Ano, děkuji. = Тийм, баярлалаа.' },
    { id:'a05final-d5', speaker:'Лена', staffCzech:'Na shledanou.', staffMn:'Баяртай.', promptMn:'Та яриаг албан хэлбэрээр дуусгаарай.', choices:choices([['a','Na shledanou.','Баяртай.'],['b','Ahoj.','Сайн уу.'],['c','Ne.','Үгүй.']]), correctId:'a', feedbackMn:'Na shledanou. = Албан болон саармаг нөхцөлд хэрэглэдэг баяртай.' },
  ],
};
