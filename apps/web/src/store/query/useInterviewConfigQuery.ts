import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface InterviewConfigResult {
  roomNames: string[];
  interviewerCount: number;
  applicantCount: number;
  assistantCount: number;
}

export interface InterviewConfigResponse {
  code: number;
  message: string;
  result: InterviewConfigResult;
  success: boolean;
}

export function useInterviewConfigQuery(interviewId: number) {
  return useQuery<InterviewConfigResult, Error>({
    queryKey: queryKeys.interview.config(interviewId),
    queryFn: async () => {
      const res = await GET<InterviewConfigResponse['result']>(
        `api/v1/interviews/${interviewId}/config`
      );
      console.log('config', res);
      return res.result;
    },
    enabled: interviewId > 0,
    staleTime: 1000 * 60 * 5,
  });
}
