// src/store/query/useCreateSchedule.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

// — 요청/응답 타입 —
// POST /api/v1/interviews/recruitments/{recruitmentId}/interviews/{interviewId}/schedule
// → 타임테이블 생성
export interface ScheduleBody {
  interviewerPerSlot: number;
  applicantPerSlot: number;
  assistantPerSlot: number;
  roomCount: number;
  roomNames: string[];
}
export type CreateScheduleResult = string;
export type CreateScheduleVariables = {
  recruitmentId: number;
  interviewId: number;
  body: ScheduleBody;
};

// — Hook & Mutation —
export function useCreateScheduleMutation(): UseMutationResult<
  CreateScheduleResult,
  Error,
  CreateScheduleVariables
> {
  const qc = useQueryClient();

  return useMutation<CreateScheduleResult, Error, CreateScheduleVariables>({
    mutationKey: queryKeys.interview.scheduleCreate(),
    mutationFn: async ({ recruitmentId, interviewId, body }) => {
      // RESTful 경로로 변경
      console.log('보내는거', body);
      const url = `api/v1/interviews/recruitments/${recruitmentId}/interviews/${interviewId}/schedule`;
      const res = await POST<CreateScheduleResult>(url, body);
      console.log('타임테이블 생성', res);
      return res.result;
    },
    onSuccess: (_data, variables) => {
      // scheduleCreate 후, 해당 interviewId 로 스케줄 다시 불러오기
      qc.invalidateQueries({
        queryKey: queryKeys.interview.schedule(variables.interviewId),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.interview.config(variables.interviewId),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.interview.orgList(),
      });
    },
  });
}
