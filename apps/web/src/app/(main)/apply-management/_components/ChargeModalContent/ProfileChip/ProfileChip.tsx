'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcDelete } from '@repo/ui/icons/colored';
import * as styles from '../ChargeModalContent.css';
import { Person } from '../ProfileListItem/ProfileListItem';
import { getProfileBackground, getProfileTextColor } from '@web/utils/color';

interface ProfileChipProps {
  person: Person;
  index: number;
  onRemove: (p: Person) => void;
}

export default function ProfileChip({
  person,
  index,
  onRemove,
}: ProfileChipProps) {
  const color = person.profileColor;
  const textColor = getProfileTextColor(color);
  const bg = getProfileBackground(color);

  return (
    <Flex align="center" gap="0.8rem" className={styles.profileContainer}>
      <div
        className={styles.bubble}
        style={{ backgroundColor: bg, color: textColor }}
      >
        {person.name.charAt(1)}
      </div>
      <Text
        variant="sm_caption_medium"
        color="grayscale90"
        style={{ whiteSpace: 'nowrap' }}
      >
        {person.name}
      </Text>
      <button onClick={() => onRemove(person)}>
        <IcDelete width={16} height={16} />
      </button>
    </Flex>
  );
}
