import * as styles from './Header.css';
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';

export interface HeaderProps {
  username: string;
  role?: 'user' | 'admin';
  position?: string;
  part?: string;
  onNotificationClick: () => void;
}

export const Header = ({
  username,
  role = 'user',
  position = '',
  part = '',
  onNotificationClick,
}: HeaderProps) => {
  return (
    <header className={styles.headerContainer}>
      <HeaderLeft />
      <HeaderRight
        username={username}
        role={role}
        position={position}
        part={part}
        onNotificationClick={onNotificationClick}
      />
    </header>
  );
};
