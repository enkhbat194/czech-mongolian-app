export const WEEKDAY_LABELS_MN = ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'] as const;

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
