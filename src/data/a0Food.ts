import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0FoodWords } from './a0FoodWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0FoodWords.map((card) => [card.id, card]));

export const a0FoodCards: CzechWord[] = a0FoodWords;

export const a0FoodMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-7-a', titleMn:'1/4 — Цэс хүсэх', canDoMn:'Кафед мэндлээд цэсийг эелдгээр хүсэж чадна.',
    cardIds:['a0c0105','a0c0106','a0c0117'],
    instructions:{
      a0c0105:'menu = цэс. Богино, олон кафед ойлгогдох хэлбэр.',
      a0c0106:'Menu, prosím. = Цэс өгнө үү. Урт formal хэллэгийн оронд A0-д шууд хэрэглэх богино хүсэлт.',
      a0c0117:'Co si dáte? = Та юу авах вэ? Энэ нь staff-ийн асуулт, эхлээд сонсож ойлгоно.',
    },
    exercises:[
      { id:'a0-7-a-1', type:'choice', titleMn:'Сонсож таних', promptMn:'Menu, prosím. ямар утгатай вэ?', choices:[{id:'a',text:'Цэс өгнө үү.'},{id:'b',text:'Би кофе авъя.'},{id:'c',text:'Баяртай.'}], correctId:'a', feedbackMn:'Menu, prosím. = Цэс өгнө үү.' },
      { id:'a0-7-a-2', type:'choice', titleMn:'Staff-ийн асуулт', promptMn:'Co si dáte? гэж сонсвол staff танаас юу асууж байна вэ?', choices:[{id:'a',text:'Та юу авах вэ?'},{id:'b',text:'Та хаашаа явах вэ?'},{id:'c',text:'Та хэзээ завтай вэ?'}], correctId:'a', feedbackMn:'Co si dáte? = Та юу авах вэ?' },
      { id:'a0-7-a-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Цэс өгнө үү” гэсэн богино хүсэлтийг зөв дарааллаар байрлуул.', tokens:['prosím.','Menu,'], expectedText:'Menu, prosím.', feedbackMn:'Menu, prosím. нь кафед хэрэглэх богино, аюулгүй хүсэлт.' },
    ],
  },
  {
    id:'a0-7-b', titleMn:'2/4 — Би кофе, цай, шөл авъя', canDoMn:'Dám si ... загвараар хоол/ундаа захиалж чадна.',
    cardIds:['a0c0107','a0c0108','a0c0109','a0c0110'],
    instructions:{
      a0c0107:'Dám si … = Би … авъя. Захиалга өгөх үндсэн chunk.',
      a0c0108:'Dám si kávu. = Би кофе авъя.',
      a0c0109:'Dám si čaj. = Би цай авъя.',
      a0c0110:'Dám si polévku. = Би шөл авъя. polévka үг нь өгүүлбэрт polévku гэж сонсогдоно.',
    },
    exercises:[
      { id:'a0-7-b-1', type:'choice', titleMn:'Утга таних', promptMn:'Dám si kávu. ямар утгатай вэ?', choices:[{id:'a',text:'Би кофе авъя.'},{id:'b',text:'Би цай авъя.'},{id:'c',text:'Би шөл авъя.'}], correctId:'a', feedbackMn:'Dám si kávu. = Би кофе авъя.' },
      { id:'a0-7-b-2', type:'choice', titleMn:'Захиалга сонгох', promptMn:'Та шөл авах гэж байна. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Dám si čaj.'},{id:'b',text:'Dám si polévku.'},{id:'c',text:'Menu, prosím.'}], correctId:'b', feedbackMn:'Dám si polévku. = Би шөл авъя.' },
      { id:'a0-7-b-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би цай авъя” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['čaj.','si','Dám'], expectedText:'Dám si čaj.', feedbackMn:'Dám si čaj. = Би цай авъя.' },
      { id:'a0-7-b-4-match', type:'match', titleMn:'Захиалга тааруулах', promptMn:'Захиалгын хэллэгүүдийг зөв Монгол утгатай нь холбо.', pairs:[{id:'coffee',czech:'Dám si kávu.',mongolian:'Би кофе авъя.'},{id:'tea',czech:'Dám si čaj.',mongolian:'Би цай авъя.'},{id:'soup',czech:'Dám si polévku.',mongolian:'Би шөл авъя.'}], feedbackMn:'Dám si ... загварын гурван захиалгыг зөв ялгалаа.' },
    ],
  },
  {
    id:'a0-7-c', titleMn:'3/4 — Энд үү, авч явах уу?', canDoMn:'Staff-ийн “энд үү, авч явах уу?” асуултыг ойлгож, авч явахаа хэлж чадна.',
    cardIds:['a0c0111','a0c0112','a0c0113'],
    instructions:{
      a0c0111:'s sebou = авч явах. Кафе, түргэн хоол, талх нарийн боов дээр их сонсогдоно.',
      a0c0112:'S sebou, prosím. = Авч явъя, гуйя.',
      a0c0113:'Tady, nebo s sebou? = Энд хэрэглэх үү, авч явах уу? Staff-ийн асуулт.',
    },
    exercises:[
      { id:'a0-7-c-1', type:'choice', titleMn:'Staff-ийн асуулт ойлгох', promptMn:'Tady, nebo s sebou? ямар утгатай вэ?', choices:[{id:'a',text:'Энд хэрэглэх үү, авч явах уу?'},{id:'b',text:'Картаар төлөх үү?'},{id:'c',text:'Та юу авах вэ?'}], correctId:'a', feedbackMn:'Tady, nebo s sebou? = Энд хэрэглэх үү, авч явах уу?' },
      { id:'a0-7-c-2', type:'choice', titleMn:'Авч явах', promptMn:'Та авч явах гэж байна. Аль хариулт зөв вэ?', choices:[{id:'a',text:'S sebou, prosím.'},{id:'b',text:'Dám si kávu.'},{id:'c',text:'Kolik to stojí?'}], correctId:'a', feedbackMn:'S sebou, prosím. = Авч явъя, гуйя.' },
      { id:'a0-7-c-3', type:'order', titleMn:'Хариулт бүтээх', promptMn:'“Авч явъя, гуйя” гэсэн хариултыг зөв дарааллаар байрлуул.', tokens:['prosím.','sebou,','S'], expectedText:'S sebou, prosím.', feedbackMn:'S sebou, prosím. гэж богино, эелдгээр хариулна.' },
    ],
  },
  {
    id:'a0-7-d', titleMn:'4/4 — Үнэ ба төлбөр', canDoMn:'Үнэ асууж, картаар эсвэл бэлнээр төлөхөө хэлж чадна.',
    cardIds:['a0c0114','a0c0115','a0c0116','a0c0118'],
    instructions:{
      a0c0114:'Kolik to stojí? = Энэ хэд вэ? Үнэ асуух хамгийн хэрэгтэй богино асуулт.',
      a0c0115:'Platím kartou. = Би картаар төлнө.',
      a0c0116:'Platím hotově. = Би бэлнээр төлнө.',
      a0c0118:'Platíte kartou? = Та картаар төлөх үү? Staff-ийн асуулт.',
    },
    exercises:[
      { id:'a0-7-d-1', type:'choice', titleMn:'Үнэ асуух', promptMn:'Та үнэ асуух хэрэгтэй. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Kolik to stojí?'},{id:'b',text:'Co si dáte?'},{id:'c',text:'S sebou, prosím.'}], correctId:'a', feedbackMn:'Kolik to stojí? = Энэ хэд вэ?' },
      { id:'a0-7-d-2', type:'choice', titleMn:'Картаар төлөх', promptMn:'Та картаар төлөхөө хэлэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Platím hotově.'},{id:'b',text:'Platím kartou.'},{id:'c',text:'Nemám kartu.'}], correctId:'b', feedbackMn:'Platím kartou. = Би картаар төлнө.' },
      { id:'a0-7-d-3', type:'choice', titleMn:'Бэлнээр төлөх', promptMn:'Та бэлнээр төлөхөө хэлэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Platím hotově.'},{id:'b',text:'Platíte kartou?'},{id:'c',text:'Dám si kávu.'}], correctId:'a', feedbackMn:'Platím hotově. = Би бэлнээр төлнө.' },
      { id:'a0-7-d-4', type:'order', titleMn:'Үнэ асуух асуулт', promptMn:'“Энэ хэд вэ?” гэсэн асуултыг зөв дарааллаар байрлуул.', tokens:['to','stojí?','Kolik'], expectedText:'Kolik to stojí?', feedbackMn:'Kolik to stojí? = Энэ хэд вэ?' },
    ],
  },
];

export function getA0FoodCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.7 карт олдсонгүй: ${id}`);
  return card;
}
