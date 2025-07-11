import React from 'react';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getRecruitmentsListQueryOptions } from '@web/store/query/useRecruitmentsQuery';
import { getAdminApplicationsQueryOptions } from '@web/store/query/useAdminApplicationsQuery';
import { getRecruitmentPositionsQueryOptions } from '@web/store/query/useRecruitmentPositionsQuery';
import TabClientWrapper from './TabClientWrapper';

interface PageProps {
  params: {
    tab: string[];
    modal?: string[];
  };
  searchParams: {
    recruitmentId?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const recIdStr = (await searchParams).recruitmentId;
  const recId = recIdStr ? Number(recIdStr) : NaN;

  if (!recIdStr || isNaN(recId)) {
    return <TabClientWrapper modal={params.modal} />;
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
  const positionsOptions = getRecruitmentPositionsQueryOptions({
    recruitmentId: recId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={recsOptions}>
      <ServerFetchBoundary fetchOptions={countsOptions}>
        <ServerFetchBoundary fetchOptions={positionsOptions}>
          <TabClientWrapper modal={params.modal} />
        </ServerFetchBoundary>
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
