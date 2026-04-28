import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';

export type EvaluationStage = 'DOCUMENT' | 'INTERVIEW';

export interface RecruitmentProgressItem {
  positionName: string;
  daysToDeadline: number;
  totalToEvaluate: number;
  evaluatedCount: number;
  notEvaluatedCount: number;
  progressPercent: number;
}

export interface RecruitmentProgressResponse {
  code: number;
  message: string;
  result: RecruitmentProgressItem[];
  success: boolean;
}

export function getRecruitmentProgressQueryOptions(
  recruitmentId: number,
  stage: EvaluationStage = 'DOCUMENT',
  tokens?: Tokens
) {
  return {
    queryKey: ['admin', 'recruitments', recruitmentId, 'progress', stage] as const,
    queryFn: async () => {
      const res = await GET<RecruitmentProgressResponse['result']>(
        `api/v1/admin/recruitments/${recruitmentId}/progress?stage=${stage}`,
        undefined,
        tokens
      );
      return res.result;
    },
    enabled: !!recruitmentId,
  };
}

export function useRecruitmentProgressQuery(
  recruitmentId: number,
  stage: EvaluationStage = 'DOCUMENT'
) {
  return useQuery<RecruitmentProgressItem[], Error>(
    getRecruitmentProgressQueryOptions(recruitmentId, stage)
  );
}