import React, { useState, ComponentPropsWithoutRef } from 'react';
import { SidebarContext } from './SidebarContext';
import * as styles from './Sidebar.css';

interface SidebarRootProps extends ComponentPropsWithoutRef<'nav'> {}

const SidebarRoot = ({ children, ...props }: SidebarRootProps) => {
  const [activeItem, setActiveItem] = useState<string>('');

  return (
    <SidebarContext.Provider value={{ activeItem, setActiveItem }}>
      <nav className={styles.sidebarContainer} {...props}>
        {children}
      </nav>
    </SidebarContext.Provider>
  );
};

export default SidebarRoot;
