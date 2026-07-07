import {
  WEEKDAY_LABELS_MN as labels,
  addWeeklyXp as addWeeklyXpCore,
  getLocalDateKey as getLocalDateKeyCore,
  getMondayIndex as getMondayIndexCore,
  getWeekStartKey as getWeekStartKeyCore,
  normalizeCalendarState,
} from './studyCalendarCore.mjs';

export const WEEKDAY_LABELS_MN = labels as readonly ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'];

export interface CalendarProgressShape {
  studyDate: string;
  todayMinutes: number;
  weeklyXPWeekStart: string;
  weeklyXP: number[];
}

export function getLocalDateKey(date = new Date()) {
  return getLocalDateKeyCore(date);
}

export function getMondayIndex(date = new Date()) {
  return getMondayIndexCore(date);
}

export function getWeekStartKey(date = new Date()) {
  return getWeekStartKeyCore(date);
}

export function normalizeStudyCalendar<T extends CalendarProgressShape>(progress: T, now = new Date()): T {
  return normalizeCalendarState(progress, now) as T;
}

export function addWeeklyXp(weeklyXP: number[], amount: number, date = new Date()) {
  return addWeeklyXpCore(weeklyXP, amount, date) as number[];
}
