'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { TimelineEvent } from '@web/app/(main)/dashboard/_components/admin/DocTimeline/DocTimeline';
import {
  ReviewItem,
  UserDocReviewList,
} from '@web/app/(main)/dashboard/_components/user/UserDocReviewList/UserDocReviewList';
import {
  InterviewSlot,
  ReviewerRole,
  UserInterviewReview,
} from '@web/app/(main)/dashboard/_components/user/UserInterviewReview/UserInterviewReview';
import { UserAnnouncementProgress } from '@web/app/(main)/dashboard/_components/user/UserAnnouncementProgress/UserAnnouncementProgress';
import { UserHomeHeader } from '@web/app/(main)/dashboard/_components/user/UserHomeHeader/UserHomeHeader';
import { useOrganizationsMeQuery } from '@web/store/query/useOrganizationsMeQuery';
import {
  RecruitmentSummaryDto,
  useRecruitmentsCurrentSummaryQuery,
} from '@web/store/query/useRecruitmentsCurrentSummaryQuery';
import {
  MyEvaluationItemDto,
  useMyDocumentEvaluationsQuery,
} from '@web/store/query/useMyDocumentEvaluationsQuery';
import { Tokens } from '@web/api/types';

interface UserHomeDashboardScreenProps {
  tokens: Tokens;
}
export default function UserHomeDashboardScreen({
  tokens,
}: UserHomeDashboardScreenProps) {
  const orgsQuery = useOrganizationsMeQuery(tokens);
  const summaryQuery = useRecruitmentsCurrentSummaryQuery(
    orgsQuery.data?.[0]?.id ?? -1,
    tokens
  );

  const docEvalQuery = useMyDocumentEvaluationsQuery(
    summaryQuery.data?.[0]?.recruitmentId ?? -1,
    tokens
  );

  const orgs = orgsQuery.data;
  if (!orgs || orgs.length === 0) return null;
  const organization = orgs[0]!;

  const summaries = summaryQuery.data;
  if (!summaries || summaries.length === 0) return null;
  const summary: RecruitmentSummaryDto = summaries[0]!;

  const docEvals = docEvalQuery.data;
  if (!docEvals) return null;

  const timelineEvents: TimelineEvent[] = summary.dDays.map((e) => ({
    date: e.date.replace(/\//g, '-'),
    label: e.label,
    daysBefore: e.daysRemaining,
  }));
  const announcementTitle = `[${organization.name}] ${summary.title}`;

  const itemsBefore: ReviewItem[] = docEvals.pending.map(
    (u: MyEvaluationItemDto) => ({
      id: u.id.toString(),
      part: u.positionName,
      name: u.name,
    })
  );
  const itemsAfter: ReviewItem[] = docEvals.done.map(
    (u: MyEvaluationItemDto) => ({
      id: u.id.toString(),
      part: u.positionName,
      name: u.name,
    })
  );

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
}
