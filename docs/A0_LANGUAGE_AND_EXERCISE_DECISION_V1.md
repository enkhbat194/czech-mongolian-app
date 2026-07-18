# A0 Language and Exercise Decision V1

Огноо: 2026-07-17  
Суурь commit: `0ca5625fc906f8859aa65a74ab036757135936b0`  
Хамрах хүрээ: A0.1–A0.15, 188 карт, 209 дасгал, 231 диалогийн алхам  
Эх сурвалж: `docs/A0_MASTER_CONTENT_AUDIT.md`, `docs/A0_TRIAGE_PROPOSALS.md`, A0 lesson/dialogue data, practice engine-ийн одоогийн холболт.

## 0. Энэ баримтын хэрэглээ

Энэ файл нь дараагийн контентын implementation batch-ийн **ганц шийдвэрийн эх сурвалж** байна.

- Доор `REPAIR`, `REPLACE`, `REMOVE`, `HIDE`, `PROFILE` гэж заагаагүй A0 item-уудыг **KEEP** гэж үзнэ.
- Claude өөрөө Чех эсвэл Монгол шинэ текст зохиохгүй.
- Кодод оруулахдаа энэ файлд байгаа яг текст, үүргийн ангилал, дасгалын дүрмийг ашиглана.
- Сургалтын зорилго нь дүрмийн нэр томьёо цээжлүүлэх биш, Монгол насанд хүрсэн сурагчийг Чехэд өдөр тутмын нөхцөлд ойлголцуулах.
- Энэ нь Чех хэлтэй төрөлх редакторын эцсийн сертификат биш; харин одоогийн A0-г кодод хэрэгжүүлэхэд хангалттай V1 хэл–арга зүйн шийдвэр.

---

## 1. Нийт A0-д мөрдөх түгжээ

### 1.1 Хэллэгийн үүрэг

A0 memory target бүр дараах 4 үүргийн аль нэг байна.

1. `learner-say` — сурагч өөрөө хэлж, бичиж, өгүүлбэр бүтээж давтана.
2. `recognition-only` — ажилтан/эмч/үйлчлэгч/ахлагчийн үгийг сонсоод ойлгоно; сурагчид бичүүлж, хэлүүлж болохгүй.
3. `profile-dependent` — нэр, хүйс зэрэг profile-аас зөв хэлбэр нь шийдэгдсэний дараа production-д орно.
4. `support-only` — `být`, `já`, `vy`, `z`, `kdo`, `mluvit` шиг бүтэн харилцаа биш суурь хэсэг; карт/тайлбарт байж болно, харин үндсэн production болон SRS mastery-ийн гол зорилт болохгүй.

`a0PracticePools.ts` зөвхөн диалогийн `correctId`-аас үүрэг таах нь хангалтгүй. Контентын implementation batch-д memory target бүрд дээрх role-ийг explicit map/metadata хэлбэрээр өгнө.

### 1.2 Монгол орчуулгын стандарт

- Үгчилсэн, модон Монгол өгүүлбэрээс зайлсхийж нөхцөлд бодитоор хэлэх утгыг хэрэглэнэ.
- Нэг Чех хэллэгийн үндсэн Монгол утгыг тогтвортой барина.
- Нөхцөлөөс шалтгаалсан өөр утгыг instruction/feedback дээр тайлбарлана; нэг картын орчуулгад `;`-ээр олон үүрэг хольж болохгүй.
- `Prosím`-ийг автоматаар “Уучлаарай” гэж орчуулахгүй. `Promiňte` = “Уучлаарай”; `Prosím` = эелдэг хүсэлт/“Гуйя”, зарим нөхцөлд “Авна уу”, “Зүгээр ээ”.
- Монгол өгүүлбэрийг сурагчийн амьд ярианд ойр, богино, ойлгомжтой байлгана.

### 1.3 Дасгалын чанарын дүрэм

