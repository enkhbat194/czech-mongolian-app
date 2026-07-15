# A0 Smart Review Guardrails

Энэ баримт нь Phase 4 — Smart Review Upgrade эхлэхийн өмнөх заавал барих шийдвэрүүд юм.

## 1. Шинэ memory store үүсгэхгүй

Smart Review нь одоо байгаа `useAppStore.progress.srsCards` дээр суурилна.

Одоо `SRSCard` дотор дараах талбарууд аль хэдийн байна:

- `wordId`
- `interval`
- `repetitions`
- `easeFactor`
- `nextReview`
- `lastReview`
- `quality`
- `exposures`
- `correctAttempts`
- `incorrectAttempts`

`usePhraseMemoryStore` нь тусдаа persisted storage биш. Энэ нь `useAppStore.progress.srsCards`-аас derived state үүсгэдэг wrapper байна.

## 2. Migration дүрэм

Smart Review-д шинэ талбар нэмэх бол:

- `SRSCard` interface дээр нэмнэ.
- `createReviewCard()` дээр default утга өгнө.
- `normalizeCard()` дээр `??` fallback заавал өгнө.
- `persist.merge()` дотор хуучин localStorage card бүр `normalizeCard()`-аар орж ирэх ёстой.

Ингэснээр хуучин хэрэглэгчийн localStorage эвдрэхгүй.

Нэмэх боломжтой талбарууд:

- `lastResponseTimeMs?: number`
- `lastMistakeType?: 'none' | 'recognition' | 'recall' | 'typing' | 'listening' | 'confusion'`
- `correctStreak?: number`
- `lastAnswerAt?: string`

## 3. SM-2 scheduling шийдвэр

Одоогийн `sm2()` логик:

- `quality >= 3` бол `repetitions` нэмэгдэнэ.
- `quality < 3` бол `repetitions = 0`, `interval = 0`, `nextReview = өнөөдөр` болно.
- `quality >= 3` боловч card due биш бол `updateSRSCard()` card-ыг дахин schedule хийхгүй, зөвхөн `quality`-г дээшлүүлнэ.

Smart Review-д энэ зан төлөвийг хадгална.

Шийдвэр:

- Буруу хариулт нь `quality < 3` гэж орно.
- Буруу хариулт авсан item өнөөдөр дахин due болно.
- Repair loop нь due scheduler-ийг давхар орлуулахгүй. Харин тухайн session дотор wrong item-ийг богино хугацаанд дахин асуух UI layer болно.
- Non-due mastered item-ийг зөв хариулсан үед `nextReview` хөдөлгөхгүй. Энэ нь SRS over-scheduling хийхээс хамгаална.

## 4. Mastery tier логик

Smart Review tier нь шинэ storage биш, одоо байгаа SRS evidence-оос derived байна.

Санал болгож буй tier:

- `NEW`: `exposures <= 1` эсвэл memory байхгүй
- `WEAK`: `incorrectAttempts > correctAttempts` эсвэл `repetitions <= 1`
- `FAMILIAR`: `correctAttempts >= 2`, `repetitions >= 2`
- `STRONG`: `correctAttempts >= 3`, `repetitions >= 3`, `quality >= 4`
- `MASTERED`: `correctAttempts >= 5`, `repetitions >= 4`, `quality >= 4`

Review direction:

- `WEAK`: Монгол утга → Чех сонголт
- `FAMILIAR`: Чех → Монгол сонголт
- `STRONG`: typing / order / listening recognition
- `MASTERED`: due биш үед schedule хөдөлгөхгүй, due үед high-quality review

## 5. Confusion pair distractor engine

Confusion pair хийхдээ `lessonDataContract.ts` дотор байгаа `normalizeCzechForContract()`-ийг дахин ашиглана.

Анхаарах зүйл:

- Diacritic арилгасан хэлбэрийг зөвхөн candidate хайхад ашиглана.
- Canonical Czech text-ийг өөрчлөхгүй.
- `být` / `byt`, `pomoc` / `Pomoc!` зэрэг онцгой ялгааг устгаж болохгүй.
- Contract/audit логикийн strict uniqueness дүрмийг зөрчихгүй.

Жишээ confusion pair:

- `Mám dítě.` ↔ `Mám děti.`
- `Jsem nový.` ↔ `Jsem nová.`
- `Je mi zima.` ↔ `Dnes je zima.`
- `Zavolejte prosím doktora.` ↔ `Zavolejte prosím sanitku.`

## 6. Correct answer position audit

Correct answer position audit-ыг random UI screenshot-ээр биш deterministic seed дээр шалгана.

Одоогийн кодонд:

- `A0CarryoverReview.tsx` дотор `stableShuffle()` байна.
- `A0LessonEngineV5.tsx` дотор `shuffle()` байна.
- `DialogueRunner` мөн сонголтуудын байрлалыг seed-ээр deterministic болгох ёстой.

Шийдвэр:

- Эхлээд shuffle helper-ийг refactor хийхгүй.
- TypeScript strict refactor орж ирэхээс өмнө duplication-д гар хүрэхгүй.
- Smart Review audit хийхдээ одоо байгаа seed behavior-ийг хүндэтгэнэ.
- Correct answer үргэлж `a` дээр үлдэхгүй эсэхийг deterministic script/test-ээр шалгана.

## 7. SRS audit fragile boundary

`scripts/audit-srs-integrity.mjs` нь `A0LessonEngineV5.tsx`-ийн эх кодыг текстээр хайж шалгадаг.

Одоогийн хайж буй boundary:

- `const finish = () => {`
- `const startSpeaking = () => {`

Smart Review refactor энэ function нэр эсвэл байрлалыг өөрчилбөл audit худал унах эрсдэлтэй.

Шийдвэр:

- `finish()` function-д Smart Review scheduling logic нэмж болохгүй.
- Lesson completion нь XP/minutes/streak/completion/unlock л хийх ёстой.
- Mastery evidence нь card/exercise/dialogue attempt дээр л бичигдэнэ.
- Хэрэв `finish()`-ийн boundary өөрчлөгдвөл `audit-srs-integrity.mjs`-ийг хамт шинэчилнэ.

## 8. Одоохондоо хийхгүй зүйл

Phase 4 implementation эхлэхдээ дараах зүйлд гар хүрэхгүй:

- `tsconfig.app.json`
- TypeScript strict mode
- `package-lock.json`
- dependency cleanup
- shared shuffle utility refactor
- unrelated UI redesign

Эдгээрийг тусдаа technical hardening batch дээр хийнэ.

## 9. Implementation дараалал

Зөв дараалал:

1. SRS metadata migration
2. Adaptive carryover/review target count
3. Confusion pair distractor candidate engine
4. Review mode by mastery tier
5. Wrong answer repair loop
6. Correct answer position deterministic audit
7. `audit-srs-integrity.mjs` hardening

Энэ дараалал нь repo-г эвдэхгүй, хуучин progress эвдэхгүй, мөн TypeScript strict mode дараа орж ирэхэд унахгүй байхаар зориулагдсан.
