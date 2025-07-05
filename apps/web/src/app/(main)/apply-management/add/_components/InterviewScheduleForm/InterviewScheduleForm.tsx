'use client';
import React, { useMemo } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import { parseISO, format } from 'date-fns';
import type { InterviewScheduleItem } from '@web/types/application';
import { safeFormatDotDate } from '@web/utils/application';

interface InterviewScheduleFormProps {
  dates: string[];
  scheduleMap: Record<string, TimeRange[]>;
  duration: number;
  selectedScheduleList: InterviewScheduleItem[];
  onScheduleChange: (date: string, items: InterviewScheduleItem[]) => void;
}

export function InterviewScheduleForm({
  dates,
  scheduleMap,
  duration,
  selectedScheduleList,
  onScheduleChange,
}: InterviewScheduleFormProps) {
  // allRanges: 모든 날짜의 모든 TimeRange
  const allRanges = useMemo(
    () => Object.values(scheduleMap).flat(),
    [scheduleMap]
  );

  console.log('스케쥴', selectedScheduleList);
  // startHour: 가장 이른 시작 시간의 시(hour) 부분
  const startHour = useMemo(() => {
    if (allRanges.length === 0) return 0;
    return Math.min(
      ...allRanges.map((r) => parseInt(r.startTime.split(':')[0]!, 10))
    );
  }, [allRanges]);

  // endHour: 가장 늦은 종료 시간의 시(hour) 부분
  const endHour = useMemo(() => {
    if (allRanges.length === 0) return 24;
    return Math.max(
      ...allRanges.map((r) => parseInt(r.endTime.split(':')[0]!, 10))
    );
  }, [allRanges]);

  return (
    <div style={{ width: '100%' }}>
      <Flex gap="0.4rem" direction="column">
        <Flex gap="0.4rem">
          <Text variant="md1_text_semibold" color="grayscale70">
            면접 가능 일정 선택
          </Text>
          <Text variant="md2_text_semibold" color="error">
            *
          </Text>
        </Flex>
        <Text variant="sm_caption_medium" color="grayscale40">
          아래 일정 중 면접이 가능한 모든 시간대를 드래그로 등록해주세요. (면접
          시간: {duration}분 소요)
        </Text>
      </Flex>

      <Flex
        gap="6.4rem"
        justify="center"
        width="100%"
        style={{ marginTop: '1.6rem' }}
      >
        {dates.map((dateStr) => {
          const label = safeFormatDotDate(dateStr, 'yyyy년 MM월 dd일 (EEE)');

          const selectedForDate = selectedScheduleList.filter(
            (item) => item.date === dateStr
          );

          const availableForDate = scheduleMap[dateStr] ?? [];

          // 해당 날짜 기준 startHour, endHour 계산
          const hours = availableForDate.flatMap((r) => [
            parseInt(r.startTime.split(':')[0]!, 10),
            parseInt(r.endTime.split(':')[0]!, 10),
          ]);
          const startHour = hours.length > 0 ? Math.min(...hours) : 0;
          const endHour = hours.length > 0 ? Math.max(...hours) : 24;

          return (
            <SelectableTimeTable
              key={dateStr}
              title={label}
              startHour={startHour}
              endHour={endHour}
              interval={duration}
              width="40rem"
              interviewSchedule={{
                isSelected: true,
                scheduleList: availableForDate.map((r) => ({
                  date: dateStr,
                  startTime: r.startTime,
                  endTime: r.endTime,
                })),
              }}
              onRangeSelect={(range) => {
                let updated: InterviewScheduleItem[];
                if (range) {
                  const exists = selectedForDate.some(
                    (r) =>
                      r.startTime === range.startTime &&
                      r.endTime === range.endTime
                  );
                  const nextSet = exists
                    ? selectedForDate.filter(
                        (r) =>
                          !(
                            r.startTime === range.startTime &&
                            r.endTime === range.endTime
                          )
                      )
                    : [
                        ...selectedForDate,
                        {
                          date: dateStr,
                          startTime: range.startTime,
                          endTime: range.endTime,
                        },
                      ];
                  updated = nextSet;
                } else {
                  updated = [];
                }
                onScheduleChange(dateStr, updated);
              }}
            />
          );
        })}
      </Flex>
    </div>
  );
}
