import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface TemplateSummary {
  id: number;
  name: string;
  medium: 'SMS' | 'MAIL';
}

export interface TemplateDetail {
  id: number;
  name: string;
  subject?: string;
  body: string;
  medium: 'SMS' | 'MAIL';
}

export function useTemplateDetailQuery(templateId: number) {
  return useQuery<TemplateDetail, Error>({
    queryKey: queryKeys.templates.detail(templateId),
    queryFn: async () => {
      const res = await GET<TemplateDetail>(`api/v1/templates/${templateId}`);
      console.log('템플릿 디테일', res);
      return res.result;
    },
    enabled: templateId > 0,
  });
}
