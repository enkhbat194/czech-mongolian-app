# A0 High-Risk Triage Proposals

Огноо: 2026-07-16 · Head: `fccb929` · CI: Run #489 success · Статус: **САНАЛ — эцсийн шийдвэр хэрэглэгчийнх**

Эх сурвалж: `A0_MASTER_CONTENT_AUDIT.md` (59 автомат дохио), `PROJECT_SLOWDOWN_AND_RECOVERY_PLAN.md`, practice хуудсуудын код, l001/l012 гар үзлэг.

---

## 1. Executive summary

- **Нийт high-risk item: 24** (нэгтгэсэн; 59 автомат дохионы 58 нь нэг ангилалд багтсан)
- **Top 5 эрсдэл:**
  1. **Practice хуудсууд SRS нотолгоог бохирдуулдаг** — 8 хуудас санамсаргүй 10 үгийг бүх сангаас сугалж, сурагчийн ХАРААГҮЙ карт дээр ч `updateSRSCard(5/1)` бичдэг → mastery tier худал өгөгдөл дээр тогтоно
  2. **"Eba" 10 файлд, ~29 газар hardcode хийгдсэн** — сурагч өөрийн нэрний оронд Eba гэж бичиж/эрэмбэлж сурдаг (`a0-1-c-2` order дасгал: токенууд `['se','Jmenuji','Eba.']`); гэтэл апп-д `userName` аль хэдийн байдаг
  3. **Gender-хос ижил Монгол орчуулгатай** (sám/sama, nový/nová хоёул "Би энд ганцаараа…"/"Би шинэ…") → Монгол → Чех сонголтод **хоёр зөв хариулт зэрэг гарч болзошгүй** (confusion engine нь эдгээрийг санаатай ойртуулдаг тул магадлал өндөр!)
  4. **Диалогийн 87% зөв хариулт өгөгдөлд эхэндээ** (295/339 алхам) — runtime shuffle-д л найдсан далд бомб
  5. **SpeakingPage-ийн 8 hardcode хэллэгийн зарим нь A0 канонд байхгүй/зөрчилтэй** — `Jak se máš?` (энгийн хэлбэр — А0 нь албан ёсны хэлбэр заадаг), `Kde je záchod?` (канонд `Kde je toaleta?`)
- **Санал болгох эхний repair batch:** №3-ийн code-талын хамгаалалт (gender-хосыг Монгол prompt-той сонголтод distractor болгохгүй) — 2 файл, механик, контент шийдвэр шаардахгүй.

## 2. High-risk proposal table

| Priority | Lesson/Page | Item type | Current issue | Risk | Proposed decision | Repair direction | Suggested owner |
|---|---|---|---|---|---|---|---|
| P0 | Бүх practice page (8) | engine холболт | Санамсаргүй үг бүх сангаас; үзээгүй картад SRS бичилт | disconnected practice | REPAIR | introduced/due memory target-аас pool татах; үзээгүй картад SRS бичихгүй | Claude mechanical fix |
| P0 | l012 + review engine | дасгалын механик | sám/sama, nový/nová ижил Монгол орчуулгатай тул mn→cz сонголтод 2 зөв хариулт гарч болзошгүй | weak distractor, gender mismatch | REPAIR | Confusion/filler сонголтод "Монгол текст нь давхцвал хасах" дүрэм | Claude mechanical fix |
| P0 | 10 файл (l001, l012, final mission, dialogues, czechWords…) | контент | "Eba" 29 газар hardcode | hardcoded name | REPLACE | `{userName}` placeholder + render үед орлуулах; order/match дасгалд нэрийг токен болгохоо болих | GPT decision (загвар) + Claude mechanical fix (орлуулалт) |
| P1 | 58 диалог (бүх хичээл) | өгөгдлийн хэвшил | correctId 87% 'a' | scenario/authoring bias | REPAIR | Data-д байрлал холих ЭСВЭЛ "runtime shuffle заавал" дүрмийг audit-д тогтмолжуулж өгөгдлийг орхих — шийдвэр хэрэгтэй | GPT decision |
| P1 | SpeakingPage | контент | 8 hardcode хэллэг, 2 нь канон зөрчилтэй (Jak se máš? / Kde je záchod?) | scenario mismatch, disconnected practice | REPLACE | Memory target-аас өдрийн due хэллэг татдаг болгох | GPT decision + Claude fix |
| P1 | l001 `a0-1-c-1` | дасгал | "Jmenuji se Eba. ямар утгатай вэ?" — сонголтод "Миний нэр Эба." шууд харагдана | too easy, hardcoded name | REPAIR | Nэр солигдоход утга таах болгож үлдээх эсвэл нэгтгэх | GPT decision |
| P1 | l001 `a0-1-d-2` | дасгал | "Аль асуултыг сонсож магадгүй вэ?" — сонголтод өөрийн хэлдэг Jmenuji se… холилдсон, logic сул | low learning value | REPAIR | Асуулт/хариултын дүрийг тодруулах | GPT decision |
| P1 | Practice 8 хуудас хоорондоо | бүтэц | WordQuiz/ReverseQuiz/Writing/Dictation/FillBlank санамсаргүй ижил механик давхардана | duplicate exercise idea | PROFILE_LATER | Step 2-т нэгтгэх шийдвэр (аль нь үлдэх) | GPT decision |
| P2 | l012 диалогууд `a12d-d1/d2`, `a12final-d7` | диалог | Хүйс заасан prompt ("Эрэгтэй хүн бол…") — сурагчийн хүйс мэдэхгүй тул хоёуланг нь бүгдэд асуудаг | gender mismatch | PROFILE_LATER | genderForm profile гарсны дараа шүүх | GPT decision |
| P2 | l001 (9 WEAK), l012 (6 WEAK) | reuse | Reuse audit-ийн WEAK item-ууд давталт хүрэлцээгүй | low learning value | REPAIR | Phase 2 sentence expansion-д хамруулах | GPT decision |
| P2 | Final Mission `a0-final-listen-*` | дасгал | Сонсох асуултууд browser TTS-д тулгуурладаг — татаж авсан үед чимээгүй унах вий | scenario mismatch | PROFILE_LATER | Audio phase-д MP3-тэй болмогц эргэж харах | User smoke test |
| P2 | czechWords дахь ipa хоосон талбарууд (l012 г.м) | өгөгдөл | Сүүлд нэмэгдсэн үгсэд ipa:'' | low learning value | PROFILE_LATER | Pronunciation phase-д бөглөх | GPT decision |

