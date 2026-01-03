import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PUT} from '@web/api/fetch';
import { queryKeys } from '../constants';

// =========================
// PUT /api/v1/templates/{templateId}
// 문자/메일 템플릿 수정
// =========================

export interface UpdateTemplateRequest {
  templateId: number;
  name: string;
  subject?: string;
  body: string;
  medium: 'SMS' | 'MAIL';
}

type UpdateTemplateResponse = string;

export function useUpdateTemplate() {
  const qc = useQueryClient();

  return useMutation<UpdateTemplateResponse, Error, UpdateTemplateRequest>({
    mutationFn: async ({ templateId, ...payload }) => {
      console.log('[useUpdateTemplate] 요청 path:', templateId);
      console.log('[useUpdateTemplate] 요청 페이로드:', payload);

      const res = await PUT<UpdateTemplateResponse>(
        `api/v1/templates/${templateId}`,
        payload
      );

      console.log('[useUpdateTemplate] 응답 결과:', res);
      return res.result;
    },
    onSuccess: (_, variables) => {
      // 수정 후 목록 갱신
      qc.invalidateQueries({
        queryKey: queryKeys.templates.list(variables.medium),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.templates.detail(variables.templateId),
      });
    },
  });
}
