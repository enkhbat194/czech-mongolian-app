import { describe, expect, it } from 'vitest';
import { a0WorkMicroLessons } from '../../src/data/a0Work';
import {
  a0WorkFinalDialogue,
  a0WorkMicroDialogues,
} from '../../src/data/a0WorkDialogues';

const rawA06 = () => JSON.stringify({
  lessons: a0WorkMicroLessons,
  microDialogues: a0WorkMicroDialogues,
  finalDialogue: a0WorkFinalDialogue,
});

describe('A0.6 raw work language', () => {
  it('stores corrected Mongolian directly in lesson and dialogue sources', () => {
    const serialized = rawA06();

    expect(serialized).toContain('Би юу хийх ёстой вэ?');
    expect(serialized).toContain('Би танд үзүүлье.');
    expect(serialized).toContain('Надад үзүүлнэ үү.');

    expect(serialized).not.toContain('Би юу хийх вэ?');
    expect(serialized).not.toContain('Би танд үзүүлж өгнө.');
    expect(serialized).not.toContain('Надад үзүүлж өгнө үү.');
  });

  it('keeps the corrected learner-facing wording in exercises', () => {
    const taskLesson = a0WorkMicroLessons.find((lesson) => lesson.id === 'a0-6-d');
    const helpLesson = a0WorkMicroLessons.find((lesson) => lesson.id === 'a0-6-e');

    expect(taskLesson?.instructions.a0c0096).toContain('Би юу хийх ёстой вэ?');
    expect(taskLesson?.instructions.a0c0104).toContain('Би танд үзүүлье.');
    expect(helpLesson?.instructions.a0c0099).toContain('Надад үзүүлнэ үү.');
  });

  it('keeps the final dialogue on the same corrected source wording', () => {
    const taskStep = a0WorkFinalDialogue.steps.find((step) => step.id === 'a06final-d6');
    const showStep = a0WorkFinalDialogue.steps.find((step) => step.id === 'a06final-d7');

    expect(taskStep?.choices.find((choice) => choice.id === taskStep.correctId)?.mongolian)
      .toBe('Би юу хийх ёстой вэ?');
    expect(showStep?.staffMn).toBe('Би танд үзүүлье.');
  });
});