*Тайлбар: 59 автомат дохионы 58 нь P1-ийн "correctId 87%" нэг мөрөнд нэгтгэгдсэн; 1 нь Eba (P0).*

## 3. Practice page triage

| Хуудас | Санал | Шалтгаан |
|---|---|---|
| WordQuizPage | REPAIR | Pool-ийг memory target-тай холбох; үзээгүй картад SRS бичихгүй |
| ReverseQuizPage | REPAIR | Мөн + Монгол-давхцах distractor хамгаалалт |
| WritingPage | REPAIR | Мөн pool асуудал |
| DictationPage | REPAIR | Мөн; MP3 ирэхээр илүү утгатай болно |
| FillBlankPage | REPAIR | Мөн |
| SentenceBuilderPage | REPAIR | Мөн; example-гүй үгэнд unbrauchbar тул шүүлт хэрэгтэй |
| SpeakingPage | REPLACE | Hardcode 8 хэллэг, 2 нь канон зөрчилтэй |
| ListeningPage | REPAIR | Мөн pool асуудал |
| A0FinalMissionPage | KEEP | Data-driven, шинэ, зөв загвар |

## 4. Learner profile candidates (хожим хэрэгжүүлэх)

| Талбар | Хамрах item |
|---|---|
| `{userName}` | "Jmenuji se Eba." бүх 29 тохиолдол (a0FirstContact 5, a0Dialogues 7, a0CoreRealityDialogues 7, czechWords 3, a0MemoryPlan 1, a0FinalMission 1, a0FirstWeek/Home/Phone/PeopleDialogues 5) |
| `genderForm` | a0c0158/a0c0159 (sám/sama), Jsem nový/nová, l012-ийн хүйс заасан 3 диалог алхам, unavený-төрлийн ирээдүйн хэллэгүүд |
| `age` | Одоогоор шаардлагатай item илрээгүй — A1-д нас асуух хичээлтэй хамт |

## 5. Recommended next batch (ганц Claude ажил)

**"Ambiguous distractor guard"** — 2-3 файл, код-safe, контент шийдвэр шаардахгүй:

1. `src/data/a0ConfusionPairs.ts`: distractor сонголтод zорилтот хэллэгтэй **ижил Монгол орчуулгатай** candidate-ыг recognition горимд хасах logic
2. `tests/unit/confusionPairs.test.ts`: sám/sama кейсийн regression тест
3. (шаардлагатай бол) TodayReview/Carryover-ийн filler мөн адил шүүх

Үр дүн: "хоёр зөв хариулттай асуулт" гарах замыг бүрэн хаана. Дараагийн batch: practice pool unification (Step 2-ийн эхлэл).
