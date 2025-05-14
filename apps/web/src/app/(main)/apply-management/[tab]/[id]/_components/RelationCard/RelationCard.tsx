'use client';

import { AvatarChip } from '@repo/ui/Avatar';
import * as styles from './RelationCard.css';
import { Text } from '@repo/ui/Text';

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
      <div className={styles.listContainer}>
        {relations.map((r, i) => (
          <AvatarChip key={r} label={r} index={i} />
        ))}
      </div>
    </div>
  );
};
