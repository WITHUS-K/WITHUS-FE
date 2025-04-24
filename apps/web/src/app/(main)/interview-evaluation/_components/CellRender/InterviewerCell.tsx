'use client';

import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { Text } from '@repo/ui/Text';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { Callout } from '@repo/ui/Callout';

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
      <Flex align="center" gap="0.8rem" width="13.3rem">
        {slot.applicants.slice(0, 2).map((name, i) => (
          <Chip key={i} bg="grayscale5" color="grayscale70">
            {name}
          </Chip>
        ))}
        {slot.applicants.length > 2 && (
          <Callout
            trigger={
              <Text variant="xs_caption_medium" color="grayscale70">
                +{slot.applicants.length - 2}
              </Text>
            }
            texts={slot.applicants.slice(2)}
            position="bottom"
            offsetX="0.2rem"
          />
        )}
      </Flex>

      {/* 면접관 프로필 그룹 */}
      <ProfileGroup items={slot.interviewers} maxVisible={3} size={23} />

      {/* 돋보기 버튼 */}
      <button className={styles.buttonStyle}>
        <IcTimetableExpand width={16} height={16} />
      </button>
    </Flex>
  );
}
