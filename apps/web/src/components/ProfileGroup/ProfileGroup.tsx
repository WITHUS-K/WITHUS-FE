// ProfileGroup.tsx
import { Profile } from '@repo/ui/Profile';
import * as styles from './ProfileGroup.css';
import { Text } from '@repo/ui/Text';

interface ProfileGroupProps {
  images: string[];
  maxVisible: number;
  size?: number;
}

export const ProfileGroup = ({
  images,
  maxVisible,
  size = 23,
}: ProfileGroupProps) => {
  const visibleImages = images.slice(0, maxVisible);
  const remaining = images.length - maxVisible;

  return (
    <div className={styles.wrapper}>
      {visibleImages.map((src, i) => (
        <div
          key={i}
          className={styles.profileItem}
          style={{ left: `${i * 1.2}rem` }}
        >
          <Profile src={src} alt={`profile-${i}`} size={size} />
        </div>
      ))}

      {remaining > 0 && (
        <div
          className={styles.countItem}
          style={{ left: `${visibleImages.length * 1.2}rem` }}
        >
          <Text variant="xs_caption_medium" color="grayscale70">
            +{remaining}
          </Text>
        </div>
      )}
    </div>
  );
};
