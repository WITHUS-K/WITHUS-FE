import { useState, useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  addDays,
  startOfDay,
  isAfter,
} from 'date-fns';
import * as styles from './DatePicker.css';
import { MonthSelect } from './MonthSelect';
import { YearSelect } from './YearSelect';
import { MonthOnlySelect } from './MonthOnlySelect';
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
  variant?: 'default' | 'birth';
}

export const DatePicker = ({
  selectedDate,
  onSelect,
  variant = 'default',
}: DatePickerProps) => {
  const today = startOfDay(new Date());
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(selectedDate)
  );

  const handleSelectDate = (date: Date) => {
    setHasUserSelected(true);
    onSelect(date);
  };

  const { days, monthEnd } = useMemo(
    () => generateCalendarData(currentMonth),
    [currentMonth]
  );

  return (
    <div
      className={clsx(
        styles.wrapper,
        variant === 'birth' ? styles.shadow : null
      )}
    >
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navLeftButton}
          onClick={() => setCurrentMonth((d) => startOfMonth(addDays(d, -1)))}
        >
          <IcArrowLeft width={17} height={17} />
        </button>

        {variant === 'birth' ? (
          <>
            <YearSelect
              currentMonth={currentMonth}
              onYearChange={(m) => setCurrentMonth(m)}
            />
            <MonthOnlySelect
              currentMonth={currentMonth}
              onMonthChange={(m) => setCurrentMonth(m)}
            />
          </>
        ) : (
          <MonthSelect
            currentMonth={currentMonth}
            onMonthChange={(date) => setCurrentMonth(date)}
          />
        )}

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
          const outsideMonth = d.getMonth() !== currentMonth.getMonth();
          const disabled =
            variant === 'birth'
              ? outsideMonth || isAfter(d, today)
              : isDateDisabled(d, currentMonth, today);

          const originalVariant = getDayVariant({
            date: d,
            monthEnd,
            currentMonth,
            today,
            selectedDate,
            hasUserSelected,
          });

          const dayVariant =
            variant === 'birth' &&
            originalVariant === 'disabled' &&
            !outsideMonth &&
            !isAfter(d, today)
              ? d.getDay() === 0
                ? 'sunday'
                : 'normal'
              : originalVariant;

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
