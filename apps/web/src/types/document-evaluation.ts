export type ISODate = string

export type ISOTime = string

export interface TypeInfo {
  info: string
  infoDetail: string
}

export interface DocumentResult {
  isSelected: boolean
  date: ISODate
}

export interface InterviewSlot {
  date: ISODate
  startTime: ISOTime
  endTime: ISOTime
}

export interface InterviewSchedule {
  isSelected: boolean
  scheduleList: InterviewSlot[]
}

export interface BasicInfo {
  name: string
  gender?: 'male' | 'female'
  phone: string
  birthDate?: ISODate
  email: string
  profileImage: File | null
}

export interface AdditionalInfo {
  school: string
  academicStatus: string
  major: string
  address: string
}

export interface DocumentQuestion {
  question: string
  answer: string
  typeInfo: TypeInfo
}

export interface AttachedFile {
  description: string
  addDescription: string
  typeInfo: TypeInfo
  files: Array< File | null>
}

export interface EvaluationItem {
  evaluation: string
  evaluationDetail: string
}

export interface Evaluation {
  evaluationType: 'score' | 'level'
  evaluationList: EvaluationItem[]
}

export interface EvaluationStatus {
  evaluator: string
  status: 'pending' | 'complete'
  score: number | null
}

export interface Comment {
  evaluator: string
  comment: string
}

export interface BaseApplicant {
  id: number
  basicInfo: BasicInfo
  additionalInfo: AdditionalInfo
  applicationPart: string
  documentQuestion: DocumentQuestion[]
  attachedFile: AttachedFile
  comments: Comment[]
}


export interface DocumentApplicant extends BaseApplicant {
  
  documentEvaluationList: Evaluation
  interviewEvaluationList: Evaluation
}

export interface FormApplicant extends BaseApplicant {
  documentEvaluation: EvaluationStatus[]
  interviewEvaluation: EvaluationStatus[]
  relations: string[]
}


export type documentEvaluation = {
  applicationCode: string
  title: string
  deadline: ISODate

  documentResult: DocumentResult
  interviewSchedule: InterviewSchedule
  finalResultDate: ISODate

  applicantList: FormApplicant[]
}

export interface DocumentEvaluationDataForUser {
  applicationCode: string
  title: string
  deadline: ISODate

  documentResult: DocumentResult
  interviewSchedule: InterviewSchedule
  finalResultDate: ISODate

  applicantList: DocumentApplicant[]
}