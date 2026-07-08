# A0.7–A0.15 mission blueprint v0.1

Энэ файл нь A0.7–A0.15 хичээлийг code/data хэлбэрээр оруулахаас өмнөх **text lock blueprint** юм. Энд байгаа Czech text, Монгол орчуулга, dialogue logic нь шууд import хийх эцсийн dataset биш; эхлээд утга, дараалал, reuse/new phrase ялгаа, орчуулгын чанарыг батална.

## Хатуу зарчим

1. **Mission first** — эхлээд бодит амьдралын нөхцөл, сурагчийн хийж чадах үйлдлийг тогтооно. Дараа нь үг сонгоно.
2. **Нэг Czech phrase = нэг шинэ card** — өмнө орсон phrase дахин шинэ card болохгүй. Зөвхөн `reuseOnly` буюу review/dialogue reuse байна.
3. **Dialogue нь утгын хувьд 100% coherent байна** — сурагч цээжлэхдээ үйл явдлыг дүрслэн санах учраас яриа хиймэл, тасархай, логикгүй байж болохгүй.
4. **Монгол орчуулга сурах хүний толгойд шууд буух ёстой** — үгчилсэн орчуулга биш, хэрэглээний утгыг зөв өгнө. Шаардлагатай үед literal note тусдаа өгч болно.
5. **Speech/audio ready data** — шинэ card бүр дараа нь `targetText`, `speechType`, `acceptedVariants`, `audioPath`, `memoryTargetIds`, `reuseOnly` contract-д таарна.
6. **A0 түвшин** — урт, хүнд дүрмийн өгүүлбэрээр шахахгүй. Богино, амьдралд шууд хэрэглэх хэллэг давамгайлна.
7. **Czech диакритик алдаагүй байх** — á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú/ů, ý, ž тэмдэгтүүдийг эцсийн lock дээр нэг бүрчлэн шалгана.

## A0.1–A0.6 reuse pool

Дараах хэллэгүүдийг A0.7–A0.15 дээр шинэ card болгож дахин оруулахгүй. Dialogue, review, carryover-д ашиглаж болно.

- `Dobrý den.` — Сайн байна уу.
- `Prosím.` — Гуйя / болно / энд байна.
- `Děkuji.` — Баярлалаа.
- `Ano.` — Тийм.
- `Ne.` — Үгүй.
- `Nerozumím.` — Би ойлгохгүй байна.
- `Mluvte prosím pomalu.` — Удаан ярьж өгнө үү.
- `Na shledanou.` — Баяртай.
- `Potřebuji pomoc.` — Надад тусламж хэрэгтэй.
- `Potřebuji vodu.` — Надад ус хэрэгтэй.
- `Chci tohle.` — Би үүнийг хүсэж байна.
- `Nemám kartu.` — Надад карт байхгүй.
- `Nemám peníze.` — Надад мөнгө байхгүй.
- `Kde je ...?` pattern — ... хаана байна?
- `Tady.` — Энд.
- `Tam.` — Тэнд.
- `Kdy?` — Хэзээ?
- `Mám čas.` — Би завтай.
- `Nemám čas.` — Би завгүй.
- `v pět`, `v osm`, `ve dvanáct` — тавд, наймд, арван хоёрт.
- `Pracuji tady.` — Би энд ажилладаг.
- `Kdy končíme?` — Бид хэзээ тарах вэ?
- `Kdy je přestávka?` — Завсарлага хэзээ вэ?
- `Ukažte mi, prosím.` — Надад үзүүлж өгнө үү.

---

## A0.7 — Хоол, кафе, ресторан

**Бодит нөхцөл:** Сурагч кафе/жижиг хоолны газарт орж, хоол/ундаа асууж, захиалж, төлбөрөө хийж чадна.

**Final mission:** Кафед ажилтантай мэндэлж, цэс асууж, нэг хоол/ундаа захиалж, энд идэх эсвэл авч явахаа хэлээд төлбөрөө хийж гарна.

