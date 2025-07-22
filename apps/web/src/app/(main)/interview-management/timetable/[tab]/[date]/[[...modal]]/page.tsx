// src/app/(main)/interview-management/timetable/[tab]/[date]/[[...modal]]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import {
  getInterviewScheduleQueryOptions,
  type InterviewScheduleParams,
} from '@web/store/query/useInterviewScheduleQuery';
import {
  getRecruitmentPositionsQueryOptions,
  type RecruitmentPositionsParams,
} from '@web/store/query/useRecruitmentPositionsQuery';
import TimetableClient from '../TimeTableClient';

interface PageProps {
  // Promise<{ ... }> 형태로 선언
  params: Promise<{
    tab: string;
    date: string;
    modal?: string[];
  }>;
  searchParams: Promise<{
    recruitmentId?: string;
    interviewId?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  // await 해서 실제 값을 꺼내세요
  const { tab, date, modal } = await params;
  const { recruitmentId: recIdStr, interviewId: ivIdStr } = await searchParams;

  const recId = recIdStr ? Number(recIdStr) : NaN;
  const ivId = ivIdStr ? Number(ivIdStr) : NaN;

  if (isNaN(recId) || isNaN(ivId)) {
    return notFound();
  }

  const tokens = await getServerSideTokens();

  // SSR 프리패치용 옵션 생성
  const scheduleOptions = getInterviewScheduleQueryOptions({
    interviewId: ivId,
    tokens,
  } as InterviewScheduleParams);

  const positionsOptions = getRecruitmentPositionsQueryOptions({
    recruitmentId: recId,
    tokens,
  } as RecruitmentPositionsParams);

  const showInvite = modal?.[0] === 'invite';

  return (
    <ServerFetchBoundary fetchOptions={scheduleOptions}>
      <ServerFetchBoundary fetchOptions={positionsOptions}>
        <TimetableClient showInvite={showInvite} />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
