import type { CzechWord } from './czechWords';
import type { DialogueScenario } from './a0Dialogues';
import { getA0ExerciseMemoryTargetId } from './a0ExerciseMemoryMap';
import { getA0MemoryTarget, getA0MemoryTargetByCzech } from './a0MemoryPlan';

export type A0Choice = {
  id: string;
  text: string;
};

export type A0MatchPair = {
  id: string;
  czech: string;
  mongolian: string;
};

export type A0Exercise =
  | {
      id: string;
      type: 'choice';
      titleMn: string;
      promptMn: string;
      promptCzech?: string;
      audioText?: string;
      choices: A0Choice[];
      correctId: string;
      feedbackMn: string;
    }
  | {
      id: string;
      type: 'order';
      titleMn: string;
      promptMn: string;
      tokens: string[];
      expectedText: string;
      feedbackMn: string;
    }
  | {
      id: string;
      type: 'fillBlank';
      titleMn: string;
      promptMn: string;
      promptCzech: string;
      choices: A0Choice[];
      correctId: string;
      feedbackMn: string;
    }
  | {
      id: string;
      type: 'typing';
      titleMn: string;
      promptMn: string;
      targetText: string;
      audioText?: string;
      inputHint?: string;
      feedbackMn: string;
    }
  | {
      id: string;
      type: 'match';
      titleMn: string;
      promptMn: string;
      pairs: A0MatchPair[];
      feedbackMn: string;
    };

export interface A0MicroLesson {
  id: string;
  titleMn: string;
  canDoMn: string;
  cardIds: string[];
  instructions: Record<string, string>;
  exercises: A0Exercise[];
}

export interface A0LessonDefinition {
  lessonId: string;
  titleMn: string;
  durationMinutes: number;
  cards: CzechWord[];
  microLessons: A0MicroLesson[];
  getCard: (id: string) => CzechWord;
  microDialogues: Record<string, DialogueScenario>;
  finalDialogue: DialogueScenario;
  xpReward: number;
  completionIcon: string;
  completionSummaryMn: string;
  completionPhrases: string[];
}

export interface A0LessonAuditResult {
  lessonId: string;
  cardCount: number;
  microCount: number;
  exerciseCount: number;
  microDialogueStepCount: number;
  finalDialogueStepCount: number;
}

function assertA0(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`A0 lesson schema error: ${message}`);
}

function assertDialogue(scenario: DialogueScenario, label: string, seenStepIds: Set<string>) {
  assertA0(Boolean(scenario.id && scenario.titleMn && scenario.contextMn), `${label} has incomplete dialogue labels`);
  assertA0(scenario.steps.length > 0, `${label} has no dialogue steps`);

  scenario.steps.forEach((step) => {
    assertA0(!seenStepIds.has(step.id), `${label} has duplicate dialogue step id ${step.id}`);
    seenStepIds.add(step.id);
    assertA0(Boolean(step.speaker && step.staffCzech && step.staffMn && step.promptMn && step.feedbackMn), `${step.id} has incomplete dialogue text`);
    assertA0(step.choices.length >= 2, `${step.id} needs at least two dialogue choices`);
    assertA0(step.choices.some((choice) => choice.id === step.correctId), `${step.id} correctId is missing`);
    assertA0(new Set(step.choices.map((choice) => choice.id)).size === step.choices.length, `${step.id} has duplicate choice ids`);
    step.choices.forEach((choice) => assertA0(Boolean(choice.text && choice.mongolian), `${step.id} has an incomplete dialogue choice`));
  });
}

function assertExerciseMemoryTarget(exercise: A0Exercise) {
  if (exercise.type === 'match') {
    exercise.pairs.forEach((pair) => {
      assertA0(Boolean(getA0MemoryTargetByCzech(pair.czech)), `${exercise.id} match pair has no memory target: ${pair.czech}`);
    });
    return;
  }

  const targetId = getA0ExerciseMemoryTargetId(exercise.id);
  assertA0(Boolean(targetId), `${exercise.id} has no exercise memory target`);
  assertA0(Boolean(getA0MemoryTarget(targetId as string)), `${exercise.id} maps to unknown memory target ${targetId}`);
}

