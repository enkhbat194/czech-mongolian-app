import '../helpers/localStorageStub';
import { describe, expect, it } from 'vitest';
import { allCzechWords } from '../../src/data/allCzechWords';
import { a0MemoryTargets } from '../../src/data/a0MemoryPlan';
import { a0ReferenceLessons } from '../../src/data/a0ReferenceLessons';
import { useAppStore } from '../../src/stores/useAppStore';

const correctedLessonIds = [
  'l001', 'l002', 'l003', 'l004', 'l005',
  'l006', 'l007', 'l008', 'l009', 'l010',
  'l011', 'l012', 'l013', 'l014', 'l015',
];

const byId = (id: string) => {
  const target = a0MemoryTargets.find((item) => item.id === id);
  if (!target) throw new Error(`Missing memory target: ${id}`);
  return target;
};

const catalogById = (id: string) => {
  const word = allCzechWords.find((item) => item.id === id);
  if (!word) throw new Error(`Missing catalog word: ${id}`);
  return word;
};

describe('A0.1-A0.15 language corrections', () => {
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

  it('uses direct learner language for work, cafe and payment situations', () => {
    expect(byId('a0c0096').mongolian).toBe('Би юу хийх ёстой вэ?');
    expect(byId('a0c0104').mongolian).toBe('Би танд үзүүлье.');
    expect(byId('a0c0108').mongolian).toBe('Кофе авъя.');
    expect(byId('a0c0109').mongolian).toBe('Цай авъя.');
    expect(byId('a0c0110').mongolian).toBe('Шөл авъя.');
    expect(byId('a0c0112').mongolian).toBe('Авч явъя.');
    expect(byId('a0c0115').mongolian).toBe('Картаар төлнө.');
    expect(byId('a0c0116').mongolian).toBe('Бэлнээр төлнө.');
  });

  it('uses medically accurate and natural Mongolian in A0.10', () => {
    expect(byId('a0c0133').mongolian).toBe('... өвдөж байна.');
    expect(byId('a0c0134').mongolian).toBe('Толгой өвдөж байна.');
    expect(byId('a0c0135').mongolian).toBe('Гэдэс өвдөж байна.');
    expect(byId('a0c0136').mongolian).toBe('Хоолой өвдөж байна.');
    expect(byId('a0c0137').mongolian).toBe('Халуурч байна.');
    expect(byId('a0c0139').mongolian).toBe('Өвчин намдаах эм байна уу?');
    expect(byId('a0c0140').mongolian).toBe('Энэ эмийг яаж хэрэглэх вэ?');
  });

  it('uses direct clarification requests in A0.11', () => {
    expect(byId('a0c0143').mongolian).toBe('Таныг сонсож байна.');
    expect(byId('a0c0145').mongolian).toBe('Давтаж хэлж болох уу?');
    expect(byId('a0c0146').mongolian).toBe('Надад бичиж өгнө үү.');
    expect(byId('a0c0147').mongolian).toBe('Надад SMS-ээр явуулна уу.');
  });

  it('keeps child count and family-company meanings distinct in A0.12', () => {
    expect(byId('a0c0155').mongolian).toBe('Би нэг хүүхэдтэй.');
    expect(byId('a0c0156').mongolian).toBe('Би хүүхэдтэй.');
    expect(byId('a0c0157').mongolian).toBe('Би энд гэр бүлийнхэнтэйгээ байна.');
  });

  it('turns the fixed male production exercise into two-form recognition', () => {
    const exercises = a0ReferenceLessons.l012.microLessons.flatMap((micro) => micro.exercises);
    const genderRecognition = exercises.find((exercise) => exercise.id === 'a0-12-d-3');
    const serialized = JSON.stringify(genderRecognition);

    expect(genderRecognition?.type).toBe('match');
    expect(serialized).toContain('Jsem tady sám.');
    expect(serialized).toContain('Jsem tady sama.');
    expect(serialized).not.toContain('expectedText');
  });

  it('uses natural weather, safety and first-week Mongolian', () => {
    expect(byId('a0c0166').mongolian).toBe('Надад дулаахан байна.');
    expect(byId('a0c0180').mongolian).toBe('Би зүгээргүй байна.');
    expect(byId('a0c0182').mongolian).toBe('Би шинээр ирсэн.');
    expect(byId('a0c0183').mongolian).toBe('Би шинээр ирсэн.');
    expect(byId('a0c0185').mongolian).toBe('Би чехээр бага зэрэг ярьдаг.');
  });

  it('removes the fixed male answer from the A0.15 final survival sequence', () => {
    const step = a0ReferenceLessons.l015.finalDialogue.steps.find((item) => item.id === 'a15final-d2');

    expect(step?.staffCzech).toBe('Potřebujete pomoc?');
    expect(step?.choices.find((choice) => choice.id === step.correctId)?.text).toBe('Prosím, pomozte mi.');
    expect(JSON.stringify(step)).not.toContain('Jsem nový');
    expect(JSON.stringify(step)).not.toContain('Jsem nová');
  });

  it('removes sample names and retired translations from exported A0.1-A0.15 lessons', () => {
    const exported = JSON.stringify(correctedLessonIds.map((lessonId) => a0ReferenceLessons[lessonId]));
    expect(exported).not.toMatch(/Eba|Эба/);
    expect(exported).toContain('Jmenuji se {userName}.');
    expect(exported).not.toContain('Би ус хүсэж байна.');
    expect(exported).not.toContain('Би хоол хүсэж байна.');
    expect(exported).not.toContain('Таны нэр хэн бэ?');
    expect(exported).not.toContain('Би юу хийх вэ?');
    expect(exported).not.toContain('Би кофе авъя, гуйя.');
    expect(exported).not.toContain('Авч явъя, гуйя.');
    expect(exported).not.toContain('Миний толгой өвдөж байна.');
    expect(exported).not.toContain('Үүнийг яаж уух вэ?');
    expect(exported).not.toContain('Би таныг сонсож байна.');
    expect(exported).not.toContain('Би хүүхдүүдтэй.');
    expect(exported).not.toContain('Би энд гэр бүлтэйгээ байна.');
    expect(exported).not.toContain('Би шинэ хүн.');
  });

  it('feeds the same corrected catalog to learner-facing app pages', () => {
    expect(catalogById('a0c0013').czech).toBe('Jmenuji se {userName}.');
    expect(catalogById('a0c0013').mongolian).toBe('Намайг {userName} гэдэг.');
    expect(catalogById('a0c0031').mongolian).toBe('Ус авъя.');
    expect(catalogById('a0c0108').mongolian).toBe('Кофе авъя.');
    expect(catalogById('a0c0140').mongolian).toBe('Энэ эмийг яаж хэрэглэх вэ?');
    expect(catalogById('a0c0147').mongolian).toBe('Надад SMS-ээр явуулна уу.');
    expect(catalogById('a0c0157').mongolian).toBe('Би энд гэр бүлийнхэнтэйгээ байна.');
    expect(catalogById('a0c0183').mongolian).toBe('Би шинээр ирсэн.');

    const storeWords = useAppStore.getState().words;
    expect(storeWords).toBe(allCzechWords);
    expect(storeWords.find((word) => word.id === 'a0c0033')?.mongolian).toBe('Хоол авъя.');
    expect(storeWords.find((word) => word.id === 'a0c0112')?.mongolian).toBe('Авч явъя.');
    expect(storeWords.find((word) => word.id === 'a0c0139')?.mongolian).toBe('Өвчин намдаах эм байна уу?');
    expect(storeWords.find((word) => word.id === 'a0c0146')?.mongolian).toBe('Надад бичиж өгнө үү.');
    expect(storeWords.find((word) => word.id === 'a0c0155')?.mongolian).toBe('Би нэг хүүхэдтэй.');
    expect(storeWords.find((word) => word.id === 'a0c0166')?.mongolian).toBe('Надад дулаахан байна.');
    expect(storeWords.find((word) => word.id === 'a0c0180')?.mongolian).toBe('Би зүгээргүй байна.');
    expect(JSON.stringify(storeWords.filter((word) => correctedLessonIds.includes(word.lessonId)))).not.toMatch(/Eba|Эба|Би ус хүсэж байна\.|Би хоол хүсэж байна\.|Үүнийг яаж уух вэ\?|Би шинэ хүн\./);
  });
});
