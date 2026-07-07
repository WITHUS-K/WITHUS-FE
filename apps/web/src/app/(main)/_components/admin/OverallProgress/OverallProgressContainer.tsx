'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getRecruitmentProgressQueryOptions } from '@web/store/query/useRecruitmentProgressQuery';
import { OverallProgress } from './OverallProgress';

interface Props {
  recruitmentId: number;
}

export function OverallProgressContainer({ recruitmentId }: Props) {
  const { data: docData } = useSuspenseQuery(
    getRecruitmentProgressQueryOptions(recruitmentId, 'DOCUMENT')
  );
  const { data: interviewData } = useSuspenseQuery(
    getRecruitmentProgressQueryOptions(recruitmentId, 'INTERVIEW')
  );

  return <OverallProgress docData={docData} interviewData={interviewData} />;
}
