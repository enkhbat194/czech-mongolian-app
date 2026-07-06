import { a0ReferenceCatalog } from './a0ReferenceCatalog';
import { auditA0Lesson } from './a0LessonSchema';
import { a0VocabularyAudit } from './a0VocabularyAudit';
import { lessons } from './lessons';

export interface A0ReleaseAuditResult {
  readyLessonCount: number;
  totalCards: number;
  totalExercises: number;
  totalDialogueSteps: number;
}

function assertA0Release(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`A0 release audit failed: ${message}`);
}

/**
 * Keeps course-map metadata and the executable lesson data in sync. This module
 * is imported by the app entry point so a malformed A0 release fails the build.
 */
export function validateA0Release(): A0ReleaseAuditResult {
  const readyLessons = lessons.filter((lesson) => lesson.status === 'ready');
  const readyIds = new Set(readyLessons.map((lesson) => lesson.id));
  const catalogIds = Object.keys(a0ReferenceCatalog);

  assertA0Release(readyLessons.length > 0, 'no ready lessons are configured');
  assertA0Release(
    catalogIds.length === readyIds.size && catalogIds.every((lessonId) => readyIds.has(lessonId)),
    'ready lesson metadata and executable lesson definitions do not match',
  );

  const audits = readyLessons.map((lesson) => {
    const definition = a0ReferenceCatalog[lesson.id];
    assertA0Release(Boolean(definition), `${lesson.id} is ready but has no lesson definition`);
    const audit = auditA0Lesson(definition);
    assertA0Release(
      audit.cardCount === lesson.wordCount,
      `${lesson.id} metadata says ${lesson.wordCount} cards but lesson data has ${audit.cardCount}`,
    );
    assertA0Release(audit.exerciseCount > 0, `${lesson.id} has no exercises`);
    assertA0Release(audit.finalDialogueStepCount > 0, `${lesson.id} has no final dialogue`);
    return audit;
  });

  const totalCards = audits.reduce((sum, audit) => sum + audit.cardCount, 0);
  const totalExercises = audits.reduce((sum, audit) => sum + audit.exerciseCount, 0);
  const totalDialogueSteps = audits.reduce(
    (sum, audit) => sum + audit.microDialogueStepCount + audit.finalDialogueStepCount,
    0,
  );

  assertA0Release(
    a0VocabularyAudit.totalCards === totalCards,
    `canonical vocabulary has ${a0VocabularyAudit.totalCards} cards but ready lessons expose ${totalCards}`,
  );

  return {
    readyLessonCount: readyLessons.length,
    totalCards,
    totalExercises,
    totalDialogueSteps,
  };
}

export const a0ReleaseAudit = validateA0Release();
