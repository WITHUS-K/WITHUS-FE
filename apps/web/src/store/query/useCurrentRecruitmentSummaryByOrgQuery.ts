import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';

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
export function useCurrentRecruitmentSummaryByOrgQuery(organizationId: number) {
  return useQuery<OrganizationRecruitmentSummary[], Error>({
    queryKey: ['recruitments', organizationId, 'current', 'summary'],
    queryFn: async () => {
      const res = await GET<OrganizationRecruitmentSummaryResponse['result']>(
        `api/v1/recruitments/${organizationId}/current/summary`
      );
      console.log("홈", res.result)
      return res.result;
    },
    enabled: !!organizationId, 
  });
}