import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0FirstWeekMicroDialogues: Record<string, DialogueScenario> = {
  'a0-15-a': {
    id:'a0-15-a-dialogue', titleMn:'Богино яриа — шинэ хүн', contextMn:'Та эхний долоо хоногтоо шинэ хүн гэдгээ хэлж байна.',
    steps:[
      { id:'a15a-d1', speaker:'Нөгөө хүн', staffCzech:'Jste nový?', staffMn:'Та шинэ хүн үү?', promptMn:'Эрэгтэй хүн өөрийн тухай хариулна.', choices:choices([['a','Ano, jsem nový.','Тийм, би шинэ хүн.'],['b','Ano, jsem nová.','Тийм, би шинэ хүн.'],['c','Prší.','Бороо орж байна.']]), correctId:'a', feedbackMn:'Эрэгтэй хүн өөрийн тухай jsem nový гэж хэлнэ.' },
      { id:'a15a-d2', speaker:'Нөгөө хүн', staffCzech:'Jste nová?', staffMn:'Та шинэ хүн үү?', promptMn:'Эмэгтэй хүн өөрийн тухай хариулна.', choices:choices([['a','Ano, jsem nová.','Тийм, би шинэ хүн.'],['b','Ano, jsem nový.','Тийм, би шинэ хүн.'],['c','Mám klíč.','Надад түлхүүр байна.']]), correctId:'a', feedbackMn:'Эмэгтэй хүн өөрийн тухай jsem nová гэж хэлнэ.' },
    ],
  },
  'a0-15-b': {
    id:'a0-15-b-dialogue', titleMn:'Богино яриа — чех хэл сурч байна', contextMn:'Та ойлгоход хэцүү үед өөрийгөө тайлбарлаж байна.',
    steps:[
      { id:'a15b-d1', speaker:'Нөгөө хүн', staffCzech:'Mluvíte česky?', staffMn:'Та чехээр ярьдаг уу?', promptMn:'Та бага зэрэг чехээр ярьдгаа хэлээрэй.', choices:choices([['a','Mluvím trochu česky.','Би бага зэрэг чехээр ярьдаг.'],['b','Mám teplotu.','Би халуурч байна.'],['c','Sněží.','Цас орж байна.']]), correctId:'a', feedbackMn:'Mluvím trochu česky. = Би бага зэрэг чехээр ярьдаг.' },
      { id:'a15b-d2', speaker:'Нөгөө хүн', staffCzech:'Rozumíte?', staffMn:'Та ойлгож байна уу?', promptMn:'Та чех хэл сурч байгаагаа хэлээрэй.', choices:choices([['a','Učím se česky.','Би чех хэл сурч байна.'],['b','Jsem v pořádku.','Би зүгээр байна.'],['c','Mám děti.','Би хүүхдүүдтэй.']]), correctId:'a', feedbackMn:'Učím se česky. = Би чех хэл сурч байна.' },
    ],
  },
  'a0-15-c': {
    id:'a0-15-c-dialogue', titleMn:'Богино яриа — туслаарай', contextMn:'Та шинэ орчинд тусламж хүсэж байна.',
    steps:[
      { id:'a15c-d1', speaker:'Нөгөө хүн', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та эелдгээр тусламж хүсээрэй.', choices:choices([['a','Prosím, pomozte mi.','Надад туслаарай.'],['b','Pomoc!','Туслаарай!'],['c','Dnes je teplo.','Өнөөдөр дулаахан байна.']]), correctId:'a', feedbackMn:'Эелдгээр тусламж хүсэхдээ Prosím, pomozte mi. гэж хэлнэ.' },
      { id:'a15c-d2', speaker:'Нөгөө хүн', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Mám problém.','Надад асуудал байна.'],['c','Je mi zima.','Би даарч байна.']]), correctId:'a', feedbackMn:'Děkuji. = Баярлалаа.' },
    ],
  },
  'a0-15-d': {
    id:'a0-15-d-dialogue', titleMn:'Богино яриа — эхний долоо хоногийн давтлага', contextMn:'Та эхний долоо хоногт олон нөхцөлийг нэг дарааллаар давж байна.',
    steps:[
      { id:'a15d-d1', speaker:'Нөгөө хүн', staffCzech:'Mluvíte česky?', staffMn:'Та чехээр ярьдаг уу?', promptMn:'Та сурч байгаагаа хэлээд удаан ярихыг хүсээрэй.', choices:choices([['a','Učím se česky. Mluvte prosím pomalu.','Би чех хэл сурч байна. Удаан ярьж өгнө үү.'],['b','Potřebuji bundu.','Надад хүрэм хэрэгтэй.'],['c','Mám rodinu.','Би гэр бүлтэй.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед өөрийгөө тайлбарлаад удаан хэлүүлэх нь зөв.' },
      { id:'a15d-d2', speaker:'Нөгөө хүн', staffCzech:'Je problém?', staffMn:'Асуудал байна уу?', promptMn:'Та түлхүүр байхгүйгээ хэлээрэй.', choices:choices([['a','Je problém. Nemám klíč.','Асуудал байна. Надад түлхүүр байхгүй.'],['b','Dnes je zima.','Өнөөдөр хүйтэн байна.'],['c','Mám děti.','Би хүүхдүүдтэй.']]), correctId:'a', feedbackMn:'Байрны асуудалд Je problém. Nemám klíč. гэж хэлж болно.' },
    ],
  },
};

export const a0FirstWeekFinalDialogue: DialogueScenario = {
  id:'a0-15-final-dialogue', titleMn:'Төгсгөлийн амьдралын дараалал', contextMn:'Та Чехэд эхний долоо хоногтоо хамгийн хэрэгтэй A0 хэллэгүүдийг нэг дараалалд ашиглаж байна.',
  steps:[
    { id:'a15final-d1', speaker:'Нөгөө хүн', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та өөрийгөө танилцуулаарай.', choices:choices([['a','Dobrý den. Jmenuji se Eba. Jsem z Mongolska.','Сайн байна уу. Миний нэр Эба. Би Монголоос ирсэн.'],['b','Pomoc!','Туслаарай!'],['c','Prší.','Бороо орж байна.']]), correctId:'a', feedbackMn:'Танилцахдаа нэр, гарал орноо хэлж болно.' },
    { id:'a15final-d2', speaker:'Нөгөө хүн', staffCzech:'Mluvíte česky?', staffMn:'Та чехээр ярьдаг уу?', promptMn:'Та чех хэл сурч байгаагаа хэлээд удаан ярихыг хүсээрэй.', choices:choices([['a','Učím se česky. Mluvte prosím pomalu.','Би чех хэл сурч байна. Удаан ярьж өгнө үү.'],['b','Dnes je teplo.','Өнөөдөр дулаахан байна.'],['c','Mám dítě.','Би хүүхэдтэй.']]), correctId:'a', feedbackMn:'Učím se česky. Mluvte prosím pomalu. гэж хэлж болно.' },
    { id:'a15final-d3', speaker:'Нөгөө хүн', staffCzech:'Kam jdete?', staffMn:'Та хаашаа явж байна?', promptMn:'Та буудал хаана байгааг асуугаарай.', choices:choices([['a','Prosím, kde je zastávka?','Уучлаарай, буудал хаана байна?'],['b','Bolí mě hlava.','Миний толгой өвдөж байна.'],['c','Nejsem v pořádku.','Би зүгээр биш байна.']]), correctId:'a', feedbackMn:'Чиглэл асуухдаа kde je zastávka? гэж асууна.' },
    { id:'a15final-d4', speaker:'Кафе', staffCzech:'Co si dáte?', staffMn:'Та юу авах вэ?', promptMn:'Та кофе авч явахаар захиалаарай.', choices:choices([['a','Dám si kávu, prosím. S sebou, prosím.','Би кофе авъя, гуйя. Авч явъя.'],['b','Zavolejte prosím policii.','Цагдаа дуудаж өгнө үү.'],['c','Jsem tady s rodinou.','Би энд гэр бүлтэйгээ байна.']]), correctId:'a', feedbackMn:'Кафед Dám si kávu, prosím. S sebou, prosím. гэж хэлж болно.' },
    { id:'a15final-d5', speaker:'Дэлгүүр', staffCzech:'Platíte kartou?', staffMn:'Та картаар төлөх үү?', promptMn:'Та үнэ асуугаад картаар төлөхөө хэлээрэй.', choices:choices([['a','Kolik to stojí? Platím kartou.','Энэ хэд вэ? Би картаар төлнө.'],['b','Je mi zima.','Би даарч байна.'],['c','Mám rodinu.','Би гэр бүлтэй.']]), correctId:'a', feedbackMn:'Үнэ болон төлбөр дээр Kolik to stojí? Platím kartou. гэж хэлж болно.' },
    { id:'a15final-d6', speaker:'Байр', staffCzech:'Jaký problém?', staffMn:'Ямар асуудал вэ?', promptMn:'Та түлхүүр байхгүйгээ хэлээрэй.', choices:choices([['a','Je problém. Nemám klíč.','Асуудал байна. Надад түлхүүр байхгүй.'],['b','Prší.','Бороо орж байна.'],['c','Mám děti.','Би хүүхдүүдтэй.']]), correctId:'a', feedbackMn:'Байранд Je problém. Nemám klíč. гэж хэлж болно.' },
    { id:'a15final-d7', speaker:'Эмийн сан', staffCzech:'Co vás bolí?', staffMn:'Юу өвдөж байна вэ?', promptMn:'Та толгой өвдөж, өвчин намдаах зүйл асуугаарай.', choices:choices([['a','Bolí mě hlava. Máte něco na bolest?','Миний толгой өвдөж байна. Өвчин намдаах юм байна уу?'],['b','Pošlete mi SMS, prosím.','Надад SMS явуулна уу.'],['c','Sněží.','Цас орж байна.']]), correctId:'a', feedbackMn:'Эмийн санд өвдөлтөө хэлээд өвчин намдаах зүйл асууж болно.' },
    { id:'a15final-d8', speaker:'Нөгөө хүн', staffCzech:'Informace je dlouhá.', staffMn:'Мэдээлэл урт байна.', promptMn:'Та дахин хэлүүлж, бичүүлж авах хүсэлт тавиарай.', choices:choices([['a','Ještě jednou, prosím. Napište mi to, prosím.','Дахиад нэг удаа хэлнэ үү. Үүнийг надад бичээд өгнө үү.'],['b','Potřebuji čepici.','Надад малгай хэрэгтэй.'],['c','Jsem nový.','Би шинэ хүн.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед дахин хэлүүлж, бичүүлж авч болно.' },
  ],
};
