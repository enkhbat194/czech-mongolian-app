import { describe, expect, it } from 'vitest';
import { a0FinalMissionSections } from '../../src/data/a0FinalMission';
import { a0MemoryTargets } from '../../src/data/a0MemoryPlan';
import { allCzechWords } from '../../src/data/allCzechWords';
import { lessons } from '../../src/data/lessons';
import {
  getFinalMissionTargetIds,
  getIntroducedPracticeWords,
  getMissingFinalMissionLessonIds,
  getNextIncompleteLesson,
  getShuffledFinalMissionChoices,
  isFinalMissionUnlocked,
} from '../../src/utils/a0BaselineIntegrity';

const questions = a0FinalMissionSections.flatMap((section) => section.questions);

function getQuestion(id: string) {
  const question = questions.find((item) => item.id === id);
  if (!question) throw new Error(`Missing Final Mission question: ${id}`);
  return question;
}

describe('A0 baseline integrity', () => {
  it('keeps generic practice pools limited to introduced cards', () => {
    const introducedIds = allCzechWords.slice(0, 3).map((word) => word.id);
    const eligible = getIntroducedPracticeWords(allCzechWords, introducedIds);
    expect(eligible.map((word) => word.id)).toEqual(introducedIds);
    expect(eligible.every((word) => introducedIds.includes(word.id))).toBe(true);
  });

  it('selects the next sequential incomplete lesson even after lock state resets', () => {
    const nextLesson = getNextIncompleteLesson(lessons, ['l001']);
    expect(nextLesson?.id).toBe('l002');
  });

  it('keeps the Final Mission locked until every ready A0 lesson is complete', () => {
    const allLessonIds = lessons.filter((lesson) => lesson.status === 'ready').map((lesson) => lesson.id);
    expect(isFinalMissionUnlocked(lessons, allLessonIds.slice(0, -1))).toBe(false);
    expect(getMissingFinalMissionLessonIds(lessons, allLessonIds.slice(0, -1))).toEqual([allLessonIds.at(-1)]);
    expect(isFinalMissionUnlocked(lessons, allLessonIds)).toBe(true);
  });

  it('maps Nerozumím typing evidence to the correct memory card', () => {
    expect(getFinalMissionTargetIds(getQuestion('a0-final-type-understand'))).toEqual(['a0c0326']);
  });

  it('maps the composite slow-speech answer to all intended cards', () => {
    expect(getFinalMissionTargetIds(getQuestion('a0-final-survival-slow'))).toEqual([
      'a0c0006',
      'a0c0326',
      'a0c0327',
    ]);
  });

  it('only maps Final Mission evidence to real A0 memory targets', () => {
    const validTargetIds = new Set(a0MemoryTargets.map((target) => target.id));
    questions.forEach((question) => {
      getFinalMissionTargetIds(question).forEach((targetId) => {
        expect(validTargetIds.has(targetId), `${question.id} -> ${targetId}`).toBe(true);
      });
    });
  });

  it('shuffles Final Mission choices deterministically and varies answer positions', () => {
    const choiceQuestions = questions.filter((question) => question.choices?.length);
    const firstPass = choiceQuestions.map((question) => getShuffledFinalMissionChoices(question, 'learner-test'));
    const secondPass = choiceQuestions.map((question) => getShuffledFinalMissionChoices(question, 'learner-test'));
    expect(firstPass).toEqual(secondPass);

    const correctPositions = choiceQuestions.map((question, index) => (
      firstPass[index].findIndex((choice) => choice.id === question.correctId)
    ));
    expect(correctPositions.every((position) => position >= 0)).toBe(true);
    expect(new Set(correctPositions).size).toBeGreaterThan(1);
  });
});
