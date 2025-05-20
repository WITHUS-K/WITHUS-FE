'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcDelete } from '@repo/ui/icons/colored';
import * as styles from '../ChargeModalContent.css';
import { Evaluator } from '../../EvalBubbles/EvalBubbles';
import { TagColor } from '@repo/utils';

export const TAG_COLORS: TagColor[] = [
  '#FF2A3A',
  '#EE6B00',
  '#E2A500',
  '#009857',
  '#0084BC',
  '#2C60FF',
  '#813DFF',
  '#F25DEB',
  '#7F82A1',
];

interface ProfileChipProps {
  person: Evaluator;
  index: number;
  onRemove: (p: Evaluator) => void;
}

export default function ProfileChip({
  person,
  index,
  onRemove,
}: ProfileChipProps) {
  const bg = TAG_COLORS[index % TAG_COLORS.length];
  return (
    <Flex align="center" gap="0.8rem" className={styles.profileContainer}>
      <div className={styles.bubble} style={{ backgroundColor: bg }}>
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
