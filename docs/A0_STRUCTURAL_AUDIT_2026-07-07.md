# A0.1–A0.6 structural audit

## Scope
- A0 lesson data, route flow, dialogue flow, review/SRS persistence, audio helper ownership, build and CI gates.
- This document is developer-only. It does not affect learner app startup.

## Confirmed findings

### 1. Lesson metadata drift — HIGH
`src/data/lessons.ts` has manually maintained `wordCount` values while executable lesson data derives cards from the canonical vocabulary bank. A0.1 and A0.5 were already found mismatched by release audit.

**Rule:** course-map card counts must be derived from canonical cards, not maintained as separate literals.

### 2. Runtime audit placement — FIXED
`a0ReleaseAudit` was imported by `App.tsx`, so a developer data mismatch blocked every learner screen. The import was removed.

**Rule:** audits run only from developer scripts and CI.

### 3. Route fragmentation — HIGH
`Layout.tsx` routes A0 lessons through mixed legacy page names:
- `a0FirstContact`
- `a0Needs`
- `a0Location`
- `a0Lesson`
- `flashcard` fallback for l004–l006

`A0DialoguePreviewPage` is still a production route.

**Target:** one learner route: `a0Lesson` with `currentLessonId`. Preview must be development-only or deleted after test coverage exists.

### 4. SRS double persistence — CRITICAL
Both stores persist overlapping review state:
- `useAppStore.progress.srsCards`
- `usePhraseMemoryStore.phrases`

`usePhraseMemoryStore` writes into `useAppStore` and then persists a parallel copy. This risks disagreement in review dates, repetitions, and accuracy history.

**Target:** `useAppStore.progress.srsCards` becomes the only persisted memory source. `usePhraseMemoryStore` is replaced by selectors/actions in the app store, then deleted after migration.

### 5. Legacy naming — MEDIUM
`A0LessonEngineV5` remains despite being the active engine. Version suffix implies an older parallel implementation.

**Target:** rename to `A0LessonEngine` after its adapter is removed.

### 6. Audio helper ownership — MEDIUM
Dialogue, carryover review, and today review have been moved toward one `dialogueAudio` helper. It should become feature-level `audio/speakCzech.ts`, because it is not dialogue-specific.

### 7. Quality gate — PARTIAL
CI passes build/lint/audio dry-run, but it does not yet execute a dedicated A0 audit script that emits every mismatch in one run.

## Cleanup commits

### Commit C1 — A0 data audit and derived metadata
- Create `scripts/audit-a0.mjs`.
- Validate all ready lesson ids, canonical card counts, lesson card ids, duplicate normalised Czech, exercises, dialogue steps, and memory mappings.
- Print every failure before exiting non-zero.
- Remove manually maintained ready-lesson `wordCount` literals or generate them from canonical data.
- Add `npm run audit:a0`.
- Add it to CI quality gate.

### Commit C2 — route consolidation
- Route every executable A0 lesson through `currentPage: 'a0Lesson'` plus `currentLessonId`.
- Remove `a0FirstContact`, `a0Needs`, `a0Location`, and `flashcard` A0 fallback branches.
- Remove or dev-gate `a0DialoguePreview`.

### Commit C3 — engine naming and feature boundaries
- Rename `A0LessonEngineV5.tsx` to `A0LessonEngine.tsx`.
- Delete adapter file.
- Move `DialogueRunner` and speech helper into feature-owned directories.
- Remove unused imports and legacy names after dependency verification.

### Commit C4 — SRS single-source migration
- Extend `SRSCard` with exposure and attempt counts where needed.
- Add app-store selectors/actions for carryover and today review.
- Read old phrase-memory storage once and merge missing fields into `srsCards`.
- Stop persisting phrase memory.
- Switch components to app-store selectors.
- Delete `usePhraseMemoryStore.ts` only after migration and smoke test.

### Commit C5 — offline and audio production
- Native MP3 manifest and file audit.
- PWA/service-worker and offline test.

## Merge blockers
- `npm run check` green.
- `npm run audit:a0` green.
- No learner startup audit.
- One SRS persistence source.
- One A0 learner route.
- iPhone end-to-end smoke test of A0.1 and unlock flow into A0.2.
