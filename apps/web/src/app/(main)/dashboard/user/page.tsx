import { cookies } from 'next/headers';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getQueryClient } from '@web/store/query/getQueryClient';
import { getOrganizationsMeQueryOptions } from '@web/store/query/useOrganizationsMeQuery';
import { getRecruitmentsCurrentSummaryQueryOptions } from '@web/store/query/useRecruitmentsCurrentSummaryQuery';
import { getMyDocumentEvaluationsQueryOptions } from '@web/store/query/useMyDocumentEvaluationsQuery';
import { UserHomeEmptyScreen } from '../_components/UserHomeEmptyScreen';
import UserHomeDashboardScreen from '@web/app/(main)/dashboard/_components/UserHomeDashboardScreen';

export default async function UserDashboardPage() {
  const roleRaw = (await cookies()).get('role')?.value;

  const tokens = await getServerSideTokens();
  const queryClient = getQueryClient();

  const orgOptions = getOrganizationsMeQueryOptions(tokens);
  const orgs = (await queryClient.fetchQuery(orgOptions)) ?? [];
  if (!orgs.length) {
    return <UserHomeEmptyScreen />;
  }
  const organizationId = orgs[0]?.id as number;

  const summaryOptions = getRecruitmentsCurrentSummaryQueryOptions(
    organizationId,
    tokens
  );
  const summaries = (await queryClient.fetchQuery(summaryOptions)) ?? [];
  if (!summaries.length) {
    return <UserHomeEmptyScreen />;
  }
  const recruitmentId = summaries[0]?.recruitmentId as number;

  const docEvalOptions = getMyDocumentEvaluationsQueryOptions(
    recruitmentId,
    tokens
  );
  await queryClient.fetchQuery(docEvalOptions);

  return (
    <ServerFetchBoundary
      fetchOptions={[orgOptions, summaryOptions, docEvalOptions]}
    >
      <UserHomeDashboardScreen tokens={tokens} />
    </ServerFetchBoundary>
  );
}
