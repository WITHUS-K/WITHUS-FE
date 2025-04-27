'use client';

import { Flex } from '@repo/ui/Flex';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';
import { IcTimetablePlus, IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { useRouter, useParams } from 'next/navigation';
import { OverflowChips } from '@web/components/OverflowChips/OverflowChips';

export default function AllCell({ slot }: { slot: SlotItem }) {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;

  // 모달 열기
  const openInviteModal = () => {
    router.push(`/interview-management/timetable/${tab}/${date}/invite`);
  };

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
        <ProfileGroup items={slot.interviewers} maxVisible={3} size={23} />
      </Flex>

      {/* 안내자 */}
      <ProfileGroup items={slot.guides} maxVisible={2} size={23} />

      {/* 버튼 */}
      <Flex align="center" gap="0.4rem">
        <button className={styles.buttonStyle} onClick={openInviteModal}>
          <IcTimetablePlus width={16} height={16} />
        </button>
        <button
          className={styles.buttonStyle}
          onClick={() => {
            if (!slot) return;
            router.push(
              `/interview-management/timetable/${tab}/${date}/${slot.startTime}-${slot.endTime}`
            );
          }}
        >
          <IcTimetableExpand width={16} height={16} />
        </button>
      </Flex>
    </Flex>
  );
}
