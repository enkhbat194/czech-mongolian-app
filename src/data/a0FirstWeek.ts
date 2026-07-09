import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0FirstWeekWords } from './a0FirstWeekWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0FirstWeekWords.map((card) => [card.id, card]));

export const a0FirstWeekCards: CzechWord[] = a0FirstWeekWords;

export const a0FirstWeekMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-15-a', titleMn:'1/3 — Би шинэ хүн', canDoMn:'Эхний долоо хоногт шинэ хүн гэдгээ богино тайлбарлаж чадна.',
    cardIds:['a0c0181','a0c0182','a0c0183'],
    instructions:{
      a0c0181:'první týden = эхний долоо хоног. Энэ хичээлийн амьдралын нөхцөл.',
      a0c0182:'Jsem nový. = Би шинэ хүн. Эрэгтэй хүн өөрийн тухай хэлэхэд хэрэглэнэ.',
      a0c0183:'Jsem nová. = Би шинэ хүн. Эмэгтэй хүн өөрийн тухай хэлэхэд хэрэглэнэ.',
    },
    exercises:[
      { id:'a0-15-a-1', type:'choice', titleMn:'Эхний долоо хоног', promptMn:'první týden ямар утгатай вэ?', choices:[{id:'a',text:'эхний долоо хоног'},{id:'b',text:'гэр бүл'},{id:'c',text:'цаг агаар'}], correctId:'a', feedbackMn:'první týden = эхний долоо хоног.' },
      { id:'a0-15-a-2', type:'choice', titleMn:'Эрэгтэй хэлбэр', promptMn:'Эрэгтэй хүн “би шинэ хүн” гэж хэлэх бол аль нь зөв вэ?', choices:[{id:'a',text:'Jsem nový.'},{id:'b',text:'Jsem nová.'},{id:'c',text:'Jsem tady sama.'}], correctId:'a', feedbackMn:'Эрэгтэй хүн өөрийн тухай Jsem nový. гэж хэлнэ.' },
      { id:'a0-15-a-3', type:'choice', titleMn:'Эмэгтэй хэлбэр', promptMn:'Эмэгтэй хүн “би шинэ хүн” гэж хэлэх бол аль нь зөв вэ?', choices:[{id:'a',text:'Jsem nová.'},{id:'b',text:'Jsem nový.'},{id:'c',text:'Jsem tady sám.'}], correctId:'a', feedbackMn:'Эмэгтэй хүн өөрийн тухай Jsem nová. гэж хэлнэ.' },
    ],
  },
  {
    id:'a0-15-b', titleMn:'2/3 — Би чех хэл сурч байна', canDoMn:'Чех хэл сурч байгаагаа, бага зэрэг ярьдгаа хэлж чадна.',
    cardIds:['a0c0184','a0c0185'],
    instructions:{
      a0c0184:'Učím se česky. = Би чех хэл сурч байна. Ойлгоход хэцүү үед өөрийгөө тайлбарлаж болно.',
      a0c0185:'Mluvím trochu česky. = Би бага зэрэг чехээр ярьдаг. Өөрийн түвшинг үнэнээр хэлэхэд хэрэгтэй.',
    },
    exercises:[
      { id:'a0-15-b-1', type:'choice', titleMn:'Сурч байна', promptMn:'Učím se česky. ямар утгатай вэ?', choices:[{id:'a',text:'Би чех хэл сурч байна.'},{id:'b',text:'Би бага зэрэг чехээр ярьдаг.'},{id:'c',text:'Би шинэ хүн.'}], correctId:'a', feedbackMn:'Učím se česky. = Би чех хэл сурч байна.' },
      { id:'a0-15-b-2', type:'choice', titleMn:'Бага зэрэг ярьдаг', promptMn:'Та бага зэрэг чехээр ярьдгаа хэлэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Mluvím trochu česky.'},{id:'b',text:'Učím se česky.'},{id:'c',text:'Mluvte prosím pomalu.'}], correctId:'a', feedbackMn:'Mluvím trochu česky. = Би бага зэрэг чехээр ярьдаг.' },
      { id:'a0-15-b-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би чех хэл сурч байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['česky.','se','Učím'], expectedText:'Učím se česky.', feedbackMn:'Učím se česky. = Би чех хэл сурч байна.' },
    ],
  },
  {
    id:'a0-15-c', titleMn:'3/3 — Надад туслаарай', canDoMn:'Эелдгээр тусламж хүсэж чадна.',
    cardIds:['a0c0186'],
    instructions:{
      a0c0186:'Prosím, pomozte mi. = Надад туслаарай. Эелдэг, шууд тусламж хүсэх хэллэг.',
    },
    exercises:[
      { id:'a0-15-c-1', type:'choice', titleMn:'Тусламж хүсэх', promptMn:'Prosím, pomozte mi. ямар утгатай вэ?', choices:[{id:'a',text:'Надад туслаарай.'},{id:'b',text:'Цагдаа дуудаж өгнө үү.'},{id:'c',text:'Дахиад нэг удаа хэлнэ үү.'}], correctId:'a', feedbackMn:'Prosím, pomozte mi. = Надад туслаарай.' },
      { id:'a0-15-c-2', type:'choice', titleMn:'Эелдэг хүсэлт', promptMn:'Та эелдгээр тусламж хүсэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Prosím, pomozte mi.'},{id:'b',text:'Pomoc!'},{id:'c',text:'Prší.'}], correctId:'a', feedbackMn:'Эелдгээр тусламж хүсэхдээ Prosím, pomozte mi. гэж хэлнэ.' },
      { id:'a0-15-c-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Надад туслаарай” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['mi.','pomozte','Prosím,'], expectedText:'Prosím, pomozte mi.', feedbackMn:'Prosím, pomozte mi. = Надад туслаарай.' },
    ],
  },
];

export function getA0FirstWeekCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.15 карт олдсонгүй: ${id}`);
  return card;
}
