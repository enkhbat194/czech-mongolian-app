import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0PeopleWords } from './a0PeopleWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0PeopleWords.map((card) => [card.id, card]));

export const a0PeopleCards: CzechWord[] = a0PeopleWords;

export const a0PeopleMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-12-a', titleMn:'1/4 — Гэр бүл, эхнэр, нөхөр', canDoMn:'Гэр бүл, эхнэр, нөхөр гэсэн үгийг таньж чадна.',
    cardIds:['a0c0148','a0c0149','a0c0150','a0c0151'],
    instructions:{
      a0c0148:'rodina = гэр бүл. Өөрийн гэр бүлийн тухай ярихад хэрэгтэй үг.',
      a0c0149:'moje rodina = миний гэр бүл. “moje” нь миний гэсэн утгаар сонсогдоно.',
      a0c0150:'manžel = нөхөр. Гэр бүлийн тухай ярихад хэрэгтэй үг.',
      a0c0151:'manželka = эхнэр. Гэр бүлийн тухай ярихад хэрэгтэй үг.',
    },
    exercises:[
      { id:'a0-12-a-1', type:'choice', titleMn:'Үг таних', promptMn:'rodina ямар утгатай вэ?', choices:[{id:'a',text:'гэр бүл'},{id:'b',text:'малгай'},{id:'c',text:'цагдаа'}], correctId:'a', feedbackMn:'rodina = гэр бүл.' },
      { id:'a0-12-a-2', type:'choice', titleMn:'Миний гэр бүл', promptMn:'moje rodina ямар утгатай вэ?', choices:[{id:'a',text:'миний гэр бүл'},{id:'b',text:'миний түлхүүр'},{id:'c',text:'миний ажил'}], correctId:'a', feedbackMn:'moje rodina = миний гэр бүл.' },
      { id:'a0-12-a-3', type:'choice', titleMn:'Эхнэр, нөхөр', promptMn:'manželka ямар утгатай вэ?', choices:[{id:'a',text:'эхнэр'},{id:'b',text:'нөхөр'},{id:'c',text:'хүүхэд'}], correctId:'a', feedbackMn:'manželka = эхнэр.' },
    ],
  },
  {
    id:'a0-12-b', titleMn:'2/4 — Хүүхэдтэйгээ хэлэх', canDoMn:'Нэг хүүхэдтэй эсвэл хүүхдүүдтэйгээ хэлж чадна.',
    cardIds:['a0c0152','a0c0153','a0c0154','a0c0155','a0c0156'],
    instructions:{
      a0c0152:'dítě = хүүхэд. Нэг хүүхдийн тухай хэлнэ.',
      a0c0153:'děti = хүүхдүүд. Олон хүүхдийн тухай хэлнэ.',
      a0c0154:'Mám rodinu. = Би гэр бүлтэй.',
      a0c0155:'Mám dítě. = Би хүүхэдтэй. Нэг хүүхэдтэйгээ хэлнэ.',
      a0c0156:'Mám děti. = Би хүүхдүүдтэй. Олон хүүхэдтэйгээ хэлнэ.',
    },
    exercises:[
      { id:'a0-12-b-1', type:'choice', titleMn:'Нэг хүүхэд', promptMn:'Mám dítě. ямар утгатай вэ?', choices:[{id:'a',text:'Би хүүхэдтэй.'},{id:'b',text:'Би хүүхдүүдтэй.'},{id:'c',text:'Би шинэ хүн.'}], correctId:'a', feedbackMn:'Mám dítě. = Би хүүхэдтэй.' },
      { id:'a0-12-b-2', type:'choice', titleMn:'Олон хүүхэд', promptMn:'Та олон хүүхэдтэй. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Mám děti.'},{id:'b',text:'Mám dítě.'},{id:'c',text:'Mám problém.'}], correctId:'a', feedbackMn:'Mám děti. = Би хүүхдүүдтэй.' },
      { id:'a0-12-b-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би гэр бүлтэй” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['rodinu.','Mám'], expectedText:'Mám rodinu.', feedbackMn:'Mám rodinu. = Би гэр бүлтэй.' },
    ],
  },
  {
    id:'a0-12-c', titleMn:'3/4 — Гэр бүлтэйгээ байна', canDoMn:'Энд гэр бүлтэйгээ байгаагаа хэлж чадна.',
    cardIds:['a0c0157'],
    instructions:{
      a0c0157:'Jsem tady s rodinou. = Би энд гэр бүлтэйгээ байна. Чехэд ирээд хамт байгаа хүнээ хэлэхэд хэрэгтэй.',
    },
    exercises:[
      { id:'a0-12-c-1', type:'choice', titleMn:'Утга таних', promptMn:'Jsem tady s rodinou. ямар утгатай вэ?', choices:[{id:'a',text:'Би энд гэр бүлтэйгээ байна.'},{id:'b',text:'Би энд ганцаараа байна.'},{id:'c',text:'Би даарч байна.'}], correctId:'a', feedbackMn:'Jsem tady s rodinou. = Би энд гэр бүлтэйгээ байна.' },
      { id:'a0-12-c-2', type:'choice', titleMn:'Гэр бүлтэйгээ байгаа', promptMn:'Та энд гэр бүлтэйгээ байна. Аль нь зөв вэ?', choices:[{id:'a',text:'Jsem tady s rodinou.'},{id:'b',text:'Jsem v pořádku.'},{id:'c',text:'Sněží.'}], correctId:'a', feedbackMn:'Гэр бүлтэйгээ байвал Jsem tady s rodinou. гэж хэлнэ.' },
      { id:'a0-12-c-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би энд гэр бүлтэйгээ байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['s','rodinou.','tady','Jsem'], expectedText:'Jsem tady s rodinou.', feedbackMn:'Jsem tady s rodinou. = Би энд гэр бүлтэйгээ байна.' },
    ],
  },
  {
    id:'a0-12-d', titleMn:'4/4 — Ганцаараа байна', canDoMn:'Ганцаараа байгаа хоёр хэлбэрийг ялгаж сонгож чадна.',
    cardIds:['a0c0158','a0c0159'],
    instructions:{
      a0c0158:'Jsem tady sám. = Би энд ганцаараа байна. Эрэгтэй хүн өөрийн тухай хэлэхэд хэрэглэнэ.',
      a0c0159:'Jsem tady sama. = Би энд ганцаараа байна. Эмэгтэй хүн өөрийн тухай хэлэхэд хэрэглэнэ.',
    },
    exercises:[
      { id:'a0-12-d-1', type:'choice', titleMn:'Эрэгтэй хэлбэр', promptMn:'Эрэгтэй хүн “би энд ганцаараа байна” гэж хэлэх бол аль нь зөв вэ?', choices:[{id:'a',text:'Jsem tady sám.'},{id:'b',text:'Jsem tady sama.'},{id:'c',text:'Mám děti.'}], correctId:'a', feedbackMn:'Эрэгтэй хүн өөрийн тухай Jsem tady sám. гэж хэлнэ.' },
      { id:'a0-12-d-2', type:'choice', titleMn:'Эмэгтэй хэлбэр', promptMn:'Эмэгтэй хүн “би энд ганцаараа байна” гэж хэлэх бол аль нь зөв вэ?', choices:[{id:'a',text:'Jsem tady sama.'},{id:'b',text:'Jsem tady sám.'},{id:'c',text:'Mám rodinu.'}], correctId:'a', feedbackMn:'Эмэгтэй хүн өөрийн тухай Jsem tady sama. гэж хэлнэ.' },
      { id:'a0-12-d-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'Эрэгтэй хэлбэрийг зөв дарааллаар байрлуул.', tokens:['sám.','tady','Jsem'], expectedText:'Jsem tady sám.', feedbackMn:'Jsem tady sám. = Би энд ганцаараа байна.' },
    ],
  },
];

export function getA0PeopleCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.12 карт олдсонгүй: ${id}`);
  return card;
}
