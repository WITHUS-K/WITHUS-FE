// src/app/(main)/interview-evaluation/timetable/[tab]/[date]/application/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import {
  getTimeSlotApplicationsQueryOptions,
  type TimeSlotApplicationsParams,
} from '@web/store/query/useTimeSlotApplicationsQuery';
import ApplicantDetailClient from './ApplicantDetailClient';

interface PageProps {
  params: Promise<{ tab: string; id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { tab, id: tsIdStr } = await params;
  const timeSlotId = tsIdStr ? Number(tsIdStr) : NaN;
  if (isNaN(timeSlotId) || timeSlotId <= 0) {
    return notFound();
  }

  // 서버 토큰
  const { accessToken, refreshToken } = await getServerSideTokens();
  const tokens = { accessToken, refreshToken };

  // SSR prefetch: 해당 타임슬롯의 지원서 목록
  const appsOptions = getTimeSlotApplicationsQueryOptions({
    timeSlotId,
    tokens,
  } as TimeSlotApplicationsParams);

  return (
    <ServerFetchBoundary fetchOptions={appsOptions}>
      <ApplicantDetailClient timeSlotId={timeSlotId} />
    </ServerFetchBoundary>
  );
}
