import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';
import { TemplateDetail } from '../query/useTemplatesQuery';

export interface CreateTemplateRequest {
  name: string;
  subject?: string;
  body: string;
  organizationId: number;
  medium: 'SMS' | 'MAIL';
}

export function useCreateTemplate() {
  const qc = useQueryClient();
  return useMutation<TemplateDetail, Error, CreateTemplateRequest>({
    mutationFn: async (body) => {
      console.log('[useCreateTemplate] 요청 페이로드:', body);
      const res = await POST<TemplateDetail>('api/v1/templates', body);
      console.log('[useCreateTemplate] 응답 결과:', res);
      return res.result;
    },
    onSuccess: (_, variables) => {
      // 생성 후 목록 갱신
      qc.invalidateQueries({
        queryKey: queryKeys.templates.list(variables.medium),
      });
    },
  });
}
