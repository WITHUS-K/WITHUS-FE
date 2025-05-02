import { useState, useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  addDays,
  format,
  setMonth,
  startOfDay,
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
}

export const DatePicker = ({ selectedDate, onSelect }: DatePickerProps) => {
  const today = startOfDay(new Date());
  const [hasUserSelected, setHasUserSelected] = useState(false);

  const handleSelectDate = (date: Date) => {
    setHasUserSelected(true);
    onSelect(date);
  };
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(selectedDate)
  );

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = setMonth(currentMonth, i);
    return {
      value: date,
      label: format(date, 'yyyy년 M월'),
    };
  });

  const { days, monthEnd } = useMemo(
    () => generateCalendarData(currentMonth),
    [currentMonth]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button
          className={styles.navLeftButton}
          onClick={() => setCurrentMonth((d) => startOfMonth(addDays(d, -1)))}
        >
          <IcArrowLeft width={17} height={17} />
        </button>

        <MonthSelect
          currentMonth={currentMonth}
          onMonthChange={(date) => setCurrentMonth(date)}
        />

        <button
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
          const disabled = isDateDisabled(d, currentMonth, today);
          const variant = getDayVariant({
            date: d,
            monthEnd,
            currentMonth,
            today,
            selectedDate,
            hasUserSelected,
          });
          return (
            <div
              key={d.toISOString()}
              className={clsx(styles.dayCell, styles.dayVariants[variant])}
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
