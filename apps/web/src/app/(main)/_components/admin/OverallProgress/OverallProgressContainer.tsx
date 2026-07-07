'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { getRecruitmentProgressQueryOptions } from '@web/store/query/useRecruitmentProgressQuery';
import { OverallProgress } from './OverallProgress';

interface Props {
  recruitmentId: number;
}

export function OverallProgressContainer({ recruitmentId }: Props) {
  const [{ data: docData }, { data: interviewData }] = useSuspenseQueries({
    queries: [
      getRecruitmentProgressQueryOptions(recruitmentId, 'DOCUMENT'),
      getRecruitmentProgressQueryOptions(recruitmentId, 'INTERVIEW'),
    ],
  });

  return <OverallProgress docData={docData} interviewData={interviewData} />;
}
