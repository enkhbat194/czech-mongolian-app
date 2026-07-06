import { a0FirstContactCards, a0FirstContactMicroLessons, getA0FirstContactCard } from './a0FirstContact';
import { a0NeedsCards, a0NeedsMicroLessons, getA0NeedsCard } from './a0Needs';
import { a0LocationCards, a0LocationMicroLessons, getA0LocationCard } from './a0Location';
import { a0FirstContactCoveredFinalDialogue, a0FirstContactCoveredMicroDialogues, a0NeedsCoveredFinalDialogue, a0NeedsCoveredMicroDialogues } from './a0CoverageDialogues';
import { a0LocationFinalDialogue, a0LocationMicroDialogues } from './a0LocationDialogues';
import { defineA0Lesson, type A0LessonDefinition } from './a0LessonSchema';

export const a0ReferenceLessons: Record<'l001' | 'l002' | 'l003', A0LessonDefinition> = {
  l001: defineA0Lesson({
    lessonId: 'l001',
    titleMn: 'A0.1 — Анхны харилцаа',
    durationMinutes: 34,
    cards: a0FirstContactCards,
    microLessons: a0FirstContactMicroLessons,
    getCard: getA0FirstContactCard,
    microDialogues: a0FirstContactCoveredMicroDialogues,
    finalDialogue: a0FirstContactCoveredFinalDialogue,
    xpReward: 150,
    completionIcon: '🏆',
    completionSummaryMn: 'Та албан ёсоор мэндэлж, нэрээ болон хаанаас ирснээ хэлж, ойлгохгүй үед яриаг удаашруулах хүсэлт тавьж чадна.',
    completionPhrases: ['Dobrý den.', 'Jmenuji se …', 'Jsem z Mongolska.', 'Nerozumím. Mluvte prosím pomalu.', 'Na shledanou.'],
  }),
  l002: defineA0Lesson({
    lessonId: 'l002',
    titleMn: 'A0.2 — Надад хэрэгтэй',
    durationMinutes: 32,
    cards: a0NeedsCards,
    microLessons: a0NeedsMicroLessons,
    getCard: getA0NeedsCard,
    microDialogues: a0NeedsCoveredMicroDialogues,
    finalDialogue: a0NeedsCoveredFinalDialogue,
    xpReward: 160,
    completionIcon: '🧾',
    completionSummaryMn: 'Та одоо тусламж, ус, утас хэрэгтэйгээ хэлж, хүсэлтээ илэрхийлж, мөнгө эсвэл карт байхгүйгээ тайлбарлаж чадна.',
    completionPhrases: ['Potřebuji pomoc.', 'Potřebuji vodu.', 'Chci něco k jídlu.', 'Nemám kartu.', 'Potřebuji pomoc, prosím.'],
  }),
  l003: defineA0Lesson({
    lessonId: 'l003',
    titleMn: 'A0.3 — Хаана байна?',
    durationMinutes: 28,
    cards: a0LocationCards,
    microLessons: a0LocationMicroLessons,
    getCard: getA0LocationCard,
    microDialogues: a0LocationMicroDialogues,
    finalDialogue: a0LocationFinalDialogue,
    xpReward: 170,
    completionIcon: '📍',
    completionSummaryMn: 'Та танихгүй газарт ариун цэврийн өрөө, дэлгүүр, эмийн сан, галт тэрэгний буудал хаана байгааг асууж, “энд / тэнд” гэсэн хариуг тодруулж чадна.',
    completionPhrases: ['Prosím, kde je toaleta?', 'Kde je obchod?', 'Kde je lékárna?', 'Kde je nádraží?', 'Tady, nebo tam?'],
  }),
};