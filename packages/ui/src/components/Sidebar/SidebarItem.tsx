import React from 'react';
import clsx from 'clsx';
import * as styles from './Sidebar.css';
import { useSidebarContext } from './SidebarContext';

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ icon, label }: SidebarItemProps) => {
  const { activeItem, setActiveItem } = useSidebarContext();
  const isActive = activeItem === label;

  const handleClick = () => {
    setActiveItem(label);
  };

  return (
    <li
      onClick={handleClick}
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
