# A0.1–A0.6 — Dialogue + Vocabulary Integrity Audit

## Хатуу дүрэм

```text
Нэг Czech phrase = зөвхөн нэг lesson дээр шинэ card.
Дараагийн lesson = шинэ card биш, review/dialogue reuse.
```

## Canonical vocabulary source

A0.1–A0.6-ийн бүх шинэ card одоо зөвхөн:

```text
src/data/czechWords.ts
```

дээр тодорхойлогдоно.

```text
src/data/a0DirectionsWords.ts
src/data/a0TimeWords.ts
src/data/a0JobWords.ts
```

нь тусдаа хуулбар vocabulary хадгалахгүй; canonical bank-аас lessonId-аар шүүж авна.

## Duplicate card fix

Өмнө нь яг ижил шинэ card хоёр lesson дээр байсан:

```text
A0.2  Potřebuji pomoc.
A0.6  Potřebuji pomoc.
```

A0.6-ийн duplicate шинэ card-г устгаж, оронд нь workplace-specific шинэ phrase оруулсан:

```text
Ukažte mi, prosím. = Надад үзүүлж өгнө үү.
```

A0.2-ийн `Potřebuji pomoc.` нь цаашид A0.6 dialogue дээр review/reuse байдлаар л орж болно; A0.6 дээр дахин шинэ card биш.

## Dialogue-д шаардлагатайгаар нэмсэн шинэ cards

| Lesson | Czech | Монгол | Яагаад хэрэгтэй вэ |
|---|---|---|---|
| A0.1 | `Mluvím moc rychle?` | Би хэт хурдан ярьж байна уу? | Суралцагчийн “удаан ярьж өгнө үү” хариултад утгаараа зөв staff turn үүсгэнэ. |
| A0.5 | `v pět` | таван цагт | A0.6-ийн тарах цагийг A0.5 дээр урьдчилж сургана. |
| A0.5 | `ve dvanáct` | арван хоёр цагт | A0.6-ийн завсарлагын цагийг A0.5 дээр урьдчилж сургана. |
| A0.6 | `Nový úkol.` | Шинэ даалгавар. | Ажлын даалгаврын яриаг бодит шалтгаантай болгоно. |
| A0.6 | `Ukážu vám.` | Би танд үзүүлж өгнө. | Ахлагчийн бодит хариуг ойлгох card. |
| A0.6 | `Ukažte mi, prosím.` | Надад үзүүлж өгнө үү. | Ойлгохгүй үед ажлын байран дээр хэрэглэх learner response. |

Шинэ card бүр тухайн lesson-ийн:

```text
cardIds
instruction
exercise
exercise → SRS mapping
memory target
```

дотор орсон.

## Dialogue mission audit

| Lesson | Final mission |
|---|---|
| A0.1 | Ресепшнд өөрийгөө танилцуулж, хэт хурдан яриаг удаашруулах хүсэлт тавих |
| A0.2 | Ресепшнд утас, ус, хоол хүсэж, талархаад яриаг дуусгах |
| A0.3 | Худалдааны төвийн мэдээллийн ширээнээс эмийн сан болон ариун цэврийн өрөөг асуух |
| A0.4 | Трамвайн буудал асууж, галт тэрэгний буудал руу зөв явж, зөв газраа буух |
| A0.5 | Ленатай маргааш оройн уулзалтаа найман цагт тохирох |
| A0.6 | Ажлын эхний өдөр: эхлэх/завсарлага/тарах цагийг тодруулж, шинэ даалгаврын заавар авах |

## Choice order

Dialogue choice-ийн `correctId` өөрчлөгдөхгүй. Харин `A0LessonEngine` тухайн хичээл эхлэх бүрт зөв хариулт дандаа 1-р мөрөнд байхгүйн тулд сонголтуудын харагдах байрлалыг shuffle хийнэ.

## Build-time duplicate guard

```text
src/data/a0VocabularyAudit.ts
```

нь normalized Czech phrase давхар шинэ card болсон эсэхийг шалгаад error гаргана. Иймээс ирээдүйд нэг хэллэгийг өөр lesson дээр дахин шинэ card болгон оруулахад build/runtime audit зогсооно.
