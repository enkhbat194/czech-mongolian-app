import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0TimeWords } from './a0TimeWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0TimeWords.map((card) => [card.id, card]));

export const a0TimeCards: CzechWord[] = a0TimeWords;

export const a0TimeMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-5-a', titleMn:'1/4 — Цаг хэд болж байна?', canDoMn:'Цаг асууж, найман, таван, арван хоёр цагийн хариуг ойлгож чадна.',
    cardIds:['a0c0072','a0c0073','a0c0074','a0c0083','a0c0101','a0c0102'],
    instructions:{
      a0c0072:'kolik = хэд. Цаг, үнэ, тоо асуухад олонтаа сонсогдоно.',
      a0c0073:'Kolik je hodin? = Цаг хэд болж байна?',
      a0c0074:'teď = одоо.',
      a0c0083:'v osm = найман цагт.',
      a0c0101:'v pět = таван цагт.',
      a0c0102:'ve dvanáct = арван хоёр цагт.',
    },
    exercises:[
      { id:'a0-5-a-1', type:'choice', titleMn:'Асуулт ойлгох', promptMn:'Kolik je hodin? ямар утгатай вэ?', choices:[{id:'a',text:'Цаг хэд болж байна?'},{id:'b',text:'Та хэзээ завтай вэ?'},{id:'c',text:'Маргааш хэдэн цагт вэ?'}], correctId:'a', feedbackMn:'Kolik je hodin? = Цаг хэд болж байна?' },
      { id:'a0-5-a-2', type:'choice', titleMn:'Үг таних', promptMn:'teď ямар утгатай вэ?', choices:[{id:'a',text:'маргааш'},{id:'b',text:'одоо'},{id:'c',text:'орой'}], correctId:'b', feedbackMn:'teď = одоо.' },
      { id:'a0-5-a-3', type:'order', titleMn:'Асуулт бүтээх', promptMn:'“Цаг хэд болж байна?” гэсэн асуултыг зөв дарааллаар байрлуул.', tokens:['hodin?','Kolik','je'], expectedText:'Kolik je hodin?', feedbackMn:'Kolik je hodin? = Цаг хэд болж байна?' },
      { id:'a0-5-a-4', type:'choice', titleMn:'Цаг таних', promptMn:'v pět ямар утгатай вэ?', choices:[{id:'a',text:'арван хоёр цагт'},{id:'b',text:'таван цагт'},{id:'c',text:'найман цагт'}], correctId:'b', feedbackMn:'v pět = таван цагт.' },
      { id:'a0-5-a-5', type:'choice', titleMn:'Цаг таних', promptMn:'ve dvanáct ямар утгатай вэ?', choices:[{id:'a',text:'арван хоёр цагт'},{id:'b',text:'таван цагт'},{id:'c',text:'найман цагт'}], correctId:'a', feedbackMn:'ve dvanáct = арван хоёр цагт.' },
    ],
  },
  {
    id:'a0-5-b', titleMn:'2/4 — Өнөөдөр, маргааш, өглөө, орой', canDoMn:'Өнөөдөр, маргааш болон өглөө, оройг ялгаж чадна.',
    cardIds:['a0c0075','a0c0076','a0c0077','a0c0078'],
    instructions:{ a0c0075:'dnes = өнөөдөр.', a0c0076:'zítra = маргааш.', a0c0077:'ráno = өглөө.', a0c0078:'večer = орой.' },
    exercises:[
      { id:'a0-5-b-1', type:'choice', titleMn:'Өдөр ялгах', promptMn:'“Маргааш” гэсэн үг аль нь вэ?', choices:[{id:'a',text:'dnes'},{id:'b',text:'zítra'},{id:'c',text:'teď'}], correctId:'b', feedbackMn:'zítra = маргааш.' },
      { id:'a0-5-b-2', type:'choice', titleMn:'Цагийн хэсэг', promptMn:'“Орой” гэсэн үг аль нь вэ?', choices:[{id:'a',text:'ráno'},{id:'b',text:'večer'},{id:'c',text:'dnes'}], correctId:'b', feedbackMn:'večer = орой.' },
      { id:'a0-5-b-3-match', type:'match', titleMn:'Цагийн үг тааруулах', promptMn:'Чех цагийн үгийг зөв Монгол утгатай нь холбо.', pairs:[{id:'today',czech:'dnes',mongolian:'өнөөдөр'},{id:'tomorrow',czech:'zítra',mongolian:'маргааш'},{id:'morning',czech:'ráno',mongolian:'өглөө'},{id:'evening',czech:'večer',mongolian:'орой'}], feedbackMn:'Өдөр болон цагийн хэсгүүдийг зөв таарууллаа.' },
    ],
  },
  {
    id:'a0-5-c', titleMn:'3/4 — Та хэзээ завтай вэ?', canDoMn:'Завтай эсвэл завгүй байгаагаа хэлж чадна.',
    cardIds:['a0c0079','a0c0080','a0c0081','a0c0082'],
    instructions:{ a0c0079:'Kdy? = Хэзээ?', a0c0080:'Kdy máte čas? = Та хэзээ завтай вэ?', a0c0081:'Mám čas. = Би завтай.', a0c0082:'Nemám čas. = Би завгүй.' },
    exercises:[
      { id:'a0-5-c-1', type:'choice', titleMn:'Асуулт ойлгох', promptMn:'Kdy máte čas? гэж асуувал юу гэсэн үг вэ?', choices:[{id:'a',text:'Та хэдэн цагт явна вэ?'},{id:'b',text:'Та хэзээ завтай вэ?'},{id:'c',text:'Та хаана ажилладаг вэ?'}], correctId:'b', feedbackMn:'Kdy máte čas? = Та хэзээ завтай вэ?' },
      { id:'a0-5-c-2', type:'choice', titleMn:'Хариулт сонгох', promptMn:'Та одоо завгүй байна. Аль хариулт тохирох вэ?', choices:[{id:'a',text:'Mám čas.'},{id:'b',text:'Nemám čas.'},{id:'c',text:'Kdy?'}], correctId:'b', feedbackMn:'Nemám čas. = Би завгүй.' },
      { id:'a0-5-c-3-match', type:'match', titleMn:'Завтай эсэхээ хэлэх', promptMn:'Хоёр хариултыг зөв Монгол утгатай нь холбо.', pairs:[{id:'have-time',czech:'Mám čas.',mongolian:'Би завтай.'},{id:'no-time',czech:'Nemám čas.',mongolian:'Би завгүй.'}], feedbackMn:'Завтай болон завгүй гэсэн хоёр хариултыг зөв ялгалаа.' },
    ],
  },
  {
    id:'a0-5-d', titleMn:'4/4 — Уулзалт найман цагт', canDoMn:'Уулзалтын цагийг ойлгож, хэлж чадна.',
    cardIds:['a0c0084','a0c0085'],
    instructions:{ a0c0084:'schůzka = уулзалт.', a0c0085:'Máme schůzku v osm. = Бид найман цагт уулзалттай.' },
    exercises:[
      { id:'a0-5-d-1', type:'choice', titleMn:'Утга таних', promptMn:'schůzka ямар утгатай вэ?', choices:[{id:'a',text:'уулзалт'},{id:'b',text:'завсарлага'},{id:'c',text:'ажлын ээлж'}], correctId:'a', feedbackMn:'schůzka = уулзалт.' },
      { id:'a0-5-d-2', type:'choice', titleMn:'Сонсож таних', promptMn:'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText:'Máme schůzku v osm.', choices:[{id:'a',text:'Бид маргааш ажиллана.'},{id:'b',text:'Бид найман цагт уулзалттай.'},{id:'c',text:'Би найман цагт завгүй.'}], correctId:'b', feedbackMn:'Máme schůzku v osm. = Бид найман цагт уулзалттай.' },
      { id:'a0-5-d-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'Уулзалтын цагийг зөв дарааллаар байрлуул.', tokens:['v osm.','Máme','schůzku'], expectedText:'Máme schůzku v osm.', feedbackMn:'Máme schůzku v osm. = Бид найман цагт уулзалттай.' },
    ],
  },
];

export function getA0TimeCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.5 карт олдсонгүй: ${id}`);
  return card;
}
