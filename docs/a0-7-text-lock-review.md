# A0.7 text lock review — Хоол, кафе, ресторан

Статус: **review draft v0.1**. Энэ файл нь A0.7-г code/data болгон оруулахаас өмнөх хэл, утга, reuse/new card, dialogue logic-ийн шалгалт.

## 0. Эцсийн зорилго

A0.7-ийн зорилго нь сурагчийг кафе/жижиг хоолны газарт дараах үйлдлийг хийх чадвартай болгох:

1. Мэндлэх.
2. Цэс асуух эсвэл цэс хүсэх.
3. Нэг хоол/ундаа захиалах.
4. Энд хэрэглэх эсвэл авч явахаа хэлэх.
5. Үнэ асуух.
6. Картаар/бэлнээр төлөх.
7. Талархаад яриаг хаах.

A0.7 нь шинэ дүрэм шахах хичээл биш. Энэ бол A0.1–A0.6-ийн polite survival хэллэг дээр суурилсан **ordering mission**.

---

## 1. Czech phrase бүр natural эсэх

| Blueprint phrase | Шийдвэр | Тайлбар |
|---|---|---|
| `jídelní lístek` | ⚠️ солих саналтай | Зөв Чех үг, гэхдээ A0 кафе context-д урт, formal. `menu` эсвэл `Menu, prosím.` нь богино, бодит, A0-д илүү тохиромжтой. |
| `Máte jídelní lístek?` | ⚠️ солих | Natural боловч урт. A0 learner production-д `Menu, prosím.` илүү сайн. Staff/restaurant context-д `Máte menu?` байж болно. |
| `Dám si ...` | ✅ natural | Чехээр захиалга өгөх маш natural pattern. A0.7-ийн гол pattern байх ёстой. |
| `Dám si kávu.` | ✅ natural | Богино, бодит, production-д тохиромжтой. |
| `Dám si čaj.` | ✅ natural | Богино, бодит. |
| `Dám si polévku.` | ✅ natural | Natural. `polévka`-ийн object хэлбэр `polévku` гэдгийг тайлбаргүй chunk байдлаар авна. |
| `tady` | ✅ natural, гэхдээ reuseOnly | A0.3 дээр `Tady.` орсон тул шинэ card биш. |
| `s sebou` | ✅ natural | Takeaway-д зайлшгүй хэрэгтэй chunk. |
| `Tady, nebo s sebou?` | ✅ natural | Staff question байдлаар маш бодит. Learner production биш, listening/support phrase. |
| `S sebou, prosím.` | ✅ natural | Learner response-д тохиромжтой. |
| `Kolik to stojí?` | ✅ natural | Үнэ асуух хамгийн шууд хэлбэр. A0.7 эсвэл A0.8-ийн аль нэг дээр шинэ card болгож, нөгөөд reuseOnly болгоно. A0.7 дээр төлбөр орж байгаа тул энд lock хийх боломжтой. |
| `Platím kartou.` | ✅ natural | Картаар төлөхөд зөв. A0-д chunk байдлаар авна. |
| `Platím hotově.` | ✅ natural | Бэлнээр төлөхөд зөв. |
| `Co si dáte?` | ✅ natural, staff-only | Staff-ийн маш түгээмэл асуулт. Learner заавал хэлэхгүй. Listening phrase болгоно. |
| `Platíte kartou?` | ✅ natural, staff-only | Staff question. Learner answer нь `Ano, platím kartou.` |

### Naturalness conclusion

A0.7-ийн үндсэн Czech text natural байна. Гэхдээ `jídelní lístek` / `Máte jídelní lístek?`-ийг A0 production-д шууд оруулахгүй. Илүү зөв A0 хувилбар:

```text
Menu, prosím.
```

эсвэл арай бүрэн хувилбар:

```text
Máte menu?
```

A0.7 prototype-д **`Menu, prosím.`**-ийг сонгоно.

---

## 2. Монгол орчуулга зөв эсэх

