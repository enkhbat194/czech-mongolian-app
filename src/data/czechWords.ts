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
 * A0.1–A0.2 сургалтын нэгжүүд.
 * Аудио файл байхгүй үед интерфэйс нь төхөөрөмжийн Чех TTS (яриа синтез)-д шилжинэ.
 * Native speaker (төрөлх хэлтэй хүн)-ийн аудио орох үед audioFile талбарыг л бөглөнө.
 */
export const czechWords: CzechWord[] = [
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
];