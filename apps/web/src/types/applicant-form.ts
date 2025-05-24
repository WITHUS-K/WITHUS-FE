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
    profileImage: File | null;
  };
  additionalInfo: {
    school: string;
    academicStatus?: 'ENROLLED' | 'GRADUATED' | 'LEAVE_OF_ABSENCE' | 'DEFERRED';
    major: string;
    address: string;
  };
  applicationPart?: PartOption;
  questionAnswers: string[];
  questionFiles: (File | null)[];
  interviewSchedule: {
    scheduleList: InterviewScheduleItem[];
  };
};
