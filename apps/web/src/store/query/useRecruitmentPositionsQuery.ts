import {
  queryOptions,
  useSuspenseQuery,
  useQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import { Tokens } from '@web/api/types';

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

export type RecruitmentPositionsParams = {
  recruitmentId: number;
  tokens?: Tokens;
};

export function getRecruitmentPositionsQueryOptions({
  recruitmentId,
  tokens,
}: RecruitmentPositionsParams): UseSuspenseQueryOptions<Position[], Error> {
  return queryOptions<Position[]>({
    queryKey: queryKeys.positions.byRecruitment(recruitmentId),
    queryFn: () =>
      GET<Position[]>(
        `api/v1/positions/recruitment/${recruitmentId}`,
        undefined,
        tokens           // ← 여기로 토큰 전달
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime:   GC_TIME,
    enabled:  recruitmentId > 0,
  });
}

export function useRecruitmentPositionsQuery(
  recruitmentId: number,
  tokens?: Tokens
) {
  return useQuery(
    getRecruitmentPositionsQueryOptions({ recruitmentId, tokens })
  );
}

export function useRecruitmentPositionsSuspenseQuery(
  recruitmentId: number,
  tokens?: Tokens
) {
  return useSuspenseQuery(
    getRecruitmentPositionsQueryOptions({ recruitmentId, tokens }) as UseSuspenseQueryOptions<
      Position[],
      Error
    >
  );
}