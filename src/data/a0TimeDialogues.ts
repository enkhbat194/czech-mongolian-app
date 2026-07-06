import type { DialogueScenario } from './a0Dialogues';

export const a0TimeMicroDialogues: Record<string, DialogueScenario> = {
  'a0-5-a': {
    id:'a0-5-a-dialogue', titleMn:'Богино яриа — цаг асуух', contextMn:'Та цаг харах боломжгүй болсон байна.',
    steps:[{
      id:'a05a-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Цаг хэд болж байгааг асуугаарай.',
      choices:[{id:'a',text:'Kolik je hodin?',mongolian:'Цаг хэд болж байна?'},{id:'b',text:'Kdy máte čas?',mongolian:'Та хэзээ завтай вэ?'},{id:'c',text:'Kam jedete?',mongolian:'Та хаашаа явж байна?'}], correctId:'a', feedbackMn:'Kolik je hodin? = Цаг хэд болж байна?'
    }],
  },
  'a0-5-b': {
    id:'a0-5-b-dialogue', titleMn:'Богино яриа — өнөөдөр эсвэл маргааш', contextMn:'Та уулзалтын өдрийг тодруулж байна.',
    steps:[
      {
        id:'a05b-d1', speaker:'Ажилтан', staffCzech:'Dnes, nebo zítra?', staffMn:'Өнөөдөр үү, маргааш уу?', promptMn:'Та маргаашийг сонгоорой.',
        choices:[{id:'a',text:'dnes',mongolian:'өнөөдөр'},{id:'b',text:'zítra',mongolian:'маргааш'},{id:'c',text:'večer',mongolian:'орой'}], correctId:'b', feedbackMn:'zítra = маргааш.'
      },
      {
        id:'a05b-d2', speaker:'Ажилтан', staffCzech:'Ráno, nebo večer?', staffMn:'Өглөө юу, орой юу?', promptMn:'Та оройг сонгоорой.',
        choices:[{id:'a',text:'ráno',mongolian:'өглөө'},{id:'b',text:'večer',mongolian:'орой'},{id:'c',text:'teď',mongolian:'одоо'}], correctId:'b', feedbackMn:'večer = орой.'
      },
    ],
  },
  'a0-5-c': {
    id:'a0-5-c-dialogue', titleMn:'Богино яриа — завтай эсэх', contextMn:'Хэн нэгэн уулзах боломжтой эсэхийг асууж байна.',
    steps:[
      {
        id:'a05c-d1', speaker:'Ажилтан', staffCzech:'Kdy máte čas?', staffMn:'Та хэзээ завтай вэ?', promptMn:'Та одоогоор завгүй байгаагаа хэлээрэй.',
        choices:[{id:'a',text:'Mám čas.',mongolian:'Би завтай.'},{id:'b',text:'Nemám čas.',mongolian:'Би завгүй.'},{id:'c',text:'Kdy?',mongolian:'Хэзээ?'}], correctId:'b', feedbackMn:'Nemám čas. = Би завгүй.'
      },
      {
        id:'a05c-d2', speaker:'Ажилтан', staffCzech:'Zítra?', staffMn:'Маргааш уу?', promptMn:'Та маргааш завтай гэдгээ хэлээрэй.',
        choices:[{id:'a',text:'Mám čas.',mongolian:'Би завтай.'},{id:'b',text:'Nemám čas.',mongolian:'Би завгүй.'},{id:'c',text:'Večer.',mongolian:'Орой.'}], correctId:'a', feedbackMn:'Mám čas. = Би завтай.'
      },
    ],
  },
  'a0-5-d': {
    id:'a0-5-d-dialogue', titleMn:'Богино яриа — уулзалтын цаг', contextMn:'Ажилтан танд уулзалтын цагийг хэлж байна.',
    steps:[{
      id:'a05d-d1', speaker:'Ажилтан', staffCzech:'Máme schůzku v osm.', staffMn:'Бид найман цагт уулзалттай.', promptMn:'Та ойлгосноо талархаад хэлээрэй.',
      choices:[{id:'a',text:'Děkuji.',mongolian:'Баярлалаа.'},{id:'b',text:'Nerozumím.',mongolian:'Би ойлгохгүй байна.'},{id:'c',text:'Kdy?',mongolian:'Хэзээ?'}], correctId:'a', feedbackMn:'Уулзалтын цагийг ойлгосон бол Děkuji. гэж хэлж болно.'
    }],
  },
};

export const a0TimeFinalDialogue: DialogueScenario = {
  id:'a0-5-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та уулзалтын өдөр, цаг, боломжоо тодруулж байна.',
  steps:[
    {
      id:'a05final-d1', speaker:'Ажилтан', staffCzech:'Dnes, nebo zítra?', staffMn:'Өнөөдөр үү, маргааш уу?', promptMn:'Та маргаашийг сонгоорой.',
      choices:[{id:'a',text:'dnes',mongolian:'өнөөдөр'},{id:'b',text:'zítra',mongolian:'маргааш'},{id:'c',text:'teď',mongolian:'одоо'}], correctId:'b', feedbackMn:'zítra = маргааш.'
    },
    {
      id:'a05final-d2', speaker:'Ажилтан', staffCzech:'Ráno, nebo večer?', staffMn:'Өглөө юу, орой юу?', promptMn:'Та оройг сонгоорой.',
      choices:[{id:'a',text:'ráno',mongolian:'өглөө'},{id:'b',text:'večer',mongolian:'орой'},{id:'c',text:'v osm',mongolian:'найман цагт'}], correctId:'b', feedbackMn:'večer = орой.'
    },
    {
      id:'a05final-d3', speaker:'Ажилтан', staffCzech:'Kdy máte čas?', staffMn:'Та хэзээ завтай вэ?', promptMn:'Та маргааш завтай гэдгээ хэлээрэй.',
      choices:[{id:'a',text:'Mám čas.',mongolian:'Би завтай.'},{id:'b',text:'Nemám čas.',mongolian:'Би завгүй.'},{id:'c',text:'Kolik je hodin?',mongolian:'Цаг хэд болж байна?'}], correctId:'a', feedbackMn:'Mám čas. = Би завтай.'
    },
    {
      id:'a05final-d4', speaker:'Ажилтан', staffCzech:'Máme schůzku v osm.', staffMn:'Бид найман цагт уулзалттай.', promptMn:'Та ойлгосноо эелдгээр хэлээрэй.',
      choices:[{id:'a',text:'Děkuji.',mongolian:'Баярлалаа.'},{id:'b',text:'Nerozumím.',mongolian:'Би ойлгохгүй байна.'},{id:'c',text:'Na shledanou.',mongolian:'Баяртай.'}], correctId:'a', feedbackMn:'Уулзалтын цагийг ойлгосон бол Děkuji. гэж хэлж болно.'
    },
    {
      id:'a05final-d5', speaker:'Ажилтан', staffCzech:'Na shledanou.', staffMn:'Баяртай.', promptMn:'Яриаг албан хэлбэрээр дуусгаарай.',
      choices:[{id:'a',text:'Na shledanou.',mongolian:'Баяртай.'},{id:'b',text:'Ahoj.',mongolian:'Сайн уу.'},{id:'c',text:'Ne.',mongolian:'Үгүй.'}], correctId:'a', feedbackMn:'Na shledanou. = Албан болон саармаг баяртай.'
    },
  ],
};
