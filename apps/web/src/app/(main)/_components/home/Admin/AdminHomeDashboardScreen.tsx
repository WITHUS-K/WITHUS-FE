'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { AdminHomeHeader } from '@web/app/(main)/_components/admin/AdminHomeHeader/AdminHomeHeader';
import { AnnounceCard } from '@web/app/(main)/_components/admin/AnnouncedCard/AnnouncedCard';
import { DocTimeline } from '@web/app/(main)/_components/admin/DocTimeline/DocTimeline';
import { OverallProgressContainer } from '@web/app/(main)/_components/admin/OverallProgress/OverallProgressContainer';
import { OverallProgressSkeleton } from '@web/app/(main)/_components/admin/OverallProgress/OverallProgressSkeleton';
import { PendingUsersContainer } from '@web/app/(main)/_components/admin/PendingUsers/PendingUsersContainer';
import { PendingUsersSkeleton } from '@web/app/(main)/_components/admin/PendingUsers/PendingUsersSkeleton';
import { useCurrentRecruitmentSummaryQuery } from '@web/store/query/useCurrentRecruitmentSummaryQuery';

export const AdminHomeDashboardScreen = () => {
  const router = useRouter();
  const { data: summaryData } = useCurrentRecruitmentSummaryQuery();
  const currentRecruitment = summaryData?.[0];
  const recruitmentId = currentRecruitment?.recruitmentId;

  if (!currentRecruitment || !recruitmentId) {
    return null;
  }

  return (
    <Flex
      width="100%"
      height="100%"
      direction="column"
      gap="4rem"
      paddingBottom="2.4rem"
      paddingLeft="2.4rem"
      paddingRight="2.4rem"
      paddingTop="2.4rem"
    >
      <AdminHomeHeader />

      <Flex
        width="100%"
        direction="column"
        gap="2rem"
        grow="grow1"
        style={{ minHeight: 0 }}
      >
        <AnnounceCard
          data={currentRecruitment}
          onViewDetail={() => router.push('/apply-management')}
        />

        <Flex
          width="100%"
          gap="2rem"
          align="stretch"
          grow="grow1"
          style={{ minHeight: 0 }}
        >
          <DocTimeline data={currentRecruitment} />

          <Suspense fallback={<OverallProgressSkeleton />}>
            <OverallProgressContainer recruitmentId={recruitmentId} />
          </Suspense>

          <Suspense fallback={<PendingUsersSkeleton />}>
            <PendingUsersContainer recruitmentId={recruitmentId} />
          </Suspense>
        </Flex>
      </Flex>
    </Flex>
  );
};