- Нэг асуулт нэг л хамгаалагдах зөв хариулттай байна.
- Prompt өөрөө зөв хариултыг шууд давтаж харуулахгүй.
- FillBlank нь утга ялгах context-тэй, зөвхөн нэг бодит completion-тэй байна.
- Order нь 2–5 утгатай token бүхий хэрэглэгдэх хэллэг дээр байна; тусгаар нэр, profile name таалгах дасгал болохгүй.
- Match нь дүрмийн задгай хэсгүүдийг механикаар холбохоос илүү бүтэн хэллэг ↔ харилцааны үүрэг/утгыг холбоно.
- Distractor нь тухайн нөхцөлд үнэмшилтэй боловч утгын хувьд тодорхой буруу байна.
- Staff-only хэллэг Speaking/Writing/Dictation/SentenceBuilder production pool-д орохгүй.
- Шалгахаас өмнө зөв хариултын Чех аудиог тоглуулахгүй.
- Speech recognition байхгүй үед дуудлагын оноо, “зөв хэллээ” гэсэн автомат баталгаа өгөхгүй.
- “Мэдэхгүй — хариултыг харах” recovery нь XP/SRS-д зөв гэж тооцогдохгүй.

### 1.4 Диалогийн correctId шийдвэр

Өгөгдөлд зөв хариулт `a` дээр 87% байрласан нь authoring bias боловч сурагчид харагдах бодит эрсдэлийг runtime shuffle шийднэ.

**Шийдвэр: REPAIR engine/audit, data-г гараар утгагүй эргүүлэхгүй.**

- Dialogue болон choice бүр rendering-ийн өмнө `stableShuffle` ашиглана.
- `correctId` нь shuffle-ийн дараа ID-аар зөв хариултыг найдвартай олно.
- CI audit нь dialogue/choice renderer shuffle ашиглаж байгааг хамгаална.
- Data order-ийг зөвхөн “баланс харагдуулах” зорилгоор өөрчилж, олон зуун мөрийг дэмий хөдөлгөхгүй.

### 1.5 Нэр ба хүйс

- Canonical learner self-introduction: `Jmenuji se {userName}.`
- Монгол: `Намайг {userName} гэдэг.`
- Raw data дахь `Eba`-г render үед нуух төдий биш, дараагийн content migration-д `{userName}` template болгон цэвэрлэнэ; memory ID-г өөрчлөхгүй.
- `nový/nová`, `sám/sama` зөвхөн profile-аар шийдэгдэнэ.
- `neutral` profile-д gender-form production өгөхгүй.
- Recognition staff question-ийг боломжтой бол gender-neutral болгоно: `Jste tady s rodinou?`

### 1.6 Audio/TTS

- Чех аудио/TTS зөвхөн Чех текстэд.
- Монгол prompt, тайлбар, орчуулгыг Чех хоолойгоор уншихгүй.
- Staff-only phrase-г сонсох дасгалд ашиглаж болно.
- Learner production phrase-г хариулт шалгасны дараа model audio болгон тоглуулна.

---

## 2. A0.1 — Анхны харилцаа

### Үүргийн ангилал

**learner-say:** `Dobrý den.`, `Děkuji.`, `Prosím.`, `Ano.`, `Ne.`, `Na shledanou.`, `Jmenuji se {userName}.`, `Dobře.`, `Špatně.`, `Jsem z Mongolska.`, `Nerozumím.`, `Mluvte prosím pomalu.`

**recognition-only:** `Jak se jmenujete?`, `Kdo jste?`, `Jak se máte?`, `Mluvím moc rychle?`

**support-only:** `být`, `já`, `vy`, `jmenovat se`, `kdo`, `odkud`, `z`, `mluvit`, `pomalu`.

### Яг засах текст

| Одоогийн | Шийдвэр | Шинэ Монгол/текст |
|---|---|---|
| `Jak se jmenujete?` → `Таны нэр хэн бэ?` | REPAIR | `Таныг хэн гэдэг вэ?` |
| `Jmenuji se …` → `Миний нэр …` | REPAIR | `Намайг … гэдэг.` |
| `Jak se máte?` → `Та сайн уу?` | REPAIR | `Та сайн байна уу?` — биеийн байдал асууж буйг instruction-д тодруулна |
| `Špatně.` → `Муу.` | REPAIR | `Муу байна.` |
| `Prosím` → `Гуйя; зүгээр; энд байна` | REPLACE | card үндсэн утга: `Гуйя.`; бусад хэрэглээг context instruction-д салгаж тайлбарлана |
| `Mluvte prosím pomalu.` → `Удаан ярьж өгнө үү.` | REPAIR | `Удаан ярина уу.` |

