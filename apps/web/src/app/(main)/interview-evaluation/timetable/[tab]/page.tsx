'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Flex, Text } from '@repo/ui';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { CellRenderer, Tab } from '../../_components/CellRender/CellRenderer';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo } from 'react';

export default function EvaluationTimetablePage() {
  const params = useParams();
  const sp = useSearchParams();

  const interviewId = Number(sp.get('interviewId') ?? '0');
  const tabParam = params.tab as Tab;
  const tab: Tab = tabParam === 'guide' ? 'guide' : 'interviewer';

  const { data: slots = [] } = useMyTimeSlotsQuery(interviewId);
  console.log('내 배정', slots);
  if (!slots.length) return <Text>배정된 시간이 없습니다.</Text>;

  const schedulesByDate = useMemo(() => {
    return slots.reduce<Record<string, typeof slots>>((map, schedule) => {
      map[schedule.date] = map[schedule.date] ?? [];
      map[schedule.date]!.push(schedule);
      return map;
    }, {});
  }, [slots]);

  // 날짜별 그룹핑
  const grouped = slots.reduce<Record<string, typeof slots>>((acc, slot) => {
    (acc[slot.date] = acc[slot.date] || []).push(slot);
    return acc;
  }, {});

  return (
    <Flex gap="6.4rem" justify="center" paddingBottom="4rem">
      {Object.entries(schedulesByDate).map(([date, group]) => {
        // group: 해당 날짜에 속한 여러 schedule 객체
        // timeSlots는 schedule.timeSlots 배열이므로 모두 합칩니다
        const allTimeSlots = group.flatMap((s) => s.timeSlots);

        // 시작 시간(hour)과 종료 시간(hour)
        const startHour = Math.min(
          ...group.map((s) => Number(s.startTime.split(':')[0]))
        );
        const endHour = Math.max(
          ...group.map((s) => Number(s.endTime.split(':')[0]))
        );

        // 날짜 포맷
        const formattedDate = format(
          new Date(date.replace(/\./g, '-')),
          'yyyy년 MM월 dd일 (EEE)',
          { locale: ko }
        );

        // 인터벌은 모든 schedule이 동일하다고 가정
        const interval = group[0]!.interviewDuration;

        return (
          <TimeTable
            key={date}
            title={formattedDate}
            headers={tab === 'interviewer' ? ['지원자', '면접관'] : undefined}
            startHour={startHour}
            endHour={endHour}
            interval={interval}
            slots={allTimeSlots}
            width="40rem"
            renderCell={(row) => (
              <CellRenderer
                date={date}
                row={row}
                tab={tab}
                slotData={allTimeSlots}
                startHour={startHour}
                interval={interval}
              />
            )}
          />
        );
      })}
    </Flex>
  );
}
