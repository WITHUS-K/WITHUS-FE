'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Flex, Text } from '@repo/ui';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { CellRenderer, Tab } from '../../_components/CellRender/CellRenderer';

export default function EvaluationTimetablePage() {
  const params = useParams();
  const sp = useSearchParams();

  const interviewId = Number(sp.get('interviewId') ?? '0');
  const tabParam = params.tab as Tab;
  const tab: Tab = tabParam === 'guide' ? 'guide' : 'interviewer';

  const { data: slots = [] } = useMyTimeSlotsQuery(interviewId);
  if (!slots.length) return <Text>배정된 시간이 없습니다.</Text>;

  // 날짜별 그룹핑
  const grouped = slots.reduce<Record<string, typeof slots>>((acc, slot) => {
    (acc[slot.date] = acc[slot.date] || []).push(slot);
    return acc;
  }, {});

  return (
    <Flex gap="6.4rem" justify="center" paddingBottom="4rem">
      {slots.map((schedule) => {
        const { date, startTime, endTime, timeSlots, interviewDuration } =
          schedule;

        const startHour = Number(startTime.split(':')[0]);
        const endHour = Number(endTime.split(':')[0]);

        return (
          <TimeTable
            key={date}
            title={`${date} (${tab === 'guide' ? '안내자' : '면접관'})`}
            headers={tab === 'interviewer' ? ['지원자', '면접관'] : undefined}
            startHour={startHour}
            endHour={endHour}
            interval={interviewDuration}
            slots={timeSlots}
            width="40rem"
            renderCell={(row) => (
              <CellRenderer
                date={date}
                row={row}
                tab={tab}
                slotData={timeSlots}
                startHour={startHour}
                interval={30}
              />
            )}
          />
        );
      })}
    </Flex>
  );
}
