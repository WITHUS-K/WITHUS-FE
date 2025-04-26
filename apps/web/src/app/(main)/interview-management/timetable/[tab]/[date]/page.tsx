'use client';

import { useParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { timetableMock } from '@web/constants/timetable';
import { CellRenderer } from '../../../_components/CellRenders/CellRenderer';

export default function TimetablePageClient() {
  const { tab = 'all', date } = useParams();

  const timetable = timetableMock.find((t) => t.date === date);
  if (!timetable) return null;

  const getWidth = (count: number) => (count === 3 ? '31.3rem' : '51.45rem');
  const isAllTab = tab === 'all';

  return (
    <Flex gap="4rem">
      {timetable.rooms.map((room, i) => (
        <TimeTable
          key={room.name}
          title={room.name}
          headers={isAllTab ? ['지원자', '면접관', '안내자'] : undefined}
          startHour={10}
          endHour={18}
          interval={30}
          slots={room.slots}
          width={getWidth(timetable.rooms.length)}
          renderCell={(row) => (
            <CellRenderer row={row} tab={tab as any} slotData={room.slots} />
          )}
        />
      ))}
    </Flex>
  );
}
