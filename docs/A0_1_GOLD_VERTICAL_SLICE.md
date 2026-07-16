# A0.1 Gold Vertical Slice — Implementation Blueprint

Огноо: 2026-07-17

## 1. Зорилго

A0.1-ийг зөвхөн ажилладаг хичээл биш, бүх A0 түвшний visual, audio, interaction, animation, speaking quality bar-ийг тогтоох жишиг хичээл болгоно.

Энэ багц дууссаны дараа хэрэглэгч:

- бодит нөхцөлд орсон мэт scene харна
- Чех хэллэгийг тогтвортой MP3-аар сонсоно
- утгыг Монгол хэлээр ойлгоно
- чангаар давтаж хэлнэ
- нөхцөлд зөв хариулна
- богино role-play дуусгана
- сурах явцаа алдахгүй

## 2. Scope

Энэ багц зөвхөн A0.1 болон дахин ашиглагдах суурь component-уудыг хамарна.

### Оруулах зүйл

- A0.1 scene intro
- нэг үндсэн background illustration
- 2 dialogue character
- expression/pose state
- card reveal motion
- audio manifest ба MP3 playback
- browser TTS fallback
- speech permission, recording state, transcript result
- choice, listening, speaking, dialogue урсгал
- micro reward ба lesson completion motion
- reduced-motion fallback
- iPhone safe-area ба responsive layout
- asset audit, audio audit, unit test

### Оруулахгүй зүйл

- A0.2–A0.15-ийн бүх зураг
- full AI tutor
- backend account
- real-time 3D animation
- A1 контент
- бүх хуучин UI-г нэг дор redesign хийх

## 3. A0.1 learner experience

### Stage 0 — Mission intro

Дэлгэц:

- Чех орчны нэг scene
- хэрэглэгч хаана, хэнтэй ярьж байгааг Монгол хэлээр нэг өгүүлбэрээр тайлбарлана
- гол зорилго: “Мэндэлж, өөрийгөө танилцуулж, ойлгоогүй үедээ удаан хэлэхийг хүснэ.”
- scene дотор үндсэн character idle animation-тай байна

CTA:

- `Эхлэх`

### Stage 1 — First listen

- character Чех өгүүлбэр хэлнэ
- MP3 тоглоход speaker pulse/wave animation гарна
- эхний сонсгол дээр Монгол орчуулга шууд харагдахгүй
- `Дахин сонсох` ба `Утгыг харах` байна

### Stage 2 — Phrase focus

Нэг card дээр:

- Czech text
- Mongolian meaning
- optional pronunciation helper
- replay audio
- 1 жижиг usage note

Card солигдоход horizontal slide + fade ашиглана.

### Stage 3 — Repeat aloud

- reference MP3
- mic state: idle → listening → processing → result
- transcript зөв танигдсан эсэхийг харуулна
- “танигдсан” ба “дуудлага төгс” гэдгийг андуурч оноо өгөхгүй
- speech service unavailable үед хичээл тасрахгүй, self-check fallback өгнө

### Stage 4 — Quick response

- scene character нэг бодит асуулт хэлнэ
- хэрэглэгч 3–4 хариултаас сонгоно
- correct answer position session бүр өөрчлөгдөнө
- буруу хариултад зөв хэллэгийг MP3-аар тоглуулж, дараа session queue-д дахин оруулна

### Stage 5 — Micro dialogue

- character turn бүр scene-ийн expression/pose өөрчлөгдөнө
- хэрэглэгчийн turn дээр сонгох эсвэл хэлэх үйлдэл гарна
- dialogue progress харагдана
- тусламж хүсвэл Монгол hint гарна

### Stage 6 — Mission complete

- богино confetti/particle animation
- эзэмшсэн 3–5 хэллэг
- mastery/SRS activation
- дараагийн lesson unlock
- `Дахин хийх`, `Хичээлийн зам`, `Өнөөдөр давтах` action

## 4. Visual asset contract

### Scene asset

```ts
interface LessonSceneAsset {
  sceneId: string;
  backgroundSrc: string;
  foregroundSrc?: string;
  altMn: string;
  focalPoint: { x: number; y: number };
}
```

### Character asset

```ts
interface LessonCharacterAsset {
  characterId: string;
  name?: string;
  poses: {
    idle: string;
    speaking: string;
    listening: string;
    success?: string;
    concerned?: string;
  };
  altMn: string;
}
```

### Animation policy

- Framer Motion ашиглана
- CSS/transform/opacity төвтэй байна
- нэг transition 180–450 ms
- decorative loop нь low-power байна
- `prefers-reduced-motion` үед хөдөлгөөнийг багасгана
- animation нь хариулт өгөхийг саатуулахгүй

