export interface Slot {
  id: string
  date: string       
  start: string      
  end: string        
}

export interface Applicant {
  id: string
  name: string
  email: string
}

export interface FileInfo {
  name: string
  size: string
  downloadUrl: string
}

export interface InterviewQuestion {
  question: string
  src: string
  alt: string
  name: string
}

export interface IntroductionContent {
  question: string
  standardDetail: string
}

export interface InterviewContentItem {
  question: string
  standard: string
  standardDetail: string
  reviewers: { name: string; avatar: string; score: number }[]
}

export interface CommentItem {
  user: { name: string; src: string; alt: string }
  comment: string
}

export interface ApplicantDetail {
  id: string
  selfIntroductionContent: {
    title: string
    content: IntroductionContent[]
  }
  portfolioFile: FileInfo
  interviewQuestions: InterviewQuestion[]
  interviewContent: {
    title: string
    content: InterviewContentItem[]
  }
  docsComments: CommentItem[]
  interviewComments: CommentItem[]
}

export const dummySlots: Slot[] = [
  { id: '2025050110001100', date: '2025-05-01', start: '10:00', end: '11:00' },
  { id: '2025050112001300', date: '2025-05-01', start: '12:00', end: '13:00' },
  { id: '2025050214001500', date: '2025-05-02', start: '14:00', end: '15:00' },
]

export const dummyApplicants: Record<string, Applicant[]> = {
  '2025050110001100': [
    { id: 'f1', name: '홍길동', email: 'hong@example.com' },
    { id: 'f2', name: '김영희', email: 'kim@example.com' },
  ],
  '2025050112001300': [
    { id: 'f3', name: '이철수', email: 'lee@example.com' },
    { id: 'f4', name: '이정수', email: 'lee2@example.com' },
  ],
  '2025050214001500': [
    { id: 'f5', name: '박민수', email: 'park@example.com' },
    { id: 'f6', name: '최수진', email: 'choi@example.com' },
  ],
}

// --- 지원자 상세 데이터 (슬롯별) ---
export const dummyApplicantDetails: Record<string, ApplicantDetail[]> = {
  '2025050110001100': [
    {
      id: 'f1',
      selfIntroductionContent: {
        title: '자기소개서 문항 & 포트폴리오',
        content: [
          {
            question: '1. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
          {
            question: '2. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
        ],
      },
      portfolioFile: {
        name: 'Portfolio_Hong.pdf',
        size: '4.5 MB',
        downloadUrl: '/dummy/portfolio-f1.pdf',
      },
      interviewQuestions: [
        {
          question: '1. 다음 상황에서 어떻게 대처하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '운영진',
        },
        {
          question: '2. 팀 갈등이 생겼을 때 어떻게 조율하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '김영진',
        },
        {
          question: '3. 새로운 기술을 배울 때 방법은?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '이영진',
        },
      ],
      interviewContent: {
        title: '면접 평가',
        content: [
          {
            question: '1. 커뮤니케이션',
            standard: '의사소통 능력',
            standardDetail: '명확한 전달력과 경청 능력 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },
            ],
          },
          {
            question: '2. 문제해결',
            standard: '문제 해결력',
            standardDetail: '논리적 사고와 창의적 대안 제시 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },            ],
          },
        ],
      },
      docsComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
      interviewComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
    },
    {
      id: 'f2',
      selfIntroductionContent: {
        title: '자기소개서 문항 & 포트폴리오',
        content: [
          {
            question: '1. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
          {
            question: '2. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
        ],
      },
      portfolioFile: {
        name: 'Portfolio_Hong.pdf',
        size: '4.5 MB',
        downloadUrl: '/dummy/portfolio-f1.pdf',
      },
      interviewQuestions: [
        {
          question: '1. 다음 상황에서 어떻게 대처하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '운영진',
        },
        {
          question: '2. 팀 갈등이 생겼을 때 어떻게 조율하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '김영진',
        },
        {
          question: '3. 새로운 기술을 배울 때 방법은?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '이영진',
        },
      ],
      interviewContent: {
        title: '면접 평가',
        content: [
          {
            question: '1. 커뮤니케이션',
            standard: '의사소통 능력',
            standardDetail: '명확한 전달력과 경청 능력 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },
            ],
          },
          {
            question: '2. 문제해결',
            standard: '문제 해결력',
            standardDetail: '논리적 사고와 창의적 대안 제시 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },            ],
          },
        ],
      },
      docsComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
      interviewComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
    },
  ],

  '2025050112001300': [
    {
      id: 'f1',
      selfIntroductionContent: {
        title: '자기소개서 문항 & 포트폴리오',
        content: [
          {
            question: '1. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
          {
            question: '2. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
        ],
      },
      portfolioFile: {
        name: 'Portfolio_Hong.pdf',
        size: '4.5 MB',
        downloadUrl: '/dummy/portfolio-f1.pdf',
      },
      interviewQuestions: [
        {
          question: '1. 다음 상황에서 어떻게 대처하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '운영진',
        },
        {
          question: '2. 팀 갈등이 생겼을 때 어떻게 조율하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '김영진',
        },
        {
          question: '3. 새로운 기술을 배울 때 방법은?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '이영진',
        },
      ],
      interviewContent: {
        title: '면접 평가',
        content: [
          {
            question: '1. 커뮤니케이션',
            standard: '의사소통 능력',
            standardDetail: '명확한 전달력과 경청 능력 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },
            ],
          },
          {
            question: '2. 문제해결',
            standard: '문제 해결력',
            standardDetail: '논리적 사고와 창의적 대안 제시 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },            ],
          },
        ],
      },
      docsComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
      interviewComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
    },
    {
      id: 'f2',
      selfIntroductionContent: {
        title: '자기소개서 문항 & 포트폴리오',
        content: [
          {
            question: '1. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
          {
            question: '2. 자기소개 질문 ',
            standardDetail: '자소서 평가 기준 관련 상세 설명…',
          },
        ],
      },
      portfolioFile: {
        name: 'Portfolio_Hong.pdf',
        size: '4.5 MB',
        downloadUrl: '/dummy/portfolio-f1.pdf',
      },
      interviewQuestions: [
        {
          question: '1. 다음 상황에서 어떻게 대처하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '운영진',
        },
        {
          question: '2. 팀 갈등이 생겼을 때 어떻게 조율하겠습니까?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '김영진',
        },
        {
          question: '3. 새로운 기술을 배울 때 방법은?',
          src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
          alt: '미카사',
          name: '이영진',
        },
      ],
      interviewContent: {
        title: '면접 평가',
        content: [
          {
            question: '1. 커뮤니케이션',
            standard: '의사소통 능력',
            standardDetail: '명확한 전달력과 경청 능력 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },
            ],
          },
          {
            question: '2. 문제해결',
            standard: '문제 해결력',
            standardDetail: '논리적 사고와 창의적 대안 제시 평가…',
            reviewers: [
              {
                name: '장윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 5,
              },
              {
                name: '윤윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 4,
              },
              {
                name: '설윤영',
                avatar:
                  'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
                score: 3,
              },            ],
          },
        ],
      },
      docsComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
      interviewComments: [
        {
          user: 
          { 
            name: '홍길동', 
            src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp', 
            alt: '홍길동' 
          },
          comment: '굿굿굿굿',
        },
      ],
    },
  ],
}