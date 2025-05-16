'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Flex, Text } from '@repo/ui';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { CellRenderer, Tab } from '../../_components/CellRender/CellRenderer';

export default function EvaluationTimetablePage() {
  const params = useParams();
  const sp = useSearchParams();

  // 1) query에서 interviewId 가져오기
  const interviewId = Number(sp.get('interviewId') ?? '0');

  // 2) URL 파라미터 tab
  const tabParam = params.tab as Tab;
  const tab: Tab = tabParam === 'guide' ? 'guide' : 'interviewer';

  // 3) 내 할당된 타임슬롯 조회
  const { data: slots = [] } = useMyTimeSlotsQuery(interviewId);

  if (!slots.length) return <Text>배정된 시간이 없습니다.</Text>;

  // 4) 날짜별로 그룹핑
  const byDate = slots.reduce<Record<string, typeof slots>>((acc, s) => {
    (acc[s.date] = acc[s.date] || []).push(s);
    return acc;
  }, {});

  return (
    <Flex gap="6.4rem" justify="center" paddingBottom="4rem">
      {Object.entries(byDate).map(([date, list]) => {
        // 날짜 레이블

        const isoDateStr = date.replace(/\./g, '-'); // "2025-05-20"
        const dt = parseISO(isoDateStr);
        if (isNaN(dt.getTime())) return null; // 혹시 모를 에러 방어
        const title = format(dt, 'yyyy-MM-dd (EEE)', { locale: ko });

        // 슬롯 간격 계산 (분 단위)
        const startMs = parseISO(
          `${isoDateStr}T${list[0]!.startTime}:00`
        ).getTime();
        const endMs = parseISO(
          `${isoDateStr}T${list[0]!.endTime}:00`
        ).getTime();
        const interval = (endMs - startMs) / 60000;

        // TimeTable이 기대하는 형태로 변환
        const timeSlots = list.map((s, i) => ({
          date: s.date,
          roomName: s.roomName,
          startTime: s.startTime,
          endTime: s.endTime,
          applicants: s.applicants,
          interviewers: s.interviewers,
          assistants: s.assistants,
          timeSlotId: i, // 고유 식별자는 인덱스로 대체
          color: '#FFE6E9', // 원하는 배경색
        }));

        return (
          <TimeTable
            key={date}
            title={title}
            headers={tab === 'interviewer' ? ['지원자', '면접관'] : undefined}
            startHour={10}
            endHour={18}
            interval={30}
            slots={timeSlots}
            width="40rem"
            renderCell={(row) => (
              <CellRenderer
                date={date}
                row={row}
                tab={tab}
                slotData={timeSlots}
                startHour={Number(list[0]!.startTime.split(':')[0])}
                interval={interval}
              />
            )}
          />
        );
      })}
    </Flex>
  );
}
