import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { Tokens } from '@web/api/types';
import type { OrgInterviewInfo } from './useOrganizationInterviewsQuery';
import type { InterviewSchedule } from './useInterviewScheduleQuery';

export function getOrgInterviewsForHomeQueryOptions(
  organizationId: number,
  tokens?: Tokens
) {
  return {
    queryKey: queryKeys.interview.orgList(),
    queryFn: async () => {
      const res = await GET<OrgInterviewInfo[]>(
        `api/v1/interviews/organizations/${organizationId}`,
        undefined,
        tokens
      );
      return res.result;
    },
    enabled: !!organizationId,
    staleTime: 1000 * 60,
  };
}

export function getMyTimeSlotsForHomeQueryOptions(
  interviewId: number | undefined,
  tokens?: Tokens
) {
  return {
    queryKey: queryKeys.interview.myTimeSlots(interviewId ?? 0),
    queryFn: async () => {
      const res = await GET<InterviewSchedule[]>(
        `api/v1/interviews/${interviewId}/my-time-slots`,
        undefined,
        tokens
      );
      return res.result.map((sch) => ({
        ...sch,
        date: sch.date.replace(/-/g, '.'),
      }));
    },
    enabled: !!interviewId,
    staleTime: 1000 * 60,
  };
}

export function useOrgInterviewsForHomeQuery(organizationId: number) {
  return useQuery<OrgInterviewInfo[], Error>(
    getOrgInterviewsForHomeQueryOptions(organizationId)
  );
}

export function useMyTimeSlotsForHomeQuery(interviewId: number | undefined) {
  return useQuery<InterviewSchedule[], Error>(
    getMyTimeSlotsForHomeQueryOptions(interviewId)
  );
}
