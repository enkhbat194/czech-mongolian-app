import type { DialogueScenario } from './a0Dialogues';

export const a0WorkMicroDialogues: Record<string, DialogueScenario> = {
  'a0-6-a': {
    id:'a0-6-a-dialogue', titleMn:'Богино яриа — хаана ажилладаг вэ?', contextMn:'Шинэ хүн таны ажлын газрыг асууж байна.',
    steps:[{
      id:'a06a-d1', speaker:'Ажилтан', staffCzech:'Kde pracujete?', staffMn:'Та хаана ажилладаг вэ?', promptMn:'Та энд ажилладгаа хэлээрэй.',
      choices:[{id:'a',text:'Pracuji tady.',mongolian:'Би энд ажилладаг.'},{id:'b',text:'Mám směnu.',mongolian:'Би ээлжтэй.'},{id:'c',text:'Je hotovo?',mongolian:'Дууссан уу?'}], correctId:'a', feedbackMn:'Pracuji tady. = Би энд ажилладаг.'
    }],
  },
  'a0-6-b': {
    id:'a0-6-b-dialogue', titleMn:'Богино яриа — эхлэх ба тарах цаг', contextMn:'Та ажлын цагийн мэдээллийг сонсож байна.',
    steps:[
      {
        id:'a06b-d1', speaker:'Ахлагч', staffCzech:'Začínáme v osm.', staffMn:'Бид найман цагт эхэлнэ.', promptMn:'Та ойлгосноо эелдгээр хэлээрэй.',
        choices:[{id:'a',text:'Děkuji.',mongolian:'Баярлалаа.'},{id:'b',text:'Kdy končíme?',mongolian:'Бид хэзээ тарах вэ?'},{id:'c',text:'Nerozumím.',mongolian:'Би ойлгохгүй байна.'}], correctId:'a', feedbackMn:'Ажлын эхлэх цагийг ойлгосон бол Děkuji. гэж хэлж болно.'
      },
      {
        id:'a06b-d2', speaker:'Ахлагч', staffCzech:'Prosím?', staffMn:'Уучлаарай? Дахин хэлнэ үү?', promptMn:'Та тарах цагийг асуугаарай.',
        choices:[{id:'a',text:'Kdy končíme?',mongolian:'Бид хэзээ тарах вэ?'},{id:'b',text:'Kdy je přestávka?',mongolian:'Завсарлага хэзээ вэ?'},{id:'c',text:'Co mám dělat?',mongolian:'Би юу хийх вэ?'}], correctId:'a', feedbackMn:'Kdy končíme? = Бид хэзээ тарах вэ?'
      },
    ],
  },
  'a0-6-c': {
    id:'a0-6-c-dialogue', titleMn:'Богино яриа — ээлж ба завсарлага', contextMn:'Та ажлын өдрийн хэмнэлийг тодруулж байна.',
    steps:[
      {
        id:'a06c-d1', speaker:'Ахлагч', staffCzech:'Směna?', staffMn:'Ээлж үү?', promptMn:'Та ээлжтэй гэдгээ хэлээрэй.',
        choices:[{id:'a',text:'Mám směnu.',mongolian:'Би ээлжтэй.'},{id:'b',text:'Pracuji tady.',mongolian:'Би энд ажилладаг.'},{id:'c',text:'Je hotovo?',mongolian:'Дууссан уу?'}], correctId:'a', feedbackMn:'Mám směnu. = Би ээлжтэй.'
      },
      {
        id:'a06c-d2', speaker:'Ахлагч', staffCzech:'Prosím?', staffMn:'Уучлаарай? Дахин хэлнэ үү?', promptMn:'Та завсарлага хэзээ болохыг асуугаарай.',
        choices:[{id:'a',text:'Kdy je přestávka?',mongolian:'Завсарлага хэзээ вэ?'},{id:'b',text:'Kdy končíme?',mongolian:'Бид хэзээ тарах вэ?'},{id:'c',text:'Kde pracujete?',mongolian:'Та хаана ажилладаг вэ?'}], correctId:'a', feedbackMn:'Kdy je přestávka? = Завсарлага хэзээ вэ?'
      },
    ],
  },
  'a0-6-d': {
    id:'a0-6-d-dialogue', titleMn:'Богино яриа — юу хийх вэ?', contextMn:'Та шинэ даалгавраа ойлгохгүй байна.',
    steps:[{
      id:'a06d-d1', speaker:'Ахлагч', staffCzech:'Práce?', staffMn:'Ажил?', promptMn:'Та юу хийхээ асуугаарай.',
      choices:[{id:'a',text:'Co mám dělat?',mongolian:'Би юу хийх вэ?'},{id:'b',text:'Kdy končíme?',mongolian:'Бид хэзээ тарах вэ?'},{id:'c',text:'Kde pracujete?',mongolian:'Та хаана ажилладаг вэ?'}], correctId:'a', feedbackMn:'Co mám dělat? = Би юу хийх вэ?'
    }],
  },
  'a0-6-e': {
    id:'a0-6-e-dialogue', titleMn:'Богино яриа — тусламж хэрэгтэй', contextMn:'Та ажил дээр даалгавраа хийж байхдаа тусламж хүсэж байна.',
    steps:[
      {
        id:'a06e-d1', speaker:'Ахлагч', staffCzech:'Je hotovo?', staffMn:'Дууссан уу?', promptMn:'Та асуултыг таньж, ойлгосноо хэлээрэй.',
        choices:[{id:'a',text:'Nerozumím.',mongolian:'Би ойлгохгүй байна.'},{id:'b',text:'Děkuji.',mongolian:'Баярлалаа.'},{id:'c',text:'Mám směnu.',mongolian:'Би ээлжтэй.'}], correctId:'a', feedbackMn:'Ойлгохгүй бол эхлээд Nerozumím. гэж хэлж болно.'
      },
      {
        id:'a06e-d2', speaker:'Ахлагч', staffCzech:'Prosím?', staffMn:'Уучлаарай? Дахин хэлнэ үү?', promptMn:'Та тусламж хэрэгтэйгээ хэлээрэй.',
        choices:[{id:'a',text:'Potřebuji pomoc.',mongolian:'Надад тусламж хэрэгтэй.'},{id:'b',text:'Je hotovo?',mongolian:'Дууссан уу?'},{id:'c',text:'Kdy je přestávka?',mongolian:'Завсарлага хэзээ вэ?'}], correctId:'a', feedbackMn:'Potřebuji pomoc. = Надад тусламж хэрэгтэй.'
      },
    ],
  },
};

