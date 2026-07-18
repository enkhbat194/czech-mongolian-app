import { describe, expect, it } from 'vitest';
import { a0FoodMicroLessons } from '../../src/data/a0Food';
import { a0FoodFinalDialogue, a0FoodMicroDialogues } from '../../src/data/a0FoodDialogues';
import { a0ShopMicroLessons } from '../../src/data/a0Shop';
import { a0ShopFinalDialogue, a0ShopMicroDialogues } from '../../src/data/a0ShopDialogues';
import { a0HomeMicroLessons } from '../../src/data/a0Home';
import { a0HomeFinalDialogue, a0HomeMicroDialogues } from '../../src/data/a0HomeDialogues';
import { a0HealthMicroLessons } from '../../src/data/a0Health';
import { a0HealthFinalDialogue, a0HealthMicroDialogues } from '../../src/data/a0HealthDialogues';

const rawA07A10 = () => JSON.stringify({
  food: { lessons: a0FoodMicroLessons, micro: a0FoodMicroDialogues, final: a0FoodFinalDialogue },
  shop: { lessons: a0ShopMicroLessons, micro: a0ShopMicroDialogues, final: a0ShopFinalDialogue },
  home: { lessons: a0HomeMicroLessons, micro: a0HomeMicroDialogues, final: a0HomeFinalDialogue },
  health: { lessons: a0HealthMicroLessons, micro: a0HealthMicroDialogues, final: a0HealthFinalDialogue },
});

describe('A0.7-A0.10 raw lesson and dialogue language', () => {
  it('stores direct cafe and payment Mongolian in the raw sources', () => {
    const serialized = rawA07A10();

    expect(serialized).toContain('Кофе авъя.');
    expect(serialized).toContain('Цай авъя.');
    expect(serialized).toContain('Шөл авъя.');
    expect(serialized).toContain('Авч явъя.');
    expect(serialized).toContain('Картаар төлнө.');
    expect(serialized).toContain('Бэлнээр төлнө.');

    expect(serialized).not.toContain('Би кофе авъя');
    expect(serialized).not.toContain('Авч явна, гуйя');
    expect(serialized).not.toContain('Авч явъя, гуйя');
    expect(serialized).not.toContain('Би картаар төлнө');
    expect(serialized).not.toContain('Би бэлнээр төлнө');
  });

  it('uses natural cashier questions in both shop dialogue layers', () => {
    const serialized = JSON.stringify({
      micro: a0ShopMicroDialogues,
      final: a0ShopFinalDialogue,
    });

    expect(serialized).toContain('Уут хэрэгтэй юу?');
    expect(serialized).toContain('Баримт хэрэгтэй юу?');
    expect(serialized).not.toContain('Уут авах уу?');
    expect(serialized).not.toContain('Баримт авах уу?');
  });

  it('keeps the learner name template and corrected carryover text in A0.9', () => {
    const serialized = JSON.stringify({
      lessons: a0HomeMicroLessons,
      micro: a0HomeMicroDialogues,
      final: a0HomeFinalDialogue,
    });

    expect(serialized).toContain('Jmenuji se {userName}.');
    expect(serialized).toContain('Намайг {userName} гэдэг.');
    expect(serialized).toContain('Би танд үзүүлье.');
    expect(serialized).toContain('Удаан ярина уу.');
    expect(serialized).not.toMatch(/Eba|Эба/);
    expect(serialized).not.toContain('Би танд үзүүлж өгнө.');
  });

  it('stores medically accurate Mongolian directly in A0.10 sources', () => {
    const serialized = JSON.stringify({
      lessons: a0HealthMicroLessons,
      micro: a0HealthMicroDialogues,
      final: a0HealthFinalDialogue,
    });

    expect(serialized).toContain('Толгой өвдөж байна.');
    expect(serialized).toContain('Гэдэс өвдөж байна.');
    expect(serialized).toContain('Хоолой өвдөж байна.');
    expect(serialized).toContain('Халуурч байна.');
    expect(serialized).toContain('Өвчин намдаах эм байна уу?');
    expect(serialized).toContain('Энэ эмийг яаж хэрэглэх вэ?');
    expect(serialized).toContain('Эм нь энэ байна.');
    expect(serialized).not.toContain('Миний толгой өвдөж байна.');
    expect(serialized).not.toContain('Өвчин намдаах юм байна уу?');
    expect(serialized).not.toContain('Үүнийг яаж уух вэ?');
    expect(serialized).not.toContain('Энэ эм байна.');
  });
});
