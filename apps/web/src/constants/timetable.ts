import { ProfileItem } from '@web/components/ProfileGroup/ProfileGroup';

export const timetableDates = ['2025-04-22', '2025-04-23'];

export interface IntroductionContent {
  question: string;
  standardDetail: string;
  questionType: string;
}

export interface FileInfo {
  name: string;
  size: number;
  downloadUrl: string;
}

export interface InterviewQuestion {
  question: string;
  src: string;
  alt: string;
  name: string;
}

export interface InterviewContentItem {
  question: string;
  standard: string;
  standardDetail: string;
  reviewers: { name: string; avatar: string; score: number }[];
}

export interface CommentItem {
  user: { name: string; src: string; alt: string };
  comment: string;
}

export interface Applicant {
  id: string; // 아마도 지원자 아이디
  name: string;
  selfIntroductionContent: {
    title: string;
    content: IntroductionContent[];
  };
  portfolioFile: FileInfo;
  interviewQuestions: InterviewQuestion[];
  interviewContent: {
    title: string;
    content: InterviewContentItem[];
  };
  docsComments: CommentItem[];
  interviewComments: CommentItem[];
}

export interface SlotItem {
  startTime: string;
  endTime: string;
  applicants: Applicant[];
  interviewers: ProfileItem[];
  guides: ProfileItem[];
  color?: string;
}

export interface TimeTableRoom {
  name: string;
  slots: SlotItem[];
}

export interface TimeTableDay {
  date: string;
  rooms: TimeTableRoom[];
}