| Czech | Review translation | Тайлбар |
|---|---|---|
| `Menu, prosím.` | Цэс өгнө үү. | `menu` = цэс. Монголд шууд ойлгомжтой. |
| `Dám si kávu.` | Би кофе авъя. | Natural. “Би өөртөө кофе өгье” гэж үгчилж болохгүй. |
| `Dám si čaj.` | Би цай авъя. | Natural. |
| `Dám si polévku.` | Би шөл авъя. | Natural. |
| `Tady, nebo s sebou?` | Энд идэх/уух уу, авч явах уу? | Хоол/ундаа аль алинд тааруулахын тулд UI дээр “Энд хэрэглэх үү, авч явах уу?” гэж өгч болно. |
| `S sebou, prosím.` | Авч явъя, гуйя. | Natural. |
| `Kolik to stojí?` | Энэ хэд вэ? | Natural Mongolian. Literal: “Энэ хэдийн үнэтэй вэ?” |
| `Platím kartou.` | Би картаар төлнө. | Natural. |
| `Platím hotově.` | Би бэлнээр төлнө. | Natural. |
| `Co si dáte?` | Та юу авах вэ? | Staff phrase-д зөв. |
| `Platíte kartou?` | Та картаар төлөх үү? | Natural. |

### Translation conclusion

Монгол орчуулга ерөнхийдөө зөв. A0-д сурагчийн толгойд хурдан буухын тулд `Kolik to stojí?`-г **“Энэ хэд вэ?”** гэж хадгална. `Tady, nebo s sebou?`-г context-аас хамаараад **“Энд хэрэглэх үү, авч явах уу?”** гэж илүү ерөнхий болгож болно.

---

## 3. Өмнөх phrase давхардаж байгаа эсэх

A0.1–A0.6-аас дараах phrase-ууд A0.7 дээр **reuseOnly** байна:

| Phrase | Source | A0.7 status |
|---|---|---|
| `Dobrý den.` | A0.1 | reuseOnly |
| `Prosím.` | A0.1 | reuseOnly |
| `Děkuji.` | A0.1 | reuseOnly |
| `Ano.` | A0.1 | reuseOnly |
| `Ne.` | A0.1 | reuseOnly |
| `Na shledanou.` | A0.1 | reuseOnly |
| `Potřebuji vodu.` | A0.2 | reuseOnly / optional dialogue reuse |
| `Chci tohle.` | A0.2 | reuseOnly / optional fallback phrase |
| `Nemám kartu.` | A0.2 | reuseOnly / payment problem branch |
| `Nemám peníze.` | A0.2 | reuseOnly / payment problem branch |
| `Tady.` | A0.3 | reuseOnly |
| `nebo` | A0.3 | reuseOnly as component, not new standalone card |
| `v osm` | A0.5 | reuseOnly if time appears |

### Duplicate conclusion

A0.7 дээр `tady`-г шинэ card болгохгүй. `Tady, nebo s sebou?` нь шинэ support/listening phrase болж болно, гэхдээ `Tady.`-г давхар шинэ card болгохгүй.

---

## 4. Ярианы logic 100% ойлгомжтой эсэх

Blueprint-ийн dialogue сайн боловч final mission-д “цэс асуух” байгаа мөртлөө dialogue дотор menu хүсэх turn дутуу байсан. Тиймээс A0.7 final dialogue-г ингэж засна.

### Refined final dialogue

| Step | Speaker | Czech | Монгол |
|---|---|---|---|
| 1 | Staff | `Dobrý den.` | Сайн байна уу. |
| 2 | Learner | `Dobrý den. Menu, prosím.` | Сайн байна уу. Цэс өгнө үү. |
| 3 | Staff | `Prosím. Co si dáte?` | За. Та юу авах вэ? |
| 4 | Learner | `Dám si kávu, prosím.` | Би кофе авъя. |
| 5 | Staff | `Tady, nebo s sebou?` | Энд хэрэглэх үү, авч явах уу? |
| 6 | Learner | `S sebou, prosím.` | Авч явъя, гуйя. |
| 7 | Learner | `Kolik to stojí?` | Энэ хэд вэ? |
| 8 | Staff | `Platíte kartou?` | Та картаар төлөх үү? |
| 9 | Learner | `Ano, platím kartou.` | Тийм, картаар төлнө. |
| 10 | Staff | `Děkuji.` | Баярлалаа. |
| 11 | Learner | `Děkuji. Na shledanou.` | Баярлалаа. Баяртай. |

### Dialogue conclusion

Одоо dialogue нь:

```text
мэндлэх → цэс хүсэх → захиалах → энд/авч явах → үнэ асуух → төлөх → хаах
```

гэсэн бүрэн логиктой болсон.

---

## 5. A0 түвшинд хэт хүнд phrase байгаа эсэх

