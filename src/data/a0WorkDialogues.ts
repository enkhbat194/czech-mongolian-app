import type { DialogueScenario } from './a0Dialogues';

export const a0WorkMicroDialogues: Record<string, DialogueScenario> = {
  'a0-6-a': {
    id: 'a0-6-a-dialogue',
    titleMn: 'Богино яриа — хаана ажилладаг вэ?',
    contextMn: 'Шинэ ажилтан таныг энэ газарт ажилладаг эсэхийг асууж байна.',
    steps: [{
      id: 'a06a-d1', speaker: 'Ажилтан', staffCzech: 'Kde pracujete?', staffMn: 'Та хаана ажилладаг вэ?',
      promptMn: 'Та энд ажилладгаа хэлээрэй.',
      choices: [
        { id: 'a', text: 'Pracuji tady.', mongolian: 'Би энд ажилладаг.' },
        { id: 'b', text: 'Mám směnu.', mongolian: 'Би ээлжтэй.' },
        { id: 'c', text: 'Je hotovo?', mongolian: 'Дууссан уу?' },
      ], correctId: 'a', feedbackMn: 'Pracuji tady. = Би энд ажилладаг.'
    }],
  },
  'a0-6-b': {
    id: 'a0-6-b-dialogue',
    titleMn: 'Богино яриа — эхлэх ба тарах цаг',
    contextMn: 'Ахлагч таны ажлын эхлэх цагийг хэллээ. Та тарах цагаа тодруулж байна.',
    steps: [{
      id: 'a06b-d1', speaker: 'Ахлагч', staffCzech: 'Začínáme v osm.', staffMn: 'Бид найман цагт эхэлнэ.',
      promptMn: 'Та ажил хэзээ тарахыг асуугаарай.',
      choices: [
        { id: 'a', text: 'Kdy končíme?', mongolian: 'Бид хэзээ тарах вэ?' },
        { id: 'b', text: 'Kdy je přestávka?', mongolian: 'Завсарлага хэзээ вэ?' },
        { id: 'c', text: 'Kde pracujete?', mongolian: 'Та хаана ажилладаг вэ?' },
      ], correctId: 'a', feedbackMn: 'Začínáme v osm. гэдгийг сонссоны дараа Kdy končíme? гэж тарах цагаа асууж болно.'
    }],
  },
  'a0-6-c': {
    id: 'a0-6-c-dialogue',
    titleMn: 'Богино яриа — ээлж ба завсарлага',
    contextMn: 'Ахлагч таны ажлын өдрийн хуваарийг тодруулж байна.',
    steps: [
      {
        id: 'a06c-d1', speaker: 'Ахлагч', staffCzech: 'Máte směnu?', staffMn: 'Та ээлжтэй юу?',
        promptMn: 'Та ээлжтэй гэдгээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Mám směnu.', mongolian: 'Би ээлжтэй.' },
          { id: 'b', text: 'Pracuji tady.', mongolian: 'Би энд ажилладаг.' },
          { id: 'c', text: 'Je hotovo?', mongolian: 'Дууссан уу?' },
        ], correctId: 'a', feedbackMn: 'Mám směnu. = Би ээлжтэй.'
      },
      {
        id: 'a06c-d2', speaker: 'Ахлагч', staffCzech: 'Dobře.', staffMn: 'За.',
        promptMn: 'Та завсарлага хэзээ болохыг асуугаарай.',
        choices: [
          { id: 'a', text: 'Kdy je přestávka?', mongolian: 'Завсарлага хэзээ вэ?' },
          { id: 'b', text: 'Kdy končíme?', mongolian: 'Бид хэзээ тарах вэ?' },
          { id: 'c', text: 'Kde pracujete?', mongolian: 'Та хаана ажилладаг вэ?' },
        ], correctId: 'a', feedbackMn: 'Kdy je přestávka? = Завсарлага хэзээ вэ?'
      },
    ],
  },
  'a0-6-d': {
    id: 'a0-6-d-dialogue',
    titleMn: 'Богино яриа — юу хийх вэ?',
    contextMn: 'Ахлагч танд шинэ даалгавар өглөө, гэхдээ та яг юу хийхээ мэдэхгүй байна.',
    steps: [{
      id: 'a06d-d1', speaker: 'Ахлагч', staffCzech: 'Nový úkol.', staffMn: 'Шинэ даалгавар.',
      promptMn: 'Та юу хийхээ асуугаарай.',
      choices: [
        { id: 'a', text: 'Co mám dělat?', mongolian: 'Би юу хийх вэ?' },
        { id: 'b', text: 'Kdy končíme?', mongolian: 'Бид хэзээ тарах вэ?' },
        { id: 'c', text: 'Kde pracujete?', mongolian: 'Та хаана ажилладаг вэ?' },
      ], correctId: 'a', feedbackMn: 'Co mám dělat? = Би юу хийх вэ? Даалгавар ойлгомжгүй үед шууд асууна.'
    }],
  },
  'a0-6-e': {
    id: 'a0-6-e-dialogue',
    titleMn: 'Богино яриа — дууссан уу, тусламж хэрэгтэй юу?',
    contextMn: 'Та нэг даалгавраа дуусгасан ч дараагийн ажил дээр тусламж хэрэгтэй боллоо.',
    steps: [
      {
        id: 'a06e-d1', speaker: 'Ахлагч', staffCzech: 'Je hotovo?', staffMn: 'Дууссан уу?',
        promptMn: 'Та даалгавар дууссан гэдгийг товч хэлээрэй.',
        choices: [
          { id: 'a', text: 'Hotovo.', mongolian: 'Дууссан.' },
          { id: 'b', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' },
          { id: 'c', text: 'Mám směnu.', mongolian: 'Би ээлжтэй.' },
        ], correctId: 'a', feedbackMn: 'Hotovo. = Дууссан.'
      },
      {
        id: 'a06e-d2', speaker: 'Ахлагч', staffCzech: 'Nový úkol.', staffMn: 'Шинэ даалгавар.',
        promptMn: 'Та энэ даалгаварт тусламж хэрэгтэйгээ хэлээрэй.',
        choices: [
          { id: 'a', text: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.' },
          { id: 'b', text: 'Je hotovo?', mongolian: 'Дууссан уу?' },
          { id: 'c', text: 'Kdy je přestávka?', mongolian: 'Завсарлага хэзээ вэ?' },
        ], correctId: 'a', feedbackMn: 'Potřebuji pomoc. = Надад тусламж хэрэгтэй.'
      },
    ],
  },
};

export const a0WorkFinalDialogue: DialogueScenario = {
  id: 'a0-6-final-dialogue',
  titleMn: 'Төгсгөлийн бодит яриа',
  contextMn: 'Та шинэ ажлын өдрөө эхлүүлж байна: ажлын цаг, завсарлага, даалгавраа тодруулж, шаардлагатай үед тусламж хүснэ.',
  steps: [
    {
      id: 'a06final-d1', speaker: 'Ахлагч', staffCzech: 'Pracujete tady?', staffMn: 'Та энд ажилладаг уу?',
      promptMn: 'Та энд ажилладгаа хэлээрэй.',
      choices: [
        { id: 'a', text: 'Pracuji tady.', mongolian: 'Би энд ажилладаг.' },
        { id: 'b', text: 'Mám čas.', mongolian: 'Би завтай.' },
        { id: 'c', text: 'Jdu na nádraží.', mongolian: 'Би галт тэрэгний буудал руу явж байна.' },
      ], correctId: 'a', feedbackMn: 'Pracuji tady. = Би энд ажилладаг.'
    },
    {
      id: 'a06final-d2', speaker: 'Ахлагч', staffCzech: 'Začínáme v osm.', staffMn: 'Бид найман цагт эхэлнэ.',
      promptMn: 'Та тарах цагаа асуугаарай.',
      choices: [
        { id: 'a', text: 'Kdy končíme?', mongolian: 'Бид хэзээ тарах вэ?' },
        { id: 'b', text: 'Kdy je přestávka?', mongolian: 'Завсарлага хэзээ вэ?' },
        { id: 'c', text: 'Co mám dělat?', mongolian: 'Би юу хийх вэ?' },
      ], correctId: 'a', feedbackMn: 'Kdy končíme? = Бид хэзээ тарах вэ?'
    },
    {
      id: 'a06final-d3', speaker: 'Ахлагч', staffCzech: 'V pět.', staffMn: 'Таван цагт.',
      promptMn: 'Та завсарлага хэзээ болохыг асуугаарай.',
      choices: [
        { id: 'a', text: 'Kdy je přestávka?', mongolian: 'Завсарлага хэзээ вэ?' },
        { id: 'b', text: 'Kde pracujete?', mongolian: 'Та хаана ажилладаг вэ?' },
        { id: 'c', text: 'Je hotovo?', mongolian: 'Дууссан уу?' },
      ], correctId: 'a', feedbackMn: 'Ажлын өдөрт завсарлага хэрэгтэй бол Kdy je přestávka? гэж асууна.'
    },
    {
      id: 'a06final-d4', speaker: 'Ахлагч', staffCzech: 'Ve dvanáct.', staffMn: 'Арван хоёр цагт.',
      promptMn: 'Та мэдээллийг ойлгосон бол талархаарай.',
      choices: [
        { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        { id: 'b', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' },
        { id: 'c', text: 'Mám směnu.', mongolian: 'Би ээлжтэй.' },
      ], correctId: 'a', feedbackMn: 'Ойлгосон мэдээллийн дараа Děkuji. гэж хариулна.'
    },
    {
      id: 'a06final-d5', speaker: 'Ахлагч', staffCzech: 'Nový úkol.', staffMn: 'Шинэ даалгавар.',
      promptMn: 'Та юу хийхээ асуугаарай.',
      choices: [
        { id: 'a', text: 'Co mám dělat?', mongolian: 'Би юу хийх вэ?' },
        { id: 'b', text: 'Je hotovo?', mongolian: 'Дууссан уу?' },
        { id: 'c', text: 'Kdy máte čas?', mongolian: 'Та хэзээ завтай вэ?' },
      ], correctId: 'a', feedbackMn: 'Co mám dělat? = Би юу хийх вэ?'
    },
    {
      id: 'a06final-d6', speaker: 'Ахлагч', staffCzech: 'Tady je úkol.', staffMn: 'Энд даалгавар байна.',
      promptMn: 'Та даалгавар ойлгомжгүй байвал ойлгохгүй байгаагаа хэлээд тусламж хүсээрэй.',
      choices: [
        { id: 'a', text: 'Nerozumím. Potřebuji pomoc.', mongolian: 'Би ойлгохгүй байна. Надад тусламж хэрэгтэй.' },
        { id: 'b', text: 'Děkuji. Na shledanou.', mongolian: 'Баярлалаа. Баяртай.' },
        { id: 'c', text: 'Mám směnu.', mongolian: 'Би ээлжтэй.' },
      ], correctId: 'a', feedbackMn: 'Ойлгохгүй бол Nerozumím. гэж хэлээд Potřebuji pomoc. гэж тусламж хүснэ.'
    },
  ],
};
