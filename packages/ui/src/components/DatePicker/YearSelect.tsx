import { useState, useRef, useEffect, useMemo } from 'react';
import { startOfMonth, format } from 'date-fns';
import * as styles from './DatePicker.css';
import { Text } from '../Text';
import clsx from 'clsx';
import { Button } from '../Button';

interface YearSelectProps {
  currentMonth: Date;
  onYearChange: (newMonth: Date) => void;
  minYear?: number;
  maxYear?: number;
}

export const YearSelect = ({
  currentMonth,
  onYearChange,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
}: YearSelectProps) => {
  const [open, setOpen] = useState(false);
  const [pendingYear, setPendingYear] = useState(currentMonth.getFullYear());
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setPendingYear(currentMonth.getFullYear());
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [currentMonth]);

  const yearOptions = useMemo(() => {
    const arr: number[] = [];
    for (let y = minYear; y <= maxYear; y++) arr.push(y);
    return arr;
  }, [minYear, maxYear]);

  return (
    <div className={styles.monthSelectWrapper} ref={wrapperRef}>
      {!open && (
        <button
          type="button"
          className={styles.monthSelect}
          onClick={() => setOpen(true)}
        >
          <Text variant="lg_subtitle_semibold" color="grayscale90">
            {format(currentMonth, 'yyyy년')}
          </Text>
        </button>
      )}

      {open && (
        <div className={styles.birthDropdownFull}>
          <div className={styles.birthDropdownHeader}>
            <Text variant="xl_title_bold" color="grayscale90">
              {pendingYear}년
            </Text>
          </div>

          <div className={styles.birthDropdownBody}>
            <div className={styles.birthGrid}>
              {yearOptions.map((y) => {
                const isSel = y === pendingYear;
                return (
                  <div
                    key={y}
                    className={clsx(
                      styles.birthCell,
                      isSel
                        ? styles.yearCellVariants.selected
                        : styles.yearCellVariants.unselected
                    )}
                    onClick={() => setPendingYear(y)}
                  >
                    {y}년
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.dropdownFooter}>
            <Button
              variant="basic"
              size="40"
              onClick={() => {
                setOpen(false);
                setPendingYear(currentMonth.getFullYear());
              }}
            >
              취소
            </Button>
            <Button
              variant="main"
              size="40"
              onClick={() => {
                onYearChange(
                  startOfMonth(new Date(pendingYear, currentMonth.getMonth()))
                );
                setOpen(false);
              }}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
