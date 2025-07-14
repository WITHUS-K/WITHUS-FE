import React from 'react';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationsQueryOptions } from '@web/store/query/useApplicationsQuery';
import { getRecruitmentPositionsQueryOptions } from '@web/store/query/useRecruitmentPositionsQuery';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { fetchFirstRecruitmentId } from '@web/store/query/useRecruitmentsQuery';
import TabPageClient from './TabPageClient';

const PER_PAGE = 9;

interface PageProps {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  // await로 풀기
  const { tab: tabRaw } = await params;
  const {
    recruitmentId: recIdStr,
    keyword: keywordRaw,
    page: pageRaw,
  } = await searchParams;

  // 탭, 키워드, 페이지 처리
  const activeTab = Array.isArray(tabRaw) ? tabRaw[0] : (tabRaw ?? 'all');
  const keyword = typeof keywordRaw === 'string' ? keywordRaw : '';
  const pageNum = typeof pageRaw === 'string' ? Number(pageRaw) : 1;

  // 토큰 가져오기
  const tokens = await getServerSideTokens();

  // recruitmentId 결정
  let recruitmentId: number | null =
    typeof recIdStr === 'string' ? Number(recIdStr) : NaN;
  if (!recruitmentId || isNaN(recruitmentId)) {
    recruitmentId = await fetchFirstRecruitmentId(tokens);
    if (!recruitmentId) {
      return <div>공고 정보를 불러올 수 없습니다.</div>;
    }
  }

  // 평가 상태 매핑
  const evaluationStatus =
    activeTab === 'BEFORE'
      ? 'NOT_EVALUATED'
      : activeTab === 'COMPLETED'
        ? 'EVALUATED'
        : 'ALL';

  // React Query 옵션 생성
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
        <TabPageClient />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
