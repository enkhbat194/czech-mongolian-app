export interface DialogueChoice {
  id: string;
  text: string;
  mongolian: string;
}

export interface DialogueStep {
  id: string;
  speaker: string;
  staffCzech: string;
  staffMn: string;
  promptMn: string;
  choices: DialogueChoice[];
  correctId: string;
  feedbackMn: string;
}

export interface DialogueScenario {
  id: string;
  titleMn: string;
  contextMn: string;
  steps: DialogueStep[];
}

export const a0FirstContactMicroDialogues: Record<string, DialogueScenario> = {
  'a0-1-a': {
    id: 'a0-1-a-dialogue',
    titleMn: 'Богино яриа — мэндлэх',
    contextMn: 'Та ажил дээрээ анх таних хүнтэй уулзаж байна.',
    steps: [
      {
        id: 'a01a-d1', speaker: 'Ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу?',
        promptMn: 'Та албан ёсоор хариу мэндлээрэй.',
        choices: [
          { id: 'a', text: 'Ahoj.', mongolian: 'Сайн уу.' },
          { id: 'b', text: 'Dobrý den.', mongolian: 'Сайн байна уу.' },
          { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
        ], correctId: 'b', feedbackMn: 'Албан нөхцөлд Dobrý den. гэдэг нь аюулгүй сонголт.'
      },
      {
        id: 'a01a-d2', speaker: 'Ажилтан', staffCzech: 'Děkuji.', staffMn: 'Баярлалаа.',
        promptMn: 'Эелдгээр “зүгээр” гэж хариулаарай.',
        choices: [
          { id: 'a', text: 'Prosím.', mongolian: 'Зүгээр ээ.' },
          { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' },
          { id: 'c', text: 'Ano.', mongolian: 'Тийм.' },
        ], correctId: 'a', feedbackMn: 'Děkuji. гэсний дараа Prosím. гэж эелдгээр хариулж болно.'
      },
    ],
  },
  'a0-1-b': {
    id: 'a0-1-b-dialogue',
    titleMn: 'Богино яриа — нэрээ хэлэх',
    contextMn: 'Ресепшний ажилтан таны нэрийг асууж байна.',
    steps: [
      {
        id: 'a01b-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se jmenujete?', staffMn: 'Таны нэр хэн бэ?',
        promptMn: 'Өөрийн нэрээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Dobrý den.', mongolian: 'Сайн байна уу.' },
          { id: 'b', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' },
          { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
        ], correctId: 'b', feedbackMn: 'Jmenuji se … гэдэг нь нэрээ хэлэх бэлэн бүтэц.'
      },
      {
        id: 'a01b-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Děkuji.', staffMn: 'Баярлалаа.',
        promptMn: 'Эелдгээр “зүгээр” гэж хариулаарай.',
        choices: [
          { id: 'a', text: 'Prosím.', mongolian: 'Зүгээр ээ.' },
          { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' },
          { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
        ], correctId: 'a', feedbackMn: 'Děkuji. гэсний дараа Prosím. гэж хариулж болно.'
      },
    ],
  },
  'a0-1-c': {
    id: 'a0-1-c-dialogue',
    titleMn: 'Богино яриа — хаанаас ирсэн бэ?',
    contextMn: 'Та таних хүнтэйгээ өөрийгөө танилцуулж байна.',
    steps: [
      {
        id: 'a01c-d1', speaker: 'Ажилтан', staffCzech: 'Jak se máte?', staffMn: 'Та сайн уу?',
        promptMn: 'Та сайн байгаагаа, баярлаж байгаагаа хэлээрэй.',
        choices: [
          { id: 'a', text: 'Dobře, děkuji.', mongolian: 'Сайн, баярлалаа.' },
          { id: 'b', text: 'Ne, děkuji.', mongolian: 'Үгүй, баярлалаа.' },
          { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
        ], correctId: 'a', feedbackMn: 'Dobře, děkuji. = Сайн, баярлалаа.'
      },
      {
        id: 'a01c-d2', speaker: 'Ажилтан', staffCzech: 'Odkud jste?', staffMn: 'Та хаанаас ирсэн бэ?',
        promptMn: 'Та Монголоос ирснээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' },
          { id: 'b', text: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.' },
          { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
        ], correctId: 'b', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.'
      },
      {
        id: 'a01c-d3', speaker: 'Ажилтан', staffCzech: 'Prosím?', staffMn: 'Уучлаарай? Дахин хэлнэ үү?',
        promptMn: 'Та ойлгохгүй байгаагаа хэлээд удаан ярихыг хүсээрэй.',
        choices: [
          { id: 'a', text: 'Ano, děkuji.', mongolian: 'Тийм, баярлалаа.' },
          { id: 'b', text: 'Nerozumím. Mluvte prosím pomalu.', mongolian: 'Би ойлгохгүй байна. Удаан ярьж өгнө үү.' },
          { id: 'c', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' },
        ], correctId: 'b', feedbackMn: 'Эхлээд ойлгохгүйгээ хэлээд, дараа нь удаан ярихыг хүснэ.'
      },
    ],
  },
};

export const a0FirstContactFinalDialogue: DialogueScenario = {
  id: 'a0-1-final-dialogue',
  titleMn: 'Төгсгөлийн бодит яриа',
  contextMn: 'Та Чехийн ажлын газрын ресепшнд анх удаа очлоо.',
  steps: [
    {
      id: 'a01f-1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу?',
      promptMn: 'Албан ёсоор мэндлээрэй.',
      choices: [
        { id: 'a', text: 'Dobrý den.', mongolian: 'Сайн байна уу.' },
        { id: 'b', text: 'Ahoj.', mongolian: 'Сайн уу.' },
        { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
      ], correctId: 'a', feedbackMn: 'Албан нөхцөлд Dobrý den. хэрэглэнэ.'
    },
    {
      id: 'a01f-2', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se máte?', staffMn: 'Та сайн уу?',
      promptMn: 'Та сайн байгаагаа, баярлаж байгаагаа хэлээрэй.',
      choices: [
        { id: 'a', text: 'Dobře, děkuji.', mongolian: 'Сайн, баярлалаа.' },
        { id: 'b', text: 'Ne, děkuji.', mongolian: 'Үгүй, баярлалаа.' },
        { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
      ], correctId: 'a', feedbackMn: 'Dobře, děkuji. = Сайн, баярлалаа.'
    },
    {
      id: 'a01f-3', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se jmenujete?', staffMn: 'Таны нэр хэн бэ?',
      promptMn: 'Нэрээ хэлээрэй.',
      choices: [
        { id: 'a', text: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.' },
        { id: 'b', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' },
        { id: 'c', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' },
      ], correctId: 'b', feedbackMn: 'Jmenuji se … гэж нэрээ хэлнэ.'
    },
    {
      id: 'a01f-4', speaker: 'Ресепшний ажилтан', staffCzech: 'Odkud jste?', staffMn: 'Та хаанаас ирсэн бэ?',
      promptMn: 'Гарал орноо хэлээрэй.',
      choices: [
        { id: 'a', text: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.' },
        { id: 'b', text: 'Dobře, děkuji.', mongolian: 'Сайн, баярлалаа.' },
        { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
      ], correctId: 'a', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.'
    },
    {
      id: 'a01f-5', speaker: 'Ресепшний ажилтан', staffCzech: 'Prosím?', staffMn: 'Уучлаарай? Дахин хэлнэ үү?',
      promptMn: 'Та ойлгохгүй байгаагаа хэлээд удаан ярихыг хүсээрэй.',
      choices: [
        { id: 'a', text: 'Ano. Na shledanou.', mongolian: 'Тийм. Баяртай.' },
        { id: 'b', text: 'Nerozumím. Mluvte prosím pomalu.', mongolian: 'Би ойлгохгүй байна. Удаан ярьж өгнө үү.' },
        { id: 'c', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' },
      ], correctId: 'b', feedbackMn: 'Энэ бол ойлгохгүй үед хэрэглэх хамгаалах хэллэг.'
    },
    {
      id: 'a01f-6', speaker: 'Ресепшний ажилтан', staffCzech: 'Na shledanou.', staffMn: 'Баяртай.',
      promptMn: 'Яриаг албан хэлбэрээр дуусгаарай.',
      choices: [
        { id: 'a', text: 'Ahoj.', mongolian: 'Сайн уу.' },
        { id: 'b', text: 'Na shledanou.', mongolian: 'Баяртай.' },
        { id: 'c', text: 'Ne.', mongolian: 'Үгүй.' },
      ], correctId: 'b', feedbackMn: 'Na shledanou. нь албан болон саармаг баяртай хэлбэр.'
    },
  ],
};

export const a0NeedsMicroDialogues: Record<string, DialogueScenario> = {
  'a0-2-a': {
    id: 'a0-2-a-dialogue',
    titleMn: 'Богино яриа — тусламж хүсэх',
    contextMn: 'Та ресепшн дээр очоод тусламж, ус хэрэгтэй боллоо.',
    steps: [
      {
        id: 'a02a-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.',
        promptMn: 'Эелдгээр тусламж хүсээрэй.',
        choices: [
          { id: 'a', text: 'Potřebuji pomoc, prosím.', mongolian: 'Надад туслаач, гуйя.' },
          { id: 'b', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' },
          { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' },
        ], correctId: 'a', feedbackMn: 'Potřebuji pomoc, prosím. = Надад туслаач, гуйя.'
      },
      {
        id: 'a02a-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Voda?', staffMn: 'Ус?',
        promptMn: 'Танд ус хэрэгтэйгээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Ne, děkuji.', mongolian: 'Үгүй, баярлалаа.' },
          { id: 'b', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' },
          { id: 'c', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' },
        ], correctId: 'b', feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.'
      },
    ],
  },
  'a0-2-b': {
    id: 'a0-2-b-dialogue',
    titleMn: 'Богино яриа — хоол хүсэх',
    contextMn: 'Та хоолны сонголтоо хэлж байна.',
    steps: [
      {
        id: 'a02b-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Jídlo?', staffMn: 'Хоол?',
        promptMn: 'Та идэх юм хүсэж байгаагаа хэлээрэй.',
        choices: [
          { id: 'a', text: 'Ano, chci něco k jídlu.', mongolian: 'Тийм, би идэх юм хүсэж байна.' },
          { id: 'b', text: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.' },
          { id: 'c', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' },
        ], correctId: 'a', feedbackMn: 'Chci něco k jídlu. = Би идэх юм хүсэж байна.'
      },
      {
        id: 'a02b-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Prosím.', staffMn: 'За, аваарай.',
        promptMn: 'Талархаарай.',
        choices: [
          { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
          { id: 'b', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
          { id: 'c', text: 'Ne.', mongolian: 'Үгүй.' },
        ], correctId: 'a', feedbackMn: 'Děkuji. = Баярлалаа.'
      },
    ],
  },
  'a0-2-c': {
    id: 'a0-2-c-dialogue',
    titleMn: 'Богино яриа — мөнгө, карт',
    contextMn: 'Төлбөр хийх мөчид танд карт, мөнгө байхгүй байна.',
    steps: [
      {
        id: 'a02c-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Karta?', staffMn: 'Карт?',
        promptMn: 'Карт байхгүйгээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Chci kartu.', mongolian: 'Би карт хүсэж байна.' },
          { id: 'b', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' },
          { id: 'c', text: 'Potřebuji kartu.', mongolian: 'Надад карт хэрэгтэй.' },
        ], correctId: 'b', feedbackMn: 'Nemám kartu. = Надад карт байхгүй.'
      },
      {
        id: 'a02c-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Peníze?', staffMn: 'Мөнгө?',
        promptMn: 'Мөнгө байхгүйгээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' },
          { id: 'b', text: 'Chci peníze.', mongolian: 'Би мөнгө хүсэж байна.' },
          { id: 'c', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' },
        ], correctId: 'a', feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.'
      },
    ],
  },
};

export const a0NeedsFinalDialogue: DialogueScenario = {
  id: 'a0-2-final-dialogue',
  titleMn: 'Төгсгөлийн бодит яриа',
  contextMn: 'Та ресепшнд очиж тусламж, ус, хоол хүсэж, картгүйгээ тайлбарлана.',
  steps: [
    {
      id: 'a02f-1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den. Co potřebujete?', staffMn: 'Сайн байна уу. Танд юу хэрэгтэй вэ?',
      promptMn: 'Тусламж хүсээрэй.',
      choices: [
        { id: 'a', text: 'Potřebuji pomoc, prosím.', mongolian: 'Надад туслаач, гуйя.' },
        { id: 'b', text: 'Na shledanou.', mongolian: 'Баяртай.' },
        { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
      ], correctId: 'a', feedbackMn: 'Та хэрэгцээгээ эелдгээр, ойлгомжтой хэллээ.'
    },
    {
      id: 'a02f-2', speaker: 'Ресепшний ажилтан', staffCzech: 'Voda?', staffMn: 'Ус?',
      promptMn: 'Ус хэрэгтэйгээ хэлээрэй.',
      choices: [
        { id: 'a', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' },
        { id: 'b', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' },
        { id: 'c', text: 'Chci telefon.', mongolian: 'Би утас хүсэж байна.' },
      ], correctId: 'b', feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.'
    },
    {
      id: 'a02f-3', speaker: 'Ресепшний ажилтан', staffCzech: 'Jídlo?', staffMn: 'Хоол?',
      promptMn: 'Идэх юм хүсэж байгаагаа хэлээрэй.',
      choices: [
        { id: 'a', text: 'Ano, chci něco k jídlu.', mongolian: 'Тийм, би идэх юм хүсэж байна.' },
        { id: 'b', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' },
        { id: 'c', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' },
      ], correctId: 'a', feedbackMn: 'Chci něco k jídlu. = Би идэх юм хүсэж байна.'
    },
    {
      id: 'a02f-4', speaker: 'Ресепшний ажилтан', staffCzech: 'Karta?', staffMn: 'Карт?',
      promptMn: 'Карт байхгүйгээ хэлээрэй.',
      choices: [
        { id: 'a', text: 'Chci kartu.', mongolian: 'Би карт хүсэж байна.' },
        { id: 'b', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' },
        { id: 'c', text: 'Potřebuji kartu.', mongolian: 'Надад карт хэрэгтэй.' },
      ], correctId: 'b', feedbackMn: 'Nemám kartu. = Надад карт байхгүй.'
    },
    {
      id: 'a02f-5', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobře.', staffMn: 'За.',
      promptMn: 'Яриаг эелдгээр дуусгаарай.',
      choices: [
        { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' },
        { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' },
      ], correctId: 'a', feedbackMn: 'Děkuji. = Баярлалаа.'
    },
  ],
};
