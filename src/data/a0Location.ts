import { czechWords, type CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';

export type { A0MicroLesson } from './a0LessonSchema';

const byId = new Map(czechWords.map((card) => [card.id, card]));

export const a0LocationCards: CzechWord[] = czechWords.filter((card) => card.lessonId === 'l003');

export const a0LocationMicroLessons: A0MicroLesson[] = [
  {
    id: 'a0-3-a',
    titleMn: '1/4 — Ариун цэврийн өрөө хаана вэ?',
    canDoMn: 'Ариун цэврийн өрөө хаана байгааг эелдгээр асууж чадна.',
    cardIds: ['a0c0045', 'a0c0046', 'a0c0047'],
    instructions: {
      a0c0045: 'kde = хаана. Асуултын эхэнд орно.',
      a0c0046: 'toaleta = ариун цэврийн өрөө. Олон нийтийн газар хамгийн хэрэгтэй үгсийн нэг.',
      a0c0047: 'Эелдэг, бэлэн асуулт. Эхлээд энэ бүтнээр нь ашиглана.',
    },
    exercises: [
      { id: 'a0-3-a-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Prosím, kde je toaleta?', choices: [{ id: 'a', text: 'Эмийн сан хаана вэ?' }, { id: 'b', text: 'Ариун цэврийн өрөө хаана вэ?' }, { id: 'c', text: 'Ариун цэврийн өрөө нээлттэй юу?' }, { id: 'd', text: 'Ариун цэврийн өрөө энд байна.' }], correctId: 'b', feedbackMn: 'Prosím, kde je toaleta? = Ариун цэврийн өрөө хаана вэ?' },
      { id: 'a0-3-a-2', type: 'fillBlank', titleMn: 'Хоосон үг нөхөх', promptMn: 'Асуултыг гүйцээ.', promptCzech: 'Kde je ___?', choices: [{ id: 'a', text: 'toaleta' }, { id: 'b', text: 'děkuji' }, { id: 'c', text: 'pomoc' }], correctId: 'a', feedbackMn: 'Kde je toaleta? = Ариун цэврийн өрөө хаана вэ?' },
      { id: 'a0-3-a-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: 'Ариун цэврийн өрөө хаана байгааг эелдгээр асуух өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['je', 'Prosím,', 'kde', 'toaleta?'], expectedText: 'Prosím, kde je toaleta?', feedbackMn: 'Prosím, kde je toaleta? = Ариун цэврийн өрөө хаана вэ?' },
    ],
  },
  {
    id: 'a0-3-b',
    titleMn: '2/4 — Энд үү, тэнд үү?',
    canDoMn: 'Ойр болон арай хол заасан газрыг “энд / тэнд” гэж ойлгож чадна.',
    cardIds: ['a0c0048', 'a0c0049'],
    instructions: {
      a0c0048: 'Tady. = Энд. Зааж байгаа ойр газрыг хэлнэ.',
      a0c0049: 'Tam. = Тэнд. Зааж байгаа арай хол газрыг хэлнэ.',
    },
    exercises: [
      { id: 'a0-3-b-1', type: 'choice', titleMn: 'Ойр газрыг ойлгох', promptMn: 'Ажилтан таны хажуугийн хаалгыг заалаа. Аль хариулт “энд” гэсэн утгатай вэ?', choices: [{ id: 'a', text: 'Tam.' }, { id: 'b', text: 'Tady.' }, { id: 'c', text: 'Nerozumím.' }], correctId: 'b', feedbackMn: 'Tady. = Энд.' },
      { id: 'a0-3-b-2', type: 'choice', titleMn: 'Хол газрыг ойлгох', promptMn: 'Ажилтан барилгын нөгөө тал руу заалаа. Аль хариулт “тэнд” гэсэн утгатай вэ?', choices: [{ id: 'a', text: 'Tady.' }, { id: 'b', text: 'Tam.' }, { id: 'c', text: 'Děkuji.' }], correctId: 'b', feedbackMn: 'Tam. = Тэнд.' },
      { id: 'a0-3-b-3-match', type: 'match', titleMn: 'Байрлал тааруулах', promptMn: 'Чех заалтын үгийг зөв Монгол утгатай нь холбо.', pairs: [{ id: 'here', czech: 'Tady.', mongolian: 'Энд.' }, { id: 'there', czech: 'Tam.', mongolian: 'Тэнд.' }], feedbackMn: 'Ойр болон хол заасан байрлалыг зөв ялгалаа.' },
    ],
  },
  {
    id: 'a0-3-c',
    titleMn: '3/4 — Дэлгүүр ба эмийн сан',
    canDoMn: 'Дэлгүүр, эмийн сан хаана байгааг асууж чадна.',
    cardIds: ['a0c0050', 'a0c0051', 'a0c0052', 'a0c0053'],
    instructions: {
      a0c0050: 'obchod = дэлгүүр.',
      a0c0051: 'Kde je obchod? = Дэлгүүр хаана вэ?',
      a0c0052: 'lékárna = эмийн сан. Чехэд ногоон загалмайн тэмдгээр ихэвчлэн танина.',
      a0c0053: 'Kde je lékárna? = Эмийн сан хаана вэ?',
    },
    exercises: [
      { id: 'a0-3-c-1', type: 'choice', titleMn: 'Утга таних', promptMn: 'Kde je obchod? ямар утгатай вэ?', choices: [{ id: 'a', text: 'Дэлгүүр хаана вэ?' }, { id: 'b', text: 'Дэлгүүр нээлттэй юу?' }, { id: 'c', text: 'Дэлгүүр энд байна.' }, { id: 'd', text: 'Эмийн сан хаана вэ?' }], correctId: 'a', feedbackMn: 'Kde je obchod? = Дэлгүүр хаана вэ?' },
      { id: 'a0-3-c-2', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Эмийн сан хаана вэ?” гэсэн асуултыг зөв дарааллаар байрлуул.', tokens: ['je', 'Kde', 'lékárna?'], expectedText: 'Kde je lékárna?', feedbackMn: 'Kde je lékárna? = Эмийн сан хаана вэ?' },
      { id: 'a0-3-c-3', type: 'choice', titleMn: 'Нөхцөлд хэрэглэх', promptMn: 'Та эм авах шаардлагатай боллоо. Аль асуултыг хэлэх вэ?', choices: [{ id: 'a', text: 'Kde je lékárna?' }, { id: 'b', text: 'Kde je obchod?' }, { id: 'c', text: 'Prosím, kde je toaleta?' }], correctId: 'a', feedbackMn: 'Эмийн сан асуухдаа Kde je lékárna? гэж хэлнэ.' },
      { id: 'a0-3-c-4-match', type: 'match', titleMn: 'Хэрэгтэй газар асуух', promptMn: 'Чех асуултыг зөв Монгол утгатай нь холбо.', pairs: [{ id: 'shop', czech: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана вэ?' }, { id: 'pharmacy', czech: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана вэ?' }], feedbackMn: 'Дэлгүүр, эмийн сан асуух хэллэгийг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-3-d',
    titleMn: '4/4 — Буудлыг тодруулах',
    canDoMn: 'Галт тэрэгний буудал хаана байгааг асууж, “энд үү, тэнд үү?” гэж тодруулна.',
    cardIds: ['a0c0054', 'a0c0055', 'a0c0056', 'a0c0057'],
    instructions: {
      a0c0054: 'nádraží = галт тэрэгний буудал. Хот доторх трамвай, автобусны буудал биш.',
      a0c0055: 'Kde je nádraží? = Галт тэрэгний буудал хаана вэ?',
      a0c0056: 'nebo = эсвэл. Эхлээд Tady, nebo tam? гэсэн бэлэн хэллэгийн дотор танина.',
      a0c0057: 'Газрын зураг, заасан чиглэл ойлгомжгүй үед “Энд үү, тэнд үү?” гэж тодруулна.',
    },
    exercises: [
      { id: 'a0-3-d-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Kde je nádraží?', choices: [{ id: 'a', text: 'Галт тэрэгний буудал хаана вэ?' }, { id: 'b', text: 'Би буудал руу явж байна.' }, { id: 'c', text: 'Буудал энд байна.' }, { id: 'd', text: 'Дэлгүүр хаана вэ?' }], correctId: 'a', feedbackMn: 'Kde je nádraží? = Галт тэрэгний буудал хаана вэ?' },
      { id: 'a0-3-d-2', type: 'fillBlank', titleMn: 'Хоосон үг нөхөх', promptMn: '“Энд үү, тэнд үү?” гэсэн асуултыг гүйцээ.', promptCzech: 'Tady, ___ tam?', choices: [{ id: 'a', text: 'nebo' }, { id: 'b', text: 'prosím' }, { id: 'c', text: 'děkuji' }], correctId: 'a', feedbackMn: 'Tady, nebo tam? = Энд үү, тэнд үү?' },
      { id: 'a0-3-d-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: 'Зааж буй чиглэлийг тодруулах асуултыг зөв дарааллаар байрлуул.', tokens: ['nebo', 'Tady,', 'tam?'], expectedText: 'Tady, nebo tam?', feedbackMn: 'Tady, nebo tam? = Энд үү, тэнд үү?' },
      { id: 'a0-3-d-4', type: 'choice', titleMn: 'Хамгаалах хэллэгээ сэргээх', promptMn: 'Ажилтан байрлалыг хурдан тайлбарлалаа. Та ойлгохгүй бол юу гэж хэлэх вэ?', choices: [{ id: 'a', text: 'Nerozumím. Mluvte prosím pomalu.' }, { id: 'b', text: 'Kde je nádraží?' }, { id: 'c', text: 'Tam.' }], correctId: 'a', feedbackMn: 'Ойлгохгүй бол эхлээд Nerozumím. гэж хэлээд, удаан ярихыг хүснэ.' },
    ],
  },
];

export function getA0LocationCard(id: string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.3 карт олдсонгүй: ${id}`);
  return card;
}
