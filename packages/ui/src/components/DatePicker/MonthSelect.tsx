import { useState, useRef, useEffect, useMemo } from 'react';
import { startOfMonth, setMonth, format } from 'date-fns';
import * as styles from './DatePicker.css';
import { IcTouchDown } from '../../icons/src/colored';
import { Text } from '../Text';

interface MonthSelectProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

export const MonthSelect = ({
  currentMonth,
  onMonthChange,
}: MonthSelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = setMonth(currentMonth, i);
      return { value: date, label: format(date, 'yyyy년 M월') };
    });
  }, [currentMonth]);

  return (
    <div className={styles.monthSelectWrapper} ref={wrapperRef}>
      <button
        type="button"
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
                    onMonthChange(startOfMonth(opt.value));
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
  );
};
