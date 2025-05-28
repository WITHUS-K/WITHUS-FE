'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { TimelineEvent } from '@web/app/(main)/_components/admin/DocTimeline/DocTimeline';
import {
  ReviewItem,
  UserDocReviewList,
} from '@web/app/(main)/_components/user/UserDocReviewList/UserDocReviewList';
import {
  InterviewSlot,
  ReviewerRole,
  UserInterviewReview,
} from '@web/app/(main)/_components/user/UserInterviewReview/UserInterviewReview';
import { UserAnnouncementProgress } from '@web/app/(main)/_components/user/UserAnnouncementProgress/UserAnnouncementProgress';
import { UserHomeHeader } from '@web/app/(main)/_components/user/UserHomeHeader/UserHomeHeader';

export const UserHomeDashboardScreen = () => {
  const announcementTitle = '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집';
  const timelineEvents: TimelineEvent[] = [
    { date: '2025-05-04', label: '서류 평가 마감', daysBefore: 3 },
    { date: '2025-04-07', label: '면접 평가 시작', daysBefore: 30 },
    { date: '2025-02-21', label: '최종 발표 시작', daysBefore: 70 },
  ];

  const itemsBefore: ReviewItem[] = [
    { id: '1', part: '기획', name: '장지원' },
    { id: '2', part: '디자인', name: '김하나' },
    { id: '3', part: '백엔드', name: '이영희' },
  ];
  const itemsAfter: ReviewItem[] = [
    { id: '4', part: '기획', name: '박철수' },
    { id: '5', part: '디자인', name: '최민준' },
    { id: '6', part: '백엔드', name: '최수진' },
  ];

  const initialDate = new Date(2025, 4, 12);
  const slotsByRole: Record<ReviewerRole, InterviewSlot[]> = {
    interviewer: [
      {
        start: '13:00',
        end: '13:30',
        applicants: ['김현호', '윤지원'],
        interviewers: [
          {
            id: 'i1',
            avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          {
            id: 'i2',
            avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
          },
          {
            id: 'i3',
            avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
        ],
      },
      {
        start: '13:30',
        end: '14:00',
        applicants: ['박지민', '이수연'],
        interviewers: [
          {
            id: 'i4',
            avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
          },
          {
            id: 'i5',
            avatarUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
          },
          {
            id: 'i6',
            avatarUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
          },
        ],
      },
    ],
    guide: [
      {
        start: '13:00',
        end: '13:30',
        applicants: ['김현호', '윤지원'],
        interviewers: [
          {
            id: 'g1',
            avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
          },
          {
            id: 'g2',
            avatarUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
          },
        ],
      },
      {
        start: '13:30',
        end: '14:00',
        applicants: ['박지민', '이수연'],
        interviewers: [
          {
            id: 'g3',
            avatarUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
          },
        ],
      },
    ],
  };

  return (
    <Flex
      width="100%"
      direction="column"
      gap="4rem"
      paddingBottom="2.4rem"
      paddingLeft="2.4rem"
      paddingRight="2.4rem"
      paddingTop="2.4rem"
    >
      <UserHomeHeader />
      <Flex direction="column" gap="2rem" width="100%">
        <UserAnnouncementProgress
          title={announcementTitle}
          events={timelineEvents}
        />

        <Flex gap="2rem" width="100%">
          <UserDocReviewList
            itemsBefore={itemsBefore}
            itemsAfter={itemsAfter}
          />

          <UserInterviewReview
            initialDate={initialDate}
            slotsByRole={slotsByRole}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
