'use client';
import React from 'react';
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
  isRequired: boolean;
}

export function InterviewScheduleForm({
  dates,
  scheduleMap,
  duration,
  selectedScheduleList,
  isRequired,
  onScheduleChange,
}: InterviewScheduleFormProps) {
  if (!isRequired) return null;

  const scheduleStatus = useFormFieldStatus('interview-schedule');

  return (
    <div
      id="interview-schedule"
      tabIndex={-1}
      className={focusableWrapper}
      style={{ width: '100%' }}
    >
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
          아래 일정 중 면접이 가능한 모든 시간대를 드래그/클릭하여 등록해주세요.
          (면접 시간: {duration}분 소요)
        </Text>
      </Flex>

      <Flex
        gap="6.4rem"
        justify="center"
        width="100%"
        style={{ marginTop: '1.6rem' }}
      >
        {dates.map((dateStr) => {
          const available = scheduleMap[dateStr] ?? [];
          const startHour = available.length
            ? Math.min(...available.map((r) => parseInt(r.startTime, 10)))
            : 0;
          const endHour = available.length
            ? Math.max(...available.map((r) => parseInt(r.endTime, 10)))
            : 24;
          const title = safeFormatDotDate(dateStr, 'yyyy년 MM월 dd일 (EEE)');

          const handleChange = (trs: TimeRange[]) => {
            const items: InterviewScheduleItem[] = trs.map((r) => ({
              date: dateStr,
              startTime: r.startTime,
              endTime: r.endTime,
            }));
            onScheduleChange(dateStr, items);
            items.length
              ? scheduleStatus.setCompleted()
              : scheduleStatus.setDefault();
          };

          return (
            <SelectableTimeTable
              key={dateStr}
              title={title}
              startHour={startHour}
              endHour={endHour}
              interval={duration}
              width="40rem"
              interviewSchedule={{
                isSelected: true,
                scheduleList: available.map((r) => ({
                  date: dateStr,
                  startTime: r.startTime,
                  endTime: r.endTime,
                })),
              }}
              onSelectionChange={handleChange}
            />
          );
        })}
      </Flex>
    </div>
  );
}
