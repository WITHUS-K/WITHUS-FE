import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants/queryKeys';

export interface ApplicantSearchItem {
  id: string; 
  name: string;
  email: string;
  profileUrl?: string;
}

export interface ApplicantsSearchResponse {
  code: number;
  message: string;
  result: Array<{
    applicationId: number;
    name: string;
    email: string;
    profileImageUrl: string;
  }>;
  success: boolean;
}

export function useApplicantsSearchQuery(
  recruitmentId: number,
  keyword: string
) {
  const trimmed = keyword.trim();

  return useQuery<ApplicantSearchItem[], Error>({
    queryKey: queryKeys.applications.applicantsSearch(recruitmentId, trimmed),
    queryFn: async () => {
      const res = await GET<ApplicantsSearchResponse['result']>(
        `api/v1/admin/applications/recruitment/${recruitmentId}/search`,
        trimmed ? { keyword: trimmed } : undefined
      );
      console.log("받는자 검색", res)
      return res.result.map((u) => ({
        id: String(u.applicationId),
        name: u.name,
        email: u.email,
        profileUrl: u.profileImageUrl ?? '',
      }));
    },
    enabled: !!recruitmentId && trimmed.length > 0,
    staleTime: 5_000, // 검색은 짧게
  });
}
