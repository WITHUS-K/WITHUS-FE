'use client';

import React, { useState, useCallback } from 'react';
import { Text, Flex, Button } from '@repo/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useModal } from '@repo/ui/hooks';
import { useOrganizationInterviewsQuery } from '@web/store/query/useOrganizationInterviewsQuery';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import { useRegisterAvailabilitiesMutation } from '@web/store/mutation/useRegisterAvailabilitiesMutation';

interface Props {
  organizationId?: number;
  recruitmentId?: number;
  initialInterviewId?: string;
}

export default function ScheduleClient({ organizationId }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const { confirm } = useModal();
  const recruitmentIdParam = sp.get('recruitmentId');
  const recruitmentId = recruitmentIdParam
    ? Number(recruitmentIdParam)
    : undefined;
  // const { organizationId } = getClientSideTokens();
  // 쿼리에서 interviewId 가져오기
  const interviewIdParam = sp.get('interviewId');
  const interviewId = interviewIdParam ? Number(interviewIdParam) : undefined;

  // 1) 내 조직의 면접 목록 불러오기
  const { data: orgs = [], isLoading } = useOrganizationInterviewsQuery(
    organizationId!
  );
  console.log('면접', orgs);
  if (!orgs.length) return <Text>등록된 면접이 없습니다.</Text>;

  // 2) 선택된 인터뷰 결정 (쿼리에 없으면 첫 번째)
  const current = (orgs.find((o) => o.interviewId === interviewId) ?? orgs[0])!;

  const { availableTimeRanges, interviewDuration } = current;

  const dates = React.useMemo(
    () => Array.from(new Set(availableTimeRanges.map((r) => r.date))),
    [availableTimeRanges]
  );

  const scheduleMap = React.useMemo(() => {
    const map: Record<string, TimeRange[]> = {};
    availableTimeRanges.forEach(({ date, startTime, endTime }) => {
      map[date] ||= [];
      map[date]!.push({ startTime, endTime });
    });
    return map;
  }, [availableTimeRanges]);

  // 3) 선택된 시간 범위 상태
  const [selectedRanges, setSelectedRanges] = useState<TimeRange[]>([]);
  const registerMutation = useRegisterAvailabilitiesMutation(
    current.interviewId
  );

  // 콜백도 배열 받기
  const handleSelectionChange = useCallback((ranges: TimeRange[]) => {
    setSelectedRanges(ranges);
  }, []);

  // 4) 저장: confirm 모달 안에서 mutate 호출
  const handleSave = () => {
    if (selectedRanges.length === 0) return;

    confirm({
      type: 'info',
      description: '입력하신 면접 가능 시간을 저장하시겠습니까?',
      cancelText: '취소',
      confirmText: '저장',
      onConfirm: () => {
        const slots: string[] = [];

        const date = dates[0];
        const dateIso = date!.replace(/\./g, '-');

        for (const { startTime, endTime } of selectedRanges) {
          const start = new Date(`${dateIso}T${startTime}:00`);
          const end = new Date(`${dateIso}T${endTime}:00`);
          const step = interviewDuration * 60 * 1000;
          let cursor = start.getTime();
          while (cursor < end.getTime()) {
            slots.push(format(new Date(cursor), "yyyy-MM-dd'T'HH:mm:ss"));
            cursor += step;
          }
        }

        registerMutation.mutate(
          { availableTimes: slots },
          {
            onSuccess: () => {
              console.log('가능한 시간', slots);
              router.replace(
                `/interview-evaluation/timetable/interviewer` +
                  `?interviewId=${current.interviewId}` +
                  `&recruitmentId=${recruitmentId}`
              );
            },
          }
        );
      },
    });
  };

  return (
    <Flex
      direction="column"
      gap="4rem"
      width="100%"
      align="center"
      paddingBottom="6rem"
      paddingTop="4rem"
    >
      <Flex gap="6.4rem" width="100%" justify="center">
        {dates.map((date) => {
          const slots = scheduleMap[date];

          const label = format(
            parseISO(date.replace(/\./g, '-')),
            'yyyy-MM-dd (EEE)',
            { locale: ko }
          );

          // 테이블 전체 시간 범위 (가장 빠른 시작 ~ 가장 늦은 끝)
          const hours = slots!.flatMap((s) => [
            Number(s.startTime.split(':')[0]),
            Number(s.endTime.split(':')[0]),
          ]);
          const startHour = Math.min(...hours);
          const endHour = Math.max(...hours);

          return (
            <SelectableTimeTable
              key={date}
              title={label}
              startHour={startHour}
              endHour={endHour}
              interval={interviewDuration}
              selectable
              width="40rem"
              interviewSchedule={{
                isSelected: true,
                scheduleList: slots!.map((slot) => ({
                  date,
                  startTime: slot.startTime,
                  endTime: slot.endTime,
                })),
              }}
              onSelectionChange={handleSelectionChange}
            />
          );
        })}
      </Flex>

      <Button
        variant="main"
        size="48"
        disabled={!selectedRanges.length}
        onClick={handleSave}
        width="24rem"
      >
        저장
      </Button>
    </Flex>
  );
}
