import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0SafetyWords } from './a0SafetyWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0SafetyWords.map((card) => [card.id, card]));

export const a0SafetyCards: CzechWord[] = a0SafetyWords;

export const a0SafetyMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-14-a', titleMn:'1/4 — Тусламж гуйх', canDoMn:'Яаралтай үед тусламж гуйж, асуудал байгаагаа хэлж чадна.',
    cardIds:['a0c0171','a0c0172'],
    instructions:{
      a0c0171:'Pomoc! = Туслаарай! Яаралтай үед чанга, богино хэлнэ.',
      a0c0172:'Mám problém. = Надад асуудал байна. Асуудлаа эхлүүлэх богино өгүүлбэр.',
    },
    exercises:[
      { id:'a0-14-a-1', type:'choice', titleMn:'Яаралтай тусламж', promptMn:'Pomoc! ямар утгатай вэ?', choices:[{id:'a',text:'Туслаарай!'},{id:'b',text:'Би зүгээр байна.'},{id:'c',text:'Өнөөдөр дулаахан байна.'}], correctId:'a', feedbackMn:'Pomoc! = Туслаарай!' },
      { id:'a0-14-a-2', type:'choice', titleMn:'Асуудал хэлэх', promptMn:'Надад асуудал байна. Аль нь зөв вэ?', choices:[{id:'a',text:'Mám problém.'},{id:'b',text:'Mám děti.'},{id:'c',text:'Mám klíč.'}], correctId:'a', feedbackMn:'Mám problém. = Надад асуудал байна.' },
      { id:'a0-14-a-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Надад асуудал байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['problém.','Mám'], expectedText:'Mám problém.', feedbackMn:'Mám problém. = Надад асуудал байна.' },
    ],
  },
  {
    id:'a0-14-b', titleMn:'2/4 — Цагдаа, эмч, түргэн тусламж', canDoMn:'Цагдаа, эмч, түргэн тусламж гэсэн үгийг таньж чадна.',
    cardIds:['a0c0173','a0c0174','a0c0175'],
    instructions:{
      a0c0173:'policie = цагдаа. Аюулгүй байдлын үед сонсож, хэлж мэдэх хэрэгтэй үг.',
      a0c0174:'doktor = эмч. Эрүүл мэндийн үед хэрэгтэй үг.',
      a0c0175:'sanitka = түргэн тусламж. Яаралтай тусламжийн үед хэрэгтэй үг.',
    },
    exercises:[
      { id:'a0-14-b-1', type:'choice', titleMn:'Цагдаа', promptMn:'policie ямар утгатай вэ?', choices:[{id:'a',text:'цагдаа'},{id:'b',text:'эмч'},{id:'c',text:'түргэн тусламж'}], correctId:'a', feedbackMn:'policie = цагдаа.' },
      { id:'a0-14-b-2', type:'choice', titleMn:'Эмч', promptMn:'doktor ямар утгатай вэ?', choices:[{id:'a',text:'эмч'},{id:'b',text:'цагдаа'},{id:'c',text:'малгай'}], correctId:'a', feedbackMn:'doktor = эмч.' },
      { id:'a0-14-b-3', type:'choice', titleMn:'Түргэн тусламж', promptMn:'sanitka ямар утгатай вэ?', choices:[{id:'a',text:'түргэн тусламж'},{id:'b',text:'хүрэм'},{id:'c',text:'гэр бүл'}], correctId:'a', feedbackMn:'sanitka = түргэн тусламж.' },
    ],
  },
  {
    id:'a0-14-c', titleMn:'3/4 — Дуудаж өгнө үү', canDoMn:'Цагдаа, эмч, түргэн тусламж дуудаж өгөхийг хүсэж чадна.',
    cardIds:['a0c0176','a0c0177','a0c0178'],
    instructions:{
      a0c0176:'Zavolejte prosím policii. = Цагдаа дуудаж өгнө үү.',
      a0c0177:'Zavolejte prosím doktora. = Эмч дуудаж өгнө үү.',
      a0c0178:'Zavolejte prosím sanitku. = Түргэн тусламж дуудаж өгнө үү.',
    },
    exercises:[
      { id:'a0-14-c-1', type:'choice', titleMn:'Цагдаа дуудах', promptMn:'Цагдаа дуудаж өгөхийг хүсэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Zavolejte prosím policii.'},{id:'b',text:'Zavolejte prosím doktora.'},{id:'c',text:'Zavolejte prosím sanitku.'}], correctId:'a', feedbackMn:'Zavolejte prosím policii. = Цагдаа дуудаж өгнө үү.' },
      { id:'a0-14-c-2', type:'choice', titleMn:'Эмч дуудах', promptMn:'Эмч дуудаж өгөхийг хүсэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Zavolejte prosím doktora.'},{id:'b',text:'Zavolejte prosím policii.'},{id:'c',text:'Jsem v pořádku.'}], correctId:'a', feedbackMn:'Zavolejte prosím doktora. = Эмч дуудаж өгнө үү.' },
      { id:'a0-14-c-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Түргэн тусламж дуудаж өгнө үү” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['sanitku.','prosím','Zavolejte'], expectedText:'Zavolejte prosím sanitku.', feedbackMn:'Zavolejte prosím sanitku. = Түргэн тусламж дуудаж өгнө үү.' },
    ],
  },
  {
    id:'a0-14-d', titleMn:'4/4 — Би зүгээр үү?', canDoMn:'Зүгээр эсвэл зүгээр биш байгаагаа хэлж чадна.',
    cardIds:['a0c0179','a0c0180'],
    instructions:{
      a0c0179:'Jsem v pořádku. = Би зүгээр байна. Хүн таны байдлыг асуухад хэрэглэнэ.',
      a0c0180:'Nejsem v pořádku. = Би зүгээр биш байна. Тусламж хэрэгтэй үед хэлнэ.',
    },
    exercises:[
      { id:'a0-14-d-1', type:'choice', titleMn:'Зүгээр байна', promptMn:'Jsem v pořádku. ямар утгатай вэ?', choices:[{id:'a',text:'Би зүгээр байна.'},{id:'b',text:'Би зүгээр биш байна.'},{id:'c',text:'Би даарч байна.'}], correctId:'a', feedbackMn:'Jsem v pořádku. = Би зүгээр байна.' },
      { id:'a0-14-d-2', type:'choice', titleMn:'Зүгээр биш байна', promptMn:'Та зүгээр биш байна. Аль нь зөв вэ?', choices:[{id:'a',text:'Nejsem v pořádku.'},{id:'b',text:'Jsem v pořádku.'},{id:'c',text:'Mám rodinu.'}], correctId:'a', feedbackMn:'Nejsem v pořádku. = Би зүгээр биш байна.' },
      { id:'a0-14-d-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би зүгээр байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['pořádku.','v','Jsem'], expectedText:'Jsem v pořádku.', feedbackMn:'Jsem v pořádku. = Би зүгээр байна.' },
    ],
  },
];

export function getA0SafetyCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.14 карт олдсонгүй: ${id}`);
  return card;
}
