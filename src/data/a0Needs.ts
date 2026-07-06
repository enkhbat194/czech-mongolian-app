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
    titleMn: '1/3 — Яаралтай хэрэгтэй зүйл',
    canDoMn: 'Тусламж, ус, утас хэрэгтэйгээ эелдгээр хэлж чадна.',
    cardIds: ['a0c0023', 'a0c0024', 'a0c0025', 'a0c0026', 'a0c0027', 'a0c0028', 'a0c0029'],
    instructions: {
      a0c0023: 'Potřebuji гэдэг нь “надад хэрэгтэй” гэсэн бэлэн хэлбэр. Дараа нь хэрэгтэй зүйлээ залгана.',
      a0c0024: 'pomoc = тусламж.',
      a0c0025: 'Асуудал гарсан үед шууд хэрэглэж болох хамгийн чухал өгүүлбэрийн нэг.',
      a0c0026: 'voda үг нь өгүүлбэрт vodu болж орно. Одоохондоо бүтнээр нь танина.',
      a0c0027: 'Ус хүсэхэд хэрэглэнэ.',
      a0c0028: 'telefon = утас.',
      a0c0029: 'Өөрийн утас байхгүй, холбогдох шаардлагатай үед хэрэглэж болно.',
    },
    exercises: [
      {
        id: 'a0-2-a-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв утгыг сонго.', audioText: 'Potřebuji pomoc.',
        choices: [{ id: 'a', text: 'Би туслахыг хүсэж байна.' }, { id: 'b', text: 'Надад ус хэрэгтэй.' }, { id: 'c', text: 'Надад тусламж хэрэгтэй.' }, { id: 'd', text: 'Би ойлгохгүй байна.' }], correctId: 'c',
        feedbackMn: 'Potřebuji pomoc. = Надад тусламж хэрэгтэй.',
      },
      {
        id: 'a0-2-a-2', type: 'choice', titleMn: 'Нөхцөлд хэрэглэх', promptMn: 'Та ус авах хэрэгтэй байна. Аль өгүүлбэр зөв бэ?',
        choices: [{ id: 'a', text: 'Nemám vodu.' }, { id: 'b', text: 'Potřebuji vodu.' }, { id: 'c', text: 'Chci telefon.' }], correctId: 'b',
        feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.',
      },
      {
        id: 'a0-2-a-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Надад ус хэрэгтэй” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.',
        tokens: ['vodu.', 'Potřebuji'], expectedText: 'Potřebuji vodu.', feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.',
      },
      {
        id: 'a0-2-a-4', type: 'choice', titleMn: 'Утга таних', promptMn: 'Potřebuji telefon. ямар утгатай вэ?',
        choices: [{ id: 'a', text: 'Би утас хүсэж байна.' }, { id: 'b', text: 'Миний утас ажиллахгүй байна.' }, { id: 'c', text: 'Утсаар ярьж болох уу?' }, { id: 'd', text: 'Надад утас хэрэгтэй.' }], correctId: 'd',
        feedbackMn: 'Potřebuji telefon. = Надад утас хэрэгтэй.',
      },
      {
        id: 'a0-2-a-5', type: 'choice', titleMn: 'Нөхцөлд хариулах', promptMn: 'Та ресепшнд очоод тусламж хүсэх хэрэгтэй байна. Аль өгүүлбэрийг хэлэх вэ?',
        choices: [{ id: 'a', text: 'Nemám kartu.' }, { id: 'b', text: 'Potřebuji pomoc, prosím.' }, { id: 'c', text: 'Na shledanou.' }], correctId: 'b',
        feedbackMn: 'Эелдэг тусламж хүсэхдээ Potřebuji pomoc, prosím. гэж хэлнэ.',
      },
    ],
  },
  {
    id: 'a0-2-b',
    titleMn: '2/3 — Би юу хүсэж байна',
    canDoMn: 'Ус, хоол, заасан зүйлийг хүсэж байгаагаа энгийнээр хэлж чадна.',
    cardIds: ['a0c0030', 'a0c0031', 'a0c0032', 'a0c0033', 'a0c0034', 'a0c0035', 'a0c0036', 'a0c0037'],
    instructions: {
      a0c0030: 'Chci = би хүсэж байна. Яаралтай шаардлагатай үед Potřebuji, харин хүсэлт илэрхийлэхэд Chci хэрэглэнэ.',
      a0c0031: 'Chci vodu. = Би ус хүсэж байна.',
      a0c0032: 'jídlo = хоол.',
      a0c0033: 'Chci jídlo. = Би хоол хүсэж байна.',
      a0c0034: 'něco = ямар нэг зүйл.',
      a0c0035: 'k jídlu нь “идэх юм” гэсэн бэлэн хэллэгийн хэсэг. Одоохондоо бүтнээр нь хэрэглэнэ.',
      a0c0036: 'tohle = энэ зүйл, энийг.',
      a0c0037: 'Чиглүүлж заасан бараа, сонголтыг хүсэхэд хэрэглэнэ.',
    },
    exercises: [
      {
        id: 'a0-2-b-1', type: 'choice', titleMn: 'Утгын ялгаа', promptMn: '“Би ус хүсэж байна” гэсэн хамгийн тохирох өгүүлбэр аль нь вэ?',
        choices: [{ id: 'a', text: 'Nemám vodu.' }, { id: 'b', text: 'Co potřebujete?' }, { id: 'c', text: 'Chci vodu.' }], correctId: 'c',
        feedbackMn: 'Chci vodu. нь хүсэлт, сонголтоо илэрхийлж байна.',
      },
      {
        id: 'a0-2-b-2', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Chci něco k jídlu.',
        choices: [{ id: 'a', text: 'Надад ус хэрэгтэй.' }, { id: 'b', text: 'Надад хоол байхгүй.' }, { id: 'c', text: 'Би хоол идсэн.' }, { id: 'd', text: 'Би идэх юм хүсэж байна.' }], correctId: 'd',
        feedbackMn: 'Chci něco k jídlu. = Би идэх юм хүсэж байна.',
      },
      {
        id: 'a0-2-b-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Би үүнийг хүсэж байна” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.',
        tokens: ['tohle.', 'Chci'], expectedText: 'Chci tohle.', feedbackMn: 'Chci tohle. = Би үүнийг хүсэж байна.',
      },
      {
        id: 'a0-2-b-4', type: 'choice', titleMn: 'Нөхцөлд сонгох', promptMn: 'Та дэлгүүрт заасан сэндвичээ авахыг хүсэж байна. Аль нь зөв бэ?',
        choices: [{ id: 'a', text: 'Chci tohle.' }, { id: 'b', text: 'Nemám tohle.' }, { id: 'c', text: 'Potřebuji kartu.' }], correctId: 'a',
        feedbackMn: 'Chci tohle. = Би үүнийг хүсэж байна.',
      },
      {
        id: 'a0-2-b-5', type: 'choice', titleMn: 'Хэллэг ялгах', promptMn: 'Аль өгүүлбэр “Би хоол хүсэж байна” гэсэн утгатай вэ?',
        choices: [{ id: 'a', text: 'Potřebuji pomoc.' }, { id: 'b', text: 'Chci jídlo.' }, { id: 'c', text: 'Nemám peníze.' }], correctId: 'b',
        feedbackMn: 'Chci jídlo. = Би хоол хүсэж байна.',
      },
    ],
  },
  {
    id: 'a0-2-c',
    titleMn: '3/3 — Байхгүй зүйлээ хэлэх',
    canDoMn: 'Мөнгө, карт байхгүйгээ хэлж, “Танд юу хэрэгтэй вэ?” гэсэн асуултыг ойлгоно.',
    cardIds: ['a0c0038', 'a0c0039', 'a0c0040', 'a0c0041', 'a0c0042', 'a0c0043', 'a0c0044'],
    instructions: {
      a0c0038: 'Nemám = надад байхгүй.',
      a0c0039: 'peníze = мөнгө.',
      a0c0040: 'Nemám peníze. = Надад мөнгө байхгүй.',
      a0c0041: 'karta нь өгүүлбэрт kartu болж орно. Одоохондоо бүтнээр нь танина.',
      a0c0042: 'Nemám kartu. = Надад карт байхгүй.',
      a0c0043: 'Co potřebujete? = Танд юу хэрэгтэй вэ? Үйлчилгээний газар сонсогдож болно.',
      a0c0044: 'Эелдэг, аюулгүй тусламж хүсэх бэлэн хэллэг.',
    },
    exercises: [
      {
        id: 'a0-2-c-1', type: 'choice', titleMn: 'Асуулт ойлгох', promptMn: 'Co potřebujete? гэж асуувал юу гэсэн үг вэ?',
        choices: [{ id: 'a', text: 'Та хэн бэ?' }, { id: 'b', text: 'Та хаана байна вэ?' }, { id: 'c', text: 'Танд юу хэрэгтэй вэ?' }, { id: 'd', text: 'Та хэдэн төгрөгтэй вэ?' }], correctId: 'c',
        feedbackMn: 'Co potřebujete? = Танд юу хэрэгтэй вэ?',
      },
      {
        id: 'a0-2-c-2', type: 'choice', titleMn: 'Нөхцөлд хариулах', promptMn: 'Та картаар төлж чадахгүй байна. Аль өгүүлбэр зөв бэ?',
        choices: [{ id: 'a', text: 'Chci kartu.' }, { id: 'b', text: 'Nemám kartu.' }, { id: 'c', text: 'Potřebuji jídlo.' }], correctId: 'b',
        feedbackMn: 'Nemám kartu. = Надад карт байхгүй.',
      },
      {
        id: 'a0-2-c-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: 'Эелдгээр тусламж хүсэх өгүүлбэрийг зөв дарааллаар байрлуул.',
        tokens: ['pomoc,', 'Potřebuji', 'prosím.'], expectedText: 'Potřebuji pomoc, prosím.', feedbackMn: 'Potřebuji pomoc, prosím. = Надад туслаач.',
      },
      {
        id: 'a0-2-c-4', type: 'choice', titleMn: 'Утга таних', promptMn: 'Nemám peníze. ямар утгатай вэ?',
        choices: [{ id: 'a', text: 'Би мөнгө хүсэж байна.' }, { id: 'b', text: 'Надад мөнгө хэрэгтэй.' }, { id: 'c', text: 'Би картаар төлнө.' }, { id: 'd', text: 'Надад мөнгө байхгүй.' }], correctId: 'd',
        feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.',
      },
      {
        id: 'a0-2-c-5', type: 'choice', titleMn: 'Хариулт сонгох', promptMn: 'Та мөнгөгүй болсон байна. Аль өгүүлбэрийг хэлэх вэ?',
        choices: [{ id: 'a', text: 'Chci peníze.' }, { id: 'b', text: 'Potřebuji telefon.' }, { id: 'c', text: 'Nemám peníze.' }], correctId: 'c',
        feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.',
      },
    ],
  },
];

