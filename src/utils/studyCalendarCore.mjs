export const WEEKDAY_LABELS_MN = Object.freeze(['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня']);

function toWeekArray(values) {
  return Array.from({ length: 7 }, (_, index) => {
    const value = values?.[index];
    return Number.isFinite(value) ? value : 0;
  });
}

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMondayIndex(date = new Date()) {
  return (date.getDay() + 6) % 7;
}

export function getWeekStartKey(date = new Date()) {
  const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  localMidnight.setDate(localMidnight.getDate() - getMondayIndex(localMidnight));
  return getLocalDateKey(localMidnight);
}

export function normalizeCalendarState(progress, now = new Date()) {
  const studyDate = getLocalDateKey(now);
  const weeklyXPWeekStart = getWeekStartKey(now);
  const weeklyXP = progress.weeklyXPWeekStart === weeklyXPWeekStart
    ? toWeekArray(progress.weeklyXP)
    : [0, 0, 0, 0, 0, 0, 0];

  return {
    ...progress,
    studyDate,
    todayMinutes: progress.studyDate === studyDate ? progress.todayMinutes : 0,
    weeklyXPWeekStart,
    weeklyXP,
  };
}

export function addWeeklyXp(weeklyXP, amount, date = new Date()) {
  const next = toWeekArray(weeklyXP);
  const dayIndex = getMondayIndex(date);
  next[dayIndex] += amount;
  return next;
}
