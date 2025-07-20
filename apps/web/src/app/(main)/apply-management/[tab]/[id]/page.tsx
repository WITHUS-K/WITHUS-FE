// src/app/(main)/apply-management/[tab]/[id]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationDetailQueryOptions } from '@web/store/query/useApplicationDetailQuery';
import { getRecruitmentDetailQueryOptions } from '@web/store/query/useRecruitmentDetailQuery';
import ApplicationDetailClient from './ApplicationDetailClient';

interface PageProps {
  params: Promise<{ tab: string; id: string }>;
  searchParams: Promise<{ recruitmentId?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { tab, id } = await params;
  const { recruitmentId: recIdStr } = await searchParams;

  const applicationId = Number(id);
  const recruitmentId = recIdStr ? Number(recIdStr) : NaN;

  // 필수 파라미터가 유효하지 않으면 404 처리
  if (isNaN(applicationId) || isNaN(recruitmentId)) {
    return notFound();
  }

  const tokens = await getServerSideTokens();

  const applicationFetchOptions = getApplicationDetailQueryOptions({
    applicationId,
    tokens,
  });

  const recruitmentFetchOptions = getRecruitmentDetailQueryOptions({
    recruitmentId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={recruitmentFetchOptions}>
      <ServerFetchBoundary fetchOptions={applicationFetchOptions}>
        <ApplicationDetailClient
          tab={tab}
          applicationId={applicationId}
          recruitmentId={recruitmentId}
        />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
