'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Button } from '@repo/ui';
import { useModal } from '@repo/ui/hooks';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import { timetableDates } from '@web/constants/timetable';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function SchedulePage() {
  const router = useRouter();
  const [selectedRange, setSelectedRange] = useState<TimeRange | null>(null);
  const { confirm } = useModal();

  const handleRangeSelect = useCallback((range: TimeRange | null) => {
    setSelectedRange(range);
  }, []);

  const handleSave = () => {
    if (!selectedRange) return;

    confirm({
      type: 'info',
      description: '입력하신 면접 가능 시간을 저장하시겠습니까?',
      cancelText: '취소',
      confirmText: '저장',
      onConfirm: () => {
        // 바로 timetable 페이지로 이동
        router.replace('/interview-evaluation/timetable/interviewer');
      },
    });
  };

  return (
    <Flex
      direction="column"
      gap="4rem"
      width="100%"
      align="center"
      paddingBottom="6rem"
      paddingTop="4rem"
    >
      {/* 날짜별 SelectableTimeTable */}
      <Flex gap="6.4rem" width="100%" justify="center">
        {timetableDates.map((isoDate) => {
          const dt = parseISO(isoDate);
          const label = format(dt, 'yyyy년 MM월 dd일 (EEE)', { locale: ko });

          return (
            <SelectableTimeTable
              key={isoDate}
              startHour={10}
              endHour={18}
              interval={30}
              onRangeSelect={handleRangeSelect}
              width="40rem"
              title={label}
            />
          );
        })}
      </Flex>

      {/* 저장 버튼 */}
      <Button
        variant="main"
        size="48"
        disabled={!selectedRange}
        onClick={handleSave}
        width="24rem"
      >
        저장
      </Button>
    </Flex>
  );
}
