'use client';

import React, { useEffect } from 'react';
import { Text } from '@repo/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOrganizationInterviewsQuery } from '@web/store/query/useOrganizationInterviewsQuery';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';

export default function EvaluationPage() {
  const router = useRouter();
  const search = useSearchParams();

  // URL에 이미 interviewId가 있으면 사용, 아니면 조직 첫 면접의 ID를 나중에 결정
  const urlIv = Number(search.get('interviewId') ?? '0') || undefined;

  const { data: orgs = [], isLoading: loadingOrgs } =
    useOrganizationInterviewsQuery();

  const chosenId = urlIv ?? orgs[0]?.interviewId;

  const { data: slots = [], isLoading: loadingSlots } = useMyTimeSlotsQuery(
    chosenId ?? 0
  );

  const isAllEmpty = slots.every((d) => d.timeSlots.length === 0);

  useEffect(() => {
    if (loadingOrgs || chosenId == null) return;
    if (loadingSlots) return;

    // 빈 배열이면 스케줄 페이지로, 아니면 타임테이블 페이지로
    if (isAllEmpty) {
      router.replace(`/interview-evaluation/schedule?interviewId=${chosenId}`);
    } else {
      router.replace(
        `/interview-evaluation/timetable/interviewer?interviewId=${chosenId}`
      );
    }
  }, [loadingOrgs, loadingSlots, chosenId, slots, router]);

  if (loadingOrgs || loadingSlots) {
    return <Text>로딩 중…</Text>;
  }

  if (!orgs.length) {
    return <Text>등록된 면접이 없습니다.</Text>;
  }

  return null;
}
