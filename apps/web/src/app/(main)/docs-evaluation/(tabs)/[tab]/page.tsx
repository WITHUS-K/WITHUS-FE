import React from 'react';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationsQueryOptions } from '@web/store/query/useApplicationsQuery';
import { getRecruitmentPositionsQueryOptions } from '@web/store/query/useRecruitmentPositionsQuery';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { fetchFirstRecruitmentId } from '@web/store/query/useRecruitmentsQuery';
import TabPageClient from './TabPageClient';

const PER_PAGE = 9;

interface PageProps {
  params: { tab?: string };
  searchParams?: {
    recruitmentId?: string;
    keyword?: string;
    page?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const activeTab = params.tab ?? 'all';
  const keyword = searchParams?.keyword ?? '';
  const pageNum = searchParams?.page ? Number(searchParams.page) : 1;

  // 토큰
  const tokens = await getServerSideTokens();

  // recruitmentId 결정 (없으면 첫 공고로 대체)
  const recIdStr = searchParams?.recruitmentId;
  let recruitmentId =
    typeof recIdStr === 'string' ? Number(recIdStr) : NaN;
  
  if (!recruitmentId || Number.isNaN(recruitmentId)) {
    const firstId = await fetchFirstRecruitmentId(tokens);
  
    if (firstId == null) {
      return <div>공고 정보를 불러올 수 없습니다.</div>;
    }
  
    recruitmentId = firstId; // 여기서부터 타입은 확정 number
  }

  // 탭 → evaluationStatus 매핑
  const evaluationStatus =
    activeTab === 'BEFORE'
      ? 'NOT_EVALUATED'
      : activeTab === 'COMPLETED'
        ? 'EVALUATED'
        : 'ALL';

  // React Query 옵션
  const appsOptions = getApplicationsQueryOptions({
    recruitmentId,
    evaluationStatus,
    keyword,
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
