import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0PhoneMicroDialogues: Record<string, DialogueScenario> = {
  'a0-11-a': {
    id:'a0-11-a-dialogue', titleMn:'Богино яриа — сонсож байна', contextMn:'Та утсан дээр нөгөө хүнийг сонсож байгаагаа хэлж байна.',
    steps:[
      { id:'a11a-d1', speaker:'Нөгөө хүн', staffCzech:'Slyšíte mě?', staffMn:'Та намайг сонсож байна уу?', promptMn:'Та сонсож байгаагаа хэлээрэй.', choices:choices([['a','Ano, slyším vás.','Тийм, би таныг сонсож байна.'],['b','Nemám klíč.','Надад түлхүүр байхгүй.'],['c','Bolí mě hlava.','Миний толгой өвдөж байна.']]), correctId:'a', feedbackMn:'Сонсож байвал Ano, slyším vás. гэж хариулна.' },
      { id:'a11a-d2', speaker:'Нөгөө хүн', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','To je drahé.','Энэ үнэтэй байна.'],['c','Je zima.','Хүйтэн байна.']]), correctId:'a', feedbackMn:'Děkuji. = Баярлалаа.' },
    ],
  },
  'a0-11-b': {
    id:'a0-11-b-dialogue', titleMn:'Богино яриа — дахин хэлүүлэх', contextMn:'Та утсан дээр сайн ойлгоогүй байна.',
    steps:[
      { id:'a11b-d1', speaker:'Нөгөө хүн', staffCzech:'Slyšíte mě?', staffMn:'Та намайг сонсож байна уу?', promptMn:'Та сонсож байгаагаа хэлээрэй.', choices:choices([['a','Slyším vás.','Би таныг сонсож байна.'],['b','Neteče voda.','Ус гарахгүй байна.'],['c','Tašku, prosím.','Уут өгнө үү.']]), correctId:'a', feedbackMn:'Slyším vás. = Би таныг сонсож байна.' },
      { id:'a11b-d2', speaker:'Нөгөө хүн', staffCzech:'Informace je dlouhá.', staffMn:'Мэдээлэл урт байна.', promptMn:'Та дахин хэлүүлэх хүсэлт тавиарай.', choices:choices([['a','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['b','Mám teplotu.','Би халуурч байна.'],['c','Účtenku, prosím.','Баримт өгнө үү.']]), correctId:'a', feedbackMn:'Ойлгоогүй үед Ještě jednou, prosím. гэж хэлнэ.' },
    ],
  },
  'a0-11-c': {
    id:'a0-11-c-dialogue', titleMn:'Богино яриа — бичүүлж авах', contextMn:'Та утсан дээр мэдээлэл ойлгохгүй байгаа тул бичүүлж авах гэж байна.',
    steps:[
      { id:'a11c-d1', speaker:'Нөгөө хүн', staffCzech:'Adresa je dlouhá.', staffMn:'Хаяг урт байна.', promptMn:'Та мэдээллийг бичээд өгөхийг хүсээрэй.', choices:choices([['a','Napište mi to, prosím.','Үүнийг надад бичээд өгнө үү.'],['b','Jak to mám brát?','Үүнийг яаж уух вэ?'],['c','Je problém.','Асуудал байна.']]), correctId:'a', feedbackMn:'Бичүүлж авахдаа Napište mi to, prosím. гэж хэлнэ.' },
      { id:'a11c-d2', speaker:'Нөгөө хүн', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Bolí mě břicho.','Миний гэдэс өвдөж байна.'],['c','Mám klíč.','Надад түлхүүр байна.']]), correctId:'a', feedbackMn:'Děkuji. = Баярлалаа.' },
    ],
  },
  'a0-11-d': {
    id:'a0-11-d-dialogue', titleMn:'Богино яриа — SMS хүсэх', contextMn:'Та мэдээллийг SMS-ээр авах гэж байна.',
    steps:[
      { id:'a11d-d1', speaker:'Нөгөө хүн', staffCzech:'Můžu vám to poslat.', staffMn:'Би танд үүнийг явуулж болно.', promptMn:'Та SMS явуулахыг хүсээрэй.', choices:choices([['a','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.'],['b','Dám si kávu.','Би кофе авъя.'],['c','Je hotovo?','Дууссан уу?']]), correctId:'a', feedbackMn:'SMS хүсэхдээ Pošlete mi SMS, prosím. гэж хэлнэ.' },
      { id:'a11d-d2', speaker:'Нөгөө хүн', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Tohle, prosím.','Үүнийг авъя.'],['c','Neteče voda.','Ус гарахгүй байна.']]), correctId:'a', feedbackMn:'Яриаг Děkuji. гэж хаана.' },
    ],
  },
};

export const a0PhoneFinalDialogue: DialogueScenario = {
  id:'a0-11-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та утсан дээр өөрийгөө танилцуулж, сонсож байгаагаа хэлж, ойлгохгүй үед дахин хэлүүлэх болон бичүүлэх хүсэлт тавьж байна.',
  steps:[
    { id:'a11final-d1', speaker:'Нөгөө хүн', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд нэрээ хэлээрэй.', choices:choices([['a','Dobrý den. Jmenuji se Eba.','Сайн байна уу. Миний нэр Эба.'],['b','Dobrý den. Je problém.','Сайн байна уу. Асуудал байна.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Утсан дээр Dobrý den. Jmenuji se ... гэж эхэлж болно.' },
    { id:'a11final-d2', speaker:'Нөгөө хүн', staffCzech:'Slyšíte mě?', staffMn:'Та намайг сонсож байна уу?', promptMn:'Та сонсож байгаагаа хэлээрэй.', choices:choices([['a','Ano, slyším vás.','Тийм, би таныг сонсож байна.'],['b','Nemám klíč.','Надад түлхүүр байхгүй.'],['c','Bolí mě hlava.','Миний толгой өвдөж байна.']]), correctId:'a', feedbackMn:'Сонсож байвал Ano, slyším vás. гэж хариулна.' },
    { id:'a11final-d3', speaker:'Нөгөө хүн', staffCzech:'Informace je dlouhá.', staffMn:'Мэдээлэл урт байна.', promptMn:'Та ойлгохгүй байгаагаа хэлээд удаан ярихыг хүсээрэй.', choices:choices([['a','Nerozumím. Mluvte prosím pomalu.','Би ойлгохгүй байна. Удаан ярьж өгнө үү.'],['b','To je drahé.','Энэ үнэтэй байна.'],['c','Mám teplotu.','Би халуурч байна.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед Nerozumím. Mluvte prosím pomalu. гэж хэлнэ.' },
    { id:'a11final-d4', speaker:'Нөгөө хүн', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та дахин хэлүүлэх хүсэлт тавиарай.', choices:choices([['a','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Je zima.','Хүйтэн байна.']]), correctId:'a', feedbackMn:'Дахин хэлүүлэхдээ Ještě jednou, prosím. гэж хэлнэ.' },
    { id:'a11final-d5', speaker:'Нөгөө хүн', staffCzech:'Adresa je dlouhá.', staffMn:'Хаяг урт байна.', promptMn:'Та мэдээллийг бичээд өгөхийг хүсээрэй.', choices:choices([['a','Napište mi to, prosím.','Үүнийг надад бичээд өгнө үү.'],['b','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['c','Kolik to stojí?','Энэ хэд вэ?']]), correctId:'a', feedbackMn:'Бичүүлэхдээ Napište mi to, prosím. гэж хэлнэ.' },
    { id:'a11final-d6', speaker:'Нөгөө хүн', staffCzech:'Pošlu SMS.', staffMn:'SMS явуулъя.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['b','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.'],['c','Mám klíč.','Надад түлхүүр байна.']]), correctId:'a', feedbackMn:'Яриаг Děkuji. Na shledanou. гэж хаана.' },
  ],
};