export const a0NeedsMission: A0DialogueStep[] = [
  {
    id: 'a0-2-m1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.',
    promptMn: 'Та эхлээд тусламж хүсэх хэрэгтэй. Аль хариултыг сонгох вэ?',
    choices: [{ id: 'a', text: 'Na shledanou.' }, { id: 'b', text: 'Chci telefon.' }, { id: 'c', text: 'Potřebuji pomoc, prosím.' }], correctId: 'c',
    feedbackMn: 'Та хэрэгцээгээ эелдгээр, ойлгомжтой хэллээ.',
  },
  {
    id: 'a0-2-m2', speaker: 'Ресепшний ажилтан', staffCzech: 'Voda?', staffMn: 'Ус?',
    promptMn: 'Танд ус хэрэгтэй байна. Аль хариулт тохирох вэ?',
    choices: [{ id: 'a', text: 'Ano, prosím.' }, { id: 'b', text: 'Nemám vodu.' }, { id: 'c', text: 'Nerozumím.' }], correctId: 'a',
    feedbackMn: 'Ano, prosím. = Тийм, гуйя.',
  },
  {
    id: 'a0-2-m3', speaker: 'Ресепшний ажилтан', staffCzech: 'Jídlo?', staffMn: 'Хоол?',
    promptMn: 'Та идэх юм хүсэж байгаагаа хэлэх хэрэгтэй. Аль хариулт тохирох вэ?',
    choices: [{ id: 'a', text: 'Nemám kartu.' }, { id: 'b', text: 'Ano, chci něco k jídlu.' }, { id: 'c', text: 'Potřebuji telefon.' }], correctId: 'b',
    feedbackMn: 'Chci něco k jídlu. = Би идэх юм хүсэж байна.',
  },
  {
    id: 'a0-2-m4', speaker: 'Ресепшний ажилтан', staffCzech: 'Karta?', staffMn: 'Карт?',
    promptMn: 'Танд карт байхгүй. Аль хариулт зөв бэ?',
    choices: [{ id: 'a', text: 'Chci kartu.' }, { id: 'b', text: 'Nemám kartu.' }, { id: 'c', text: 'Potřebuji kartu.' }], correctId: 'b',
    feedbackMn: 'Nemám kartu. = Надад карт байхгүй.',
  },
  {
    id: 'a0-2-m5', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobře.', staffMn: 'За.',
    promptMn: 'Яриаг эелдгээр дуусгахын тулд юу гэж хэлэх вэ?',
    choices: [{ id: 'a', text: 'Děkuji.' }, { id: 'b', text: 'Ne.' }, { id: 'c', text: 'Kdo jste?' }], correctId: 'a',
    feedbackMn: 'Děkuji. = Баярлалаа.',
  },
];
