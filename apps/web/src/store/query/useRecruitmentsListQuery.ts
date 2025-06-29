import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type {
  RecruitmentsResponse,
  RecruitmentDto,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;
const CACHE_TIME = 1000 * 60 * 2;

export interface RecruitmentsListParams {
  keyword?: string;
  tokens?: Tokens;
}

export function getRecruitmentsListQueryOptions(
  params: RecruitmentsListParams
): UseSuspenseQueryOptions<RecruitmentDto[], Error> {
  const { keyword, tokens } = params;

  return queryOptions<RecruitmentDto[]>({
    queryKey: queryKeys.recruitments.list(keyword),
    queryFn: () =>
      GET<RecruitmentsResponse['result']>(
        'api/v1/recruitments',
        keyword ? { keyword } : undefined,
        tokens
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useRecruitmentsListQuery(keyword?: string) {
  const key = queryKeys.recruitments.list(keyword);

  return useQuery<RecruitmentDto[], Error>({
    queryKey: key,
    queryFn: () =>
      GET<RecruitmentsResponse['result']>(
        'api/v1/recruitments',
        keyword ? { keyword } : undefined
      ).then((res) => res.result),

    // 새 옵션 이름에 맞춰 교체
    staleTime: STALE_TIME,
    gcTime: GC_TIME,

    // v5에서 `keepPreviousData: true` 대신
    // placeholderData에 이전 데이터를 그대로 리턴하는 유틸 함수를 사용
    placeholderData: keepPreviousData,
  });
}