### Дасгал

- `a0-1-a-3`: blank `___ .`-г REMOVE; нөхцөлтэй choice болгоно: `Хэн нэгэн танд тусаллаа. Та юу гэж хэлэх вэ?` → `Děkuji.`
- `a0-1-c-1`, `a0-1-c-2`: `{userName}` template ашиглан KEEP.
- `a0-1-c-3-match`: grammar fragment match-ийг REPLACE: `Jmenuji se {userName}. ↔ Өөрийн нэрээ хэлэх`, `Jak se jmenujete? ↔ Хүний нэрийг асуух`.
- `a0-1-d-2`: prompt-ийг `Хамгаалалтын ажилтан таныг танихгүй байна. Тэр аль асуултыг хэлж болох вэ?` болгоно.
- Нэр сонссоны дараа `Děkuji.` гэж хариулах dialogue-г KEEP, гэхдээ “танилцсандаа” гэдэг feedback нэмэхгүй; зөвхөн мэдээлэл авсандаа эелдгээр хариулж байна гэж тайлбарлана.

---

## 3. A0.2 — Надад хэрэгтэй

### Үүргийн ангилал

**learner-say:** `Potřebuji pomoc.`, `Potřebuji vodu.`, `Potřebuji telefon.`, `Chci vodu.`, `Chci jídlo.`, `Chci něco k jídlu.`, `Chci tohle.`, `Nemám peníze.`, `Nemám kartu.`, `Potřebuji pomoc, prosím.`

**recognition-only:** `Co potřebujete?`, `Chcete vodu?`, `Chcete něco k jídlu?`, `Chcete tohle?`, `Platíte kartou?`, `Máte hotovost?`, `Ještě něco?`

**support-only:** `potřebuji`, `pomoc`, `vodu`, `telefon`, `chci`, `jídlo`, `něco`, `tohle`, `nemám`, `peníze`, `kartu`.

### Яг засах Монгол

| Czech | Одоогийн | Шинэ үндсэн Монгол |
|---|---|---|
| `Chci vodu.` | Би ус хүсэж байна. | `Ус авъя.` |
| `Chci jídlo.` | Би хоол хүсэж байна. | `Хоол авъя.` |
| `Chci něco k jídlu.` | Би идэх юм хүсэж байна. | `Идэх юм авъя.` |
| `Chci tohle.` | Би үүнийг хүсэж байна. | `Энийг авъя.` |
| `Potřebuji pomoc, prosím.` | Надад туслаач, гуйя. | `Надад тусламж хэрэгтэй байна.` |

### Диалогийн засвар

- `Máte hotovost?` асуултад `Nemám peníze.` гэж хариулах нь “ерөөсөө мөнгөгүй” гэсэн хүчтэй утгатай. Learner choice-г `Ne, nemám.` болгоно. Монгол: `Үгүй, байхгүй.`
- `Potřebuji pomoc.`-ийг emergency phrase, `Chci ...`-г сонголт/үйлчилгээний phrase гэж context-оор ялгана.
- `Potřebuji telefon.` нь “утсаар ярих хэрэгтэй/утас хэрэгтэй” нөхцөлд KEEP; “шинэ утас худалдаж авах” утгаар ойлгуулахгүй.
- Grammar-part match (`potřebuji ↔ ...`) нь recognition support хэлбэрээр л үлдэнэ; mastery production score-д орохгүй.

---

## 4. A0.3 — Хаана байна?

**learner-say:** `Prosím, kde je toaleta?`, `Kde je obchod?`, `Kde je lékárna?`, `Kde je nádraží?`, `Tady, nebo tam?`, `Děkuji.`

**recognition-only:** `Toaleta je tady.`, `Obchod je tam.`, `Hledáte nádraží?`, `Ano, tam.`

**support-only:** `kde`, `toaleta`, `tady`, `tam`, `obchod`, `lékárna`, `nádraží`, `nebo`.

### Засвар

