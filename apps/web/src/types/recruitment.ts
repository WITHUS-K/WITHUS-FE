export interface PositionSummary {
  name: string;
  applicantCount: number;
}

export interface RecruitmentDto {
  recruitmentId: number;
  title: string;
  documentDeadline: string;
  documentResultDate: string;
  finalResultDate: string;
  organizationName: string;
  urlSlug: string;
  positionSummaries: PositionSummary[];
  isTemporary: boolean;
}

export interface RecruitmentsResponse {
  code: number;
  message: string;
  result: RecruitmentDto[];
  success: boolean;
}

export type RecruitmentsData = RecruitmentsResponse['result'];

interface BaseQuestionDto {
  questionId: number;
  title: string;
  description: string;
  required: boolean;
  organizationRoleName : string;
}

export interface TextQuestionDto extends BaseQuestionDto {
  type: 'TEXT';
  textLimit: number | null;
  includeWhitespace: boolean | null;
}

export interface FileQuestionDto extends BaseQuestionDto {
  type: 'FILE';
  maxFileCount: number | null;
  maxFileSizeMb: number | null;
}

export interface CreateTextQuestionRequest {
  type: 'TEXT';
  title: string;
  description: string;
  required: boolean;
  organizationRoleId: number | null;
  textLimit: number | null;
  includeWhitespace: boolean | null;
  maxFileCount: null;
  maxFileSizeMb: null;
  order: number;
}

export interface CreateFileQuestionRequest {
  type: 'FILE';
  title: string;
  description: string;
  required: boolean;
  organizationRoleId: number | null;
  textLimit: null;
  includeWhitespace: null;
  maxFileCount: number | null;
  maxFileSizeMb: number | null;
  order: number;
}

export type CreateQuestionRequest =
  | CreateTextQuestionRequest
  | CreateFileQuestionRequest;

export interface RecruitmentDetailDto {
  recruitmentId: number;
  organizationId: number;
  UrlSlug: string;
  title: string;
  content: string;
  fileUrl: string;
  needImage: boolean;
  needGender: boolean;
  needAddress: boolean;
  needSchool: boolean;
  needBirthDate: boolean;
  needMajor: boolean;
  needAcademicStatus: boolean;
  positions: {
    id: number;
    roleName: string;
    color: string;
  }[];
  documentDeadline: string;
  isDocumentResultRequired: boolean;
  documentResultDate: string;
  finalResultDate: string;
  interviewDuration: number;
  organizationName: string;
  documentScaleType: 'SCORE' | 'LEVEL' | string;
  interviewScaleType: 'SCORE' | 'LEVEL' | string;

  documentEvaluationCriteria: {
    id: number;
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
    score: number;
    organizationRoleName : string;
  }[];
  interviewEvaluationCriteria: {
    id: number;
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
    score: number;
    organizationRoleName : string;
  }[];
  applicationQuestions: Array<TextQuestionDto | FileQuestionDto>;
  isInterviewRequired: boolean;
  availableTimeRanges: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    recruitmentId: number;
  }[];
}

export interface RecruitmentDetailResponse {
  code: number;
  message: string;
  result: RecruitmentDetailDto;
  success: boolean;
}

export interface UpdateRecruitmentRequest {
  title: string;
  content: string;
  fileUrl: string;
  positions: string;
  documentDeadline: string;
  documentResultDate: string | null;
  finalResultDate: string;
  interviewDuration: number;
  needGender: boolean;
  needAddress: boolean;
  needSchool: boolean;
  needBirthDate: boolean;
  needAcademicStatus: boolean;
  isTemporary: boolean;
  documentScaleType: 'SCORE' | 'LEVEL' | string;
  interviewScaleType: 'SCORE' | 'LEVEL' | string;
  documentEvaluationCriteria: {
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
  }[];
  interviewEvaluationCriteria: {
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
  }[];
  availableTimeRanges: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface DeleteRecruitmentResponse {
  code: number;
  message: string;
  result: string;
  success: boolean;
}

export interface PublishRecruitmentRequest {
  recruitmentId: number | null;
  title: string;
  content: string;
   organizationRoleIds: number[] | null;
  applicationQuestions: CreateQuestionRequest[];
  documentDeadline: string;
  isDocumentResultRequired: boolean;
  documentResultDate: string | null;
  finalResultDate: string;
  interviewDuration: number;
  organizationId: number;
  needImage: boolean;
  needGender: boolean;
  needAddress: boolean;
  needSchool: boolean;
  needBirthDate: boolean;
  needMajor: boolean;
  needAcademicStatus: boolean;
  documentScaleType: 'SCORE' | 'LEVEL' | string;
  interviewScaleType: 'SCORE' | 'LEVEL' | string;

  documentEvaluationCriteria: {
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
    organizationRoleId: number | null;
  }[];
  interviewEvaluationCriteria: {
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
    organizationRoleId: number | null;
  }[];

  isInterviewRequired: boolean;
  availableTimeRanges: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface PublishRecruitmentResponse {
  code: number;
  message: string;
  result: {
    recruitmentId: number;
  };
  success: boolean;
}

export type PublishRecruitmentResult = { recruitmentId: number };

export interface DraftRecruitmentRequest {
  recruitmentId: number | null;
  title: string;
  content: string;
  organizationRoleIds: number[] | null;
  applicationQuestions: CreateQuestionRequest[];
  documentDeadline: string;
  documentResultDate: string | null;
  finalResultDate: string;
  interviewDuration: number;
  organizationId: number;
  needImage: boolean;
  needGender: boolean;
  needAddress: boolean;
  needSchool: boolean;
  needBirthDate: boolean;
  needMajor: boolean;
  needAcademicStatus: boolean;
  documentScaleType: 'SCORE' | 'LEVEL' | string;
  interviewScaleType: 'SCORE' | 'LEVEL' | string;
  isDocumentResultRequired: boolean;
  isInterviewRequired: boolean;
  documentEvaluationCriteria: {
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
    organizationRoleId: number | null; 
  }[];
  interviewEvaluationCriteria: {
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW' | string;
    organizationRoleId: number | null; 
  }[];
  availableTimeRanges: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface DraftRecruitmentResponse {
  code: number;
  message: string;
  result: {
    recruitmentId: number;
  };
  success: boolean;
}

export type DraftRecruitmentResult = DraftRecruitmentResponse['result'];
