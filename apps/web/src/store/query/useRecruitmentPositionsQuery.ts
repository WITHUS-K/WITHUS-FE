import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
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

const STALE_TIME = 1000 * 60 * 2;       // 1분
const GC_TIME    = 1000 * 60 * 3;  // 1시간

export function getRecruitmentPositionsQueryOptions(
  recruitmentId: number
): UseSuspenseQueryOptions<Position[], Error> {
  return queryOptions<Position[]>({
    queryKey: queryKeys.positions.byRecruitment(recruitmentId),
    queryFn: () =>
      GET<Position[]>(
        `api/v1/positions/recruitment/${recruitmentId}`
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: recruitmentId > 0,
  });
}

export function useRecruitmentPositionsQuery(
  recruitmentId: number
) {
  return useSuspenseQuery(
    getRecruitmentPositionsQueryOptions(recruitmentId)
  );
}
