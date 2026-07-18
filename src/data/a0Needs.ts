import { czechWords, type CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';

export type { A0MicroLesson } from './a0LessonSchema';

export interface A0DialogueStep {
  id: string;
  speaker: string;
  staffCzech: string;
  staffMn: string;
  promptMn: string;
  choices: { id: string; text: string }[];
  correctId: string;
  feedbackMn: string;
}

const byId = new Map(czechWords.map((card) => [card.id, card]));

export const a0NeedsCards: CzechWord[] = czechWords.filter((card) => card.lessonId === 'l002');

export function getA0NeedsCard(id: string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.2 карт олдсонгүй: ${id}`);
  return card;
}

export const a0NeedsMicroLessons: A0MicroLesson[] = [
  {
    id: 'a0-2-a',
    titleMn: '1/6 — Надад тусламж хэрэгтэй',
    canDoMn: 'Тусламж хэрэгтэйгээ шууд, ойлгомжтой хэлж чадна.',
    cardIds: ['a0c0023', 'a0c0024', 'a0c0025'],
    instructions: {
      a0c0023: 'Potřebuji гэдэг нь “надад хэрэгтэй” гэсэн бэлэн хэлбэр. Дараа нь хэрэгтэй зүйлээ залгана.',
      a0c0024: 'pomoc = тусламж.',
      a0c0025: 'Асуудал гарсан үед шууд хэрэглэж болох хамгийн чухал өгүүлбэрийн нэг.',
    },
    exercises: [
      { id: 'a0-2-a-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв утгыг сонго.', audioText: 'Potřebuji pomoc.', choices: [{ id: 'a', text: 'Би туслахыг хүсэж байна.' }, { id: 'b', text: 'Надад тусламж хэрэгтэй.' }, { id: 'c', text: 'Надад ус хэрэгтэй.' }, { id: 'd', text: 'Би ойлгохгүй байна.' }], correctId: 'b', feedbackMn: 'Potřebuji pomoc. = Надад тусламж хэрэгтэй.' },
      { id: 'a0-2-a-2', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Надад тусламж хэрэгтэй” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['pomoc.', 'Potřebuji'], expectedText: 'Potřebuji pomoc.', feedbackMn: 'Potřebuji pomoc. = Надад тусламж хэрэгтэй.' },
      { id: 'a0-2-a-3', type: 'choice', titleMn: 'Нөхцөлд хариулах', promptMn: 'Та ресепшнд очоод яаралтай тусламж хүсэх хэрэгтэй байна. Аль өгүүлбэрийг хэлэх вэ?', choices: [{ id: 'a', text: 'Děkuji.' }, { id: 'b', text: 'Potřebuji pomoc.' }, { id: 'c', text: 'Na shledanou.' }], correctId: 'b', feedbackMn: 'Potřebuji pomoc. = Надад тусламж хэрэгтэй.' },
      { id: 'a0-2-a-4-match', type: 'match', titleMn: 'Хэллэгийн хэсэг', promptMn: 'Тусламж хүсэхэд хэрэгтэй хэсгүүдийг утгатай нь тааруул.', pairs: [{ id: 'need', czech: 'Potřebuji', mongolian: 'надад хэрэгтэй' }, { id: 'help', czech: 'pomoc', mongolian: 'тусламж' }, { id: 'need-help', czech: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.' }], feedbackMn: 'Тусламж хүсэх хэллэгийг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-2-b',
    titleMn: '2/6 — Ус ба утас',
    canDoMn: 'Ус эсвэл утас хэрэгтэйгээ хэлж чадна.',
    cardIds: ['a0c0026', 'a0c0027', 'a0c0028', 'a0c0029'],
    instructions: {
      a0c0026: 'voda үг нь өгүүлбэрт vodu болж орно. Одоохондоо бүтнээр нь танина.',
      a0c0027: 'Potřebuji vodu. = Надад ус хэрэгтэй.',
      a0c0028: 'telefon = утас.',
      a0c0029: 'Өөрийн утас байхгүй, холбогдох шаардлагатай үед хэрэглэж болно.',
    },
    exercises: [
      { id: 'a0-2-b-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Potřebuji vodu.', choices: [{ id: 'a', text: 'Надад ус хэрэгтэй.' }, { id: 'b', text: 'Надад утас хэрэгтэй.' }, { id: 'c', text: 'Надад тусламж хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.' },
      { id: 'a0-2-b-2', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Надад утас хэрэгтэй” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['telefon.', 'Potřebuji'], expectedText: 'Potřebuji telefon.', feedbackMn: 'Potřebuji telefon. = Надад утас хэрэгтэй.' },
      { id: 'a0-2-b-3', type: 'choice', titleMn: 'Нөхцөлд хэрэглэх', promptMn: 'Та ус авах хэрэгтэй байна. Аль өгүүлбэр зөв бэ?', choices: [{ id: 'a', text: 'Potřebuji pomoc.' }, { id: 'b', text: 'Potřebuji vodu.' }, { id: 'c', text: 'Potřebuji telefon.' }], correctId: 'b', feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.' },
      { id: 'a0-2-b-4-match', type: 'match', titleMn: 'Хэрэгцээг ялгах', promptMn: 'Хоёр хэрэгцээний хэллэгийг зөв утгатай нь холбо.', pairs: [{ id: 'water', czech: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }, { id: 'phone', czech: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' }], feedbackMn: 'Ус болон утасны хэрэгцээг зөв ялгалаа.' },
    ],
  },
  {
    id: 'a0-2-c',
    titleMn: '3/6 — Би юу хүсэж байна?',
    canDoMn: 'Ус, хоол хүсэж байгаагаа хэлж чадна.',
    cardIds: ['a0c0030', 'a0c0031', 'a0c0032', 'a0c0033'],
    instructions: {
      a0c0030: 'Chci = би хүсэж байна. Яаралтай шаардлагатай үед Potřebuji, харин хүсэлт илэрхийлэхэд Chci хэрэглэнэ.',
      a0c0031: 'Chci vodu. = Би ус хүсэж байна.',
      a0c0032: 'jídlo = хоол.',
      a0c0033: 'Chci jídlo. = Би хоол хүсэж байна.',
    },
    exercises: [
      { id: 'a0-2-c-1', type: 'choice', titleMn: 'Утгын ялгаа', promptMn: '“Би ус хүсэж байна” гэсэн хамгийн тохирох өгүүлбэр аль нь вэ?', choices: [{ id: 'a', text: 'Potřebuji vodu.' }, { id: 'b', text: 'Chci vodu.' }, { id: 'c', text: 'Potřebuji pomoc.' }], correctId: 'b', feedbackMn: 'Chci vodu. нь хүсэлт, сонголтоо илэрхийлж байна.' },
      { id: 'a0-2-c-2', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Би хоол хүсэж байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['jídlo.', 'Chci'], expectedText: 'Chci jídlo.', feedbackMn: 'Chci jídlo. = Би хоол хүсэж байна.' },
      { id: 'a0-2-c-3', type: 'choice', titleMn: 'Нөхцөлд сонгох', promptMn: 'Та хоолны сонголтоо хэлэх хэрэгтэй байна. Аль нь зөв бэ?', choices: [{ id: 'a', text: 'Chci jídlo.' }, { id: 'b', text: 'Potřebuji telefon.' }, { id: 'c', text: 'Potřebuji pomoc.' }], correctId: 'a', feedbackMn: 'Chci jídlo. = Би хоол хүсэж байна.' },
      { id: 'a0-2-c-4-match', type: 'match', titleMn: 'Хүсэлт тааруулах', promptMn: 'Хүсэлтүүдийг зөв Монгол утгатай нь холбо.', pairs: [{ id: 'want-water', czech: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.' }, { id: 'want-food', czech: 'Chci jídlo.', mongolian: 'Би хоол хүсэж байна.' }], feedbackMn: 'Ус болон хоол хүсэх хэллэгийг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-2-d',
    titleMn: '4/6 — Идэх юм, энэ зүйл',
    canDoMn: 'Идэх юм болон зааж байгаа зүйлийг хүсэж чадна.',
    cardIds: ['a0c0034', 'a0c0035', 'a0c0036', 'a0c0037'],
    instructions: {
      a0c0034: 'něco = ямар нэг зүйл.',
      a0c0035: 'k jídlu нь “идэх юм” гэсэн бэлэн хэллэгийн хэсэг. Одоохондоо бүтнээр нь хэрэглэнэ.',
      a0c0036: 'tohle = энэ зүйл, энийг.',
      a0c0037: 'Чиглүүлж заасан бараа, сонголтыг хүсэхэд хэрэглэнэ.',
    },
    exercises: [
      { id: 'a0-2-d-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Chci něco k jídlu.', choices: [{ id: 'a', text: 'Би идэх юм хүсэж байна.' }, { id: 'b', text: 'Би ус хүсэж байна.' }, { id: 'c', text: 'Надад утас хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Chci něco k jídlu. = Би идэх юм хүсэж байна.' },
      { id: 'a0-2-d-2', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Би үүнийг хүсэж байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['tohle.', 'Chci'], expectedText: 'Chci tohle.', feedbackMn: 'Chci tohle. = Би үүнийг хүсэж байна.' },
      { id: 'a0-2-d-3', type: 'choice', titleMn: 'Нөхцөлд сонгох', promptMn: 'Та дэлгүүрт заасан сэндвичээ авахыг хүсэж байна. Аль нь зөв бэ?', choices: [{ id: 'a', text: 'Chci tohle.' }, { id: 'b', text: 'Chci jídlo.' }, { id: 'c', text: 'Potřebuji telefon.' }], correctId: 'a', feedbackMn: 'Chci tohle. = Би үүнийг хүсэж байна.' },
      { id: 'a0-2-d-4-match', type: 'match', titleMn: 'Нарийвчилсан хүсэлт', promptMn: 'Хоёр хүсэлтийг зөв утгатай нь холбо.', pairs: [{ id: 'food', czech: 'Chci něco k jídlu.', mongolian: 'Би идэх юм хүсэж байна.' }, { id: 'this', czech: 'Chci tohle.', mongolian: 'Би үүнийг хүсэж байна.' }], feedbackMn: 'Нарийвчилсан хүсэлтүүдийг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-2-e',
    titleMn: '5/6 — Надад байхгүй',
    canDoMn: 'Мөнгө, карт байхгүйгээ хэлж чадна.',
    cardIds: ['a0c0038', 'a0c0039', 'a0c0040', 'a0c0041', 'a0c0042'],
    instructions: {
      a0c0038: 'Nemám = надад байхгүй.',
      a0c0039: 'peníze = мөнгө.',
      a0c0040: 'Nemám peníze. = Надад мөнгө байхгүй.',
      a0c0041: 'karta нь өгүүлбэрт kartu болж орно. Одоохондоо бүтнээр нь танина.',
      a0c0042: 'Nemám kartu. = Надад карт байхгүй.',
    },
    exercises: [
      { id: 'a0-2-e-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Nemám peníze.', choices: [{ id: 'a', text: 'Би мөнгө хүсэж байна.' }, { id: 'b', text: 'Надад мөнгө байхгүй.' }, { id: 'c', text: 'Надад ус хэрэгтэй.' }], correctId: 'b', feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.' },
      { id: 'a0-2-e-2', type: 'choice', titleMn: 'Нөхцөлд хариулах', promptMn: 'Та картаар төлж чадахгүй байна. Аль өгүүлбэр зөв бэ?', choices: [{ id: 'a', text: 'Nemám kartu.' }, { id: 'b', text: 'Chci kartu.' }, { id: 'c', text: 'Potřebuji kartu.' }], correctId: 'a', feedbackMn: 'Nemám kartu. = Надад карт байхгүй.' },
      { id: 'a0-2-e-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Надад мөнгө байхгүй” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['peníze.', 'Nemám'], expectedText: 'Nemám peníze.', feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.' },
      { id: 'a0-2-e-4-match', type: 'match', titleMn: 'Байхгүй зүйлээ хэлэх', promptMn: 'Хоёр өгүүлбэрийг зөв Монгол утгатай нь холбо.', pairs: [{ id: 'no-money', czech: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' }, { id: 'no-card', czech: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' }], feedbackMn: 'Мөнгө, карт байхгүйгээ зөв ялгалаа.' },
    ],
  },
  {
    id: 'a0-2-f',
    titleMn: '6/6 — Эелдгээр тусламж хүсэх',
    canDoMn: '“Танд юу хэрэгтэй вэ?” гэсэн асуултыг ойлгож, эелдгээр тусламж хүсэж чадна.',
    cardIds: ['a0c0043', 'a0c0044'],
    instructions: {
      a0c0043: 'Co potřebujete? = Танд юу хэрэгтэй вэ? Үйлчилгээний газар сонсогдож болно.',
      a0c0044: 'Эелдэг, аюулгүй тусламж хүсэх бэлэн хэллэг.',
    },
    exercises: [
      { id: 'a0-2-f-1', type: 'choice', titleMn: 'Асуулт ойлгох', promptMn: 'Co potřebujete? гэж асуувал юу гэсэн үг вэ?', choices: [{ id: 'a', text: 'Та хэн бэ?' }, { id: 'b', text: 'Танд юу хэрэгтэй вэ?' }, { id: 'c', text: 'Та хаана байна вэ?' }], correctId: 'b', feedbackMn: 'Co potřebujete? = Танд юу хэрэгтэй вэ?' },
      { id: 'a0-2-f-2', type: 'order', titleMn: 'Эелдэг хүсэлт бүтээх', promptMn: '“Надад туслаач, гуйя” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['pomoc,', 'Potřebuji', 'prosím.'], expectedText: 'Potřebuji pomoc, prosím.', feedbackMn: 'Potřebuji pomoc, prosím. = Надад туслаач, гуйя.' },
      { id: 'a0-2-f-3', type: 'choice', titleMn: 'Бодит хариулт', promptMn: 'Ресепшний ажилтан Co potřebujete? гэж асуулаа. Та эелдгээр тусламж хүсэх хэрэгтэй. Аль нь зөв бэ?', choices: [{ id: 'a', text: 'Potřebuji pomoc, prosím.' }, { id: 'b', text: 'Potřebuji pomoc.' }, { id: 'c', text: 'Na shledanou.' }], correctId: 'a', feedbackMn: 'Potřebuji pomoc, prosím. нь эелдэг хүсэлт.' },
    ],
  },
];

export const a0NeedsMission = [] as const;
