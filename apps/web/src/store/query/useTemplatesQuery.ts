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

export function useTemplatesQuery(medium: 'SMS' | 'MAIL') {
  return useQuery<TemplateSummary[], Error>({
    queryKey: queryKeys.templates.list(medium),
    queryFn: async () => {
      const res = await GET<TemplateSummary[]>(
        `api/v1/templates?medium=${medium}`
      );
      console.log('템플릿 리스트', res);
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  });
}
