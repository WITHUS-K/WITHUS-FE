import type {
  RecruitmentDetailDto,
  TextQuestionDto,
  FileQuestionDto,
} from '@web/types/recruitment';
import type { FormValues } from '@web/types/application';
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

  const interviewDuration =
    DURATION_MAP[detail.interviewDuration] ?? '30분';

  /** --------------------------------
   *  role mapping
   * -------------------------------- */
  const roleIds = detail.positions.map((p) => p.id);

  const roleNameToId = new Map<string, number>();
  detail.positions.forEach((p) => {
    roleNameToId.set(p.roleName, p.id);
  });

  /** --------------------------------
   *  application parts (id 기반)
   * -------------------------------- */
  const applicationParts = {
    isSelected: roleIds.length > 0,
    parts: roleIds,
  };

  /** --------------------------------
   *  questions
   * -------------------------------- */
  const detailItems = detail.applicationQuestions.map((q) => {
    const roleName = q.organizationRoleName ?? null;
    const organizationRoleId =
      roleName === null ? 0 : roleNameToId.get(roleName) ?? 0;

    if (q.type === 'TEXT') {
      const tq = q as TextQuestionDto;

      const typeInfo = {
        info: tq.includeWhitespace ? '공백 포함' : '공백 제외',
        infoDetail:
          CHAR_LIMITS.find((limit) => {
            const v = parseInt(limit.replace(/\D/g, ''), 10);
            return v === tq.textLimit;
          }) ?? '제한 없음',
      };

      return {
        required: tq.required,
        type: 'text' as const,
        description: tq.title,
        addDescription: tq.description,
        responseTarget: organizationRoleId, // ✅ id
        typeInfo,
      };
    }

    const fq = q as FileQuestionDto;

    const typeInfo = {
      info:
        FILE_COUNTS.find((c) => {
          const v = parseInt(c.replace(/\D/g, ''), 10);
          return v === fq.maxFileCount;
        }) ?? FILE_COUNTS[0]!,
      infoDetail:
        FILE_SIZES.find((s) => {
          const v = parseInt(s.replace(/\D/g, ''), 10);
          return v === fq.maxFileSizeMb;
        }) ?? FILE_SIZES[0]!,
    };

    return {
      required: fq.required,
      type: 'file' as const,
      description: fq.title,
      addDescription: fq.description,
      responseTarget: organizationRoleId, // ✅ id
      typeInfo,
    };
  });

  /** --------------------------------
   *  dates
   * -------------------------------- */
  const deadline =
    detail.documentDeadline !== ''
      ? normalizeDateStr(detail.documentDeadline)
      : '';

  const documentResult = {
    isSelected:
      detail.isDocumentResultRequired &&
      !!detail.documentResultDate,
    date: detail.documentResultDate
      ? normalizeDateStr(detail.documentResultDate)
      : '',
  };

  const finalResultDate = detail.finalResultDate
    ? normalizeDateStr(detail.finalResultDate)
    : '';

  /** --------------------------------
   *  interview schedule
   * -------------------------------- */
  const interviewSchedule = {
    isSelected: detail.isInterviewRequired,
    scheduleList: detail.availableTimeRanges.map((r) => ({
      date: normalizeDateStr(r.date),
      startTime: r.startTime,
      endTime: r.endTime,
    })),
  };

  /** --------------------------------
   *  evaluation criteria (id 기반)
   * -------------------------------- */
  const sectionRoleIds =
    roleIds.length > 0 ? [0, ...roleIds] : [0];

  const paperEvaluateStandard =
    detail.documentScaleType === 'SCORE' ? 'score' : 'level';

  const paperEvaluateItems = sectionRoleIds.map((rid) => ({
    organizationRoleId: rid,
    items: detail.documentEvaluationCriteria
      .filter((c) => {
        if (rid === 0) return c.organizationRoleName == null;
        return roleNameToId.get(c.organizationRoleName!) === rid;
      })
      .map((c) => ({
        evaluate: c.content,
        evaluateDetail: c.description,
      })),
  }));

  const interviewEvaluateStandard =
    detail.interviewScaleType === 'SCORE' ? 'score' : 'level';

  const interviewEvaluateItems = sectionRoleIds.map((rid) => ({
    organizationRoleId: rid,
    items: detail.interviewEvaluationCriteria
      .filter((c) => {
        if (rid === 0) return c.organizationRoleName == null;
        return roleNameToId.get(c.organizationRoleName!) === rid;
      })
      .map((c) => ({
        evaluate: c.content,
        evaluateDetail: c.description,
      })),
  }));

  /** --------------------------------
   *  return form
   * -------------------------------- */
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
