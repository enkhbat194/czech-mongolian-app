import type { CzechWord } from './czechWords';
import type { DialogueScenario } from './a0Dialogues';

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

export function defineA0Lesson(definition: A0LessonDefinition): A0LessonDefinition {
  const cardIds = new Set(definition.cards.map((card) => card.id));
  const microIds = new Set<string>();
  const exerciseIds = new Set<string>();

  assertA0(definition.cards.length > 0, `${definition.lessonId} has no cards`);
  assertA0(definition.microLessons.length > 0, `${definition.lessonId} has no micro lessons`);
  assertA0(definition.finalDialogue.steps.length > 0, `${definition.lessonId} has no final dialogue`);

  definition.microLessons.forEach((micro) => {
    assertA0(!microIds.has(micro.id), `${definition.lessonId} has duplicate micro id ${micro.id}`);
    microIds.add(micro.id);
    assertA0(micro.cardIds.length > 0, `${micro.id} has no cards`);
    assertA0(micro.exercises.length > 0, `${micro.id} has no exercises`);
    assertA0(definition.microDialogues[micro.id], `${micro.id} has no micro dialogue`);
    assertA0(definition.microDialogues[micro.id].steps.length > 0, `${micro.id} dialogue has no steps`);

    micro.cardIds.forEach((cardId) => {
      assertA0(cardIds.has(cardId), `${micro.id} references unknown card ${cardId}`);
      assertA0(Boolean(micro.instructions[cardId]), `${micro.id} has no instruction for ${cardId}`);
    });

    micro.exercises.forEach((exercise) => {
      assertA0(!exerciseIds.has(exercise.id), `${definition.lessonId} has duplicate exercise id ${exercise.id}`);
      exerciseIds.add(exercise.id);
      assertA0(Boolean(exercise.titleMn && exercise.promptMn && exercise.feedbackMn), `${exercise.id} has incomplete labels`);

      if (exercise.type === 'choice' || exercise.type === 'fillBlank') {
        assertA0(exercise.choices.length >= 2, `${exercise.id} needs at least two choices`);
        assertA0(exercise.choices.some((choice) => choice.id === exercise.correctId), `${exercise.id} correctId is missing`);
      }
      if (exercise.type === 'order') {
        assertA0(exercise.tokens.length >= 2, `${exercise.id} needs at least two tokens`);
      }
      if (exercise.type === 'match') {
        assertA0(exercise.pairs.length >= 2, `${exercise.id} needs at least two pairs`);
        const pairIds = new Set(exercise.pairs.map((pair) => pair.id));
        assertA0(pairIds.size === exercise.pairs.length, `${exercise.id} has duplicate match pair ids`);
      }
    });
  });

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