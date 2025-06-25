import { cookies } from 'next/headers';
import ProfilePage from './ProfilePage';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getMyPageQueryOptions } from '@web/store/query/useGetMyPageQuery';

export default async function Page() {
  const cookieStore = await cookies();
  const role = (cookieStore.get('role')?.value as 'ADMIN' | 'USER') ?? 'USER';

  const tokens = await getServerSideTokens();
  const fetchOptions = getMyPageQueryOptions(tokens);

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <ProfilePage role={role} />
    </ServerFetchBoundary>
  );
}
