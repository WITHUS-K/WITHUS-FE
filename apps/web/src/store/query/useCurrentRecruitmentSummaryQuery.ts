import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';

//관리자용
export interface DDay {
  label: string;
  date: string;
  daysRemaining: number;
  isPassed: boolean;
}

export interface PositionCount {
  positionName: string;
  count: number;
}

export interface RecruitmentSummaryItem {
  recruitmentId: number;
  title: string;
  dDays: DDay[];
  organizationName: string;
  totalApplicants: number;
  positionCounts: PositionCount[];
}

export interface CurrentRecruitmentSummaryResponse {
  code: number;
  message: string;
  result: RecruitmentSummaryItem[];
  success: boolean;
}

export function getCurrentRecruitmentSummaryQueryOptions(tokens?: Tokens) {
  return {
    queryKey: ['recruitment', 'current', 'summary'] as const,
    queryFn: async () => {
      const res = await GET<CurrentRecruitmentSummaryResponse['result']>(
        'api/v1/admin/recruitments/current/summary',
        undefined,
        tokens
      );
      return res.result;
    },
  };
}

export function useCurrentRecruitmentSummaryQuery() {
  return useQuery<RecruitmentSummaryItem[], Error>(
    getCurrentRecruitmentSummaryQueryOptions()
  );
}