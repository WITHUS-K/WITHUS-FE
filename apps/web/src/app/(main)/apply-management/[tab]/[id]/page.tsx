import React from 'react';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationDetailQueryOptions } from '@web/store/query/useApplicationDetailQuery';
import ApplicationDetailClient from './ApplicationDetailClient';

interface PageProps {
  params: Promise<{ tab: string; id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { tab, id } = await params;
  const applicationId = Number(id);

  const tokens = await getServerSideTokens();
  const fetchOptions = getApplicationDetailQueryOptions({
    applicationId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <ApplicationDetailClient tab={tab} applicationId={applicationId} />
    </ServerFetchBoundary>
  );
}
