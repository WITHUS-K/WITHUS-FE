'use client';

import { Flex } from '@repo/ui/Flex';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { OverflowChips } from '@web/components/OverflowChips/OverflowChips';

export default function InterviewerCell({ slot }: { slot: SlotItem }) {
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
        renderLabel={(name) => name.name}
        maxVisible={2}
        width="13.3rem"
        gap="0.8rem"
      />

      {/* 면접관 프로필 그룹 */}
      <ProfileGroup items={slot.interviewers} maxVisible={3} size={23} />

      {/* 돋보기 버튼 */}
      <button className={styles.buttonStyle}>
        <IcTimetableExpand width={16} height={16} />
      </button>
    </Flex>
  );
}
