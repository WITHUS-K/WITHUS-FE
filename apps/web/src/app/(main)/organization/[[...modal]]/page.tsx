// app/organization/[...modal]/page.tsx
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getOrganizationRolesQueryOptions } from '@web/store/query/useOrganizationRolesQuery';
import { getOrganizationMembersQueryOptions } from '@web/store/query/useOrganizationMembersQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import OrganizationPageClient from '../OrganizationPageClient';

// Next.js App Router 에선 params 를 이렇게 받습니다.
export default async function Page({
  params,
}: {
  params: { modal?: string[] };
}) {
  const tokens = await getServerSideTokens();
  const organizationId = 3;

  const roleFetchOptions = getOrganizationRolesQueryOptions({
    organizationId,
    tokens,
  });
  const membersFetchOptions = getOrganizationMembersQueryOptions({
    organizationId,
    page: 1,
    size: 20,
    tokens,
  });

  // URL이 /organization/(invite) 형태면 modal = ['invite']
  const showInvite = params.modal?.[0] === 'invite';

  return (
    <>
      <ServerFetchBoundary fetchOptions={[roleFetchOptions]}>
        <ServerFetchBoundary fetchOptions={[membersFetchOptions]}>
          {/* 클라이언트 컴포넌트에 server→client로 props 전달 */}
          <OrganizationPageClient
            organizationId={organizationId}
            showInvite={showInvite}
          />
        </ServerFetchBoundary>
      </ServerFetchBoundary>
    </>
  );
}
