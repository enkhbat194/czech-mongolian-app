import { czechWords, type CzechWord } from './czechWords';
import type { A0MicroLesson } from './a0LessonSchema';

export type { A0Exercise, A0MicroLesson } from './a0LessonSchema';

const byId = new Map(czechWords.map((card) => [card.id, card]));

export const a0FirstContactCards: CzechWord[] = czechWords.filter((card) => card.lessonId === 'l001');

export const a0FirstContactMicroLessons: A0MicroLesson[] = [
  {
    id: 'a0-1-a',
    titleMn: '1/6 — Албан мэндчилгээ',
    canDoMn: 'Албан нөхцөлд зөв мэндэлж, баярлалаа болон гуйя гэсэн эелдэг хэллэгийг хэрэглэж чадна.',
    cardIds: ['a0c0001', 'a0c0002', 'a0c0005', 'a0c0004'],
    instructions: {
      a0c0001: 'Ажил, дэлгүүр, байгууллага, үл таних хүнтэй уулзахдаа эхэлж хэрэглэнэ.',
      a0c0002: 'Найз, үе тэнгийн хүнтэй дотно үед хэрэглэнэ. Ресепшн, дарга, үл таних хүнд эхлээд бүү хэрэглэ.',
      a0c0005: 'Тусламж, бараа, мэдээлэл авсны дараа хэлнэ.',
      a0c0004: 'Эелдэг хүсэлт эхлүүлэхэд болон хүнээс юм авахад сонсогдоно.',
    },
    exercises: [
      { id: 'a0-1-a-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Dobrý den.', choices: [{ id: 'a', text: 'Баяртай.' }, { id: 'b', text: 'Баярлалаа.' }, { id: 'c', text: 'Сайн байна уу.' }, { id: 'd', text: 'Уучлаарай.' }], correctId: 'c', feedbackMn: 'Dobrý den. нь албан, аюулгүй мэндчилгээ.' },
      { id: 'a0-1-a-2', type: 'choice', titleMn: 'Нөхцөлд хэрэглэх', promptMn: 'Та ажил дээрээ анх удаа даргатайгаа уулзаж байна. Аль нь зөв бэ?', choices: [{ id: 'a', text: 'Ahoj.' }, { id: 'b', text: 'Dobrý den.' }, { id: 'c', text: 'Děkuji.' }], correctId: 'b', feedbackMn: 'Dobrý den. нь ажил болон албан нөхцөлд эхний аюулгүй сонголт.' },
      { id: 'a0-1-a-3', type: 'fillBlank', titleMn: 'Хоосон үг нөхөх', promptMn: 'Хэн нэгэн танд тусаллаа. Талархлаа гүйцээ.', promptCzech: '___ .', choices: [{ id: 'a', text: 'Děkuji' }, { id: 'b', text: 'Ahoj' }, { id: 'c', text: 'Prosím' }], correctId: 'a', feedbackMn: 'Děkuji. = Баярлалаа.' },
    ],
  },
  {
    id: 'a0-1-b',
    titleMn: '2/6 — Тийм, үгүй, баяртай',
    canDoMn: 'Тийм, үгүй гэж хариулж, албан хэлбэрээр яриаг дуусгаж чадна.',
    cardIds: ['a0c0006', 'a0c0007', 'a0c0003'],
    instructions: { a0c0006: 'Ano. = Тийм.', a0c0007: 'Ne. = Үгүй.', a0c0003: 'Албан болон саармаг “баяртай” хэлбэр.' },
    exercises: [
      { id: 'a0-1-b-1', type: 'choice', titleMn: 'Хариулт сонгох', promptMn: 'Та зөвшөөрч байна. Аль хариултыг хэлэх вэ?', choices: [{ id: 'a', text: 'Ano.' }, { id: 'b', text: 'Ne.' }, { id: 'c', text: 'Na shledanou.' }], correctId: 'a', feedbackMn: 'Ano. = Тийм.' },
      { id: 'a0-1-b-2', type: 'choice', titleMn: 'Яриа дуусгах', promptMn: 'Та албан яриаг дуусгаж байна. Аль нь тохирох вэ?', choices: [{ id: 'a', text: 'Ahoj.' }, { id: 'b', text: 'Děkuji.' }, { id: 'c', text: 'Na shledanou.' }], correctId: 'c', feedbackMn: 'Na shledanou. = Албан болон саармаг баяртай.' },
      { id: 'a0-1-b-3-match', type: 'match', titleMn: 'Утга тааруулах', promptMn: 'Богино хариултуудыг зөв Монгол утгатай нь холбо.', pairs: [{ id: 'yes', czech: 'Ano.', mongolian: 'Тийм.' }, { id: 'no', czech: 'Ne.', mongolian: 'Үгүй.' }, { id: 'bye', czech: 'Na shledanou.', mongolian: 'Баяртай.' }], feedbackMn: 'Богино хариултуудыг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-1-c',
    titleMn: '3/6 — Нэрээ хэлэх',
    canDoMn: 'Өөрийн нэрийг энгийн, албан хэлбэрээр хэлж чадна.',
    cardIds: ['a0c0008', 'a0c0009', 'a0c0011', 'a0c0013'],
    instructions: { a0c0008: 'být нь “байх” гэсэн суурь үйл үг.', a0c0009: 'já = би.', a0c0011: 'jmenovat se = нэртэй байх.', a0c0013: 'Нэрийнхээ өмнө Jmenuji se … гэж хэлнэ.' },
    exercises: [
      { id: 'a0-1-c-1', type: 'choice', titleMn: 'Утга таних', promptMn: 'Jmenuji se Eba. ямар утгатай вэ?', choices: [{ id: 'a', text: 'Миний нэр Эба.' }, { id: 'b', text: 'Та хэн бэ?' }, { id: 'c', text: 'Би Монголоос ирсэн.' }], correctId: 'a', feedbackMn: 'Jmenuji se Eba. = Миний нэр Эба.' },
      { id: 'a0-1-c-2', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: 'Нэрээ хэлэх үгсийг зөв дарааллаар байрлуул.', tokens: ['se', 'Jmenuji', 'Eba.'], expectedText: 'Jmenuji se Eba.', feedbackMn: 'Jmenuji se Eba. = Миний нэр Эба.' },
      { id: 'a0-1-c-3-match', type: 'match', titleMn: 'Хэллэгийн хэсэг', promptMn: 'Нэрээ хэлэхэд хэрэгтэй хэсгүүдийг утгатай нь тааруул.', pairs: [{ id: 'i', czech: 'já', mongolian: 'би' }, { id: 'named', czech: 'jmenovat se', mongolian: 'нэртэй байх' }, { id: 'my-name', czech: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' }], feedbackMn: 'Нэрээ хэлэх гол хэсгүүдийг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-1-d',
    titleMn: '4/6 — Нэр асуух',
    canDoMn: 'Хүний нэрийг асууж, “Та хэн бэ?” гэсэн асуултыг ойлгож чадна.',
    cardIds: ['a0c0010', 'a0c0012', 'a0c0014', 'a0c0015'],
    instructions: { a0c0010: 'vy нь үл таних хүн, ахмад хүн, ажил дээрх хүндэтгэлийн “та” хэлбэр.', a0c0012: 'Албан хэлбэрээр “Таны нэр хэн бэ?” гэж асууна.', a0c0014: 'kdo = хэн.', a0c0015: 'Kdo jste? = Та хэн бэ? Ресепшн, хамгаалалттай хэсэг, ажил дээр сонсогдож болно.' },
    exercises: [
      { id: 'a0-1-d-1', type: 'choice', titleMn: 'Асуултыг ойлгох', promptMn: 'Jak se jmenujete? ямар утгатай вэ?', choices: [{ id: 'a', text: 'Та хаанаас ирсэн бэ?' }, { id: 'b', text: 'Таны нэр хэн бэ?' }, { id: 'c', text: 'Та сайн уу?' }], correctId: 'b', feedbackMn: 'Jak se jmenujete? = Таны нэр хэн бэ?' },
      { id: 'a0-1-d-2', type: 'choice', titleMn: 'Ресепшний асуулт', promptMn: 'Хамгаалалтын ажилтан таныг танихгүй байна. Аль асуултыг сонсож магадгүй вэ?', choices: [{ id: 'a', text: 'Kdo jste?' }, { id: 'b', text: 'Jmenuji se Eba.' }, { id: 'c', text: 'Dobře.' }], correctId: 'a', feedbackMn: 'Kdo jste? = Та хэн бэ?' },
      { id: 'a0-1-d-3-match', type: 'match', titleMn: 'Асуулт тааруулах', promptMn: 'Чех асуултуудыг зөв Монгол утгатай нь холбо.', pairs: [{ id: 'ask-name', czech: 'Jak se jmenujete?', mongolian: 'Таны нэр хэн бэ?' }, { id: 'who', czech: 'Kdo jste?', mongolian: 'Та хэн бэ?' }], feedbackMn: 'Нэр асуух болон хүнийг тодруулах асуултыг зөв таарууллаа.' },
    ],
  },
  {
    id: 'a0-1-e',
    titleMn: '5/6 — Сайн байна уу, хаанаас ирсэн бэ?',
    canDoMn: 'Биеийн байдлаа хэлж, Монголоос ирснээ хэлж чадна.',
    cardIds: ['a0c0016', 'a0c0017', 'a0c0018', 'a0c0019', 'a0c0020', 'a0c0021'],
    instructions: { a0c0016: 'Jak se máte? = Та сайн уу? Албан асуулт.', a0c0017: 'Dobře. = Сайн.', a0c0018: 'Špatně. = Муу.', a0c0019: 'Odkud? = Хаанаас?', a0c0020: 'z = -аас, -ээс.', a0c0021: 'Өөрийгөө танилцуулах бэлэн хэлбэр.' },
    exercises: [
      { id: 'a0-1-e-1', type: 'choice', titleMn: 'Асуултад хариулах', promptMn: 'Jak se máte? гэсэн асуултад аль нь тохирох хариу вэ?', choices: [{ id: 'a', text: 'Odkud?' }, { id: 'b', text: 'Dobře.' }, { id: 'c', text: 'Na shledanou.' }], correctId: 'b', feedbackMn: 'Jak se máte? = Та сайн уу? Dobře. = Сайн.' },
      { id: 'a0-1-e-2', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Jsem z Mongolska.', choices: [{ id: 'a', text: 'Би Монголд ажилладаг.' }, { id: 'b', text: 'Би Монгол хэл мэдэхгүй.' }, { id: 'c', text: 'Би Монголоос ирсэн.' }, { id: 'd', text: 'Би Монгол руу явж байна.' }], correctId: 'c', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.' },
      { id: 'a0-1-e-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Би Монголоос ирсэн” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['z', 'Jsem', 'Mongolska.'], expectedText: 'Jsem z Mongolska.', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.' },
      { id: 'a0-1-e-4', type: 'choice', titleMn: 'Утгын ялгаа', promptMn: 'Špatně. ямар утгатай вэ?', choices: [{ id: 'a', text: 'Сайн.' }, { id: 'b', text: 'Муу.' }, { id: 'c', text: 'Баярлалаа.' }], correctId: 'b', feedbackMn: 'Špatně. = Муу.' },
    ],
  },
  {
    id: 'a0-1-f',
    titleMn: '6/6 — Ойлгохгүй үед',
    canDoMn: 'Ойлгохгүй байгаагаа хэлж, удаан ярихыг хүсэж чадна.',
    cardIds: ['a0c0022', 'a0c0141', 'a0c0326', 'a0c0327', 'a0c0100'],
    instructions: {
      a0c0022: 'mluvit = ярих. Хамгаалах хэллэгийн утгыг ойлгоход ашиглана.',
      a0c0141: 'pomalu = удаанаар.',
      a0c0326: 'Nerozumím. = Би ойлгохгүй байна.',
      a0c0327: 'Mluvte prosím pomalu. = Удаан ярьж өгнө үү.',
      a0c0100: 'Mluvím moc rychle? = Би хэт хурдан ярьж байна уу? Нөгөө хүн таныг ойлгож байгаа эсэхээ шалгаж асуухад сонсож болно.',
    },
    exercises: [
      { id: 'a0-1-f-1', type: 'choice', titleMn: 'Яаралтай хэрэглэх хэллэг', promptMn: 'Хэн нэгэн хэт хурдан ярьж байна. Та эхлээд ойлгохгүй байгаагаа хэлэх хэрэгтэй. Аль нь зөв бэ?', choices: [{ id: 'a', text: 'Nerozumím.' }, { id: 'b', text: 'Na shledanou.' }, { id: 'c', text: 'Jmenuji se Eba.' }], correctId: 'a', feedbackMn: 'Nerozumím. = Би ойлгохгүй байна.' },
      { id: 'a0-1-f-2', type: 'order', titleMn: 'Хамгаалах хэллэг бүтээх', promptMn: '“Удаан ярьж өгнө үү” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['prosím', 'Mluvte', 'pomalu.'], expectedText: 'Mluvte prosím pomalu.', feedbackMn: 'Mluvte prosím pomalu. = Удаан ярьж өгнө үү.' },
      { id: 'a0-1-f-3-match', type: 'match', titleMn: 'Хамгаалах хэллэг тааруулах', promptMn: 'Ойлгохгүй үед хэрэглэх хэсгүүдийг зөв утгатай нь холбо.', pairs: [{ id: 'dont-understand', czech: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' }, { id: 'slowly', czech: 'pomalu', mongolian: 'удаанаар' }, { id: 'speak-slowly', czech: 'Mluvte prosím pomalu.', mongolian: 'Удаан ярьж өгнө үү.' }], feedbackMn: 'Хамгаалах хэллэгийг зөв таарууллаа.' },
      { id: 'a0-1-f-4', type: 'choice', titleMn: 'Асуултыг ойлгох', promptMn: 'Mluvím moc rychle? гэж асуувал юу гэсэн үг вэ?', choices: [{ id: 'a', text: 'Би хэт хурдан ярьж байна уу?' }, { id: 'b', text: 'Та удаан ярьж өгнө үү.' }, { id: 'c', text: 'Би ойлгохгүй байна.' }], correctId: 'a', feedbackMn: 'Mluvím moc rychle? = Би хэт хурдан ярьж байна уу?' },
    ],
  },
];

export const a0FirstContactMission = [] as const;

export function getA0FirstContactCard(id: string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.1 карт олдсонгүй: ${id}`);
  return card;
}
