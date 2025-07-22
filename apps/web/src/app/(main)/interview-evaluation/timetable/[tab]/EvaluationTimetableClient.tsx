'use client';

import React, { useMemo } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { Flex, Text } from '@repo/ui';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { CellRenderer, Tab } from '../../_components/CellRender/CellRenderer';
import DateNav from '@web/app/(main)/interview-management/_components/DateNav/DateNav';

interface Props {
  tab: Tab;
  interviewId: number;
  date?: string;
}

export default function EvaluationTimetableClient({
  tab,
  interviewId,
  date: initialDate,
}: Props) {
  const router = useRouter();

  // 서버 컴포넌트에서 내려준 date가 없으면 URL에서 가져오기
  const rawDate =
    initialDate ?? new URLSearchParams(window.location.search).get('date')!;
  const activeDate = rawDate.includes('-')
    ? rawDate.replace(/-/g, '.')
    : rawDate;
  const { data: schedules = [], isLoading } = useMyTimeSlotsQuery({
    interviewId,
  });
  if (isLoading) return null;

  // 일치하는 스케줄 찾기
  const schedule = schedules.find((s) => s.date === activeDate);
  if (!schedule) {
    return <Text>해당 날짜({activeDate})에 배정된 일정이 없습니다.</Text>;
  }

  // 방별로 그룹핑
  const { roomNames, timeSlots, startTime, endTime, interviewDuration } =
    schedule;
  const roomsMap = useMemo(() => {
    return roomNames.reduce<Record<string, typeof timeSlots>>((acc, room) => {
      acc[room] = timeSlots.filter((ts) => ts.roomName === room);
      return acc;
    }, {});
  }, [roomNames, timeSlots]);

  // 날짜 이동
  const handleDateChange = (nextDate: string) => {
    const norm = nextDate.replace(/\./g, '-');
    router.replace(
      `/interview-evaluation/timetable/${tab}` +
        `?interviewId=${interviewId}&date=${norm}`
    );
  };

  return (
    <Flex direction="column" align="center" gap="4rem" width="100%">
      <DateNav
        dates={schedules.map((s) => s.date)}
        active={activeDate!}
        onChange={handleDateChange}
      />

      <Flex gap="4rem" justify="center" width="100%">
        {roomNames.map((room) => (
          <TimeTable
            key={room}
            title={room}
            headers={tab === 'interviewer' ? ['지원자', '면접관'] : undefined}
            startHour={Number(startTime.split(':')[0])}
            endHour={Number(endTime.split(':')[0])}
            interval={interviewDuration}
            slots={roomsMap[room]!}
            width={roomNames.length === 3 ? '31.3rem' : '40rem'}
            renderCell={(row) => (
              <CellRenderer
                date={schedule.date}
                row={row}
                tab={tab}
                slotData={roomsMap[room]!}
                startHour={Number(startTime.split(':')[0])}
                interval={interviewDuration}
              />
            )}
          />
        ))}
      </Flex>
    </Flex>
  );
}
