export type A0FinalMissionQuestionType = 'choice' | 'listening' | 'typing' | 'dialogue';

export interface A0FinalMissionChoice {
  id: string;
  text: string;
  mongolian: string;
}

export interface A0FinalMissionQuestion {
  id: string;
  type: A0FinalMissionQuestionType;
  titleMn: string;
  promptMn: string;
  staffCzech?: string;
  staffMn?: string;
  czech?: string;
  expectedText?: string;
  acceptedAnswers?: string[];
  choices?: A0FinalMissionChoice[];
  correctId?: string;
  targetId?: string;
  feedbackMn: string;
}

export interface A0FinalMissionSection {
  id: string;
  titleMn: string;
  goalMn: string;
  questions: A0FinalMissionQuestion[];
}

const choices = (items: Array<[string, string, string]>): A0FinalMissionChoice[] => items.map(([id, text, mongolian]) => ({ id, text, mongolian }));

export const a0FinalMissionSections: A0FinalMissionSection[] = [
  {
    id: 'listening',
    titleMn: 'Сонсож таних',
    goalMn: 'Чехээр сонсоод аль хэллэг байсныг сонгоно.',
    questions: [
      {
        id: 'a0-final-listen-write',
        type: 'listening',
        titleMn: 'Сонсох 1',
        promptMn: 'Дууг сонсоод сонссон Чех хэллэгээ сонго.',
        czech: 'Napište mi to, prosím.',
        targetId: 'a0c0146',
        choices: choices([
          ['a', 'Zavolejte prosím doktora.', 'Эмч дуудаж өгнө үү.'],
          ['b', 'Napište mi to, prosím.', 'Үүнийг бичиж өгнө үү.'],
          ['c', 'Tašku, prosím.', 'Уут өгнө үү.'],
        ]),
        correctId: 'b',
        feedbackMn: 'Napište mi to, prosím. = Үүнийг бичиж өгнө үү.',
      },
      {
        id: 'a0-final-listen-ambulance',
        type: 'listening',
        titleMn: 'Сонсох 2',
        promptMn: 'Дууг сонсоод сонссон Чех хэллэгээ сонго.',
        czech: 'Zavolejte prosím sanitku.',
        targetId: 'a0c0178',
        choices: choices([
          ['a', 'Zavolejte prosím policii.', 'Цагдаа дуудаж өгнө үү.'],
          ['b', 'Zavolejte prosím sanitku.', 'Түргэн тусламж дуудаж өгнө үү.'],
          ['c', 'Zavolejte prosím doktora.', 'Эмч дуудаж өгнө үү.'],
        ]),
        correctId: 'b',
        feedbackMn: 'Sanitka нь түргэн тусламж гэсэн утгатай.',
      },
    ],
  },
  {
    id: 'meaning',
    titleMn: 'Утга таних',
    goalMn: 'Чех хэллэгийн Монгол утгыг сонгоно.',
    questions: [
      {
        id: 'a0-final-meaning-cold',
        type: 'choice',
        titleMn: 'Утга 1',
        promptMn: 'Зөв Монгол утгыг сонго.',
        czech: 'Je mi zima.',
        targetId: 'a0c0165',
        choices: choices([
          ['a', 'Je mi teplo.', 'Би халууцаж байна.'],
          ['b', 'Je mi zima.', 'Би даарч байна.'],
          ['c', 'Dnes je zima.', 'Өнөөдөр хүйтэн байна.'],
        ]),
        correctId: 'b',
        feedbackMn: 'Je mi zima. = Би даарч байна.',
      },
      {
        id: 'a0-final-meaning-key',
        type: 'choice',
        titleMn: 'Утга 2',
        promptMn: 'Зөв Монгол утгыг сонго.',
        czech: 'Nemám klíč.',
        targetId: 'a0c0129',
        choices: choices([
          ['a', 'Mám klíč.', 'Надад түлхүүр байна.'],
          ['b', 'Nemám klíč.', 'Надад түлхүүр байхгүй.'],
          ['c', 'Pokoj je tady.', 'Өрөө энд байна.'],
        ]),
        correctId: 'b',
        feedbackMn: 'Nemám klíč. = Надад түлхүүр байхгүй.',
      },
    ],
  },
  {
    id: 'typing',
    titleMn: 'Өөрөө бичих',
    goalMn: 'Санаж байвал өөрөө бичнэ. Мэдэхгүй бол хариуг харж үргэлжилж болно.',
    questions: [
      {
        id: 'a0-final-type-understand',
        type: 'typing',
        titleMn: 'Бичих 1',
        promptMn: '“Би ойлгохгүй байна.” гэж Чехээр бичээд үз.',
        expectedText: 'Nerozumím.',
        acceptedAnswers: ['Nerozumím.', 'Nerozumím'],
        targetId: 'a0c0012',
        feedbackMn: 'Nerozumím. гэж богино, шууд хэлнэ.',
      },
      {
        id: 'a0-final-type-czech',
        type: 'typing',
        titleMn: 'Бичих 2',
        promptMn: '“Би бага зэрэг чехээр ярьдаг.” гэж Чехээр бичээд үз.',
        expectedText: 'Mluvím trochu česky.',
        acceptedAnswers: ['Mluvím trochu česky.', 'Mluvím trochu česky'],
        targetId: 'a0c0185',
        feedbackMn: 'Mluvím trochu česky. = Би бага зэрэг чехээр ярьдаг.',
      },
    ],
  },
  {
    id: 'dialogue',
    titleMn: 'Ярианы шийдвэр',
    goalMn: 'Нөхцөлд таарах Чех хариуг сонгоно.',
    questions: [
      {
        id: 'a0-final-dialogue-pay',
        type: 'dialogue',
        titleMn: 'Яриа 1',
        promptMn: 'Та картаар төлөх гэж байна. Зөв хариуг сонго.',
        staffCzech: 'Platíte kartou, nebo hotově?',
        staffMn: 'Та картаар уу, бэлнээр үү?',
        targetId: 'a0c0115',
        choices: choices([
          ['a', 'Platím kartou.', 'Би картаар төлнө.'],
          ['b', 'Nemám klíč.', 'Надад түлхүүр байхгүй.'],
          ['c', 'Je mi zima.', 'Би даарч байна.'],
        ]),
        correctId: 'a',
        feedbackMn: 'Картаар төлөхдөө Platím kartou. гэж хэлнэ.',
      },
      {
        id: 'a0-final-dialogue-status',
        type: 'dialogue',
        titleMn: 'Яриа 2',
        promptMn: 'Танд үнэхээр асуудал байна. Зөв хариуг сонго.',
        staffCzech: 'Jste v pořádku?',
        staffMn: 'Та зүгээр үү?',
        targetId: 'a0c0180',
        choices: choices([
          ['a', 'Jsem v pořádku.', 'Би зүгээр.'],
          ['b', 'Nejsem v pořádku.', 'Би зүгээр биш.'],
          ['c', 'Dnes je teplo.', 'Өнөөдөр дулаан байна.'],
        ]),
        correctId: 'b',
        feedbackMn: 'Зүгээр биш үед Nejsem v pořádku. гэж хэлнэ.',
      },
    ],
  },
  {
    id: 'survival',
    titleMn: 'Амьд нөхцөл',
    goalMn: 'Эхний өдөр хэрэг болох дараалсан Чех хариуг сонгоно.',
    questions: [
      {
        id: 'a0-final-survival-name',
        type: 'dialogue',
        titleMn: 'Амьд нөхцөл 1',
        promptMn: 'Та өөрийгөө танилцуул.',
        staffCzech: 'Dobrý den. Jak se jmenujete?',
        staffMn: 'Сайн байна уу. Таны нэр хэн бэ?',
        targetId: 'a0c0013',
        choices: choices([
          ['a', 'Dobrý den. Jmenuji se Eba.', 'Сайн байна уу. Миний нэр Эба.'],
          ['b', 'Je mi zima.', 'Би даарч байна.'],
          ['c', 'Pošlete mi SMS, prosím.', 'Надад SMS илгээнэ үү.'],
        ]),
        correctId: 'a',
        feedbackMn: 'Танилцахдаа эхлээд мэндлээд нэрээ хэлнэ.',
      },
      {
        id: 'a0-final-survival-slow',
        type: 'dialogue',
        titleMn: 'Амьд нөхцөл 2',
        promptMn: 'Ажилтан хурдан ярьж байна. Өөрийгөө хамгаал.',
        staffCzech: 'Mluvím moc rychle?',
        staffMn: 'Би хэт хурдан ярьж байна уу?',
        targetId: 'a0c0012',
        choices: choices([
          ['a', 'Ano. Nerozumím. Mluvte prosím pomalu.', 'Тийм. Би ойлгохгүй байна. Удаан ярьж өгнө үү.'],
          ['b', 'Platím kartou.', 'Би картаар төлнө.'],
          ['c', 'Mám děti.', 'Би хүүхдүүдтэй.'],
        ]),
        correctId: 'a',
        feedbackMn: 'Ойлгохгүй үед шууд удаан ярихыг хүс.',
      },
      {
        id: 'a0-final-survival-doctor',
        type: 'dialogue',
        titleMn: 'Амьд нөхцөл 3',
        promptMn: 'Танд эмч хэрэгтэй. Зөв хүсэлтийг сонго.',
        staffCzech: 'Koho mám zavolat?',
        staffMn: 'Би хэнийг дуудах вэ?',
        targetId: 'a0c0177',
        choices: choices([
          ['a', 'Zavolejte prosím doktora.', 'Эмч дуудаж өгнө үү.'],
          ['b', 'Potřebuji čepici.', 'Надад малгай хэрэгтэй.'],
          ['c', 'To je drahé.', 'Энэ үнэтэй байна.'],
        ]),
        correctId: 'a',
        feedbackMn: 'Эмч дуудахдаа Zavolejte prosím doktora. гэж хэлнэ.',
      },
    ],
  },
];

export const a0FinalMissionQuestionCount = a0FinalMissionSections.reduce((sum, section) => sum + section.questions.length, 0);
