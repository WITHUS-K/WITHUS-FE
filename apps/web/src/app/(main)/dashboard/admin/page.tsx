import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@web/store/query/getQueryClient';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getCurrentRecruitmentSummaryQueryOptions } from '@web/store/query/useCurrentRecruitmentSummaryQuery';
import { getRecruitmentProgressQueryOptions } from '@web/store/query/useRecruitmentProgressQuery';
import { getPendingEvaluatorsQueryOptions } from '@web/store/query/usePendingEvaluatorsQuery';
import { AdminHomeDashboardScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeDashboardScreen';
import { AdminHomeEmptyScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeEmptyScreen';

export default async function AdminDashboardPage() {
  const tokens = await getServerSideTokens();
  const queryClient = getQueryClient();

  const summaryOptions = getCurrentRecruitmentSummaryQueryOptions(tokens);
  let summaries: Awaited<ReturnType<typeof summaryOptions.queryFn>> = [];

  try {
    summaries = await queryClient.fetchQuery(summaryOptions);
  } catch {
    return <AdminHomeEmptyScreen />;
  }

  const firstSummary = summaries[0];
  if (!firstSummary) {
    return <AdminHomeEmptyScreen />;
  }

  const recruitmentId = firstSummary.recruitmentId;
  const docProgressOptions = getRecruitmentProgressQueryOptions(recruitmentId, 'DOCUMENT', tokens);
  const interviewProgressOptions = getRecruitmentProgressQueryOptions(recruitmentId, 'INTERVIEW', tokens);
  const pendingOptions = getPendingEvaluatorsQueryOptions(recruitmentId, tokens);

  await Promise.all([
    queryClient.fetchQuery(docProgressOptions),
    queryClient.fetchQuery(interviewProgressOptions),
    queryClient.fetchQuery(pendingOptions),
  ]).catch(() => {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminHomeDashboardScreen />
    </HydrationBoundary>
  );
}