export function defineA0Lesson(definition: A0LessonDefinition): A0LessonDefinition {
  const cardIds = new Set(definition.cards.map((card) => card.id));
  const microIds = new Set<string>();
  const exerciseIds = new Set<string>();
  const dialogueStepIds = new Set<string>();
  const cardUseCounts = new Map<string, number>();

  assertA0(Boolean(definition.lessonId && definition.titleMn), 'lesson identity is incomplete');
  assertA0(definition.durationMinutes > 0, `${definition.lessonId} has an invalid duration`);
  assertA0(definition.cards.length > 0, `${definition.lessonId} has no cards`);
  assertA0(cardIds.size === definition.cards.length, `${definition.lessonId} has duplicate card ids`);
  assertA0(definition.microLessons.length > 0, `${definition.lessonId} has no micro lessons`);
  assertA0(definition.completionPhrases.length > 0, `${definition.lessonId} has no completion phrases`);

  definition.microLessons.forEach((micro) => {
    assertA0(!microIds.has(micro.id), `${definition.lessonId} has duplicate micro id ${micro.id}`);
    microIds.add(micro.id);
    assertA0(Boolean(micro.titleMn && micro.canDoMn), `${micro.id} has incomplete labels`);
    assertA0(micro.cardIds.length > 0, `${micro.id} has no cards`);
    assertA0(new Set(micro.cardIds).size === micro.cardIds.length, `${micro.id} repeats a card`);
    assertA0(micro.exercises.length > 0, `${micro.id} has no exercises`);
    assertA0(definition.microDialogues[micro.id], `${micro.id} has no micro dialogue`);

    micro.cardIds.forEach((cardId) => {
      assertA0(cardIds.has(cardId), `${micro.id} references unknown card ${cardId}`);
      assertA0(Boolean(micro.instructions[cardId]), `${micro.id} has no instruction for ${cardId}`);
      cardUseCounts.set(cardId, (cardUseCounts.get(cardId) || 0) + 1);
    });

    micro.exercises.forEach((exercise) => {
      assertA0(!exerciseIds.has(exercise.id), `${definition.lessonId} has duplicate exercise id ${exercise.id}`);
      exerciseIds.add(exercise.id);
      assertA0(Boolean(exercise.titleMn && exercise.promptMn && exercise.feedbackMn), `${exercise.id} has incomplete labels`);
      assertExerciseMemoryTarget(exercise);

      if (exercise.type === 'choice' || exercise.type === 'fillBlank') {
        assertA0(exercise.choices.length >= 2, `${exercise.id} needs at least two choices`);
        assertA0(exercise.choices.some((choice) => choice.id === exercise.correctId), `${exercise.id} correctId is missing`);
        assertA0(new Set(exercise.choices.map((choice) => choice.id)).size === exercise.choices.length, `${exercise.id} has duplicate choice ids`);
        exercise.choices.forEach((choice) => assertA0(Boolean(choice.text), `${exercise.id} has an empty choice`));
      }
      if (exercise.type === 'order') {
        assertA0(exercise.tokens.length >= 2, `${exercise.id} needs at least two tokens`);
        assertA0(Boolean(exercise.expectedText), `${exercise.id} has no expected text`);
      }
      if (exercise.type === 'typing') {
        assertA0(Boolean(exercise.targetText), `${exercise.id} has no target text`);
      }
      if (exercise.type === 'match') {
        assertA0(exercise.pairs.length >= 2, `${exercise.id} needs at least two pairs`);
        assertA0(new Set(exercise.pairs.map((pair) => pair.id)).size === exercise.pairs.length, `${exercise.id} has duplicate match pair ids`);
        assertA0(new Set(exercise.pairs.map((pair) => pair.czech)).size === exercise.pairs.length, `${exercise.id} has duplicate Czech match text`);
        assertA0(new Set(exercise.pairs.map((pair) => pair.mongolian)).size === exercise.pairs.length, `${exercise.id} has duplicate Mongolian match text`);
        exercise.pairs.forEach((pair) => assertA0(Boolean(pair.czech && pair.mongolian), `${exercise.id} has an incomplete match pair`));
      }
    });

    assertDialogue(definition.microDialogues[micro.id], micro.id, dialogueStepIds);
  });

  Object.keys(definition.microDialogues).forEach((microId) => {
    assertA0(microIds.has(microId), `${definition.lessonId} has an orphan micro dialogue ${microId}`);
  });
  definition.cards.forEach((card) => assertA0(cardUseCounts.get(card.id) === 1, `${definition.lessonId} must introduce ${card.id} exactly once`));
  assertDialogue(definition.finalDialogue, `${definition.lessonId} final dialogue`, dialogueStepIds);

  return definition;
}

export function auditA0Lesson(definition: A0LessonDefinition): A0LessonAuditResult {
  defineA0Lesson(definition);
  const microDialogueStepCount = definition.microLessons.reduce(
    (sum, micro) => sum + definition.microDialogues[micro.id].steps.length,
    0,
  );
  return {
    lessonId: definition.lessonId,
    cardCount: definition.cards.length,
    microCount: definition.microLessons.length,
    exerciseCount: definition.microLessons.reduce((sum, micro) => sum + micro.exercises.length, 0),
    microDialogueStepCount,
    finalDialogueStepCount: definition.finalDialogue.steps.length,
  };
}
