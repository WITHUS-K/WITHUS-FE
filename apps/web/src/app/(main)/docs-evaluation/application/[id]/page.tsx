// app/docs-evaluation/application/[id]/page.tsx

import React from 'react';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationDetailQueryOptions } from '@web/store/query/useApplicationDetailQuery';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import DetailClient from './DetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const applicationId = Number(id);
  const tokens = await getServerSideTokens();

  const detailOptions = getApplicationDetailQueryOptions({
    applicationId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={detailOptions}>
      <DetailClient />
    </ServerFetchBoundary>
  );
}
