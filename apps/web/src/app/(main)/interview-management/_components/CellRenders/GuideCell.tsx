'use client';

import { Flex } from '@repo/ui/Flex';
import { IcTimetablePlus } from '@repo/ui/icons/colored';
import { Profile } from '@repo/ui/Profile';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';

export default function GuideCell({ slot }: { slot: SlotItem }) {
  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
      gap="2rem"
    >
      <Flex align="center" justify="spaceBetween" width="100%">
        {slot.guides.map((person, i) => (
          <div key={i} className={styles.profileItem}>
            <Profile src={person.src} alt={person.name} size={23} />
          </div>
        ))}
      </Flex>
      <button className={styles.buttonStyle}>
        <IcTimetablePlus width={16} height={16} />
      </button>
    </Flex>
  );
}
