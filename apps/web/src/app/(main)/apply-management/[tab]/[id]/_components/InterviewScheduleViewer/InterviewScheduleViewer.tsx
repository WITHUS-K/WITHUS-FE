'use client';

import React, { useMemo } from 'react';
import { Flex } from '@repo/ui/Flex';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import { safeFormatDotDate } from '@web/utils/application';
import { parseToMin } from '@web/utils/time';
import type { InterviewScheduleItem } from '@web/types/application';
import { Text } from '@repo/ui/Text';
import { vars } from '@repo/theme';

export interface InterviewScheduleViewerProps {
  scheduleMap: Record<string, TimeRange[]>;
  applicantMap: Record<string, InterviewScheduleItem[]>;
  duration: number;
}

export default function InterviewScheduleViewer({
  scheduleMap,
  applicantMap,
  duration,
}: InterviewScheduleViewerProps) {
  const dotApplicantMap = useMemo(() => {
    return Object.entries(applicantMap).reduce<
      Record<string, InterviewScheduleItem[]>
    >((acc, [rawDate, slots]) => {
      acc[rawDate.replace(/\//g, '.')] = slots;
      return acc;
    }, {});
  }, [applicantMap]);

  return (
    <Flex gap="0.4rem" direction="column" width="100%">
      <Text variant="md1_text_semibold" color="grayscale70">
        면접 가능 일정
      </Text>
      <Flex
        gap="6.4rem"
        justify="center"
        width="100%"
        style={{ marginTop: 16 }}
      >
        {Object.keys(scheduleMap).map((dateDot) => {
          const baseline = (scheduleMap[dateDot] ?? []).map(
            (s) =>
              ({
                date: dateDot,
                startTime: s.startTime,
                endTime: s.endTime,
              }) as InterviewScheduleItem
          );

          const applicant = dotApplicantMap[dateDot] ?? [];

          const title = safeFormatDotDate(
            dateDot.replace(/\./g, '-'),
            'yyyy년 MM월 dd일 (EEE)'
          );
          const hours = baseline.flatMap((s) => [
            parseToMin(s.startTime) / 60,
            parseToMin(s.endTime) / 60,
          ]);
          const startHour = Math.floor(Math.min(...hours));
          const endHour = Math.ceil(Math.max(...hours));
          const total = (endHour - startHour) * (60 / duration);

          //selectedRows: 지원자 슬롯과 겹치는 셀
          const selectedRows = Array.from({ length: total }, (_, row) => {
            const cellStart = startHour * 60 + row * duration;
            const cellEnd = cellStart + duration;
            return applicant.some((slot) => {
              const s = parseToMin(slot.startTime);
              const e = parseToMin(slot.endTime);
              return cellStart < e && cellEnd > s;
            });
          });

          return (
            <SelectableTimeTable
              key={dateDot}
              title={title}
              selectable={false}
              interval={duration}
              startHour={startHour}
              endHour={endHour}
              width="30rem"
              interviewSchedule={{ isSelected: true, scheduleList: baseline }}
              renderCell={(row) => {
                if (!selectedRows[row]) return null;

                return (
                  <div
                    key={row}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: vars.colors.primary20,
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />
                );
              }}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
