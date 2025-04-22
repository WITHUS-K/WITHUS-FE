import { ProfileItem } from '@web/components/ProfileGroup/ProfileGroup';

export interface RawSlot {
  start: string; // "11:00"
  end: string; // "11:30"
  applicants: string[];
  interviewers: ProfileItem[];
  guides: ProfileItem[];
  color?: string;
}

export const rawSlots: RawSlot[] = [
  {
    start: '11:00',
    end: '11:30',
    applicants: ['김현호', '윤지원', '이채원', '이채원'],
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
  {
    start: '11:30',
    end: '12:00',
    applicants: ['김현호', '윤지원', '이채원', '이채원'],
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
];
