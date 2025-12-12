'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { CellRenderer } from '../../../_components/CellRenders/CellRenderer';
import InviteModal from './@modal/(.)invite/page';
import { IcCalendar } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import {
  TimeSlot,
  useInterviewScheduleQuery,
} from '@web/store/query/useInterviewScheduleQuery';
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
        const m = map[s.date]!;
        if (s.startTime < m.startTime) m.startTime = s.startTime;
        if (s.endTime > m.endTime) m.endTime = s.endTime;
        m.roomNames = Array.from(new Set([...m.roomNames, ...s.roomNames]));
        m.timeSlots = Array.from(
          new Set(
            [...m.timeSlots, ...s.timeSlots].map((slot) => JSON.stringify(slot))
          )
        ).map((str) => JSON.parse(str) as (typeof s.timeSlots)[0]);
      }
    });

    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, ...v }));
  }, [schedules]);

  // 스케줄이 없거나 interviewId 없으면 placeholder
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
        <Flex direction="column" align="center" justify="center" width="100%">
          <Text variant="lg_subtitle_medium" color="grayscale30">
            동아리와 면접 조건을 설정한 후,
          </Text>
          <Text variant="lg_subtitle_medium" color="grayscale30">
            타임테이블을 생성하면 이곳에 표시됩니다.
          </Text>
        </Flex>
      </Flex>
    );
  }

  // DateNav에 사용할 날짜 리스트
  const dates = mergedSchedules.map((sch) => sch.date);

  // URL 또는 파라미터 date에 맞는 schedule 추출
  const schedule = mergedSchedules.find(
    (sch) => sch.date === date || sch.date.replace(/\./g, '-') === date
  )!;

  // timeSlots 중복 방+시간대 병합 후 applicants 중복 제거
  const dedupedTimeSlots = useMemo(() => {
    const keyed: Record<string, TimeSlot> = {};

    schedule.timeSlots.forEach((ts) => {
      const key = `${ts.roomName}_${ts.startTime}`;
      if (!keyed[key]) {
        // 배열 복사
        keyed[key] = {
          ...ts,
          applicants: [...ts.applicants],
          interviewers: [...ts.interviewers],
          assistants: [...ts.assistants],
        };
      } else {
        keyed[key]!.applicants.push(...ts.applicants);
        keyed[key]!.interviewers.push(...ts.interviewers);
        keyed[key]!.assistants.push(...ts.assistants);
      }
    });

    // 아이디 기준으로 중복 제거
    return Object.values(keyed).map((slot) => ({
      ...slot,
      applicants: Array.from(
        new Map(slot.applicants.map((a) => [a.applicationId, a])).values()
      ),
      interviewers: Array.from(
        new Map(slot.interviewers.map((i) => [i.userId, i])).values()
      ),
      assistants: Array.from(
        new Map(slot.assistants.map((a) => [a.userId, a])).values()
      ),
    }));
  }, [schedule.timeSlots]);

  // 방별로 timeSlots 그룹핑
  const rooms = schedule.roomNames;
  const roomsMap: Record<string, typeof dedupedTimeSlots> = {};
  rooms.forEach((r) => (roomsMap[r] = []));
  dedupedTimeSlots.forEach((ts) => roomsMap[ts.roomName]?.push(ts));

  // 색상 매핑
  const { data: positions = [] } = useRecruitmentPositionsQuery(recruitmentId);
  const serverColorToHex: Record<string, string> = Object.fromEntries(
    positions.map((p) => [p.color, mapServerColorToTagHex(p.color)])
  );

  // 렌더링
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
                const posName = ts.applicants[0]?.organizationRoleName;
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