**Reuse:** `Dobrý den.`, `Prosím.`, `Děkuji.`, `Ano.`, `Ne.`, `Chci tohle.`, `Potřebuji vodu.`, `Nemám kartu.`, `Nemám peníze.`, `Na shledanou.`

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `jídelní lístek` | цэс | noun |
| `Máte jídelní lístek?` | Танайд цэс байна уу? | request |
| `Dám si ...` | Би ... авъя. | ordering pattern |
| `Dám si kávu.` | Би кофе авъя. | ordering phrase |
| `Dám si čaj.` | Би цай авъя. | ordering phrase |
| `Dám si polévku.` | Би шөл авъя. | ordering phrase |
| `tady` | энд | reuse-sensitive; өмнө `Tady.` орсон тул шинэ card биш эсэхийг шалгана |
| `s sebou` | авч явах | service choice |
| `Tady, nebo s sebou?` | Энд идэх үү, авч явах уу? | staff question |
| `S sebou, prosím.` | Авч явъя, гуйя. | learner answer |
| `Kolik to stojí?` | Энэ хэд вэ? | price question |
| `Platím kartou.` | Би картаар төлнө. | payment |
| `Platím hotově.` | Би бэлнээр төлнө. | payment |

**Dialogue logic:**

1. Staff: `Dobrý den. Co si dáte?` — Сайн байна уу. Та юу авах вэ?
2. Learner: `Dám si kávu, prosím.` — Би кофе авъя.
3. Staff: `Tady, nebo s sebou?` — Энд уух уу, авч явах уу?
4. Learner: `S sebou, prosím.` — Авч явъя.
5. Staff: `Platíte kartou?` — Та картаар төлөх үү?
6. Learner: `Ano, platím kartou.` — Тийм, картаар төлнө.
7. Staff: `Děkuji.` — Баярлалаа.
8. Learner: `Děkuji. Na shledanou.` — Баярлалаа. Баяртай.

**Text lock note:** `Co si dáte?` нь бодит Чех харилцаанд түгээмэл боловч A0-д шууд шинэ card болгох эсэхийг шалгана. Хэрэв хүнд бол staff-only listening phrase болгож болно.

---

## A0.8 — Дэлгүүр, мөнгө

**Бодит нөхцөл:** Сурагч дэлгүүрт бараа асууж, үнэ мэдэж, авах/авахгүйгээ хэлж, төлбөрийн хэлбэрээ сонгоно.

**Final mission:** Жижиг дэлгүүрт орж, хэрэгтэй зүйлээ зааж, үнийг асууж, картаар эсвэл бэлнээр төлөөд гарна.

**Reuse:** `Dobrý den.`, `Chci tohle.`, `Kolik to stojí?` from A0.7 if locked, `Nemám kartu.`, `Nemám peníze.`, `Prosím.`, `Děkuji.`

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `obchod` | дэлгүүр | өмнө A0.3 дээр орсон тул reuseOnly |
| `kolik` | хэд | өмнө A0.5 дээр орсон тул reuseOnly |
| `stojí` | үнэтэй / үнэтэй байна | price verb |
| `To je drahé.` | Энэ үнэтэй байна. | buyer response |
| `To je levné.` | Энэ хямд байна. | buyer response |
| `Chci tašku.` | Би уут авъя. | practical request |
| `Máte tašku?` | Уут байна уу? | practical request |
| `malý` | жижиг | adjective |
| `velký` | том | adjective |
| `Tento.` | Энэ. | pointing choice |
| `Tenhle, prosím.` | Үүнийг авъя. | natural selection |
| `Účtenku, prosím.` | Баримт өгнө үү. | receipt |

**Dialogue logic:**

