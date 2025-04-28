import { PaletteColor } from '@repo/utils';
import { Role, User } from '@web/types/organization';

export const INITIAL_SELECTED: User[] = [
  {
    id: '1',
    name: '김현호',
    email: 'rable8264@gmail.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '2',
    name: '아현',
    email: 'babymonster@gmail.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '3',
    name: '민지',
    email: 'njz@gmail.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '4',
    name: '이서',
    email: 'ive@gmail.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '5',
    name: '로라',
    email: 'babymonster@gmail.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '6',
    name: '지은',
    email: 'jieun0116@gmail.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '7',
    name: '유리',
    email: 'yuri@example.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '8',
    name: '영희',
    email: 'younghee@example.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
  {
    id: '9',
    name: '철수',
    email: 'chulsoo@example.com',
    profileUrl:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  },
];

export const ALL_ROLES: Role[] = [
  { label: '기획', color: '#FF5360' as PaletteColor },
  { label: '디자인', color: '#FF995A' as PaletteColor },
  { label: '백엔드', color: '#FFD062' as PaletteColor },
  { label: '프론트엔드', color: '#FFD062' as PaletteColor },
  { label: '부학회장', color: '#86DAF9' as PaletteColor },
  { label: '학회장', color: '#5680FF' as PaletteColor },
];
