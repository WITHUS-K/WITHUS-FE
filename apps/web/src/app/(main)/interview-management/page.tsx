import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getOrgInterviewsOptions } from '@web/store/query/useOrganizationInterviewsQuery';
import { getRecruitmentsListOptions } from '@web/store/query/useRecruitmentsQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import InterviewManagementPageClient from './InterviewManagementPageClient';

export default async function Page() {
  const tokens = await getServerSideTokens();

  const interviewsOptions = getOrgInterviewsOptions(tokens);
  const recruitmentsOptions = getRecruitmentsListOptions(tokens);

  return (
    <ServerFetchBoundary fetchOptions={[interviewsOptions]}>
      <ServerFetchBoundary fetchOptions={[recruitmentsOptions]}>
        <InterviewManagementPageClient />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
