import type { FormValues } from "@web/types/application";
import type {
  PublishRecruitmentRequest,
  TextQuestionDto,
  FileQuestionDto,
} from "@web/types/recruitment";

export function convertFormToRequest(
  form: FormValues,
  recruitmentId: number | null,
): PublishRecruitmentRequest {
  const interviewDuration =
    form.interviewDuration === "15분"
      ? 15
      : form.interviewDuration === "30분"
      ? 30
      : 60;

  const positions = form.applicationParts?.isSelected
    ? form.applicationParts.parts
    : ["공통"];

  const applicationQuestions: Array<TextQuestionDto | FileQuestionDto> =
    form.detailItems.map((item) => {
      const idx =
        item.responseTarget >= 0 && item.responseTarget < positions.length
          ? item.responseTarget
          : 0;
      const positionName = positions[idx];

      if (item.type === "text") {
        return {
          type: "TEXT",
          title: item.description,
          description: item.addDescription || "",
          required: item.isEssential,
          positionName,
          textLimit:
            parseInt(item.typeInfo.infoDetail.replace(/[^0-9]/g, "")) || 0,
          includeWhitespace: item.typeInfo.info === "공백 포함",
        } as TextQuestionDto;
      } else {
        return {
          type: "FILE",
          title: item.description,
          description: item.addDescription || "",
          required: item.isEssential,
          positionName,
          maxFileCount: parseInt(item.typeInfo.info) || 0,
          maxFileSizeMb:
            parseInt(item.typeInfo.infoDetail.replace(/[^0-9]/g, "")) || 0,
        } as FileQuestionDto;
      }
    });

  const documentEvaluationCriteria = form.paperEvaluateItems.map((p) => ({
    content: p.evaluate,
    description: p.evaluateDetail,
    type: "DOCUMENT" as const,
  }));
  const interviewEvaluationCriteria = form.interviewEvaluateItems.map(
    (i) => ({
      content: i.evaluate,
      description: i.evaluateDetail,
      type: "INTERVIEW" as const,
    })
  );

  const availableTimeRanges = form.interviewSchedule?.isSelected
    ? form.interviewSchedule.scheduleList.map((s) => ({
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
      }))
    : [];

  return {
    recruitmentId,
    title: form.title,
    content: "큐시즘 학회원 모집합니다.",   
    fileUrl: "https://withus.com/files/recruit.pdf",   
    positions,
    applicationQuestions,
    documentDeadline: form.deadline || "2025-06-01",
    documentResultDate: form.documentResult?.date || "",
    finalResultDate: form.finalResultDate || "2025-06-01",
    interviewDuration,
    organizationId: 1,                   
    needGender: form.basicInfo.gender,
    needAddress: form.basicInfo.address,
    needSchool: form.basicInfo.school,
    needBirthDate: form.basicInfo.birthDate,
    needMajor: form.basicInfo.major,
    needAcademicStatus: form.basicInfo.academicStatus,
    documentScaleType:
      form.paperEvaluateStandard.toUpperCase() as "SCORE" | "RANK",
    interviewScaleType:
      form.interviewEvaluateStandard.toUpperCase() as "SCORE" | "RANK",
    documentEvaluationCriteria,
    interviewEvaluationCriteria,
    availableTimeRanges,
  };
}