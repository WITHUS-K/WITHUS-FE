import React from 'react';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationsQueryOptions } from '@web/store/query/useApplicationsQuery';
import { getRecruitmentPositionsQueryOptions } from '@web/store/query/useRecruitmentPositionsQuery';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { fetchFirstRecruitmentId } from '@web/store/query/useRecruitmentsQuery';
import TabPageClient from './TabPageClient';

const PER_PAGE = 9;

interface PageProps {
  params: Promise<{ tab?: string }>;
  searchParams: Promise<{
    recruitmentId?: string;
    keyword?: string;
    page?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { tab } = await params;
  const { recruitmentId: recIdStr, keyword, page } = await searchParams;

  const activeTab = tab ?? 'all';
  const safeKeyword = keyword ?? '';
  const pageNum = page ? Number(page) : 1;

  const tokens = await getServerSideTokens();

  // recruitmentId 결정
  let recruitmentId = recIdStr ? Number(recIdStr) : NaN;

  if (!recruitmentId || Number.isNaN(recruitmentId)) {
    const firstId = await fetchFirstRecruitmentId(tokens);

    if (firstId == null) {
      return <div>공고 정보를 불러올 수 없습니다.</div>;
    }

    recruitmentId = firstId; // ✅ 여기서부터 number 확정
  }

  const evaluationStatus =
    activeTab === 'BEFORE'
      ? 'NOT_EVALUATED'
      : activeTab === 'COMPLETED'
        ? 'EVALUATED'
        : 'ALL';

  const appsOptions = getApplicationsQueryOptions({
    recruitmentId,
    evaluationStatus,
    keyword: safeKeyword,
    page: pageNum - 1,
    size: PER_PAGE,
    tokens,
  });

  const positionsOptions = getRecruitmentPositionsQueryOptions({
    recruitmentId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={appsOptions}>
      <ServerFetchBoundary fetchOptions={positionsOptions}>
        <TabPageClient recruitmentId={recruitmentId} />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
