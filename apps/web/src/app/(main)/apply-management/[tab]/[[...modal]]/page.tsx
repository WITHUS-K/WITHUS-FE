import React from 'react';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getRecruitmentsListQueryOptions } from '@web/store/query/useRecruitmentsQuery';
import { getAdminApplicationsQueryOptions } from '@web/store/query/useAdminApplicationsQuery';
import { getRecruitmentPositionsQueryOptions } from '@web/store/query/useRecruitmentPositionsQuery';
import TabClientWrapper from './TabClientWrapper';
import { getRecruitmentDetailQueryOptions } from '@web/store/query/useRecruitmentDetailQuery';

interface PageProps {
  params: Promise<{
    tab: string;
    modal?: string[];
  }>;
  searchParams: Promise<{
    recruitmentId?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { tab, modal } = await params;
  const { recruitmentId: recIdStr } = await searchParams;
  const recId = recIdStr ? Number(recIdStr) : NaN;

  if (!recIdStr || isNaN(recId)) {
    return <TabClientWrapper modal={modal} />;
  }

  const tokens = await getServerSideTokens();

  const recsOptions = getRecruitmentsListQueryOptions({ tokens });
  const countsOptions = getAdminApplicationsQueryOptions({
    recruitmentId: recId,
    stage: 'DOCUMENT',
    page: 0,
    size: 1,
    tokens,
  });
  const detailOptions = getRecruitmentDetailQueryOptions({
    recruitmentId: recId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={recsOptions}>
      <ServerFetchBoundary fetchOptions={countsOptions}>
        <ServerFetchBoundary fetchOptions={detailOptions}>
          <TabClientWrapper modal={modal} />
        </ServerFetchBoundary>
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
