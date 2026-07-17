import type { DialogueScenario } from './a0Dialogues';

export const a0DirectionsMicroDialogues: Record<string, DialogueScenario> = {
  'a0-4-a': {
    id: 'a0-4-a-dialogue',
    titleMn: 'Богино яриа — чиглэл сонсох',
    contextMn: 'Та зам асуухад нэг хүн шулуун явахыг заалаа.',
    steps: [{
      id: 'a04a-d1', speaker: 'Явган зорчигч', staffCzech: 'Jděte rovně.', staffMn: 'Шулуун яваарай.',
      promptMn: 'Чиглэлийг ойлгосон бол эелдгээр хариулаарай.',
      choices: [
        { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        { id: 'b', text: 'doleva', mongolian: 'зүүн тийш' },
        { id: 'c', text: 'doprava', mongolian: 'баруун тийш' },
      ], correctId: 'a', feedbackMn: 'Jděte rovně. = Шулуун яваарай. Ойлгосон бол Děkuji. гэж хариулна.'
    }],
  },
  'a0-4-b': {
    id: 'a0-4-b-dialogue',
    titleMn: 'Богино яриа — буудал асуух',
    contextMn: 'Та нийтийн тээврийн буудлыг хайж байна.',
    steps: [
      {
        id: 'a04b-d1', speaker: 'Явган зорчигч', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.',
        promptMn: 'Та нийтийн тээврийн буудал хаана байгааг асуугаарай.',
        choices: [
          { id: 'a', text: 'Kde je zastávka?', mongolian: 'Нийтийн тээврийн буудал хаана вэ?' },
          { id: 'b', text: 'Kde je nádraží?', mongolian: 'Галт тэрэгний буудал хаана вэ?' },
          { id: 'c', text: 'Kam jedete?', mongolian: 'Та хаашаа явж байна?' },
        ], correctId: 'a', feedbackMn: 'Kde je zastávka? = Нийтийн тээврийн буудал хаана вэ?'
      },
      {
        id: 'a04b-d2', speaker: 'Явган зорчигч', staffCzech: 'Autobus, nebo tramvaj?', staffMn: 'Автобус уу, трамвай юу?',
        promptMn: 'Та трамвайгаар явахаа хэлээрэй.',
        choices: [
          { id: 'a', text: 'Autobusem, prosím.', mongolian: 'Автобусаар явъя.' },
          { id: 'b', text: 'Tramvají, prosím.', mongolian: 'Трамвайгаар явъя.' },
          { id: 'c', text: 'Zastávka, prosím.', mongolian: 'Буудал хэрэгтэй байна.' },
        ], correctId: 'b', feedbackMn: 'Трамвайгаар явахаа Tramvají, prosím. гэж хэлж болно.'
      },
    ],
  },
  'a0-4-c': {
    id: 'a0-4-c-dialogue',
    titleMn: 'Богино яриа — тээврийн заавар',
    contextMn: 'Та трамвайгаар явах чиглэлээ авлаа.',
    steps: [{
      id: 'a04c-d1', speaker: 'Явган зорчигч', staffCzech: 'Jeďte tramvají.', staffMn: 'Трамвайгаар яваарай.',
      promptMn: 'Та зааврыг ойлгосон бол талархаарай.',
      choices: [
        { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        { id: 'b', text: 'Jeďte autobusem.', mongolian: 'Автобусаар яваарай.' },
        { id: 'c', text: 'Vystupte tady.', mongolian: 'Энд буугаарай.' },
      ], correctId: 'a', feedbackMn: 'Jeďte tramvají. = Трамвайгаар яваарай. Энэ нь нөгөө хүний танд өгч буй заавар.'
    }],
  },
  'a0-4-d': {
    id: 'a0-4-d-dialogue',
    titleMn: 'Богино яриа — буух газар',
    contextMn: 'Та трамвайгаар явж байхдаа буух заавар сонсож байна.',
    steps: [{
      id: 'a04d-d1', speaker: 'Жолооч', staffCzech: 'Vystupte tady.', staffMn: 'Энд буугаарай.',
      promptMn: 'Та буух газраа ойлгосон бол эелдгээр хариулаарай.',
      choices: [
        { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        { id: 'b', text: 'Kde je zastávka?', mongolian: 'Нийтийн тээврийн буудал хаана вэ?' },
        { id: 'c', text: 'Kam jedete?', mongolian: 'Та хаашаа явж байна?' },
      ], correctId: 'a', feedbackMn: 'Vystupte tady. = Энд буугаарай. Талархаад Děkuji. гэж хэлж болно.'
    }],
  },
  'a0-4-e': {
    id: 'a0-4-e-dialogue',
    titleMn: 'Богино яриа — очих газраа хэлэх',
    contextMn: 'Буудал дээр нэг хүн таныг хаашаа явж байгааг асууж байна.',
    steps: [{
      id: 'a04e-d1', speaker: 'Явган зорчигч', staffCzech: 'Kam jedete?', staffMn: 'Та хаашаа явж байна?',
      promptMn: 'Та галт тэрэгний буудал руу явж байгаагаа хэлээрэй.',
      choices: [
        { id: 'a', text: 'Jdu na nádraží.', mongolian: 'Би галт тэрэгний буудал руу явж байна.' },
        { id: 'b', text: 'Vystupte tady.', mongolian: 'Энд буугаарай.' },
        { id: 'c', text: 'Jeďte autobusem.', mongolian: 'Автобусаар яваарай.' },
      ], correctId: 'a', feedbackMn: 'Jdu na nádraží. = Би галт тэрэгний буудал руу явж байна.'
    }],
  },
};

export const a0DirectionsFinalDialogue: DialogueScenario = {
  id: 'a0-4-final-dialogue',
  titleMn: 'Төгсгөлийн бодит яриа',
  contextMn: 'Та галт тэрэгний буудал руу явахын тулд эхлээд трамвайн буудал, дараа нь тээврийн чиглэлээ асууж байна.',
  steps: [
    {
      id: 'a04final-d1', speaker: 'Явган зорчигч', staffCzech: 'Dobrý den.', staffMn: 'Сайн байна уу.',
      promptMn: 'Та нийтийн тээврийн буудал хаана байгааг асуугаарай.',
      choices: [
        { id: 'a', text: 'Kde je zastávka?', mongolian: 'Нийтийн тээврийн буудал хаана вэ?' },
        { id: 'b', text: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана вэ?' },
        { id: 'c', text: 'Kam jedete?', mongolian: 'Та хаашаа явж байна?' },
      ], correctId: 'a', feedbackMn: 'Эхлээд Kde je zastávka? гэж нийтийн тээврийн буудлаа асууна.'
    },
    {
      id: 'a04final-d2', speaker: 'Явган зорчигч', staffCzech: 'Zastávka je tam. Jděte rovně.', staffMn: 'Буудал тэнд байна. Шулуун яваарай.',
      promptMn: 'Та чиглэлийг ойлгосон бол талархаарай.',
      choices: [
        { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        { id: 'b', text: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.' },
        { id: 'c', text: 'Vystupte tady.', mongolian: 'Энд буугаарай.' },
      ], correctId: 'a', feedbackMn: 'Шулуун явах зааврыг ойлгосон бол Děkuji. гэж хариулна.'
    },
    {
      id: 'a04final-d3', speaker: 'Явган зорчигч', staffCzech: 'Kam jedete?', staffMn: 'Та хаашаа явж байна?',
      promptMn: 'Та галт тэрэгний буудал руу явж байгаагаа хэлээрэй.',
      choices: [
        { id: 'a', text: 'Jdu na nádraží.', mongolian: 'Би галт тэрэгний буудал руу явж байна.' },
        { id: 'b', text: 'Kde je zastávka?', mongolian: 'Нийтийн тээврийн буудал хаана вэ?' },
        { id: 'c', text: 'Jeďte tramvají.', mongolian: 'Трамвайгаар яваарай.' },
      ], correctId: 'a', feedbackMn: 'Jdu na nádraží. = Би галт тэрэгний буудал руу явж байна.'
    },
    {
      id: 'a04final-d4', speaker: 'Явган зорчигч', staffCzech: 'Jeďte tramvají.', staffMn: 'Трамвайгаар яваарай.',
      promptMn: 'Тээврийн зааврыг ойлгосон бол талархаарай.',
      choices: [
        { id: 'a', text: 'Děkuji.', mongolian: 'Баярлалаа.' },
        { id: 'b', text: 'Vystupte tady.', mongolian: 'Энд буугаарай.' },
        { id: 'c', text: 'Jděte rovně.', mongolian: 'Шулуун яваарай.' },
      ], correctId: 'a', feedbackMn: 'Jeďte tramvají. гэдэг нь танд өгч буй заавар; та өөрөө буух заавар хэлэхгүй.'
    },
    {
      id: 'a04final-d5', speaker: 'Жолооч', staffCzech: 'Vystupte tady.', staffMn: 'Энд буугаарай.',
      promptMn: 'Та талархаад яриаг албан хэлбэрээр дуусгаарай.',
      choices: [
        { id: 'a', text: 'Děkuji. Na shledanou.', mongolian: 'Баярлалаа. Баяртай.' },
        { id: 'b', text: 'Ahoj.', mongolian: 'Сайн уу.' },
        { id: 'c', text: 'Ne.', mongolian: 'Үгүй.' },
      ], correctId: 'a', feedbackMn: 'Буух зааврыг сонсоод Děkuji. Na shledanou. гэж эелдгээр дуусгана.'
    },
  ],
};
