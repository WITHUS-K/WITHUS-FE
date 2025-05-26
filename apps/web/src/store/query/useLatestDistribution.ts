import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { HTTPError } from 'ky';
import { queryKeys } from '../constants';

export interface AssignmentItem {
  positionName: string;
  organizationRoleName: string;
  evaluationType: 'DOCUMENT' | 'INTERVIEW';
  count: number;
}

export interface LatestDistribution {
  id: number;
  recruitmentId: number;
  assignments: AssignmentItem[];
}

/**
 * GET latest distribution; 404 returns null
 */
export function useLatestDistributionQuery(recruitmentId: number) {
  return useQuery<LatestDistribution | null, Error>({
    queryKey: queryKeys.distribution.latest(recruitmentId),
    queryFn: async () => {
      try {
        const res = await GET<{
          id: number;
          recruitmentId: number;
          assignments: AssignmentItem[];
        }>(
          `api/v1/admin/applications/distribute-evaluators/latest/${recruitmentId}`
        );
        console.log(res);
        return res.result;
      } catch (err) {
        if (err instanceof HTTPError && err.response.status === 404) {
          return null;
        }
        throw err as Error;
      }
    },
    retry: false,
    enabled: recruitmentId > 0,
  });
}