/*export const timetableMock: TimeTableDay[] = [
  {
    date: '2025-04-22',
    rooms: [
      {
        name: '면접실 A',
        slots: [
          {
            startTime: '11:00',
            endTime: '11:15',
            applicants: [
              {
                id: 'f1',
                name: '홍길동',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
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
                    question:
                      '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    name: '이채원',
                    alt: '미카사',
                  },
                ],
                interviewContent: {
                  title: '면접 평가',
                  content: [
                    {
                      question: '면접 평가 기준 관련된 내용',
                      standard: '의사소통 능력',
                      standardDetail:
                        ' 면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 3,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
              },
              {
                id: 'f2',
                name: '김영희',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
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
                    question:
                      '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    name: '이채원',
                    alt: '미카사',
                  },
                ],
                interviewContent: {
                  title: '면접 평가',
                  content: [
                    {
                      question: '면접 평가 기준 관련된 내용',
                      standard: '의사소통 능력',
                      standardDetail:
                        ' 면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 3,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
              },
            ],
            interviewers: Array(5).fill({
              src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
              name: '이채원',
            }),
            guides: [
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
            color: '#FFEEDE',
          },
        ],
      },
      {
        name: '면접실 B',
        slots: [
          {
            startTime: '11:00',
            endTime: '11:15',
            applicants: [
              {
                id: 'f1',
                name: '홍길동',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
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
                    question:
                      '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    name: '이채원',
                    alt: '미카사',
                  },
                ],
                interviewContent: {
                  title: '면접 평가',
                  content: [
                    {
                      question: '면접 평가 기준 관련된 내용',
                      standard: '의사소통 능력',
                      standardDetail:
                        ' 면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 3,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
              },
              {
                id: 'f2',
                name: '김영희',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
                    },
                    {
                      question:
                        '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                      standardDetail:
                        '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
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
                    question:
                      '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    name: '이채원',
                    alt: '미카사',
                  },
                ],
                interviewContent: {
                  title: '면접 평가',
                  content: [
                    {
                      question: '면접 평가 기준 관련된 내용',
                      standard: '의사소통 능력',
                      standardDetail:
                        ' 면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용면접 평가 기준과 관련된 자세한 내용',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 3,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                  {
                    user: {
                      name: '장윤영',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment:
                      '{어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 면접평가때 메모했던 내용 자동으로 뜨게}',
                  },
                ],
              },
            ],
            interviewers: Array(5).fill({
              src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
              name: '이채원',
            }),
            guides: [
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
            color: '#D9FFE2',
          },
        ],
      },
    ],
  },
  {
    date: '2025-04-23',
    rooms: [
      {
        name: '면접실 A',
        slots: [
          {
            startTime: '11:00',
            endTime: '11:15',
            applicants: [
              {
                id: 'f1',
                name: '홍길동',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question: '1. 자기소개 질문',
                      standardDetail: '자소서 평가 기준 관련 상세 설명…',
                    },
                    {
                      question: '2. 자기소개 질문',
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
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    name: '이채원',
                    alt: '미카사',
                  },
                  {
                    question: '2. 팀 갈등이 생겼을 때 어떻게 조율하겠습니까?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '김영진',
                  },
                  {
                    question: '3. 새로운 기술을 배울 때 방법은?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
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
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
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
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 3,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '홍길동',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment: '굿굿굿굿',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '홍길동',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment: '굿굿굿굿',
                  },
                ],
              },
              {
                id: 'f2',
                name: '김영희',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question: '1. 자기소개 질문',
                      standardDetail: '자소서 평가 기준 관련 상세 설명…',
                    },
                    {
                      question: '2. 자기소개 질문',
                      standardDetail: '자소서 평가 기준 관련 상세 설명…',
                    },
                  ],
                },
                portfolioFile: {
                  name: 'Portfolio_Kim.pdf',
                  size: '4.2 MB',
                  downloadUrl: '/dummy/portfolio-f2.pdf',
                },
                interviewQuestions: [
                  {
                    question: '1. 협업에서 중요한 점은?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '운영진',
                  },
                  {
                    question: '2. 어려운 문제를 해결했던 경험을 말해주세요.',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '김영진',
                  },
                  {
                    question: '3. 새로운 기술을 배울 때 방법은?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '이영진',
                  },
                ],
                interviewContent: {
                  title: '면접 평가',
                  content: [
                    {
                      question: '1. 리더십',
                      standard: '리더십 역량',
                      standardDetail: '팀을 이끄는 능력과 책임감 평가…',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                      ],
                    },
                    {
                      question: '2. 전략적 사고',
                      standard: '전략적 기획력',
                      standardDetail: '목표 설정과 실행 계획 평가…',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '김영희',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '김영희',
                    },
                    comment: '포트폴리오가 인상적입니다.',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '김영희',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '김영희',
                    },
                    comment: '발표가 훌륭했습니다.',
                  },
                ],
              },
            ],
            interviewers: Array(5).fill({
              src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
              name: '이채원',
            }),
            guides: [
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
            color: '#FFEEDE',
          },
        ],
      },
      {
        name: '면접실 B',
        slots: [
          {
            startTime: '11:00',
            endTime: '11:15',
            applicants: [
              {
                id: 'f1',
                name: '홍길동',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question: '1. 자기소개 질문',
                      standardDetail: '자소서 평가 기준 관련 상세 설명…',
                    },
                    {
                      question: '2. 자기소개 질문',
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
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    name: '이채원',
                    alt: '미카사',
                  },
                  {
                    question: '2. 팀 갈등이 생겼을 때 어떻게 조율하겠습니까?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '김영진',
                  },
                  {
                    question: '3. 새로운 기술을 배울 때 방법은?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
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
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
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
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 5,
                        },
                        {
                          name: '윤윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '설윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 3,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '홍길동',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment: '굿굿굿굿',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '홍길동',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '홍길동',
                    },
                    comment: '굿굿굿굿',
                  },
                ],
              },
              {
                id: 'f2',
                name: '김영희',
                selfIntroductionContent: {
                  title: '자기소개서 문항 & 포트폴리오',
                  content: [
                    {
                      question: '1. 자기소개 질문',
                      standardDetail: '자소서 평가 기준 관련 상세 설명…',
                    },
                    {
                      question: '2. 자기소개 질문',
                      standardDetail: '자소서 평가 기준 관련 상세 설명…',
                    },
                  ],
                },
                portfolioFile: {
                  name: 'Portfolio_Kim.pdf',
                  size: '4.2 MB',
                  downloadUrl: '/dummy/portfolio-f2.pdf',
                },
                interviewQuestions: [
                  {
                    question: '1. 협업에서 중요한 점은?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '운영진',
                  },
                  {
                    question: '2. 어려운 문제를 해결했던 경험을 말해주세요.',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '김영진',
                  },
                  {
                    question: '3. 새로운 기술을 배울 때 방법은?',
                    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                    alt: '미카사',
                    name: '이영진',
                  },
                ],
                interviewContent: {
                  title: '면접 평가',
                  content: [
                    {
                      question: '1. 리더십',
                      standard: '리더십 역량',
                      standardDetail: '팀을 이끄는 능력과 책임감 평가…',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                      ],
                    },
                    {
                      question: '2. 전략적 사고',
                      standard: '전략적 기획력',
                      standardDetail: '목표 설정과 실행 계획 평가…',
                      reviewers: [
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                        {
                          name: '장윤영',
                          avatar:
                            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                          score: 4,
                        },
                      ],
                    },
                  ],
                },
                docsComments: [
                  {
                    user: {
                      name: '김영희',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '김영희',
                    },
                    comment: '포트폴리오가 인상적입니다.',
                  },
                ],
                interviewComments: [
                  {
                    user: {
                      name: '김영희',
                      src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                      alt: '김영희',
                    },
                    comment: '발표가 훌륭했습니다.',
                  },
                ],
              },
            ],
            interviewers: Array(5).fill({
              src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
              name: '이채원',
            }),
            guides: [
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
            color: '#D9FFE2',
          },
        ],
      },
    ],
  },
];

export interface InterviewScheduleItem {
  date: string;
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
}
export interface InterviewSchedule {
  isSelected: boolean;
  scheduleList: InterviewScheduleItem[];
}

export const ALL_INTERVIEWERS: ProfileItem[] = [
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '나하이',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '이하이',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '김하이',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '김하이1',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '김하이2',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '김하이3',
  },
];

export const ALL_GUIDES: ProfileItem[] = [
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '장운영',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '박운영',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '최운영',
  },
  {
    src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    name: '최운영1',
  },
];
*/