- `Prosím, kde je toaleta?`-г `Уучлаарай, ариун цэврийн өрөө хаана байна?` гэж орчуулсныг REPAIR: `Ариун цэврийн өрөө хаана вэ?` Instruction дээр “эелдэгээр асууж байна” гэж тайлбарлана.
- `Prosím`-ийг “уучлаарай” гэж заахгүй. Ирээдүйд илүү байгалийн Czech phrase нэмэх бол `Promiňte, kde je toaleta?`, гэхдээ энэ V1-д шинэ card нэмж scope тэлэхгүй.
- `Tady, nebo tam?` зөвхөн зааж байгаа бодит context-т production; context-гүй Writing/Dictation pool-д HIDE.
- `a03final-d4` шиг хоёр өгүүлбэртэй choice-г KEEP, гэхдээ session typing target болгохгүй.

---

## 5. A0.4 — Яаж очих вэ?

**learner-say:** `Kde je zastávka?`, `Jdu na nádraží.`, `Děkuji.`, `Nerozumím.`

**recognition-only:** `Jděte rovně.`, `doleva`, `doprava`, `Jeďte autobusem.`, `Jeďte tramvají.`, `Vystupte tady.`, `Kam jedete?`

**support-only:** `rovně`, `zastávka`, `autobus`, `tramvaj`, `vystoupit`.

### Засвар

- Чиглэл, тээврийн тушаалын өгүүлбэрийг сурагчид production болгон хэлүүлэхгүй; Listening/recognition дээр үлдээнэ.
- `Autobus, nebo tramvaj?` асуултад `Tramvaj, prosím.` гэдэг нь ойлгогдох ч хэл зүйн хувьд сул. Dialogue learner reply-г `Tramvají, prosím.` болгоно. Монгол: `Трамвайгаар явъя.`
- `Jděte rovně.` → Монгол `Шулуун яваарай.` KEEP.
- Final dialogue-ийн `Děkuji. Na shledanou.`-г нэг answer болгож болно; Writing/Dictation-д 2 өгүүлбэрээр хүчээр оруулахгүй.

---

## 6. A0.5 — Цаг, өдөр, уулзалт

**learner-say:** `Kolik je hodin?`, `Mám čas.`, `Nemám čas.`, `Zítra večer mám čas.`, `Ano, v osm.`, `Máme schůzku v osm.`

**recognition-only:** `Kdy máte čas?`, `Máte čas teď?`, `A zítra večer?`, `V osm?`, `Je dvanáct.`

**support-only:** `kolik`, `teď`, `dnes`, `zítra`, `ráno`, `večer`, `kdy`, `v osm`, `v pět`, `ve dvanáct`, `schůzka`.

### Засвар

- `Nemám čas.` үндсэн Монгол: `Би завгүй.` KEEP; instruction-д шууд утга нь `Надад зав алга.` гэж тайлбарлаж болно.
- `Dobře. Večer?` → Монгол `За. Орой юу?`-г REPAIR: `За, орой юу?`
- `Zítra večer mám čas.` → Монгол `Маргааш орой завтай.` (илүү байгалийн; “би” заавал давтахгүй).
- `Jak se máte?` дахин ашигласан бүх final dialogue-д A0.1-ийн шинэ Монгол стандартыг дагана.

---

## 7. A0.6 — Ажил дээр

**learner-say:** `Pracuji tady.`, `Kdy končíme?`, `Mám směnu.`, `Kdy je přestávka?`, `Co mám dělat?`, `Je hotovo?`, `Ukažte mi, prosím.`

**recognition-only:** `Pracujete tady?`, `Začínáme v osm.`, `Končíme v pět.`, `Mám pro vás nový úkol.`, `Ukážu vám.`

**support-only:** `práce`, `začínáme`, `směna`, `přestávka`, `hotovo`.

### Засвар

- `Nový úkol.` fragment-г REPLACE: staff line/card recognition phrase `Mám pro vás nový úkol.` Монгол: `Танд шинэ даалгавар байна.`
- `Ukážu vám.` → `Би танд үзүүлье.`
- `Ukažte mi, prosím.` → `Надад үзүүлнэ үү.`
- `Je hotovo?` role-dependent боловч learner workplace phrase учир production-д KEEP.
- Staff schedule lines (`Začínáme...`, `Končíme...`) Writing/Speaking target болохгүй.

---

## 8. A0.7 — Хоол, кафе, ресторан

**learner-say үндсэн багц:** `Kávu, prosím.`, `Dám si ...`, `Tady, prosím.`, `S sebou, prosím.`, `Platím kartou.`, `Platím hotově.`, `Účet, prosím.`, `Děkuji.`

