import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0ShopWords } from './a0ShopWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0ShopWords.map((card) => [card.id, card]));

export const a0ShopCards: CzechWord[] = a0ShopWords;

export const a0ShopMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-8-a', titleMn:'1/4 — Уут хүсэх', canDoMn:'Дэлгүүрт уут хэрэгтэйгээ эелдгээр хэлж чадна.',
    cardIds:['a0c0119','a0c0120'],
    instructions:{
      a0c0119:'taška = уут. Дэлгүүрт кассан дээр их хэрэг болно.',
      a0c0120:'Tašku, prosím. = Уут өгнө үү. Уут хэрэгтэй үед ингэж богино, эелдгээр хэлнэ.',
    },
    exercises:[
      { id:'a0-8-a-1', type:'choice', titleMn:'Утга таних', promptMn:'Tašku, prosím. ямар утгатай вэ?', choices:[{id:'a',text:'Уут өгнө үү.'},{id:'b',text:'Баримт өгнө үү.'},{id:'c',text:'Энэ хэд вэ?'}], correctId:'a', feedbackMn:'Tašku, prosím. = Уут өгнө үү.' },
      { id:'a0-8-a-2', type:'choice', titleMn:'Уут авах', promptMn:'Ажилтан “Chcete tašku?” гэж асуувал та уут авах гэж байна. Аль хариулт зөв вэ?', choices:[{id:'a',text:'Ano, tašku, prosím.'},{id:'b',text:'Ne, děkuji.'},{id:'c',text:'To je drahé.'}], correctId:'a', feedbackMn:'Уут авах бол Ano, tašku, prosím. гэж хариулна.' },
      { id:'a0-8-a-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Уут өгнө үү” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['prosím.','Tašku,'], expectedText:'Tašku, prosím.', feedbackMn:'Tašku, prosím. = Уут өгнө үү.' },
    ],
  },
  {
    id:'a0-8-b', titleMn:'2/4 — Баримт хүсэх', canDoMn:'Худалдан авалтын баримт хүсэж чадна.',
    cardIds:['a0c0121','a0c0122'],
    instructions:{
      a0c0121:'účtenka = баримт. Дэлгүүр, кафе, эмийн сан дээр хэрэгтэй үг.',
      a0c0122:'Účtenku, prosím. = Баримт өгнө үү. Баримт хэрэгтэй үед ингэж хэлнэ.',
    },
    exercises:[
      { id:'a0-8-b-1', type:'choice', titleMn:'Утга таних', promptMn:'Účtenku, prosím. ямар утгатай вэ?', choices:[{id:'a',text:'Баримт өгнө үү.'},{id:'b',text:'Уут өгнө үү.'},{id:'c',text:'Үүнийг авъя.'}], correctId:'a', feedbackMn:'Účtenku, prosím. = Баримт өгнө үү.' },
      { id:'a0-8-b-2', type:'choice', titleMn:'Баримт авах', promptMn:'Ажилтан “Chcete účtenku?” гэж асуувал та баримт авах гэж байна. Аль хариулт зөв вэ?', choices:[{id:'a',text:'Ano, účtenku, prosím.'},{id:'b',text:'Ne, nemám čas.'},{id:'c',text:'Dám si kávu.'}], correctId:'a', feedbackMn:'Баримт авах бол Ano, účtenku, prosím. гэж хариулна.' },
      { id:'a0-8-b-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Баримт өгнө үү” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['prosím.','Účtenku,'], expectedText:'Účtenku, prosím.', feedbackMn:'Účtenku, prosím. = Баримт өгнө үү.' },
    ],
  },
  {
    id:'a0-8-c', titleMn:'3/4 — Үүнийг авъя', canDoMn:'Барааг заагаад эелдгээр авах хүсэлт хэлж чадна.',
    cardIds:['a0c0123'],
    instructions:{
      a0c0123:'Tohle, prosím. = Үүнийг авъя. Бараа зааж авахдаа ингэж богино, эелдгээр хэлнэ.',
    },
    exercises:[
      { id:'a0-8-c-1', type:'choice', titleMn:'Утга таних', promptMn:'Tohle, prosím. ямар утгатай вэ?', choices:[{id:'a',text:'Үүнийг авъя.'},{id:'b',text:'Би завгүй.'},{id:'c',text:'Авч явна, гуйя.'}], correctId:'a', feedbackMn:'Tohle, prosím. = Үүнийг авъя.' },
      { id:'a0-8-c-2', type:'choice', titleMn:'Бараа заах', promptMn:'Та бараа заагаад “үүнийг авъя” гэж хэлэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Tohle, prosím.'},{id:'b',text:'Kdy máte čas?'},{id:'c',text:'Je hotovo?'}], correctId:'a', feedbackMn:'Бараа зааж авахдаа Tohle, prosím. гэж хэлнэ.' },
      { id:'a0-8-c-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Үүнийг авъя” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['prosím.','Tohle,'], expectedText:'Tohle, prosím.', feedbackMn:'Tohle, prosím. = Үүнийг авъя.' },
    ],
  },
  {
    id:'a0-8-d', titleMn:'4/4 — Үнэтэй байна', canDoMn:'Үнэ өндөр санагдаж байгааг богино хэлж чадна.',
    cardIds:['a0c0124'],
    instructions:{
      a0c0124:'To je drahé. = Энэ үнэтэй байна. Үнэ таалагдахгүй үед ингэж хэлж болно.',
    },
    exercises:[
      { id:'a0-8-d-1', type:'choice', titleMn:'Утга таних', promptMn:'To je drahé. ямар утгатай вэ?', choices:[{id:'a',text:'Энэ үнэтэй байна.'},{id:'b',text:'Энэ хаана байна?'},{id:'c',text:'Би картаар төлнө.'}], correctId:'a', feedbackMn:'To je drahé. = Энэ үнэтэй байна.' },
      { id:'a0-8-d-2', type:'choice', titleMn:'Үнэ өндөр байна', promptMn:'Үнэ өндөр санагдвал аль өгүүлбэрийг хэлэх вэ?', choices:[{id:'a',text:'To je drahé.'},{id:'b',text:'Menu, prosím.'},{id:'c',text:'Pracuji tady.'}], correctId:'a', feedbackMn:'Үнэ өндөр санагдвал To je drahé. гэж хэлж болно.' },
      { id:'a0-8-d-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Энэ үнэтэй байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['drahé.','je','To'], expectedText:'To je drahé.', feedbackMn:'To je drahé. = Энэ үнэтэй байна.' },
    ],
  },
];

export function getA0ShopCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.8 карт олдсонгүй: ${id}`);
  return card;
}
