// src/store/query/useOrganizationInterviews.ts
import {
  useSuspenseQuery,
  type FetchQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { ApiResponse, Tokens } from '@web/api/types';

// — 요청/응답 타입 —

// GET /api/v1/interviews/my-organization-interviews
// → 내 조직의 면접 정보 조회
export interface OrgInterviewInfo {
  recruitmentId: number;
  recruitmentTitle: string;
  interviewId: number;
  availableTimeRanges: {
    id: number;
    date: string; // "2025.05.20"
    startTime: string; // "10:00"
    endTime: string; // "18:00"
    recruitmentId: number;
  }[];
  interviewDuration: number;
}

// — QueryOptions & Hook —
export function getOrgInterviewsOptions(
  organizationId: number,
  tokens?: Tokens,
): FetchQueryOptions<
  OrgInterviewInfo[],
  Error,
  OrgInterviewInfo[],
  ReturnType<typeof queryKeys.interview.orgList>
> {
  return {
    queryKey: queryKeys.interview.orgList(),
    queryFn: async () => {
      const res = await GET<OrgInterviewInfo[]>(
        `api/v1/interviews/organization/${organizationId}`,
        undefined,
        tokens
      );
      console.log(res);
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  };
}

export function useOrganizationInterviewsQuery(
  organizationId: number,
  tokens?: Tokens
): UseSuspenseQueryResult<OrgInterviewInfo[], Error> {
  return useSuspenseQuery<OrgInterviewInfo[], Error>({
    queryKey: queryKeys.interview.orgList(),
    queryFn: async () => {
      const res = await GET<OrgInterviewInfo[]>(
        `api/v1/interviews/organization/${organizationId}`,
        undefined,
        tokens
      );
      console.log(res);
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  });
}
