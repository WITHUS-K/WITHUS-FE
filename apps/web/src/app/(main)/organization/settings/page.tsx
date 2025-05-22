import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getOrganizationRolesQueryOptions } from '@web/store/query/useOrganizationRolesQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import Settings from './Settings';

export default async function Page() {
  // 1) 쿠키에서 accessToken, refreshToken, organizationId 읽어오기
  const { accessToken, refreshToken, organizationId } =
    await getServerSideTokens();

  // 2) organizationId 없으면 404
  if (!organizationId) {
    notFound();
  }

  // 3) React-Query SSR에 넘길 tokens 객체
  const tokens = { accessToken, refreshToken };

  // 4) fetchOptions 준비
  const fetchOptions = [
    getOrganizationRolesQueryOptions({ organizationId, tokens }),
  ];

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <Settings organizationId={organizationId} />
    </ServerFetchBoundary>
  );
}