**recognition-only:** `Tady je menu.`, `Co si dáte?`, `Kávu tady, nebo s sebou?`, `Platíte kartou, nebo hotově?`

### Монгол стандарт

- `Co si dáte?` → `Та юу авах вэ?`
- `Dám si kávu.` → `Кофе авъя.`
- `Tady, prosím.` → `Эндээ.`
- `S sebou, prosím.` → `Аваад явна.`
- `Platím kartou.` → `Би картаар төлнө.`
- `Platím hotově.` → `Би бэлнээр төлнө.`
- `Účet, prosím.` → `Тооцоогоо өгнө үү.`

### Дасгал

- Menu/card/order flow-ийг KEEP.
- `tady`-г газар заах A0.3 утга болон “эндээ иднэ” кафе утгатай нь context-оор ялгана.
- `Dám si ...` template-д зөвхөн заасан menu item ашиглана; answer-д байхгүй шинэ хоол зохиохгүй.

---

## 9. A0.8 — Дэлгүүр, мөнгө

**learner-say:** `Chci tohle.`, `Ještě tohle, prosím.`, `Platím kartou.`, `Platím hotově.`, `Děkuji.`

**recognition-only:** `Dobrý den. Co si přejete?`, `Dobře. Ještě něco?`, `Tady je účtenka.`

### Монгол стандарт

- `Co si přejete?` → `Та юу авах вэ?`
- `Ještě něco?` → `Өөр зүйл авах уу?`
- `Tady je účtenka.` → `Баримт тань.`
- `Chci tohle.` → `Энийг авъя.`

### Засвар

- Кассчны мөрийг learner production pool-д оруулахгүй.
- Карт/бэлэн мөнгөний хоёр хариултыг нэг prompt дээр хоёул зөв болохоор ambiguity үүсгэхгүй; prompt нь төлбөрийн сонголтыг тодорхой заана.
- `Nemám peníze.`-г төлөх үндсэн phrase болгон давтуулахгүй; энэ нь асуудал тайлбарлах тусдаа нөхцөл.

---

## 10. A0.9 — Гэр, байр, хэрэгцээ

**learner-say үндсэн багц:** `Nemám klíč.`, `Je problém s vodou.`, `Není voda.`, `Je mi zima.`, `Potřebuji pomoc.`, `Děkuji.`

**recognition-only:** `Dobře. Pomůžu vám.`, `Je problém s vodou?`, `Ještě něco?`

### Монгол стандарт

- `Nemám klíč.` → `Надад түлхүүр алга.`
- `Je mi zima.` → `Би даарч байна.`
- `Není voda.` → нөхцөлд `Ус гарахгүй байна.`
- `Je problém s vodou.` → `Усны асуудал байна.`

### Засвар

- `Je mi zima.` болон цаг агаарын `Je zima.`-г нэг Монгол answer/distractor-д давхар зөв болгохгүй.
- A0.15 final dialogue-д түлхүүргүйгээ хэлэх хариулт `Nemám klíč.` хэвээр KEEP.

---

## 11. A0.10 — Эрүүл мэнд, эмийн сан

**learner-say үндсэн багц:** `Nejsem v pořádku.`, `Bolí mě ...`, `Mám horečku.`, `Potřebuji lék.`, `Nerozumím.`, `Napište mi to, prosím.`

**recognition-only:** `Jak vám můžu pomoci?`, `Co potřebujete?`, `Tady je lék.`, эмийн хэрэглэх зааврын staff мөрүүд.

### Монгол стандарт

- `Nejsem v pořádku.` → `Миний бие зүгээргүй байна.`
- `Bolí mě ...` → `Миний ... өвдөж байна.`
- `Mám horečku.` → `Би халуурч байна.`
- `Tady je lék.` → `Эм нь энэ байна.` эсвэл context-д `Эм тань.`

### Засвар

- Эмийн тун, онош, эмчилгээний баталгаа зохиохгүй.
- Staff instruction-ийг сурагчид хэлүүлэхгүй; сонсож танихад хэрэглэнэ.
- Нэг symptom prompt дээр хоёр өөр зөв symptom phrase оруулахгүй.

---

## 12. A0.11 — Утас, ойлгоогүй үед

