import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface ScheduleBody {
  interviewerPerSlot: number;
  applicantPerSlot: number;
  roomCount: number;
}
export type CreateScheduleResult = string;
export type CreateScheduleVariables = {
  recruitmentId: number;
  interviewId: number;
  body: ScheduleBody;
};

export function useCreateScheduleMutation(): UseMutationResult<
  CreateScheduleResult,
  Error,
  CreateScheduleVariables
> {
  const qc = useQueryClient();

  return useMutation<CreateScheduleResult, Error, CreateScheduleVariables>({
    mutationKey: queryKeys.interview.scheduleCreate(),
    mutationFn: async ({ recruitmentId, interviewId, body }) => {
      const url =
        `api/v1/interviews/schedule` +
        `?recruitmentId=${recruitmentId}` +
        `&interviewId=${interviewId}`;
      const res = await POST<CreateScheduleResult>(url, body);
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.interview.orgList() });
    },
  });
}
