import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0HealthWords } from './a0HealthWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0HealthWords.map((card) => [card.id, card]));

export const a0HealthCards: CzechWord[] = a0HealthWords;

export const a0HealthMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-10-a', titleMn:'1/4 — Миний ... өвдөж байна', canDoMn:'Өвдөж байгаа хэсгээ богино хэлж чадна.',
    cardIds:['a0c0133','a0c0134','a0c0135'],
    instructions:{
      a0c0133:'Bolí mě ... = Миний ... өвдөж байна. Өвдөж байгаа хэсгээ хэлэх үндсэн хэлбэр.',
      a0c0134:'Bolí mě hlava. = Миний толгой өвдөж байна.',
      a0c0135:'Bolí mě břicho. = Миний гэдэс өвдөж байна.',
    },
    exercises:[
      { id:'a0-10-a-1', type:'choice', titleMn:'Утга таних', promptMn:'Bolí mě hlava. ямар утгатай вэ?', choices:[{id:'a',text:'Миний толгой өвдөж байна.'},{id:'b',text:'Миний гэдэс өвдөж байна.'},{id:'c',text:'Би халуурч байна.'}], correctId:'a', feedbackMn:'Bolí mě hlava. = Миний толгой өвдөж байна.' },
      { id:'a0-10-a-2', type:'choice', titleMn:'Гэдэс өвдөх', promptMn:'Таны гэдэс өвдөж байна. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Bolí mě břicho.'},{id:'b',text:'Bolí mě hlava.'},{id:'c',text:'Je problém.'}], correctId:'a', feedbackMn:'Bolí mě břicho. = Миний гэдэс өвдөж байна.' },
      { id:'a0-10-a-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Миний толгой өвдөж байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['hlava.','mě','Bolí'], expectedText:'Bolí mě hlava.', feedbackMn:'Bolí mě hlava. = Миний толгой өвдөж байна.' },
    ],
  },
  {
    id:'a0-10-b', titleMn:'2/4 — Хоолой өвдөх, халуурах', canDoMn:'Хоолой өвдөж эсвэл халуурч байгаагаа хэлж чадна.',
    cardIds:['a0c0136','a0c0137'],
    instructions:{
      a0c0136:'Bolí mě v krku. = Миний хоолой өвдөж байна.',
      a0c0137:'Mám teplotu. = Би халуурч байна. Эмийн сан, эмчид хэрэгтэй богино өгүүлбэр.',
    },
    exercises:[
      { id:'a0-10-b-1', type:'choice', titleMn:'Хоолой өвдөх', promptMn:'Bolí mě v krku. ямар утгатай вэ?', choices:[{id:'a',text:'Миний хоолой өвдөж байна.'},{id:'b',text:'Би халуурч байна.'},{id:'c',text:'Надад түлхүүр байна.'}], correctId:'a', feedbackMn:'Bolí mě v krku. = Миний хоолой өвдөж байна.' },
      { id:'a0-10-b-2', type:'choice', titleMn:'Халуурах', promptMn:'Та халуурч байна. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Mám teplotu.'},{id:'b',text:'Mám klíč.'},{id:'c',text:'Mám směnu.'}], correctId:'a', feedbackMn:'Mám teplotu. = Би халуурч байна.' },
      { id:'a0-10-b-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би халуурч байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['teplotu.','Mám'], expectedText:'Mám teplotu.', feedbackMn:'Mám teplotu. = Би халуурч байна.' },
    ],
  },
  {
    id:'a0-10-c', titleMn:'3/4 — Эм, өвчин намдаах зүйл', canDoMn:'Эмийн санд эм болон өвчин намдаах зүйл асууж чадна.',
    cardIds:['a0c0138','a0c0139'],
    instructions:{
      a0c0138:'lék = эм. Эмийн санд зайлшгүй хэрэгтэй суурь үг.',
      a0c0139:'Máte něco na bolest? = Өвчин намдаах юм байна уу? Эмийн санд өвдөлтөд хэрэглэх зүйл асуухдаа ингэж хэлнэ.',
    },
    exercises:[
      { id:'a0-10-c-1', type:'choice', titleMn:'Үг таних', promptMn:'lék ямар утгатай вэ?', choices:[{id:'a',text:'эм'},{id:'b',text:'түлхүүр'},{id:'c',text:'баримт'}], correctId:'a', feedbackMn:'lék = эм.' },
      { id:'a0-10-c-2', type:'choice', titleMn:'Өвчин намдаах зүйл асуух', promptMn:'Өвчин намдаах юм асуух хэрэгтэй. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Máte něco na bolest?'},{id:'b',text:'Tašku, prosím.'},{id:'c',text:'Slyším vás.'}], correctId:'a', feedbackMn:'Máte něco na bolest? = Өвчин намдаах юм байна уу?' },
      { id:'a0-10-c-3', type:'order', titleMn:'Асуулт бүтээх', promptMn:'“Өвчин намдаах юм байна уу?” гэсэн асуултыг зөв дарааллаар байрлуул.', tokens:['na','bolest?','něco','Máte'], expectedText:'Máte něco na bolest?', feedbackMn:'Máte něco na bolest? = Өвчин намдаах юм байна уу?' },
    ],
  },
  {
    id:'a0-10-d', titleMn:'4/4 — Яаж уух вэ?', canDoMn:'Эмийн хэрэглэх зааврыг яаж авахыг асууж чадна.',
    cardIds:['a0c0140'],
    instructions:{
      a0c0140:'Jak to mám brát? = Үүнийг яаж уух вэ? Эм авахдаа хэрэглэх зааврыг асуух богино асуулт.',
    },
    exercises:[
      { id:'a0-10-d-1', type:'choice', titleMn:'Заавар асуух', promptMn:'Jak to mám brát? ямар утгатай вэ?', choices:[{id:'a',text:'Үүнийг яаж уух вэ?'},{id:'b',text:'Энэ хэд вэ?'},{id:'c',text:'Ус гарахгүй байна.'}], correctId:'a', feedbackMn:'Jak to mám brát? = Үүнийг яаж уух вэ?' },
      { id:'a0-10-d-2', type:'choice', titleMn:'Эм уух заавар', promptMn:'Эмийг яаж хэрэглэхийг асуух хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Jak to mám brát?'},{id:'b',text:'Kdy končíme?'},{id:'c',text:'Je zima.'}], correctId:'a', feedbackMn:'Заавар асуухдаа Jak to mám brát? гэж хэлнэ.' },
      { id:'a0-10-d-3', type:'order', titleMn:'Асуулт бүтээх', promptMn:'“Үүнийг яаж уух вэ?” гэсэн асуултыг зөв дарааллаар байрлуул.', tokens:['brát?','mám','to','Jak'], expectedText:'Jak to mám brát?', feedbackMn:'Jak to mám brát? = Үүнийг яаж уух вэ?' },
    ],
  },
];

export function getA0HealthCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.10 карт олдсонгүй: ${id}`);
  return card;
}
