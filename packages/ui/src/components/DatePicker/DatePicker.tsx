export type DayVariant =
  | 'normal'
  | 'disabled'
  | 'selected'
  | 'today'
  | 'sunday';

import { useState, useMemo, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  addDays,
  startOfDay,
  isBefore,
} from 'date-fns';
import * as styles from './DatePicker.css';
import { MonthSelect } from './MonthSelect';
import { IcArrowLeft, IcArrowRight } from '../../icons/src/mono';
import {
  generateCalendarData,
  getDayVariant,
  isAfterMonth,
  isDateDisabled,
} from '@repo/utils';
import clsx from 'clsx';

interface DatePickerProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
  variant?: 'default' | 'birth';
}

export const DatePicker = ({
  selectedDate,
  onSelect,
  minDate,
  variant = 'default',
}: DatePickerProps) => {
  const today = startOfDay(new Date());
  const minSelectableDate = minDate ? startOfDay(minDate) : undefined;

  const [hasUserSelected, setHasUserSelected] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(selectedDate)
  );

  // selectedDate prop이 바뀌면 달력만 해당 월로 이동
  useEffect(() => {
    setCurrentMonth(startOfMonth(selectedDate));
  }, [selectedDate]);

  const handleSelectDate = (date: Date) => {
    setHasUserSelected(true);
    onSelect(date);
  };

  const { days, monthEnd } = useMemo(
    () => generateCalendarData(currentMonth),
    [currentMonth]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navLeftButton}
          onClick={() => setCurrentMonth((d) => startOfMonth(addDays(d, -1)))}
        >
          <IcArrowLeft width={17} height={17} />
        </button>
        <MonthSelect
          currentMonth={currentMonth}
          onMonthChange={(d) => setCurrentMonth(d)}
        />
        <button
          type="button"
          className={styles.navRightButton}
          onClick={() =>
            setCurrentMonth((d) => startOfMonth(addDays(endOfMonth(d), 1)))
          }
        >
          <IcArrowRight width={17} height={17} />
        </button>
      </div>

      <div className={styles.calendar}>
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div
            key={d}
            className={`${styles.dayName} ${
              i === 0 ? styles.dayNameVariants.sunday : ''
            }`}
          >
            {d}
          </div>
        ))}

        {days.map((d) => {
          const afterMonth = isAfterMonth(d, monthEnd);
          const beforeMin = minSelectableDate && isBefore(d, minSelectableDate);
          const disabled = isDateDisabled(d, currentMonth, today) || beforeMin;

          // getDayVariant이 반환하는 문자열 리터럴 타입을 받아옵니다
          const original = getDayVariant({
            date: d,
            monthEnd,
            currentMonth,
            today,
            selectedDate,
            hasUserSelected,
          });

          // 'disabled' 여부를 가장 우선으로 처리
          const dayVariant: DayVariant = disabled ? 'disabled' : original;

          return (
            <div
              key={d.toISOString()}
              className={clsx(styles.dayCell, styles.dayVariants[dayVariant])}
              onClick={() => !disabled && handleSelectDate(d)}
            >
              {!afterMonth ? d.getDate() : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
