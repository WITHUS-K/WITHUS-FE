import { FormValues } from '@web/types/application';

// 모든 선택 항목
export const dummyForm: FormValues = {
  // 탭1
  title: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
  basicInfo: {
    birthDate: true,
    gender: true,
    address: true,
    school: true,
    major: true,
    academicStatus: true,
  },
  applicationParts: {
    isSelected: true,
    parts: ['프론트엔드', '백엔드', '기획', '디자인'],
  },
  detailItems: [
    {
      isEssential: true,
      type: 'text',
      description: '질문 제목',
      responseTarget: 0,
      typeInfo: {
        info: '공백 포함',
        infoDetail: '1000자',
      },
    },
    {
      isEssential: false,
      type: 'file',
      description: '(선택) 본인을 가장 잘 드러낼 수 있는 포트폴리오를 첨부해주세요.',
      addDescription: '서비스 기획/경영 관련 포트폴리오가 있다면 제출해주세요.\n본인의 작업 포트폴리오를 “하나의 PDF”로 첨부해주세요. 작업물 당 기여도를 반드시 표기해주시길 바랍니다.',
      responseTarget: 4,
      typeInfo: {
        info: '1',
        infoDetail: '10MB',
      },
    },
  ],

  // 탭2
  deadline: '2025-06-01',
  documentResult: {
    isSelected: true,
    date: '2025-06-10',
  },
  interviewDuration: '30분',
  interviewSchedule: {
    isSelected: true,
    scheduleList: [
      { date: '2025-06-15', startTime: '10:00', endTime: '10:30' },
      { date: '2025-06-16', startTime: '14:00', endTime: '14:30' },
    ],
  },
  finalResultDate: '2025-06-25',

  // 탭3
  paperEvaluateStandard: 'score',
  paperEvaluateItems: [
    { evaluate: '기술 역량', evaluateDetail: '코딩 테스트 점수' },
    { evaluate: '협업 능력', evaluateDetail: '팀 프로젝트 경험' },
  ],
  interviewEvaluateStandard: 'level',
  interviewEvaluateItems: [
    { evaluate: '커뮤니케이션', evaluateDetail: '면접 태도 및 답변' },
    { evaluate: '문제 해결력', evaluateDetail: '알고리즘 풀이 능력' },
  ],

  activeSection: undefined,
};

export const dummyBasicForm: FormValues = {
  // 탭1
  title: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
  basicInfo: {
    birthDate: false,
    gender: false,
    address: false,
    school: false,
    major: false,
    academicStatus: false,
  },
  applicationParts: {
    isSelected: true,
    parts: ['프론트엔드', '백엔드', '기획', '디자인'],
  },
  detailItems: [
    {
      isEssential: true,
      type: 'text',
      description: '질문 제목',
      responseTarget: 0,
      typeInfo: {
        info: '공백 포함',
        infoDetail: '1000자',
      },
    },
    {
      isEssential: false,
      type: 'file',
      description: '(선택) 본인을 가장 잘 드러낼 수 있는 포트폴리오를 첨부해주세요.',
      addDescription: '서비스 기획/경영 관련 포트폴리오가 있다면 제출해주세요.\n본인의 작업 포트폴리오를 “하나의 PDF”로 첨부해주세요. 작업물 당 기여도를 반드시 표기해주시길 바랍니다.',
      responseTarget: 4,
      typeInfo: {
        info: '1',
        infoDetail: '10MB',
      },
    },
  ],

  // 탭2
  deadline: '2025-06-01',
  documentResult: {
    isSelected: true,
    date: '2025-06-10',
  },
  interviewDuration: '30분',
  interviewSchedule: {
    isSelected: true,
    scheduleList: [
      { date: '2025-06-15', startTime: '10:00', endTime: '10:30' },
      { date: '2025-06-16', startTime: '14:00', endTime: '14:30' },
    ],
  },
  finalResultDate: '2025-06-25',

  // 탭3
  paperEvaluateStandard: 'score',
  paperEvaluateItems: [
    { evaluate: '기술 역량', evaluateDetail: '코딩 테스트 점수' },
    { evaluate: '협업 능력', evaluateDetail: '팀 프로젝트 경험' },
  ],
  interviewEvaluateStandard: 'level',
  interviewEvaluateItems: [
    { evaluate: '커뮤니케이션', evaluateDetail: '면접 태도 및 답변' },
    { evaluate: '문제 해결력', evaluateDetail: '알고리즘 풀이 능력' },
  ],

  activeSection: undefined,
};