1. Staff: `Dobrý den.`
2. Learner: `Dobrý den. Chci tohle, prosím.`
3. Staff: `Tento?` — Энэ үү?
4. Learner: `Ano, tento.`
5. Learner: `Kolik to stojí?`
6. Staff: `Stojí ... korun.` — ... крон.
7. Learner: `Platím kartou.` / `Platím hotově.`
8. Learner: `Účtenku, prosím.`

**Text lock note:** `korun` оруулахдаа тоо сураагүй бол fixed phrase байдлаар staff-only байлгаж болно. Тоо A0.8 дотор орвол 1–10 эсвэл price chunks тусад нь төлөвлөнө.

---

## A0.9 — Гэр, байр, хэрэгцээ

**Бодит нөхцөл:** Сурагч байр/өрөөнд асуудал гарсан үед гэрийн эзэн, ажилтан, хамт амьдрагчид богиноор хэлж чадна.

**Final mission:** Байранд ус, дулаан, түлхүүр, өрөөний асуудлыг хэлж, тусламж/засвар хүснэ.

**Reuse:** `Potřebuji pomoc.`, `Nerozumím.`, `Ukažte mi, prosím.`, `Kde je ...?`, `Tady.`, `Tam.`

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `pokoj` | өрөө | noun |
| `byt` | байр | noun |
| `klíč` | түлхүүр | noun |
| `Mám klíč.` | Надад түлхүүр байна. | possession |
| `Nemám klíč.` | Надад түлхүүр байхгүй. | possession problem |
| `voda` | ус | A0.2 `vodu`-тай холбоотой; шинэ хэлбэрээр оруулах эсэхийг шалгана |
| `teplá voda` | халуун ус | home need |
| `Neteče voda.` | Ус гоожихгүй байна / ус гарахгүй байна. | problem report |
| `Je zima.` | Хүйтэн байна. | condition |
| `Je problém.` | Асуудал байна. | problem opener |
| `Můžete mi pomoct?` | Та надад тусалж чадах уу? | polite help request |

**Dialogue logic:**

1. Learner: `Dobrý den. Je problém.`
2. Staff/landlord: `Jaký problém?` — Ямар асуудал вэ?
3. Learner: `Nemám klíč.` / `Neteče voda.`
4. Staff: `Ukažte mi, prosím.`
5. Learner: `Tady.`
6. Staff: `Dobře.`
7. Learner: `Děkuji.`

**Text lock note:** `Můžete mi pomoct?` нь ашигтай боловч A0-д урт байж магадгүй. `Potřebuji pomoc.`-ийг reuse хийж, шинэ polite request-ийг A0.14 рүү шилжүүлж болно.

---

## A0.10 — Эрүүл мэнд, эмийн сан

**Бодит нөхцөл:** Сурагч эмийн санд орж, юу өвдөж байгаагаа хэлж, эм асууж, хэрэглэх давтамжийг ойлгох эхлэл авна.

**Final mission:** Эмийн санд толгой/гэдэс/хоолой өвдөж байгаагаа хэлж, эм асуугаад, яаж хэрэглэхийг удаан хэлүүлэх хүсэлт тавина.

**Reuse:** `Kde je lékárna?`, `Potřebuji pomoc.`, `Mluvte prosím pomalu.`, `Nerozumím.`, `Děkuji.`

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `Bolí mě ...` | Миний ... өвдөж байна. | health pattern |
| `Bolí mě hlava.` | Миний толгой өвдөж байна. | symptom |
| `Bolí mě břicho.` | Миний гэдэс өвдөж байна. | symptom |
| `Bolí mě v krku.` | Миний хоолой өвдөж байна. | symptom |
| `Mám teplotu.` | Би халуурч байна. | symptom |
| `lék` | эм | noun |
| `Máte něco na bolest?` | Өвчинд уух юм байна уу? | pharmacy request |
| `Jak to mám brát?` | Үүнийг яаж уух вэ? | instruction request |
| `jednou denně` | өдөрт нэг удаа | dosage chunk |
| `dvakrát denně` | өдөрт хоёр удаа | dosage chunk |

