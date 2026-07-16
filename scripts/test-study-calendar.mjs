import assert from 'node:assert/strict';
import {
  addWeeklyXp,
  getMondayIndex,
  getWeekStartKey,
  normalizeCalendarState,
} from '../src/utils/studyCalendarCore.mjs';

const monday = new Date(2026, 6, 6, 12);
const sunday = new Date(2026, 6, 12, 12);
const nextMonday = new Date(2026, 6, 13, 12);

assert.equal(getMondayIndex(monday), 0);
assert.equal(getMondayIndex(sunday), 6);
assert.equal(getWeekStartKey(sunday), '2026-07-06');
assert.equal(getWeekStartKey(nextMonday), '2026-07-13');

const sameDay = normalizeCalendarState({
  studyDate: '2026-07-06',
  todayMinutes: 12,
  weeklyXPWeekStart: '2026-07-06',
  weeklyXP: [4, 0, 0, 0, 0, 0, 0],
}, new Date(2026, 6, 6, 23, 59));
assert.equal(sameDay.todayMinutes, 12);

const nextDay = normalizeCalendarState(sameDay, new Date(2026, 6, 7, 9));
assert.equal(nextDay.todayMinutes, 0);
assert.deepEqual(nextDay.weeklyXP, [4, 0, 0, 0, 0, 0, 0]);

const nextWeek = normalizeCalendarState({ ...nextDay, studyDate: '2026-07-12', todayMinutes: 9 }, nextMonday);
assert.equal(nextWeek.todayMinutes, 0);
assert.deepEqual(nextWeek.weeklyXP, [0, 0, 0, 0, 0, 0, 0]);
assert.deepEqual(addWeeklyXp([0, 0, 0, 0, 0, 0, 0], 11, monday), [11, 0, 0, 0, 0, 0, 0]);
assert.deepEqual(addWeeklyXp([0, 0, 0, 0, 0, 0, 0], 7, sunday), [0, 0, 0, 0, 0, 0, 7]);

console.log('Study calendar behavior tests: PASS');
