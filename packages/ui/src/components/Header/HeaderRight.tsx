import * as styles from './Header.css';
import { IcAlaram } from '../../icons/src/mono';
import { Text } from '..';
import { ProfileChip } from '../Chips';
import { Profile } from '../Profile';

export interface HeaderRightProps {
  username: string;
  profileUrl?: string;
  role: string;
  position?: string;
  part?: string;
  onLogout: () => void;
  onNotificationClick?: () => void;
}

export const HeaderRight = ({
  username,
  profileUrl,
  role,
  position,
  part,
  onLogout,
  onNotificationClick,
}: HeaderRightProps) => {

  return (
    <div className={styles.headerRightWrapper}>
      <div className={styles.profileWrapper}>
        <div className={styles.profile}>
          <Profile src={profileUrl} alt="profile" />
          <Text variant="md2_text_medium" color="grayscale60">
            {username}
          </Text>
        </div>
        {(position || part) && (
          <div className={styles.badgeWrapper}>
            {!!position && (
              <Text variant="xs_caption_medium" color="grayscale50">
                {position}
              </Text>
            )}
            {!!part && (
              <>
                <div className={styles.divider} />
                <Text variant="xs_caption_medium" color="grayscale50">
                  {part}
                </Text>
              </>
            )}
          </div>
        )}
      </div>
      <button className={styles.buttonWrapper} onClick={onLogout}>
        <Text variant="md2_text_medium" color="grayscale60">
          로그아웃
        </Text>
      </button>
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
