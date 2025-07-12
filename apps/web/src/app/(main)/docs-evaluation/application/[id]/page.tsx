// app/docs-evaluation/application/[id]/page.tsx
import React from 'react';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getApplicationDetailQueryOptions } from '@web/store/query/useApplicationDetailQuery';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import DetailClient from './DetailClient';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const applicationId = Number(params.id);
  const tokens = await getServerSideTokens();

  const detailOptions = getApplicationDetailQueryOptions({
    applicationId,
    tokens,
  });

  return (
    <ServerFetchBoundary fetchOptions={detailOptions}>
      {/* 이 컴포넌트는 use client; 로 선언 */}
      <DetailClient />
    </ServerFetchBoundary>
  );
}
