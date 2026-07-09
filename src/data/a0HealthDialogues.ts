import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0HealthMicroDialogues: Record<string, DialogueScenario> = {
  'a0-10-a': {
    id:'a0-10-a-dialogue', titleMn:'Богино яриа — толгой өвдөх', contextMn:'Та эмийн санд толгой өвдөж байгаагаа хэлж байна.',
    steps:[
      { id:'a10a-d1', speaker:'Эмийн санч', staffCzech:'Co vás bolí?', staffMn:'Юу өвдөж байна вэ?', promptMn:'Та толгой өвдөж байгаагаа хэлээрэй.', choices:choices([['a','Bolí mě hlava.','Миний толгой өвдөж байна.'],['b','Bolí mě břicho.','Миний гэдэс өвдөж байна.'],['c','Nemám klíč.','Надад түлхүүр байхгүй.']]), correctId:'a', feedbackMn:'Толгой өвдвөл Bolí mě hlava. гэж хэлнэ.' },
      { id:'a10a-d2', speaker:'Эмийн санч', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та өвчин намдаах зүйл асуугаарай.', choices:choices([['a','Máte něco na bolest?','Өвчин намдаах юм байна уу?'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Slyším vás.','Би таныг сонсож байна.']]), correctId:'a', feedbackMn:'Өвчин намдаах зүйл асуухдаа Máte něco na bolest? гэж хэлнэ.' },
    ],
  },
  'a0-10-b': {
    id:'a0-10-b-dialogue', titleMn:'Богино яриа — халуурах', contextMn:'Та эмийн санд халуурч байгаагаа хэлж байна.',
    steps:[
      { id:'a10b-d1', speaker:'Эмийн санч', staffCzech:'Co vás bolí?', staffMn:'Юу өвдөж байна вэ?', promptMn:'Та халуурч байгаагаа хэлээрэй.', choices:choices([['a','Mám teplotu.','Би халуурч байна.'],['b','Mám klíč.','Надад түлхүүр байна.'],['c','Mám směnu.','Би ээлжтэй.']]), correctId:'a', feedbackMn:'Халуурч байвал Mám teplotu. гэж хэлнэ.' },
      { id:'a10b-d2', speaker:'Эмийн санч', staffCzech:'Tento lék.', staffMn:'Энэ эм.', promptMn:'Та яаж уухыг асуугаарай.', choices:choices([['a','Jak to mám brát?','Үүнийг яаж уух вэ?'],['b','Kolik je hodin?','Цаг хэд болж байна?'],['c','Neteče voda.','Ус гарахгүй байна.']]), correctId:'a', feedbackMn:'Эмийн зааврыг Jak to mám brát? гэж асууна.' },
    ],
  },
  'a0-10-c': {
    id:'a0-10-c-dialogue', titleMn:'Богино яриа — өвчин намдаах зүйл', contextMn:'Та эмийн санд өвчин намдаах зүйл асууж байна.',
    steps:[
      { id:'a10c-d1', speaker:'Эмийн санч', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд тусламж хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Dobrý den. Potřebuji pomoc.','Сайн байна уу. Надад тусламж хэрэгтэй.'],['b','Dobrý den. Tašku, prosím.','Сайн байна уу. Уут өгнө үү.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Эмийн санд Dobrý den. Potřebuji pomoc. гэж эхэлж болно.' },
      { id:'a10c-d2', speaker:'Эмийн санч', staffCzech:'Ano?', staffMn:'Тийм үү?', promptMn:'Та өвчин намдаах зүйл асуугаарай.', choices:choices([['a','Máte něco na bolest?','Өвчин намдаах юм байна уу?'],['b','Je problém.','Асуудал байна.'],['c','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.']]), correctId:'a', feedbackMn:'Máte něco na bolest? = Өвчин намдаах юм байна уу?' },
    ],
  },
  'a0-10-d': {
    id:'a0-10-d-dialogue', titleMn:'Богино яриа — эмийн заавар', contextMn:'Та эмийн санд эмийг яаж уухыг асууж байна.',
    steps:[
      { id:'a10d-d1', speaker:'Эмийн санч', staffCzech:'Tento lék.', staffMn:'Энэ эм.', promptMn:'Та үүнийг яаж уухыг асуугаарай.', choices:choices([['a','Jak to mám brát?','Үүнийг яаж уух вэ?'],['b','Bolí mě v krku.','Миний хоолой өвдөж байна.'],['c','To je drahé.','Энэ үнэтэй байна.']]), correctId:'a', feedbackMn:'Эм хэрэглэх зааврыг Jak to mám brát? гэж асууна.' },
      { id:'a10d-d2', speaker:'Эмийн санч', staffCzech:'Jednou denně.', staffMn:'Өдөрт нэг удаа.', promptMn:'Та ойлгохгүй байвал удаан хэлүүлэх хүсэлт тавиарай.', choices:choices([['a','Mluvte prosím pomalu. Nerozumím.','Удаан ярьж өгнө үү. Би ойлгохгүй байна.'],['b','Platím kartou.','Би картаар төлнө.'],['c','Mám klíč.','Надад түлхүүр байна.']]), correctId:'a', feedbackMn:'Ойлгохгүй бол Mluvte prosím pomalu. Nerozumím. гэж хэлж болно.' },
    ],
  },
};

