import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0HealthMicroDialogues: Record<string, DialogueScenario> = {
  'a0-10-a': {
    id:'a0-10-a-dialogue', titleMn:'Богино яриа — толгой өвдөх', contextMn:'Та эмийн санд толгой өвдөж байгаагаа хэлж байна.',
    steps:[
      { id:'a10a-d1', speaker:'Эмийн санч', staffCzech:'Co vás bolí?', staffMn:'Юу өвдөж байна вэ?', promptMn:'Та толгой өвдөж байгаагаа хэлээрэй.', choices:choices([['a','Bolí mě hlava.','Толгой өвдөж байна.'],['b','Bolí mě břicho.','Гэдэс өвдөж байна.'],['c','Nemám klíč.','Надад түлхүүр байхгүй.']]), correctId:'a', feedbackMn:'Толгой өвдвөл Bolí mě hlava. гэж хэлнэ.' },
      { id:'a10a-d2', speaker:'Эмийн санч', staffCzech:'Rozumím. Co potřebujete?', staffMn:'Ойлголоо. Танд юу хэрэгтэй вэ?', promptMn:'Та өвчин намдаах зүйл асуугаарай.', choices:choices([['a','Máte něco na bolest?','Өвчин намдаах эм байна уу?'],['b','Tašku, prosím.','Уут өгнө үү.'],['c','Slyším vás.','Таныг сонсож байна.']]), correctId:'a', feedbackMn:'Өвчин намдаах зүйл асуухдаа Máte něco na bolest? гэж хэлнэ.' },
    ],
  },
  'a0-10-b': {
    id:'a0-10-b-dialogue', titleMn:'Богино яриа — халуурах', contextMn:'Та эмийн санд халуурч байгаагаа хэлж байна.',
    steps:[
      { id:'a10b-d1', speaker:'Эмийн санч', staffCzech:'Máte teplotu?', staffMn:'Та халуурч байна уу?', promptMn:'Та халуурч байгаагаа хэлээрэй.', choices:choices([['a','Mám teplotu.','Халуурч байна.'],['b','Mám klíč.','Надад түлхүүр байна.'],['c','Mám směnu.','Би ээлжтэй.']]), correctId:'a', feedbackMn:'Халуурч байвал Mám teplotu. гэж хэлнэ.' },
      { id:'a10b-d2', speaker:'Эмийн санч', staffCzech:'Tady je lék.', staffMn:'Эм нь энэ байна.', promptMn:'Та яаж уухыг асуугаарай.', choices:choices([['a','Jak to mám brát?','Энэ эмийг яаж хэрэглэх вэ?'],['b','Kolik je hodin?','Цаг хэд болж байна?'],['c','Neteče voda.','Ус гарахгүй байна.']]), correctId:'a', feedbackMn:'Эмийн зааврыг Jak to mám brát? гэж асууна.' },
    ],
  },
  'a0-10-c': {
    id:'a0-10-c-dialogue', titleMn:'Богино яриа — өвчин намдаах зүйл', contextMn:'Та эмийн санд өвчин намдаах зүйл асууж байна.',
    steps:[
      { id:'a10c-d1', speaker:'Эмийн санч', staffCzech:'Dobrý den. Jak vám můžu pomoci?', staffMn:'Сайн байна уу. Би танд яаж туслах вэ?', promptMn:'Та мэндлээд тусламж хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Dobrý den. Potřebuji pomoc.','Сайн байна уу. Надад тусламж хэрэгтэй.'],['b','Dobrý den. Tašku, prosím.','Сайн байна уу. Уут өгнө үү.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Эмийн санд Dobrý den. Potřebuji pomoc. гэж эхэлж болно.' },
      { id:'a10c-d2', speaker:'Эмийн санч', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та өвчин намдаах зүйл асуугаарай.', choices:choices([['a','Máte něco na bolest?','Өвчин намдаах эм байна уу?'],['b','Je problém.','Асуудал байна.'],['c','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.']]), correctId:'a', feedbackMn:'Máte něco na bolest? = Өвчин намдаах эм байна уу?' },
    ],
  },
  'a0-10-d': {
    id:'a0-10-d-dialogue', titleMn:'Богино яриа — эмийн заавар', contextMn:'Та эмийн санд эмийг яаж уухыг асууж байна.',
    steps:[
      { id:'a10d-d1', speaker:'Эмийн санч', staffCzech:'Tady je lék.', staffMn:'Эм нь энэ байна.', promptMn:'Та үүнийг яаж уухыг асуугаарай.', choices:choices([['a','Jak to mám brát?','Энэ эмийг яаж хэрэглэх вэ?'],['b','Bolí mě v krku.','Хоолой өвдөж байна.'],['c','To je drahé.','Энэ үнэтэй байна.']]), correctId:'a', feedbackMn:'Эм хэрэглэх зааврыг Jak to mám brát? гэж асууна.' },
      { id:'a10d-d2', speaker:'Эмийн санч', staffCzech:'Jednou denně.', staffMn:'Өдөрт нэг удаа.', promptMn:'Та дахин хэлүүлэх хүсэлт тавиарай.', choices:choices([['a','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['b','Platím kartou.','Картаар төлнө.'],['c','Mám klíč.','Надад түлхүүр байна.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед Ještě jednou, prosím. гэж хэлж болно.' },
    ],
  },
};

export const a0HealthFinalDialogue: DialogueScenario = {
  id:'a0-10-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та эмийн санд мэндэлж, өвдөлтөө хэлж, эм асууж, зааврыг ойлгохгүй үед давтуулж байна.',
  steps:[
    { id:'a10final-d1', speaker:'Эмийн санч', staffCzech:'Dobrý den. Jak vám můžu pomoci?', staffMn:'Сайн байна уу. Би танд яаж туслах вэ?', promptMn:'Та мэндлээд тусламж хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Dobrý den. Potřebuji pomoc.','Сайн байна уу. Надад тусламж хэрэгтэй.'],['b','Dobrý den. Tohle, prosím.','Сайн байна уу. Үүнийг авъя.'],['c','Na shledanou.','Баяртай.']]), correctId:'a', feedbackMn:'Эмийн санд Dobrý den. Potřebuji pomoc. гэж эхэлнэ.' },
    { id:'a10final-d2', speaker:'Эмийн санч', staffCzech:'Mluvíte česky?', staffMn:'Та чехээр ярьдаг уу?', promptMn:'Та ойлгоход хэцүү гэдгээ хэлж удаан ярихыг хүсээрэй.', choices:choices([['a','Nerozumím. Mluvte prosím pomalu.','Би ойлгохгүй байна. Удаан ярина уу.'],['b','Platím kartou.','Картаар төлнө.'],['c','Mám klíč.','Надад түлхүүр байна.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед өмнөх хичээлийн хэллэг дахин хэрэглэнэ.' },
    { id:'a10final-d3', speaker:'Эмийн санч', staffCzech:'Co vás bolí?', staffMn:'Юу өвдөж байна вэ?', promptMn:'Та толгой өвдөж байгаагаа хэлээрэй.', choices:choices([['a','Bolí mě hlava.','Толгой өвдөж байна.'],['b','Neteče voda.','Ус гарахгүй байна.'],['c','Slyším vás.','Таныг сонсож байна.']]), correctId:'a', feedbackMn:'Bolí mě hlava. = Толгой өвдөж байна.' },
    { id:'a10final-d4', speaker:'Эмийн санч', staffCzech:'Máte teplotu?', staffMn:'Та халуурч байна уу?', promptMn:'Та халуурч байгаагаа хэлээрэй.', choices:choices([['a','Ano, mám teplotu.','Тийм, халуурч байна.'],['b','Ano, mám klíč.','Тийм, надад түлхүүр байна.'],['c','Ne, platím hotově.','Үгүй, би бэлнээр төлнө.']]), correctId:'a', feedbackMn:'Халуурч байвал Mám teplotu. гэж хэлнэ.' },
    { id:'a10final-d5', speaker:'Эмийн санч', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та өвчин намдаах зүйл асуугаарай.', choices:choices([['a','Máte něco na bolest?','Өвчин намдаах эм байна уу?'],['b','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['c','Tašku, prosím.','Уут өгнө үү.']]), correctId:'a', feedbackMn:'Máte něco na bolest? = Өвчин намдаах эм байна уу?' },
    { id:'a10final-d6', speaker:'Эмийн санч', staffCzech:'Ano. Tady je lék.', staffMn:'Тийм. Эм нь энэ байна.', promptMn:'Та эмийг яаж уухыг асуугаарай.', choices:choices([['a','Jak to mám brát?','Энэ эмийг яаж хэрэглэх вэ?'],['b','Kolik to stojí?','Энэ хэд вэ?'],['c','Mám čas.','Би завтай.']]), correctId:'a', feedbackMn:'Эмийн зааврыг Jak to mám brát? гэж асууна.' },
    { id:'a10final-d7', speaker:'Эмийн санч', staffCzech:'Jednou denně.', staffMn:'Өдөрт нэг удаа.', promptMn:'Та дахин хэлүүлэх хүсэлт тавиарай.', choices:choices([['a','Ještě jednou, prosím.','Дахиад нэг удаа хэлнэ үү.'],['b','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['c','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед Ještě jednou, prosím. гэж хэлж болно.' },
    { id:'a10final-d8', speaker:'Эмийн санч', staffCzech:'Jednou denně.', staffMn:'Өдөрт нэг удаа.', promptMn:'Та бичиж өгөхийг хүсээд талархаарай.', choices:choices([['a','Napište mi to, prosím. Děkuji.','Надад бичиж өгнө үү. Баярлалаа.'],['b','Účtenku, prosím.','Баримт өгнө үү.'],['c','Neteče voda.','Ус гарахгүй байна.']]), correctId:'a', feedbackMn:'Эмийн зааврыг мартуулахгүйн тулд Napište mi to, prosím. гэж хүсэж болно.' },
  ],
};
