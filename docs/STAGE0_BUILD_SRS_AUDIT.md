# Stage 0 — A0.1–A0.6 Build-safe / SRS-safe Audit

## Зорилго

A0.7–A0.15-ийг их хэмжээгээр оруулахаас өмнө A0.1–A0.6-ийн техникийн суурь эвдрэлгүй эсэхийг түгжих.

## Хийгдсэн кодын засвар

### 1. Generic route

- `A0ReferenceLessonPage` нь `a0ReferenceCatalog`-оор хичээлээ авна.
- `a0ReferenceCatalog` нь canonical `a0ReferenceLessons` registry-г export хийдэг болсон.
- `a0ReferenceLessons` одоо A0.1–A0.6-г нэг registry-д агуулна.
- Course path болон home continue action нь бэлэн болсон A0 хичээлүүдийг generic `a0Lesson` route-аар нээхэд бэлэн.

### 2. Registry ба validation

A0.1–A0.6 lesson package бүр дараах contract-оор шалгагдана:

```text
lesson id / title
cards
micro lessons
micro dialogue
final dialogue
completion phrases
exercise ids
card id coverage
```

### 3. Exercise → SRS target mapping

A0.1–A0.6-ийн non-match exercise бүр exact phrase/card target ID-тэй болсон. Match exercise-үүд pair-ийн Czech text-ээр memory target руу resolve хийнэ.

Жишээ:

```text
A0.4
Jděte rovně.          → a0c0061
Kde je zastávka?      → a0c0063
Jeďte tramvají.       → a0c0067
Vystupte tady.        → a0c0069
Jdu na nádraží.       → a0c0071

A0.6
Pracuji tady.         → a0c0087
Začínáme v osm.       → a0c0090
Kdy končíme?          → a0c0091
Co mám dělat?         → a0c0096
Potřebuji pomoc.      → a0c0099
```

### 4. Memory priority

A0.4–A0.6-ийн `transport-pattern`, `time-pattern`, `meeting-pattern`, `job-pattern`, `job-question`, `job-survival` зэрэг бодит хэрэглээний phrase-үүд active review target болж орох боломжтой болсон.

### 5. Dialogue aliases

Dialogue дээр хэрэглэгддэг зарим богино бодит хариултыг memory target-тэй холбосон.

```text
Tramvaj, prosím.              → tramvaj
Autobus, prosím.              → autobus
Nerozumím. Potřebuji pomoc.   → Potřebuji pomoc.
Děkuji. Na shledanou.         → Děkuji.
```

## User smoke test

Компьютер дээр дараа нь дараахыг л шалгана.

```powershell
cd D:\github\czech-mongolian-app-a0-test
git pull
npm run build
npm run dev -- --host
```

Дэлгэц дээр шалгах богино жагсаалт:

1. A0.4, A0.5, A0.6 course path дээр нээгдэж байна уу?
2. A0.4 дээр нэг choice, нэг match, final dialogue ажиллаж байна уу?
3. A0.5 final dialogue уулзалт товлох нэг scenario шиг явж байна уу?
4. A0.6 final dialogue ажлын өдөр шиг логиктой явж байна уу?
5. Хичээл дуусахад next lesson unlock, progress, review эвдрэхгүй байна уу?

## Stage 0 гаралт

Stage 0 нь контентын бүх утгын төгс audit биш. Энэ шатны гаралт бол:

```text
A0.1–A0.6 route-safe
A0.1–A0.6 build-ready
A0.1–A0.6 SRS mapping-safe
A0.1–A0.6 dialogue-role-safe суурь
```

Үүний дараа A0.7–A0.10-ийг ижил package standard-аар оруулах боломжтой.
