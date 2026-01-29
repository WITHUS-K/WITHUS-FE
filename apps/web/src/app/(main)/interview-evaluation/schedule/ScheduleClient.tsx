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
import { IcSchedule } from '@repo/ui/icons/colored';

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

  const interviewIdParam = sp.get('interviewId');
  const interviewId = interviewIdParam ? Number(interviewIdParam) : undefined;

  const { data: orgs = [], isLoading } = useOrganizationInterviewsQuery(
    organizationId!
  );

  if (isLoading) return <Text>로딩 중...</Text>;
  if (!orgs.length) return <Text>등록된 면접이 없습니다.</Text>;

  // 선택된 인터뷰 결정 (쿼리에 없으면 첫 번째)
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

  // ✅ 날짜별 선택 상태: { [date]: TimeRange[] }
  const [selectedByDate, setSelectedByDate] = useState<
    Record<string, TimeRange[]>
  >({});

  const registerMutation = useRegisterAvailabilitiesMutation(
    current.interviewId
  );

  // ✅ 날짜를 받아서 해당 날짜의 선택값만 업데이트
  const handleSelectionChangeByDate = useCallback(
    (date: string, ranges: TimeRange[]) => {
      setSelectedByDate((prev) => ({
        ...prev,
        [date]: ranges,
      }));
    },
    []
  );

  // ✅ 하나라도 선택돼 있으면 저장 가능
  const hasAnySelection = Object.values(selectedByDate).some(
    (ranges) => ranges.length > 0
  );

  const handleSave = () => {
    if (!hasAnySelection) return;

    confirm({
      type: 'info',
      description: '입력하신 면접 가능 시간을 저장하시겠습니까?',
      cancelText: '취소',
      confirmText: '저장',
      onConfirm: () => {
        const slots: string[] = [];
        const step = interviewDuration * 60 * 1000;

        // ✅ 날짜별로 ISO datetime 생성
        for (const [date, ranges] of Object.entries(selectedByDate)) {
          if (!ranges.length) continue;

          const dateIso = date.replace(/\./g, '-');

          for (const { startTime, endTime } of ranges) {
            const start = new Date(`${dateIso}T${startTime}:00`);
            const end = new Date(`${dateIso}T${endTime}:00`);

            let cursor = start.getTime();
            while (cursor < end.getTime()) {
              slots.push(format(new Date(cursor), "yyyy-MM-dd'T'HH:mm:ss"));
              cursor += step;
            }
          }
        }

        registerMutation.mutate(
          { availableTimes: slots },
          {
            onSuccess: () => {
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
    <>
      {orgs.length === 0 ? (
        <Flex
          width="100%"
          align="center"
          justify="center"
          direction="column"
          gap="2rem"
          height="100%"
          marginTop="10rem"
        >
          <IcSchedule width={120} height={120} />
          <Text variant="lg_subtitle_medium" color="grayscale90">
            등록된 면접 일정이 없습니다.
          </Text>
        </Flex>
      ) : (
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
                  // ✅ 이 날짜 테이블의 선택값만 업데이트
                  onSelectionChange={(ranges) =>
                    handleSelectionChangeByDate(date, ranges)
                  }
                />
              );
            })}
          </Flex>

          <Button
            variant="main"
            size="48"
            disabled={!hasAnySelection}
            onClick={handleSave}
            width="24rem"
          >
            저장
          </Button>
        </Flex>
      )}
    </>
  );
}
