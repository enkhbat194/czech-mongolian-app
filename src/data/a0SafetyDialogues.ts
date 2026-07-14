import type { DialogueScenario } from './a0Dialogues';

const choices = (items: Array<[string, string, string]>) => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0SafetyMicroDialogues: Record<string, DialogueScenario> = {
  'a0-14-a': {
    id:'a0-14-a-dialogue', titleMn:'Богино яриа — тусламж', contextMn:'Яаралтай үед та тусламж гуйж байна.',
    steps:[
      { id:'a14a-d1', speaker:'Нөгөө хүн', staffCzech:'Co se stalo?', staffMn:'Юу болсон бэ?', promptMn:'Та тусламж гуйгаарай.', choices:choices([['a','Pomoc!','Туслаарай!'],['b','Dnes je teplo.','Өнөөдөр дулаахан байна.'],['c','Mám děti.','Би хүүхдүүдтэй.']]), correctId:'a', feedbackMn:'Яаралтай үед Pomoc! гэж шууд хэлнэ.' },
      { id:'a14a-d2', speaker:'Нөгөө хүн', staffCzech:'Co se stalo?', staffMn:'Юу болсон бэ?', promptMn:'Та асуудал байгаагаа хэлээрэй.', choices:choices([['a','Mám problém.','Надад асуудал байна.'],['b','Mám čepici.','Надад малгай байна.'],['c','Sněží.','Цас орж байна.']]), correctId:'a', feedbackMn:'Mám problém. = Надад асуудал байна.' },
    ],
  },
  'a0-14-b': {
    id:'a0-14-b-dialogue', titleMn:'Богино яриа — хэнийг дуудах вэ?', contextMn:'Та аль тусламж хэрэгтэйг хэлж байна.',
    steps:[
      { id:'a14b-d1', speaker:'Нөгөө хүн', staffCzech:'Koho mám zavolat?', staffMn:'Хэнийг дуудах вэ?', promptMn:'Та цагдаа дуудаж өгөхийг хүсээрэй.', choices:choices([['a','Zavolejte prosím policii.','Цагдаа дуудаж өгнө үү.'],['b','Zavolejte prosím doktora.','Эмч дуудаж өгнө үү.'],['c','Zavolejte prosím sanitku.','Түргэн тусламж дуудаж өгнө үү.']]), correctId:'a', feedbackMn:'Цагдаа хэрэгтэй бол Zavolejte prosím policii. гэж хэлнэ.' },
      { id:'a14b-d2', speaker:'Нөгөө хүн', staffCzech:'Potřebujete sanitku?', staffMn:'Танд түргэн тусламж хэрэгтэй юу?', promptMn:'Та түргэн тусламж дуудаж өгөхийг хүсээрэй.', choices:choices([['a','Ano, zavolejte prosím sanitku.','Тийм, түргэн тусламж дуудаж өгнө үү.'],['b','Ano, zavolejte prosím doktora.','Тийм, эмч дуудаж өгнө үү.'],['c','Ne, děkuji.','Үгүй, баярлалаа.']]), correctId:'a', feedbackMn:'sanitka = түргэн тусламж. Яаралтай үед шууд хүсэлт хэлнэ.' },
    ],
  },
  'a0-14-c': {
    id:'a0-14-c-dialogue', titleMn:'Богино яриа — дуудаж өгнө үү', contextMn:'Та өөрөө залгаж чадахгүй тул хүнээс дуудаж өгөхийг хүсэж байна.',
    steps:[
      { id:'a14c-d1', speaker:'Нөгөө хүн', staffCzech:'Co potřebujete?', staffMn:'Танд юу хэрэгтэй вэ?', promptMn:'Та эмч дуудаж өгөхийг хүсээрэй.', choices:choices([['a','Zavolejte prosím doktora.','Эмч дуудаж өгнө үү.'],['b','Potřebuji bundu.','Надад хүрэм хэрэгтэй.'],['c','Mám rodinu.','Би гэр бүлтэй.']]), correctId:'a', feedbackMn:'Zavolejte prosím doktora. = Эмч дуудаж өгнө үү.' },
      { id:'a14c-d2', speaker:'Нөгөө хүн', staffCzech:'Je to vážné?', staffMn:'Ноцтой байна уу?', promptMn:'Та түргэн тусламж дуудаж өгөхийг хүсээрэй.', choices:choices([['a','Zavolejte prosím sanitku.','Түргэн тусламж дуудаж өгнө үү.'],['b','Zavolejte prosím policii.','Цагдаа дуудаж өгнө үү.'],['c','Děkuji.','Баярлалаа.']]), correctId:'a', feedbackMn:'Ноцтой үед Zavolejte prosím sanitku. гэж хэлнэ.' },
    ],
  },
  'a0-14-d': {
    id:'a0-14-d-dialogue', titleMn:'Богино яриа — зүгээр эсэх', contextMn:'Хүн таны байдлыг асууж байна.',
    steps:[
      { id:'a14d-d1', speaker:'Нөгөө хүн', staffCzech:'Jste v pořádku?', staffMn:'Та зүгээр үү?', promptMn:'Та зүгээр байгаагаа хэлээрэй.', choices:choices([['a','Jsem v pořádku.','Би зүгээр байна.'],['b','Nejsem v pořádku.','Би зүгээр биш байна.'],['c','Prší.','Бороо орж байна.']]), correctId:'a', feedbackMn:'Jsem v pořádku. = Би зүгээр байна.' },
      { id:'a14d-d2', speaker:'Нөгөө хүн', staffCzech:'Jste v pořádku?', staffMn:'Та зүгээр үү?', promptMn:'Та зүгээр биш байгаагаа хэлээрэй.', choices:choices([['a','Nejsem v pořádku.','Би зүгээр биш байна.'],['b','Jsem v pořádku.','Би зүгээр байна.'],['c','Mám děti.','Би хүүхдүүдтэй.']]), correctId:'a', feedbackMn:'Nejsem v pořádku. = Би зүгээр биш байна.' },
    ],
  },
};

