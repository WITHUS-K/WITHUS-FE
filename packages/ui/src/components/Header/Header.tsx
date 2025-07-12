'use client';
import * as styles from './Header.css';
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';

export interface HeaderProps {
  username: string;
  profileUrl?: string;
  role?: string;
  position?: string;
  part?: string;
  onLogout: () => void;
  onNotificationClick?: () => void;
}

export const Header = ({
  username,
  profileUrl = '',
  role = 'user',
  position = '',
  part = '',
  onLogout,
  onNotificationClick,
}: HeaderProps) => {
  return (
    <header className={styles.headerContainer}>
      <HeaderLeft />
      <HeaderRight
        onLogout={onLogout}
        profileUrl={profileUrl}
        username={username}
        role={role}
        position={position}
        part={part}
        onNotificationClick={onNotificationClick}
      />
    </header>
  );
};
