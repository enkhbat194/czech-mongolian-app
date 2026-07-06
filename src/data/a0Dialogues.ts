export interface DialogueChoice {
  id: string;
  text: string;
  mongolian: string;
}

export interface DialogueStep {
  id: string;
  speaker: string;
  staffCzech: string;
  staffMn: string;
  promptMn: string;
  choices: DialogueChoice[];
  correctId: string;
  feedbackMn: string;
}

export interface DialogueScenario {
  id: string;
  titleMn: string;
  contextMn: string;
  steps: DialogueStep[];
}

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0FirstContactMicroDialogues: Record<string, DialogueScenario> = {
  'a0-1-a': {
    id: 'a0-1-a-dialogue', titleMn: 'Богино яриа — ресепшний мэндчилгээ', contextMn: 'Та ресепшнд анх орж ирлээ. Ажилтан таныг мэндэлж, баримт өгч байна.',
    steps: [
      { id: 'a01a-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.', promptMn: 'Та албан ёсоор хариу мэндлээрэй.', choices: choices([['a','Ahoj.','Сайн уу.'],['b','Na shledanou.','Баяртай.'],['c','Dobrý den.','Сайн байна уу.']]), correctId: 'c', feedbackMn: 'Ресепшн, ажил, үйлчилгээний газар Dobrý den. гэж мэндэлнэ.' },
      { id: 'a01a-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Prosím.', staffMn: 'Энд байна.', promptMn: 'Ажилтан танд баримт өглөө. Та талархаарай.', choices: choices([['a','Ano.','Тийм.'],['b','Děkuji.','Баярлалаа.'],['c','Ne.','Үгүй.']]), correctId: 'b', feedbackMn: 'Prosím. нь юм дамжуулахдаа “энд байна” гэсэн утгаар сонсогдож болно.' },
    ],
  },
  'a0-1-b': {
    id: 'a0-1-b-dialogue', titleMn: 'Богино яриа — нэрээ батлах', contextMn: 'Ресепшний ажилтан бүртгэлийн жагсаалтаас таны нэрийг шалгаж байна.',
    steps: [
      { id: 'a01b-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Eba?', staffMn: 'Эба?', promptMn: 'Та өөрийгөө зөв хүн мөн гэдгээ батлаарай.', choices: choices([['a','Ne.','Үгүй.'],['b','Ano.','Тийм.'],['c','Na shledanou.','Баяртай.']]), correctId: 'b', feedbackMn: 'Нэрээ асууж баталгаажуулахад Ano. гэж товч хариулж болно.' },
      { id: 'a01b-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Na shledanou.', staffMn: 'Баяртай.', promptMn: 'Та яриаг албан хэлбэрээр дуусгаарай.', choices: choices([['a','Děkuji.','Баярлалаа.'],['b','Na shledanou.','Баяртай.'],['c','Ahoj.','Сайн уу.']]), correctId: 'b', feedbackMn: 'Na shledanou. нь албан болон саармаг баяртай.' },
    ],
  },
  'a0-1-c': {
    id: 'a0-1-c-dialogue', titleMn: 'Богино яриа — нэрээ хэлэх', contextMn: 'Ресепшний ажилтан таны нэрийг асууж байна.',
    steps: [
      { id: 'a01c-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se jmenujete?', staffMn: 'Таны нэр хэн бэ?', promptMn: 'Өөрийн нэрээ хэлээрэй.', choices: choices([['a','Na shledanou.','Баяртай.'],['b','Jmenuji se Eba.','Миний нэр Эба.'],['c','Dobrý den.','Сайн байна уу.']]), correctId: 'b', feedbackMn: 'Jmenuji se … гэдэг нь нэрээ хэлэх бэлэн бүтэц.' },
    ],
  },
  'a0-1-d': {
    id: 'a0-1-d-dialogue', titleMn: 'Богино яриа — нөгөө хүний нэр', contextMn: 'Та ресепшний ажилтантай танилцаж байна.',
    steps: [
      { id: 'a01d-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.', promptMn: 'Та ажилтны нэрийг албан хэлбэрээр асуугаарай.', choices: choices([['a','Kdo jste?','Та хэн бэ?'],['b','Jak se jmenujete?','Таны нэр хэн бэ?'],['c','Jak se máte?','Та сайн уу?']]), correctId: 'b', feedbackMn: 'Нэрийг нь эелдгээр асуухдаа Jak se jmenujete? гэдэг.' },
      { id: 'a01d-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Jmenuji se Jana.', staffMn: 'Миний нэр Яна.', promptMn: 'Та танилцсандаа эелдгээр хариулаарай.', choices: choices([['a','Děkuji.','Баярлалаа.'],['b','Kdo jste?','Та хэн бэ?'],['c','Ne.','Үгүй.']]), correctId: 'a', feedbackMn: 'Нэрийг сонссоны дараа Děkuji. гэж талархаж болно.' },
    ],
  },
  'a0-1-e': {
    id: 'a0-1-e-dialogue', titleMn: 'Богино яриа — хаанаас ирсэн бэ?', contextMn: 'Та ресепшний ажилтантай богино танилцаж байна.',
    steps: [
      { id: 'a01e-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se máte?', staffMn: 'Та сайн уу?', promptMn: 'Та сайн байгаагаа хэлээрэй.', choices: choices([['a','Špatně.','Муу.'],['b','Na shledanou.','Баяртай.'],['c','Dobře.','Сайн.']]), correctId: 'c', feedbackMn: 'Jak se máte? гэсэн асуултад Dobře. гэж хариулж болно.' },
      { id: 'a01e-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Odkud jste?', staffMn: 'Та хаанаас ирсэн бэ?', promptMn: 'Та Монголоос ирснээ хэлээрэй.', choices: choices([['a','Jsem z Mongolska.','Би Монголоос ирсэн.'],['b','Jmenuji se Eba.','Миний нэр Эба.'],['c','Dobře.','Сайн.']]), correctId: 'a', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.' },
    ],
  },
  'a0-1-f': {
    id: 'a0-1-f-dialogue', titleMn: 'Богино яриа — удаан ярихыг хүсэх', contextMn: 'Ажилтан таныг ойлгож байгаа эсэхийг шалгаж байна. Та хэт хурдан байгааг хэлэх хэрэгтэй.',
    steps: [
      { id: 'a01f-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Mluvím moc rychle?', staffMn: 'Би хэт хурдан ярьж байна уу?', promptMn: 'Та ойлгохгүй байгаагаа хэлээд, удаан ярихыг хүсээрэй.', choices: choices([['a','Ano. Nerozumím. Mluvte prosím pomalu.','Тийм. Би ойлгохгүй байна. Удаан ярьж өгнө үү.'],['b','Ne. Na shledanou.','Үгүй. Баяртай.'],['c','Jmenuji se Eba.','Миний нэр Эба.']]), correctId: 'a', feedbackMn: 'Энэ нөхцөлд Ano. Nerozumím. Mluvte prosím pomalu. гэж шууд хамгаалж болно.' },
    ],
  },
};

export const a0FirstContactFinalDialogue: DialogueScenario = {
  id: 'a0-1-final-dialogue', titleMn: 'Төгсгөлийн бодит яриа', contextMn: 'Та ажлын газрын ресепшнд анх ирж, өөрийгөө танилцуулна. Ажилтан хэт хурдан ярьж байвал удаан ярихыг хүснэ.',
  steps: [
    { id: 'a01final-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.', promptMn: 'Албан ёсоор мэндлээрэй.', choices: choices([['a','Ahoj.','Сайн уу.'],['b','Dobrý den.','Сайн байна уу.'],['c','Na shledanou.','Баяртай.']]), correctId:'b', feedbackMn:'Албан нөхцөлд Dobrý den. хэрэглэнэ.' },
    { id: 'a01final-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se jmenujete?', staffMn: 'Таны нэр хэн бэ?', promptMn: 'Нэрээ хэлээрэй.', choices: choices([['a','Jmenuji se Eba.','Миний нэр Эба.'],['b','Dobře.','Сайн.'],['c','Kdo jste?','Та хэн бэ?']]), correctId:'a', feedbackMn:'Jmenuji se … гэж нэрээ хэлнэ.' },
    { id: 'a01final-d3', speaker: 'Ресепшний ажилтан', staffCzech: 'Odkud jste?', staffMn: 'Та хаанаас ирсэн бэ?', promptMn: 'Гарал орноо хэлээрэй.', choices: choices([['a','Děkuji.','Баярлалаа.'],['b','Jsem z Mongolska.','Би Монголоос ирсэн.'],['c','Špatně.','Муу.']]), correctId:'b', feedbackMn:'Jsem z Mongolska. = Би Монголоос ирсэн.' },
    { id: 'a01final-d4', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se máte?', staffMn: 'Та сайн уу?', promptMn: 'Та сайн байгаагаа, эелдгээр хэлээрэй.', choices: choices([['a','Dobře, děkuji.','Сайн, баярлалаа.'],['b','Na shledanou.','Баяртай.'],['c','Nerozumím.','Би ойлгохгүй байна.']]), correctId:'a', feedbackMn:'Dobře, děkuji. нь энгийн бөгөөд эелдэг хариу.' },
    { id: 'a01final-d5', speaker: 'Ресепшний ажилтан', staffCzech: 'Mluvím moc rychle?', staffMn: 'Би хэт хурдан ярьж байна уу?', promptMn: 'Та ойлгохгүй байгаагаа хэлээд удаан ярихыг хүсээрэй.', choices: choices([['a','Ano. Nerozumím. Mluvte prosím pomalu.','Тийм. Би ойлгохгүй байна. Удаан ярьж өгнө үү.'],['b','Jmenuji se Eba.','Миний нэр Эба.'],['c','Ne.','Үгүй.']]), correctId:'a', feedbackMn:'Ойлгохгүй үед энэ хоёр хамгаалах хэллэгийг хамтад нь хэрэглэж болно.' },
    { id: 'a01final-d6', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobře.', staffMn: 'За.', promptMn: 'Та талархаад яриаг албан ёсоор дуусгаарай.', choices: choices([['a','Ahoj.','Сайн уу.'],['b','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['c','Ne.','Үгүй.']]), correctId:'b', feedbackMn:'Děkuji. Na shledanou. гэж эелдгээр дуусгана.' },
  ],
};

