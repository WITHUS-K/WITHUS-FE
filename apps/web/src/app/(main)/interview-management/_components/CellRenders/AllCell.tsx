'use client';

import { Flex } from '@repo/ui/Flex';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';
import { IcTimetablePlus, IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { OverflowChips } from '@web/components/OverflowChips/OverflowChips';
import { TimeSlot } from '@web/store/query/useInterviewScheduleQuery';

export default function AllCell({ slot }: { slot: TimeSlot }) {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;
  const sp = useSearchParams();
  console.log('타임슬롯', slot.timeSlotId);
  // 모달 열기

  // 현재 쿼리스트링 (recruitmentId, interviewId 등)
  const baseQs = sp.toString(); // e.g. "recruitmentId=4&interviewId=5"

  // 공통으로 붙일 쿼리
  const withTimeSlot = (path: string) => {
    const newQs = `${baseQs}&timeSlotId=${slot.timeSlotId}`;
    router.push(`${path}?${newQs}`);
  };

  const openInviteModal = () =>
    withTimeSlot(`/interview-management/timetable/${tab}/${date}/invite`);

  const openApplication = () =>
    withTimeSlot(
      `/interview-management/timetable/${tab}/${date}/application/${encodeURIComponent(
        `${slot.startTime}-${slot.endTime}`
      )}`
    );

  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
    >
      {/* 지원자 */}
      <OverflowChips
        items={slot.applicants}
        renderLabel={(name) => name.name}
        maxVisible={2}
        width="13.3rem"
        marginRight="4.1rem"
        gap="0.8rem"
      />

      {/* 면접관 */}
      <Flex marginRight="5rem">
        <ProfileGroup
          items={slot.interviewers.map(({ src, name }) => ({
            src: src ?? '',
            name,
          }))}
          maxVisible={3}
          size={23}
        />
      </Flex>

      {/* 안내자 */}
      <ProfileGroup
        items={slot.assistants.map(({ src, name }) => ({
          src: src ?? '',
          name,
        }))}
        maxVisible={2}
        size={23}
      />

      {/* 버튼 */}
      <Flex align="center" gap="0.4rem">
        <button className={styles.buttonStyle} onClick={openInviteModal}>
          <IcTimetablePlus width={16} height={16} />
        </button>
        <button
          className={styles.buttonStyle}
          onClick={() => openApplication()}
        >
          <IcTimetableExpand width={16} height={16} />
        </button>
      </Flex>
    </Flex>
  );
}
