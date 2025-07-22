'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { CellRenderer } from '../../../_components/CellRenders/CellRenderer';
import InviteModal from './@modal/(.)invite/page';
import { IcCalendar } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { useInterviewScheduleQuery } from '@web/store/query/useInterviewScheduleQuery';
import DateNav from '../../../_components/DateNav/DateNav';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import {
  mapServerColorToTagHex,
  nameToHex1,
  tagColorMap,
} from '@web/utils/color';

export default function TimetableClient({
  showInvite,
}: {
  showInvite: boolean;
}) {
  const { tab, date } = useParams() as {
    tab: 'all' | 'interviewer' | 'applicant' | 'guide';
    date: string;
  };
  const sp = useSearchParams();
  const router = useRouter();
  const recruitmentId = Number(sp.get('recruitmentId'));
  const interviewId = Number(sp.get('interviewId') || '0');

  const { data: schedules = [], isLoading } = useInterviewScheduleQuery({
    interviewId,
  });
  if (isLoading) return null;

  // 같은 날짜끼리 하나로 합치기
  const mergedSchedules = useMemo(() => {
    type Sch = (typeof schedules)[number];
    const map: Record<
      string,
      {
        interviewDuration: number;
        roomNames: string[];
        startTime: string;
        endTime: string;
        timeSlots: Sch['timeSlots'];
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
        // 이미 있으면 병합
        const m = map[s.date]!;
        // 가장 이른 시작 시간
        if (s.startTime < m.startTime) m.startTime = s.startTime;
        // 가장 늦은 종료 시간
        if (s.endTime > m.endTime) m.endTime = s.endTime;
        // 중복 없이 방 이름 병합
        m.roomNames = Array.from(new Set([...m.roomNames, ...s.roomNames]));
        // 중복 없이 슬롯 병합 (JSON 직렬화 방식)
        m.timeSlots = Array.from(
          new Set(
            [...m.timeSlots, ...s.timeSlots].map((slot) => JSON.stringify(slot))
          )
        ).map((str) => JSON.parse(str) as (typeof s.timeSlots)[0]);
      }
    });

    // 날짜 키 순으로 정렬된 배열로 변환
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, ...v }));
  }, [schedules]);

  // placeholder: 스케줄이 없거나 interviewId 없으면 안내
  if (!interviewId || mergedSchedules.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        width="100%"
        height="100%"
        gap="2rem"
      >
        <IcCalendar width={48} height={48} />
        <Text variant="lg_subtitle_medium" color="grayscale30">
          동아리와 면접 조건을 설정한 후, 타임테이블을 생성하면 이곳에
          표시됩니다.
        </Text>
      </Flex>
    );
  }

  // 4) DateNav에 사용할 날짜 리스트
  const dates = mergedSchedules.map((sch) => sch.date);

  // 5) URL 또는 파라미터 date에 맞는 schedule 추출
  const schedule = mergedSchedules.find(
    (sch) => sch.date === date || sch.date.replace(/\./g, '-') === date
  )!;

  // 6) 방별로 timeSlots 그룹핑
  const rooms = schedule.roomNames;
  const roomsMap: Record<string, typeof schedule.timeSlots> = {};
  rooms.forEach((r) => (roomsMap[r] = []));
  schedule.timeSlots.forEach((ts) => {
    roomsMap[ts.roomName]?.push(ts);
  });

  // 7) 색상 매핑 준비
  const { data: positions = [] } = useRecruitmentPositionsQuery(recruitmentId);
  const serverColorToHex: Record<string, string> = Object.fromEntries(
    positions.map((p) => [p.color, mapServerColorToTagHex(p.color)])
  );

  // 8) 렌더링
  const getWidth = rooms.length === 3 ? '31.3rem' : '51.45rem';
  const isAll = tab === 'all';

  const handleDateChange = (nextDate: string) => {
    router.replace(`/interview-management/timetable/${tab}/${nextDate}?${sp}`);
  };

  return (
    <>
      {showInvite && <InviteModal />}
      <Flex
        gap="3.2rem"
        width="100%"
        direction="column"
        marginTop="4rem"
        align="center"
      >
        <DateNav dates={dates} active={date} onChange={handleDateChange} />

        <Flex gap="4rem" width="100%" justify="center">
          {rooms.map((room) => (
            <TimeTable
              key={room}
              title={room}
              headers={isAll ? ['지원자', '면접관', '안내자'] : undefined}
              startHour={Number(schedule.startTime.split(':')[0])}
              endHour={Number(schedule.endTime.split(':')[0])}
              interval={schedule.interviewDuration}
              slots={roomsMap[room]!.map((ts) => {
                // 지원자 파트 기반으로 색상 결정
                const posName = ts.applicants[0]?.positionName;
                const part = positions.find((p) => p.name === posName);
                const hex = part ? nameToHex1[part.color] : undefined;
                const bg = hex
                  ? tagColorMap[hex as keyof typeof tagColorMap].background
                  : '#F2F3F6';

                return {
                  ...ts,
                  color: bg,
                };
              })}
              width={getWidth}
              renderCell={(row) => (
                <CellRenderer
                  row={row}
                  tab={tab}
                  slotData={roomsMap[room]!}
                  startHour={Number(schedule.startTime.split(':')[0])}
                  interval={schedule.interviewDuration}
                />
              )}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
}
