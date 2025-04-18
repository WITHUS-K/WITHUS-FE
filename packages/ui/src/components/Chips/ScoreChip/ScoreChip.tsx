import React from 'react';
import * as styles from './ScoreChip.css';
import { Profile } from '@/components/Profile/Profile';
import Text from '@/components/Text/Text';

export interface ScoreInfo {
  src: string;
  alt: string;
  name: string;
  score: number | string;
}

export interface ScoreChipProps {
  items: ScoreInfo[];
}

export const ScoreChip = ({ items }: ScoreChipProps) => {
  return (
    <div className={styles.listWrapper}>
      {items.map((item, idx) => (
        <div key={idx} className={styles.itemWrapper}>
          <div className={styles.itemProfileWrapper}>
            <Profile src={item.src} alt={item.alt} />
            <Text variant="sm_caption_medium" color="grayscale90">
              {item.name}
            </Text>
          </div>
          <div
            className={styles.separator}
            role="separator"
            aria-orientation="vertical"
          />
          <Text variant="sm_caption_medium" color="grayscale90">
            {item.score}
          </Text>
        </div>
      ))}
    </div>
  );
};
