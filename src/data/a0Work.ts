import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0JobWords } from './a0JobWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0JobWords.map((card) => [card.id, card]));

export const a0WorkCards: CzechWord[] = a0JobWords;

export const a0WorkMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-6-a', titleMn:'1/5 — Би энд ажилладаг', canDoMn:'Энд ажилладгаа баталж хэлж чадна.',
    cardIds:['a0c0086','a0c0087','a0c0088'],
    instructions:{ a0c0086:'práce = ажил.', a0c0087:'Pracuji tady. = Би энд ажилладаг.', a0c0088:'Pracujete tady? = Та энд ажилладаг уу?' },
    exercises:[
      { id:'a0-6-a-1', type:'choice', titleMn:'Утга таних', promptMn:'Pracuji tady. ямар утгатай вэ?', choices:[{id:'a',text:'Би энд ажилладаг.'},{id:'b',text:'Би энд амьдардаг.'},{id:'c',text:'Би энд бууна.'}], correctId:'a', feedbackMn:'Pracuji tady. = Би энд ажилладаг.' },
      { id:'a0-6-a-2', type:'choice', titleMn:'Асуулт ойлгох', promptMn:'Pracujete tady? ямар утгатай вэ?', choices:[{id:'a',text:'Та энд ажилладаг уу?'},{id:'b',text:'Та хэзээ ажилладаг вэ?'},{id:'c',text:'Та хаашаа явж байна вэ?'}], correctId:'a', feedbackMn:'Pracujete tady? = Та энд ажилладаг уу?' },
      { id:'a0-6-a-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би энд ажилладаг” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['tady.','Pracuji'], expectedText:'Pracuji tady.', feedbackMn:'Pracuji tady. = Би энд ажилладаг.' },
    ],
  },
  {
    id:'a0-6-b', titleMn:'2/5 — Эхлэх, тарах цаг', canDoMn:'Ажил хэзээ эхэлж, хэзээ тарахыг асууж чадна.',
    cardIds:['a0c0089','a0c0090','a0c0091'],
    instructions:{ a0c0089:'začínáme = бид эхэлнэ.', a0c0090:'Začínáme v osm. = Бид найман цагт эхэлнэ.', a0c0091:'Kdy končíme? = Бид хэзээ тарах вэ?' },
    exercises:[
      { id:'a0-6-b-1', type:'choice', titleMn:'Сонсож таних', promptMn:'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText:'Začínáme v osm.', choices:[{id:'a',text:'Бид найман цагт эхэлнэ.'},{id:'b',text:'Бид найман цагт тарах болно.'},{id:'c',text:'Бид найман цагт уулзалттай.'}], correctId:'a', feedbackMn:'Začínáme v osm. = Бид найман цагт эхэлнэ.' },
      { id:'a0-6-b-2', type:'choice', titleMn:'Асуулт сонгох', promptMn:'Та ажил хэзээ тарахыг асуух хэрэгтэй. Аль нь зөв бэ?', choices:[{id:'a',text:'Kdy končíme?'},{id:'b',text:'Kdy je přestávka?'},{id:'c',text:'Pracujete tady?'}], correctId:'a', feedbackMn:'Kdy končíme? = Бид хэзээ тарах вэ?' },
      { id:'a0-6-b-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'Ажил эхлэх цагийг зөв дарааллаар байрлуул.', tokens:['v osm.','Začínáme'], expectedText:'Začínáme v osm.', feedbackMn:'Začínáme v osm. = Бид найман цагт эхэлнэ.' },
    ],
  },
  {
    id:'a0-6-c', titleMn:'3/5 — Ээлж ба завсарлага', canDoMn:'Ээлжтэй эсэхээ хэлж, завсарлага хэзээ болохыг асууж чадна.',
    cardIds:['a0c0092','a0c0093','a0c0094','a0c0095'],
    instructions:{ a0c0092:'směna = ажлын ээлж.', a0c0093:'Mám směnu. = Би ээлжтэй.', a0c0094:'přestávka = завсарлага.', a0c0095:'Kdy je přestávka? = Завсарлага хэзээ вэ?' },
    exercises:[
      { id:'a0-6-c-1', type:'choice', titleMn:'Утга таних', promptMn:'Mám směnu. ямар утгатай вэ?', choices:[{id:'a',text:'Би ээлжтэй.'},{id:'b',text:'Би завтай.'},{id:'c',text:'Би ажилгүй.'}], correctId:'a', feedbackMn:'Mám směnu. = Би ээлжтэй.' },
      { id:'a0-6-c-2', type:'choice', titleMn:'Асуулт сонгох', promptMn:'Та завсарлага хэзээ болохыг асуух хэрэгтэй. Аль өгүүлбэр зөв бэ?', choices:[{id:'a',text:'Kdy je přestávka?'},{id:'b',text:'Kdy končíme?'},{id:'c',text:'Kolik je hodin?'}], correctId:'a', feedbackMn:'Kdy je přestávka? = Завсарлага хэзээ вэ?' },
      { id:'a0-6-c-3-match', type:'match', titleMn:'Ажлын хэмнэл', promptMn:'Чех хэллэгийг зөв Монгол утгатай нь холбо.', pairs:[{id:'shift',czech:'Mám směnu.',mongolian:'Би ээлжтэй.'},{id:'break',czech:'Kdy je přestávka?',mongolian:'Завсарлага хэзээ вэ?'}], feedbackMn:'Ээлж болон завсарлагын хэллэгийг зөв таарууллаа.' },
    ],
  },
  {
    id:'a0-6-d', titleMn:'4/5 — Шинэ даалгавар', canDoMn:'Шинэ даалгавар ирэхэд юу хийхээ асууж, нөгөө хүний тусламжийн хариуг ойлгож чадна.',
    cardIds:['a0c0103','a0c0096','a0c0104'],
    instructions:{ a0c0103:'Nový úkol. = Шинэ даалгавар.', a0c0096:'Co mám dělat? = Би юу хийх вэ?', a0c0104:'Ukážu vám. = Би танд үзүүлж өгнө.' },
    exercises:[
      { id:'a0-6-d-1', type:'choice', titleMn:'Сонсож таних', promptMn:'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText:'Nový úkol.', choices:[{id:'a',text:'Шинэ даалгавар.'},{id:'b',text:'Ажил дууссан.'},{id:'c',text:'Завсарлага эхэллээ.'}], correctId:'a', feedbackMn:'Nový úkol. = Шинэ даалгавар.' },
      { id:'a0-6-d-2', type:'choice', titleMn:'Яаралтай хэрэглэх', promptMn:'Та шинэ ажил дээрээ юу хийхээ мэдэхгүй байна. Аль өгүүлбэрийг хэлэх вэ?', choices:[{id:'a',text:'Co mám dělat?'},{id:'b',text:'Pracujete tady?'},{id:'c',text:'Kdy končíme?'}], correctId:'a', feedbackMn:'Co mám dělat? = Би юу хийх вэ?' },
      { id:'a0-6-d-3', type:'choice', titleMn:'Хариулт ойлгох', promptMn:'Ukážu vám. ямар утгатай вэ?', choices:[{id:'a',text:'Би танд үзүүлж өгнө.'},{id:'b',text:'Та надад үзүүлж өгнө үү.'},{id:'c',text:'Би ажиллаж байна.'}], correctId:'a', feedbackMn:'Ukážu vám. = Би танд үзүүлж өгнө.' },
      { id:'a0-6-d-4', type:'order', titleMn:'Асуулт бүтээх', promptMn:'“Би юу хийх вэ?” гэсэн асуултыг зөв дарааллаар байрлуул.', tokens:['dělat?','mám','Co'], expectedText:'Co mám dělat?', feedbackMn:'Co mám dělat? = Би юу хийх вэ?' },
    ],
  },
  {
    id:'a0-6-e', titleMn:'5/5 — Дууссан уу, надад үзүүлж өгнө үү', canDoMn:'Ажил дууссан эсэхийг асуухад ойлгохгүй байвал үзүүлж өгөхийг хүсэж чадна.',
    cardIds:['a0c0097','a0c0098','a0c0099'],
    instructions:{ a0c0097:'hotovo = дууссан.', a0c0098:'Je hotovo? = Дууссан уу?', a0c0099:'Ukažte mi, prosím. = Надад үзүүлж өгнө үү.' },
    exercises:[
      { id:'a0-6-e-1', type:'choice', titleMn:'Утга таних', promptMn:'Je hotovo? ямар утгатай вэ?', choices:[{id:'a',text:'Дууссан уу?'},{id:'b',text:'Та хаана байна?'},{id:'c',text:'Завсарлага хэзээ вэ?'}], correctId:'a', feedbackMn:'Je hotovo? = Дууссан уу?' },
      { id:'a0-6-e-2', type:'choice', titleMn:'Тусламжийг тодруулах', promptMn:'Та ойлгохгүй байгаа тул нөгөө хүнээр биеэр нь үзүүлүүлэх хэрэгтэй. Аль өгүүлбэрийг хэлэх вэ?', choices:[{id:'a',text:'Ukažte mi, prosím.'},{id:'b',text:'Mám směnu.'},{id:'c',text:'Je hotovo?'}], correctId:'a', feedbackMn:'Ukažte mi, prosím. = Надад үзүүлж өгнө үү.' },
      { id:'a0-6-e-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Надад үзүүлж өгнө үү” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['mi,','Ukažte','prosím.'], expectedText:'Ukažte mi, prosím.', feedbackMn:'Ukažte mi, prosím. = Надад үзүүлж өгнө үү.' },
    ],
  },
];

export function getA0WorkCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.6 карт олдсонгүй: ${id}`);
  return card;
}
