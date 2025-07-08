'use client';
import React, { useMemo } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import type { InterviewScheduleItem } from '@web/types/application';
import { safeFormatDotDate } from '@web/utils/application';
import { useFormFieldStatus } from '@web/app/apply/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/apply/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';

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
  const scheduleStatus = useFormFieldStatus('interview-schedule');

  return (
    <div id="interview-schedule" tabIndex={-1} className={focusableWrapper}>
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
          const selectedForDate = selectedScheduleList.filter(
            (item) => item.date === dateStr
          );
          const availableForDate = scheduleMap[dateStr] ?? [];

          // dateStr 섹션 래퍼에서 드래그 시작 시 editing
          const handleMouseDown = () => {
            scheduleStatus.setEditing();
          };

          const handleRangeSelect = (range: TimeRange | null) => {
            let updated: InterviewScheduleItem[];
            if (range) {
              const exists = selectedForDate.some(
                (r) =>
                  r.startTime === range.startTime && r.endTime === range.endTime
              );
              updated = exists
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
            } else {
              // null range → clear all
              updated = [];
            }

            onScheduleChange(dateStr, updated);

            // 선택된 시간이 하나도 없으면 default, 있으면 completed
            if (updated.length > 0) {
              scheduleStatus.setCompleted();
            } else {
              scheduleStatus.setDefault();
            }
          };

          // 시간대 매핑
          const hours = availableForDate.flatMap((r) => [
            parseInt(r.startTime.split(':')[0]!, 10),
            parseInt(r.endTime.split(':')[0]!, 10),
          ]);
          const startHour = hours.length ? Math.min(...hours) : 0;
          const endHour = hours.length ? Math.max(...hours) : 24;
          const title = safeFormatDotDate(dateStr, 'yyyy년 MM월 dd일 (EEE)');

          return (
            <div key={dateStr} onMouseDown={handleMouseDown}>
              <SelectableTimeTable
                title={title}
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
                onRangeSelect={handleRangeSelect}
              />
            </div>
          );
        })}
      </Flex>
    </div>
  );
}
