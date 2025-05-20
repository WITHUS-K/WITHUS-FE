// src/app/(main)/interview-evaluation/timetable/[tab]/_components/CellRenders/InterviewerCell.tsx
'use client';

import { Flex } from '@repo/ui/Flex';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';
import * as styles from './CellRenders.css';
import { OverflowChips } from '@web/components/OverflowChips/OverflowChips';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { TimeSlot } from '@web/store/query/useInterviewScheduleQuery';

export default function InterviewerCell({
  slot,
  date,
}: {
  slot: TimeSlot;
  date: string;
}) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const tab = params.tab as string;

  const handleClick = () => {
    const baseQs = searchParams.toString(); // 기존 쿼리 유지
    const slotId = slot.timeSlotId;

    router.push(`/interview-evaluation/timetable/${tab}/${slotId}?${baseQs}`);
  };

  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
      justify="spaceBetween"
    >
      {/* 지원자 Chip (2개 초과 시 +N 표시) */}
      <OverflowChips
        items={slot.applicants}
        renderLabel={(app) => app.name}
        maxVisible={2}
        width="13.3rem"
        gap="0.8rem"
      />

      {/* 면접관 프로필 그룹 */}
      <ProfileGroup
        items={slot.interviewers.map((iv) => ({
          src: iv.profileUrl ?? '',
          name: iv.name,
        }))}
        maxVisible={3}
        size={23}
      />

      {/* 돋보기 버튼 */}
      <button className={styles.buttonStyle} onClick={handleClick}>
        <IcTimetableExpand width={16} height={16} />
      </button>
    </Flex>
  );
}
