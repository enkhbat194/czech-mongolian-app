# Чех–Монгол A0 апп — Цэвэрлэгээ ба үйлдвэрлэлийн roadmap

## Хатуу дүрэм

`main` руу build унасан, өгөгдөл зөрсөн, эсвэл iPhone smoke test хийгдээгүй код оруулахгүй.

## Phase 0 — Build gate

- [x] Orphan scene component-уудыг арилгах
- [x] `npm run check` команд нэмэх
- [x] GitHub Actions quality workflow нэмэх
- [x] A0 release data audit-г app entry дээр ажиллуулах
- [ ] CI dependency install болон quality workflow ногоон болгох

## Phase 1 — Dialogue engine

- [x] DOM selector, `MutationObserver`, `unknown` cast-тай wrapper-ийг устгах
- [x] Micro dialogue болон final dialogue-д нэг `DialogueRunner` ашиглах
- [x] Preview page-г shared renderer рүү шилжүүлэх
- [x] Browser TTS API-г нэг `dialogueAudio` module-д нэгтгэх
- [ ] Lesson core файлын нэршлийг `A0LessonEngineV5`-аас version-гүй нэр рүү шилжүүлэх
- [ ] Dialogue renderer-ийн state transition test нэмэх

## Phase 2 — SRS ба state

- [ ] `progress.srsCards` болон `phraseMemoryStore`-ийн давхар persistence-ийг нэг source of truth болгох
- [ ] Legacy state migration нэмэх
- [ ] Carryover болон Today Review сонголтын test нэмэх

## Phase 3 — Audio ба pronunciation

- [ ] A0.1–A0.6-ийн 102 картын audio manifest
- [ ] Dialogue, listening exercise audio manifest
- [ ] MP3 file existence audit
- [ ] Чех аудионы human QA
- [ ] Speech recognition-ийг pronunciation scoring-оос тусад нь нэрлэж хадгалах

## Phase 4 — Offline-first

- [ ] PWA manifest
- [ ] Service worker
- [ ] App shell, lesson data, MP3 cache policy
- [ ] Airplane-mode smoke test

## Phase 5 — Content expansion

- [ ] A0.1–A0.6 audit дууссан байх
- [ ] A0.7–A0.15-г нэг хичээлээр, нэг PR-ээр нэмэх
- [ ] Lesson metadata, data, audio, exercises, dialogues, memory coverage-г хамтад нь audit хийх

## Merge gate

```text
npm run lint
npm run build
npm run audio:dry
npm run check
GitHub Actions quality = green
iPhone smoke test = pass
A0 release audit = pass
```
