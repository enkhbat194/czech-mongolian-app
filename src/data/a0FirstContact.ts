import { czechWords, type CzechWord } from './czechWords';
import type { A0Exercise, A0MicroLesson } from './a0LessonSchema';

export type { A0Exercise, A0MicroLesson } from './a0LessonSchema';

const byId = new Map(czechWords.map((card) => [card.id, card]));

export const a0FirstContactCards: CzechWord[] = czechWords.filter((card) => card.lessonId === 'l001');

export const a0FirstContactMicroLessons: A0MicroLesson[] = [
  {
    id: 'a0-1-a',
    titleMn: '1/3 — Эхний уулзалт',
    canDoMn: 'Албан болон дотно мэндчилгээг ялгаж, баярлалаа, гуйя, тийм/үгүй, баяртай гэж хэлнэ.',
    cardIds: ['a0c0001', 'a0c0002', 'a0c0005', 'a0c0004', 'a0c0006', 'a0c0007', 'a0c0003'],
    instructions: {
      a0c0001: 'Ажил, дэлгүүр, байгууллага, үл таних хүнтэй уулзахдаа эхэлж хэрэглэнэ.',
      a0c0002: 'Найз, үе тэнгийн хүнтэй дотно үед хэрэглэнэ. Дарга, ресепшн, үл таних ахмад хүнд эхлээд бүү хэрэглэ.',
      a0c0005: 'Тусламж, бараа, мэдээлэл авсны дараа хэлнэ.',
      a0c0004: 'Эхний шатанд зөвхөн эелдэг хүсэлт эхлүүлэх дохио гэж танина.',
      a0c0006: 'Тийм.',
      a0c0007: 'Үгүй.',
      a0c0003: 'Албан болон саармаг “баяртай” хэлбэр.',
    },
    exercises: [
      { id: 'a0-1-a-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Dobrý den', choices: [{ id: 'a', text: 'Баяртай' }, { id: 'b', text: 'Баярлалаа' }, { id: 'c', text: 'Сайн байна уу' }, { id: 'd', text: 'Уучлаарай' }], correctId: 'c', feedbackMn: 'Dobrý den нь албан, аюулгүй мэндчилгээ.' },
      { id: 'a0-1-a-2', type: 'choice', titleMn: 'Нөхцөлд тохируулах', promptMn: 'Та ажил дээрээ анх удаа даргатайгаа уулзаж байна. Аль нь зөв бэ?', choices: [{ id: 'a', text: 'Ahoj' }, { id: 'b', text: 'Dobrý den' }], correctId: 'b', feedbackMn: 'Dobrý den нь ажил болон албан нөхцөлд эхний аюулгүй сонголт.' },
      { id: 'a0-1-a-3', type: 'choice', titleMn: 'Нөхцөлд хариулах', promptMn: 'Хэн нэгэн танд тусаллаа. Та юу гэж хэлэх вэ?', choices: [{ id: 'a', text: 'Na shledanou' }, { id: 'b', text: 'Děkuji' }, { id: 'c', text: 'Ne' }], correctId: 'b', feedbackMn: 'Děkuji = Баярлалаа.' },
      { id: 'a0-1-a-4', type: 'fillBlank', titleMn: 'Хоосон үг нөхөх', promptMn: 'Албан мэндчилгээг гүйцээ.', promptCzech: 'Dobrý ___.', choices: [{ id: 'a', text: 'děkuji' }, { id: 'b', text: 'den' }, { id: 'c', text: 'prosím' }], correctId: 'b', feedbackMn: 'Dobrý den. = Сайн байна уу.' },
    ],
  },
  {
    id: 'a0-1-b',
    titleMn: '2/3 — Нэрээ хэлэх',
    canDoMn: 'Нэрээ хэлж, хүний нэрийг албан хэлбэрээр асууж, “Та хэн бэ?” гэсэн асуултыг ойлгоно.',
    cardIds: ['a0c0008', 'a0c0009', 'a0c0010', 'a0c0011', 'a0c0012', 'a0c0013', 'a0c0014', 'a0c0015'],
    instructions: {
      a0c0008: 'být нь “байх” гэсэн суурь үйл үг. Энэ хичээлд Jsem / jste хэлбэрийг жишээн дотор л танина.',
      a0c0009: 'já = би.',
      a0c0010: 'vy нь үл таних хүн, ахмад хүн, ажил дээрх хүндэтгэлийн “та” хэлбэр.',
      a0c0011: 'jmenovat se = нэртэй байх. Эхлээд бэлэн хэлбэрээр ашиглана.',
      a0c0012: 'Албан хэлбэрээр “Таны нэр хэн бэ?” гэж асууна.',
      a0c0013: 'Нэрийнхээ өмнө Jmenuji se … гэж хэлнэ.',
      a0c0014: 'kdo = хэн.',
      a0c0015: 'Kdo jste? = Та хэн бэ? Ресепшн, хамгаалалттай хэсэг, ажил дээр сонсогдож болно.',
    },
    exercises: [
      { id: 'a0-1-b-1', type: 'choice', titleMn: 'Утга таних', promptMn: 'Энэ асуултын Монгол утгыг сонго.', promptCzech: 'Jak se jmenujete?', choices: [{ id: 'a', text: 'Та хаана байна?' }, { id: 'b', text: 'Таны нэр хэн бэ?' }, { id: 'c', text: 'Та хэдэн настай вэ?' }, { id: 'd', text: 'Та юу хүсэж байна?' }], correctId: 'b', feedbackMn: 'Jak se jmenujete? нь албан хэлбэрийн нэр асуулт.' },
      { id: 'a0-1-b-2', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: 'Нэрээ хэлэх үгсийг зөв дарааллаар байрлуул.', tokens: ['se', 'Jmenuji', '…'], expectedText: 'Jmenuji se …', feedbackMn: 'Нэрээ хэлэх суурь хэлбэр: Jmenuji se …' },
      { id: 'a0-1-b-3', type: 'choice', titleMn: 'Албан хэлбэр', promptMn: 'Та ресепшний ажилтнаас нэрийг нь асууж байна. Аль асуулт зөв бэ?', choices: [{ id: 'a', text: 'Kdo jste?' }, { id: 'b', text: 'Jak se jmenujete?' }], correctId: 'b', feedbackMn: 'Нэр асуухдаа Jak se jmenujete? гэж асууна.' },
      { id: 'a0-1-b-4-match', type: 'match', titleMn: 'Утга тааруулах', promptMn: 'Чех хэллэг ба Монгол утгыг зөв хослуул.', pairs: [{ id: 'name', czech: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' }, { id: 'ask-name', czech: 'Jak se jmenujete?', mongolian: 'Таны нэр хэн бэ?' }, { id: 'who', czech: 'Kdo jste?', mongolian: 'Та хэн бэ?' }], feedbackMn: 'Нэрээ хэлэх болон нэр асуух хэллэгүүдийг зөв таарууллаа.' },
      { id: 'a0-1-b-5', type: 'choice', titleMn: 'Утга тааруулах · 2/2', promptMn: 'Чех хэллэгийг зөв Монгол утгатай нь холбо.', promptCzech: 'Kdo jste?', choices: [{ id: 'a', text: 'Та хэн бэ?' }, { id: 'b', text: 'Та сайн уу?' }, { id: 'c', text: 'Та хаанаас ирсэн бэ?' }], correctId: 'a', feedbackMn: 'Kdo jste? = Та хэн бэ?' },
    ],
  },
  {
    id: 'a0-1-c',
    titleMn: '3/3 — Гарал ба хамгаалах хэллэг',
    canDoMn: '“Би Монголоос ирсэн” гэж хэлж, хурдан яриаг ойлгохгүй үед удаан ярихыг хүснэ.',
    cardIds: ['a0c0016', 'a0c0017', 'a0c0018', 'a0c0019', 'a0c0020', 'a0c0021', 'a0c0022', 'a0c0141', 'a0c0326', 'a0c0327'],
    instructions: {
      a0c0016: 'Jak se máte? = Та сайн уу? Албан асуулт.',
      a0c0017: 'Dobře. = Сайн.',
      a0c0018: 'Špatně. = Муу.',
      a0c0019: 'Odkud? = Хаанаас?',
      a0c0020: 'z = -аас, -ээс. Эхний шатанд Jsem z Mongolska. бүтцийн дотор хэрэглэнэ.',
      a0c0021: 'Өөрийгөө танилцуулах бэлэн хэлбэр. Улсын нэрийн дүрмийг дараа нь тайлбарлана.',
      a0c0022: 'mluvit = ярих. Дараах хамгаалах хэллэгийн утгыг ойлгоход ашиглана.',
      a0c0141: 'pomalu = удаанаар.',
      a0c0326: 'Энэ бол бэлэн хамгаалах хэллэг. Дүрмийг нь одоо ачаалахгүй.',
      a0c0327: 'Хэн нэгэн хурдан ярихад шууд хэрэглэнэ.',
    },
    exercises: [
      { id: 'a0-1-c-1', type: 'choice', titleMn: 'Сонсож таних', promptMn: 'Аудиог сонсоод зөв Монгол утгыг сонго.', audioText: 'Jsem z Mongolska.', choices: [{ id: 'a', text: 'Би Монголд ажилладаг.' }, { id: 'b', text: 'Би Монгол хэл мэдэхгүй.' }, { id: 'c', text: 'Би Монгол руу явж байна.' }, { id: 'd', text: 'Би Монголоос ирсэн.' }], correctId: 'd', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.' },
      { id: 'a0-1-c-2', type: 'choice', titleMn: 'Асуултад хариулах', promptMn: 'Jak se máte? гэсэн асуултад аль нь тохирох хариу вэ?', choices: [{ id: 'a', text: 'Odkud?' }, { id: 'b', text: 'Dobře.' }, { id: 'c', text: 'Na shledanou.' }], correctId: 'b', feedbackMn: 'Jak se máte? = Та сайн уу? Dobře. = Сайн.' },
      { id: 'a0-1-c-3', type: 'order', titleMn: 'Өгүүлбэр бүтээх', promptMn: '“Би Монголоос ирсэн” гэсэн өгүүлбэрийг зөв дарааллаар байрлуул.', tokens: ['z', 'Jsem', 'Mongolska.'], expectedText: 'Jsem z Mongolska.', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.' },
      { id: 'a0-1-c-4', type: 'choice', titleMn: 'Яаралтай хэрэглэх хэллэг', promptMn: 'Хэн нэгэн хэт хурдан ярьж байна. Юу гэж хэлэх вэ?', choices: [{ id: 'a', text: 'Na shledanou.' }, { id: 'b', text: 'Kdo jste?' }, { id: 'c', text: 'Mluvte prosím pomalu.' }], correctId: 'c', feedbackMn: 'Mluvte prosím pomalu. = Удаан ярьж өгнө үү.' },
      { id: 'a0-1-c-5-match', type: 'match', titleMn: 'Утга тааруулах', promptMn: 'Чехийн хамгаалах хэллэг ба Монгол утгыг зөв хослуул.', pairs: [{ id: 'from-mongolia', czech: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.' }, { id: 'dont-understand', czech: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' }, { id: 'slowly', czech: 'Mluvte prosím pomalu.', mongolian: 'Удаан ярьж өгнө үү.' }], feedbackMn: 'Өөрийгөө танилцуулах болон ойлгохгүй үед хэрэглэх хэллэгүүдийг зөв таарууллаа.' },
      { id: 'a0-1-c-6', type: 'choice', titleMn: 'Утга тааруулах · 2/2', promptMn: 'Чех хэллэгийг зөв Монгол утгатай нь холбо.', promptCzech: 'Nerozumím.', choices: [{ id: 'a', text: 'Би удаан ярьж байна.' }, { id: 'b', text: 'Би ойлгохгүй байна.' }, { id: 'c', text: 'Би Монголоос ирсэн.' }], correctId: 'b', feedbackMn: 'Nerozumím. = Би ойлгохгүй байна.' },
    ],
  },
];

export const a0FirstContactMission = [] as const;

export function getA0FirstContactCard(id: string): CzechWord {
  const card = byId.get(id);
  if (!card) throw new Error(`A0.1 карт олдсонгүй: ${id}`);
  return card;
}