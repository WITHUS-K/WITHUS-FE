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
  InterviewScheduleItem,
  UserInterviewReview,
} from '@web/app/(main)/_components/user/UserInterviewReview/UserInterviewReview';

import { useCurrentRecruitmentSummaryByOrgQuery } from '@web/store/query/useCurrentRecruitmentSummaryByOrgQuery';
import { useMyDocumentEvaluationsQuery } from '@web/store/query/useMyDocumentEvaluationsQuery';
import {
  useOrgInterviewsForHomeQuery,
  useMyTimeSlotsForHomeQuery,
} from '@web/store/query/useMyInterviewForHomeQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export const UserHomeDashboardScreen = () => {
  const { organizationId, userId } = getClientSideTokens();
  const orgId = Number(organizationId);
  const uid = Number(userId);

  const { data: summaryData, isLoading: isSummaryLoading } =
    useCurrentRecruitmentSummaryByOrgQuery(orgId);

  const currentRecruitment = summaryData?.[0];
  const recruitmentId = currentRecruitment?.recruitmentId;

  const { data: myEvalData } = useMyDocumentEvaluationsQuery(recruitmentId!);

  const { data: orgInterviews } = useOrgInterviewsForHomeQuery(orgId);
  const currentInterview = orgInterviews?.find(
    (iv) => iv.recruitmentId === recruitmentId
  );
  const { data: mySchedules } = useMyTimeSlotsForHomeQuery(
    currentInterview?.interviewId
  );

  const announcementProps = useMemo(() => {
    if (!currentRecruitment) return null;

    const sortedEvents: AnnouncementEvent[] = currentRecruitment.dDays.map(
      (d) => ({
        label: d.label,
        daysBefore: d.daysRemaining,
      })
    );

    return { title: currentRecruitment.title, events: sortedEvents };
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

  const schedules = useMemo<InterviewScheduleItem[]>(() => {
    if (!mySchedules?.length) return [];

    return mySchedules.map((schedule) => {
      const parts = schedule.date.split('.').map(Number);
      const date = new Date(parts[0]!, parts[1]! - 1, parts[2]!);

      const toSlot = (
        ts: (typeof schedule.timeSlots)[number],
        roleUsers: { userId: number; name: string; role: string; profileUrl: string }[]
      ) => ({
        start: ts.startTime,
        end: ts.endTime,
        applicants: ts.applicants.map((a) => a.name),
        interviewers: roleUsers.map((u) => ({
          id: String(u.userId),
          avatarUrl: u.profileUrl,
        })),
      });

      return {
        date,
        slotsByRole: {
          interviewer: schedule.timeSlots
            .filter((ts) => ts.interviewers.some((iv) => iv.userId === uid))
            .map((ts) => toSlot(ts, ts.interviewers)),
          guide: schedule.timeSlots
            .filter((ts) => ts.assistants.some((a) => a.userId === uid))
            .map((ts) => toSlot(ts, ts.assistants)),
        },
      };
    });
  }, [mySchedules, uid]);

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

          <UserInterviewReview schedules={schedules} />
        </Flex>
      </Flex>
    </Flex>
  );
};
