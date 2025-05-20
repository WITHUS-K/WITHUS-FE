'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import * as styles from '../ChargeModalContent.css';
import { Evaluator } from '../../EvalBubbles/EvalBubbles';
import { TAG_COLORS } from '../ProfileChip/ProfileChip';

interface ProfileListItemProps {
  person: Evaluator;
  index: number;
  added: boolean;
  onAdd: (p: Evaluator) => void;
}

export default function ProfileListItem({
  person,
  index,
  added,
  onAdd,
}: ProfileListItemProps) {
  const bg = TAG_COLORS[index % TAG_COLORS.length];
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
