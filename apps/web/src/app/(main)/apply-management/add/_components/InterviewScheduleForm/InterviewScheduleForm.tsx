'use client';
import React, { useEffect } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import type { InterviewScheduleItem } from '@web/types/application';
import { safeFormatDotDate } from '@web/utils/application';
import { useFormFieldStatus } from '@web/app/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';

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

  // ✅ 전체 선택 상태를 기준으로 네비게이션 체크 동기화 (부모 상태 변화에도 안전)
  useEffect(() => {
    selectedScheduleList.length
      ? scheduleStatus.setCompleted()
      : scheduleStatus.setDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScheduleList.length]);

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
            // ✅ 이번 date에 대한 선택값
            const itemsForThisDate: InterviewScheduleItem[] = trs.map((r) => ({
              date: dateStr,
              startTime: r.startTime,
              endTime: r.endTime,
            }));

            // ✅ "전체 선택 리스트" 기준으로 다음 상태를 계산
            // (부모에서 others + itemsForDate로 합치는 방식과 동일)
            const others = selectedScheduleList.filter(
              (item) => item.date !== dateStr
            );
            const nextAll = [...others, ...itemsForThisDate];

            // 부모 폼 값 업데이트
            onScheduleChange(dateStr, itemsForThisDate);

            // ✅ 전체(nextAll) 기준으로 completed/default 결정
            nextAll.length
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