**learner-say үндсэн багц:** `Nerozumím.`, `Mluvte prosím pomalu.`, `Zopakujte to, prosím.`, `Napište mi to, prosím.`, `Pošlete mi SMS, prosím.`, `Mluvím trochu česky.`

**recognition-only:** `Slyšíte mě?`, `Řeknu vám informace.`, `Dobře, napíšu vám to.`, `Dobře, pošlu SMS.`

### Монгол стандарт

- `Zopakujte to, prosím.` → `Дахин хэлнэ үү.`
- `Napište mi to, prosím.` → `Үүнийг бичиж өгнө үү.`
- `Pošlete mi SMS, prosím.` → `Надад мессежээр явуулна уу.`
- `Mluvím trochu česky.` → `Би чехээр бага зэрэг ярьдаг.`
- `Slyšíte mě?` → `Та намайг сонсож байна уу?`

### Засвар

- `Mluvím moc rychle?` нь нөгөө хүний self-check тул learner production биш.
- Утасны dialogue-д ажилтны баталсан мөрийг learner practice pool-д оруулахгүй.

---

## 13. A0.12 — Хүмүүс, гэр бүл

**learner-say:** `Mám rodinu.`, `Mám dítě.`, `Mám děti.`, `Jsem tady s rodinou.`, `Jsem tady sám/sama.`

**recognition-only:** `Máte dítě?`, `Jsou děti tady?`, `Jste tady s rodinou?`

**profile-dependent:** `Jsem nový/nová.`, `Jsem tady sám/sama.`

### Засвар

- Ижил Монгол утгатай gender pair-ийг нэг mn→cz choice-д хамт оруулахгүй.
- `Jste tady sama, nebo s rodinou?` зэрэг staff мөрийг gender-neutral REPLACE: `Jste tady s rodinou?` Монгол: `Та энд гэр бүлийнхэнтэйгээ байгаа юу?`
- `Jsem nový/nová.` → эрэгтэй: `Би шинэ ажилтан.` / эмэгтэй: `Би шинэ ажилтан.`; Монгол ижил боловч Czech production profile-аар ганц хэлбэртэй байна.
- `sám/sama`-г neutral profile-д HIDE.
- Spouse-ийн хүйсийг learner gender-ээс автоматаар таахгүй.

---

## 14. A0.13 — Цаг агаар, хувцас

**learner-say үндсэн багц:** `Je mi zima.`, `Potřebuji bundu.`, `Potřebuji čepici.`, `Nemám bundu.`, `Nemám čepici.`

**recognition-only:** `Prší.`, `Je zima.`, `Jak je venku?`, `Potřebujete čepici?`

### Монгол стандарт

- `Prší.` → `Бороо орж байна.`
- `Je zima.` → `Гадаа хүйтэн байна.`
- `Je mi zima.` → `Би даарч байна.`
- `Potřebuji bundu.` → `Надад хүрэм хэрэгтэй.`
- `Potřebuji čepici.` → `Надад малгай хэрэгтэй.`

### Засвар

- `Co se děje venku?`-г weather prompt болгон REPLACE: `Jak je venku?` Монгол: `Гадаа ямар байна?`
- `Je zima.` / `Je mi zima.`-г translation болон distractor дээр хатуу ялгана.

---

## 15. A0.14 — Асуудал, аюулгүй байдал

**learner-say:** `Pomoc!`, `Mám problém.`, `Nejsem v pořádku.`, `Bolí mě ...`, `Zavolejte prosím doktora.`, `Zavolejte prosím sanitku.`

**recognition-only:** `Koho mám zavolat?`, `Potřebujete sanitku?`, `Je to vážné?`, `Slyšíte mě?`

### Монгол стандарт

- `Pomoc!` → `Туслаарай!`
- `Mám problém.` → `Надад асуудал гарлаа.`
- `Nejsem v pořádku.` → `Миний бие зүгээргүй байна.`
- `Zavolejte prosím doktora.` → `Эмч дуудаж өгнө үү.`
- `Zavolejte prosím sanitku.` → `Түргэн тусламж дуудаж өгнө үү.`
- `Je to vážné?` → `Ноцтой юу?`

### Засвар

