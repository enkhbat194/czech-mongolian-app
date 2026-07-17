const LANGUAGE_REPAIR_LESSONS = new Set([
  'l001', 'l002', 'l003', 'l004', 'l005',
  'l006', 'l007', 'l008', 'l009', 'l010',
]);

const replacements: ReadonlyArray<readonly [string, string]> = [
  ['Jmenuji se …', 'Jmenuji se {userName}.'],
  ['Миний нэр {userName}.', 'Намайг {userName} гэдэг.'],
  ['Миний нэр …', 'Намайг {userName} гэдэг.'],
  ['Таны нэр хэн бэ?', 'Таныг хэн гэдэг вэ?'],
  ['Та сайн уу?', 'Та сайн байна уу?'],
  ['Гуйя; зүгээр; энд байна', 'Гуйя.'],
  ['Тийм, би идэх юм хүсэж байна.', 'Тийм, идэх юм авъя.'],
  ['Тийм, би ус хүсэж байна.', 'Тийм, ус авъя.'],
  ['Тийм, би үүнийг хүсэж байна.', 'Тийм, энийг авъя.'],
  ['Би идэх юм хүсэж байна.', 'Идэх юм авъя.'],
  ['Би хоол хүсэж байна.', 'Хоол авъя.'],
  ['Би ус хүсэж байна.', 'Ус авъя.'],
  ['Би үүнийг хүсэж байна.', 'Энийг авъя.'],
  ['Надад туслаач, гуйя.', 'Надад тусламж хэрэгтэй байна.'],
  ['Надад утас хэрэгтэй, гуйя.', 'Надад утас хэрэгтэй байна.'],
  ['Уучлаарай, ариун цэврийн өрөө хаана байна?', 'Ариун цэврийн өрөө хаана вэ?'],
  ['Ариун цэврийн өрөө хаана байна?', 'Ариун цэврийн өрөө хаана вэ?'],
  ['Дэлгүүр хаана байна?', 'Дэлгүүр хаана вэ?'],
  ['Эмийн сан хаана байна?', 'Эмийн сан хаана вэ?'],
  ['Галт тэрэгний буудал хаана байна?', 'Галт тэрэгний буудал хаана вэ?'],
  ['Буудал хаана байна?', 'Буудал хаана вэ?'],
  ['Tramvaj, prosím.', 'Tramvají, prosím.'],
  ['Autobus, prosím.', 'Autobusem, prosím.'],
  ['Трамвай, гуйя.', 'Трамвайгаар явъя.'],
  ['Автобус, гуйя.', 'Автобусаар явъя.'],
  ['Би маргааш орой завтай.', 'Маргааш орой завтай.'],
  ['За. Орой?', 'За, орой юу?'],
  ['Удаан ярьж өгнө үү.', 'Удаан ярина уу.'],
  ['Муу.', 'Муу байна.'],

  // A0.6 — work
  ['Би юу хийх вэ?', 'Би юу хийх ёстой вэ?'],
  ['Би танд үзүүлж өгнө.', 'Би танд үзүүлье.'],
  ['Надад үзүүлж өгнө үү.', 'Надад үзүүлнэ үү.'],

  // A0.7-A0.8 — cafe and shopping
  ['Би кофе авъя, гуйя.', 'Кофе авъя.'],
  ['Би цай авъя, гуйя.', 'Цай авъя.'],
  ['Би шөл авъя, гуйя.', 'Шөл авъя.'],
  ['Би кофе авъя.', 'Кофе авъя.'],
  ['Би цай авъя.', 'Цай авъя.'],
  ['Би шөл авъя.', 'Шөл авъя.'],
  ['Авч явна, гуйя.', 'Авч явъя.'],
  ['Авч явъя, гуйя.', 'Авч явъя.'],
  ['Би картаар төлнө.', 'Картаар төлнө.'],
  ['Би бэлнээр төлнө.', 'Бэлнээр төлнө.'],
  ['Уут авах уу?', 'Уут хэрэгтэй юу?'],
  ['Баримт авах уу?', 'Баримт хэрэгтэй юу?'],

  // A0.10 — health and pharmacy
  ['Тийм, би халуурч байна.', 'Тийм, халуурч байна.'],
  ['Миний толгой өвдөж байна.', 'Толгой өвдөж байна.'],
  ['Миний гэдэс өвдөж байна.', 'Гэдэс өвдөж байна.'],
  ['Миний хоолой өвдөж байна.', 'Хоолой өвдөж байна.'],
  ['Миний ... өвдөж байна.', '... өвдөж байна.'],
  ['Би халуурч байна.', 'Халуурч байна.'],
  ['Өвчин намдаах юм байна уу?', 'Өвчин намдаах эм байна уу?'],
  ['Үүнийг яаж уух вэ?', 'Энэ эмийг яаж хэрэглэх вэ?'],
  ['Энэ эм байна.', 'Эм нь энэ байна.'],
];

