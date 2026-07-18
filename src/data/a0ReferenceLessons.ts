import { a0FirstContactCards, a0FirstContactMicroLessons, getA0FirstContactCard } from './a0FirstContact';
import { a0NeedsCards, a0NeedsMicroLessons, getA0NeedsCard } from './a0Needs';
import { a0LocationCards, a0LocationMicroLessons, getA0LocationCard } from './a0Location';
import { a0FirstContactCoveredFinalDialogue, a0FirstContactCoveredMicroDialogues, a0NeedsCoveredFinalDialogue, a0NeedsCoveredMicroDialogues } from './a0CoverageDialogues';
import { a0LocationFinalDialogue, a0LocationMicroDialogues } from './a0LocationDialogues';
import { a0ReferenceNewLessons } from './a0ReferenceNewLessons';
import { a0LessonMeta } from './a0LessonMeta';
import { auditA0Lesson, defineA0Lesson, type A0LessonDefinition } from './a0LessonSchema';
import { repairA0LessonLanguage } from './a0LanguageCorrections';
import { a0VocabularyAudit } from './a0VocabularyAudit';

const coreReferenceLessons: Record<'l001' | 'l002' | 'l003', A0LessonDefinition> = {
  l001: defineA0Lesson({
    lessonId: 'l001', titleMn: a0LessonMeta.l001.titleMn, durationMinutes: a0LessonMeta.l001.durationMinutes,
    cards: a0FirstContactCards, microLessons: a0FirstContactMicroLessons, getCard: getA0FirstContactCard,
    microDialogues: a0FirstContactCoveredMicroDialogues, finalDialogue: a0FirstContactCoveredFinalDialogue,
    xpReward: 150, completionIcon: '🏆',
    completionSummaryMn: 'Та албан ёсоор мэндэлж, нэрээ болон хаанаас ирснээ хэлж, ойлгохгүй үед яриаг удаашруулах хүсэлт тавьж чадна.',
    completionPhrases: ['Dobrý den.', 'Jmenuji se {userName}.', 'Jsem z Mongolska.', 'Nerozumím. Mluvte prosím pomalu.', 'Na shledanou.'],
  }),
  l002: defineA0Lesson({
    lessonId: 'l002', titleMn: a0LessonMeta.l002.titleMn, durationMinutes: a0LessonMeta.l002.durationMinutes,
    cards: a0NeedsCards, microLessons: a0NeedsMicroLessons, getCard: getA0NeedsCard,
    microDialogues: a0NeedsCoveredMicroDialogues, finalDialogue: a0NeedsCoveredFinalDialogue,
    xpReward: 160, completionIcon: '🧾',
    completionSummaryMn: 'Та тусламж, ус, утас хэрэгтэйгээ хэлж, хүсэлтээ илэрхийлж, мөнгө эсвэл карт байхгүйгээ тайлбарлаж чадна.',
    completionPhrases: ['Potřebuji pomoc.', 'Potřebuji vodu.', 'Chci něco k jídlu.', 'Nemám kartu.', 'Potřebuji pomoc, prosím.'],
  }),
  l003: defineA0Lesson({
    lessonId: 'l003', titleMn: a0LessonMeta.l003.titleMn, durationMinutes: a0LessonMeta.l003.durationMinutes,
    cards: a0LocationCards, microLessons: a0LocationMicroLessons, getCard: getA0LocationCard,
    microDialogues: a0LocationMicroDialogues, finalDialogue: a0LocationFinalDialogue,
    xpReward: 170, completionIcon: '📍',
    completionSummaryMn: 'Та танихгүй газарт ариун цэврийн өрөө, дэлгүүр, эмийн сан, галт тэрэгний буудал хаана байгааг асууж, “энд / тэнд” гэсэн хариуг тодруулж чадна.',
    completionPhrases: ['Prosím, kde je toaleta?', 'Tady.', 'Tam.', 'Kde je lékárna?', 'Tady, nebo tam?'],
  }),
};

const rawReferenceLessons: Record<string, A0LessonDefinition> = { ...coreReferenceLessons, ...a0ReferenceNewLessons };

export const a0ReferenceLessons: Record<string, A0LessonDefinition> = Object.fromEntries(
  Object.entries(rawReferenceLessons).map(([lessonId, lesson]) => [lessonId, repairA0LessonLanguage(lesson)]),
);

export function getA0ReferenceLesson(lessonId: string): A0LessonDefinition {
  const lesson = a0ReferenceLessons[lessonId];
  if (!lesson) throw new Error(`Unknown A0 reference lesson: ${lessonId}`);
  return lesson;
}
export const a0ReferenceAudit = Object.values(a0ReferenceLessons).map(auditA0Lesson);
export { a0VocabularyAudit };
