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
  const sp = useSearchParams();
  const recruitmentIdParam = sp.get('recruitmentId');
  const recruitmentId = recruitmentIdParam
    ? Number(recruitmentIdParam)
    : undefined;

  // URL or SSR로부터 받은 date
  const rawDate = initialDate ?? sp.get('date')!;
  const activeDate = rawDate.includes('-')
    ? rawDate.replace(/-/g, '.')
    : rawDate;

  // 가장 먼저 절대 빠지지 않게 훅 호출
  const { data: schedules = [], isLoading } = useMyTimeSlotsQuery({
    interviewId,
  });

  // 스케줄 찾기
  const schedule = schedules.find((s) => s.date === activeDate);

  // useMemo도 무조건 호출돼야 함
  const roomsMap = useMemo(() => {
    if (!schedule) return {};
    return schedule.roomNames.reduce<Record<string, typeof schedule.timeSlots>>(
      (acc, room) => {
        acc[room] = schedule.timeSlots.filter((ts) => ts.roomName === room);
        return acc;
      },
      {}
    );
  }, [schedule]);

  // 로딩 중엔 null
  if (isLoading) return null;
  // 일정이 없으면 메세지
  if (!schedule) {
    return <Text>해당 날짜({activeDate})에 배정된 일정이 없습니다.</Text>;
  }

  // schedule이 확실할 때만 꺼내 쓰기
  const { roomNames, timeSlots, startTime, endTime, interviewDuration } =
    schedule;

  const handleDateChange = (nextDate: string) => {
    const norm = nextDate.replace(/\./g, '-');
    router.replace(
      `/interview-evaluation/timetable/${tab}` +
        `?interviewId=${interviewId}` +
        (recruitmentId ? `&recruitmentId=${recruitmentId}` : '') +
        `&date=${norm}`
    );
  };

  return (
    <Flex direction="column" align="center" gap="4rem" width="100%">
      <DateNav
        dates={schedules.map((s) => s.date)}
        active={activeDate}
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
