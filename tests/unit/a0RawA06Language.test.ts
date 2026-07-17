import { describe, expect, it } from 'vitest';
import { a0WorkMicroLessons } from '../../src/data/a0Work';

describe('A0.6 raw work lesson language', () => {
  it('stores corrected Mongolian directly in the lesson source', () => {
    const serialized = JSON.stringify(a0WorkMicroLessons);

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
});
