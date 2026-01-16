import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET, POST } from '@web/api';
import { queryKeys } from '@web/store/constants/queryKeys';
import type {
  RecruitmentDetailResponse,
  PublishRecruitmentRequest,
  PublishRecruitmentResult,
} from '@web/types/recruitment';

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  return dateString.replace(/\./g, '-');  
};

export function useDuplicateRecruitmentMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (sourceRecruitmentId: number) => {
      const sourceData = await qc.fetchQuery({
        queryKey: queryKeys.recruitment.detail(sourceRecruitmentId),
        queryFn: () =>
          GET<RecruitmentDetailResponse['result']>(
            `api/v1/recruitments/${sourceRecruitmentId}`
          ).then((res) => res.result),
        staleTime: 1000 * 60 * 5,
      });

      const roleNameMap = new Map<string, number>();
      const organizationRoleIds: number[] = [];

      if (sourceData.positions?.length) {
        sourceData.positions.forEach((pos) => {
          organizationRoleIds.push(pos.id);
          roleNameMap.set(pos.roleName, pos.id);
        });
      }

      const defaultRoleId =
        organizationRoleIds.length > 0 ? organizationRoleIds[0] : null;

        const transformChildItem = (item: any) => {
          const { id, questionId, organizationRoleName, ...rest } = item;
        
          // ✅ 공통이면 null로 고정
          if (organizationRoleName === '공통' || organizationRoleName == null) {
            return {
              ...rest,
              organizationRoleId: null,
            };
          }
        
          let targetRoleId = item.organizationRoleId;
        
          if (!targetRoleId && organizationRoleName) {
            targetRoleId = roleNameMap.get(organizationRoleName);
          }
        
          // ✅ 공통이 아닌데도 못 찾으면 defaultRoleId로 fallback (원하는 정책이면 유지)
          if (!targetRoleId) {
            targetRoleId = defaultRoleId;
          }
        
          return {
            ...rest,
            organizationRoleId: targetRoleId,
          };
        };
        

      const transformTimeRanges = (item: any) => {
        const { id, recruitmentId, date, ...rest } = item;
        return {
          ...rest,
          date: formatDate(date), 
        };
      };

     const payload: PublishRecruitmentRequest = {
        recruitmentId: null, 
        title: `${sourceData.title} 복사본`,
        content: sourceData.content,
        organizationId: sourceData.organizationId,

        organizationRoleIds: organizationRoleIds,

        documentDeadline: formatDate(sourceData.documentDeadline) as any,
        documentResultDate: formatDate(sourceData.documentResultDate) as any,
        finalResultDate: formatDate(sourceData.finalResultDate) as any,

        isDocumentResultRequired: sourceData.isDocumentResultRequired,
        isInterviewRequired: sourceData.isInterviewRequired,
        interviewDuration: sourceData.interviewDuration,

        needImage: sourceData.needImage,
        needGender: sourceData.needGender,
        needAddress: sourceData.needAddress,
        needSchool: sourceData.needSchool,
        needBirthDate: sourceData.needBirthDate,
        needMajor: sourceData.needMajor,
        needAcademicStatus: sourceData.needAcademicStatus,
        documentScaleType: sourceData.documentScaleType,
        interviewScaleType: sourceData.interviewScaleType,

        applicationQuestions: sourceData.applicationQuestions?.map(transformChildItem),
        documentEvaluationCriteria: sourceData.documentEvaluationCriteria?.map(transformChildItem),
        interviewEvaluationCriteria: sourceData.interviewEvaluationCriteria?.map(transformChildItem),

        availableTimeRanges: sourceData.availableTimeRanges
          ? sourceData.availableTimeRanges.map(transformTimeRanges)
          : [],
      };

      console.log('▶ 최종 가공된 복제 요청 바디:', payload);

      const res = await POST<PublishRecruitmentResult>(
        'api/v1/recruitments/publish',
        payload
      );

      return res.result;
    },
    onSuccess: (data) => {
      console.log('✅ 복제 성공:', data);
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
      qc.invalidateQueries({ queryKey: queryKeys.recruitment.list() });
    },
    onError: (error) => {
      console.error('❌ 복제 실패:', error);
    },
  });
}