function replaceIdentity(text: string) {
  return text
    .replace(/(?<!\p{L})Eba(?!\p{L})/gu, '{userName}')
    .replace(/(?<!\p{L})Эба(?!\p{L})/gu, '{userName}');
}

export function repairA0LanguageText(text: string): string {
  return replacements.reduce(
    (current, [from, to]) => current.split(from).join(to),
    replaceIdentity(text),
  );
}

function patchKnownItem(value: Record<string, unknown>): Record<string, unknown> {
  const id = typeof value.id === 'string' ? value.id : '';

  if (id === 'a0c0017') return { ...value, mongolian: 'Сайн байна.' };
  if (id === 'a0c0018') return { ...value, mongolian: 'Муу байна.' };

  if (id === 'a0-1-a-3') {
    const { promptCzech: _promptCzech, ...rest } = value;
    return {
      ...rest,
      type: 'choice',
      titleMn: 'Нөхцөлд хэрэглэх',
      promptMn: 'Хэн нэгэн танд тусаллаа. Та юу гэж хэлэх вэ?',
    };
  }

  if (id === 'a0-1-c-3-match') {
    return {
      ...value,
      titleMn: 'Харилцааны үүрэг',
      promptMn: 'Хэллэгийг ямар зорилгоор хэрэглэж байгаатай нь холбо.',
      pairs: [
        { id: 'say-name', czech: 'Jmenuji se {userName}.', mongolian: 'Өөрийн нэрээ хэлэх' },
        { id: 'ask-name', czech: 'Jak se jmenujete?', mongolian: 'Хүний нэрийг асуух' },
      ],
      feedbackMn: 'Нэрээ хэлэх болон хүний нэрийг асуух хэллэгийг зөв ялгалаа.',
    };
  }

  if (id === 'a0-1-d-2') {
    return {
      ...value,
      promptMn: 'Хамгаалалтын ажилтан таныг танихгүй байна. Тэр аль асуултыг хэлж болох вэ?',
    };
  }

  if (id === 'a02e-d2') {
    const choices = Array.isArray(value.choices)
      ? value.choices.map((choice) => {
          if (!choice || typeof choice !== 'object') return choice;
          const item = choice as Record<string, unknown>;
          return item.id === 'a'
            ? { ...item, text: 'Ne, nemám.', mongolian: 'Үгүй, байхгүй.' }
            : item;
        })
      : value.choices;
    return {
      ...value,
      choices,
      feedbackMn: 'Máte hotovost? гэсэн асуултад Ne, nemám. гэж хариулж болно.',
    };
  }

  if (id === 'a04b-d2') {
    return {
      ...value,
      feedbackMn: 'Тээврийн хэрэгслээ хэлэхдээ Tramvají, prosím. гэж хариулна.',
    };
  }

  return value;
}

function repairUnknown<T>(value: T): T {
  if (typeof value === 'string') return repairA0LanguageText(value) as T;
  if (Array.isArray(value)) return value.map((item) => repairUnknown(item)) as T;
  if (!value || typeof value !== 'object') return value;

  const mapped = Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, repairUnknown(item)]),
  );
  return patchKnownItem(mapped) as T;
}

export function repairA0LessonLanguage<T extends { lessonId: string }>(lesson: T): T {
  return LANGUAGE_REPAIR_LESSONS.has(lesson.lessonId) ? repairUnknown(lesson) : lesson;
}

export function repairA0WordLanguage<T extends { lessonId: string }>(word: T): T {
  return LANGUAGE_REPAIR_LESSONS.has(word.lessonId) ? repairUnknown(word) : word;
}

export function repairA0AliasLanguage(alias: string, lessonId: string): string {
  return LANGUAGE_REPAIR_LESSONS.has(lessonId) ? repairA0LanguageText(alias) : alias;
}
