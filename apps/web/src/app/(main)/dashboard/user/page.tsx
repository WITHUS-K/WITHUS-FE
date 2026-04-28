import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@web/store/query/getQueryClient';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getCurrentRecruitmentSummaryByOrgQueryOptions } from '@web/store/query/useCurrentRecruitmentSummaryByOrgQuery';
import { getMyDocumentEvaluationsQueryOptions } from '@web/store/query/useMyDocumentEvaluationsQuery';
import {
  getOrgInterviewsForHomeQueryOptions,
  getMyTimeSlotsForHomeQueryOptions,
} from '@web/store/query/useMyInterviewForHomeQuery';
import { UserHomeDashboardScreen } from '@web/app/(main)/_components/home/User/UserHomeDashboardScreen';
import { UserHomeEmptyScreen } from '@web/app/(main)/_components/home/User/UserHomeEmptyScreen';

export default async function UserDashboardPage() {
  const tokens = await getServerSideTokens();
  const orgId = tokens.organizationId;
  const queryClient = getQueryClient();

  if (!orgId) {
    return <UserHomeEmptyScreen />;
  }

  const summaryOptions = getCurrentRecruitmentSummaryByOrgQueryOptions(orgId, tokens);
  let summaries: Awaited<ReturnType<typeof summaryOptions.queryFn>> = [];

  try {
    summaries = await queryClient.fetchQuery(summaryOptions);
  } catch {
    return <UserHomeEmptyScreen />;
  }

  const firstSummary = summaries[0];
  if (!firstSummary) {
    return <UserHomeEmptyScreen />;
  }

  const recruitmentId = firstSummary.recruitmentId;

  const docEvalOptions = getMyDocumentEvaluationsQueryOptions(recruitmentId, tokens);
  const orgInterviewsOptions = getOrgInterviewsForHomeQueryOptions(orgId, tokens);

  await Promise.all([
    queryClient.fetchQuery(docEvalOptions),
    queryClient.fetchQuery(orgInterviewsOptions).then((orgInterviews) => {
      const interviewId = orgInterviews.find(
        (iv) => iv.recruitmentId === recruitmentId
      )?.interviewId;
      if (interviewId) {
        return queryClient.fetchQuery(
          getMyTimeSlotsForHomeQueryOptions(interviewId, tokens)
        );
      }
    }),
  ]).catch(() => {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserHomeDashboardScreen />
    </HydrationBoundary>
  );
}
