import { WeekDate } from "../types/week-date";

export function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const start = new Date(date);
  start.setDate(date.getDate() - day);
  start.setHours(0, 0, 0, 0);
  return start;
}

export function getWeekDatesWithMeta(
  startOfWeek: Date,
  currentMonth: number
): WeekDate[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const isOverflow = date.getMonth() !== currentMonth;
    return { date, isOverflow };
  });
}
