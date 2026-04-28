import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';

// 사용자용

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

export interface OrganizationRecruitmentSummary {
  recruitmentId: number;
  title: string;
  organizationName: string;
  totalApplicants: number;
  dDays: DDay[];
  positionCounts: PositionCount[];
}

export interface OrganizationRecruitmentSummaryResponse {
  code: number;
  message: string;
  result: OrganizationRecruitmentSummary[];
  success: boolean;
}

export function getCurrentRecruitmentSummaryByOrgQueryOptions(
  organizationId: number,
  tokens?: Tokens
) {
  return {
    queryKey: ['recruitments', organizationId, 'current', 'summary'] as const,
    queryFn: async () => {
      const res = await GET<OrganizationRecruitmentSummaryResponse['result']>(
        `api/v1/recruitments/${organizationId}/current/summary`,
        undefined,
        tokens
      );
      return res.result;
    },
    enabled: !!organizationId,
  };
}

export function useCurrentRecruitmentSummaryByOrgQuery(organizationId: number) {
  return useQuery<OrganizationRecruitmentSummary[], Error>(
    getCurrentRecruitmentSummaryByOrgQueryOptions(organizationId)
  );
}