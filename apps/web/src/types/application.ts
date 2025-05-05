export interface BasicInfo {
  birthDate: boolean; // 생년월일
  gender: boolean; // 성별
  address: boolean; // 주소
  school: boolean; // 학교
  major: boolean; // 전공
  academicStatus: boolean; // 학적 상태
}

export interface ApplicationParts {
  isSelected: boolean;
  parts: string[];
}

export interface DetailItem {
  isEssential: boolean;
  type: 'text' | 'file';
  description: string;
  addDescription?: string;
  responseTarget: number;
  typeInfo: {
    info: string;
    infoDetail: string;
  };
}

export interface AnnouncementResult {
  isSelected: boolean;
  date: string;
}

export interface InterviewScheduleItem {
  date: string;
  startTime: string;
  endTime: string;
}

export interface InterviewSchedule {
  isSelected: boolean;
  scheduleList: InterviewScheduleItem[];
}

export interface EvaluationItem {
  evaluate: string;
  evaluateDetail: string;
}

export interface ApplicationFormProps {
  //tab1
  title: string;
  basicInfo: BasicInfo;
  applicationParts?: ApplicationParts;
  detailItems: DetailItem[];

  // tab2
  deadline: string;
  documentResult?: AnnouncementResult;
  interviewDuration: '15분' | '30분' | '1시간';
  interviewSchedule?: InterviewSchedule;
  finalResultDate: string;

  // tab3
  paperEvaluateStandard: 'score' | 'level';
  paperEvaluateItems: EvaluationItem[];
  interviewEvaluateStandard: 'score' | 'level';
  interviewEvaluateItems: EvaluationItem[];
}

// react-hook-form에서 쓸 타입으로 alias
export type FormValues = ApplicationFormProps;
