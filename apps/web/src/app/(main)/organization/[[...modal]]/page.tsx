import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getOrganizationRolesQueryOptions } from '@web/store/query/useOrganizationRolesQuery';
import { getOrganizationMembersQueryOptions } from '@web/store/query/useOrganizationMembersQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import OrganizationPageClient from '../OrganizationPageClient';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ modal?: string[] }>;
}) {
  const { accessToken, refreshToken, organizationId } =
    await getServerSideTokens();

  if (!organizationId) {
    notFound();
  }

  const tokens = { accessToken, refreshToken };

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

  const { modal } = await params;
  const showInvite = modal?.[0] === 'invite';
  const showPart = modal?.[0] === 'part';

  return (
    <>
      <ServerFetchBoundary fetchOptions={[roleFetchOptions]}>
        <ServerFetchBoundary fetchOptions={[membersFetchOptions]}>
          <OrganizationPageClient
            organizationId={organizationId}
            showInvite={showInvite}
            showPart={showPart}
          />
        </ServerFetchBoundary>
      </ServerFetchBoundary>
    </>
  );
}
