// src/app/(main)/interview-management/timetable/[tab]/[date]/application/[time]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import {
  getTimeSlotApplicationsQueryOptions,
  type TimeSlotApplicationsParams,
} from '@web/store/query/useTimeSlotApplicationsQuery';
import {
  getRecruitmentDetailQueryOptions,
  type RecruitmentDetailParams,
} from '@web/store/query/useRecruitmentDetailQuery';
import ApplicantDetailClient from './ApplicantDetailClient';

interface PageProps {
  // Promise 형태로 받도록 변경
  params: Promise<{
    tab: string;
    date: string;
    time: string;
  }>;
  searchParams: Promise<{
    recruitmentId?: string;
    timeSlotId?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  // await 해서 실제 값을 꺼내줍니다
  const { tab, date, time } = await params;
  const { recruitmentId: recIdStr, timeSlotId: tsIdStr } = await searchParams;

  const recruitmentId = recIdStr ? Number(recIdStr) : NaN;
  const timeSlotId = tsIdStr ? Number(tsIdStr) : NaN;

  if (isNaN(recruitmentId) || isNaN(timeSlotId)) {
    return notFound();
  }

  const tokens = await getServerSideTokens();

  const applicationsOptions = getTimeSlotApplicationsQueryOptions({
    timeSlotId,
    tokens,
  } as TimeSlotApplicationsParams);

  const recruitmentOptions = getRecruitmentDetailQueryOptions({
    recruitmentId,
    tokens,
  } as RecruitmentDetailParams);

  return (
    <ServerFetchBoundary fetchOptions={recruitmentOptions}>
      <ServerFetchBoundary fetchOptions={applicationsOptions}>
        <ApplicantDetailClient />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
