'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcDateArrowLeft, IcArrowRight } from '@repo/ui/icons/mono';
import * as styles from './DateNav.css';

interface DateNavProps {
  dates: string[];
  active: string;
  onChange: (date: string) => void;
}

export default function DateNav({ dates, active, onChange }: DateNavProps) {
  const currentIndex = dates.indexOf(active);
  const prevDisabled = currentIndex <= 0;
  const nextDisabled = currentIndex >= dates.length - 1;

  const getDayLabel = (dateStr: string) => {
    const day = new Date(dateStr).getDay();
    return ['일', '월', '화', '수', '목', '금', '토'][day];
  };

  return (
    <Flex justify="center" align="center" gap="2rem">
      <button
        onClick={() => !prevDisabled && onChange(dates[currentIndex - 1]!)}
        disabled={prevDisabled}
        className={prevDisabled ? styles.arrowDisabled : styles.arrow}
      >
        <IcDateArrowLeft width={24} height={24} />
      </button>

      <Text variant="lg_subtitle_semibold" color="grayscale90">
        {active} ({getDayLabel(active)})
      </Text>

      <button
        onClick={() => !nextDisabled && onChange(dates[currentIndex + 1]!)}
        disabled={nextDisabled}
        className={nextDisabled ? styles.arrowDisabled : styles.arrow}
      >
        <IcArrowRight width={24} height={24} />
      </button>
    </Flex>
  );
}
