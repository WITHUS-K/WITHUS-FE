import React from 'react';
import clsx from 'clsx';
import * as styles from './Sidebar.css';

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, label, isActive, onClick }: SidebarItemProps) => {
  return (
    <li
      onClick={onClick}
      className={clsx(
        styles.sidebarItemWrapper,
        isActive && styles.sidebarItemActive
      )}
    >
      <div className={styles.siderbarItem}>
        {icon}
        <span className={styles.sidebarLabel}>{label}</span>
      </div>
    </li>
  );
};

export default SidebarItem;
