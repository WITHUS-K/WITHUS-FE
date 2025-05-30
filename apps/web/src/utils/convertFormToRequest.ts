import type { FormValues } from '@web/types/application';
import type {
  PublishRecruitmentRequest,
  TextQuestionDto,
  FileQuestionDto,
} from '@web/types/recruitment';
import { format, parseISO } from 'date-fns';

const DRAFT_FUTURE_DATE = '2027-05-30';

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

  // documentDeadline: 선택 안 했으면 2027-05-30
  const documentDeadlineStr = form.deadline
    ? format(parseISO(normalizeDateStr(form.deadline)), 'yyyy-MM-dd')
    : DRAFT_FUTURE_DATE;

  // documentResultDate: isSelected=false 이면 2027-05-30
  const documentResultDateStr =
    form.documentResult?.isSelected && form.documentResult.date
      ? format(
          parseISO(normalizeDateStr(form.documentResult.date)),
          'yyyy-MM-dd'
        )
      : DRAFT_FUTURE_DATE;

  // finalResultDate: 항상 보내야 하므로, 빈 문자열일 땐 2027-05-30
  const finalResultDateStr = form.finalResultDate
    ? format(parseISO(normalizeDateStr(form.finalResultDate)), 'yyyy-MM-dd')
    : DRAFT_FUTURE_DATE;

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
    //일단 에러 안나게 score로 보내기
    documentScaleType: 'SCORE',
    interviewScaleType: 'SCORE',
    documentEvaluationCriteria,
    interviewEvaluationCriteria,
    isInterviewRequired: form.interviewSchedule?.isSelected as boolean,
    availableTimeRanges,
  };
}
