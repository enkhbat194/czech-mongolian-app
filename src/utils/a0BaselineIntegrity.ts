import type { A0FinalMissionChoice, A0FinalMissionQuestion } from '../data/a0FinalMission';
import type { CzechWord } from '../data/czechWords';
import type { Lesson } from '../data/lessons';
import { stableShuffle } from './stableShuffle';

export function getIntroducedPracticeWords(words: CzechWord[], introducedWordIds: string[]) {
  const introduced = new Set(introducedWordIds);
  return words.filter((word) => introduced.has(word.id));
}

export function getNextIncompleteLesson(lessons: Lesson[], completedLessonIds: string[]) {
  const completed = new Set(completedLessonIds);
  const readyLessons = lessons
    .filter((lesson) => lesson.status === 'ready')
    .sort((left, right) => left.order - right.order);

  const nextSequentialLesson = readyLessons.find((lesson, index) => {
    if (completed.has(lesson.id)) return false;
    const prerequisitesComplete = readyLessons
      .slice(0, index)
      .every((previousLesson) => completed.has(previousLesson.id));
    return !lesson.isLocked || prerequisitesComplete;
  });

  return nextSequentialLesson
    ?? readyLessons.find((lesson) => !lesson.isLocked && !completed.has(lesson.id))
    ?? readyLessons.find((lesson) => !lesson.isLocked)
    ?? readyLessons[0];
}

export function getRequiredA0LessonIds(lessons: Lesson[]) {
  return lessons
    .filter((lesson) => lesson.status === 'ready')
    .sort((left, right) => left.order - right.order)
    .map((lesson) => lesson.id);
}

export function getMissingFinalMissionLessonIds(lessons: Lesson[], completedLessonIds: string[]) {
  const completed = new Set(completedLessonIds);
  return getRequiredA0LessonIds(lessons).filter((lessonId) => !completed.has(lessonId));
}

export function isFinalMissionUnlocked(lessons: Lesson[], completedLessonIds: string[]) {
  return getMissingFinalMissionLessonIds(lessons, completedLessonIds).length === 0;
}

export function getFinalMissionTargetIds(question: A0FinalMissionQuestion) {
  const ids = question.targetIds?.length
    ? question.targetIds
    : question.targetId
      ? [question.targetId]
      : [];
  return [...new Set(ids)];
}

export function getShuffledFinalMissionChoices(
  question: A0FinalMissionQuestion,
  seed: string,
): A0FinalMissionChoice[] {
  return stableShuffle(question.choices ?? [], `a0-final:${question.id}:${seed}`);
}
