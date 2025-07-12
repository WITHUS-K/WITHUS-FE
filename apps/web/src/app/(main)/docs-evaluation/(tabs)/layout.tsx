import { getRecruitmentsListQueryOptions } from '@web/store/query/useRecruitmentsQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { cookies } from 'next/headers';
import { getMyRecruitmentsListQueryOptions } from '@web/store/query/useMyRecruitmentsQuery';

export default async function DocsEvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getServerSideTokens();
  const orgIdCookie = (await cookies()).get('organizationId')?.value;
  const organizationId = orgIdCookie ? Number(orgIdCookie) : 0;

  const recruitOptions = getMyRecruitmentsListQueryOptions({
    tokens,
    organizationId,
  });

  return (
    <ServerFetchBoundary fetchOptions={recruitOptions}>
      {children}
    </ServerFetchBoundary>
  );
}
