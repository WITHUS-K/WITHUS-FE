'use client';

import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import { useCallback, useState } from 'react';

export default function Page() {
  const common = {
    title: '2025년 04월 12일 (토)',
    interval: 30,
    startHour: 10,
    endHour: 18,
  };

  const [selectedRange, setSelectedRange] = useState<TimeRange | null>(null);

  const handleRangeSelect = useCallback((range: TimeRange | null) => {
    setSelectedRange(range);
    //선택한 시간 사용하는 로직
  }, []);

  return (
    <SelectableTimeTable
      {...common}
      width="40rem"
      onRangeSelect={handleRangeSelect}
    />
  );
}
