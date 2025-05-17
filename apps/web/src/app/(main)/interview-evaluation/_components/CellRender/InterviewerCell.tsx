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

  // 기존 쿼리스트링 (e.g. interviewId=4)
  const baseQs = searchParams.toString();

  const handleClick = () => {
    // 기존 쿼리스트링 (e.g. "interviewId=4")
    const baseQs = searchParams.toString();

    // time 세그먼트 (예: "10:00-10:30")를 URI 컴포넌트로 인코딩
    const timeSegment = encodeURIComponent(`${slot.startTime}-${slot.endTime}`);

    // URL에서 마침표를 대시로 변경
    const safeDate = date.replaceAll('.', '-');

    router.push(
      `/interview-evaluation/timetable/${tab}/${safeDate}/${timeSegment}?${baseQs}`
    );
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
          src: iv.src ?? '',
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
