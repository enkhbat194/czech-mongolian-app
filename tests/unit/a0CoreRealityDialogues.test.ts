import { describe, expect, it } from 'vitest';
import {
  a0FirstContactFinalDialogue,
  a0FirstContactMicroDialogues,
  a0NeedsFinalDialogue,
  a0NeedsMicroDialogues,
} from '../../src/data/a0CoreRealityDialogues';

const correctChoiceText = (dialogueKey: string, stepId: string) => {
  const dialogue = a0FirstContactMicroDialogues[dialogueKey];
  const step = dialogue.steps.find((item) => item.id === stepId);
  if (!step) throw new Error(`Missing dialogue step: ${stepId}`);
  return step.choices.find((choice) => choice.id === step.correctId)?.text;
};

describe('A0.1-A0.2 raw core dialogue language', () => {
  it('keeps learner identity dynamic and removes retired sample-name text', () => {
    const serialized = JSON.stringify({
      a0FirstContactMicroDialogues,
      a0FirstContactFinalDialogue,
      a0NeedsMicroDialogues,
      a0NeedsFinalDialogue,
    });

    expect(serialized).toContain('{userName}');
    expect(serialized).not.toMatch(/Eba|Эба/);
    expect(serialized).not.toContain('Миний нэр');
    expect(serialized).not.toContain('Таны нэр хэн бэ?');
  });

  it('uses natural replies after asking a name and answering how someone is', () => {
    expect(correctChoiceText('a0-1-d', 'a01d-d2')).toBe('Dobře, děkuji.');
    expect(correctChoiceText('a0-1-e', 'a01e-d1')).toBe('Dobře, děkuji.');
  });

  it('removes wooden Mongolian request translations from the raw A0.2 dialogues', () => {
    const serialized = JSON.stringify({ a0NeedsMicroDialogues, a0NeedsFinalDialogue });

    expect(serialized).not.toMatch(/Би ус хүсэж байна|Би хоол хүсэж байна|Би идэх юм хүсэж байна|Би үүнийг хүсэж байна/);
    expect(serialized).toContain('Тийм, ус авъя.');
    expect(serialized).toContain('Тийм, идэх юм авъя.');
    expect(serialized).toContain('Тийм, энийг авъя.');
  });

  it('answers the cash question directly instead of changing its meaning', () => {
    const step = a0NeedsMicroDialogues['a0-2-e'].steps.find((item) => item.id === 'a02e-d2');
    if (!step) throw new Error('Missing dialogue step: a02e-d2');

    expect(step.staffCzech).toBe('Máte hotovost?');
    expect(step.choices.find((choice) => choice.id === step.correctId)?.text).toBe('Ne, nemám.');
  });
});
