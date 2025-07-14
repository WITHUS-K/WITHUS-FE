// app/layout.tsx
import AuthLayout from './AuthLayout';
import { cookies } from 'next/headers';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import {
  Organization,
  fetchMyOrganizations,
  getMyOrganizationsQueryOptions,
} from '@web/store/query/useMyOrganizationsQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import type { Tokens } from '@web/api/types';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens: Tokens = await getServerSideTokens();
  const cookieStore = cookies();

  const name = (await cookieStore).get('name')?.value ?? '';
  const role = (await cookieStore).get('role')?.value ?? '';
  const profileUrl = (await cookieStore).get('profileUrl')?.value ?? '';
  const position = (await cookieStore).get('position')?.value ?? '';
  const part = (await cookieStore).get('part')?.value ?? '';

  const orgIdCookie = (await cookieStore).get('organizationId')?.value;
  const currentOrganizationId = orgIdCookie ? Number(orgIdCookie) : null;

  // USER일 때만 SSR prefetch + 데이터 fetch
  const isUser = role === 'USER';
  let organizations: Organization[] = [];
  let orgOptions;
  if (isUser) {
    orgOptions = getMyOrganizationsQueryOptions(tokens);
    organizations = await fetchMyOrganizations(tokens);
  }
  const authContent = (
    <AuthLayout
      username={name}
      role={role}
      profileUrl={profileUrl}
      position={position}
      part={part}
      currentOrganizationId={currentOrganizationId}
      organizations={organizations}
    >
      {children}
    </AuthLayout>
  );

  return isUser && orgOptions ? (
    <ServerFetchBoundary fetchOptions={orgOptions}>
      {authContent}
    </ServerFetchBoundary>
  ) : (
    authContent
  );
}
