export interface CzechWord {
  id: string;
  czech: string;
  ipa: string;
  mongolian: string;
  example: string;
  exampleTranslation: string;
  category: string;
  lessonId: string;
  audioFile?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

/**
 * A0.1–A0.6-ийн цорын ганц canonical vocabulary bank.
 * Нэг normalized Czech card нь зөвхөн нэг lessonId-д анхлан орно.
 * Дараагийн хичээлд тухайн phrase зөвхөн review/dialogue reuse болж орно.
 */
export const czechWords: CzechWord[] = [
  // A0.1 — Анхны харилцаа
  { id:'a0c0001', czech:'Dobrý den', ipa:'', mongolian:'Сайн байна уу', example:'Dobrý den.', exampleTranslation:'Сайн байна уу.', category:'greeting', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0002', czech:'Ahoj', ipa:'', mongolian:'Сайн уу', example:'Ahoj!', exampleTranslation:'Сайн уу!', category:'greeting', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0003', czech:'Na shledanou', ipa:'', mongolian:'Баяртай', example:'Na shledanou.', exampleTranslation:'Баяртай.', category:'greeting', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0004', czech:'Prosím', ipa:'', mongolian:'Гуйя; зүгээр; энд байна', example:'Prosím, mluvte pomalu.', exampleTranslation:'Гуйя, удаан ярьж өгнө үү.', category:'politeness', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0005', czech:'Děkuji', ipa:'', mongolian:'Баярлалаа', example:'Děkuji.', exampleTranslation:'Баярлалаа.', category:'politeness', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0006', czech:'Ano', ipa:'', mongolian:'Тийм', example:'Ano, děkuji.', exampleTranslation:'Тийм, баярлалаа.', category:'response', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0007', czech:'Ne', ipa:'', mongolian:'Үгүй', example:'Ne, děkuji.', exampleTranslation:'Үгүй, баярлалаа.', category:'response', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0008', czech:'být', ipa:'', mongolian:'байх', example:'Jsem z Mongolska.', exampleTranslation:'Би Монголоос ирсэн.', category:'verb', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0009', czech:'já', ipa:'', mongolian:'би', example:'Já jsem Eba.', exampleTranslation:'Би Эба байна.', category:'pronoun', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0010', czech:'vy', ipa:'', mongolian:'та; та нар', example:'Vy jste ...?', exampleTranslation:'Та ... уу?', category:'pronoun', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0011', czech:'jmenovat se', ipa:'', mongolian:'нэртэй байх', example:'Jmenuji se Eba.', exampleTranslation:'Миний нэр Эба.', category:'verb', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0012', czech:'Jak se jmenujete?', ipa:'', mongolian:'Таны нэр хэн бэ?', example:'Dobrý den, jak se jmenujete?', exampleTranslation:'Сайн байна уу, таны нэр хэн бэ?', category:'pattern', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0013', czech:'Jmenuji se …', ipa:'', mongolian:'Миний нэр …', example:'Jmenuji se Eba.', exampleTranslation:'Миний нэр Эба.', category:'pattern', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0014', czech:'kdo', ipa:'', mongolian:'хэн', example:'Kdo jste?', exampleTranslation:'Та хэн бэ?', category:'question', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0015', czech:'Kdo jste?', ipa:'', mongolian:'Та хэн бэ?', example:'Promiňte, kdo jste?', exampleTranslation:'Уучлаарай, та хэн бэ?', category:'pattern', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0016', czech:'Jak se máte?', ipa:'', mongolian:'Та сайн уу?', example:'Dobrý den, jak se máte?', exampleTranslation:'Сайн байна уу, та сайн уу?', category:'pattern', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0017', czech:'dobře', ipa:'', mongolian:'сайн', example:'Dobře, děkuji.', exampleTranslation:'Сайн, баярлалаа.', category:'response', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0018', czech:'špatně', ipa:'', mongolian:'муу', example:'Špatně.', exampleTranslation:'Муу байна.', category:'response', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0019', czech:'odkud', ipa:'', mongolian:'хаанаас', example:'Odkud jste?', exampleTranslation:'Та хаанаас ирсэн бэ?', category:'question', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0020', czech:'z', ipa:'', mongolian:'-аас, -ээс', example:'Jsem z Mongolska.', exampleTranslation:'Би Монголоос ирсэн.', category:'preposition', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0021', czech:'Jsem z Mongolska.', ipa:'', mongolian:'Би Монголоос ирсэн.', example:'Jsem z Mongolska.', exampleTranslation:'Би Монголоос ирсэн.', category:'pattern', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0022', czech:'mluvit', ipa:'', mongolian:'ярих', example:'Mluvte prosím pomalu.', exampleTranslation:'Удаан ярьж өгнө үү.', category:'verb', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0141', czech:'pomalu', ipa:'', mongolian:'удаанаар', example:'Mluvte pomalu.', exampleTranslation:'Удаан ярьж өгнө үү.', category:'adverb', lessonId:'l001', difficulty:'easy' },
  { id:'a0c0326', czech:'Nerozumím.', ipa:'', mongolian:'Би ойлгохгүй байна.', example:'Promiňte, nerozumím.', exampleTranslation:'Уучлаарай, би ойлгохгүй байна.', category:'survival', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0327', czech:'Mluvte prosím pomalu.', ipa:'', mongolian:'Удаан ярьж өгнө үү.', example:'Mluvte prosím pomalu.', exampleTranslation:'Удаан ярьж өгнө үү.', category:'survival', lessonId:'l001', difficulty:'medium' },
  { id:'a0c0100', czech:'Mluvím moc rychle?', ipa:'', mongolian:'Би хэт хурдан ярьж байна уу?', example:'Mluvím moc rychle?', exampleTranslation:'Би хэт хурдан ярьж байна уу?', category:'listening-pattern', lessonId:'l001', difficulty:'medium' },

  // A0.2 — Надад хэрэгтэй
  { id:'a0c0023', czech:'potřebuji', ipa:'', mongolian:'надад хэрэгтэй', example:'Potřebuji pomoc.', exampleTranslation:'Надад тусламж хэрэгтэй.', category:'verb-pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0024', czech:'pomoc', ipa:'', mongolian:'тусламж', example:'Potřebuji pomoc.', exampleTranslation:'Надад тусламж хэрэгтэй.', category:'survival', lessonId:'l002', difficulty:'easy' },
  { id:'a0c0025', czech:'Potřebuji pomoc.', ipa:'', mongolian:'Надад тусламж хэрэгтэй.', example:'Potřebuji pomoc, prosím.', exampleTranslation:'Надад туслаач, гуйя.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0026', czech:'vodu', ipa:'', mongolian:'ус', example:'Potřebuji vodu.', exampleTranslation:'Надад ус хэрэгтэй.', category:'noun', lessonId:'l002', difficulty:'easy' },
  { id:'a0c0027', czech:'Potřebuji vodu.', ipa:'', mongolian:'Надад ус хэрэгтэй.', example:'Potřebuji vodu, prosím.', exampleTranslation:'Надад ус хэрэгтэй, гуйя.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0028', czech:'telefon', ipa:'', mongolian:'утас', example:'Potřebuji telefon.', exampleTranslation:'Надад утас хэрэгтэй.', category:'noun', lessonId:'l002', difficulty:'easy' },
  { id:'a0c0029', czech:'Potřebuji telefon.', ipa:'', mongolian:'Надад утас хэрэгтэй.', example:'Potřebuji telefon, prosím.', exampleTranslation:'Надад утас хэрэгтэй, гуйя.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0030', czech:'chci', ipa:'', mongolian:'би хүсэж байна', example:'Chci vodu.', exampleTranslation:'Би ус хүсэж байна.', category:'verb-pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0031', czech:'Chci vodu.', ipa:'', mongolian:'Би ус хүсэж байна.', example:'Chci vodu, prosím.', exampleTranslation:'Би ус хүсэж байна, гуйя.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0032', czech:'jídlo', ipa:'', mongolian:'хоол', example:'Chci jídlo.', exampleTranslation:'Би хоол хүсэж байна.', category:'noun', lessonId:'l002', difficulty:'easy' },
  { id:'a0c0033', czech:'Chci jídlo.', ipa:'', mongolian:'Би хоол хүсэж байна.', example:'Chci jídlo, prosím.', exampleTranslation:'Би хоол хүсэж байна, гуйя.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0034', czech:'něco', ipa:'', mongolian:'ямар нэг зүйл', example:'Chci něco k jídlu.', exampleTranslation:'Би идэх юм хүсэж байна.', category:'pronoun', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0035', czech:'Chci něco k jídlu.', ipa:'', mongolian:'Би идэх юм хүсэж байна.', example:'Chci něco k jídlu, prosím.', exampleTranslation:'Би идэх юм хүсэж байна, гуйя.', category:'pattern', lessonId:'l002', difficulty:'hard' },
  { id:'a0c0036', czech:'tohle', ipa:'', mongolian:'энэ; үүнийг', example:'Chci tohle.', exampleTranslation:'Би үүнийг хүсэж байна.', category:'pronoun', lessonId:'l002', difficulty:'easy' },
  { id:'a0c0037', czech:'Chci tohle.', ipa:'', mongolian:'Би үүнийг хүсэж байна.', example:'Chci tohle, prosím.', exampleTranslation:'Би үүнийг хүсэж байна, гуйя.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0038', czech:'nemám', ipa:'', mongolian:'надад байхгүй', example:'Nemám kartu.', exampleTranslation:'Надад карт байхгүй.', category:'verb-pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0039', czech:'peníze', ipa:'', mongolian:'мөнгө', example:'Nemám peníze.', exampleTranslation:'Надад мөнгө байхгүй.', category:'noun', lessonId:'l002', difficulty:'easy' },
  { id:'a0c0040', czech:'Nemám peníze.', ipa:'', mongolian:'Надад мөнгө байхгүй.', example:'Promiňte, nemám peníze.', exampleTranslation:'Уучлаарай, надад мөнгө байхгүй.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0041', czech:'kartu', ipa:'', mongolian:'карт', example:'Nemám kartu.', exampleTranslation:'Надад карт байхгүй.', category:'noun', lessonId:'l002', difficulty:'easy' },
  { id:'a0c0042', czech:'Nemám kartu.', ipa:'', mongolian:'Надад карт байхгүй.', example:'Nemám kartu.', exampleTranslation:'Надад карт байхгүй.', category:'pattern', lessonId:'l002', difficulty:'medium' },
  { id:'a0c0043', czech:'Co potřebujete?', ipa:'', mongolian:'Танд юу хэрэгтэй вэ?', example:'Co potřebujete?', exampleTranslation:'Танд юу хэрэгтэй вэ?', category:'question', lessonId:'l002', difficulty:'hard' },
  { id:'a0c0044', czech:'Potřebuji pomoc, prosím.', ipa:'', mongolian:'Надад туслаач, гуйя.', example:'Potřebuji pomoc, prosím.', exampleTranslation:'Надад туслаач, гуйя.', category:'survival', lessonId:'l002', difficulty:'medium' },

  // A0.3 — Хаана байна?
  { id:'a0c0045', czech:'kde', ipa:'', mongolian:'хаана', example:'Kde je toaleta?', exampleTranslation:'Ариун цэврийн өрөө хаана байна?', category:'question', lessonId:'l003', difficulty:'easy' },
  { id:'a0c0046', czech:'toaleta', ipa:'', mongolian:'ариун цэврийн өрөө', example:'Prosím, kde je toaleta?', exampleTranslation:'Уучлаарай, ариун цэврийн өрөө хаана байна?', category:'place', lessonId:'l003', difficulty:'easy' },
  { id:'a0c0047', czech:'Prosím, kde je toaleta?', ipa:'', mongolian:'Уучлаарай, ариун цэврийн өрөө хаана байна?', example:'Prosím, kde je toaleta?', exampleTranslation:'Уучлаарай, ариун цэврийн өрөө хаана байна?', category:'survival', lessonId:'l003', difficulty:'medium' },
  { id:'a0c0048', czech:'Tady.', ipa:'', mongolian:'Энд.', example:'Toaleta je tady.', exampleTranslation:'Ариун цэврийн өрөө энд байна.', category:'location', lessonId:'l003', difficulty:'easy' },
  { id:'a0c0049', czech:'Tam.', ipa:'', mongolian:'Тэнд.', example:'Obchod je tam.', exampleTranslation:'Дэлгүүр тэнд байна.', category:'location', lessonId:'l003', difficulty:'easy' },
  { id:'a0c0050', czech:'obchod', ipa:'', mongolian:'дэлгүүр', example:'Kde je obchod?', exampleTranslation:'Дэлгүүр хаана байна?', category:'place', lessonId:'l003', difficulty:'easy' },
  { id:'a0c0051', czech:'Kde je obchod?', ipa:'', mongolian:'Дэлгүүр хаана байна?', example:'Prosím, kde je obchod?', exampleTranslation:'Уучлаарай, дэлгүүр хаана байна?', category:'pattern', lessonId:'l003', difficulty:'medium' },
  { id:'a0c0052', czech:'lékárna', ipa:'', mongolian:'эмийн сан', example:'Kde je lékárna?', exampleTranslation:'Эмийн сан хаана байна?', category:'place', lessonId:'l003', difficulty:'medium' },
  { id:'a0c0053', czech:'Kde je lékárna?', ipa:'', mongolian:'Эмийн сан хаана байна?', example:'Prosím, kde je lékárna?', exampleTranslation:'Уучлаарай, эмийн сан хаана байна?', category:'pattern', lessonId:'l003', difficulty:'medium' },
  { id:'a0c0054', czech:'nádraží', ipa:'', mongolian:'галт тэрэгний буудал', example:'Kde je nádraží?', exampleTranslation:'Галт тэрэгний буудал хаана байна?', category:'place', lessonId:'l003', difficulty:'medium' },
  { id:'a0c0055', czech:'Kde je nádraží?', ipa:'', mongolian:'Галт тэрэгний буудал хаана байна?', example:'Prosím, kde je nádraží?', exampleTranslation:'Уучлаарай, галт тэрэгний буудал хаана байна?', category:'pattern', lessonId:'l003', difficulty:'medium' },
  { id:'a0c0056', czech:'nebo', ipa:'', mongolian:'эсвэл', example:'Tady, nebo tam?', exampleTranslation:'Энд үү, тэнд үү?', category:'connector', lessonId:'l003', difficulty:'easy' },
  { id:'a0c0057', czech:'Tady, nebo tam?', ipa:'', mongolian:'Энд үү, тэнд үү?', example:'Nádraží — tady, nebo tam?', exampleTranslation:'Буудал — энд үү, тэнд үү?', category:'pattern', lessonId:'l003', difficulty:'medium' },

  // A0.4 — Яаж очих вэ?
  { id:'a0c0058', czech:'rovně', ipa:'', mongolian:'шулуун', example:'Jděte rovně.', exampleTranslation:'Шулуун яваарай.', category:'direction', lessonId:'l004', difficulty:'easy' },
  { id:'a0c0059', czech:'doleva', ipa:'', mongolian:'зүүн тийш', example:'Doleva.', exampleTranslation:'Зүүн тийш.', category:'direction', lessonId:'l004', difficulty:'easy' },
  { id:'a0c0060', czech:'doprava', ipa:'', mongolian:'баруун тийш', example:'Doprava.', exampleTranslation:'Баруун тийш.', category:'direction', lessonId:'l004', difficulty:'easy' },
  { id:'a0c0061', czech:'Jděte rovně.', ipa:'', mongolian:'Шулуун яваарай.', example:'Jděte rovně.', exampleTranslation:'Шулуун яваарай.', category:'direction-pattern', lessonId:'l004', difficulty:'medium' },
  { id:'a0c0062', czech:'zastávka', ipa:'', mongolian:'буудал', example:'Kde je zastávka?', exampleTranslation:'Буудал хаана байна?', category:'transport', lessonId:'l004', difficulty:'easy' },
  { id:'a0c0063', czech:'Kde je zastávka?', ipa:'', mongolian:'Буудал хаана байна?', example:'Prosím, kde je zastávka?', exampleTranslation:'Уучлаарай, буудал хаана байна?', category:'transport-pattern', lessonId:'l004', difficulty:'medium' },
  { id:'a0c0064', czech:'autobus', ipa:'', mongolian:'автобус', example:'Autobus je tady.', exampleTranslation:'Автобус энд байна.', category:'transport', lessonId:'l004', difficulty:'easy' },
  { id:'a0c0065', czech:'tramvaj', ipa:'', mongolian:'трамвай', example:'Tramvaj je tam.', exampleTranslation:'Трамвай тэнд байна.', category:'transport', lessonId:'l004', difficulty:'easy' },
  { id:'a0c0066', czech:'Jeďte autobusem.', ipa:'', mongolian:'Автобусаар яваарай.', example:'Jeďte autobusem.', exampleTranslation:'Автобусаар яваарай.', category:'transport-pattern', lessonId:'l004', difficulty:'medium' },
  { id:'a0c0067', czech:'Jeďte tramvají.', ipa:'', mongolian:'Трамвайгаар яваарай.', example:'Jeďte tramvají.', exampleTranslation:'Трамвайгаар яваарай.', category:'transport-pattern', lessonId:'l004', difficulty:'medium' },
  { id:'a0c0068', czech:'vystoupit', ipa:'', mongolian:'буух', example:'Vystupte tady.', exampleTranslation:'Энд буугаарай.', category:'transport', lessonId:'l004', difficulty:'medium' },
  { id:'a0c0069', czech:'Vystupte tady.', ipa:'', mongolian:'Энд буугаарай.', example:'Vystupte tady.', exampleTranslation:'Энд буугаарай.', category:'transport-pattern', lessonId:'l004', difficulty:'medium' },
  { id:'a0c0070', czech:'Kam jedete?', ipa:'', mongolian:'Та хаашаа явж байна?', example:'Kam jedete?', exampleTranslation:'Та хаашаа явж байна?', category:'question', lessonId:'l004', difficulty:'medium' },
  { id:'a0c0071', czech:'Jdu na nádraží.', ipa:'', mongolian:'Би галт тэрэгний буудал руу явж байна.', example:'Jdu na nádraží.', exampleTranslation:'Би галт тэрэгний буудал руу явж байна.', category:'transport-pattern', lessonId:'l004', difficulty:'medium' },

  // A0.5 — Цаг, өдөр, уулзалт
  { id:'a0c0072', czech:'kolik', ipa:'', mongolian:'хэд', example:'Kolik je hodin?', exampleTranslation:'Цаг хэд болж байна?', category:'question', lessonId:'l005', difficulty:'easy' },
  { id:'a0c0073', czech:'Kolik je hodin?', ipa:'', mongolian:'Цаг хэд болж байна?', example:'Promiňte, kolik je hodin?', exampleTranslation:'Уучлаарай, цаг хэд болж байна?', category:'time-pattern', lessonId:'l005', difficulty:'medium' },
  { id:'a0c0074', czech:'teď', ipa:'', mongolian:'одоо', example:'Teď?', exampleTranslation:'Одоо юу?', category:'time', lessonId:'l005', difficulty:'easy' },
  { id:'a0c0075', czech:'dnes', ipa:'', mongolian:'өнөөдөр', example:'Dnes pracuji.', exampleTranslation:'Би өнөөдөр ажиллана.', category:'time', lessonId:'l005', difficulty:'easy' },
  { id:'a0c0076', czech:'zítra', ipa:'', mongolian:'маргааш', example:'Zítra?', exampleTranslation:'Маргааш уу?', category:'time', lessonId:'l005', difficulty:'easy' },
  { id:'a0c0077', czech:'ráno', ipa:'', mongolian:'өглөө', example:'Ráno.', exampleTranslation:'Өглөө.', category:'time', lessonId:'l005', difficulty:'easy' },
  { id:'a0c0078', czech:'večer', ipa:'', mongolian:'орой', example:'Večer.', exampleTranslation:'Орой.', category:'time', lessonId:'l005', difficulty:'easy' },
  { id:'a0c0079', czech:'Kdy?', ipa:'', mongolian:'Хэзээ?', example:'Kdy?', exampleTranslation:'Хэзээ?', category:'question', lessonId:'l005', difficulty:'easy' },
  { id:'a0c0080', czech:'Kdy máte čas?', ipa:'', mongolian:'Та хэзээ завтай вэ?', example:'Kdy máte čas?', exampleTranslation:'Та хэзээ завтай вэ?', category:'time-pattern', lessonId:'l005', difficulty:'medium' },
  { id:'a0c0081', czech:'Mám čas.', ipa:'', mongolian:'Би завтай.', example:'Dnes mám čas.', exampleTranslation:'Би өнөөдөр завтай.', category:'time-pattern', lessonId:'l005', difficulty:'medium' },
  { id:'a0c0082', czech:'Nemám čas.', ipa:'', mongolian:'Би завгүй.', example:'Teď nemám čas.', exampleTranslation:'Би одоо завгүй.', category:'time-pattern', lessonId:'l005', difficulty:'medium' },
  { id:'a0c0083', czech:'v osm', ipa:'', mongolian:'найман цагт', example:'V osm.', exampleTranslation:'Найман цагт.', category:'time', lessonId:'l005', difficulty:'medium' },
  { id:'a0c0084', czech:'schůzka', ipa:'', mongolian:'уулзалт', example:'Máme schůzku.', exampleTranslation:'Бид уулзалттай.', category:'meeting', lessonId:'l005', difficulty:'medium' },
  { id:'a0c0085', czech:'Máme schůzku v osm.', ipa:'', mongolian:'Бид найман цагт уулзалттай.', example:'Máme schůzku v osm.', exampleTranslation:'Бид найман цагт уулзалттай.', category:'meeting-pattern', lessonId:'l005', difficulty:'hard' },
  { id:'a0c0101', czech:'v pět', ipa:'', mongolian:'таван цагт', example:'Končíme v pět.', exampleTranslation:'Бид таван цагт тарна.', category:'time', lessonId:'l005', difficulty:'medium' },
  { id:'a0c0102', czech:'ve dvanáct', ipa:'', mongolian:'арван хоёр цагт', example:'Přestávka je ve dvanáct.', exampleTranslation:'Завсарлага арван хоёр цагт.', category:'time', lessonId:'l005', difficulty:'medium' },

  // A0.6 — Ажил дээр
  { id:'a0c0086', czech:'práce', ipa:'', mongolian:'ажил', example:'Práce.', exampleTranslation:'Ажил.', category:'job', lessonId:'l006', difficulty:'easy' },
  { id:'a0c0087', czech:'Pracuji tady.', ipa:'', mongolian:'Би энд ажилладаг.', example:'Pracuji tady.', exampleTranslation:'Би энд ажилладаг.', category:'job-pattern', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0088', czech:'Pracujete tady?', ipa:'', mongolian:'Та энд ажилладаг уу?', example:'Pracujete tady?', exampleTranslation:'Та энд ажилладаг уу?', category:'job-question', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0089', czech:'začínáme', ipa:'', mongolian:'бид эхэлнэ', example:'Začínáme v osm.', exampleTranslation:'Бид найман цагт эхэлнэ.', category:'job-time', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0090', czech:'Začínáme v osm.', ipa:'', mongolian:'Бид найман цагт эхэлнэ.', example:'Začínáme v osm.', exampleTranslation:'Бид найман цагт эхэлнэ.', category:'job-pattern', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0091', czech:'Kdy končíme?', ipa:'', mongolian:'Бид хэзээ тарах вэ?', example:'Kdy končíme?', exampleTranslation:'Бид хэзээ тарах вэ?', category:'job-question', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0092', czech:'směna', ipa:'', mongolian:'ээлж', example:'Mám směnu.', exampleTranslation:'Би ээлжтэй.', category:'job', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0093', czech:'Mám směnu.', ipa:'', mongolian:'Би ээлжтэй.', example:'Dnes mám směnu.', exampleTranslation:'Би өнөөдөр ээлжтэй.', category:'job-pattern', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0094', czech:'přestávka', ipa:'', mongolian:'завсарлага', example:'Kdy je přestávka?', exampleTranslation:'Завсарлага хэзээ вэ?', category:'job', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0095', czech:'Kdy je přestávka?', ipa:'', mongolian:'Завсарлага хэзээ вэ?', example:'Kdy je přestávka?', exampleTranslation:'Завсарлага хэзээ вэ?', category:'job-question', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0096', czech:'Co mám dělat?', ipa:'', mongolian:'Би юу хийх вэ?', example:'Co mám dělat?', exampleTranslation:'Би юу хийх вэ?', category:'job-question', lessonId:'l006', difficulty:'hard' },
  { id:'a0c0097', czech:'hotovo', ipa:'', mongolian:'дууссан', example:'Je hotovo?', exampleTranslation:'Дууссан уу?', category:'job', lessonId:'l006', difficulty:'easy' },
  { id:'a0c0098', czech:'Je hotovo?', ipa:'', mongolian:'Дууссан уу?', example:'Je hotovo?', exampleTranslation:'Дууссан уу?', category:'job-question', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0099', czech:'Ukažte mi, prosím.', ipa:'', mongolian:'Надад үзүүлж өгнө үү.', example:'Nerozumím. Ukažte mi, prosím.', exampleTranslation:'Би ойлгохгүй байна. Надад үзүүлж өгнө үү.', category:'job-survival', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0103', czech:'Nový úkol.', ipa:'', mongolian:'Шинэ даалгавар.', example:'Nový úkol.', exampleTranslation:'Шинэ даалгавар.', category:'job', lessonId:'l006', difficulty:'medium' },
  { id:'a0c0104', czech:'Ukážu vám.', ipa:'', mongolian:'Би танд үзүүлж өгнө.', example:'Ukážu vám.', exampleTranslation:'Би танд үзүүлж өгнө.', category:'job-response', lessonId:'l006', difficulty:'medium' },
];
