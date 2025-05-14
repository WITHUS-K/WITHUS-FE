export type documentEvaluation= {
  applicationCode: string;
  title: string;
  deadline: string;
  documentResult: {
    isSelected: boolean;
    date: string;
  },
  interviewSchedule: {
    isSelected: boolean;
    scheduleList:{ date: string; startTime: string; endTime: string; }[];
  },
  finalResultDate: string;
  applicantList:{
    id: number;
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
    documentQuestion: {
      question: string;
      answer: string;
      typeInfo: {
        info: string;
        infoDetail: string;
      };
    }[];
    attachedFile: {
      description: string;
      addDescription: string;
      typeInfo: {
        info: string;
        infoDetail: string;
      };
      files: (File | null)[];       
    };
    documentEvaluation: {
      evaluator: string;
      status: 'pending' | 'complete';
      score: number | null;   
    }[];
    interviewEvaluation: {
      evaluator: string;
      status: 'pending' | 'complete';
      score: number | null;   
    }[];
    relations: string[];
    comments: {
      evaluator: string;
      comment: string;
    }[];
  }[];
};