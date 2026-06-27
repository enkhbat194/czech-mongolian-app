export interface CzechWord {
  id: string;
  czech: string;
  ipa: string;
  mongolian: string;
  example: string;
  exampleTranslation: string;
  category: string;
  lessonId: string;
  audioFile?: string; // optional: public/audio/words/<id>.mp3
  difficulty: 'easy' | 'medium' | 'hard';
}

export const czechWords: CzechWord[] = [
  // === Мэндчилгээ ===
  { id: 'w001', czech: 'Dobrý den', ipa: '[do-briː den]', mongolian: 'Сайн уу (албан)', example: 'Dobrý den, jak se jmenujete?', exampleTranslation: 'Сайн уу, таны нэр хэн бэ?', category: 'greeting', lessonId: 'l001', difficulty: 'easy' },
  { id: 'w002', czech: 'Ahoj', ipa: '[a-hoj]', mongolian: 'Сайн уу (дотно)', example: 'Ahoj, jak se máš?', exampleTranslation: 'Сайн уу, чи яаж байна?', category: 'greeting', lessonId: 'l001', difficulty: 'easy' },
  { id: 'w003', czech: 'Děkuji', ipa: '[dɛ-ku-ji]', mongolian: 'Баярлалаа', example: 'Děkuji moc za pomoc.', exampleTranslation: 'Тусалсанд их баярлалаа.', category: 'greeting', lessonId: 'l001', difficulty: 'easy' },
  { id: 'w004', czech: 'Prosím', ipa: '[pro-siːm]', mongolian: 'Гуйя / Зайлгүй', example: 'Prosím, kde je záchod?', exampleTranslation: 'Гуйя, жорлон хаана байна вэ?', category: 'greeting', lessonId: 'l001', difficulty: 'easy' },
  { id: 'w005', czech: 'Na shledanou', ipa: '[na-sxle-da-nou]', mongolian: 'Баяртай (албан)', example: 'Na shledanou, brzy se uvidíme.', exampleTranslation: 'Баяртай, удахгүй уулзана.', category: 'greeting', lessonId: 'l001', difficulty: 'medium' },
  { id: 'w006', czech: 'Promiňte', ipa: '[pro-miɲ-te]', mongolian: 'Уучлаарай', example: 'Promiňte, nerozumím.', exampleTranslation: 'Уучлаарай, би ойлгохгүй байна.', category: 'greeting', lessonId: 'l001', difficulty: 'easy' },
  { id: 'w007', czech: 'Jak se máš?', ipa: '[jak se maːʃ]', mongolian: 'Чи яаж байна?', example: 'Ahoj! Jak se máš dnes?', exampleTranslation: 'Сайн уу! Чи өнөөдөр яаж байна?', category: 'greeting', lessonId: 'l001', difficulty: 'easy' },
  { id: 'w008', czech: 'Dobře', ipa: '[do-bɾe]', mongolian: 'Сайн / Зүгээр', example: 'Jsem dobře, díky.', exampleTranslation: 'Би сайн байна, баярлалаа.', category: 'greeting', lessonId: 'l001', difficulty: 'easy' },

  // === Тоо ===
  { id: 'w009', czech: 'Jedna', ipa: '[jed-na]', mongolian: 'Нэг', example: 'Chci jeden kávu.', exampleTranslation: 'Би нэг кофе хүсэж байна.', category: 'numbers', lessonId: 'l002', difficulty: 'easy' },
  { id: 'w010', czech: 'Dva', ipa: '[dva]', mongolian: 'Хоёр', example: 'Máme dva děti.', exampleTranslation: 'Бид хоёр хүүхэдтэй.', category: 'numbers', lessonId: 'l002', difficulty: 'easy' },
  { id: 'w011', czech: 'Tři', ipa: '[tɾʒiː]', mongolian: 'Гурав', example: 'Potřebuji tři minuty.', exampleTranslation: 'Надад гурван минут хэрэгтэй.', category: 'numbers', lessonId: 'l002', difficulty: 'easy' },
  { id: 'w012', czech: 'Čtyři', ipa: '[tʃtiː-ɾʒiː]', mongolian: 'Дөрөв', example: 'Jsem ve čtvrtém patře.', exampleTranslation: 'Би дөрөвдүгээр давхарт байна.', category: 'numbers', lessonId: 'l002', difficulty: 'medium' },
  { id: 'w013', czech: 'Pět', ipa: '[pjɛt]', mongolian: 'Тав', example: 'Přijdu za pět minut.', exampleTranslation: 'Таван минутын дараа ирнэ.', category: 'numbers', lessonId: 'l002', difficulty: 'easy' },
  { id: 'w014', czech: 'Deset', ipa: '[de-set]', mongolian: 'Арав', example: 'To stojí deset korun.', exampleTranslation: 'Энэ арван крон.', category: 'numbers', lessonId: 'l002', difficulty: 'easy' },

  // === Хоол ===
  { id: 'w015', czech: 'Chléb', ipa: '[xleːb]', mongolian: 'Талх', example: 'Chtěl bych chléb, prosím.', exampleTranslation: 'Талх авах гэж байна, гуйя.', category: 'food', lessonId: 'l003', difficulty: 'easy' },
  { id: 'w016', czech: 'Voda', ipa: '[vo-da]', mongolian: 'Ус', example: 'Sklenici vody, prosím.', exampleTranslation: 'Нэг стакан ус, гуйя.', category: 'food', lessonId: 'l003', difficulty: 'easy' },
  { id: 'w017', czech: 'Pivo', ipa: '[pi-vo]', mongolian: 'Шар айраг', example: 'Dáte si pivo?', exampleTranslation: 'Шар айраг уух уу?', category: 'food', lessonId: 'l003', difficulty: 'easy' },
  { id: 'w018', czech: 'Káva', ipa: '[kaː-va]', mongolian: 'Кофе', example: 'Ráno piju kávu.', exampleTranslation: 'Өглөө кофе уудаг.', category: 'food', lessonId: 'l003', difficulty: 'easy' },
  { id: 'w019', czech: 'Maso', ipa: '[ma-so]', mongolian: 'Мах', example: 'Nejedu maso.', exampleTranslation: 'Би мах идэхгүй.', category: 'food', lessonId: 'l003', difficulty: 'easy' },
  { id: 'w020', czech: 'Polévka', ipa: '[po-leːv-ka]', mongolian: 'Шөл', example: 'Dnes mám polévku.', exampleTranslation: 'Өнөөдөр шөлтэй.', category: 'food', lessonId: 'l003', difficulty: 'medium' },

  // === Өнгө ===
  { id: 'w021', czech: 'Červená', ipa: '[tʃer-ve-naː]', mongolian: 'Улаан', example: 'Červená barva mi líbí.', exampleTranslation: 'Надад улаан өнгө таалагддаг.', category: 'colors', lessonId: 'l004', difficulty: 'medium' },
  { id: 'w022', czech: 'Modrá', ipa: '[mod-raː]', mongolian: 'Хөх', example: 'Nebe je modré.', exampleTranslation: 'Тэнгэр хөх байна.', category: 'colors', lessonId: 'l004', difficulty: 'easy' },
  { id: 'w023', czech: 'Zelená', ipa: '[ze-le-naː]', mongolian: 'Ногоон', example: 'Trávník je zelený.', exampleTranslation: 'Өвс ногоон байна.', category: 'colors', lessonId: 'l004', difficulty: 'medium' },
  { id: 'w024', czech: 'Žlutá', ipa: '[ʒlu-taː]', mongolian: 'Шар', example: 'Slunce je žluté.', exampleTranslation: 'Нар шар байна.', category: 'colors', lessonId: 'l004', difficulty: 'medium' },
  { id: 'w025', czech: 'Bílá', ipa: '[biː-laː]', mongolian: 'Цагаан', example: 'Sníh je bílý.', exampleTranslation: 'Цас цагаан байна.', category: 'colors', lessonId: 'l004', difficulty: 'easy' },
  { id: 'w026', czech: 'Černá', ipa: '[tʃer-naː]', mongolian: 'Хар', example: 'Mám černé auto.', exampleTranslation: 'Надад хар машин байна.', category: 'colors', lessonId: 'l004', difficulty: 'easy' },

  // === Гэр бүл ===
  { id: 'w027', czech: 'Matka', ipa: '[mat-ka]', mongolian: 'Ээж', example: 'Moje matka vaří skvěle.', exampleTranslation: 'Миний ээж маш сайн хоол хийдэг.', category: 'family', lessonId: 'l005', difficulty: 'easy' },
  { id: 'w028', czech: 'Otec', ipa: '[o-tets]', mongolian: 'Аав', example: 'Otec pracuje v bance.', exampleTranslation: 'Аав банкинд ажилладаг.', category: 'family', lessonId: 'l005', difficulty: 'easy' },
  { id: 'w029', czech: 'Sestra', ipa: '[ses-tra]', mongolian: 'Эгч/дүү (эмэгтэй)', example: 'Mám starší sestru.', exampleTranslation: 'Надад том эгч байдаг.', category: 'family', lessonId: 'l005', difficulty: 'easy' },
  { id: 'w030', czech: 'Bratr', ipa: '[bra-tr]', mongolian: 'Ах/дүү (эрэгтэй)', example: 'Bratr je student.', exampleTranslation: 'Ах оюутан байна.', category: 'family', lessonId: 'l005', difficulty: 'easy' },
  { id: 'w031', czech: 'Děti', ipa: '[dɛ-ti]', mongolian: 'Хүүхдүүд', example: 'Děti hrají v parku.', exampleTranslation: 'Хүүхдүүд цэцэрлэгт тоглож байна.', category: 'family', lessonId: 'l005', difficulty: 'medium' },

  // === Цаг ===
  { id: 'w032', czech: 'Dnes', ipa: '[dnes]', mongolian: 'Өнөөдөр', example: 'Dnes je hezky.', exampleTranslation: 'Өнөөдөр сайхан байна.', category: 'time', lessonId: 'l006', difficulty: 'easy' },
  { id: 'w033', czech: 'Zítra', ipa: '[ziːt-ra]', mongolian: 'Маргааш', example: 'Zítra jdu do školy.', exampleTranslation: 'Маргааш сургуульд явна.', category: 'time', lessonId: 'l006', difficulty: 'easy' },
  { id: 'w034', czech: 'Včera', ipa: '[ftʃe-ra]', mongolian: 'Өчигдөр', example: 'Včera jsem byl nemocný.', exampleTranslation: 'Өчигдөр өвчтэй байлаа.', category: 'time', lessonId: 'l006', difficulty: 'easy' },
  { id: 'w035', czech: 'Ráno', ipa: '[raː-no]', mongolian: 'Өглөө', example: 'Ráno cvičím.', exampleTranslation: 'Өглөө дасгал хийдэг.', category: 'time', lessonId: 'l006', difficulty: 'easy' },
  { id: 'w036', czech: 'Večer', ipa: '[ve-tʃer]', mongolian: 'Орой', example: 'Večer čtu knihu.', exampleTranslation: 'Орой ном уншдаг.', category: 'time', lessonId: 'l006', difficulty: 'easy' },

  // === Байршил ===
  { id: 'w037', czech: 'Škola', ipa: '[ʃko-la]', mongolian: 'Сургууль', example: 'Chodím do školy pěšky.', exampleTranslation: 'Сургуульдаа явган явдаг.', category: 'places', lessonId: 'l007', difficulty: 'easy' },
  { id: 'w038', czech: 'Nemocnice', ipa: '[ne-mots-ni-tse]', mongolian: 'Эмнэлэг', example: 'Nemocnice je blízko.', exampleTranslation: 'Эмнэлэг ойрхон байна.', category: 'places', lessonId: 'l007', difficulty: 'medium' },
  { id: 'w039', czech: 'Obchod', ipa: '[ob-xod]', mongolian: 'Дэлгүүр', example: 'Jdu do obchodu.', exampleTranslation: 'Дэлгүүр рүү явж байна.', category: 'places', lessonId: 'l007', difficulty: 'medium' },
  { id: 'w040', czech: 'Park', ipa: '[park]', mongolian: 'Цэцэрлэг', example: 'Chodíme do parku.', exampleTranslation: 'Бид цэцэрлэгт явдаг.', category: 'places', lessonId: 'l007', difficulty: 'easy' },

  // === Үйл үг ===
  { id: 'w041', czech: 'Mluvit', ipa: '[mlu-vit]', mongolian: 'Ярих', example: 'Mluvíte česky?', exampleTranslation: 'Та чех хэлээр ярьдаг уу?', category: 'verbs', lessonId: 'l008', difficulty: 'medium' },
  { id: 'w042', czech: 'Číst', ipa: '[tʃiːst]', mongolian: 'Унших', example: 'Rád čtu knihy.', exampleTranslation: 'Би ном унших дуртай.', category: 'verbs', lessonId: 'l008', difficulty: 'medium' },
  { id: 'w043', czech: 'Psát', ipa: '[psaːt]', mongolian: 'Бичих', example: 'Píšu dopis příteli.', exampleTranslation: 'Найздаа захиа бичиж байна.', category: 'verbs', lessonId: 'l008', difficulty: 'medium' },
  { id: 'w044', czech: 'Jíst', ipa: '[jiːst]', mongolian: 'Идэх', example: 'Co jíš k obědu?', exampleTranslation: 'Та өдрийн хоолонд юу идэх вэ?', category: 'verbs', lessonId: 'l008', difficulty: 'easy' },
  { id: 'w045', czech: 'Spát', ipa: '[spaːt]', mongolian: 'Унтах', example: 'Spím osm hodin denně.', exampleTranslation: 'Өдөрт найман цаг унтдаг.', category: 'verbs', lessonId: 'l008', difficulty: 'easy' },
  { id: 'w046', czech: 'Pracovat', ipa: '[pra-tso-vat]', mongolian: 'Ажиллах', example: 'Pracuji v kanceláři.', exampleTranslation: 'Оффисд ажилладаг.', category: 'verbs', lessonId: 'l008', difficulty: 'medium' },
  { id: 'w047', czech: 'Cestovat', ipa: '[tses-to-vat]', mongolian: 'Аялах', example: 'Rád cestuji do zahraničí.', exampleTranslation: 'Гадаадад аялах дуртай.', category: 'verbs', lessonId: 'l008', difficulty: 'hard' },

  // === Нэр ===
  { id: 'w048', czech: 'Město', ipa: '[mjɛs-to]', mongolian: 'Хот', example: 'Praha je krásné město.', exampleTranslation: 'Прага үзэсгэлэнт хот.', category: 'nouns', lessonId: 'l009', difficulty: 'easy' },
  { id: 'w049', czech: 'Dům', ipa: '[duːm]', mongolian: 'Байшин', example: 'Náš dům je velký.', exampleTranslation: 'Манай байшин том.', category: 'nouns', lessonId: 'l009', difficulty: 'easy' },
  { id: 'w050', czech: 'Kniha', ipa: '[kni-xa]', mongolian: 'Ном', example: 'Tato kniha je zajímavá.', exampleTranslation: 'Энэ ном сонирхолтой байна.', category: 'nouns', lessonId: 'l009', difficulty: 'easy' },
  { id: 'w051', czech: 'Auto', ipa: '[au-to]', mongolian: 'Машин', example: 'Mám nové auto.', exampleTranslation: 'Надад шинэ машин байна.', category: 'nouns', lessonId: 'l009', difficulty: 'easy' },
  { id: 'w052', czech: 'Telefon', ipa: '[te-le-fon]', mongolian: 'Утас', example: 'Kde je můj telefon?', exampleTranslation: 'Миний утас хаана байна?', category: 'nouns', lessonId: 'l009', difficulty: 'easy' },
];

export const categories = [
  { id: 'greeting', name: 'Мэндчилгээ', icon: '👋' },
  { id: 'numbers', name: 'Тоо', icon: '🔢' },
  { id: 'food', name: 'Хоол', icon: '🍽️' },
  { id: 'colors', name: 'Өнгө', icon: '🎨' },
  { id: 'family', name: 'Гэр бүл', icon: '👨‍👩‍👧‍👦' },
  { id: 'time', name: 'Цаг', icon: '⏰' },
  { id: 'places', name: 'Байршил', icon: '📍' },
  { id: 'verbs', name: 'Үйл үг', icon: '⚡' },
  { id: 'nouns', name: 'Нэр үг', icon: '📚' },
];
