import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';

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
export function useRecruitmentProgressQuery(
  recruitmentId: number,
  stage: EvaluationStage = 'DOCUMENT' 
) {
  return useQuery<RecruitmentProgressItem[], Error>({
    queryKey: ['admin', 'recruitments', recruitmentId, 'progress', stage],
    queryFn: async () => {
      const res = await GET<RecruitmentProgressResponse['result']>(
        `api/v1/admin/recruitments/${recruitmentId}/progress?stage=${stage}`
      );
      return res.result;
    },
    enabled: !!recruitmentId, 
  });
}