import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0HomeWords } from './a0HomeWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0HomeWords.map((card) => [card.id, card]));

export const a0HomeCards: CzechWord[] = a0HomeWords;

export const a0HomeMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-9-a', titleMn:'1/4 — Өрөө, байр, түлхүүр', canDoMn:'Өрөө, байр, түлхүүрийн тухай богино хэлж чадна.',
    cardIds:['a0c0125','a0c0126','a0c0127','a0c0128'],
    instructions:{
      a0c0125:'pokoj = өрөө. Байр, дотуур байр, зочид буудалд хэрэгтэй үг.',
      a0c0126:'byt = байр. Түрээсийн байр эсвэл амьдрах байр гэсэн утгаар хэрэглэнэ.',
      a0c0127:'klíč = түлхүүр. Орох, гарах, өрөө нээх үед хэрэгтэй үг.',
      a0c0128:'Mám klíč. = Надад түлхүүр байна. Түлхүүртэйгээ хэлэх үед ингэж хэлнэ.',
    },
    exercises:[
      { id:'a0-9-a-1', type:'choice', titleMn:'Үг таних', promptMn:'klíč ямар утгатай вэ?', choices:[{id:'a',text:'түлхүүр'},{id:'b',text:'өрөө'},{id:'c',text:'эм'}], correctId:'a', feedbackMn:'klíč = түлхүүр.' },
      { id:'a0-9-a-2', type:'choice', titleMn:'Түлхүүртэйгээ хэлэх', promptMn:'Та түлхүүртэй байна. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Mám klíč.'},{id:'b',text:'Nemám klíč.'},{id:'c',text:'Je zima.'}], correctId:'a', feedbackMn:'Mám klíč. = Надад түлхүүр байна.' },
      { id:'a0-9-a-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Надад түлхүүр байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['klíč.','Mám'], expectedText:'Mám klíč.', feedbackMn:'Mám klíč. = Надад түлхүүр байна.' },
    ],
  },
  {
    id:'a0-9-b', titleMn:'2/4 — Асуудал байна', canDoMn:'Байр эсвэл өрөөнд асуудал байгааг хэлж чадна.',
    cardIds:['a0c0129','a0c0130'],
    instructions:{
      a0c0129:'Nemám klíč. = Надад түлхүүр байхгүй. Түлхүүргүй болсон үед ингэж хэлнэ.',
      a0c0130:'Je problém. = Асуудал байна. Яриаг богино эхлүүлэхэд хэрэгтэй өгүүлбэр.',
    },
    exercises:[
      { id:'a0-9-b-1', type:'choice', titleMn:'Асуудал хэлэх', promptMn:'Je problém. ямар утгатай вэ?', choices:[{id:'a',text:'Асуудал байна.'},{id:'b',text:'Би завтай.'},{id:'c',text:'Энэ хэд вэ?'}], correctId:'a', feedbackMn:'Je problém. = Асуудал байна.' },
      { id:'a0-9-b-2', type:'choice', titleMn:'Түлхүүр байхгүй', promptMn:'Та түлхүүргүй байна. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Nemám klíč.'},{id:'b',text:'Mám klíč.'},{id:'c',text:'Slyším vás.'}], correctId:'a', feedbackMn:'Nemám klíč. = Надад түлхүүр байхгүй.' },
      { id:'a0-9-b-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Асуудал байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['problém.','Je'], expectedText:'Je problém.', feedbackMn:'Je problém. = Асуудал байна.' },
    ],
  },
  {
    id:'a0-9-c', titleMn:'3/4 — Ус гарахгүй байна', canDoMn:'Өрөө, байранд ус гарахгүй байгааг хэлж чадна.',
    cardIds:['a0c0131'],
    instructions:{
      a0c0131:'Neteče voda. = Ус гарахгүй байна. Усны асуудал гарсан үед ингэж хэлнэ. “Ус” гэдэг үг энд voda гэж сонсогдоно.',
    },
    exercises:[
      { id:'a0-9-c-1', type:'choice', titleMn:'Утга таних', promptMn:'Neteče voda. ямар утгатай вэ?', choices:[{id:'a',text:'Ус гарахгүй байна.'},{id:'b',text:'Хүйтэн байна.'},{id:'c',text:'Картаар төлнө.'}], correctId:'a', feedbackMn:'Neteče voda. = Ус гарахгүй байна.' },
      { id:'a0-9-c-2', type:'choice', titleMn:'Усны асуудал', promptMn:'Ус гарахгүй байвал аль өгүүлбэрийг хэлэх вэ?', choices:[{id:'a',text:'Neteče voda.'},{id:'b',text:'Mám teplotu.'},{id:'c',text:'Tohle, prosím.'}], correctId:'a', feedbackMn:'Усны асуудал бол Neteče voda. гэж хэлнэ.' },
      { id:'a0-9-c-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Ус гарахгүй байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['voda.','Neteče'], expectedText:'Neteče voda.', feedbackMn:'Neteče voda. = Ус гарахгүй байна.' },
    ],
  },
  {
    id:'a0-9-d', titleMn:'4/4 — Хүйтэн байна', canDoMn:'Өрөө, байранд хүйтэн байгааг богино хэлж чадна.',
    cardIds:['a0c0132'],
    instructions:{
      a0c0132:'Je zima. = Хүйтэн байна. Өрөө, байр хүйтэн байвал ингэж хэлж болно.',
    },
    exercises:[
      { id:'a0-9-d-1', type:'choice', titleMn:'Утга таних', promptMn:'Je zima. ямар утгатай вэ?', choices:[{id:'a',text:'Хүйтэн байна.'},{id:'b',text:'Асуудал хаана байна?'},{id:'c',text:'Баримт өгнө үү.'}], correctId:'a', feedbackMn:'Je zima. = Хүйтэн байна.' },
      { id:'a0-9-d-2', type:'choice', titleMn:'Хүйтэн байгааг хэлэх', promptMn:'Өрөө хүйтэн байна. Аль өгүүлбэр зөв вэ?', choices:[{id:'a',text:'Je zima.'},{id:'b',text:'Je hotovo?'},{id:'c',text:'Děkuji.'}], correctId:'a', feedbackMn:'Je zima. = Хүйтэн байна.' },
      { id:'a0-9-d-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Хүйтэн байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['zima.','Je'], expectedText:'Je zima.', feedbackMn:'Je zima. = Хүйтэн байна.' },
    ],
  },
];

export function getA0HomeCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.9 карт олдсонгүй: ${id}`);
  return card;
}
