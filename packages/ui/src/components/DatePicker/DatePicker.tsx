import { useState, useMemo, useEffect, useRef } from 'react';
import {
  startOfMonth,
  endOfMonth,
  addDays,
  startOfDay,
  isAfter,
  isBefore,
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
  type DayVariant,
} from '@repo/utils';
import clsx from 'clsx';

interface DatePickerProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  variant?: 'default' | 'birth';
  /** 이 날짜 이전은 선택 불가 */
  minDate?: Date;
}

export const DatePicker = ({
  selectedDate,
  onSelect,
  variant = 'default',
  minDate,
}: DatePickerProps) => {
  const today = startOfDay(new Date());
  const minSelectable = minDate ? startOfDay(minDate) : undefined;

  const [hasUserSelected, setHasUserSelected] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(selectedDate)
  );
  const firstLoadRef = useRef(true);

  useEffect(() => {
    setCurrentMonth(startOfMonth(selectedDate));
    if (!firstLoadRef.current) {
      setHasUserSelected(true);
    }
    firstLoadRef.current = false;
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
    <div className={clsx(styles.wrapper, variant === 'birth' && styles.shadow)}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navLeftButton}
          onClick={() => setCurrentMonth((m) => startOfMonth(addDays(m, -1)))}
        >
          <IcArrowLeft width={17} height={17} />
        </button>

        {variant === 'birth' ? (
          <>
            <YearSelect
              currentMonth={currentMonth}
              onYearChange={(d) => setCurrentMonth(d)}
            />
            <MonthOnlySelect
              currentMonth={currentMonth}
              onMonthChange={(d) => setCurrentMonth(d)}
            />
          </>
        ) : (
          <MonthSelect
            currentMonth={currentMonth}
            onMonthChange={(d) => setCurrentMonth(d)}
          />
        )}

        <button
          type="button"
          className={styles.navRightButton}
          onClick={() =>
            setCurrentMonth((m) => startOfMonth(addDays(endOfMonth(m), 1)))
          }
        >
          <IcArrowRight width={17} height={17} />
        </button>
      </div>

      {/* 달력 그리드 */}
      <div className={styles.calendar}>
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div
            key={d}
            className={clsx(
              styles.dayName,
              i === 0 && styles.dayNameVariants.sunday
            )}
          >
            {d}
          </div>
        ))}

        {days.map((d) => {
          const afterMonth = isAfterMonth(d, monthEnd);
          const outsideMonth = d.getMonth() !== currentMonth.getMonth();

          const baseDisabled =
            variant === 'birth'
              ? outsideMonth || isAfter(d, today)
              : isDateDisabled(d, currentMonth, today);

          const disabled =
            baseDisabled ||
            (minSelectable ? isBefore(d, minSelectable) : false);

          const originalVariant = getDayVariant({
            date: d,
            monthEnd,
            currentMonth,
            today,
            selectedDate,
            hasUserSelected,
          });

          let dayVariant: DayVariant = disabled ? 'disabled' : originalVariant;

          if (
            variant === 'birth' &&
            dayVariant === 'disabled' &&
            !outsideMonth &&
            !isAfter(d, today)
          ) {
            dayVariant = d.getDay() === 0 ? 'sunday' : 'normal';
          }

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
