// app/(main)/apply-management/add/page.tsx

import { ReactNode } from 'react';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getRecruitmentDetailQueryOptions } from '@web/store/query/useRecruitmentDetailQuery';
import AddApplicantClient from './AddApplicantClient';

interface Props {
  searchParams: { recruitmentId?: string };
}

export default async function AddApplicantPage({ searchParams }: Props) {
  // 1) 쿼리 파라에서 recruitmentId 문자열 꺼내기
  const recIdStr = searchParams.recruitmentId;
  const recruitmentId = recIdStr ? Number(recIdStr) : NaN;

  // 3) tokens 읽고, SSR용 쿼리 옵션 생성
  const tokens = await getServerSideTokens();
  const fetchOptions = getRecruitmentDetailQueryOptions({
    recruitmentId,
    tokens,
  });

  // 4) ServerFetchBoundary로 감싸서 hydration
  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <AddApplicantClient recruitmentId={recruitmentId} />
    </ServerFetchBoundary>
  );
}
