import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';

export interface PendingEvaluator {
  userId: number;
  name: string;
  profileImageUrl: string | null;
}

export interface PendingEvaluatorsResult {
  stage: string; 
  deadline: string;
  daysToDeadline: number;
  hoursToDeadline: number;
  minutesToDeadline: number;
  users: PendingEvaluator[];
}

export interface PendingEvaluatorsResponse {
  code: number;
  message: string;
  result: PendingEvaluatorsResult;
  success: boolean;
}

export function usePendingEvaluatorsQuery(recruitmentId: number) {
  return useQuery<PendingEvaluatorsResult, Error>({
    queryKey: ['admin', 'recruitments', recruitmentId, 'pending-evaluators'],
    queryFn: async () => {
      const res = await GET<PendingEvaluatorsResponse['result']>(
        `api/v1/admin/recruitments/${recruitmentId}/pending-evaluators`
      );
      return res.result;
    },
    enabled: !!recruitmentId, 
  });
}