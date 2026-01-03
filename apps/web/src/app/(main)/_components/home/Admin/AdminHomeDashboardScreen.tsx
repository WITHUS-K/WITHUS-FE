'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { AdminHomeHeader } from '@web/app/(main)/_components/admin/AdminHomeHeader/AdminHomeHeader';
import { AnnounceCard } from '@web/app/(main)/_components/admin/AnnouncedCard/AnnouncedCard';
import { DocTimeline } from '@web/app/(main)/_components/admin/DocTimeline/DocTimeline';
import { OverallProgress } from '@web/app/(main)/_components/admin/OverallProgress/OverallProgress';
import { PendingUsers } from '@web/app/(main)/_components/admin/PendingUsers/PendingUsers';
import { useCurrentRecruitmentSummaryQuery } from '@web/store/query/useCurrentRecruitmentSummaryQuery';
import { useRecruitmentProgressQuery } from '@web/store/query/useRecruitmentProgressQuery';
import { usePendingEvaluatorsQuery } from '@web/store/query/usePendingEvaluatorsQuery';

export const AdminHomeDashboardScreen = () => {
  const { data: summaryData } = useCurrentRecruitmentSummaryQuery();
  const currentRecruitment = summaryData?.[0];
  const recruitmentId = currentRecruitment?.recruitmentId;

  const { data: docProgress } = useRecruitmentProgressQuery(
    recruitmentId!,
    'DOCUMENT'
  );
  const { data: interviewProgress } = useRecruitmentProgressQuery(
    recruitmentId!,
    'INTERVIEW'
  );

  const { data: pendingData } = usePendingEvaluatorsQuery(recruitmentId!);

  if (!currentRecruitment) {
    return <Flex padding="2.4rem">Loading...</Flex>;
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
      <AdminHomeHeader />

      <Flex width="100%" direction="column" gap="2rem">
        <AnnounceCard
          data={currentRecruitment}
          onViewDetail={() => console.log('지원 현황 이동')}
        />

        <Flex width="100%" gap="2rem">
          <DocTimeline data={currentRecruitment} />

          <OverallProgress
            docData={docProgress}
            interviewData={interviewProgress}
          />

          {pendingData && (
            <PendingUsers
              data={pendingData}
              onRemind={() => console.log('리마인드 알림')}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
