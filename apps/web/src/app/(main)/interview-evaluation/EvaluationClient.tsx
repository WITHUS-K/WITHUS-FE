// src/app/(main)/interview-evaluation/EvaluationClient.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner, Flex } from '@repo/ui';
import { useOrganizationInterviewsQuery } from '@web/store/query/useOrganizationInterviewsQuery';
import { useMyTimeSlotsQuery } from '@web/store/query/useMyTimeSlotsQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export default function EvaluationClient() {
  const router = useRouter();
  const search = useSearchParams();
  const { organizationId } = getClientSideTokens();

  const urlIv = Number(search.get('interviewId') ?? '0') || undefined;
  const { data: orgs = [], isLoading: loadingOrgs } =
    useOrganizationInterviewsQuery(organizationId);
  const chosenId = urlIv ?? orgs[0]?.interviewId;
  const chosenOrg = orgs.find((o) => o.interviewId === chosenId) ?? orgs[0];
  const recId = chosenOrg?.recruitmentId;

  const { data: slots = [], isLoading: loadingSlots } = useMyTimeSlotsQuery({
    interviewId: chosenId ?? 0,
  });
  const hasSubmitted = slots.some((s) => s.hasSubmittedAvailability);

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (loadingOrgs || loadingSlots || chosenId == null) return;
    setRedirecting(true);

    const baseSchedule = `/interview-evaluation/schedule?interviewId=${chosenId}&recruitmentId=${recId}`;
    const dateParam = slots[0]?.date.replace(/\./g, '-');
    const baseTimetable =
      `/interview-evaluation/timetable/interviewer` +
      `?interviewId=${chosenId}&recruitmentId=${recId}` +
      (dateParam ? `&date=${dateParam}` : '');

    router.replace(hasSubmitted ? baseTimetable : baseSchedule);
  }, [loadingOrgs, loadingSlots, chosenId, slots, recId, router]);

  // 로딩/리다이렉팅 중엔 스피너
  if (loadingOrgs || loadingSlots || redirecting) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <Spinner size={64} strokeWidth={4} color="rgba(44, 96, 255, 0.7)" />
      </div>
    );
  }

  return null;
}
