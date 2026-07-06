import type { DialogueScenario } from './a0Dialogues';

export const a0DirectionsMicroDialogues: Record<string, DialogueScenario> = {
  'a0-4-a': {
    id:'a0-4-a-dialogue', titleMn:'Богино яриа — чиглэл сонсох', contextMn:'Та зам асуугаад энгийн заавар сонсож байна.',
    steps:[{
      id:'a04a-d1', speaker:'Ажилтан', staffCzech:'Jděte rovně.', staffMn:'Шулуун яваарай.', promptMn:'Ажилтан ямар чиглэл заав?',
      choices:[{id:'a',text:'rovně',mongolian:'шулуун'},{id:'b',text:'doleva',mongolian:'зүүн тийш'},{id:'c',text:'doprava',mongolian:'баруун тийш'}], correctId:'a', feedbackMn:'Jděte rovně. = Шулуун яваарай.'
    }],
  },
  'a0-4-b': {
    id:'a0-4-b-dialogue', titleMn:'Богино яриа — буудал асуух', contextMn:'Та автобус эсвэл трамвайн буудлыг хайж байна.',
    steps:[
      {
        id:'a04b-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Буудал хаана байгааг асуугаарай.',
        choices:[{id:'a',text:'Kde je zastávka?',mongolian:'Буудал хаана байна?'},{id:'b',text:'Kde je nádraží?',mongolian:'Галт тэрэгний буудал хаана байна?'},{id:'c',text:'Kam jedete?',mongolian:'Та хаашаа явж байна?'}], correctId:'a', feedbackMn:'Kde je zastávka? = Буудал хаана байна?'
      },
      {
        id:'a04b-d2', speaker:'Ажилтан', staffCzech:'Autobus, nebo tramvaj?', staffMn:'Автобус уу, трамвай юу?', promptMn:'Та трамвайг сонгоорой.',
        choices:[{id:'a',text:'autobus',mongolian:'автобус'},{id:'b',text:'tramvaj',mongolian:'трамвай'},{id:'c',text:'zastávka',mongolian:'буудал'}], correctId:'b', feedbackMn:'tramvaj = трамвай.'
      },
    ],
  },
  'a0-4-c': {
    id:'a0-4-c-dialogue', titleMn:'Богино яриа — тээврийн заавар', contextMn:'Ажилтан танд аль тээврээр явахыг хэлж байна.',
    steps:[{
      id:'a04c-d1', speaker:'Ажилтан', staffCzech:'Nádraží?', staffMn:'Галт тэрэгний буудал уу?', promptMn:'Ажилтны трамвайгаар явах зааврыг сонгоорой.',
      choices:[{id:'a',text:'Jeďte autobusem.',mongolian:'Автобусаар яваарай.'},{id:'b',text:'Jeďte tramvají.',mongolian:'Трамвайгаар яваарай.'},{id:'c',text:'Jděte rovně.',mongolian:'Шулуун яваарай.'}], correctId:'b', feedbackMn:'Jeďte tramvají. = Трамвайгаар яваарай.'
    }],
  },
  'a0-4-d': {
    id:'a0-4-d-dialogue', titleMn:'Богино яриа — буух газар', contextMn:'Та тээврээр явж байхдаа буух заавар сонсож байна.',
    steps:[{
      id:'a04d-d1', speaker:'Жолооч', staffCzech:'Vystupte tady.', staffMn:'Энд буугаарай.', promptMn:'Та ойлгосноо эелдгээр хариулаарай.',
      choices:[{id:'a',text:'Děkuji.',mongolian:'Баярлалаа.'},{id:'b',text:'Kde je zastávka?',mongolian:'Буудал хаана байна?'},{id:'c',text:'Kam jedete?',mongolian:'Та хаашаа явж байна?'}], correctId:'a', feedbackMn:'Vystupte tady. = Энд буугаарай. Талархаад Děkuji. гэж хэлж болно.'
    }],
  },
  'a0-4-e': {
    id:'a0-4-e-dialogue', titleMn:'Богино яриа — очих газраа хэлэх', contextMn:'Ажилтан таныг хаашаа явж байгааг асууж байна.',
    steps:[{
      id:'a04e-d1', speaker:'Ажилтан', staffCzech:'Kam jedete?', staffMn:'Та хаашаа явж байна?', promptMn:'Та галт тэрэгний буудал руу явж байгаагаа хэлээрэй.',
      choices:[{id:'a',text:'Jdu na nádraží.',mongolian:'Би галт тэрэгний буудал руу явж байна.'},{id:'b',text:'Vystupte tady.',mongolian:'Энд буугаарай.'},{id:'c',text:'Jeďte autobusem.',mongolian:'Автобусаар яваарай.'}], correctId:'a', feedbackMn:'Jdu na nádraží. = Би галт тэрэгний буудал руу явж байна.'
    }],
  },
};

