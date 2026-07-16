import type { CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';
import { a0PhoneWords } from './a0PhoneWords';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(a0PhoneWords.map((card) => [card.id, card]));

export const a0PhoneCards: CzechWord[] = a0PhoneWords;

export const a0PhoneMicroLessons: A0MicroLesson[] = [
  {
    id:'a0-11-a', titleMn:'1/4 — Сонсож байна уу?', canDoMn:'Утсан дээр сонсож байгаа эсэхийг ойлгож, хариулж чадна.',
    cardIds:['a0c0142','a0c0143'],
    instructions:{
      a0c0142:'Slyšíte mě? = Та намайг сонсож байна уу? Утасны эхэнд их сонсогддог асуулт.',
      a0c0143:'Slyším vás. = Би таныг сонсож байна. Сонсож байгаагаа богино хариулна.',
    },
    exercises:[
      { id:'a0-11-a-1', type:'choice', titleMn:'Асуулт ойлгох', promptMn:'Slyšíte mě? ямар утгатай вэ?', choices:[{id:'a',text:'Та намайг сонсож байна уу?'},{id:'b',text:'Та картаар төлөх үү?'},{id:'c',text:'Асуудал хаана байна?'}], correctId:'a', feedbackMn:'Slyšíte mě? = Та намайг сонсож байна уу?' },
      { id:'a0-11-a-2', type:'choice', titleMn:'Сонсож байгаагаа хэлэх', promptMn:'Та нөгөө хүнийг сонсож байна. Аль хариулт зөв вэ?', choices:[{id:'a',text:'Slyším vás.'},{id:'b',text:'Nemám klíč.'},{id:'c',text:'To je drahé.'}], correctId:'a', feedbackMn:'Slyším vás. = Би таныг сонсож байна.' },
      { id:'a0-11-a-3', type:'order', titleMn:'Өгүүлбэр бүтээх', promptMn:'“Би таныг сонсож байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens:['vás.','Slyším'], expectedText:'Slyším vás.', feedbackMn:'Slyším vás. = Би таныг сонсож байна.' },
    ],
  },
  {
    id:'a0-11-b', titleMn:'2/4 — Дахиад хэлнэ үү', canDoMn:'Ойлгоогүй үед дахин хэлүүлэх хүсэлт тавьж чадна.',
    cardIds:['a0c0144','a0c0145'],
    instructions:{
      a0c0144:'Ještě jednou, prosím. = Дахиад нэг удаа хэлнэ үү. Утсан дээр ойлгоогүй үед хамгийн хэрэгтэй богино хүсэлт.',
      a0c0145:'Můžete to zopakovat? = Та үүнийг давтаж хэлж болох уу? Арай урт боловч утсан дээр хэрэгтэй асуулт.',
    },
    exercises:[
      { id:'a0-11-b-1', type:'choice', titleMn:'Дахин хэлүүлэх', promptMn:'Ještě jednou, prosím. ямар утгатай вэ?', choices:[{id:'a',text:'Дахиад нэг удаа хэлнэ үү.'},{id:'b',text:'Үүнийг яаж уух вэ?'},{id:'c',text:'Уут өгнө үү.'}], correctId:'a', feedbackMn:'Ještě jednou, prosím. = Дахиад нэг удаа хэлнэ үү.' },
      { id:'a0-11-b-2', type:'choice', titleMn:'Давтаж хэлүүлэх', promptMn:'Та үүнийг давтаж хэлүүлэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Můžete to zopakovat?'},{id:'b',text:'Mám teplotu.'},{id:'c',text:'Kde je pokoj?'}], correctId:'a', feedbackMn:'Můžete to zopakovat? = Та үүнийг давтаж хэлж болох уу?' },
      { id:'a0-11-b-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Дахиад нэг удаа хэлнэ үү” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['prosím.','jednou,','Ještě'], expectedText:'Ještě jednou, prosím.', feedbackMn:'Ještě jednou, prosím. = Дахиад нэг удаа хэлнэ үү.' },
    ],
  },
  {
    id:'a0-11-c', titleMn:'3/4 — Бичээд өгнө үү', canDoMn:'Мэдээллийг бичүүлж авах хүсэлт хэлж чадна.',
    cardIds:['a0c0146'],
    instructions:{
      a0c0146:'Napište mi to, prosím. = Үүнийг надад бичээд өгнө үү. Хаяг, нэр, дугаар ойлгохгүй үед хэрэгтэй.',
    },
    exercises:[
      { id:'a0-11-c-1', type:'choice', titleMn:'Бичүүлэх', promptMn:'Napište mi to, prosím. ямар утгатай вэ?', choices:[{id:'a',text:'Үүнийг надад бичээд өгнө үү.'},{id:'b',text:'Удаан ярьж өгнө үү.'},{id:'c',text:'Баримт өгнө үү.'}], correctId:'a', feedbackMn:'Napište mi to, prosím. = Үүнийг надад бичээд өгнө үү.' },
      { id:'a0-11-c-2', type:'choice', titleMn:'Мэдээлэл бичүүлэх', promptMn:'Та мэдээллийг бичүүлж авах хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Napište mi to, prosím.'},{id:'b',text:'Bolí mě hlava.'},{id:'c',text:'Platím kartou.'}], correctId:'a', feedbackMn:'Мэдээллийг бичүүлж авахдаа Napište mi to, prosím. гэж хэлнэ.' },
      { id:'a0-11-c-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Үүнийг надад бичээд өгнө үү” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['prosím.','to,','mi','Napište'], expectedText:'Napište mi to, prosím.', feedbackMn:'Napište mi to, prosím. = Үүнийг надад бичээд өгнө үү.' },
    ],
  },
  {
    id:'a0-11-d', titleMn:'4/4 — SMS явуулна уу', canDoMn:'Мэдээллийг SMS-ээр явуулахыг хүсэж чадна.',
    cardIds:['a0c0147'],
    instructions:{
      a0c0147:'Pošlete mi SMS, prosím. = Надад SMS явуулна уу. Утсаар ойлгоход хэцүү мэдээллийг бичүүлж авахад хэрэгтэй.',
    },
    exercises:[
      { id:'a0-11-d-1', type:'choice', titleMn:'SMS хүсэх', promptMn:'Pošlete mi SMS, prosím. ямар утгатай вэ?', choices:[{id:'a',text:'Надад SMS явуулна уу.'},{id:'b',text:'Би таныг сонсож байна.'},{id:'c',text:'Өвчин намдаах юм байна уу?'}], correctId:'a', feedbackMn:'Pošlete mi SMS, prosím. = Надад SMS явуулна уу.' },
      { id:'a0-11-d-2', type:'choice', titleMn:'Мэдээлэл SMS-ээр авах', promptMn:'Та SMS явуулахыг хүсэх хэрэгтэй. Аль нь зөв вэ?', choices:[{id:'a',text:'Pošlete mi SMS, prosím.'},{id:'b',text:'Slyším vás.'},{id:'c',text:'Je zima.'}], correctId:'a', feedbackMn:'SMS хүсэхдээ Pošlete mi SMS, prosím. гэж хэлнэ.' },
      { id:'a0-11-d-3', type:'order', titleMn:'Хүсэлт бүтээх', promptMn:'“Надад SMS явуулна уу” гэсэн хүсэлтийг зөв дарааллаар байрлуул.', tokens:['prosím.','SMS,','mi','Pošlete'], expectedText:'Pošlete mi SMS, prosím.', feedbackMn:'Pošlete mi SMS, prosím. = Надад SMS явуулна уу.' },
    ],
  },
];

export function getA0PhoneCard(id:string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.11 карт олдсонгүй: ${id}`);
  return card;
}
