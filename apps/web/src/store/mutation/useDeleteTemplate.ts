import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PUT, DELETE } from '@web/api/fetch';
import { queryKeys } from '../constants';

// =========================
// DELETE /api/v1/templates/{templateId}
// 문자/메일 템플릿 삭제
// =========================

export interface DeleteTemplateRequest {
    templateId: number;
    medium: 'SMS' | 'MAIL'; // 삭제 후 어떤 목록을 invalidate 할지 필요
  }
  
  type DeleteTemplateResponse = string;
  
  export function useDeleteTemplate() {
    const qc = useQueryClient();
  
    return useMutation<DeleteTemplateResponse, Error, DeleteTemplateRequest>({
      mutationFn: async ({ templateId }) => {
        console.log('[useDeleteTemplate] 요청 path:', templateId);
  
        const res = await DELETE<DeleteTemplateResponse>(
          `api/v1/templates/${templateId}`
        );
  
        console.log('[useDeleteTemplate] 응답 결과:', res);
        return res.result;
      },
      onSuccess: (_, variables) => {
        // 목록 갱신
        qc.invalidateQueries({
          queryKey: queryKeys.templates.list(variables.medium),
        });
  
        // 상세 캐시 제거 (이미 삭제됐으니 invalidate보다 remove가 자연스러움)
        qc.removeQueries({
          queryKey: queryKeys.templates.detail(variables.templateId),
        });
      },
    });
  }