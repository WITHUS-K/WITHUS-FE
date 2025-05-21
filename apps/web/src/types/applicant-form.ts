import type { InterviewScheduleItem } from '@web/types/application';

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
    academicStatus: string;
    major: string;
    address: string;
  };
  applicationPart: string;
  answers: string[];               
  files: (File | null)[];         
  interviewSchedule: {
    scheduleList: InterviewScheduleItem[];
  };
};