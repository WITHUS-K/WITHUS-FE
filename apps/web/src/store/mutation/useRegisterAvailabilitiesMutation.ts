// src/store/mutation/useRegisterAvailabilitiesMutation.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

/** 요청 바디 타입 */
export interface RegisterAvailabilitiesRequest {
  availableTimes: string[]; // ["2025-05-22T10:00:00", "2025-05-22T10:30:00", …]
}

/**
 * 면접 가능 시간 등록 Mutation
 * interviewId: path param
 */
export function useRegisterAvailabilitiesMutation(
  interviewId: number
): UseMutationResult<void, Error, RegisterAvailabilitiesRequest> {
  const qc = useQueryClient();
  return useMutation<void, Error, RegisterAvailabilitiesRequest>({
    // async/await 버전으로 바꾸면 반환 타입이 Promise<void>가 됩니다
    mutationFn: async (body) => {
      await POST(`api/v1/interviewers/${interviewId}/availabilities`, body);
      // void 반환
      console.log("면접", body);
    },
    onSuccess: () => {
      // 저장 후 조직의 면접 정보 리스트를 리패치
      //qc.invalidateQueries({ queryKey: queryKeys.interview.orgList() });
      qc.invalidateQueries({
        queryKey: queryKeys.interview.schedule(interviewId),
      });
    },
  });
}
