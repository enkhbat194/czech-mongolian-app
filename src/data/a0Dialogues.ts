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
    id: 'a0-1-a-dialogue', titleMn: 'Богино яриа — албан мэндчилгээ', contextMn: 'Та ресепшнд мэндлээд, ажилтан танд баримт өгч байна.',
    steps: [
      {
        id: 'a01a-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу?', promptMn: 'Та албан ёсоор хариу мэндлээрэй.',
        choices: [{ id: 'a', text: 'Ahoj.', mongolian: 'Сайн уу.' }, { id: 'b', text: 'Dobrý den.', mongolian: 'Сайн байна уу.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'b', feedbackMn: 'Албан нөхцөлд Dobrý den. гэдэг нь аюулгүй сонголт.'
      },
      {
        id: 'a01a-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Prosím.', staffMn: 'Энд байна.', promptMn: 'Ажилтан танд баримт өглөө. Та талархаарай.',
        choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' }, { id: 'c', text: 'Ano.', mongolian: 'Тийм.' }], correctId: 'a', feedbackMn: 'Prosím. нь “энд байна” гэсэн утгаар хэлж болно. Дараа нь Děkuji. гэж талархана.'
      },
    ],
  },
  'a0-1-b': {
    id: 'a0-1-b-dialogue', titleMn: 'Богино яриа — тийм, үгүй, баяртай', contextMn: 'Ресепшний ажилтан таны нэрийг баталгаажуулж, дараа нь кофе санал болгож байна.',
    steps: [
      {
        id: 'a01b-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Jste Eba?', staffMn: 'Та Эба юу?', promptMn: 'Та нэрээ баталгаажуулаарай.',
        choices: [{ id: 'a', text: 'Ano.', mongolian: 'Тийм.' }, { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Ano. = Тийм.'
      },
      {
        id: 'a01b-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Káva?', staffMn: 'Кофе уу?', promptMn: 'Та кофе авахгүй бол эелдгээр татгалзаарай.',
        choices: [{ id: 'a', text: 'Ano, děkuji.', mongolian: 'Тийм, баярлалаа.' }, { id: 'b', text: 'Ne, děkuji.', mongolian: 'Үгүй, баярлалаа.' }, { id: 'c', text: 'Ahoj.', mongolian: 'Сайн уу.' }], correctId: 'b', feedbackMn: 'Ne, děkuji. = Үгүй, баярлалаа.'
      },
      {
        id: 'a01b-d3', speaker: 'Ресепшний ажилтан', staffCzech: 'Na shledanou.', staffMn: 'Баяртай.', promptMn: 'Та яриаг албан хэлбэрээр дуусгаарай.',
        choices: [{ id: 'a', text: 'Na shledanou.', mongolian: 'Баяртай.' }, { id: 'b', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'c', text: 'Ano.', mongolian: 'Тийм.' }], correctId: 'a', feedbackMn: 'Na shledanou. = Албан болон саармаг баяртай.'
      },
    ],
  },
  'a0-1-c': {
    id: 'a0-1-c-dialogue', titleMn: 'Богино яриа — нэрээ хэлэх', contextMn: 'Ресепшний ажилтан таны нэрийг асууж байна.',
    steps: [{
      id: 'a01c-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se jmenujete?', staffMn: 'Таны нэр хэн бэ?', promptMn: 'Өөрийн нэрээ хэлээрэй.',
      choices: [{ id: 'a', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' }, { id: 'b', text: 'Dobrý den.', mongolian: 'Сайн байна уу.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Jmenuji se … гэдэг нь нэрээ хэлэх бэлэн бүтэц.'
    }],
  },
  'a0-1-d': {
    id: 'a0-1-d-dialogue', titleMn: 'Богино яриа — нэр асуух', contextMn: 'Та ресепшний ажилтантай танилцаж байна.',
    steps: [
      {
        id: 'a01d-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу?', promptMn: 'Та ажилтны нэрийг албан хэлбэрээр асуугаарай.',
        choices: [{ id: 'a', text: 'Jak se jmenujete?', mongolian: 'Таны нэр хэн бэ?' }, { id: 'b', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }, { id: 'c', text: 'Jak se máte?', mongolian: 'Та сайн уу?' }], correctId: 'a', feedbackMn: 'Jak se jmenujete? = Таны нэр хэн бэ?'
      },
      {
        id: 'a01d-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Jmenuji se Jana.', staffMn: 'Миний нэр Яна.', promptMn: 'Та мэдээллийг ойлгосон бол талархаарай.',
        choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Нэрийг сонссоны дараа Děkuji. гэж талархаж болно. Kdo jste? нь танихгүй хүнийг тодруулахад хэрэглэнэ.'
      },
    ],
  },
  'a0-1-e': {
    id: 'a0-1-e-dialogue', titleMn: 'Богино яриа — сайн байна уу, хаанаас ирсэн бэ?', contextMn: 'Та ажилтантай богино танилцаж байна.',
    steps: [
      {
        id: 'a01e-d1', speaker: 'Ажилтан', staffCzech: 'Jak se máte?', staffMn: 'Та сайн уу?', promptMn: 'Та сайн байгаагаа хэлээрэй.',
        choices: [{ id: 'a', text: 'Dobře.', mongolian: 'Сайн.' }, { id: 'b', text: 'Špatně.', mongolian: 'Муу.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Dobře. = Сайн.'
      },
      {
        id: 'a01e-d2', speaker: 'Ажилтан', staffCzech: 'Odkud jste?', staffMn: 'Та хаанаас ирсэн бэ?', promptMn: 'Та Монголоос ирснээ хэлээрэй.',
        choices: [{ id: 'a', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' }, { id: 'b', text: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.' }, { id: 'c', text: 'Dobře.', mongolian: 'Сайн.' }], correctId: 'b', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.'
      },
    ],
  },
  'a0-1-f': {
    id: 'a0-1-f-dialogue', titleMn: 'Богино яриа — ойлгохгүй үед', contextMn: 'Ажилтан хэт хурдан ярьж байна. Та яриаг удаашруулах хэрэгтэй.',
    steps: [
      {
        id: 'a01f-d1', speaker: 'Ажилтан', staffCzech: 'Mluvím rychle.', staffMn: 'Би хурдан ярьж байна.', promptMn: 'Та ойлгохгүй байгаагаа хэлээрэй.',
        choices: [{ id: 'a', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' }, { id: 'b', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Nerozumím. = Би ойлгохгүй байна.'
      },
      {
        id: 'a01f-d2', speaker: 'Ажилтан', staffCzech: 'Pomalu?', staffMn: 'Удаанаар уу?', promptMn: 'Та удаан ярихыг хүсээрэй.',
        choices: [{ id: 'a', text: 'Mluvte prosím pomalu.', mongolian: 'Удаан ярьж өгнө үү.' }, { id: 'b', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'c', text: 'Ano.', mongolian: 'Тийм.' }], correctId: 'a', feedbackMn: 'Mluvte prosím pomalu. = Удаан ярьж өгнө үү.'
      },
    ],
  },
};

export const a0FirstContactFinalDialogue: DialogueScenario = {
  id: 'a0-1-final-dialogue', titleMn: 'Төгсгөлийн бодит яриа', contextMn: 'Та Чехийн ажлын газрын ресепшнд анх удаа очиж, өөрийгөө танилцуулан, ойлгохгүй үедээ яриаг удаашруулах хүсэлт тавьж байна.',
  steps: [
    {
      id: 'a01final-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу?', promptMn: 'Албан ёсоор мэндлээрэй.',
      choices: [{ id: 'a', text: 'Dobrý den.', mongolian: 'Сайн байна уу.' }, { id: 'b', text: 'Ahoj.', mongolian: 'Сайн уу.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Албан нөхцөлд Dobrý den. хэрэглэнэ.'
    },
    {
      id: 'a01final-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se jmenujete?', staffMn: 'Таны нэр хэн бэ?', promptMn: 'Нэрээ хэлээрэй.',
      choices: [{ id: 'a', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' }, { id: 'b', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }, { id: 'c', text: 'Dobře.', mongolian: 'Сайн.' }], correctId: 'a', feedbackMn: 'Jmenuji se … гэж нэрээ хэлнэ.'
    },
    {
      id: 'a01final-d3', speaker: 'Ресепшний ажилтан', staffCzech: 'Jak se máte?', staffMn: 'Та сайн уу?', promptMn: 'Та сайн байгаагаа хэлээрэй.',
      choices: [{ id: 'a', text: 'Dobře.', mongolian: 'Сайн.' }, { id: 'b', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Dobře. = Сайн.'
    },
    {
      id: 'a01final-d4', speaker: 'Ресепшний ажилтан', staffCzech: 'Odkud jste?', staffMn: 'Та хаанаас ирсэн бэ?', promptMn: 'Гарал орноо хэлээрэй.',
      choices: [{ id: 'a', text: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.' }, { id: 'b', text: 'Jmenuji se Eba.', mongolian: 'Миний нэр Эба.' }, { id: 'c', text: 'Děkuji.', mongolian: 'Баярлалаа.' }], correctId: 'a', feedbackMn: 'Jsem z Mongolska. = Би Монголоос ирсэн.'
    },
    {
      id: 'a01final-d5', speaker: 'Ресепшний ажилтан', staffCzech: 'Mluvím rychle.', staffMn: 'Би хурдан ярьж байна.', promptMn: 'Та ойлгохгүй байгаагаа хэлээд, удаан ярихыг хүсээрэй.',
      choices: [{ id: 'a', text: 'Nerozumím. Mluvte prosím pomalu.', mongolian: 'Би ойлгохгүй байна. Удаан ярьж өгнө үү.' }, { id: 'b', text: 'Ano.', mongolian: 'Тийм.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Ойлгохгүй үед хоёр хамгаалах хэллэгээ хамтад нь хэрэглэж болно.'
    },
    {
      id: 'a01final-d6', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobře.', staffMn: 'За.', promptMn: 'Та тусалсанд нь талархаарай.',
      choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' }, { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }], correctId: 'a', feedbackMn: 'Děkuji. = Баярлалаа.'
    },
    {
      id: 'a01final-d7', speaker: 'Ресепшний ажилтан', staffCzech: 'Na shledanou.', staffMn: 'Баяртай.', promptMn: 'Яриаг албан хэлбэрээр дуусгаарай.',
      choices: [{ id: 'a', text: 'Na shledanou.', mongolian: 'Баяртай.' }, { id: 'b', text: 'Ahoj.', mongolian: 'Сайн уу.' }, { id: 'c', text: 'Ne.', mongolian: 'Үгүй.' }], correctId: 'a', feedbackMn: 'Na shledanou. = Албан болон саармаг баяртай.'
    },
  ],
};

export const a0NeedsMicroDialogues: Record<string, DialogueScenario> = {
  'a0-2-a': {
    id: 'a0-2-a-dialogue', titleMn: 'Богино яриа — тусламж хүсэх', contextMn: 'Та ресепшн дээр очоод тусламж хэрэгтэй боллоо.',
    steps: [
      {
        id: 'a02a-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.', promptMn: 'Та тусламж хэрэгтэйгээ хэлээрэй.',
        choices: [{ id: 'a', text: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.' }, { id: 'b', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Potřebuji pomoc. = Надад тусламж хэрэгтэй.'
      },
      {
        id: 'a02a-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobře.', staffMn: 'За.', promptMn: 'Та туслахаар болсонд нь талархаарай.',
        choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' }, { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }], correctId: 'a', feedbackMn: 'Dobře. гэсний дараа Děkuji. гэж талархаж болно.'
      },
    ],
  },
  'a0-2-b': {
    id: 'a0-2-b-dialogue', titleMn: 'Богино яриа — ус ба утас', contextMn: 'Та ресепшн дээр ус, дараа нь утас хэрэгтэйгээ хэлж байна.',
    steps: [
      {
        id: 'a02b-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Prosím?', staffMn: 'Танд юу хэрэгтэй вэ?', promptMn: 'Та ус хэрэгтэйгээ хэлээрэй.',
        choices: [{ id: 'a', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }, { id: 'b', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' }, { id: 'c', text: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.'
      },
      {
        id: 'a02b-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Ještě něco?', staffMn: 'Өөр зүйл хэрэгтэй юу?', promptMn: 'Та утас бас хэрэгтэйгээ хэлээрэй.',
        choices: [{ id: 'a', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }, { id: 'b', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' }, { id: 'c', text: 'Děkuji.', mongolian: 'Баярлалаа.' }], correctId: 'b', feedbackMn: 'Potřebuji telefon. = Надад утас хэрэгтэй.'
      },
    ],
  },
  'a0-2-c': {
    id: 'a0-2-c-dialogue', titleMn: 'Богино яриа — ус ба хоол хүсэх', contextMn: 'Та кафед ус болон хоол захиалж байна.',
    steps: [
      {
        id: 'a02c-d1', speaker: 'Үйлчлэгч', staffCzech: 'Voda, nebo jídlo?', staffMn: 'Ус уу, хоол уу?', promptMn: 'Та ус хүсэж байгаагаа хэлээрэй.',
        choices: [{ id: 'a', text: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.' }, { id: 'b', text: 'Chci jídlo.', mongolian: 'Би хоол хүсэж байна.' }, { id: 'c', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Chci vodu. = Би ус хүсэж байна.'
      },
      {
        id: 'a02c-d2', speaker: 'Үйлчлэгч', staffCzech: 'Ještě něco?', staffMn: 'Өөр зүйл хэрэгтэй юу?', promptMn: 'Та хоол бас хүсэж байгаагаа хэлээрэй.',
        choices: [{ id: 'a', text: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.' }, { id: 'b', text: 'Chci jídlo.', mongolian: 'Би хоол хүсэж байна.' }, { id: 'c', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' }], correctId: 'b', feedbackMn: 'Chci jídlo. = Би хоол хүсэж байна.'
      },
    ],
  },
  'a0-2-d': {
    id: 'a0-2-d-dialogue', titleMn: 'Богино яриа — идэх юм, энэ зүйл', contextMn: 'Та дэлгүүрийн лангуун дээрээс идэх юм сонгож байна.',
    steps: [
      {
        id: 'a02d-d1', speaker: 'Үйлчлэгч', staffCzech: 'Jídlo?', staffMn: 'Идэх юм уу?', promptMn: 'Та идэх юм хүсэж байгаагаа хэлээрэй.',
        choices: [{ id: 'a', text: 'Chci něco k jídlu.', mongolian: 'Би идэх юм хүсэж байна.' }, { id: 'b', text: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.' }, { id: 'c', text: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Chci něco k jídlu. = Би идэх юм хүсэж байна.'
      },
      {
        id: 'a02d-d2', speaker: 'Үйлчлэгч', staffCzech: 'Tohle?', staffMn: 'Энэ юу?', promptMn: 'Та зааж байгаа зүйлийг хүсээрэй.',
        choices: [{ id: 'a', text: 'Chci tohle.', mongolian: 'Би үүнийг хүсэж байна.' }, { id: 'b', text: 'Chci jídlo.', mongolian: 'Би хоол хүсэж байна.' }, { id: 'c', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Chci tohle. = Би үүнийг хүсэж байна.'
      },
    ],
  },
  'a0-2-e': {
    id: 'a0-2-e-dialogue', titleMn: 'Богино яриа — мөнгө, карт', contextMn: 'Төлбөр хийх мөчид танд карт ч, бэлэн мөнгө ч байхгүй байна.',
    steps: [
      {
        id: 'a02e-d1', speaker: 'Үйлчлэгч', staffCzech: 'Karta?', staffMn: 'Картаар уу?', promptMn: 'Карт байхгүйгээ хэлээрэй.',
        choices: [{ id: 'a', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' }, { id: 'b', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' }, { id: 'c', text: 'Chci kartu.', mongolian: 'Би карт хүсэж байна.' }], correctId: 'a', feedbackMn: 'Nemám kartu. = Надад карт байхгүй.'
      },
      {
        id: 'a02e-d2', speaker: 'Үйлчлэгч', staffCzech: 'Peníze?', staffMn: 'Бэлэн мөнгө байна уу?', promptMn: 'Та бэлэн мөнгө ч байхгүйгээ хэлээрэй.',
        choices: [{ id: 'a', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' }, { id: 'b', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' }, { id: 'c', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }], correctId: 'b', feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.'
      },
    ],
  },
  'a0-2-f': {
    id: 'a0-2-f-dialogue', titleMn: 'Богино яриа — эелдэг тусламж хүсэх', contextMn: 'Ресепшний ажилтан таны хэрэгцээг асууж байна.',
    steps: [
      {
        id: 'a02f-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Co potřebujete?', staffMn: 'Танд юу хэрэгтэй вэ?', promptMn: 'Та эелдгээр тусламж хүсээрэй.',
        choices: [{ id: 'a', text: 'Potřebuji pomoc, prosím.', mongolian: 'Надад туслаач, гуйя.' }, { id: 'b', text: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.' }, { id: 'c', text: 'Na shledanou.', mongolian: 'Баяртай.' }], correctId: 'a', feedbackMn: 'Potřebuji pomoc, prosím. = Надад туслаач, гуйя.'
      },
      {
        id: 'a02f-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobře.', staffMn: 'За.', promptMn: 'Талархаарай.',
        choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' }, { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }], correctId: 'a', feedbackMn: 'Děkuji. = Баярлалаа.'
      },
    ],
  },
};

export const a0NeedsFinalDialogue: DialogueScenario = {
  id: 'a0-2-final-dialogue', titleMn: 'Төгсгөлийн бодит яриа', contextMn: 'Та ресепшнд очоод ус, утас, идэх юм хэрэгтэйгээ хэлнэ. Төлбөрийн хэрэгсэл байхгүй тул эелдгээр тусламж хүснэ.',
  steps: [
    {
      id: 'a02final-d1', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobrý den. Co potřebujete?', staffMn: 'Сайн байна уу. Танд юу хэрэгтэй вэ?', promptMn: 'Та эелдгээр тусламж хүсээрэй.',
      choices: [{ id: 'a', text: 'Potřebuji pomoc, prosím.', mongolian: 'Надад туслаач, гуйя.' }, { id: 'b', text: 'Na shledanou.', mongolian: 'Баяртай.' }, { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }], correctId: 'a', feedbackMn: 'Potřebuji pomoc, prosím. = Надад туслаач, гуйя.'
    },
    {
      id: 'a02final-d2', speaker: 'Ресепшний ажилтан', staffCzech: 'Voda?', staffMn: 'Ус хэрэгтэй юу?', promptMn: 'Танд ус хэрэгтэйгээ хэлээрэй.',
      choices: [{ id: 'a', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' }, { id: 'b', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }, { id: 'c', text: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.' }], correctId: 'b', feedbackMn: 'Potřebuji vodu. = Надад ус хэрэгтэй.'
    },
    {
      id: 'a02final-d3', speaker: 'Ресепшний ажилтан', staffCzech: 'Ještě něco?', staffMn: 'Өөр зүйл хэрэгтэй юу?', promptMn: 'Та утас бас хэрэгтэйгээ хэлээрэй.',
      choices: [{ id: 'a', text: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.' }, { id: 'b', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }, { id: 'c', text: 'Chci tohle.', mongolian: 'Би үүнийг хүсэж байна.' }], correctId: 'a', feedbackMn: 'Potřebuji telefon. = Надад утас хэрэгтэй.'
    },
    {
      id: 'a02final-d4', speaker: 'Ресепшний ажилтан', staffCzech: 'Jídlo?', staffMn: 'Идэх юм хэрэгтэй юу?', promptMn: 'Та идэх юм хүсэж байгаагаа хэлээрэй.',
      choices: [{ id: 'a', text: 'Chci něco k jídlu.', mongolian: 'Би идэх юм хүсэж байна.' }, { id: 'b', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' }, { id: 'c', text: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Chci něco k jídlu. = Би идэх юм хүсэж байна.'
    },
    {
      id: 'a02final-d5', speaker: 'Ресепшний ажилтан', staffCzech: 'Karta?', staffMn: 'Картаар уу?', promptMn: 'Карт байхгүйгээ хэлээрэй.',
      choices: [{ id: 'a', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' }, { id: 'b', text: 'Chci kartu.', mongolian: 'Би карт хүсэж байна.' }, { id: 'c', text: 'Potřebuji kartu.', mongolian: 'Надад карт хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Nemám kartu. = Надад карт байхгүй.'
    },
    {
      id: 'a02final-d6', speaker: 'Ресепшний ажилтан', staffCzech: 'Peníze?', staffMn: 'Бэлэн мөнгө байна уу?', promptMn: 'Мөнгө байхгүйгээ хэлээрэй.',
      choices: [{ id: 'a', text: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.' }, { id: 'b', text: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.' }, { id: 'c', text: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.' }], correctId: 'a', feedbackMn: 'Nemám peníze. = Надад мөнгө байхгүй.'
    },
    {
      id: 'a02final-d7', speaker: 'Ресепшний ажилтан', staffCzech: 'Dobře, pomůžu.', staffMn: 'За, би тусална.', promptMn: 'Та туслахаар болсонд нь талархаарай.',
      choices: [{ id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' }, { id: 'b', text: 'Ne.', mongolian: 'Үгүй.' }, { id: 'c', text: 'Kdo jste?', mongolian: 'Та хэн бэ?' }], correctId: 'a', feedbackMn: 'Тусална гэж хэлсний дараа Děkuji. гэж хариулна.'
    },
  ],
};
