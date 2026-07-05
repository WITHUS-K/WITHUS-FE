import { AnswerFile } from '@web/components/QuestionFileListForm/QuestionFileListForm';
import type { InterviewScheduleItem } from '@web/types/application';

export type PartOption = {
  id: number;
  label: string;
};

export type ApplicantForm = {
  basicInfo: {
    name: string;
    gender?: 'male' | 'female';
    phone: string;
    birthDate?: string;
    email: string;
  };
  additionalInfo: {
    school: string;
    academicStatus?: 'ENROLLED' | 'GRADUATED' | 'LEAVE_OF_ABSENCE' | 'DEFERRED';
    major: string;
    address: string;
    profileImage: File | null;
  };
  applicationPart?: PartOption;
  applicationParts?: PartOption[];
  questionAnswers: string[];
  questionFiles: AnswerFile[][];
  interviewSchedule: {
    scheduleList: InterviewScheduleItem[];
  };
};
