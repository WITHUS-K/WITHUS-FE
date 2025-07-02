import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getQueryClient } from '@web/store/query/getQueryClient';
import { getCurrentRecruitmentsSummaryQueryOptions } from '@web/store/query/useCurrentRecruitmentsSummaryQuery';
import { AdminHomeEmptyScreen } from '../_components/AdminHomeEmptyScreen';
import { AdminHomeDashboardScreen } from '../_components/AdminHomeDashboardScreen';

export default async function AdminDashboardPage() {
  const tokens = await getServerSideTokens();

  const queryClient = getQueryClient();
  const summaryOptions = getCurrentRecruitmentsSummaryQueryOptions(tokens);

  const summaries = await queryClient.fetchQuery(summaryOptions);

  if (!summaries.length) {
    return <AdminHomeEmptyScreen />;
  }

  const recruitmentId = summaries[0]?.recruitmentId as number;
  return (
    <ServerFetchBoundary fetchOptions={summaryOptions}>
      <AdminHomeDashboardScreen recruitmentId={recruitmentId} tokens={tokens} />
    </ServerFetchBoundary>
  );
}
