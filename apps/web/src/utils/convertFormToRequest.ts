import type { FormValues } from '@web/types/application';
import type {
  PublishRecruitmentRequest,
  TextQuestionDto,
  FileQuestionDto,
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

  const applicationQuestions: Array<TextQuestionDto | FileQuestionDto> =
    form.detailItems.map((item) => {
      const idx = item.responseTarget ?? 0;

      // 공통은 null, 나머지는 customParts[idx-1]
      const positionName = idx > 0 ? customParts[idx - 1] : null;

      if (item.type === 'text') {
        return {
          type: 'TEXT',
          title: item.description,
          description: item.addDescription || '',
          required: item.isEssential,
          positionName,
          textLimit:
            parseInt(item.typeInfo.infoDetail.replace(/[^0-9]/g, '')) || 0,
          includeWhitespace: item.typeInfo.info === '공백 포함',
        } as TextQuestionDto;
      } else {
        return {
          type: 'FILE',
          title: item.description,
          description: item.addDescription || '',
          required: item.isEssential,
          positionName,
          maxFileCount: parseInt(item.typeInfo.info) || 0,
          maxFileSizeMb:
            parseInt(item.typeInfo.infoDetail.replace(/[^0-9]/g, '')) || 0,
        } as FileQuestionDto;
      }
    });

  const documentEvaluationCriteria = form.paperEvaluateItems.map((p) => ({
    content: p.evaluate,
    description: p.evaluateDetail,
    type: 'DOCUMENT' as const,
  }));
  const interviewEvaluationCriteria = form.interviewEvaluateItems.map((i) => ({
    content: i.evaluate,
    description: i.evaluateDetail,
    type: 'INTERVIEW' as const,
  }));

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
