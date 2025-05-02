import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';

export type DayVariant = 'normal' | 'disabled' | 'selected' | 'today' | 'sunday';

export const isAfterMonth = (date: Date, monthEnd: Date): boolean => {
  return date > monthEnd;
}

export const isDateDisabled = (
  date: Date,
  currentMonth: Date,
  today: Date
): boolean => {
  return date.getMonth() !== currentMonth.getMonth() || date < today;
}

export const isDateToday = (date: Date, today: Date): boolean => {
  return format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
}

export const isDateSelected = (
  date: Date,
  selectedDate: Date,
  hasUserSelected: boolean
): boolean => {
  return (
    hasUserSelected &&
    format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );
}

/**
 * 주어진 날짜의 스타일 variant 결정
 */
export const getDayVariant = (params: {
  date: Date;
  monthEnd: Date;
  currentMonth: Date;
  today: Date;
  selectedDate: Date;
  hasUserSelected: boolean;
}): DayVariant => {
  const { date, monthEnd, currentMonth, today, selectedDate, hasUserSelected } =
    params;

  if (isDateDisabled(date, currentMonth, today)) return 'disabled';
  if (isDateSelected(date, selectedDate, hasUserSelected)) return 'selected';
  if (isDateToday(date, today)) return 'today';
  if (date.getDay() === 0) return 'sunday';
  return 'normal';
}

export interface CalendarData {
  days: Date[];
  monthEnd: Date;
}

export const generateCalendarData = (currentMonth: Date): CalendarData => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  return { days, monthEnd };
}