export const a0DirectionsFinalDialogue: DialogueScenario = {
  id:'a0-4-final-dialogue', titleMn:'Төгсгөлийн бодит яриа', contextMn:'Та буудал руу явах чиглэл асууж, тээврийн зааврыг ойлгож байна.',
  steps:[
    {
      id:'a04final-d1', speaker:'Ажилтан', staffCzech:'Dobrý den.', staffMn:'Сайн байна уу.', promptMn:'Буудал хаана байгааг асуугаарай.',
      choices:[{id:'a',text:'Kde je zastávka?',mongolian:'Буудал хаана байна?'},{id:'b',text:'Kde je lékárna?',mongolian:'Эмийн сан хаана байна?'},{id:'c',text:'Kam jedete?',mongolian:'Та хаашаа явж байна?'}], correctId:'a', feedbackMn:'Kde je zastávka? = Буудал хаана байна?'
    },
    {
      id:'a04final-d2', speaker:'Ажилтан', staffCzech:'Tam. Jděte rovně.', staffMn:'Тэнд. Шулуун яваарай.', promptMn:'Та ойлгосноо талархаад хэлээрэй.',
      choices:[{id:'a',text:'Děkuji.',mongolian:'Баярлалаа.'},{id:'b',text:'Nerozumím.',mongolian:'Би ойлгохгүй байна.'},{id:'c',text:'Vystupte tady.',mongolian:'Энд буугаарай.'}], correctId:'a', feedbackMn:'Чиглэлийг ойлгосон бол Děkuji. гэж хэлж болно.'
    },
    {
      id:'a04final-d3', speaker:'Ажилтан', staffCzech:'Kam jedete?', staffMn:'Та хаашаа явж байна?', promptMn:'Та галт тэрэгний буудал руу явж байгаагаа хэлээрэй.',
      choices:[{id:'a',text:'Jdu na nádraží.',mongolian:'Би галт тэрэгний буудал руу явж байна.'},{id:'b',text:'Kde je zastávka?',mongolian:'Буудал хаана байна?'},{id:'c',text:'Jeďte tramvají.',mongolian:'Трамвайгаар яваарай.'}], correctId:'a', feedbackMn:'Jdu na nádraží. = Би галт тэрэгний буудал руу явж байна.'
    },
    {
      id:'a04final-d4', speaker:'Ажилтан', staffCzech:'Jeďte tramvají.', staffMn:'Трамвайгаар яваарай.', promptMn:'Та буух газрын зааврыг сонгоорой.',
      choices:[{id:'a',text:'Vystupte tady.',mongolian:'Энд буугаарай.'},{id:'b',text:'Jděte rovně.',mongolian:'Шулуун яваарай.'},{id:'c',text:'Kde je zastávka?',mongolian:'Буудал хаана байна?'}], correctId:'a', feedbackMn:'Vystupte tady. = Энд буугаарай.'
    },
    {
      id:'a04final-d5', speaker:'Ажилтан', staffCzech:'Vystupte tady.', staffMn:'Энд буугаарай.', promptMn:'Та яриаг эелдгээр дуусгаарай.',
      choices:[{id:'a',text:'Děkuji. Na shledanou.',mongolian:'Баярлалаа. Баяртай.'},{id:'b',text:'Ahoj.',mongolian:'Сайн уу.'},{id:'c',text:'Ne.',mongolian:'Үгүй.'}], correctId:'a', feedbackMn:'Талархаад Na shledanou. гэж яриаг дуусгаж болно.'
    },
  ],
};
