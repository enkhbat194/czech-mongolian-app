export type A0ReadyLessonId = 'l001' | 'l002' | 'l003' | 'l004' | 'l005' | 'l006' | 'l007' | 'l008' | 'l009' | 'l010' | 'l011';

export type A0LessonMeta = {
  titleMn: string;
  durationMinutes: number;
};

export const a0LessonMeta: Record<A0ReadyLessonId, A0LessonMeta> = {
  l001: { titleMn: 'A0.1 — Анхны харилцаа', durationMinutes: 38 },
  l002: { titleMn: 'A0.2 — Надад хэрэгтэй', durationMinutes: 38 },
  l003: { titleMn: 'A0.3 — Хаана байна?', durationMinutes: 32 },
  l004: { titleMn: 'A0.4 — Яаж очих вэ?', durationMinutes: 34 },
  l005: { titleMn: 'A0.5 — Цаг, өдөр, уулзалт', durationMinutes: 36 },
  l006: { titleMn: 'A0.6 — Ажил дээр', durationMinutes: 38 },
  l007: { titleMn: 'A0.7 — Хоол, кафе, ресторан', durationMinutes: 38 },
  l008: { titleMn: 'A0.8 — Дэлгүүр, мөнгө', durationMinutes: 34 },
  l009: { titleMn: 'A0.9 — Гэр, байр, хэрэгцээ', durationMinutes: 36 },
  l010: { titleMn: 'A0.10 — Эрүүл мэнд, эмийн сан', durationMinutes: 38 },
  l011: { titleMn: 'A0.11 — Утас, ойлгоогүй үед', durationMinutes: 36 },
};
