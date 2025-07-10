import type { FormValues } from '@web/types/application';
import type {
  PublishRecruitmentRequest,
  TextQuestionDto,
  FileQuestionDto,
  CreateQuestionRequest,
} from '@web/types/recruitment';
import { format, parseISO } from 'date-fns';

export function normalizeDateStr(s: string) {
  return s.replace(/\./g, '-');
}

export function convertFormToRequest(
  form: FormValues,
  recruitmentId: number | null,
  organizationId: number
): PublishRecruitmentRequest {
  const interviewDuration =
    form.interviewDuration === '15분'
      ? 15
      : form.interviewDuration === '30분'
        ? 30
        : 60;

  const customParts = form.applicationParts?.isSelected
    ? form.applicationParts.parts
    : [];
  const uiPositions = form.applicationParts?.isSelected
    ? ['공통', ...customParts]
    : ['공통'];

  const positions = customParts;

  const applicationQuestions: CreateQuestionRequest[] = form.detailItems.map(
    (item) => {
      const idx = item.responseTarget ?? 0;
      const positionName: string | null =
        idx > 0 ? (customParts[idx - 1] ?? null) : null;

      // 기본 공통 필드
      const base = {
        title: item.description,
        description: item.addDescription || '',
        required: item.isEssential,
        positionName,
      };

      if (item.type === 'text') {
        const textLimit =
          parseInt(item.typeInfo.infoDetail.replace(/\D/g, '')) || 0;
        const includeWhitespace = item.typeInfo.info === '공백 포함';

        return {
          type: 'TEXT' as const,
          ...base,
          textLimit,
          includeWhitespace,
          maxFileCount: null,
          maxFileSizeMb: null,
        };
      } else {
        const maxFileCount = parseInt(item.typeInfo.info) || 0;
        const maxFileSizeMb =
          parseInt(item.typeInfo.infoDetail.replace(/\D/g, '')) || 0;

        return {
          type: 'FILE' as const,
          ...base,
          maxFileCount,
          maxFileSizeMb,
          textLimit: null,
          includeWhitespace: null,
        };
      }
    }
  );

  const documentEvaluationCriteria = form.paperEvaluateItems.flatMap(
    (section) =>
      section.items.map((item) => ({
        content: item.evaluate,
        description: item.evaluateDetail,
        type: 'DOCUMENT' as const,
        // section.positionName이 null이면 공통, 아니면 해당 파트
        positionName: section.positionName,
      }))
  );

  const interviewEvaluationCriteria = form.interviewEvaluateItems.flatMap(
    (section) =>
      section.items.map((item) => ({
        content: item.evaluate,
        description: item.evaluateDetail,
        type: 'INTERVIEW' as const,
        positionName: section.positionName,
      }))
  );

  const availableTimeRanges = form.interviewSchedule?.isSelected
    ? form.interviewSchedule.scheduleList.map((s) => ({
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
    positions,
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
