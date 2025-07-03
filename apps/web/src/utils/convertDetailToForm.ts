import type {
  RecruitmentDetailDto,
  TextQuestionDto,
  FileQuestionDto,
} from '@web/types/recruitment';
import type { EvaluationItem, FormValues } from '@web/types/application';
import { normalizeDateStr } from './convertFormToRequest';

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

  const sectionKeys: Array<string | null> =
    parts.length > 0 ? [null, ...parts] : [null];

  const toEvalItem = (c: {
    content: string;
    description: string;
  }): EvaluationItem => ({
    evaluate: c.content,
    evaluateDetail: c.description,
    positionName: null, // 실제는 section.level 에서 대입
  });

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
    detail.documentDeadline && detail.documentDeadline !== ''
      ? normalizeDateStr(detail.documentDeadline)
      : '';

  const rawDocDate = detail.documentResultDate ?? '';
  const documentResult = {
    isSelected: detail.isDocumentResultRequired && rawDocDate !== '',
    date: rawDocDate !== '' ? normalizeDateStr(rawDocDate) : '',
  };

  const rawFinal = detail.finalResultDate ?? '';
  const finalResultDate = rawFinal !== '' ? normalizeDateStr(rawFinal) : '';

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
  const paperEvaluateItems = sectionKeys.map((sec) => ({
    positionName: sec,
    items: detail.documentEvaluationCriteria
      .filter((c) => (c.positionName ?? null) === sec)
      .map((c) => ({
        evaluate: c.content,
        evaluateDetail: c.description,
      })),
  }));

  const interviewEvaluateStandard =
    detail.interviewScaleType === 'SCORE' ? 'score' : 'level';
  const interviewEvaluateItems = sectionKeys.map((sec) => ({
    positionName: sec,
    items: detail.interviewEvaluationCriteria
      .filter((c) => (c.positionName ?? null) === sec)
      .map((c) => ({
        evaluate: c.content,
        evaluateDetail: c.description,
      })),
  }));

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
    finalResultDate,
    interviewDuration,
    interviewSchedule,
    paperEvaluateStandard,
    paperEvaluateItems,
    interviewEvaluateStandard,
    interviewEvaluateItems,
  };
}
