// src/app/(main)/interview-evaluation/timetable/[tab]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import type { Tab } from '../../_components/CellRender/CellRenderer';
import {
  getMyTimeSlotsQueryOptions,
  type MyTimeSlotsParams,
} from '@web/store/query/useMyTimeSlotsQuery';
import EvaluationTimetableClient from './EvaluationTimetableClient';

interface PageProps {
  params: Promise<{ tab: string }>;
  searchParams: Promise<{ interviewId?: string; date?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { tab: rawTab } = await params;
  const tab = rawTab as Tab;

  const { interviewId: ivStr = '', date } = await searchParams;

  const interviewId = ivStr ? Number(ivStr) : NaN;
  if (isNaN(interviewId) || interviewId <= 0) {
    return notFound();
  }

  const { accessToken, refreshToken } = await getServerSideTokens();
  const tokens = { accessToken, refreshToken };

  //  SSR Prefetch: 내 타임슬롯 조회 옵션
  const slotsOptions = getMyTimeSlotsQueryOptions({
    interviewId,
    tokens,
  } as MyTimeSlotsParams);

  return (
    <ServerFetchBoundary fetchOptions={slotsOptions}>
      <EvaluationTimetableClient
        tab={tab}
        interviewId={interviewId}
        date={date}
      />
    </ServerFetchBoundary>
  );
}
