import { useState, useRef, useEffect, useMemo } from 'react';
import { startOfMonth, setMonth, format } from 'date-fns';
import * as styles from './DatePicker.css';
import { Text } from '../Text';
import clsx from 'clsx';
import { Button } from '../Button';

interface MonthOnlySelectProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

export const MonthOnlySelect = ({
  currentMonth,
  onMonthChange,
}: MonthOnlySelectProps) => {
  const [open, setOpen] = useState(false);
  const [pendingMonth, setPendingMonth] = useState<number>(
    currentMonth.getMonth()
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setPendingMonth(currentMonth.getMonth());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [currentMonth]);

  const monthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i),
    []
  );

  return (
    <div className={styles.monthSelectWrapper} ref={wrapperRef}>
      {!open && (
        <button
          type="button"
          className={styles.monthSelect}
          onClick={() => setOpen(true)}
        >
          <Text variant="lg_subtitle_semibold" color="grayscale90">
            {format(currentMonth, 'M월')}
          </Text>
        </button>
      )}

      {open && (
        <div className={styles.birthDropdownFull}>
          <div className={styles.birthDropdownHeader}>
            <Text variant="xl_title_bold" color="grayscale90">
              {pendingMonth + 1}월
            </Text>
          </div>

          <div className={styles.birthDropdownBody}>
            <div className={styles.birthGrid}>
              {monthOptions.map((mi) => {
                const date = setMonth(currentMonth, mi);
                const isSel = mi === pendingMonth;
                return (
                  <div
                    key={mi}
                    className={clsx(
                      styles.birthCell,
                      isSel
                        ? styles.yearCellVariants.selected
                        : styles.yearCellVariants.unselected
                    )}
                    onClick={() => {
                      setPendingMonth(mi);
                    }}
                  >
                    {format(date, 'M월')}
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
                setPendingMonth(currentMonth.getMonth());
              }}
            >
              취소
            </Button>
            <Button
              variant="main"
              size="40"
              onClick={() => {
                const date = setMonth(currentMonth, pendingMonth);
                onMonthChange(startOfMonth(date));
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
