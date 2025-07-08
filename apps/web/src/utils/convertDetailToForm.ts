import type {
  RecruitmentDetailDto,
  TextQuestionDto,
  FileQuestionDto,
} from '@web/types/recruitment';
import type { EvaluationItem, FormValues } from '@web/types/application';
import { normalizeDateStr } from './convertFormToRequest';
import {
  CHAR_LIMITS,
  FILE_COUNTS,
  FILE_SIZES,
} from '@web/constants/application';

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

    const idx = fullTargets.indexOf(posName);
    const responseTarget = idx >= 0 ? idx : 0;

    if (q.type === 'TEXT') {
      const tq = q as TextQuestionDto;

      const typeInfo = {
        info: tq.includeWhitespace ? '공백 포함' : '공백 제외',
        infoDetail: (CHAR_LIMITS.find((limit) => {
          const limitValue = parseInt(limit.replace(/\D/g, ''));
          return limitValue === tq.textLimit;
        }) ?? '제한 없음') as string,
      };

      return {
        isEssential: tq.required,
        type: 'text' as const,
        description: tq.title,
        addDescription: tq.description,
        responseTarget,
        typeInfo,
      };
    } else {
      const fq = q as FileQuestionDto;

      const typeInfo = {
        info: (FILE_COUNTS.find((count) => {
          const num = parseInt(count.replace(/\D/g, ''));
          return num === fq.maxFileCount;
        }) ?? FILE_COUNTS[0]) as string,

        infoDetail: (FILE_SIZES.find((size) => {
          const mb = parseInt(size.replace(/\D/g, ''));
          return mb === fq.maxFileSizeMb;
        }) ?? FILE_SIZES[0]) as string,
      };

      return {
        isEssential: fq.required,
        type: 'file' as const,
        description: fq.title,
        addDescription: fq.description,
        responseTarget,
        typeInfo,
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
      profile: detail.needImage,
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
