import {
  a0FirstContactFinalDialogue,
  a0FirstContactMicroDialogues,
  a0NeedsFinalDialogue,
  a0NeedsMicroDialogues,
  type DialogueScenario,
} from './a0Dialogues';

export const a0FirstContactCoveredMicroDialogues: Record<string, DialogueScenario> = {
  ...a0FirstContactMicroDialogues,
  'a0-1-a': {
    ...a0FirstContactMicroDialogues['a0-1-a'],
    steps: [
      ...a0FirstContactMicroDialogues['a0-1-a'].steps,
      {
        id: 'a01a-d3-coverage',
        speaker: 'Ажилтан',
        staffCzech: 'Ano?',
        staffMn: 'Тийм үү?',
        promptMn: 'Тийм, баярлалаа гэж эелдгээр хариулаарай.',
        choices: [
          { id: 'a', text: 'Ano, děkuji.', mongolian: 'Тийм, баярлалаа.' },
          { id: 'b', text: 'Ne, děkuji.', mongolian: 'Үгүй, баярлалаа.' },
          { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
        ],
        correctId: 'a',
        feedbackMn: 'Ano, děkuji. = Тийм, баярлалаа.',
      },
      {
        id: 'a01a-d4-coverage',
        speaker: 'Ажилтан',
        staffCzech: 'Na shledanou.',
        staffMn: 'Баяртай.',
        promptMn: 'Яриаг албан хэлбэрээр дуусгаарай.',
        choices: [
          { id: 'a', text: 'Ahoj.', mongolian: 'Сайн уу.' },
          { id: 'b', text: 'Na shledanou.', mongolian: 'Баяртай.' },
          { id: 'c', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        ],
        correctId: 'b',
        feedbackMn: 'Na shledanou. = Албан болон саармаг баяртай.',
      },
    ],
  },
};

export const a0FirstContactCoveredFinalDialogue: DialogueScenario = a0FirstContactFinalDialogue;

export const a0NeedsCoveredMicroDialogues: Record<string, DialogueScenario> = {
  ...a0NeedsMicroDialogues,
  'a0-2-a': {
    ...a0NeedsMicroDialogues['a0-2-a'],
    steps: [
      ...a0NeedsMicroDialogues['a0-2-a'].steps,
      {
        id: 'a02a-d3-coverage',
        speaker: 'Ресепшний ажилтан',
        staffCzech: 'Potřebujete telefon?',
        staffMn: 'Танд утас хэрэгтэй юу?',
        promptMn: 'Танд утас хэрэгтэйгээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' },
          { id: 'b', text: 'Nemám telefon.', mongolian: 'Надад утас байхгүй.' },
          { id: 'c', text: 'Chci kartu.', mongolian: 'Би карт хүсэж байна.' },
        ],
        correctId: 'a',
        feedbackMn: 'Potřebuji telefon. = Надад утас хэрэгтэй.',
      },
    ],
  },
  'a0-2-b': {
    ...a0NeedsMicroDialogues['a0-2-b'],
    steps: [
      ...a0NeedsMicroDialogues['a0-2-b'].steps,
      {
        id: 'a02b-d3-coverage',
        speaker: 'Ресепшний ажилтан',
        staffCzech: 'Chcete vodu?',
        staffMn: 'Та ус хүсэж байна уу?',
        promptMn: 'Та ус хүсэж байгаагаа хэлээрэй.',
        choices: [
          { id: 'a', text: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.' },
          { id: 'b', text: 'Nemám vodu.', mongolian: 'Надад ус байхгүй.' },
          { id: 'c', text: 'Chci kartu.', mongolian: 'Би карт хүсэж байна.' },
        ],
        correctId: 'a',
        feedbackMn: 'Chci vodu. = Би ус хүсэж байна.',
      },
      {
        id: 'a02b-d4-coverage',
        speaker: 'Ресепшний ажилтан',
        staffCzech: 'Které jídlo chcete?',
        staffMn: 'Та аль хоолыг хүсэж байна вэ?',
        promptMn: 'Зааж байгаа хоолоо хүсээрэй.',
        choices: [
          { id: 'a', text: 'Chci tohle.', mongolian: 'Би үүнийг хүсэж байна.' },
          { id: 'b', text: 'Nemám tohle.', mongolian: 'Надад энэ байхгүй.' },
          { id: 'c', text: 'Potřebuji peníze.', mongolian: 'Надад мөнгө хэрэгтэй.' },
        ],
        correctId: 'a',
        feedbackMn: 'Chci tohle. = Би үүнийг хүсэж байна.',
      },
    ],
  },
  'a0-2-c': {
    ...a0NeedsMicroDialogues,
    'a0-2-c': a0NeedsMicroDialogues['a0-2-c'],
  }['a0-2-c'],
};

export const a0NeedsCoveredFinalDialogue: DialogueScenario = {
  ...a0NeedsFinalDialogue,
  steps: [
    ...a0NeedsFinalDialogue.steps.slice(0, 2),
    {
      id: 'a02f-2b-coverage',
      speaker: 'Ресепшний ажилтан',
      staffCzech: 'Potřebujete telefon?',
      staffMn: 'Танд утас хэрэгтэй юу?',
      promptMn: 'Танд утас хэрэгтэйгээ хэлээрэй.',
      choices: [
        { id: 'a', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' },
        { id: 'b', text: 'Nemám telefon.', mongolian: 'Надад утас байхгүй.' },
        { id: 'c', text: 'Chci peníze.', mongolian: 'Би мөнгө хүсэж байна.' },
      ],
      correctId: 'a',
      feedbackMn: 'Potřebuji telefon. = Надад утас хэрэгтэй.',
    },
    ...a0NeedsFinalDialogue.steps.slice(2, 3),
    {
      id: 'a02f-3b-coverage',
      speaker: 'Ресепшний ажилтан',
      staffCzech: 'Máte peníze?',
      staffMn: 'Танд мөнгө байна уу?',
      promptMn: 'Мөнгө байхгүйгээ хэлээрэй.',
      choices: [
        { id: 'a', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' },
        { id: 'b', text: 'Chci peníze.', mongolian: 'Би мөнгө хүсэж байна.' },
        { id: 'c', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' },
      ],
      correctId: 'a',
      feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.',
    },
    ...a0NeedsFinalDialogue.steps.slice(3),
  ],
};