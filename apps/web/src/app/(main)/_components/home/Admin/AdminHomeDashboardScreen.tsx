'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { AdminHomeHeader } from '@web/app/(main)/_components/admin/AdminHomeHeader/AdminHomeHeader';
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
import { useCurrentRecruitmentsSummaryQuery } from '@web/store/query/useCurrentRecruitmentsSummaryQuery';
import {
  useRecruitmentProgressQuery,
  RecruitmentProgressDto,
} from '@web/store/query/useRecruitmentProgressQuery';
import { useRecruitmentPendingEvaluatorsQuery } from '@web/store/query/useRecruitmentPendingEvaluatorsQuery';
import type { Tokens } from '@web/api/types';

interface AdminHomeDashboardScreenProps {
  recruitmentId: number;
  tokens?: Tokens;
}

export const AdminHomeDashboardScreen = ({
  recruitmentId,
  tokens,
}: AdminHomeDashboardScreenProps) => {
  const router = useRouter();

  const summariesQuery = useCurrentRecruitmentsSummaryQuery(tokens);
  const docProgressQuery = useRecruitmentProgressQuery(
    recruitmentId,
    'DOCUMENT',
    tokens
  );
  const interviewProgressQuery = useRecruitmentProgressQuery(
    recruitmentId,
    'INTERVIEW',
    tokens
  );
  const pendingQuery = useRecruitmentPendingEvaluatorsQuery(
    recruitmentId,
    tokens
  );

  if (
    !summariesQuery.data ||
    !docProgressQuery.data ||
    !interviewProgressQuery.data ||
    !pendingQuery.data
  ) {
    return null;
  }

  const summaries = summariesQuery.data;
  const docProgress = docProgressQuery.data;
  const interviewProgress = interviewProgressQuery.data;
  const pending = pendingQuery.data;

  console.log('summaries:', summaries);
  console.log('docProgress:', docProgress);
  console.log('interviewProgress:', interviewProgress);
  console.log('pending:', pending);
  console.log('recruitmentId:', recruitmentId);
  console.log('tokens:', tokens);

  if (!summaries || summaries.length === 0) return null;

  const summary =
    summaries.find((s) => s.recruitmentId === recruitmentId) ?? summaries[0]!;
  const announceData: AnnounceCardProps = {
    title: `현재 진행 중인 공고 - [${summary.organizationName}] ${summary.title}`,
    totalCount: summary.totalApplicants,
    parts: summary.positionCounts.map((p) => ({
      name: p.positionName,
      count: p.count,
    })),
    onViewDetail: () =>
      // router.push(
      //   `/admin/recruitments/${recruitmentId}/progress?stage=DOCUMENT`
      // ),
      console.log('상세 페이지로 이동'),
  };

  const allEvents = summary.dDays
    .filter((e) => e.date !== null)
    .map((e) => ({
      date: e.date!.replace(/\//g, '-'),
      label: e.label,
      daysBefore: e.daysRemaining,
    }));

  console.log('allEvents (filtered):', allEvents);
  console.log('original dDays:', summary.dDays);
  const docDeadlineEvent = allEvents.find((e) => e.label.includes('서류 마감'));
  const firstDate = allEvents[0]?.date;
  const currentMonth = firstDate ? new Date(firstDate) : new Date();

  const docTimelineData: DocTimelineProps = {
    title: '서류 평가',
    currentMonth,
    deadlineDays: docDeadlineEvent?.daysBefore ?? 0,
    events: allEvents,
    onPrevMonth: () => console.log('이전 달'),
    onNextMonth: () => console.log('다음 달'),
  };

  const makeTasks = (
    arr: RecruitmentProgressDto[],
    type: '서류' | '면접'
  ): Task[] =>
    arr.map((d) => ({
      id: `${type}-${d.positionName}`,
      type,
      title: `${type} 평가`,
      daysBefore: d.daysToDeadline,
      total: d.totalToEvaluate,
      completed: d.evaluatedCount,
      partLabel: d.positionName,
    }));

  const tasks: Task[] = [
    ...makeTasks(docProgress, '서류'),
    ...makeTasks(interviewProgress, '면접'),
  ];

  const deadlineDate = pending.deadline
    ? new Date(pending.deadline.replace(/\//g, '-'))
    : new Date();

  const pendingUsersData: PendingUsersProps = {
    deadline: deadlineDate,
    remainingDays: pending.daysToDeadline ?? 0,
    remainingHours: pending.hoursToDeadline ?? 0,
    remainingMinutes: pending.minutesToDeadline ?? 0,
    users:
      pending.users?.map((u) => ({
        id: u.userId.toString(),
        name: u.name,
        avatarUrl: u.profileImageUrl ?? '',
      })) ?? [],
    onRemind: () => console.log('리마인드 알림 발송'),
  };
  return (
    <Flex
      width="100%"
      direction="column"
      gap="4rem"
      paddingLeft="2.4rem"
      paddingTop="2.4rem"
      paddingRight="2.4rem"
      paddingBottom="2.4rem"
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
};