| Phrase | A0 үнэлгээ | Шийдвэр |
|---|---|---|
| `jídelní lístek` | урт, formal | A0.7 prototype-д авахгүй, `menu` болгож хялбарчилна. |
| `Máte jídelní lístek?` | урт | авахгүй. `Menu, prosím.` ашиглана. |
| `Co si dáte?` | дүрмийн хувьд хүнд боловч staff phrase | learner production биш, listening phrase. |
| `Dám si polévku.` | object form байгаа ч chunk байдлаар боломжтой | шинэ card байж болно. |
| `Tady, nebo s sebou?` | ойлгох phrase | support/listening card. |
| `Platíte kartou?` | staff phrase | listening-only/support. |
| `Platím hotově.` | боломжтой | new active/payment phrase. |

### A0 difficulty conclusion

A0.7-д хэт хүнд зүйлсийг learner production-оос хасна. Staff-only phrase бол сонсох/сонгох хэлбэрээр л орно.

---

## 6. Ямар phrase шинэ card болох вэ?

A0.7 prototype-д санал болгож буй шинэ card list:

| Proposed role | Czech | Монгол | Speech type | Memory priority |
|---|---|---|---|---|
| new | `menu` | цэс | word | support |
| new | `Menu, prosím.` | Цэс өгнө үү. | phrase | active |
| new | `Dám si ...` | Би ... авъя. | phrase pattern | active |
| new | `Dám si kávu.` | Би кофе авъя. | sentence | active |
| new | `Dám si čaj.` | Би цай авъя. | sentence | support |
| new | `Dám si polévku.` | Би шөл авъя. | sentence | support |
| new | `s sebou` | авч явах | phrase | support |
| new | `S sebou, prosím.` | Авч явъя, гуйя. | phrase | active |
| new | `Kolik to stojí?` | Энэ хэд вэ? | sentence | active |
| new | `Platím kartou.` | Би картаар төлнө. | sentence | active |
| new | `Platím hotově.` | Би бэлнээр төлнө. | sentence | active |
| support/listening | `Tady, nebo s sebou?` | Энд хэрэглэх үү, авч явах уу? | sentence | support |
| support/listening | `Co si dáte?` | Та юу авах вэ? | sentence | support |
| support/listening | `Platíte kartou?` | Та картаар төлөх үү? | sentence | support |

### New card conclusion

A0.7 prototype-д 11 active/support learner card + 3 staff listening/support phrase байхад хангалттай. Хэт олон card хийхгүй.

---

## 7. Ямар phrase reuseOnly болох вэ?

| Czech | Монгол | A0.7 use |
|---|---|---|
| `Dobrý den.` | Сайн байна уу. | dialogue opening |
| `Prosím.` | Гуйя / за | polite chunk |
| `Děkuji.` | Баярлалаа. | closing |
| `Ano.` | Тийм. | payment answer |
| `Ne.` | Үгүй. | optional branch |
| `Na shledanou.` | Баяртай. | closing |
| `Tady.` | Энд. | component inside staff phrase, not new card |
| `Chci tohle.` | Би үүнийг хүсэж байна. | fallback ordering branch, not main new card |
| `Potřebuji vodu.` | Надад ус хэрэгтэй. | optional drink/help reuse |
| `Nemám kartu.` | Надад карт байхгүй. | payment problem branch |
| `Nemám peníze.` | Надад мөнгө байхгүй. | payment problem branch |

---

## A0.7 text lock decision

A0.7-г дараах байдлаар code/data руу оруулахад бэлдэнэ:

1. `jídelní lístek` → A0.7 prototype-д ашиглахгүй.
2. `Menu, prosím.` → main learner request.
3. `Co si dáte?`, `Tady, nebo s sebou?`, `Platíte kartou?` → staff listening/support phrase.
4. `Dám si ...`, `Dám si kávu.`, `S sebou, prosím.`, `Kolik to stojí?`, `Platím kartou.`, `Platím hotově.` → active production targets.
5. A0.7 final dialogue refined version-оор орно.
6. A0.8 дээр `Kolik to stojí?`, `Platím kartou.`, `Platím hotově.` phrase-ууд reuseOnly болох магадлалтай. Дэлгүүрийн A0.8 нь price/shop context дээр expansion хийнэ.

## Дараагийн алхам

A0.7 text lock v0.1-ийг баталсны дараа:

1. `src/data/czechWords.ts` дээр A0.7 card candidates нэмнэ.
2. A0.7 micro-lesson structure үүсгэнэ.
3. A0.7 dialogue scenario үүсгэнэ.
4. A0.7 exercise → memoryTarget mapping нэмнэ.
5. `audit:a0`, `audit:contract`, `audit:pronunciation`, `audit:srs` бүгд ногоон гарах ёстой.
