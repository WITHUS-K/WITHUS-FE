// src/app/(main)/interview-evaluation/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import {
  getMyTimeSlotsQueryOptions,
  type MyTimeSlotsParams,
} from '@web/store/query/useMyTimeSlotsQuery';
import { getOrgInterviewsOptions } from '@web/store/query/useOrganizationInterviewsQuery';
import EvaluationClient from './EvaluationClient';

interface PageProps {
  searchParams: Promise<{
    interviewId?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { interviewId: ivStr } = await searchParams;
  const interviewId = ivStr ? Number(ivStr) : 0;

  const { accessToken, refreshToken, organizationId } =
    await getServerSideTokens();
  if (!organizationId) {
    return notFound();
  }
  const tokens = { accessToken, refreshToken };

  // 조직 면접 목록 SSR prefetch
  const orgsOptions = getOrgInterviewsOptions(organizationId, tokens);
  // 내 타임슬롯 SSR prefetch (payload: interviewId > 0일 때만 enabled 옵션 추가해도 좋습니다)
  const slotsOptions = getMyTimeSlotsQueryOptions({
    interviewId,
    tokens,
  } as MyTimeSlotsParams);

  return (
    <ServerFetchBoundary fetchOptions={orgsOptions}>
      <ServerFetchBoundary fetchOptions={slotsOptions}>
        <EvaluationClient />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
