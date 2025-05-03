import { ComponentPropsWithoutRef } from 'react';
import * as styles from './Sidebar.css';

const SidebarList = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'ul'>) => {
  return (
    <ul className={styles.sidebarList} {...props}>
      {children}
    </ul>
  );
};

export default SidebarList;
