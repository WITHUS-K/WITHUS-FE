'use client';

import { tabButton, tabBar } from './TabBar.css';
import { getTabLabel } from '@repo/utils';

interface TabBarProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <nav className={tabBar}>
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={tabButton({ state: isActive ? 'active' : 'inactive' })}
          >
            {getTabLabel(tab)}
          </button>
        );
      })}
    </nav>
  );
}
