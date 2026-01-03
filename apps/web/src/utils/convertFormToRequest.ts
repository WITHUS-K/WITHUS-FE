import type { FormValues } from '@web/types/application';
import type {
  PublishRecruitmentRequest,
  TextQuestionDto,
  FileQuestionDto,
  CreateQuestionRequest,
} from '@web/types/recruitment';
import { format, parseISO } from 'date-fns';

export function normalizeDateStr(s?: string | null) {
  if (!s) return '';
  return s.replace(/\./g, '-');
}

export function convertFormToRequest(
  form: FormValues,
  recruitmentId: number | null,
  organizationId: number,
  roleNameById?: Map<number, string> 
): PublishRecruitmentRequest {
  const interviewDuration =
    form.interviewDuration === '15분'
      ? 15
      : form.interviewDuration === '30분'
        ? 30
        : 60;

        const roleIds = form.applicationParts?.isSelected
        ? form.applicationParts.parts
        : [];
    
      // roleNames (질문 positionName/평가기준 positionName 유지용)
      // roleNameById를 안 넘기면 fallback으로 null 처리(공통만)하게 할 수도 있음
      const roleNames = roleNameById
        ? roleIds.map((id) => roleNameById.get(id)).filter(Boolean) as string[]
        : [];

        const organizationRoleIds =
  roleIds.length > 0 ? roleIds : [];

        const applicationQuestions: CreateQuestionRequest[] = form.detailItems.map(
          (item, index) => {
            const organizationRoleId =
            item.responseTarget === 0 ||
            item.responseTarget === null ||
            item.responseTarget === undefined
              ? null
              : item.responseTarget;
      
            const base = {
              type: item.type === 'text' ? ('TEXT' as const) : ('FILE' as const),
              title: item.description,
              description: item.addDescription || '',
              required: item.required,
              organizationRoleId,
              order: index + 1
            };
      
            if (item.type === 'text') {
              const textLimit =
                parseInt(item.typeInfo.infoDetail.replace(/\D/g, ''), 10) || 0;
              const includeWhitespace = item.typeInfo.info === '공백 포함';
      
              return {
                ...base,
                type: 'TEXT' as const,
                textLimit,
                includeWhitespace,
                maxFileCount: null,
                maxFileSizeMb: null,
              };
            }
      
            const maxFileCount = parseInt(item.typeInfo.info.replace(/\D/g, ''), 10) || 0;
            const maxFileSizeMb =
              parseInt(item.typeInfo.infoDetail.replace(/\D/g, ''), 10) || 0;
      
            return {
              ...base,
              type: 'FILE' as const,
              textLimit: null,
              includeWhitespace: null,
              maxFileCount,
              maxFileSizeMb,
            };
          }
        );
      

        const documentEvaluationCriteria = form.paperEvaluateItems.flatMap((section) =>
        section.items.map((item) => ({
          content: item.evaluate,
          description: item.evaluateDetail,
          type: 'DOCUMENT' as const,
          organizationRoleId:
          section.organizationRoleId === 0 ||
          section.organizationRoleId === null ||
          section.organizationRoleId === undefined
            ? null
            : section.organizationRoleId
        }))
      );
    

      const interviewEvaluationCriteria = form.interviewEvaluateItems.flatMap(
        (section) =>
          section.items.map((item) => ({
            content: item.evaluate,
            description: item.evaluateDetail,
            type: 'INTERVIEW' as const,
            organizationRoleId:
  section.organizationRoleId === 0 ||
  section.organizationRoleId === null ||
  section.organizationRoleId === undefined
    ? null
    : section.organizationRoleId
          }))
      );
      
  const availableTimeRanges = form.interviewSchedule?.isSelected
    ? form.interviewSchedule.scheduleList
        .filter(
          (s): s is { date: string; startTime: string; endTime: string } =>
            typeof s.date === 'string'
        )
        .map((s) => ({
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        }))
    : [];

  const documentDeadlineStr = form.deadline
    ? format(parseISO(normalizeDateStr(form.deadline)), 'yyyy-MM-dd')
    : '';

  const documentResultDateStr =
    form.documentResult?.isSelected && form.documentResult.date
      ? format(
          parseISO(normalizeDateStr(form.documentResult.date)),
          'yyyy-MM-dd'
        )
      : '';

  const finalResultDateStr = form.finalResultDate
    ? format(parseISO(normalizeDateStr(form.finalResultDate)), 'yyyy-MM-dd')
    : '';

  const documentScaleType =
    form.paperEvaluateStandard === 'score' ? 'SCORE' : 'LEVEL';
  const interviewScaleType =
    form.interviewEvaluateStandard === 'score' ? 'SCORE' : 'LEVEL';

  return {
    recruitmentId,
    title: form.title,

    content: '큐시즘 학회원 모집합니다.',
    organizationRoleIds,
    applicationQuestions,
    isDocumentResultRequired: form.documentResult?.isSelected as boolean,
    documentDeadline: documentDeadlineStr,
    documentResultDate: documentResultDateStr,
    finalResultDate: finalResultDateStr,

    interviewDuration,
    organizationId,
    needImage: form.basicInfo.profile,
    needGender: form.basicInfo.gender,
    needAddress: form.basicInfo.address,
    needSchool: form.basicInfo.school,
    needBirthDate: form.basicInfo.birthDate,
    needMajor: form.basicInfo.major,
    needAcademicStatus: form.basicInfo.academicStatus,
    documentScaleType,
    interviewScaleType,
    documentEvaluationCriteria,
    interviewEvaluationCriteria,
    isInterviewRequired: form.interviewSchedule?.isSelected as boolean,
    availableTimeRanges,
  };
}
