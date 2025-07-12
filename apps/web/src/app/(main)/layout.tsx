import { Tokens } from '@web/api/types';
import AuthLayout from './AuthLayout';
import { cookies } from 'next/headers';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getMyOrganizationsQueryOptions } from '@web/store/query/useMyOrganizationsQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens: Tokens = await getServerSideTokens();
  const cookieStore = await cookies();

  const orgIdCookie = cookieStore.get('organizationId')?.value;
  const currentOrganizationId = orgIdCookie ? Number(orgIdCookie) : null;
  const orgOptions = getMyOrganizationsQueryOptions(tokens);

  const name = cookieStore.get('name')?.value ?? '';
  const role = cookieStore.get('role')?.value ?? '';
  const profileUrl = cookieStore.get('profileUrl')?.value ?? '';
  const position = cookieStore.get('position')?.value ?? '';
  const part = cookieStore.get('part')?.value ?? '';

  return (
    <ServerFetchBoundary fetchOptions={orgOptions}>
      <AuthLayout
        username={name}
        role={role}
        profileUrl={profileUrl}
        position={position}
        part={part}
        currentOrganizationId={currentOrganizationId}
      >
        {children}
      </AuthLayout>
    </ServerFetchBoundary>
  );
}
