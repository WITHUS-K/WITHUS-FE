'use client';

import React, { useMemo } from 'react';
import { Flex } from '@repo/ui/Flex';
import { UserHomeHeader } from '@web/app/(main)/_components/user/UserHomeHeader/UserHomeHeader';
import { Spinner } from '@repo/ui/Spinner';
import {
  UserDocReviewList,
  ReviewItem,
} from '@web/app/(main)/_components/user/UserDocReviewList/UserDocReviewList';
import {
  UserAnnouncementProgress,
  AnnouncementEvent,
} from '@web/app/(main)/_components/user/UserAnnouncementProgress/UserAnnouncementProgress';
import {
  InterviewSlot,
  ReviewerRole,
  UserInterviewReview,
} from '@web/app/(main)/_components/user/UserInterviewReview/UserInterviewReview';

import { useCurrentRecruitmentSummaryByOrgQuery } from '@web/store/query/useCurrentRecruitmentSummaryByOrgQuery';
import { useMyDocumentEvaluationsQuery } from '@web/store/query/useMyDocumentEvaluationsQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export const UserHomeDashboardScreen = () => {
  const { organizationId } = getClientSideTokens();
  const orgId = Number(organizationId);

  const { data: summaryData, isLoading: isSummaryLoading } =
    useCurrentRecruitmentSummaryByOrgQuery(orgId);

  const currentRecruitment = summaryData?.[0];
  const recruitmentId = currentRecruitment?.recruitmentId;

  const { data: myEvalData, isLoading: isEvalLoading } =
    useMyDocumentEvaluationsQuery(recruitmentId!);

  const announcementProps = useMemo(() => {
    if (!currentRecruitment) return null;

    const sortedEvents: AnnouncementEvent[] = currentRecruitment.dDays.map(
      (d) => ({
        label: d.label,
        daysBefore: d.daysRemaining,
      })
    );

    return {
      title: currentRecruitment.title,
      events: sortedEvents,
    };
  }, [currentRecruitment]);

  const docReviewProps = useMemo(() => {
    if (!myEvalData) return { itemsBefore: [], itemsAfter: [] };

    const itemsBefore: ReviewItem[] = myEvalData.pending.map((item) => ({
      id: String(item.id),
      part: item.positionName,
      name: item.name,
    }));

    const itemsAfter: ReviewItem[] = myEvalData.done.map((item) => ({
      id: String(item.id),
      part: item.positionName,
      name: item.name,
    }));

    return { itemsBefore, itemsAfter };
  }, [myEvalData]);

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
    ],
    guide: [],
  };

  if (isSummaryLoading) {
    return (
      <Flex
        width="100%"
        height="100vh"
        justify="center"
        align="center"
        paddingBottom="2.4rem"
      >
        <Spinner />
      </Flex>
    );
  }

  if (!currentRecruitment) {
    return (
      <Flex padding="2.4rem">
        <div>진행 중인 공고가 없습니다.</div>
      </Flex>
    );
  }

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
        {announcementProps && (
          <UserAnnouncementProgress
            title={announcementProps.title}
            events={announcementProps.events}
          />
        )}

        <Flex gap="2rem" width="100%">
          <UserDocReviewList
            itemsBefore={docReviewProps.itemsBefore}
            itemsAfter={docReviewProps.itemsAfter}
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
