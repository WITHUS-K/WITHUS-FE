'use client';

import { AvatarChip } from '@repo/ui/Avatar';
import * as styles from './RelationCard.css';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';

interface RelationCardProps {
  relations: string[];
}

export const RelationCard = ({ relations }: RelationCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <Text variant="xl_title_bold" color="grayscale80">
          지인 여부
        </Text>
        <Text variant="xl_title_bold" color="primary50">
          {relations.length}
        </Text>
      </div>

      {relations.map((r, i) => (
        <div className={styles.listContainer}>
          <Flex gap="0.8rem" key={i}>
            <AvatarChip key={r} label={r} index={i} />
            <Text variant="md2_text_medium" color="grayscale90">
              {r}
            </Text>
          </Flex>
        </div>
      ))}
    </div>
  );
};