export const a0WorkFinalDialogue: DialogueScenario = {
  id:'a0-6-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та шинэ ажлын газартаа ажлын цаг, завсарлага, даалгавраа тодруулж байна.',
  steps:[
    {
      id:'a06final-d1', speaker:'Ахлагч', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Та энд ажилладгаа хэлээрэй.',
      choices:[{id:'a',text:'Pracuji tady.',mongolian:'Би энд ажилладаг.'},{id:'b',text:'Mám čas.',mongolian:'Би завтай.'},{id:'c',text:'Jdu na nádraží.',mongolian:'Би галт тэрэгний буудал руу явж байна.'}], correctId:'a', feedbackMn:'Pracuji tady. = Би энд ажилладаг.'
    },
    {
      id:'a06final-d2', speaker:'Ахлагч', staffCzech:'Začínáme v osm.', staffMn:'Бид найман цагт эхэлнэ.', promptMn:'Та тарах цагийг асуугаарай.',
      choices:[{id:'a',text:'Kdy končíme?',mongolian:'Бид хэзээ тарах вэ?'},{id:'b',text:'Kdy je přestávka?',mongolian:'Завсарлага хэзээ вэ?'},{id:'c',text:'Co mám dělat?',mongolian:'Би юу хийх вэ?'}], correctId:'a', feedbackMn:'Kdy končíme? = Бид хэзээ тарах вэ?'
    },
    {
      id:'a06final-d3', speaker:'Ахлагч', staffCzech:'Směna?', staffMn:'Ээлж үү?', promptMn:'Та ээлжтэй гэдгээ хэлээрэй.',
      choices:[{id:'a',text:'Mám směnu.',mongolian:'Би ээлжтэй.'},{id:'b',text:'Mám čas.',mongolian:'Би завтай.'},{id:'c',text:'Je hotovo?',mongolian:'Дууссан уу?'}], correctId:'a', feedbackMn:'Mám směnu. = Би ээлжтэй.'
    },
    {
      id:'a06final-d4', speaker:'Ахлагч', staffCzech:'Prosím?', staffMn:'Уучлаарай? Дахин хэлнэ үү?', promptMn:'Та завсарлага хэзээ болохыг асуугаарай.',
      choices:[{id:'a',text:'Kdy je přestávka?',mongolian:'Завсарлага хэзээ вэ?'},{id:'b',text:'Kdy končíme?',mongolian:'Бид хэзээ тарах вэ?'},{id:'c',text:'Kde pracujete?',mongolian:'Та хаана ажилладаг вэ?'}], correctId:'a', feedbackMn:'Kdy je přestávka? = Завсарлага хэзээ вэ?'
    },
    {
      id:'a06final-d5', speaker:'Ахлагч', staffCzech:'Práce?', staffMn:'Ажил?', promptMn:'Та юу хийхээ асуугаарай.',
      choices:[{id:'a',text:'Co mám dělat?',mongolian:'Би юу хийх вэ?'},{id:'b',text:'Je hotovo?',mongolian:'Дууссан уу?'},{id:'c',text:'Kdy máte čas?',mongolian:'Та хэзээ завтай вэ?'}], correctId:'a', feedbackMn:'Co mám dělat? = Би юу хийх вэ?'
    },
    {
      id:'a06final-d6', speaker:'Ахлагч', staffCzech:'Je hotovo?', staffMn:'Дууссан уу?', promptMn:'Та ойлгохгүй байгаагаа хэлээд тусламж хүсээрэй.',
      choices:[{id:'a',text:'Nerozumím. Potřebuji pomoc.',mongolian:'Би ойлгохгүй байна. Надад тусламж хэрэгтэй.'},{id:'b',text:'Děkuji. Na shledanou.',mongolian:'Баярлалаа. Баяртай.'},{id:'c',text:'Mám směnu.',mongolian:'Би ээлжтэй.'}], correctId:'a', feedbackMn:'Ойлгохгүй бол Nerozumím. гэж хэлээд, Potřebuji pomoc. гэж тусламж хүснэ.'
    },
  ],
};