## 5. Audio contract

```ts
interface AudioAssetEntry {
  audioId: string;
  textCs: string;
  speakerId: string;
  source: 'azure-tts' | 'elevenlabs' | 'native-recording';
  licenseStatus: 'approved' | 'pending';
  file: string;
  durationMs?: number;
  checksum?: string;
}
```

Playback priority:

1. local MP3
2. cached MP3
3. browser Czech TTS fallback
4. visual error state without lesson crash

A0.1 дээр сурагчид сонсох бүх Czech мөр manifest-д байна.

## 6. Audio production workflow

1. A0.1-ийн бүх unique Czech text-ийг canonical data-аас script-ээр гаргана.
2. Text duplicate-ийг normalized биш, canonical exact text-аар шалгана.
3. Azure Czech neural voice-аар MP3 batch generate хийнэ.
4. Loudness, silence, filename, duration validate хийнэ.
5. Native Czech reviewer дараах flag өгнө:
   - KEEP
   - SPEED
   - STRESS
   - TEXT_REPAIR
   - RE-RECORD
6. Approved manifest-ийг app runtime-д холбоно.

## 7. Reusable component plan

Шинээр эсвэл одоогийн component-оос extract хийх боломжтой хэсэг:

- `MissionScene`
- `AnimatedCharacter`
- `DialogueBubble`
- `AudioPlaybackController`
- `SpeakingAttemptPanel`
- `LessonStageHeader`
- `MotionFeedback`
- `MissionCompletePanel`

Эдгээрийг A0.1 дээр батлагдахаас өмнө бүх app руу тараахгүй.

## 8. Data changes

A0 lesson config-д optional presentation metadata нэмэх боломжтой:

```ts
interface A0LessonPresentation {
  missionTitleMn: string;
  missionBriefMn: string;
  sceneId: string;
  primaryCharacterId: string;
  secondaryCharacterId?: string;
  introAudioId?: string;
}
```

Хуучин lesson data-г эвдэхгүй optional field байна.

## 9. Technical batch sequence

### Batch 1 — Presentation contract

- scene/character/audio type
- A0.1 presentation metadata
- asset resolver
- unit tests

Definition of done:

- хуучин lesson config compile хэвээр
- missing asset fallback test-тэй
- `npm run check` ногоон

### Batch 2 — Scene shell

- mission intro
- scene background
- dialogue character states
- responsive/safe-area
- reduced motion

Definition of done:

- iPhone portrait дээр overflow байхгүй
- scene asset байхгүй үед lesson ажиллана

### Batch 3 — MP3 pipeline

- A0.1 text extraction
- audio manifest
- Azure generation
- playback resolver
- browser TTS fallback
- audit

Definition of done:

- A0.1 learner-facing Czech line бүр approved эсвэл pending manifest entry-тэй
- missing local MP3 audit production build-ийг унагаана

### Batch 4 — Speaking experience

- permission state
- transcript normalization
- real result UI
- fake/random score байхгүй
- unavailable fallback

Definition of done:

- iPhone supported path болон unsupported path хоёулаа lesson-ийг таслахгүй

### Batch 5 — Gold polish

- transition timing
- feedback motion
- micro reward
- completion scene
- accessibility labels
- final smoke test

Definition of done:

- A0.1 эхнээс төгсгөл хүртэл iPhone дээр дамжина
- `npm run check` ногоон
- visual/audio QA checklist complete

## 10. Acceptance checklist

- [ ] Mission эхлэхэд бодит нөхцөл зурагтай харагдана
- [ ] Хэрэглэгч 60 секундийн дотор Czech phrase чангаар хэлнэ
- [ ] Czech learner-facing мөр бүр MP3 mapping-тай
- [ ] Browser TTS зөвхөн fallback
- [ ] Character state dialogue turn-тэй нийцнэ
- [ ] Animation нь хэт олон биш, мэдээллийг дэмжинэ
- [ ] Буруу хариулт repair queue-д орно
- [ ] Progress/SRS хуучин хэрэглэгч дээр эвдрэхгүй
- [ ] Reduced motion ажиллана
- [ ] iPhone safe-area/overflow асуудалгүй
- [ ] Offline cached lesson ажиллана
- [ ] Full quality gate ногоон

## 11. Дараагийн шийдвэр

A0.1 gold slice хэрэглэгчийн баталгааг авсны дараа:

- visual style KEEP/REPAIR
- character style KEEP/REPAIR
- animation density KEEP/REDUCE
- lesson pace KEEP/SHORTEN
- audio voice KEEP/CHANGE

гэсэн таван шийдвэр гаргана.

Дараа нь A0.2–A0.5 дээр rollout хийнэ.