export const a0HealthFinalDialogue: DialogueScenario = {
  id:'a0-10-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та эмийн санд өвдөлтөө хэлж, өвчин намдаах зүйл асууж, хэрэглэх заавар авч байна.',
  steps:[
    { id:'a10final-d1', speaker:'Эмийн санч', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та мэндлээд тусламж хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Dobrý den. Potřebuji pomoc.','Сайн байна уу. Надад тусламж хэрэгтэй.'],['b','Dobrý den. Je problém.','Сайн байна уу. Асуудал байна.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Эмийн санд Dobrý den. Potřebuji pomoc. гэж эхэлнэ.' },
    { id:'a10final-d2', speaker:'Эмийн санч', staffCzech:'Co vás bolí?', staffMn:'Юу өвдөж байна вэ?', promptMn:'Та толгой өвдөж байгаагаа хэлээрэй.', choices:choices([['a','Bolí mě hlava.','Миний толгой өвдөж байна.'],['b','Neteče voda.','Ус гарахгүй байна.'],['c','Slyším vás.','Би таныг сонсож байна.']]), correctId:'a', feedbackMn:'Bolí mě hlava. = Миний толгой өвдөж байна.' },
    { id:'a10final-d3', speaker:'Эмийн санч', staffCzech:'Ano?', staffMn:'Тийм үү?', promptMn:'Та өвчин намдаах зүйл асуугаарай.', choices:choices([['a','Máte něco na bolest?','Өвчин намдаах юм байна уу?'],['b','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['c','Tašku, prosím.','Уут өгнө үү.']]), correctId:'a', feedbackMn:'Máte něco na bolest? = Өвчин намдаах юм байна уу?' },
    { id:'a10final-d4', speaker:'Эмийн санч', staffCzech:'Ano. Tento lék.', staffMn:'Тийм. Энэ эм.', promptMn:'Та эмийг яаж уухыг асуугаарай.', choices:choices([['a','Jak to mám brát?','Үүнийг яаж уух вэ?'],['b','Kolik to stojí?','Энэ хэд вэ?'],['c','Mám čas.','Би завтай.']]), correctId:'a', feedbackMn:'Эмийн зааврыг Jak to mám brát? гэж асууна.' },
    { id:'a10final-d5', speaker:'Эмийн санч', staffCzech:'Jednou denně.', staffMn:'Өдөрт нэг удаа.', promptMn:'Та ойлгохгүй байвал удаан хэлүүлэх хүсэлт тавиарай.', choices:choices([['a','Mluvte prosím pomalu. Nerozumím.','Удаан ярьж өгнө үү. Би ойлгохгүй байна.'],['b','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['c','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.']]), correctId:'a', feedbackMn:'Ойлгохгүй бол удаан хэлүүлэх хүсэлт тавина.' },
  ],
};
