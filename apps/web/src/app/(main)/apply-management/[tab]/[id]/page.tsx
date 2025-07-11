import React from 'react';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationDetailQueryOptions } from '@web/store/query/useApplicationDetailQuery';
import ApplicationDetailClient from './ApplicationDetailClient';

interface PageProps {
  params: { tab: string; id: string };
}

export default async function Page({ params }: PageProps) {
  const applicationId = Number(params.id);
  const tokens = await getServerSideTokens();

  const fetchOptions = getApplicationDetailQueryOptions({
    applicationId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <ApplicationDetailClient tab={params.tab} applicationId={applicationId} />
    </ServerFetchBoundary>
  );
}