**Dialogue logic:**

1. Learner: `Dobrý den. Potřebuji pomoc.`
2. Pharmacist: `Co vás bolí?` — Юу өвдөж байна вэ?
3. Learner: `Bolí mě hlava.`
4. Learner: `Máte něco na bolest?`
5. Pharmacist: `Ano. Tento lék.` — Тийм. Энэ эм.
6. Learner: `Jak to mám brát?`
7. Pharmacist: `Jednou denně.` / `Dvakrát denně.`
8. Learner: `Mluvte prosím pomalu. Nerozumím.`

**Text lock note:** Эрүүл мэндийн хэсэгт аюултай эмчилгээний зөвлөгөө өгөхгүй. Зөвхөн хэлний survival phrase байна.

---

## A0.11 — Утас, ойлгоогүй үед

**Бодит нөхцөл:** Сурагч утсаар ярихдаа хэнтэй ярьж байгаагаа хэлж, удаан давтуулах, SMS/мессежээр бичүүлэх хүсэлт тавьж чадна.

**Final mission:** Утасны ярианд өөрийгөө танилцуулж, ойлгоогүй үед удаан хэлүүлэх, дахин хэлүүлэх, мессежээр бичүүлэх хүсэлт тавина.

**Reuse:** `Dobrý den.`, `Jmenuji se ...`, `Nerozumím.`, `Mluvte prosím pomalu.`, `Potřebuji telefon.`, `Děkuji.`

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `telefon` | утас | A0.2 дээр орсон тул reuseOnly |
| `Volám kvůli ...` | Би ...-ийн талаар залгаж байна. | phone opener |
| `Můžete to zopakovat?` | Та үүнийг давтаж хэлж болох уу? | repair request |
| `Ještě jednou, prosím.` | Дахиад нэг удаа, гуйя. | repair request |
| `Napište mi to, prosím.` | Үүнийг надад бичээд өгнө үү. | text request |
| `SMS` | SMS | channel |
| `pošlete SMS` | SMS явуулна уу | request |
| `Slyšíte mě?` | Та намайг сонсож байна уу? | phone check |
| `Slyším vás.` | Би таныг сонсож байна. | phone response |

**Dialogue logic:**

1. Staff: `Dobrý den.`
2. Learner: `Dobrý den. Jmenuji se ...`
3. Staff: `Slyšíte mě?`
4. Learner: `Ano, slyším vás.`
5. Staff gives information quickly.
6. Learner: `Nerozumím. Mluvte prosím pomalu.`
7. Learner: `Ještě jednou, prosím.`
8. Learner: `Napište mi to, prosím.`

**Text lock note:** `Volám kvůli ...` нь хэрэглээ өндөр боловч A0-д phrase chunk байдлаар л оруулна.

---

## A0.12 — Хүмүүс, гэр бүл

**Бодит нөхцөл:** Сурагч өөрийн гэр бүл, хамт байгаа хүн, холбоо хамаарлаа энгийнээр хэлж чадна.

**Final mission:** Хүнтэй танилцахдаа ганцаараа эсвэл гэр бүлтэйгээ байгаа, эхнэр/нөхөр/хүүхэдтэй эсэхээ хэлнэ.

**Reuse:** `Jmenuji se ...`, `Jsem z Mongolska.`, `Kdo jste?`, `Jak se máte?`, `Dobře, děkuji.`

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `rodina` | гэр бүл | noun |
| `moje rodina` | миний гэр бүл | phrase |
| `manžel` | нөхөр | noun |
| `manželka` | эхнэр | noun |
| `dítě` | хүүхэд | noun |
| `děti` | хүүхдүүд | noun |
| `Mám rodinu.` | Би гэр бүлтэй. | statement |
| `Mám dítě.` | Би хүүхэдтэй. | statement |
| `Mám děti.` | Би хүүхдүүдтэй. | statement |
| `Jsem tady s rodinou.` | Би энд гэр бүлтэйгээ байна. | situation |
| `Jsem tady sám.` | Би энд ганцаараа байна. | situation male/default |
| `Jsem tady sama.` | Би энд ганцаараа байна. | situation female |

