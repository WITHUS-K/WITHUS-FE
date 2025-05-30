import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface DistributeRequest {
  recruitmentId: number;
  assignments: Array<{
    positionId: number;
    organizationRoleId: number;
    evaluationType: 'DOCUMENT' | 'INTERVIEW';
    count: number;
  }>;
}

export function useDistributeEvaluators(recruitmentId: number) {
  const qc = useQueryClient();
  return useMutation<string, Error, DistributeRequest>({
    mutationFn: async (body) => {
      const res = await POST<string>(
        'api/v1/admin/applications/distribute-evaluators',
        body
      );
      console.log(res);
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.distribution.latest(recruitmentId),
      });

      qc.invalidateQueries({
        queryKey: ['admin', 'applications', 'recruitment', recruitmentId],
      });
    },
  });
}
