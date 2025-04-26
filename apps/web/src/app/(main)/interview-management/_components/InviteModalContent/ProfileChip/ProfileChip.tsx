'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Profile } from '@repo/ui/Profile';
import { ProfileItem } from '@web/components/ProfileGroup/ProfileGroup';
import { IcDelete } from '@repo/ui/icons/colored';
import * as styles from '../InviteModalContent.css';

interface ProfileChipProps {
  person: ProfileItem;
  onRemove: (p: ProfileItem) => void;
}

export default function ProfileChip({ person, onRemove }: ProfileChipProps) {
  return (
    <Flex align="center" gap="0.8rem" className={styles.profileContainer}>
      <Profile src={person.src} alt={person.name} size={24} />
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
