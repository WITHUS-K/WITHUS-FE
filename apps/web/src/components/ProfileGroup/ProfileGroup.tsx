import React from 'react';
import { Profile } from '@repo/ui/Profile';
import { Text } from '@repo/ui/Text';
import { Callout, HoverCallout } from '@repo/ui/Callout';
import * as styles from './ProfileGroup.css';

export interface ProfileItem {
  userId?: number;
  src: string;
  name: string;
}

interface ProfileGroupProps {
  items: ProfileItem[];
  maxVisible: number;
  size?: number;
}

export const ProfileGroup: React.FC<ProfileGroupProps> = ({
  items,
  maxVisible,
  size = 23,
}) => {
  const visibleItems = items.slice(0, maxVisible);
  const hiddenItems = items.slice(maxVisible);

  return (
    <div className={styles.wrapper}>
      {visibleItems.map((item, i) => (
        <div
          key={item.userId ?? i}
          className={styles.profileItem}
          style={{ left: `${i * 1.2}rem` }}
        >
          <HoverCallout
            trigger={
              <Profile src={item.src} alt={item.name} size={size} bordered />
            }
            texts={item.name}
          />
        </div>
      ))}

      {hiddenItems.length > 0 && (
        <div
          className={styles.countItem}
          style={{ left: `${visibleItems.length * 1.2}rem` }}
        >
          <HoverCallout
            trigger={
              <Text variant="xs_caption_medium" color="grayscale70">
                +{hiddenItems.length}
              </Text>
            }
            texts={hiddenItems.map((it) => it.name)}
          />
        </div>
      )}
    </div>
  );
};
