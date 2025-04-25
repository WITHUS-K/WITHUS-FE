'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Profile } from '@repo/ui/Profile';
import { Button } from '@repo/ui/Button';
import { ProfileItem } from '@web/components/ProfileGroup/ProfileGroup';
import * as styles from '../InviteModalContent.css';

interface ProfileListItemProps {
  person: ProfileItem;
  onAdd: (p: ProfileItem) => void;
  added: boolean;
}

export default function ProfileListItem({
  person,
  onAdd,
  added,
}: ProfileListItemProps) {
  return (
    <Flex
      align="center"
      justify="spaceBetween"
      width="100%"
      className={styles.profileItemContainer}
    >
      <Flex align="center" gap="0.8rem">
        <Profile src={person.src} alt={person.name} size={24} />
        <Text variant="md1_text_regular">{person.name}</Text>
      </Flex>
      <Button
        variant="basic"
        size="32"
        width="4.9rem"
        disabled={added}
        onClick={() => onAdd(person)}
      >
        추가
      </Button>
    </Flex>
  );
}
