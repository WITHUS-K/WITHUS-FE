import * as styles from './Header.css';
import { IcHeaderProfile } from '../../icons/src/colored';
import { IcAlaram, IcTriangleDown } from '../../icons/src/mono';
import { Text } from '..';

export interface HeaderRightProps {
  username: string;
  role: 'user' | 'admin';
  position?: string;
  part?: string;
  onNotificationClick?: () => void;
}

export const HeaderRight = ({
  username,
  role,
  position,
  part,
  onNotificationClick,
}: HeaderRightProps) => {
  return (
    <div className={styles.headerRightWrapper}>
      <div className={styles.profileWrapper}>
        <div className={styles.profile}>
          <IcHeaderProfile width={24} height={24} />
          <Text variant="md2_text_medium" color="grayscale70">
            {username}
          </Text>
        </div>
        {role === 'admin' && (
          <div className={styles.badgeWrapper}>
            <Text variant="xs_caption_medium" color="grayscale50">
              {position}
            </Text>
            <div className={styles.divider} />
            <Text variant="xs_caption_medium" color="grayscale50">
              {part}
            </Text>
          </div>
        )}
        <IcTriangleDown width={24} height={24} />
      </div>
      <button
        className={styles.notificationButton}
        onClick={onNotificationClick}
        aria-label="알림"
      >
        <IcAlaram width={24} height={24} />
      </button>
    </div>
  );
};
