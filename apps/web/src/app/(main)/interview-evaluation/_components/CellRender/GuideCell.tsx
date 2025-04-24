'use client';

import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { Text } from '@repo/ui/Text';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { Callout } from '@repo/ui/Callout';

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
      <Flex align="center" gap="0.8rem">
        {slot.guides.slice(0, 3).map((g, i) => (
          <Chip key={i} bg="grayscale5" color="grayscale70">
            {g.name}
          </Chip>
        ))}
        {slot.guides.length > 3 && (
          <Callout
            trigger={
              <Text variant="xs_caption_medium" color="grayscale70">
                +{slot.applicants.length - 3}
              </Text>
            }
            texts={slot.applicants.slice(3)}
            position="bottom"
            offsetX="0.2rem"
          />
        )}
      </Flex>

      {/* 돋보기 버튼 */}
      <button className={styles.buttonStyle}>
        <IcTimetableExpand width={16} height={16} />
      </button>
    </Flex>
  );
}
