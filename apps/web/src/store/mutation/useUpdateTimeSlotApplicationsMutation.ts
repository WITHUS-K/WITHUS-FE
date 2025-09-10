import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { PATCH } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface UpdateTimeSlotApplicationsRequest {
  applicantIds: number[];
}

export interface UpdateTimeSlotApplicationsResponse {
  result: string;
}

/**
 * PATCH /api/v1/time-slots/{timeSlotId}/applications
 * → 특정 타임 슬롯에 배정된 지원자 전체를 수정
 */
export function useUpdateTimeSlotApplicationsMutation(
  timeSlotId: number,
  interviewId: number
): UseMutationResult<void, Error, UpdateTimeSlotApplicationsRequest> {
  const qc = useQueryClient();

  return useMutation<void, Error, UpdateTimeSlotApplicationsRequest>({
    mutationFn: async (body) => {
      const res = await PATCH<UpdateTimeSlotApplicationsResponse>(
        `api/v1/time-slots/${timeSlotId}/applications`,
        body
      );
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.timeSlot.detail(timeSlotId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.interview.schedule(interviewId),
      });
    },

    onError: (error) => {
      console.error('[useUpdateTimeSlotApplications] onError →', error);
    },
  });
}
