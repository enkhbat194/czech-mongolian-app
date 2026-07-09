export type A0ReadyLessonId = 'l001' | 'l002' | 'l003' | 'l004' | 'l005' | 'l006' | 'l007';

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
};
