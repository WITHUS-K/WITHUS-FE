import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import {
  getRecruitmentsListQueryOptions,
} from '@web/store/query/useRecruitmentsListQuery';
import ApplicationListClient from './ApplicationListClient';

export default async function Page() {
  const tokens = await getServerSideTokens();

  const listOptions = getRecruitmentsListQueryOptions({ tokens });

  return (
    <ServerFetchBoundary fetchOptions={listOptions}>
      <ApplicationListClient />
    </ServerFetchBoundary>
  );
}
