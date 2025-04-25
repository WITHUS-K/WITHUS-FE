import { ProfileItem } from '@web/components/ProfileGroup/ProfileGroup';

export const timetableDates = ['2025-04-22', '2025-04-23'];

export interface SlotItem {
  startTime: string;
  endTime: string;
  applicants: string[];
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

export const timetableMock: TimeTableDay[] = [
  {
    date: '2025-04-22',
    rooms: [
      {
        name: '면접실 A',
        slots: [
          {
            startTime: '11:00',
            endTime: '11:30',
            applicants: ['김현호', '윤지원', '김현호', '윤지원'],
            interviewers: [
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
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
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
                name: '유재석',
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
            endTime: '11:30',
            applicants: ['김현호', '윤지원', '김현호', '윤지원'],
            interviewers: [
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
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
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
                name: '유재석',
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
            endTime: '11:30',
            applicants: ['김현호', '윤지원', '김현호', '윤지원'],
            interviewers: [
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
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
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
                name: '유재석',
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
      {
        name: '면접실 B',
        slots: [
          {
            startTime: '11:00',
            endTime: '11:30',
            applicants: ['김현호', '윤지원', '김현호', '윤지원'],
            interviewers: [
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
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
              {
                src: 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
                name: '이채원',
              },
            ],
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
                name: '유재석',
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
      // 다른 면접실 추가 가능
    ],
  },
];

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
