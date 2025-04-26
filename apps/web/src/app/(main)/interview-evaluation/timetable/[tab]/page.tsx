// app/interview-evaluation/timetable/[tab]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { timetableDates, timetableMock } from '@web/constants/timetable';
import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CellRenderer, Tab } from '../../_components/CellRender/CellRenderer';

export default function TimetableTabPage() {
  const { tab = 'interviewer' } = useParams();
  const activeTab: Tab = tab === 'guide' ? 'guide' : 'interviewer';

  return (
    <Flex gap="6.4rem" justify="center" paddingBottom="4rem">
      {timetableDates.map((isoDate) => {
        const dt = parseISO(isoDate);
        const title = format(dt, 'yyyy년 MM월 dd일 (EEE)', { locale: ko });

        const day = timetableMock.find((d) => d.date === isoDate);
        if (!day || day.rooms.length === 0) return null;
        const room = day.rooms[0]!;

        return (
          <TimeTable
            key={isoDate}
            title={title}
            headers={
              activeTab === 'interviewer' ? ['지원자', '면접관'] : undefined
            }
            startHour={10}
            endHour={18}
            interval={30}
            slots={room.slots}
            width="40rem"
            renderCell={(row) => (
              <CellRenderer row={row} tab={activeTab} slotData={room.slots} />
            )}
          />
        );
      })}
    </Flex>
  );
}
