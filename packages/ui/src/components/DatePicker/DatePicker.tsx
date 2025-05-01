import { useState, useRef, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  setMonth,
  startOfDay,
} from 'date-fns';
import * as styles from './DatePicker.css';
import { IcTouchDown } from '../../icons/src/colored';
import { Text } from '../Text';
import { IcArrowLeft, IcArrowRight } from '../../icons/src/mono';
import { getDayVariant, isAfterMonth, isDateDisabled } from '@repo/utils';

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
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = setMonth(currentMonth, i);
    return {
      value: date,
      label: format(date, 'yyyy년 M월'),
    };
  });

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

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.header}>
        <button
          className={styles.navLeftButton}
          onClick={() => setCurrentMonth((d) => startOfMonth(addDays(d, -1)))}
        >
          <IcArrowLeft width={17} height={17} />
        </button>

        <div className={styles.monthSelectWrapper}>
          <button
            className={styles.monthSelect}
            onClick={() => setOpen((o) => !o)}
          >
            <Text variant="lg_subtitle_semibold" color="grayscale90">
              {format(currentMonth, 'yyyy년 M월')}
            </Text>
            <IcTouchDown
              width={24}
              height={24}
              className={styles.arrowStyle[open ? 'open' : 'closed']}
            />
          </button>

          {open && (
            <div className={styles.dropdownFull}>
              <div className={styles.dropdownList}>
                {monthOptions.map((opt) => {
                  const isSel =
                    format(opt.value, 'yyyy-MM') ===
                    format(currentMonth, 'yyyy-MM');
                  return (
                    <div
                      key={opt.label}
                      className={`${styles.dropdownItem} ${
                        isSel
                          ? styles.dropdownItemVariants.selected
                          : styles.dropdownItemVariants.unselected
                      }`}
                      onClick={() => {
                        setCurrentMonth(startOfMonth(opt.value));
                        setOpen(false);
                      }}
                    >
                      {opt.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

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
              className={`${styles.dayCell} ${styles.dayVariants[variant]}`}
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
