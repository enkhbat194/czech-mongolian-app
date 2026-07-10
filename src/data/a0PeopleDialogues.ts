import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0PeopleMicroDialogues: Record<string, DialogueScenario> = {
  'a0-12-a': {
    id:'a0-12-a-dialogue', titleMn:'Богино яриа — гэр бүл', contextMn:'Та шинэ хүнтэй танилцаж, гэр бүлийн тухай богино ярьж байна.',
    steps:[
      { id:'a12a-d1', speaker:'Нөгөө хүн', staffCzech:'Dobrý den. Jak se jmenujete?', staffMn:'Сайн байна уу. Таны нэр хэн бэ?', promptMn:'Та нэрээ хэлээрэй.', choices:choices([['a','Jmenuji se Eba.','Миний нэр Эба.'],['b','Mám problém.','Надад асуудал байна.'],['c','Prší.','Бороо орж байна.']]), correctId:'a', feedbackMn:'Танилцахдаа Jmenuji se ... гэж эхэлж болно.' },
      { id:'a12a-d2', speaker:'Нөгөө хүн', staffCzech:'Rodina?', staffMn:'Гэр бүл үү?', promptMn:'Та “миний гэр бүл” гэж хэлээрэй.', choices:choices([['a','Moje rodina.','Миний гэр бүл.'],['b','Moje čepice.','Миний малгай.'],['c','Moje práce.','Миний ажил.']]), correctId:'a', feedbackMn:'Moje rodina. = Миний гэр бүл.' },
    ],
  },
  'a0-12-b': {
    id:'a0-12-b-dialogue', titleMn:'Богино яриа — хүүхэдтэй юу?', contextMn:'Нөгөө хүн таныг хүүхэдтэй эсэхийг асууж байна.',
    steps:[
      { id:'a12b-d1', speaker:'Нөгөө хүн', staffCzech:'Máte děti?', staffMn:'Та хүүхэдтэй юу?', promptMn:'Та нэг хүүхэдтэйгээ хэлээрэй.', choices:choices([['a','Mám dítě.','Би хүүхэдтэй.'],['b','Mám děti.','Би хүүхдүүдтэй.'],['c','Nemám klíč.','Надад түлхүүр байхгүй.']]), correctId:'a', feedbackMn:'Нэг хүүхэдтэй бол Mám dítě. гэж хэлнэ.' },
      { id:'a12b-d2', speaker:'Нөгөө хүн', staffCzech:'Máte rodinu?', staffMn:'Та гэр бүлтэй юу?', promptMn:'Та гэр бүлтэйгээ хэлээрэй.', choices:choices([['a','Mám rodinu.','Би гэр бүлтэй.'],['b','Mám teplotu.','Би халуурч байна.'],['c','Mám čas.','Би завтай.']]), correctId:'a', feedbackMn:'Mám rodinu. = Би гэр бүлтэй.' },
    ],
  },
  'a0-12-c': {
    id:'a0-12-c-dialogue', titleMn:'Богино яриа — гэр бүлтэйгээ байна', contextMn:'Таныг энд ганцаараа эсвэл гэр бүлтэйгээ байгаа эсэхийг асууж байна.',
    steps:[
      { id:'a12c-d1', speaker:'Нөгөө хүн', staffCzech:'Jste tady s rodinou?', staffMn:'Та энд гэр бүлтэйгээ байгаа юу?', promptMn:'Та гэр бүлтэйгээ байгаагаа хэлээрэй.', choices:choices([['a','Ano, jsem tady s rodinou.','Тийм, би энд гэр бүлтэйгээ байна.'],['b','Je mi zima.','Би даарч байна.'],['c','Pomoc!','Туслаарай!']]), correctId:'a', feedbackMn:'Гэр бүлтэйгээ байвал jsem tady s rodinou гэж хэлнэ.' },
      { id:'a12c-d2', speaker:'Нөгөө хүн', staffCzech:'Dobře.', staffMn:'За.', promptMn:'Та талархаарай.', choices:choices([['a','Děkuji.','Баярлалаа.'],['b','Sněží.','Цас орж байна.'],['c','Zavolejte prosím policii.','Цагдаа дуудаж өгнө үү.']]), correctId:'a', feedbackMn:'Děkuji. = Баярлалаа.' },
    ],
  },
  'a0-12-d': {
    id:'a0-12-d-dialogue', titleMn:'Богино яриа — ганцаараа байна', contextMn:'Та энд ганцаараа байгаагаа тайлбарлаж байна.',
    steps:[
      { id:'a12d-d1', speaker:'Нөгөө хүн', staffCzech:'Jste tady s rodinou?', staffMn:'Та энд гэр бүлтэйгээ байгаа юу?', promptMn:'Эрэгтэй хүн өөрийн тухай ганцаараа байгаагаа хэлнэ.', choices:choices([['a','Ne, jsem tady sám.','Үгүй, би энд ганцаараа байна.'],['b','Ano, mám děti.','Тийм, би хүүхдүүдтэй.'],['c','Prší.','Бороо орж байна.']]), correctId:'a', feedbackMn:'Эрэгтэй хүн Ne, jsem tady sám. гэж хэлж болно.' },
      { id:'a12d-d2', speaker:'Нөгөө хүн', staffCzech:'Jste tady sama?', staffMn:'Та энд ганцаараа байгаа юу?', promptMn:'Эмэгтэй хүн өөрийн тухай ганцаараа байгаагаа хэлнэ.', choices:choices([['a','Ano, jsem tady sama.','Тийм, би энд ганцаараа байна.'],['b','Ano, jsem tady sám.','Тийм, би энд ганцаараа байна.'],['c','Mám problém.','Надад асуудал байна.']]), correctId:'a', feedbackMn:'Эмэгтэй хүн Ano, jsem tady sama. гэж хэлж болно.' },
    ],
  },
};

