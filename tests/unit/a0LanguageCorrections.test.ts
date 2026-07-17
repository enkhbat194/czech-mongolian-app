import '../helpers/localStorageStub';
import { describe, expect, it } from 'vitest';
import { a0MemoryTargets } from '../../src/data/a0MemoryPlan';
import { a0ReferenceLessons } from '../../src/data/a0ReferenceLessons';

const byId = (id: string) => {
  const target = a0MemoryTargets.find((item) => item.id === id);
  if (!target) throw new Error(`Missing memory target: ${id}`);
  return target;
};

describe('A0.1-A0.5 language corrections', () => {
  it('uses the learner-name template and natural Mongolian self-introduction', () => {
    expect(byId('a0c0013').czech).toBe('Jmenuji se {userName}.');
    expect(byId('a0c0013').mongolian).toBe('Намайг {userName} гэдэг.');
    expect(byId('a0c0012').mongolian).toBe('Таныг хэн гэдэг вэ?');
  });

  it('keeps one contextual core meaning for Prosím and natural A0.1 replies', () => {
    expect(byId('a0c0004').mongolian).toBe('Гуйя.');
    expect(byId('a0c0016').mongolian).toBe('Та сайн байна уу?');
    expect(byId('a0c0018').mongolian).toBe('Муу байна.');
    expect(byId('a0c0327').mongolian).toBe('Удаан ярина уу.');
  });

  it('removes wooden Mongolian want-translations from A0.2', () => {
    expect(byId('a0c0031').mongolian).toBe('Ус авъя.');
    expect(byId('a0c0033').mongolian).toBe('Хоол авъя.');
    expect(byId('a0c0035').mongolian).toBe('Идэх юм авъя.');
    expect(byId('a0c0037').mongolian).toBe('Энийг авъя.');
  });

  it('repairs the ambiguous A0.1 exercises', () => {
    const lesson = a0ReferenceLessons.l001;
    const exercises = lesson.microLessons.flatMap((micro) => micro.exercises);
    const gratitude = exercises.find((exercise) => exercise.id === 'a0-1-a-3');
    const nameFunction = exercises.find((exercise) => exercise.id === 'a0-1-c-3-match');

    expect(gratitude?.type).toBe('choice');
    expect('promptCzech' in (gratitude || {})).toBe(false);
    expect(nameFunction?.type).toBe('match');
    expect(JSON.stringify(nameFunction)).toContain('Өөрийн нэрээ хэлэх');
    expect(JSON.stringify(nameFunction)).toContain('Хүний нэрийг асуух');
  });

  it('uses natural location and transport replies in A0.3-A0.4', () => {
    const location = JSON.stringify(a0ReferenceLessons.l003);
    const directions = JSON.stringify(a0ReferenceLessons.l004);
    expect(location).toContain('Ариун цэврийн өрөө хаана вэ?');
    expect(location).not.toContain('Уучлаарай, ариун цэврийн өрөө хаана байна?');
    expect(directions).toContain('Tramvají, prosím.');
    expect(directions).toContain('Трамвайгаар явъя.');
    expect(directions).not.toContain('Tramvaj, prosím.');
  });

  it('contains no sample-name or retired wooden translations in exported A0.1-A0.5 lessons', () => {
    const exported = JSON.stringify(
      ['l001', 'l002', 'l003', 'l004', 'l005'].map((lessonId) => a0ReferenceLessons[lessonId]),
    );
    expect(exported).not.toMatch(/Eba|Эба/);
    expect(exported).not.toContain('Би ус хүсэж байна.');
    expect(exported).not.toContain('Би хоол хүсэж байна.');
    expect(exported).not.toContain('Таны нэр хэн бэ?');
  });
});
