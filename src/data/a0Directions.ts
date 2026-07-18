import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0DirectionsWords } from './a0DirectionsWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0DirectionsWords.map((card) => [card.id, card]));

export const a0DirectionsCards: CzechWord[] = a0DirectionsWords;

export const a0DirectionsMicroLessons: A0MicroLesson[] = [
  {
    id: 'a0-4-a',
    titleMn: '1/5 — Шулуун, зүүн, баруун',
    canDoMn: 'Шулуун, зүүн, баруун гэсэн хамгийн суурь чиглэлийг ойлгож чадна.',
    cardIds: ['a0c0058', 'a0c0059', 'a0c0060', 'a0c0061'],
    instructions: {
      a0c0058: 'rovně = шулуун. Заавар сонсохдоо шууд танина.',
      a0c0059: 'doleva = зүүн тийш.',
      a0c0060: 'doprava = баруун тийш.',
      a0c0061: 'Jděte rovně. = Шулуун яваарай. Танихгүй газар хамгийн хэрэгтэй зааврын нэг.',
    },
    exercises: [
      { id:'a0-4-a-1', type:'choice', titleMn:'Сонсож таних', promptMn:'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText:'Jděte rovně.', choices:[{id:'a',text:'Зүүн тийш эргээрэй.'},{id:'b',text:'Шулуун яваарай.'},{id:'c',text:'Энд буугаарай.'}], correctId:'b', feedbackMn:'Jděte rovně. = Шулуун яваарай.' },
      { id:'a0-4-a-2', type:'choice', titleMn:'Чиглэл ялгах', promptMn:'Ажилтан баруун гар тийш заалаа. Аль үг тохирох вэ?', choices:[{id:'a',text:'doleva'},{id:'b',text:'rovně'},{id:'c',text:'doprava'}], correctId:'c', feedbackMn:'doprava = баруун тийш.' },
      { id:'a0-4-a-3-match', type:'match', titleMn:'Чиглэл тааруулах', promptMn:'Чех чиглэлийг зөв Монгол утгатай нь холбо.', pairs:[{id:'straight',czech:'rovně',mongolian:'шулуун'},{id:'left',czech:'doleva',mongolian:'зүүн тийш'},{id:'right',czech:'doprava',mongolian:'баруун тийш'}], feedbackMn:'Гурван суурь чиглэлийг зөв ялгалаа.' },
    ],
  },
  {
    id: 'a0-4-b',
    titleMn: '2/5 — Буудал, автобус, трамвай',
    canDoMn: 'Нийтийн тээврийн буудал хаана байгааг асууж, автобус ба трамвайг ялгаж чадна.',
    cardIds: ['a0c0062', 'a0c0063', 'a0c0064', 'a0c0065'],
    instructions: {
      a0c0062: 'zastávka = автобус, трамвайн нийтийн тээврийн буудал.',
      a0c0063: 'Kde je zastávka? = Нийтийн тээврийн буудал хаана вэ?',
      a0c0064: 'autobus = автобус.',
      a0c0065: 'tramvaj = трамвай.',
    },
    exercises: [
      { id:'a0-4-b-1', type:'choice', titleMn:'Асуулт ойлгох', promptMn:'Kde je zastávka? ямар утгатай вэ?', choices:[{id:'a',text:'Галт тэрэгний буудал хаана вэ?'},{id:'b',text:'Нийтийн тээврийн буудал хаана вэ?'},{id:'c',text:'Би буудал руу явж байна.'}], correctId:'b', feedbackMn:'Kde je zastávka? = Нийтийн тээврийн буудал хаана вэ?' },
      { id:'a0-4-b-2', type:'choice', titleMn:'Тээвэр ялгах', promptMn:'Цахилгааны утастай төмөр замаар явдаг тээврийн хэрэгсэл аль нь вэ?', choices:[{id:'a',text:'autobus'},{id:'b',text:'tramvaj'},{id:'c',text:'zastávka'}], correctId:'b', feedbackMn:'tramvaj = трамвай.' },
      { id:'a0-4-b-3-match', type:'match', titleMn:'Тээвэр тааруулах', promptMn:'Чех үгийг зөв Монгол утгатай нь холбо.', pairs:[{id:'stop',czech:'zastávka',mongolian:'нийтийн тээврийн буудал'},{id:'bus',czech:'autobus',mongolian:'автобус'},{id:'tram',czech:'tramvaj',mongolian:'трамвай'}], feedbackMn:'Буудал болон хоёр тээврийн төрлийг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-4-c',
    titleMn: '3/5 — Аль тээврээр явах вэ?',
    canDoMn: 'Автобус эсвэл трамвайгаар явах зааврыг ойлгож чадна.',
    cardIds: ['a0c0066', 'a0c0067'],
    instructions: {
      a0c0066: 'Jeďte autobusem. = Автобусаар яваарай.',
      a0c0067: 'Jeďte tramvají. = Трамвайгаар яваарай.',
    },
    exercises: [
      { id:'a0-4-c-1', type:'choice', titleMn:'Сонсож таних', promptMn:'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText:'Jeďte autobusem.', choices:[{id:'a',text:'Автобусаар яваарай.'},{id:'b',text:'Автобус энд байна.'},{id:'c',text:'Энд буугаарай.'}], correctId:'a', feedbackMn:'Jeďte autobusem. = Автобусаар яваарай.' },
      { id:'a0-4-c-2', type:'choice', titleMn:'Зөв тээвэр сонгох', promptMn:'Ажилтан трамвайгаар явахыг зааварлалаа. Аль өгүүлбэрийг сонссон бэ?', choices:[{id:'a',text:'Jeďte autobusem.'},{id:'b',text:'Jeďte tramvají.'},{id:'c',text:'Jděte rovně.'}], correctId:'b', feedbackMn:'Jeďte tramvají. = Трамвайгаар яваарай.' },
      { id:'a0-4-c-3-match', type:'match', titleMn:'Заавар тааруулах', promptMn:'Тээврийн зааврыг зөв Монгол утгатай нь холбо.', pairs:[{id:'by-bus',czech:'Jeďte autobusem.',mongolian:'Автобусаар яваарай.'},{id:'by-tram',czech:'Jeďte tramvají.',mongolian:'Трамвайгаар яваарай.'}], feedbackMn:'Хоёр тээврийн зааврыг зөв ялгалаа.' },
    ],
  },
  {
    id: 'a0-4-d',
    titleMn: '4/5 — Энд буугаарай',
    canDoMn: 'Буух зааврыг ойлгож чадна.',
    cardIds: ['a0c0068', 'a0c0069'],
    instructions: {
      a0c0068: 'vystoupit = тээврээс буух.',
      a0c0069: 'Vystupte tady. = Энд буугаарай.',
    },
    exercises: [
      { id:'a0-4-d-1', type:'choice', titleMn:'Утга таних', promptMn:'Vystupte tady. ямар утгатай вэ?', choices:[{id:'a',text:'Энд буугаарай.'},{id:'b',text:'Энд хүлээгээрэй.'},{id:'c',text:'Шулуун яваарай.'}], correctId:'a', feedbackMn:'Vystupte tady. = Энд буугаарай.' },
      { id:'a0-4-d-2', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Энд буугаарай” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['tady.','Vystupte'], expectedText:'Vystupte tady.', feedbackMn:'Vystupte tady. = Энд буугаарай.' },
      { id:'a0-4-d-3', type:'choice', titleMn:'Нөхцөлд хариулах', promptMn:'Жолооч таны буух газрыг заалаа. Та ойлгосноо эелдгээр илэрхийлээрэй.', choices:[{id:'a',text:'Děkuji.'},{id:'b',text:'Nerozumím.'},{id:'c',text:'Kde je zastávka?'}], correctId:'a', feedbackMn:'Тусалсан хүнд Děkuji. гэж хэлж болно.' },
    ],
  },
  {
    id: 'a0-4-e',
    titleMn: '5/5 — Та хаашаа явж байна?',
    canDoMn: 'Очих газраа хэлж, галт тэрэгний буудал руу явж байгаагаа тайлбарлаж чадна.',
    cardIds: ['a0c0070', 'a0c0071'],
    instructions: {
      a0c0070: 'Kam jedete? = Та хаашаа явж байна?',
      a0c0071: 'Jdu na nádraží. = Би галт тэрэгний буудал руу явж байна.',
    },
    exercises: [
      { id:'a0-4-e-1', type:'choice', titleMn:'Асуулт ойлгох', promptMn:'Kam jedete? гэж асуувал юу гэсэн үг вэ?', choices:[{id:'a',text:'Та хаана байна?'},{id:'b',text:'Та хаашаа явж байна?'},{id:'c',text:'Та хэзээ явах вэ?'}], correctId:'b', feedbackMn:'Kam jedete? = Та хаашаа явж байна?' },
      { id:'a0-4-e-2', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би галт тэрэгний буудал руу явж байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['na nádraží.','Jdu'], expectedText:'Jdu na nádraží.', feedbackMn:'Jdu na nádraží. = Би галт тэрэгний буудал руу явж байна.' },
      { id:'a0-4-e-3', type:'choice', titleMn:'Бодит хариулт', promptMn:'Ажилтан Kam jedete? гэж асуулаа. Та галт тэрэгний буудал руу явж байна. Аль хариулт зөв бэ?', choices:[{id:'a',text:'Jdu na nádraží.'},{id:'b',text:'Vystupte tady.'},{id:'c',text:'Jeďte autobusem.'}], correctId:'a', feedbackMn:'Jdu na nádraží. = Би галт тэрэгний буудал руу явж байна.' },
    ],
  },
];

export function getA0DirectionsCard(id: string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.4 карт олдсонгүй: ${id}`);
  return card;
}
