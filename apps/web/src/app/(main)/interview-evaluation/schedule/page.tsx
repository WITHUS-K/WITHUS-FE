// app/(main)/interview-evaluation/schedule/page.tsx
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

export default function SchedulePage() {
  const router = useRouter();
  const sp = useSearchParams();
  const { confirm } = useModal();

  // 쿼리에서 interviewId 가져오기
  const interviewIdParam = sp.get('interviewId');
  const interviewId = interviewIdParam ? Number(interviewIdParam) : undefined;

  // 1) 내 조직의 면접 목록 불러오기
  const { data: orgs = [], isLoading } = useOrganizationInterviewsQuery();
  console.log(orgs);
  if (isLoading) return <Text>로딩 중…</Text>;
  if (!orgs.length) return <Text>등록된 면접이 없습니다.</Text>;

  // 2) 선택된 인터뷰 결정 (쿼리에 없으면 첫 번째)
  const current = (orgs.find((o) => o.interviewId === interviewId) ?? orgs[0])!;

  const { availableTimeRanges, interviewDuration } = current;

  // 3) 선택된 시간 범위 상태
  const [selectedRange, setSelectedRange] = useState<TimeRange | null>(null);
  const registerMutation = useRegisterAvailabilitiesMutation(
    current.interviewId
  );

  const handleRangeSelect = useCallback((range: TimeRange | null) => {
    setSelectedRange(range);
  }, []);

  // 4) 저장: confirm 모달 안에서 mutate 호출
  const handleSave = () => {
    if (!selectedRange) return;

    confirm({
      type: 'info',
      description: '입력하신 면접 가능 시간을 저장하시겠습니까?',
      cancelText: '취소',
      confirmText: '저장',
      onConfirm: () => {
        const slots: string[] = [];

        // 모든 날짜 순회
        for (const range of availableTimeRanges) {
          const dateIso = range.date.replace(/\./g, '-'); // "2025.05.20" -> "2025-05-20"
          const start = new Date(`${dateIso}T${selectedRange.startTime}:00`);
          const end = new Date(`${dateIso}T${selectedRange.endTime}:00`);
          const durationMs = interviewDuration * 60 * 1000;

          let cursor = start.getTime();
          while (cursor < end.getTime()) {
            slots.push(format(new Date(cursor), "yyyy-MM-dd'T'HH:mm:ss"));
            cursor += durationMs;
          }
        }

        registerMutation.mutate(
          { availableTimes: slots },
          {
            onSuccess: () => {
              console.log('가능한 시간', slots);
              router.replace(
                `/interview-evaluation/timetable/interviewer?interviewId=${current.interviewId}`
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
        {availableTimeRanges.map((r) => {
          const label = format(
            parseISO(r.date.replace(/\./g, '-')),
            'yyyy-MM-dd (EEE)',
            { locale: ko }
          );
          return (
            <SelectableTimeTable
              key={r.id}
              title={label}
              startHour={Number(r.startTime.split(':')[0])}
              endHour={Number(r.endTime.split(':')[0])}
              interval={interviewDuration}
              onRangeSelect={handleRangeSelect}
              selectable
              width="40rem"
            />
          );
        })}
      </Flex>

      <Button
        variant="main"
        size="48"
        disabled={!selectedRange}
        onClick={handleSave}
        width="24rem"
      >
        저장
      </Button>
    </Flex>
  );
}
