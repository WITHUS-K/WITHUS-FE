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
  //    여기서는 모두 'YYYY-MM-DD' 로 바꿔 볼게요.
  const normDates = dates.map((d) => d.replace(/\./g, '-'));
  const normActive = active.replace(/\./g, '-');

  // 2) 이제 실제 인덱스를 찾아요.
  const currentIndex = normDates.findIndex((d) => d === normActive);

  // 3) disabled 플래그
  const prevDisabled = currentIndex <= 0;
  const nextDisabled = currentIndex < 0 || currentIndex >= dates.length - 1;

  const getDayLabel = (dateStr: string) => {
    // active 는 원본 포맷(점이든 하이픈이든) 그대로 넘겨야 하니,
    // 파싱할 땐 hyphen 포맷으로 바꿔서 new Date() 에 줍시다.
    const d = new Date(dateStr.replace(/\./g, '-'));
    return ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
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
