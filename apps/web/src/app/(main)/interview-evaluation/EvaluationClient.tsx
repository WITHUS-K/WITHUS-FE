'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOrganizationInterviewsQuery } from '@web/store/query/useOrganizationInterviewsQuery';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export default function EvaluationClient() {
  const router = useRouter();
  const search = useSearchParams();
  const { organizationId } = getClientSideTokens();

  // URL에 이미 interviewId가 있으면 사용
  const urlIv = Number(search.get('interviewId') ?? '0') || undefined;

  // 조직 면접 목록 불러오기
  const { data: orgs = [], isLoading: loadingOrgs } =
    useOrganizationInterviewsQuery(organizationId);

  // 선택된 면접 정보 찾기 (URL or 첫 번째)
  const chosenId = urlIv ?? orgs[0]?.interviewId;
  const chosenOrg = orgs.find((o) => o.interviewId === chosenId) ?? orgs[0];
  const recruitmentId = chosenOrg?.recruitmentId;

  // 해당 면접의 내 시간 슬롯 불러오기
  const { data: slots = [], isLoading: loadingSlots } = useMyTimeSlotsQuery({
    interviewId: chosenId ?? 0,
  });

  // 타임테이블이 모두 빈 배열인지 체크
  const isAllEmpty = slots.every((d) => d.timeSlots.length === 0);

  useEffect(() => {
    if (loadingOrgs || chosenId == null) return;
    if (loadingSlots) return;

    const firstDate = slots[0]?.date;
    const dateParam = firstDate?.replace(/\./g, '-');

    // 빈 배열이면 스케줄 페이지로, 아니면 타임테이블 페이지로
    if (slots.length === 0) {
      router.replace(
        `/interview-evaluation/schedule?interviewId=${chosenId}` +
          `&recruitmentId=${recruitmentId}`
      );
    } else {
      router.replace(
        `/interview-evaluation/timetable/interviewer` +
          `?interviewId=${chosenId}` +
          `&recruitmentId=${recruitmentId}` +
          (dateParam ? `&date=${dateParam}` : '')
      );
    }
  }, [loadingOrgs, loadingSlots, chosenId, slots, router, recruitmentId]);

  return null;
}
