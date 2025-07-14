'use client';
import React from 'react';
import * as styles from './Sidebar.css';

interface SidebarListProps extends React.ComponentPropsWithoutRef<'ul'> {
  children: React.ReactNode;
}

export default function SidebarList({ children, ...props }: SidebarListProps) {
  return (
    <ul className={styles.sidebarList} {...props}>
      {React.Children.toArray(children)}
    </ul>
  );
}
