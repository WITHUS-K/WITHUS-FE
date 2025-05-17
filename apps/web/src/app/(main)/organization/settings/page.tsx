import { getOrganizationRolesQueryOptions } from '@web/store/query/useOrganizationRolesQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import Settings from './Settings';
import { getServerSideTokens } from '@web/api/serverSideTokens';

export default async function Page() {
  const tokens = await getServerSideTokens();
  // 추후에 전역상태관리 사용해서 변환하기!!
  const organizationId = 5;

  const fetchOptions = [
    getOrganizationRolesQueryOptions({ organizationId, tokens }),
  ];

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <Settings organizationId={organizationId} />
    </ServerFetchBoundary>
  );
}