export const a0NeedsMicroDialogues: Record<string, DialogueScenario> = {
  'a0-2-a': {
    id:'a0-2-a-dialogue', titleMn:'Богино яриа — тусламж хүсэх', contextMn:'Та ресепшн дээр очоод тусламж хэрэгтэй болжээ.',
    steps:[
      { id:'a02a-d1', speaker:'Ресепшний ажилтан', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та эелдгээр тусламж хүсээрэй.', choices:choices([['a','Potřebuji pomoc, prosím.','Надад туслаач, гуйя.'],['b','Na shledanou.','Баяртай.'],['c','Jmenuji se Eba.','Миний нэр Эба.']]), correctId:'a', feedbackMn:'Potřebuji pomoc, prosím. = Надад туслаач, гуйя.' },
      { id:'a02a-d2', speaker:'Ресепшний ажилтан', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Туслахаар болсонд нь талархаарай.', choices:choices([['a','Ne.','Үгүй.'],['b','Děkuji.','Баярлалаа.'],['c','Kde je toaleta?','Ариун цэврийн өрөө хаана байна?']]), correctId:'b', feedbackMn:'Dobře. гэсэн хариуны дараа Děkuji. гэж талархана.' },
    ],
  },
  'a0-2-b': {
    id:'a0-2-b-dialogue', titleMn:'Богино яриа — ус ба утас', contextMn:'Та ресепшнд хүлээж байхдаа эхлээд ус, дараа нь утас хэрэгтэй болжээ.',
    steps:[
      { id:'a02b-d1', speaker:'Ресепшний ажилтан', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та ус хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Potřebuji telefon.','Надад утас хэрэгтэй.'],['b','Potřebuji vodu.','Надад ус хэрэгтэй.'],['c','Chci jídlo.','Би хоол хүсэж байна.']]), correctId:'b', feedbackMn:'Potřebuji vodu. = Надад ус хэрэгтэй.' },
      { id:'a02b-d2', speaker:'Ресепшний ажилтан', staffCzech:'Prosím.', staffMn:'Энд байна.', promptMn:'Та ус авсандаа талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Nemám kartu.','Надад карт байхгүй.'],['c','Ne.','Үгүй.']]), correctId:'a', feedbackMn:'Юм авахдаа Děkuji. гэж хэлнэ.' },
      { id:'a02b-d3', speaker:'Ресепшний ажилтан', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Одоо та утас хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Chci tohle.','Би үүнийг хүсэж байна.'],['b','Potřebuji telefon.','Надад утас хэрэгтэй.'],['c','Potřebuji vodu.','Надад ус хэрэгтэй.']]), correctId:'b', feedbackMn:'Potřebuji telefon. = Надад утас хэрэгтэй.' },
    ],
  },
  'a0-2-c': {
    id:'a0-2-c-dialogue', titleMn:'Богино яриа — кафе дээр ус, хоол хүсэх', contextMn:'Та кафед сууж байна. Үйлчлэгч ус, дараа нь хоол хэрэгтэй эсэхийг асууж байна.',
    steps:[
      { id:'a02c-d1', speaker:'Үйлчлэгч', staffCzech:'Vodu?', staffMn:'Ус уу?', promptMn:'Та ус хүсэж байгаагаа хэлээрэй.', choices:choices([['a','Chci jídlo.','Би хоол хүсэж байна.'],['b','Chci vodu.','Би ус хүсэж байна.'],['c','Nemám peníze.','Надад мөнгө байхгүй.']]), correctId:'b', feedbackMn:'Chci vodu. = Би ус хүсэж байна.' },
      { id:'a02c-d2', speaker:'Үйлчлэгч', staffCzech:'Jídlo?', staffMn:'Хоол уу?', promptMn:'Та хоол хүсэж байгаагаа хэлээрэй.', choices:choices([['a','Chci jídlo.','Би хоол хүсэж байна.'],['b','Potřebuji telefon.','Надад утас хэрэгтэй.'],['c','Chci vodu.','Би ус хүсэж байна.']]), correctId:'a', feedbackMn:'Chci jídlo. = Би хоол хүсэж байна.' },
    ],
  },
  'a0-2-d': {
    id:'a0-2-d-dialogue', titleMn:'Богино яриа — зааж сонгох', contextMn:'Үйлчлэгч танд лангуун дээрх нэг зүйлийг зааж байна.',
    steps:[
      { id:'a02d-d1', speaker:'Үйлчлэгч', staffCzech:'Tohle?', staffMn:'Энэ юу?', promptMn:'Та зааж байгаа зүйлийг хүсэж байгаагаа хэлээрэй.', choices:choices([['a','Chci tohle.','Би үүнийг хүсэж байна.'],['b','Chci vodu.','Би ус хүсэж байна.'],['c','Nemám kartu.','Надад карт байхгүй.']]), correctId:'a', feedbackMn:'Chci tohle. = Би үүнийг хүсэж байна.' },
    ],
  },
  'a0-2-e': {
    id:'a0-2-e-dialogue', titleMn:'Богино яриа — карт, бэлэн мөнгө', contextMn:'Та төлбөр хийх гэж байна. Үйлчлэгч картаар эсвэл бэлэн мөнгөөр төлөх эсэхийг асууж байна.',
    steps:[
      { id:'a02e-d1', speaker:'Үйлчлэгч', staffCzech:'Kartu?', staffMn:'Картаар уу?', promptMn:'Та карт байхгүйгээ хэлээрэй.', choices:choices([['a','Nemám kartu.','Надад карт байхгүй.'],['b','Nemám peníze.','Надад мөнгө байхгүй.'],['c','Chci kartu.','Би карт хүсэж байна.']]), correctId:'a', feedbackMn:'Nemám kartu. = Надад карт байхгүй.' },
      { id:'a02e-d2', speaker:'Үйлчлэгч', staffCzech:'Peníze?', staffMn:'Бэлэн мөнгө байна уу?', promptMn:'Та бэлэн мөнгө ч байхгүйгээ хэлээрэй.', choices:choices([['a','Potřebuji vodu.','Надад ус хэрэгтэй.'],['b','Nemám kartu.','Надад карт байхгүй.'],['c','Nemám peníze.','Надад мөнгө байхгүй.']]), correctId:'c', feedbackMn:'Nemám peníze. = Надад мөнгө байхгүй.' },
    ],
  },
  'a0-2-f': {
    id:'a0-2-f-dialogue', titleMn:'Богино яриа — эелдгээр тусламж хүсэх', contextMn:'Та ресепшн дээр асуудлаа эелдгээр хэлэхийг оролдож байна.',
    steps:[
      { id:'a02f-d1', speaker:'Ресепшний ажилтан', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та эелдгээр тусламж хүсээрэй.', choices:choices([['a','Potřebuji pomoc.','Надад тусламж хэрэгтэй.'],['b','Potřebuji pomoc, prosím.','Надад туслаач, гуйя.'],['c','Na shledanou.','Баяртай.']]), correctId:'b', feedbackMn:'prosím нэмбэл хүсэлт илүү эелдэг болно.' },
    ],
  },
};

export const a0NeedsFinalDialogue: DialogueScenario = {
  id:'a0-2-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та ресепшнд очоод утас, ус, идэх юм хүсэж байна. Яриаг эелдгээр эхлүүлж, талархаад дуусгана.',
  steps:[
    { id:'a02final-d1', speaker:'Ресепшний ажилтан', staffCzech:'Dobrý den. Co potřebujete?', staffMn:'Сайн байна уу. Танд юу хэрэгтэй вэ?', promptMn:'Та утас хэрэгтэйгээ эелдгээр хэлээрэй.', choices:choices([['a','Potřebuji telefon, prosím.','Надад утас хэрэгтэй, гуйя.'],['b','Chci jídlo.','Би хоол хүсэж байна.'],['c','Nemám kartu.','Надад карт байхгүй.']]), correctId:'a', feedbackMn:'Potřebuji telefon, prosím. нь утас гуйх эелдэг хэлбэр.' },
    { id:'a02final-d2', speaker:'Ресепшний ажилтан', staffCzech:'Prosím.', staffMn:'Энд байна.', promptMn:'Та утас авсандаа талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Ne.','Үгүй.'],['c','Kde je obchod?','Дэлгүүр хаана байна?']]), correctId:'a', feedbackMn:'Авахдаа Děkuji. гэж хэлнэ.' },
    { id:'a02final-d3', speaker:'Ресепшний ажилтан', staffCzech:'Vodu?', staffMn:'Ус уу?', promptMn:'Та ус хүсэж байгаагаа батлаарай.', choices:choices([['a','Nemám peníze.','Надад мөнгө байхгүй.'],['b','Ano, prosím.','Тийм, гуйя.'],['c','Na shledanou.','Баяртай.']]), correctId:'b', feedbackMn:'Vodu? гэсэн асуултад Ano, prosím. гэж товч, эелдгээр хариулж болно.' },
    { id:'a02final-d4', speaker:'Ресепшний ажилтан', staffCzech:'Prosím.', staffMn:'Энд байна.', promptMn:'Та ус авсандаа талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Potřebuji telefon.','Надад утас хэрэгтэй.'],['c','Ne.','Үгүй.']]), correctId:'a', feedbackMn:'Юм авч буй үед Děkuji. гэдэг.' },
    { id:'a02final-d5', speaker:'Ресепшний ажилтан', staffCzech:'Jídlo?', staffMn:'Хоол уу?', promptMn:'Та идэх юм хүсэж байгаагаа хэлээрэй.', choices:choices([['a','Chci něco k jídlu.','Би идэх юм хүсэж байна.'],['b','Potřebuji pomoc.','Надад тусламж хэрэгтэй.'],['c','Nemám kartu.','Надад карт байхгүй.']]), correctId:'a', feedbackMn:'Chci něco k jídlu. = Би идэх юм хүсэж байна.' },
    { id:'a02final-d6', speaker:'Ресепшний ажилтан', staffCzech:'Prosím.', staffMn:'Энд байна.', promptMn:'Та талархаад яриаг эелдгээр дуусгаарай.', choices:choices([['a','Ahoj.','Сайн уу.'],['b','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['c','Ne.','Үгүй.']]), correctId:'b', feedbackMn:'Děkuji. Na shledanou. нь эелдгээр хаах хэлбэр.' },
  ],
};