export const a0PeopleFinalDialogue: DialogueScenario = {
  id:'a0-12-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та шинэ хүнтэй танилцаж, гэр бүл, хүүхэд, хамт байгаа эсэхээ энгийнээр тайлбарлаж байна.',
  steps:[
    { id:'a12final-d1', speaker:'Нөгөө хүн', staffCzech:'Dobrý den. Jak se jmenujete?', staffMn:'Сайн байна уу. Таны нэр хэн бэ?', promptMn:'Та мэндлээд нэрээ хэлээрэй.', choices:choices([['a','Dobrý den. Jmenuji se Eba.','Сайн байна уу. Миний нэр Эба.'],['b','Dnes je zima.','Өнөөдөр хүйтэн байна.'],['c','Pomoc!','Туслаарай!']]), correctId:'a', feedbackMn:'Танилцахдаа мэндлээд нэрээ хэлнэ.' },
    { id:'a12final-d2', speaker:'Нөгөө хүн', staffCzech:'Odkud jste?', staffMn:'Та хаанаас ирсэн бэ?', promptMn:'Та Монголоос ирснээ хэлээрэй.', choices:choices([['a','Jsem z Mongolska.','Би Монголоос ирсэн.'],['b','Jsem v práci.','Би ажил дээр байна.'],['c','Jsem v pořádku.','Би зүгээр байна.']]), correctId:'a', feedbackMn:'Өмнөх танилцах хэллэг Jsem z Mongolska. энд дахин хэрэглэгдэнэ.' },
    { id:'a12final-d3', speaker:'Нөгөө хүн', staffCzech:'Mluvíte česky?', staffMn:'Та чехээр ярьдаг уу?', promptMn:'Та бага зэрэг ярьдаг, удаан ярихыг хүсэж байгаагаа хэлээрэй.', choices:choices([['a','Mluvím trochu česky. Mluvte prosím pomalu.','Би бага зэрэг чехээр ярьдаг. Удаан ярьж өгнө үү.'],['b','Platím kartou.','Би картаар төлнө.'],['c','Neteče voda.','Ус гарахгүй байна.']]), correctId:'a', feedbackMn:'Танилцах үед ч ойлгохгүй бол удаан ярихыг хүснэ.' },
    { id:'a12final-d4', speaker:'Нөгөө хүн', staffCzech:'Máte rodinu?', staffMn:'Та гэр бүлтэй юу?', promptMn:'Та гэр бүлтэйгээ хэлээрэй.', choices:choices([['a','Ano, mám rodinu.','Тийм, би гэр бүлтэй.'],['b','Ano, mám klíč.','Тийм, надад түлхүүр байна.'],['c','Ne, platím hotově.','Үгүй, би бэлнээр төлнө.']]), correctId:'a', feedbackMn:'Mám rodinu. = Би гэр бүлтэй.' },
    { id:'a12final-d5', speaker:'Нөгөө хүн', staffCzech:'Jste tady s rodinou?', staffMn:'Та энд гэр бүлтэйгээ байгаа юу?', promptMn:'Та энд гэр бүлтэйгээ байгаагаа хэлээрэй.', choices:choices([['a','Ano, jsem tady s rodinou.','Тийм, би энд гэр бүлтэйгээ байна.'],['b','Nejsem v pořádku.','Би зүгээр биш байна.'],['c','Potřebuji bundu.','Надад хүрэм хэрэгтэй.']]), correctId:'a', feedbackMn:'Jsem tady s rodinou. = Би энд гэр бүлтэйгээ байна.' },
    { id:'a12final-d6', speaker:'Нөгөө хүн', staffCzech:'Máte děti?', staffMn:'Та хүүхэдтэй юу?', promptMn:'Та хүүхдүүдтэйгээ хэлээрэй.', choices:choices([['a','Ano, mám děti.','Тийм, би хүүхдүүдтэй.'],['b','Prší.','Бороо орж байна.'],['c','Je problém.','Асуудал байна.']]), correctId:'a', feedbackMn:'Олон хүүхэдтэй бол Mám děti. гэж хэлнэ.' },
    { id:'a12final-d7', speaker:'Нөгөө хүн', staffCzech:'Jste tady sám?', staffMn:'Та энд ганцаараа байгаа юу?', promptMn:'Эрэгтэй хүн бол ганцаараа биш, гэр бүлтэйгээ байгаагаа дахин тодруулаарай.', choices:choices([['a','Ne, jsem tady s rodinou.','Үгүй, би энд гэр бүлтэйгээ байна.'],['b','Ano, jsem tady sám.','Тийм, би энд ганцаараа байна.'],['c','Mám teplotu.','Би халуурч байна.']]), correctId:'a', feedbackMn:'Асуултад үгүй гэж хариулаад зөв мэдээллээ дахин хэлж болно.' },
    { id:'a12final-d8', speaker:'Нөгөө хүн', staffCzech:'Dobře. Děkuji.', staffMn:'За. Баярлалаа.', promptMn:'Та талархаад яриаг хаагаарай.', choices:choices([['a','Děkuji. Na shledanou.','Баярлалаа. Баяртай.'],['b','Účtenku, prosím.','Баримт өгнө үү.'],['c','Bolí mě hlava.','Миний толгой өвдөж байна.']]), correctId:'a', feedbackMn:'Яриаг Děkuji. Na shledanou. гэж хаана.' },
  ],
};
