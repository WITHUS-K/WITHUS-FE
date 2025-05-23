'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import * as styles from '../ChargeModalContent.css';
import { TAG_COLORS } from '../ProfileChip/ProfileChip';
import { mapServerColorToTagHex } from '@web/utils/color';

export interface Person {
  userId: number;
  name: string;
  profileImageUrl?: string;
  profileColor: string;
}

interface ProfileListItemProps {
  person: Person;
  index: number;
  added: boolean;
  onAdd: (p: Person) => void;
}

export default function ProfileListItem({
  person,
  index,
  added,
  onAdd,
}: ProfileListItemProps) {
  const color = person.profileColor;
  const bg = mapServerColorToTagHex(color);
  return (
    <Flex
      align="center"
      justify="spaceBetween"
      width="100%"
      className={styles.profileItemContainer}
    >
      <Flex align="center" gap="0.8rem">
        <div className={styles.bubble} style={{ backgroundColor: bg }}>
          {person.name.charAt(1)}
        </div>
        <Text variant="md1_text_regular">{person.name}</Text>
      </Flex>
      <Button
        variant="sub"
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