- Emergency dialogue-д “зөв хариулт” нь нөхцөлөөр эмч эсвэл түргэн тусламжийн аль нэгийг тодорхой заана.
- `Koho mám zavolat?` staff-only; Speaking/Writing-д орохгүй.
- Medical diagnosis, severity score үүсгэхгүй.

---

## 16. A0.15 — Чехэд эхний долоо хоног

A0.15 нь шинэ дүрэм заах хичээл биш, A0.1–A0.14-ийн survival phrase-уудыг нэг бодит дараалалд дахин ашиглах final integration байна.

### Үндсэн production

`Dobrý den.`, `Jmenuji se {userName}.`, `Jsem z Mongolska.`, `Nerozumím.`, `Mluvte prosím pomalu.`, `Potřebuji pomoc.`, `Kde je ...?`, `Nemám klíč.`, `Je mi zima.`, `Napište mi to, prosím.`, `Děkuji.`, `Na shledanou.`

### Шийдвэр

- Final survival sequence-г KEEP.
- `Nemám klíč.`-ийг key-problem answer хэвээр хадгална.
- Staff filler `Dobře, pomůžu vám.`, `Ještě něco?`, `Řeknu vám informace.` recognition-only.
- Нэг final step дээр өмнөх хичээлийн 2–3 бүтэн phrase нийлүүлсэн answer байж болно, гэхдээ Writing/Dictation generic pool-д автоматаар оруулахгүй.
- A0.15 шинэ карт 6-аас хэтрэхгүй; бусад нь reuse байна.

---

## 17. Practice page-ийн эцсийн шийдвэр

| Хуудас | Шийдвэр | Нэмэлт дүрэм |
|---|---|---|
| Speaking | KEEP/REPAIR | explicit `learner-say` + profile-safe pool; self-review, pronunciation score биш |
| FillBlank | KEEP/REPAIR | context + unique completion; punctuation/token normalization |
| SentenceBuilder | KEEP | 2–5 token learner phrase; staff-only/long multi-sentence answer үгүй |
| Writing | KEEP | богино learner phrase; answer audio зөвхөн шалгасны дараа |
| Dictation | KEEP | Czech audio → Czech typing; Монгол TTS үгүй |
| Listening | KEEP/REPAIR | global words биш introduced/due lesson-aware recognition pool |
| WordQuiz | KEEP | recognition SRS role-той target |
| ReverseQuiz | KEEP/REPAIR | ижил Монгол утгатай gender/variant pair-ийг нэг choice-д оруулахгүй |
| A0FinalMission | KEEP | дээрх бүх role, ambiguity, audio дүрэм мөрдөнө |

---

## 18. Claude implementation batch-д өгөх файлын чиглэл

Дараагийн кодын batch дараах дарааллаар хэрэгжинэ.

1. `A0MemoryTarget`/role map-д `learner-say | recognition-only | profile-dependent | support-only` нэмэх.
2. Raw `Eba` self-introduction content-ийг `{userName}` template болгох; ID хадгалах.
3. Дээрх exact Монгол replacement-уудыг canonical card, exercise, dialogue, feedback, memory target бүх давхардсан data source-д нэгэн зэрэг синк хийх.
4. Staff-only phrase-г production pool-оос explicit role-оор хасах.
5. Grammar-fragment match болон context-гүй blank-уудыг энэ баримтын дагуу солих.
6. Listening pool-ийг introduced/due + recognition role руу нэгтгэх.
7. Dialogue runtime stable shuffle audit нэмэх; correctId data-г бөөнөөр нь утгагүй дахин эрэмбэлэхгүй.
8. `npm run check`, A0 content audit regeneration, iPhone smoke test.

## 19. A0 freeze шалгуур

A0-г freeze/merge хийхийн өмнө:

- Бүх 15 lesson дээр learner-say/staff-only/profile/support role тодорхой.
- Энэ файлд заасан exact translation replacement data бүх давхардсан source-д ижил.
- `Eba` learner-facing raw answer/data template-д үлдээгүй.
- Gender ambiguity үгүй.
- Staff-only production үгүй.
- FillBlank/choice бүр нэг зөв хариулттай.
- Audio leak үгүй; Монгол TTS үгүй.
- Fake speech score үгүй.
- `npm run check` ногоон.
- A0.1–A0.15 iPhone smoke test хийгдсэн.
- Дараа нь PR #1 main руу merge, `a0-v1` tag.
