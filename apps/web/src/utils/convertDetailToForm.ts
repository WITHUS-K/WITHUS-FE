import type {
  RecruitmentDetailDto,
  TextQuestionDto,
  FileQuestionDto,
} from '@web/types/recruitment';
import type { FormValues } from '@web/types/application';
import { normalizeDateStr } from './convertFormToRequest';

const DRAFT_FUTURE_DATE = '2027-05-30';

export function convertDetailToForm(detail: RecruitmentDetailDto): FormValues {
  const DURATION_MAP: Record<number, FormValues['interviewDuration']> = {
    15: '15분',
    30: '30분',
    60: '1시간',
  };
  const interviewDuration = DURATION_MAP[detail.interviewDuration] ?? '30분';

  const parts = detail.positions.map((p) => p.name);

  //'공통' 을 포함한 전체 targets
  const fullTargets = ['공통', ...parts];

  const applicationParts = {
    isSelected: parts.length > 0,
    parts,
  };

  const detailItems = detail.applicationQuestions.map((q) => {
    const posName =
      (q.type === 'TEXT'
        ? (q as TextQuestionDto).positionName
        : (q as FileQuestionDto).positionName) || '공통';
    // fullTargets에서 인덱스 추출, 없으면 0
    const idx = fullTargets.indexOf(posName);
    const responseTarget = idx >= 0 ? idx : 0;

    if (q.type === 'TEXT') {
      const tq = q as TextQuestionDto;
      return {
        isEssential: tq.required,
        type: 'text' as const,
        description: tq.title,
        addDescription: tq.description,
        responseTarget,
        typeInfo: {
          info: tq.includeWhitespace ? '공백 포함' : '공백 미포함',
          infoDetail: `${tq.textLimit}`,
        },
      };
    } else {
      const fq = q as FileQuestionDto;
      return {
        isEssential: fq.required,
        type: 'file' as const,
        description: fq.title,
        addDescription: fq.description,
        responseTarget,
        typeInfo: {
          info: `${fq.maxFileCount}`,
          infoDetail: `${fq.maxFileSizeMb}`,
        },
      };
    }
  });

  /*const documentResult = {
    isSelected: detail.isDocumentResultRequired,
    date: detail.documentResultDate,
  };*/
  const deadline =
    detail.documentDeadline === DRAFT_FUTURE_DATE
      ? ''
      : normalizeDateStr(detail.documentDeadline);

  // detail.documentResultDate 이 DRAFT_FUTURE_DATE 면 빈값, 선택도 false
  const docDate =
    normalizeDateStr(detail.documentResultDate) === DRAFT_FUTURE_DATE
      ? ''
      : (normalizeDateStr(detail.documentResultDate) ?? '');
  const isDocSelected =
    detail.isDocumentResultRequired &&
    normalizeDateStr(detail.documentResultDate) !== DRAFT_FUTURE_DATE;
  const documentResult = {
    isSelected: isDocSelected,
    date: docDate,
  };

  // finalResultDate 도 마찬가지로 DRAFT_FUTURE_DATE 면 빈값
  const finalDate =
    normalizeDateStr(detail.finalResultDate) === DRAFT_FUTURE_DATE
      ? ''
      : normalizeDateStr(detail.finalResultDate);

  const interviewSchedule = {
    isSelected: detail.isInterviewRequired,
    scheduleList: detail.availableTimeRanges.map((r) => ({
      date: normalizeDateStr(r.date),
      startTime: r.startTime,
      endTime: r.endTime,
    })),
  };

  const paperEvaluateStandard =
    detail.documentScaleType === 'SCORE' ? 'score' : 'level';
  const paperEvaluateItems = detail.documentEvaluationCriteria.map((c) => ({
    evaluate: c.content,
    evaluateDetail: c.description,
  }));
  const interviewEvaluateStandard =
    detail.interviewScaleType === 'SCORE' ? 'score' : 'level';
  const interviewEvaluateItems = detail.interviewEvaluationCriteria.map(
    (c) => ({
      evaluate: c.content,
      evaluateDetail: c.description,
    })
  );

  return {
    title: detail.title,
    basicInfo: {
      birthDate: detail.needBirthDate,
      gender: detail.needGender,
      address: detail.needAddress,
      school: detail.needSchool,
      major: detail.needMajor,
      academicStatus: detail.needAcademicStatus,
    },
    applicationParts,
    detailItems,
    deadline,
    documentResult,
    finalResultDate: finalDate,
    interviewDuration,
    interviewSchedule,
    paperEvaluateStandard,
    paperEvaluateItems,
    interviewEvaluateStandard,
    interviewEvaluateItems,
  };
}
