import { cookies } from 'next/headers';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getQueryClient } from '@web/store/query/getQueryClient';
import UserHomeDashboardScreen from '@web/app/(main)/_components/home/User/UserHomeDashboardScreen';
import { getCurrentRecruitmentsSummaryQueryOptions } from '@web/store/query/useCurrentRecruitmentsSummaryQuery';
import { getOrganizationsMeQueryOptions } from '@web/store/query/useOrganizationsMeQuery';
import { getRecruitmentsCurrentSummaryQueryOptions } from '@web/store/query/useRecruitmentsCurrentSummaryQuery';
import { getMyDocumentEvaluationsQueryOptions } from '@web/store/query/useMyDocumentEvaluationsQuery';
import { AdminHomeEmptyScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeEmptyScreen';
import { AdminHomeDashboardScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeDashboardScreen';
import { UserHomeEmptyScreen } from '@web/app/(main)/_components/home/User/UserHomeEmptyScreen';

export default async function Page() {
  const roleRaw =
    ((await cookies()).get('role')?.value as 'ADMIN' | 'USER') ?? 'USER';
  const role = roleRaw === 'ADMIN' ? 'admin' : 'user';
  const tokens = await getServerSideTokens();

  // React Query 클라이언트 준비
  const queryClient = getQueryClient();

  if (role === 'admin') {
    const summaryOptions = getCurrentRecruitmentsSummaryQueryOptions(tokens);
    const summaries = await queryClient.fetchQuery(summaryOptions);

    if (!summaries.length) {
      return <AdminHomeEmptyScreen />;
    }

    const recruitmentId = summaries[0]?.recruitmentId as number;
    return (
      <ServerFetchBoundary fetchOptions={summaryOptions}>
        <AdminHomeDashboardScreen
          recruitmentId={recruitmentId}
          tokens={tokens}
        />
      </ServerFetchBoundary>
    );
  } else {
    const orgOptions = getOrganizationsMeQueryOptions(tokens);
    const orgs = await queryClient.fetchQuery(orgOptions);
    if (!orgs.length) {
      return <UserHomeEmptyScreen />;
    }
    const organizationId = orgs[0]?.id as number;

    const summaryOptions = getRecruitmentsCurrentSummaryQueryOptions(
      organizationId,
      tokens
    );
    const summaries = await queryClient.fetchQuery(summaryOptions);
    if (!summaries.length) {
      return <UserHomeEmptyScreen />;
    }
    const recruitmentId = summaries[0]?.recruitmentId as number;

    const docEvalOptions = getMyDocumentEvaluationsQueryOptions(
      recruitmentId,
      tokens
    );

    await queryClient.fetchQuery(docEvalOptions);

    return <UserHomeDashboardScreen tokens={tokens} />;
  }
}
