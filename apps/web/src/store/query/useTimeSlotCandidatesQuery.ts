import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface TimeSlotCandidate {
  applicationId: number;
  name: string;
}

export interface GetTimeSlotCandidatesResponse {
  code: number;
  message: string;
  result: TimeSlotCandidate[];
  success: boolean;
}

export interface GetTimeSlotCandidatesParams {
  recruitmentId: number;
  timeSlotId: number;
  query?: string;
  excludeCurrent?: boolean;
}

export function useTimeSlotCandidatesQuery({
  recruitmentId,
  timeSlotId,
  query,
  excludeCurrent = true,
}: GetTimeSlotCandidatesParams) {
  return useQuery<TimeSlotCandidate[], Error>({
    queryKey: queryKeys.timeSlot.candidates(
      recruitmentId,
      timeSlotId,
      query,
      excludeCurrent
    ),
    queryFn: async () => {
      const qs = new URLSearchParams();
      if (query && query.trim()) qs.set('query', query.trim());

      qs.set('excludeCurrent', String(excludeCurrent));

      const url = `api/v1/admin/applications/recruitments/${recruitmentId}/timeslots/${timeSlotId}/candidates${
        qs.toString() ? `?${qs.toString()}` : ''
      }`;

      const res = await GET<GetTimeSlotCandidatesResponse['result']>(url);
      return res.result;
    },
    enabled: recruitmentId > 0 && timeSlotId > 0,
    staleTime: 1000 * 60 * 5,
  });
}
