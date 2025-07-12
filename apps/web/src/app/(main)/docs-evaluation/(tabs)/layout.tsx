import { getRecruitmentsListQueryOptions } from '@web/store/query/useRecruitmentsQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/api/serverSideTokens';

export default async function DocsEvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getServerSideTokens();
  const options = getRecruitmentsListQueryOptions({ tokens });

  return (
    <ServerFetchBoundary fetchOptions={options}>{children}</ServerFetchBoundary>
  );
}
