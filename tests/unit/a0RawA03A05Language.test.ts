import { describe, expect, it } from 'vitest';
import { a0LocationMicroLessons } from '../../src/data/a0Location';
import {
  a0LocationFinalDialogue,
  a0LocationMicroDialogues,
} from '../../src/data/a0LocationDialogues';
import { a0DirectionsMicroLessons } from '../../src/data/a0Directions';
import {
  a0DirectionsFinalDialogue,
  a0DirectionsMicroDialogues,
} from '../../src/data/a0DirectionsDialogues';
import { a0TimeMicroLessons } from '../../src/data/a0Time';
import {
  a0TimeFinalDialogue,
  a0TimeMicroDialogues,
} from '../../src/data/a0TimeDialogues';

const findStep = (
  dialogues: Record<string, { steps: Array<{ id: string; choices: Array<{ id: string; text: string; mongolian?: string }>; correctId: string; staffMn?: string }> }>,
  dialogueId: string,
  stepId: string,
) => {
  const step = dialogues[dialogueId]?.steps.find((item) => item.id === stepId);
  if (!step) throw new Error(`Missing dialogue step: ${dialogueId}/${stepId}`);
  return step;
};

describe('A0.3-A0.5 raw lesson language', () => {
  it('keeps A0.3 place questions short and natural in Mongolian', () => {
    const serialized = JSON.stringify({
      a0LocationMicroLessons,
      a0LocationMicroDialogues,
      a0LocationFinalDialogue,
    });

    expect(serialized).toContain('Ариун цэврийн өрөө хаана вэ?');
    expect(serialized).toContain('Дэлгүүр хаана вэ?');
    expect(serialized).toContain('Эмийн сан хаана вэ?');
    expect(serialized).toContain('Галт тэрэгний буудал хаана вэ?');
    expect(serialized).not.toContain('Уучлаарай, ариун цэврийн өрөө хаана байна?');
    expect(serialized).not.toContain('Дэлгүүр хаана байна?');
    expect(serialized).not.toContain('Эмийн сан хаана байна?');
  });

  it('distinguishes a public transport stop from a train station in A0.4', () => {
    const serialized = JSON.stringify({
      a0DirectionsMicroLessons,
      a0DirectionsMicroDialogues,
      a0DirectionsFinalDialogue,
    });

    expect(serialized).toContain('Нийтийн тээврийн буудал хаана вэ?');
    expect(serialized).toContain('Галт тэрэгний буудал хаана вэ?');
  });

  it('uses instrumental Czech transport replies instead of bare vehicle nouns', () => {
    const step = findStep(a0DirectionsMicroDialogues, 'a0-4-b', 'a04b-d2');
    const correct = step.choices.find((choice) => choice.id === step.correctId);

    expect(correct?.text).toBe('Tramvají, prosím.');
    expect(correct?.mongolian).toBe('Трамвайгаар явъя.');
    expect(JSON.stringify(step)).not.toContain('Tramvaj, prosím.');
    expect(JSON.stringify(step)).not.toContain('Autobus, prosím.');
  });

  it('uses concise natural availability replies in A0.5', () => {
    const serialized = JSON.stringify({
      a0TimeMicroLessons,
      a0TimeMicroDialogues,
      a0TimeFinalDialogue,
    });
    const confirmation = findStep(a0TimeMicroDialogues, 'a0-5-b', 'a05b-d2');

    expect(serialized).toContain('Маргааш орой завтай.');
    expect(serialized).not.toContain('Маргааш орой би завтай.');
    expect(confirmation.staffMn).toBe('За, орой гэж үү?');
  });
});