export const a0SafetyFinalDialogue: DialogueScenario = {
  id:'a0-14-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та асуудалтай үед тусламж гуйж, өөрийн байдлыг хэлж, хэнд залгахыг тодруулж байна.',
  steps:[
    { id:'a14final-d1', speaker:'Нөгөө хүн', staffCzech:'Co se stalo?', staffMn:'Юу болсон бэ?', promptMn:'Та яаралтай тусламж гуйгаарай.', choices:choices([['a','Pomoc!','Туслаарай!'],['b','Dnes je zima.','Өнөөдөр хүйтэн байна.'],['c','Mám rodinu.','Би гэр бүлтэй.']]), correctId:'a', feedbackMn:'Яаралтай үед Pomoc! гэж хэлнэ.' },
    { id:'a14final-d2', speaker:'Нөгөө хүн', staffCzech:'Slyšíte mě?', staffMn:'Та намайг сонсож байна уу?', promptMn:'Та сонсож байгаагаа хэлээрэй.', choices:choices([['a','Ano, slyším vás.','Тийм, би таныг сонсож байна.'],['b','Ano, mám děti.','Тийм, би хүүхдүүдтэй.'],['c','Ne, platím hotově.','Үгүй, би бэлнээр төлнө.']]), correctId:'a', feedbackMn:'Яаралтай үед ч утасны өмнөх хэллэг давтагдана.' },
    { id:'a14final-d3', speaker:'Нөгөө хүн', staffCzech:'Co se stalo?', staffMn:'Юу болсон бэ?', promptMn:'Та асуудалтай, тусламж хэрэгтэйгээ хэлээрэй.', choices:choices([['a','Mám problém. Potřebuji pomoc.','Надад асуудал байна. Надад тусламж хэрэгтэй.'],['b','Mám dítě.','Би хүүхэдтэй.'],['c','Prší.','Бороо орж байна.']]), correctId:'a', feedbackMn:'Mám problém. Potřebuji pomoc. гэж хэлж болно.' },
    { id:'a14final-d4', speaker:'Нөгөө хүн', staffCzech:'Jste v pořádku?', staffMn:'Та зүгээр үү?', promptMn:'Та зүгээр биш байгаагаа хэлээрэй.', choices:choices([['a','Nejsem v pořádku.','Би зүгээр биш байна.'],['b','Jsem v pořádku.','Би зүгээр байна.'],['c','Je mi teplo.','Би дулаахан байна.']]), correctId:'a', feedbackMn:'Nejsem v pořádku. = Би зүгээр биш байна.' },
    { id:'a14final-d5', speaker:'Нөгөө хүн', staffCzech:'Co vás bolí?', staffMn:'Юу өвдөж байна вэ?', promptMn:'Та толгой өвдөж байгаагаа хэлээрэй.', choices:choices([['a','Bolí mě hlava.','Миний толгой өвдөж байна.'],['b','Neteče voda.','Ус гарахгүй байна.'],['c','To je drahé.','Энэ үнэтэй байна.']]), correctId:'a', feedbackMn:'Эрүүл мэндийн өмнөх хэллэг энд дахин орж байна.' },
    { id:'a14final-d6', speaker:'Нөгөө хүн', staffCzech:'Koho mám zavolat?', staffMn:'Хэнийг дуудах вэ?', promptMn:'Та эмч дуудаж өгөхийг хүсээрэй.', choices:choices([['a','Zavolejte prosím doktora.','Эмч дуудаж өгнө үү.'],['b','Potřebuji čepici.','Надад малгай хэрэгтэй.'],['c','Jsem nový.','Би шинэ хүн.']]), correctId:'a', feedbackMn:'Zavolejte prosím doktora. = Эмч дуудаж өгнө үү.' },
    { id:'a14final-d7', speaker:'Нөгөө хүн', staffCzech:'Potřebujete sanitku?', staffMn:'Танд түргэн тусламж хэрэгтэй юу?', promptMn:'Та түргэн тусламж дуудаж өгөхийг хүсээрэй.', choices:choices([['a','Ano, zavolejte prosím sanitku.','Тийм, түргэн тусламж дуудаж өгнө үү.'],['b','Ano, účtenku, prosím.','Тийм, баримт өгнө үү.'],['c','Ano, mám klíč.','Тийм, надад түлхүүр байна.']]), correctId:'a', feedbackMn:'Түргэн тусламж хэрэгтэй бол sanitka гэдэг үг хэрэглэнэ.' },
    { id:'a14final-d8', speaker:'Нөгөө хүн', staffCzech:'Dobře. Čekejte tady.', staffMn:'За. Энд хүлээгээрэй.', promptMn:'Та талархаад энд хүлээнэ гэж хэлээрэй.', choices:choices([['a','Dobře, děkuji. Jsem tady.','За, баярлалаа. Би энд байна.'],['b','Dám si kávu.','Би кофе авъя.'],['c','Kolik to stojí?','Энэ хэд вэ?']]), correctId:'a', feedbackMn:'Яаралтай үед богино, тод хариулт хэрэгтэй.' },
  ],
};
