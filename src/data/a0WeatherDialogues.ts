import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0WeatherMicroDialogues: Record<string, DialogueScenario> = {
  'a0-13-a': {
    id:'a0-13-a-dialogue', titleMn:'Богино яриа — өнөөдөр хүйтэн', contextMn:'Та өнөөдрийн цаг агаарыг хэлж байна.',
    steps:[
      { id:'a13a-d1', speaker:'Нөгөө хүн', staffCzech:'Jaké je počasí?', staffMn:'Цаг агаар ямар байна?', promptMn:'Та өнөөдөр хүйтэн байгааг хэлээрэй.', choices:choices([['a','Dnes je zima.','Өнөөдөр хүйтэн байна.'],['b','Dnes je teplo.','Өнөөдөр дулаахан байна.'],['c','Mám děti.','Би хүүхдүүдтэй.']]), correctId:'a', feedbackMn:'Dnes je zima. = Өнөөдөр хүйтэн байна.' },
      { id:'a13a-d2', speaker:'Нөгөө хүн', staffCzech:'A zítra?', staffMn:'Маргааш яах вэ?', promptMn:'Та өнөөдөр л дулаахан байгааг хэлээрэй.', choices:choices([['a','Dnes je teplo.','Өнөөдөр дулаахан байна.'],['b','Pomoc!','Туслаарай!'],['c','Nemám klíč.','Надад түлхүүр байхгүй.']]), correctId:'a', feedbackMn:'Dnes je teplo. = Өнөөдөр дулаахан байна.' },
    ],
  },
  'a0-13-b': {
    id:'a0-13-b-dialogue', titleMn:'Богино яриа — бороо, цас', contextMn:'Та гадаа юу болж байгааг хэлж байна.',
    steps:[
      { id:'a13b-d1', speaker:'Нөгөө хүн', staffCzech:'Venku?', staffMn:'Гадаа?', promptMn:'Та бороо орж байгааг хэлээрэй.', choices:choices([['a','Prší.','Бороо орж байна.'],['b','Sněží.','Цас орж байна.'],['c','Jsem nový.','Би шинэ хүн.']]), correctId:'a', feedbackMn:'Prší. = Бороо орж байна.' },
      { id:'a13b-d2', speaker:'Нөгөө хүн', staffCzech:'A teď?', staffMn:'Одоо?', promptMn:'Та цас орж байгааг хэлээрэй.', choices:choices([['a','Sněží.','Цас орж байна.'],['b','Prší.','Бороо орж байна.'],['c','Děkuji.','Баярлалаа.']]), correctId:'a', feedbackMn:'Sněží. = Цас орж байна.' },
    ],
  },
  'a0-13-c': {
    id:'a0-13-c-dialogue', titleMn:'Богино яриа — би даарч байна', contextMn:'Та өөрт хүйтэн санагдаж байгааг хэлж байна.',
    steps:[
      { id:'a13c-d1', speaker:'Нөгөө хүн', staffCzech:'Dnes je zima.', staffMn:'Өнөөдөр хүйтэн байна.', promptMn:'Та даарч байгаагаа хэлээрэй.', choices:choices([['a','Ano, je mi zima.','Тийм, би даарч байна.'],['b','Ano, mám děti.','Тийм, би хүүхдүүдтэй.'],['c','Nejsem v pořádku.','Би зүгээр биш байна.']]), correctId:'a', feedbackMn:'Өөрт хүйтэн санагдвал je mi zima гэж хэлнэ.' },
      { id:'a13c-d2', speaker:'Нөгөө хүн', staffCzech:'Je vám teplo?', staffMn:'Та дулаахан байна уу?', promptMn:'Та дулаахан байгаагаа хэлээрэй.', choices:choices([['a','Ano, je mi teplo.','Тийм, би дулаахан байна.'],['b','Prší.','Бороо орж байна.'],['c','Pomoc!','Туслаарай!']]), correctId:'a', feedbackMn:'Je mi teplo. = Би дулаахан байна.' },
    ],
  },
  'a0-13-d': {
    id:'a0-13-d-dialogue', titleMn:'Богино яриа — хүрэм хэрэгтэй', contextMn:'Гадаа хүйтэн, танд хувцас хэрэгтэй байна.',
    steps:[
      { id:'a13d-d1', speaker:'Нөгөө хүн', staffCzech:'Prší.', staffMn:'Бороо орж байна.', promptMn:'Та хүрэм хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Potřebuji bundu.','Надад хүрэм хэрэгтэй.'],['b','Potřebuji čepici.','Надад малгай хэрэгтэй.'],['c','Mám rodinu.','Би гэр бүлтэй.']]), correctId:'a', feedbackMn:'Бороо, хүйтэн үед Potřebuji bundu. гэж хэлж болно.' },
      { id:'a13d-d2', speaker:'Нөгөө хүн', staffCzech:'Je zima.', staffMn:'Хүйтэн байна.', promptMn:'Та малгай хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Potřebuji čepici.','Надад малгай хэрэгтэй.'],['b','Zavolejte prosím policii.','Цагдаа дуудаж өгнө үү.'],['c','Napište mi to, prosím.','Үүнийг надад бичээд өгнө үү.']]), correctId:'a', feedbackMn:'Potřebuji čepici. = Надад малгай хэрэгтэй.' },
    ],
  },
};

export const a0WeatherFinalDialogue: DialogueScenario = {
  id:'a0-13-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та цаг агаарын тухай ярьж, өөрт хэрэгтэй хувцсаа хэлж байна.',
  steps:[
    { id:'a13final-d1', speaker:'Нөгөө хүн', staffCzech:'Dnes je zima.', staffMn:'Өнөөдөр хүйтэн байна.', promptMn:'Та даарч байгаагаа хэлээрэй.', choices:choices([['a','Ano, je mi zima.','Тийм, би даарч байна.'],['b','Mám dítě.','Би хүүхэдтэй.'],['c','Jsem v pořádku.','Би зүгээр байна.']]), correctId:'a', feedbackMn:'Je mi zima. = Би даарч байна.' },
    { id:'a13final-d2', speaker:'Нөгөө хүн', staffCzech:'Prší.', staffMn:'Бороо орж байна.', promptMn:'Та хүрэм хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Potřebuji bundu.','Надад хүрэм хэрэгтэй.'],['b','Pomoc!','Туслаарай!'],['c','Jsem nový.','Би шинэ хүн.']]), correctId:'a', feedbackMn:'Potřebuji bundu. = Надад хүрэм хэрэгтэй.' },
    { id:'a13final-d3', speaker:'Нөгөө хүн', staffCzech:'Bunda je tam.', staffMn:'Хүрэм тэнд байна.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Sněží.','Цас орж байна.'],['c','Mám problém.','Надад асуудал байна.']]), correctId:'a', feedbackMn:'Děkuji. = Баярлалаа.' },
  ],
};
