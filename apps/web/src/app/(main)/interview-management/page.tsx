import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getOrgInterviewsOptions } from '@web/store/query/useOrganizationInterviewsQuery';

import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import InterviewManagementPageClient from './InterviewManagementPageClient';
import { getRecruitmentsListQueryOptions } from '@web/store/query/useRecruitmentsQuery';

export default async function Page() {
  const tokens = await getServerSideTokens();

  const interviewsOptions = getOrgInterviewsOptions(tokens);
  const recruitmentsOptions = getRecruitmentsListQueryOptions({ tokens });

  return (
    <ServerFetchBoundary fetchOptions={[interviewsOptions]}>
      <ServerFetchBoundary fetchOptions={[recruitmentsOptions]}>
        <InterviewManagementPageClient />
      </ServerFetchBoundary>
    </ServerFetchBoundary>
  );
}
