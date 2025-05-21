'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { timetableMock } from '@web/constants/timetable';
import { CellRenderer } from '../../../_components/CellRenders/CellRenderer';
import InviteModal from './@modal/(.)invite/page';
import { IcCalendar } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { useInterviewScheduleQuery } from '@web/store/query/useInterviewScheduleQuery';
import DateNav from '../../../_components/DateNav/DateNav';

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
  const ivParam = sp.get('interviewId');
  const interviewId = ivParam ? Number(ivParam) : undefined;

  const { data: schedules, isLoading } = useInterviewScheduleQuery(
    interviewId ?? 0
  );
  if (isLoading) return null;

  // placeholder: interviewId 없거나 아직 스케줄 없음
  if (!interviewId || !schedules?.length) {
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

  const dates = schedules.map((sch) => sch.date);
  const schedule = schedules.find((sch) => {
    // sch.date: "2025.05.21", date: "2025.05.21"
    if (sch.date === date) return true;
    // 혹시 URL이 하이픈 포맷일 수도 있으니
    return sch.date.replace(/\./g, '-') === date;
  });
  console.log('타임테이블', schedule);
  if (!schedule) return null;

  // DateNav 날짜 변경 핸들러
  const handleDateChange = (nextDate: string) => {
    router.replace(`/interview-management/timetable/${tab}/${nextDate}?${sp}`);
  };

  // 방별로 slots 그룹핑
  const rooms = schedule.roomNames;
  const roomsMap: Record<string, typeof schedule.timeSlots> = rooms.reduce(
    (acc, room) => {
      acc[room] = [];
      return acc;
    },
    {} as Record<string, typeof schedule.timeSlots>
  );

  schedule.timeSlots.forEach((ts) => {
    roomsMap[ts.roomName]!.push(ts);
  });

  const getWidth = rooms.length === 3 ? '31.3rem' : '51.45rem';
  const isAll = tab === 'all';

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
              slots={roomsMap[room]}
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
