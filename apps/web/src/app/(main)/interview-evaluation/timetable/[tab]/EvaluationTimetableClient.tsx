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

  // 1) schedule 원본
  const { data: schedules = [], isLoading } = useMyTimeSlotsQuery({
    interviewId,
  });
  console.log('스케줄', schedules);

  // 로딩 중
  if (isLoading) return null;
  if (schedules.length === 0) return <Text>등록된 일정이 없습니다.</Text>;

  // 2) 날짜별로 머지된 스케줄 계산
  const mergedSchedules = useMemo(() => {
    const map: Record<
      string,
      {
        interviewDuration: number;
        roomNames: string[];
        startTime: string;
        endTime: string;
        timeSlots: (typeof schedules)[number]['timeSlots'];
      }
    > = {};

    schedules.forEach((s) => {
      if (!map[s.date]) {
        map[s.date] = {
          interviewDuration: s.interviewDuration,
          roomNames: [...s.roomNames],
          startTime: s.startTime,
          endTime: s.endTime,
          timeSlots: [...s.timeSlots],
        };
      } else {
        const m = map[s.date]!;
        // 가장 이른 시작 시간
        if (s.startTime < m.startTime) m.startTime = s.startTime;
        // 가장 늦은 종료 시간
        if (s.endTime > m.endTime) m.endTime = s.endTime;
        // roomNames 합치기
        m.roomNames = Array.from(new Set([...m.roomNames, ...s.roomNames]));
        // timeSlots 합치기
        m.timeSlots = [...m.timeSlots, ...s.timeSlots];
      }
    });

    // 날짜 정렬해서 배열로
    return Object.entries(map)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, v]) => ({ date, ...v }));
  }, [schedules]);

  // 3) DateNav에서 사용할 날짜 리스트
  const dates = mergedSchedules.map((s) => s.date);

  // 4) activeDate에 해당하는 merged schedule 찾기
  const schedule = mergedSchedules.find((s) => s.date === activeDate)!;

  // 5) room 별 slot map
  const roomsMap = useMemo(() => {
    return schedule.roomNames.reduce<Record<string, typeof schedule.timeSlots>>(
      (acc, room) => {
        acc[room] = schedule.timeSlots.filter((ts) => ts.roomName === room);
        return acc;
      },
      {}
    );
  }, [schedule]);

  // 날짜 변경 핸들러
  const handleDateChange = (nextDate: string) => {
    const norm = nextDate.replace(/\./g, '-');
    router.replace(
      `/interview-evaluation/timetable/${tab}` +
        `?interviewId=${interviewId}` +
        (recruitmentId ? `&recruitmentId=${recruitmentId}` : '') +
        `&date=${norm}`
    );
  };

  // 6) 렌더링
  return (
    <Flex direction="column" align="center" gap="4rem" width="100%">
      <DateNav dates={dates} active={activeDate} onChange={handleDateChange} />

      <Flex gap="4rem" justify="center" width="100%">
        {schedule.roomNames.map((room) => {
          const { startTime, endTime, interviewDuration } = schedule;
          const startHour = Number(startTime.split(':')[0]);
          const endHour = Number(endTime.split(':')[0]);

          return (
            <TimeTable
              key={room}
              title={room}
              headers={tab === 'interviewer' ? ['지원자', '면접관'] : undefined}
              startHour={startHour}
              endHour={endHour}
              interval={interviewDuration}
              slots={roomsMap[room]!}
              width={schedule.roomNames.length === 3 ? '31.3rem' : '40rem'}
              renderCell={(row) => (
                <CellRenderer
                  date={schedule.date}
                  row={row}
                  tab={tab}
                  slotData={roomsMap[room]!}
                  startHour={startHour}
                  interval={interviewDuration}
                />
              )}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
