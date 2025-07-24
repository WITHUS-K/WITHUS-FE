'use client';

import React, { useEffect, useMemo } from 'react';
import {
  useSearchParams,
  useRouter,
  useParams,
  usePathname,
} from 'next/navigation';
import { Flex, Text } from '@repo/ui';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { CellRenderer, Tab } from '../../_components/CellRender/CellRenderer';
import DateNav from '@web/app/(main)/interview-management/_components/DateNav/DateNav';
import { IcSchedule } from '@repo/ui/icons/colored';

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
  const pathname = usePathname()!;
  const recruitmentIdParam = sp.get('recruitmentId');
  const recruitmentId = recruitmentIdParam
    ? Number(recruitmentIdParam)
    : undefined;

  const { data: schedules = [], isLoading } = useMyTimeSlotsQuery({
    interviewId,
  });
  console.log('스케줄', schedules);

  // 날짜별로 머지된 스케줄 계산
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

  const dates = mergedSchedules.map((s) => s.date);

  const rawQueryDate = initialDate ?? sp.get('date');
  // 2) 만약 둘 다 없으면, 첫 번째 날짜를 기본(fallback)으로 사용
  const fallbackDate = dates[0] || ''; // schedules 가 비어있으면 빈 문자열
  const rawDate = rawQueryDate ?? fallbackDate;
  // 3) rawDate 가 반드시 문자열이니 안전하게 replace
  const activeDate = rawDate.includes('-')
    ? rawDate.replace(/-/g, '.')
    : rawDate;

  /*const activeDate = rawDate.includes('-')
    ? rawDate.replace(/-/g, '.')
    : rawDate;*/

  const hasAnySlot = schedules.some((s) => s.timeSlots.length > 0);

  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    const desired = hasAnySlot ? 'true' : 'false';
    if (params.get('hasSlots') !== desired) {
      params.set('hasSlots', desired);
      if (recruitmentId) params.set('recruitmentId', String(recruitmentId));
      if (initialDate || sp.get('date')) {
        params.set(
          'date',
          (initialDate ?? sp.get('date')!).replace(/\./g, '-')
        );
      }
      params.set('interviewId', String(interviewId));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [
    hasAnySlot,
    pathname,
    recruitmentId,
    initialDate,
    interviewId,
    router,
    sp,
  ]);

  const schedule = mergedSchedules.find((s) => s.date === activeDate)!;

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

  return (
    <>
      {!hasAnySlot ? (
        <Flex
          width="100%"
          height="100%"
          direction="column"
          align="center"
          justify="center"
          gap="2rem"
          marginTop="10rem"
        >
          <IcSchedule width={120} height={120} />
          <Text
            variant="lg_subtitle_medium"
            color="grayscale90"
          >{`스케줄을 검토중입니다.\n조금만 기다려주세요.`}</Text>
        </Flex>
      ) : (
        <Flex direction="column" align="center" gap="4rem" width="100%">
          <DateNav
            dates={dates}
            active={activeDate}
            onChange={handleDateChange}
          />

          <Flex gap="4rem" justify="center" width="100%">
            {schedule.roomNames.map((room) => {
              const { startTime, endTime, interviewDuration } = schedule;
              const startHour = Number(startTime.split(':')[0]);
              const endHour = Number(endTime.split(':')[0]);

              return (
                <TimeTable
                  key={room}
                  title={room}
                  headers={
                    tab === 'interviewer' ? ['지원자', '면접관'] : undefined
                  }
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
      )}
    </>
  );
}