**Dialogue logic:**

1. Person: `Dobrý den. Jak se jmenujete?`
2. Learner: `Jmenuji se ...`
3. Person: `Jste tady s rodinou?` — Та энд гэр бүлтэйгээ байгаа юу?
4. Learner: `Ano, jsem tady s rodinou.` / `Ne, jsem tady sám/sama.`
5. Person: `Máte děti?` — Та хүүхэдтэй юу?
6. Learner: `Ano, mám dítě/děti.` / `Ne.`

**Text lock note:** `sám/sama` хүйсийн ялгаатай тул app дээр learner gender шаардахгүй байдлаар хоёр хувилбарыг тайлбарлаж өгнө.

---

## A0.13 — Цаг агаар, хувцас

**Бодит нөхцөл:** Сурагч цаг агаар, хүйтэн/халуун, бороо, хувцасны хэрэгцээг энгийнээр хэлж чадна.

**Final mission:** Гадаа цаг агаар ямар байгааг ойлгож, даарах/халууцах, хүрэм/малгай хэрэгтэйгээ хэлнэ.

**Reuse:** `dnes`, `zítra`, `teď`, `Je zima.` from A0.9 if locked, `Potřebuji ...`, `Kde je ...?`

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `počasí` | цаг агаар | noun |
| `Dnes je zima.` | Өнөөдөр хүйтэн байна. | weather |
| `Dnes je teplo.` | Өнөөдөр дулаахан байна. | weather |
| `Prší.` | Бороо орж байна. | weather |
| `Sněží.` | Цас орж байна. | weather |
| `Je mi zima.` | Би даарч байна. | body state |
| `Je mi teplo.` | Би халууцаж/дулаацаж байна. | body state |
| `bunda` | хүрэм | clothing |
| `čepice` | малгай | clothing |
| `Potřebuji bundu.` | Надад хүрэм хэрэгтэй. | need |
| `Potřebuji čepici.` | Надад малгай хэрэгтэй. | need |

**Dialogue logic:**

1. Person: `Dnes je zima.`
2. Learner: `Ano, je mi zima.`
3. Person: `Prší.`
4. Learner: `Potřebuji bundu.`
5. Person: `Bunda je tam.`
6. Learner: `Děkuji.`

**Text lock note:** `Je zima` = орчин хүйтэн, `Je mi zima` = би даарч байна. Энэ ялгааг Монгол тайлбарт тодорхой өгнө.

---

## A0.14 — Асуудал, аюулгүй байдал

**Бодит нөхцөл:** Сурагч гудамж, ажил, байр, тээвэр дээр асуудал/аюул гарсан үед богино, тодорхой тусламж хүснэ.

**Final mission:** Яаралтай биш боловч чухал асуудал гарсан үед “асуудал байна”, “тусламж хэрэгтэй”, “би ойлгохгүй байна”, “дуудна уу/бичнэ үү” гэж хэлнэ.

**Reuse:** `Potřebuji pomoc.`, `Nerozumím.`, `Mluvte prosím pomalu.`, `Ukažte mi, prosím.`, `Je problém.` if locked in A0.9

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `Pomoc!` | Туслаарай! | emergency call |
| `Je problém.` | Асуудал байна. | problem opener |
| `Mám problém.` | Надад асуудал байна. | personal problem |
| `Zavolejte prosím ...` | ... руу залгаж өгнө үү. | help request |
| `policie` | цагдаа | emergency noun |
| `doktor` | эмч | emergency noun |
| `sanitka` | түргэн тусламж | emergency noun |
| `Zavolejte prosím policii.` | Цагдаа дуудаж өгнө үү. | urgent request |
| `Zavolejte prosím doktora.` | Эмч дуудаж өгнө үү. | urgent request |
| `Jsem v pořádku.` | Би зүгээр байна. | safety response |
| `Nejsem v pořádku.` | Би зүгээр биш байна. | safety response |

