# A0.1–A0.3 Reference Audit v2

## Audit scope

Энэ audit нь A0.1, A0.2, A0.3 дээр дараах зүйлийг шалгаж, боломжтойг нь код болон lesson data дээр зассан.

1. Карт → дасгал → богино яриа → reward → төгсгөлийн яриа → review урсгал
2. Шинэ хэллэг дараагийн микро хэсгээс өмнө staff text, option, distractor хэлбэрээр орж байгаа эсэх
3. Exercise, match, dialogue-ийн phrase memory mapping
4. SRS оноолт нэг оролдлогод ганц удаа бичигдэж байгаа эсэх
5. Lesson completion нь бодит recall гэж андуурагдаж байгаа эсэх
6. Daily review нь сураагүй дараагийн хичээлийн phrase-ийг option болгож гаргаж байгаа эсэх
7. Lesson data contract, card coverage, dialogue contract

## Reference lesson matrix

| Хичээл | Бодит чадвар | Карт | Микро | Дасгал | Богино яриа | Төгсгөлийн яриа |
|---|---|---:|---:|---:|---:|---:|
| A0.1 | Мэндлэх, нэрээ хэлэх, ойлгохгүй үед удаашруулах хүсэлт тавих | 25 | 3 | 15 | 9 алхам | 6 алхам |
| A0.2 | Тусламж, ус, утас, хоол хүсэх; мөнгө/карт байхгүйгээ хэлэх | 22 | 3 | 15 | 9 алхам | 7 алхам |
| A0.3 | Хэрэгтэй газар асууж, `энд / тэнд` гэсэн хариуг тодруулах | 13 | 3 | 12 | 8 алхам | 7 алхам |

Эдгээр тоо `a0ReferenceLessons.ts` дахь `auditA0Lesson()`-оор тооцогдоно.

## Засагдсан зүйл

### 1. Урьдчилж гардаг хэллэг

A0.1–A0.3-ийн micro dialogue, final dialogue, exercise option, coverage option-уудыг дахин шалгав.

- A0.1-ийн эхний микро хэсгээс `Jak se máte?`, `Dobře`, `Jsem z Mongolska.`, `Nerozumím.` зэрэг дараагийн микро хэллэгүүдийг хасав.
- A0.2-ийн эхний хоёр микро хэсгээс `Nemám …`, `Co potřebujete?`, `Chci kartu.`, `Potřebuji kartu.` зэрэг дараа заах хэллэгийг distractor болгон гаргахыг зогсоов.
- A0.3-ийн дэлгүүр/эмийн сангийн хэсгээс `Potřebuji lékárnu.` гэх заагаагүй хэлбэрийг хасав.
- Staff prompt болон option дээр боломжтой газарт зөвхөн тухайн микро эсвэл өмнөх хичээлд үзсэн хэллэгийг ашиглав.

Энэ нь сурагч шинэ үгийг “буруу option” хэлбэрээр урьдчилж хараад, дараа нь жинхэнэ хичээл дээр дахин таарах асуудлыг бууруулна.

### 2. Memory mapping

- 38 non-match exercise бүгд `a0ExerciseMemoryMap.ts` дээр тодорхой memory target-той.
- 4 match exercise pair бүр Чех текстээрээ memory target руу resolve хийгдэнэ.
- `defineA0Lesson()` одоо non-match exercise бүр mapping-тэй, match pair бүр resolve хийх target-тэй эсэхийг шалгана.
- `Potřebuji pomoc.` болон `Potřebuji pomoc, prosím.` хоёр phrase target-ийн alias давхардлыг салгав. Ингэснээр эхний тусламжийн phrase болон дараа заах эелдэг хувилбар тусдаа SRS target болно.

### 3. SRS ба review queue

- `recordAttempt()` phrase memory болон card SRS-д нэг удаа зэрэг бичдэг болсон.
- Carryover review болон Today Review-ийн давхар `updateSRSCard()` дуудлагыг авсан.
- Lesson completion үед engine бүх картыг quality 4 гэж оноодог legacy үйлдлийг bridge хамгаалалтаар блоклов. Хичээл дууссан нь “танилцсан” гэсэн үг; зөв recall хийсэн гэсэн үг биш.
- Daily review option pool нь одоо тухайн target-ийн lesson болон түүнээс өмнөх lesson-оор хязгаарлагдана. A0.1 review дээр A0.2/A0.3-ын үг option болж гарахгүй.
- Due queue нь зөвхөн `nextReview <= now` болсон phrase-уудыг авна.

## Structural contract

`defineA0Lesson()` одоо дараах алдааг runtime-д блоклоно:

- картгүй lesson
- микрогүй lesson
- картын id буруу эсвэл давхардсан байх
- карт нэгээс олон микро дээр давтагдах, эсвэл огт орохгүй байх
- картын instruction дутуу байх
- micro dialogue дутуу эсвэл orphan dialogue байх
- давхардсан exercise id / dialogue step id
- зөв option байхгүй, duplicate option id
- хоосон эсвэл duplicate match pair
- non-match exercise memory target-гүй байх
- match Czech text memory target руу resolve хийхгүй байх

## Бодит хэрэглэгчийн шалгалтаар батлах зүйл

Кодын static audit нь logic болон data contract-ийг шалгана. Дараах нь localhost дээр заавал бодитоор харах шалгалт хэвээр байна:

- TTS дуусах хүртэл dialogue option disabled хэвээр байгаа эсэх
- Буруу хариулсны дараа retry нь зөв phrase дээр SRS-г ганц удаа шинэчилж байгаа эсэх
- A0.1 → A0.2, A0.2 → A0.3 carryover review дээр зөвхөн өмнөх phrase-ууд гарч байгаа эсэх
- iPhone дээр match, reward, completion, review UI тасралтгүй ажиллаж байгаа эсэх

## Үлдсэн аудитын өр

### Micro density

A0.1-ийн микро хэсгүүд 7 / 8 / 10 card, A0.2-ийнх 7 / 8 / 7 card байна. Эдгээрийн дотор support word болон бүтэн phrase холилдсон ч strict “3–5 core phrase” зарчмаас их байна.

Одоогийн audit нь correctness, SRS, pre-teach leak-ийг эхэлж түгжсэн. Дараагийн content refactor дээр A0.1, A0.2-ийг 5–6 жижиг микро хэсэг болгон задлах эсэхийг тусад нь шийднэ. Энэ нь UI урсгал, dialogue, completion time-г өөрчилдөг учраас silent өөрчлөлт хийгээгүй.

### Техникийн үлдэгдэл

- Native Czech audio asset байхгүй; browser TTS fallback ашиглаж байна.
- Browser speech recognition нь transcript; жинхэнэ pronunciation assessment биш.
- SRS нь local device storage дээр; cloud sync, backup, олон төхөөрөмжийн merge байхгүй.
- `A0LessonEngineV5` дотор legacy compatibility adapter үлдсэн. Reference lesson data нь inline match болон shared schema ашиглаж байгаа ч renderer type cleanup-ийг A0.4-өөс өмнө тусад нь хийж болно.
