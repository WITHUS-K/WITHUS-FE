'use client';

import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';

export default function ApplicantCell({ slot }: { slot: SlotItem }) {
  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
      gap="2rem"
    >
      <Flex align="center" justify="spaceBetween" width="100%">
        {slot.applicants.map((name, i) => (
          <Chip key={i} bg="grayscale5" color="grayscale70">
            {name}
          </Chip>
        ))}
      </Flex>
      <button className={styles.buttonStyle}>
        <IcTimetableExpand width={16} height={16} />
      </button>
    </Flex>
  );
}
