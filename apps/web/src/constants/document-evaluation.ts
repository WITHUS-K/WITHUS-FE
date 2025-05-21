import { documentEvaluation } from "@web/types/document-evaluation";

export const documentEvaluationDummyData: documentEvaluation = {
  applicationCode:'S2G3C9',
  title: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
  deadline: '2025-07-01',
  documentResult: {
    isSelected: false,
    date: '2025-06-10',
  },
  interviewSchedule: {
    isSelected: true,
    scheduleList: [
      { date: '2025-06-15', startTime: '10:00', endTime: '11:00' },
      { date: '2025-06-16', startTime: '14:00', endTime: '15:00' },
    ],
  },
  finalResultDate: '2025-06-20',
  applicantList: [
    {
      id: 1,
      basicInfo: {
        name: '홍길동',
        gender: 'male',
        phone: '010-1234-5678',
        birthDate: '1990-01-01',
        email: 'hong@example.com',
        profileImage: null,
      },
      additionalInfo: {
        school: '서울대학교',
        academicStatus: '재학',
        major: '컴퓨터공학',
        address: '서울시 관악구 관악로 1',
      },
      applicationPart: '기획',
      documentQuestion: [
        { question: '질문 제목', answer: '1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다 1번 자소서 문항 답변입니다',
          typeInfo: {
            info: '공백 포함',
            infoDetail: '1000자',
          }, 
        },
        { question: '질문 제목', answer: '2번 자소서 문항 답변입니다 2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다2번 자소서 문항 답변입니다',
          typeInfo: {
            info: '공백 포함',
            infoDetail: '1000자',
          }, 
        },      
      ],
      attachedFile: {
        description:
          '(선택) 본인을 가장 잘 드러낼 수 있는 포트폴리오를 첨부해주세요.',
        addDescription:
          '서비스 기획/경영 관련 포트폴리오가 있다면 제출해주세요.\n본인의 작업 포트폴리오를 “하나의 PDF”로 첨부해주세요. 작업물 당 기여도를 반드시 표기해주시길 바랍니다.',
        typeInfo: {
          info: '1',
          infoDetail: '10',
        },        
        files: [null, null]      
      },
      documentEvaluation: [
      { evaluator: '장수정', status: 'complete', score: 82 },
      { evaluator: '설정원', status: 'complete', score: 90 },
      { evaluator: '서유빈', status: 'complete', score: 87 },
      { evaluator: '김철수', status: 'pending',  score: null },
      { evaluator: '이영희', status: 'complete', score: 75 },
      { evaluator: '박민수', status: 'pending',  score: null },
      { evaluator: '최민지', status: 'complete', score: 68 },
    ],
    interviewEvaluation: [
      { evaluator: '장수정', status: 'complete', score: 82 },
      { evaluator: '설정원', status: 'complete', score: 90 },
      { evaluator: '서유빈', status: 'complete', score: 87 },
      { evaluator: '김철수', status: 'pending',  score: null },
      { evaluator: '이영희', status: 'complete', score: 75 },
      { evaluator: '박민수', status: 'pending',  score: null },
      { evaluator: '최민지', status: 'complete', score: 68 },
    ],
    relations: ['김재관'],
    comments: [
      {evaluator: '장수정', comment: '코멘트코멘트코멘트코멘트코멘트코멘트코멘트코멘트'},
      {evaluator: '장수정', comment: '코멘트코멘트코멘트코멘트코멘트코멘트코멘트코멘트',}
    ]
    },
  ]
};