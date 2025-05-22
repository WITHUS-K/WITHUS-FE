import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

/**
 * GET /api/v1/positions/recruitment/{recruitmentId}
 * → 특정 공고의 파트 전체 조회
 */
export interface Position {
  id: number;
  name: string;
  color: string; // 서버에서 보내주는 이름(red, orange, ...)
}

export function useRecruitmentPositionsQuery(
  recruitmentId: number
): UseQueryResult<Position[], Error> {
  return useQuery<Position[], Error>({
    queryKey: queryKeys.positions.byRecruitment(recruitmentId),
    queryFn: async () => {
      const res = await GET<Position[]>(
        `api/v1/positions/recruitment/${recruitmentId}`
      );
      console.log('파트', res.result);
      return res.result;
    },
    staleTime: 1000 * 60,
    enabled: recruitmentId > 0,
  });
}
