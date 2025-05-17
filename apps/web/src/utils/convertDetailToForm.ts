import type { RecruitmentDetailDto, TextQuestionDto, FileQuestionDto } from "@web/types/recruitment";
import type { FormValues } from "@web/types/application";

export function convertDetailToForm(detail: RecruitmentDetailDto): FormValues {
  const interviewDuration: FormValues["interviewDuration"] =
    detail.interviewDuration === 15
      ? "15분"
      : detail.interviewDuration === 30
      ? "30분"
      : detail.interviewDuration === 60
      ? "1시간"
      : "30분";

  const parts = detail.positions.map((p) => p.name);
  const applicationParts = {
    isSelected: parts.length > 0,
    parts,
  };

  const detailItems = detail.applicationQuestions.map((q) => {
    if (q.type === "TEXT") {
      const tq = q as TextQuestionDto;
      return {
        isEssential: tq.required,
        type: "text" as const,
        description: tq.title,
        addDescription: tq.description,
        responseTarget: parts.indexOf(tq.positionName),
        typeInfo: {
          info: tq.includeWhitespace ? "공백 포함" : "공백 미포함",
          infoDetail: `${tq.textLimit}자`,
        },
      };
    } else {
      const fq = q as FileQuestionDto;
      return {
        isEssential: fq.required,
        type: "file" as const,
        description: fq.title,
        addDescription: fq.description,
        responseTarget: parts.indexOf(fq.positionName),
        typeInfo: {
          info: `${fq.maxFileCount}`,
          infoDetail: `${fq.maxFileSizeMb}MB`,
        },
      };
    }
  });

  const documentResult = {
    isSelected: Boolean(detail.documentResultDate),
    date: detail.documentResultDate,
  };

  const interviewSchedule = {
    isSelected: detail.availableTimeRanges.length > 0,
    scheduleList: detail.availableTimeRanges.map((r) => ({
      date: r.date,
      startTime: r.startTime,
      endTime: r.endTime,
    })),
  };

  const paperEvaluateStandard =
    detail.documentScaleType === "SCORE" ? "score" : "level";
  const paperEvaluateItems = detail.documentEvaluationCriteria.map((c) => ({
    evaluate: c.content,
    evaluateDetail: c.description,
  }));
  const interviewEvaluateStandard =
    detail.interviewScaleType === "SCORE" ? "score" : "level";
  const interviewEvaluateItems = detail.interviewEvaluationCriteria.map((c) => ({
    evaluate: c.content,
    evaluateDetail: c.description,
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
    deadline: detail.documentDeadline,
    documentResult,
    interviewDuration,
    interviewSchedule,
    finalResultDate: detail.finalResultDate,
    paperEvaluateStandard,
    paperEvaluateItems,
    interviewEvaluateStandard,
    interviewEvaluateItems,
  };
}