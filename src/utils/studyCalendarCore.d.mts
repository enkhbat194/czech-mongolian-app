export const WEEKDAY_LABELS_MN: readonly string[];

export function getLocalDateKey(date?: Date): string;
export function getMondayIndex(date?: Date): number;
export function getWeekStartKey(date?: Date): string;

export function normalizeCalendarState<T>(progress: T, now?: Date): T;
export function addWeeklyXp(weeklyXP: number[], amount: number, date?: Date): number[];
