export interface BasicInfo {
  birthDate: boolean; // 생년월일
  gender: boolean; // 성별
  address: boolean; // 주소
  school: boolean; // 학교
  major: boolean; // 전공
  academicStatus: boolean; // 학적 상태
}
  
export interface ApplicationParts { // 지원파트
  isSelected: boolean;
  parts: string[];
}

export interface DetailItem { // 상세 내용 (장문형 / 파일업로드)
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

export interface AnnouncementResult { // 서류 합격 발표
  isSelected: boolean;
  date: string;
}

export interface InterviewScheduleItem { // 면접 일정 세부 값
  date: string;
  startTime: string;
  endTime: string;
}

export interface InterviewSchedule { // 면접 일정
  isSelected: boolean;
  scheduleList: InterviewScheduleItem[];
}

export interface EvaluationItem { // 평가 항목
  evaluate: string; // 평가 내용
  evaluateDetail: string; // 평가 상세 설명
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

  activeSection?: string;
}

// react-hook-form에서 쓸 타입으로 alias
export type FormValues = ApplicationFormProps;