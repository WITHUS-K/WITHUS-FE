'use client';

import { Flex } from '@repo/ui/Flex';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { OverflowChips } from '@web/components/OverflowChips/OverflowChips';

export default function GuideCell({ slot }: { slot: SlotItem }) {
  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
      justify="spaceBetween"
    >
      {/* 안내자 Chip (3개 초과 시 +N 표시) */}
      <OverflowChips
        items={slot.guides}
        renderLabel={(g) => g.name}
        maxVisible={3}
        gap="0.8rem"
      />

      {/* 돋보기 버튼 */}
      <button className={styles.buttonStyle}>
        <IcTimetableExpand width={16} height={16} />
      </button>
    </Flex>
  );
}
