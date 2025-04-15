import React from 'react';
import Flex from '@/components/Flex/Flex';
import * as styles from './Header.css';
import { IcHeaderProfile } from '@/icons/src/colored';
import { IcHeaderAlarm, IcTriangleDown } from '@/icons/src/mono';

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
          <span className={styles.username}>{username}</span>
        </div>
        {role === 'admin' && (
          <div className={styles.badgeWrapper}>
            <span>{position}</span>
            <div className={styles.divider} />
            <span>{part}</span>
          </div>
        )}
        <IcTriangleDown width={24} height={24} />
      </div>
      <button
        className={styles.notificationButton}
        onClick={onNotificationClick}
        aria-label="알림"
      >
        <IcHeaderAlarm width={24} height={24} />
      </button>
    </div>
  );
};
