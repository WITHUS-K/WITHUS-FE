// src/app/(main)/apply-management/add/page.tsx

import { ReactNode } from 'react';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getRecruitmentDetailQueryOptions } from '@web/store/query/useRecruitmentDetailQuery';
import AddApplicantClient from './AddApplicantClient';

interface Props {
  searchParams: Promise<{
    recruitmentId?: string;
  }>;
}

export default async function AddApplicantPage({ searchParams }: Props) {
  const { recruitmentId: recIdStr } = await searchParams;
  const recruitmentId = recIdStr ? Number(recIdStr) : NaN;

  const tokens = await getServerSideTokens();
  const fetchOptions = getRecruitmentDetailQueryOptions({
    recruitmentId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <AddApplicantClient recruitmentId={recruitmentId} />
    </ServerFetchBoundary>
  );
}