**Dialogue logic:**

1. Learner: `Pomoc!`
2. Person: `Co se stalo?` — Юу болсон бэ?
3. Learner: `Mám problém. Potřebuji pomoc.`
4. Person: `Jste v pořádku?` — Та зүгээр үү?
5. Learner: `Nejsem v pořádku.` / `Jsem v pořádku.`
6. Learner: `Zavolejte prosím doktora.` / `Zavolejte prosím policii.`

**Text lock note:** Энэ хичээл нь айлгах биш, survival safety. Эмнэлэг/хууль зүйн зөвлөгөө биш, зөвхөн хэлний phrase.

---

## A0.15 — Чехэд эхний долоо хоног

**Бодит нөхцөл:** A0.1–A0.14 дээр сурсан хамгийн чухал phrase-уудыг нэг урт, бодит narrative-д ашиглана.

**Final mission:** Чехэд эхний долоо хоногт: мэндлэх, өөрийгөө танилцуулах, чиглэл асуух, хоол авах, дэлгүүрт төлөх, эмийн санд асуух, ажил дээр ойлгохгүй үед тусламж хүсэх, утсаар давтуулах.

**Reuse:** A0.1–A0.14-ийн бүх active survival phrase. Шинэ card хамгийн бага байна.

**Шинэ phrase candidates:**

| Czech | Монгол утга | Үүрэг |
|---|---|---|
| `první týden` | эхний долоо хоног | theme phrase |
| `Jsem nový/nová.` | Би шинэ хүн. | identity at work/home |
| `Učím se česky.` | Би чех хэл сурч байна. | meta phrase |
| `Mluvím trochu česky.` | Би бага зэрэг чехээр ярьдаг. | confidence phrase |
| `Prosím, pomozte mi.` | Надад туслаарай. | polite help request |

**Dialogue logic:**

Scene chain:

1. Reception/contact: `Dobrý den. Jmenuji se ... Jsem z Mongolska.`
2. Direction: `Prosím, kde je zastávka?` → `Tam.`
3. Food: `Dám si kávu, prosím.`
4. Shop/payment: `Kolik to stojí? Platím kartou.`
5. Pharmacy: `Bolí mě hlava. Máte něco na bolest?`
6. Work: `Nerozumím. Ukažte mi, prosím.`
7. Phone: `Ještě jednou, prosím. Napište mi to, prosím.`
8. Closing: `Děkuji. Na shledanou.`

**Text lock note:** A0.15 бол шинэ зүйл шахах хичээл биш. Энэ бол memory integration lesson. Сурагч “би бодит эхний долоо хоногийг давж чадна” гэсэн мэдрэмж авах ёстой.

---

## Data lock хийхээс өмнөх review checklist

- [ ] Хичээл бүрийн final mission бодит амьдралд хэрэг болох эсэх.
- [ ] Dialogue бүр эхлэл → асуудал/зорилго → шийдэл → хаалт гэсэн логиктой эсэх.
- [ ] A0.1–A0.6 reuse phrase давхар шинэ card болоогүй эсэх.
- [ ] Шинэ phrase бүр A0 түвшинд багтах эсэх.
- [ ] Монгол орчуулга ойлгомжтой, хэрэглээний утгатай эсэх.
- [ ] Czech диакритик, үг үсэг, naturalness шалгагдсан эсэх.
- [ ] `targetText`, `speechType`, `acceptedVariants`, `audioPath`, `memoryTargetIds`, `reuseOnly` contract-д оруулах боломжтой эсэх.
- [ ] A0.7-г prototype lesson болгон code-д оруулахад хангалттай тодорхой эсэх.
