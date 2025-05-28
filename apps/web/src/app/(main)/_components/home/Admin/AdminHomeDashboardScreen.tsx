import {
  AnnounceCard,
  AnnounceCardProps,
} from '@web/app/(main)/_components/admin/AnnouncedCard/AnnouncedCard';
import {
  DocTimeline,
  DocTimelineProps,
} from '@web/app/(main)/_components/admin/DocTimeline/DocTimeline';
import {
  OverallProgress,
  Task,
} from '@web/app/(main)/_components/admin/OverallProgress/OverallProgress';
import {
  PendingUsers,
  PendingUsersProps,
} from '@web/app/(main)/_components/admin/PendingUsers/PendingUsers';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { AdminHomeHeader } from '@web/app/(main)/_components/admin/AdminHomeHeader/AdminHomeHeader';

const announceData: AnnounceCardProps = {
  title: '현재 진행 중인 공고 - [한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
  totalCount: 100,
  parts: [
    { name: '기획', color: '#FFD8A6', count: 23 },
    { name: '디자인', color: '#D0F2FF', count: 20 },
    { name: '프론트엔드', color: '#B5F5EC', count: 30 },
    { name: '백엔드', color: '#FFE3EC', count: 27 },
  ],
  onViewDetail: () => {
    console.log('지원 현황으로 이동');
  },
};

const docTimelineData: DocTimelineProps = {
  title: '서류 평가',
  currentMonth: new Date(2025, 4),
  deadlineDays: 3,
  events: [
    { date: '2025-05-04', label: '서류 합격 발표', daysBefore: 3 },
    { date: '2025-05-14', label: '면접 평가', daysBefore: 14 },
    { date: '2025-05-23', label: '최종 발표', daysBefore: 23 },
  ],
  onPrevMonth: () => console.log('이전 달'),
  onNextMonth: () => console.log('다음 달'),
};

const tasks: Task[] = [
  {
    id: 't1',
    type: '서류',
    title: '서류 평가',
    daysBefore: 3,
    total: 50,
    completed: 15,
    partLabel: '전체',
  },
  {
    id: 't2',
    type: '면접',
    title: '면접 평가',
    daysBefore: 22,
    total: 40,
    completed: 10,
    partLabel: '전체',
  },
];

const pendingUsersData: PendingUsersProps = {
  deadline: new Date(2025, 4, 1, 23, 59),
  remainingHours: 21,
  users: [
    {
      id: '1',
      name: '김현호',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpe8Bx-lLSfBQO6Pi22c5nnBpUaJMeV0hi_s9Vf-CFB-pRlj0ezWnKCtf3b9AvkvxRmLo&usqp=CAU',
    },
    {
      id: '2',
      name: '설정원',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIoLwYArbR32rJwWFNLSWkCxX_JoUSlFHByyZ181guOpXx94XHZQ6eRf9J3eq6ydHM-co&usqp=CAU',
    },
    {
      id: '3',
      name: '이채원',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXUJbxoZj1I44tPmZhsdoyqImc2pwSSSULcw3hb4U-CeyF--hrVYrmOkv14DGsh5pBYCk&usqp=CAU',
    },
    {
      id: '4',
      name: '서유빈',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2mnsIOyPS475TL65mRbwjka-xlGjqhiuQd_cwQ5h7jT_ynTLbV-kT8PeI_NYQUiW8ZI&usqp=CAU',
    },
  ],
  onRemind: () => {
    console.log('리마인드 알림 발송');
  },
};

export const AdminHomeDashboardScreen = () => (
  <Flex
    width="100%"
    direction="column"
    gap="4rem"
    paddingBottom="2.4rem"
    paddingLeft="2.4rem"
    paddingRight="2.4rem"
    paddingTop="2.4rem"
  >
    <AdminHomeHeader />
    <Flex width="100%" direction="column" gap="2rem">
      <AnnounceCard {...announceData} />
      <Flex width="100%" gap="2rem">
        <DocTimeline {...docTimelineData} />
        <OverallProgress tasks={tasks} />
        <PendingUsers {...pendingUsersData} />
      </Flex>
    </Flex>
  </Flex>
);
