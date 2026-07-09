import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0WeatherWords } from './a0WeatherWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0WeatherWords.map((card) => [card.id, card]));

export const a0WeatherCards: CzechWord[] = a0WeatherWords;

export const a0WeatherMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-13-a', titleMn:'1/4 — Өнөөдрийн цаг агаар', canDoMn:'Өнөөдөр хүйтэн эсвэл дулаахан байгааг хэлж чадна.',
    cardIds:['a0c0160','a0c0161','a0c0162'],
    instructions:{
      a0c0160:'počasí = цаг агаар. Өдөр тутмын ярианд хэрэгтэй сэдэв.',
      a0c0161:'Dnes je zima. = Өнөөдөр хүйтэн байна. Гадаа, өрөө, орчин хүйтэн үед хэлнэ.',
      a0c0162:'Dnes je teplo. = Өнөөдөр дулаахан байна. Орчин дулаан үед хэлнэ.',
    },
    exercises:[
      { id:'a0-13-a-1', type:'choice', titleMn:'Үг таних', promptMn:'počasí ямар утгатай вэ?', choices:[{id:'a',text:'цаг агаар'},{id:'b',text:'гэр бүл'},{id:'c',text:'түлхүүр'}], correctId:'a', feedbackMn:'počasí = цаг агаар.' },
      { id:'a0-13-a-2', type:'choice', titleMn:'Хүйтэн өдөр', promptMn:'Dnes je zima. ямар утгатай вэ?', choices:[{id:'a',text:'Өнөөдөр хүйтэн байна.'},{id:'b',text:'Өнөөдөр дулаахан байна.'},{id:'c',text:'Би даарч байна.'}], correctId:'a', feedbackMn:'Dnes je zima. = Өнөөдөр хүйтэн байна.' },
      { id:'a0-13-a-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Өнөөдөр дулаахан байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['teplo.','je','Dnes'], expectedText:'Dnes je teplo.', feedbackMn:'Dnes je teplo. = Өнөөдөр дулаахан байна.' },
    ],
  },
  {
    id:'a0-13-b', titleMn:'2/4 — Бороо, цас', canDoMn:'Бороо эсвэл цас орж байгааг хэлж чадна.',
    cardIds:['a0c0163','a0c0164'],
    instructions:{
      a0c0163:'Prší. = Бороо орж байна. Маш богино, амьдралд шууд хэрэгтэй өгүүлбэр.',
      a0c0164:'Sněží. = Цас орж байна. Өвөл, цаг агаарын ярианд хэрэгтэй.',
    },
    exercises:[
      { id:'a0-13-b-1', type:'choice', titleMn:'Бороо', promptMn:'Prší. ямар утгатай вэ?', choices:[{id:'a',text:'Бороо орж байна.'},{id:'b',text:'Цас орж байна.'},{id:'c',text:'Би даарч байна.'}], correctId:'a', feedbackMn:'Prší. = Бороо орж байна.' },
      { id:'a0-13-b-2', type:'choice', titleMn:'Цас', promptMn:'Цас орж байна. Аль нь зөв вэ?', choices:[{id:'a',text:'Sněží.'},{id:'b',text:'Prší.'},{id:'c',text:'Pomoc!'}], correctId:'a', feedbackMn:'Sněží. = Цас орж байна.' },
      { id:'a0-13-b-3', type:'order', titleMn:'Үг бүтээх', promptMn:'“Бороо орж байна” гэсэн өгүүлбэрийг сонго.', tokens:['Prší.','Sněží.'], expectedText:'Prší.', feedbackMn:'Prší. = Бороо орж байна.' },
    ],
  },
  {
    id:'a0-13-c', titleMn:'3/4 — Би даарч байна', canDoMn:'Орчин хүйтэн болон өөрөө даарч байгаагаа ялгаж чадна.',
    cardIds:['a0c0165','a0c0166'],
    instructions:{
      a0c0165:'Je mi zima. = Би даарч байна. Хүйтэн мэдрэгдэж байгаагаа хэлнэ.',
      a0c0166:'Je mi teplo. = Би дулаахан байна. Өөрт дулаан мэдрэгдэж байгаагаа хэлнэ.',
    },
    exercises:[
      { id:'a0-13-c-1', type:'choice', titleMn:'Даарч байна', promptMn:'Je mi zima. ямар утгатай вэ?', choices:[{id:'a',text:'Би даарч байна.'},{id:'b',text:'Өнөөдөр хүйтэн байна.'},{id:'c',text:'Би шинэ хүн.'}], correctId:'a', feedbackMn:'Je mi zima. = Би даарч байна.' },
      { id:'a0-13-c-2', type:'choice', titleMn:'Орчин ба өөрийн мэдрэмж', promptMn:'“Өнөөдөр хүйтэн байна” гэсэн өгүүлбэр аль вэ?', choices:[{id:'a',text:'Dnes je zima.'},{id:'b',text:'Je mi zima.'},{id:'c',text:'Je mi teplo.'}], correctId:'a', feedbackMn:'Dnes je zima. нь орчны тухай. Je mi zima. нь өөрийн мэдрэмж.' },
      { id:'a0-13-c-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би даарч байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['zima.','mi','Je'], expectedText:'Je mi zima.', feedbackMn:'Je mi zima. = Би даарч байна.' },
    ],
  },
  {
    id:'a0-13-d', titleMn:'4/4 — Хүрэм, малгай хэрэгтэй', canDoMn:'Хүрэм эсвэл малгай хэрэгтэйгээ хэлж чадна.',
    cardIds:['a0c0167','a0c0168','a0c0169','a0c0170'],
    instructions:{
      a0c0167:'bunda = хүрэм. Хүйтэн, бороо, гадаа гарахад хэрэгтэй үг.',
      a0c0168:'čepice = малгай. Хүйтэн үед хэрэгтэй үг.',
      a0c0169:'Potřebuji bundu. = Надад хүрэм хэрэгтэй.',
      a0c0170:'Potřebuji čepici. = Надад малгай хэрэгтэй.',
    },
    exercises:[
      { id:'a0-13-d-1', type:'choice', titleMn:'Хүрэм', promptMn:'bunda ямар утгатай вэ?', choices:[{id:'a',text:'хүрэм'},{id:'b',text:'малгай'},{id:'c',text:'эм'}], correctId:'a', feedbackMn:'bunda = хүрэм.' },
      { id:'a0-13-d-2', type:'choice', titleMn:'Малгай хэрэгтэй', promptMn:'Танд малгай хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Potřebuji čepici.'},{id:'b',text:'Potřebuji bundu.'},{id:'c',text:'Mám děti.'}], correctId:'a', feedbackMn:'Potřebuji čepici. = Надад малгай хэрэгтэй.' },
      { id:'a0-13-d-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Надад хүрэм хэрэгтэй” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['bundu.','Potřebuji'], expectedText:'Potřebuji bundu.', feedbackMn:'Potřebuji bundu. = Надад хүрэм хэрэгтэй.' },
    ],
  },
];

export function getA0WeatherCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.13 карт олдсонгүй: ${id}`);
  return card;
}
