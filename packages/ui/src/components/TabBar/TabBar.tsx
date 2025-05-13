'use client';

import {
  tabButton,
  tabBar,
  indicator,
  indicatorActive,
  indicatorInactive,
} from './TabBar.css';
import { getTabLabel } from '@repo/utils';
import clsx from 'clsx';

interface TabBarProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  counts?: Record<string, number>;
  showIndicator?: boolean;
}

export default function TabBar({
  tabs,
  active,
  onChange,
  counts,
  showIndicator = false,
}: TabBarProps) {
  return (
    <nav className={tabBar}>
      {tabs.map((tab, idx) => {
        const isActive = tab === active;
        const base = getTabLabel(tab);
        const label = counts ? `${base} (${counts[tab] ?? 0}명)` : base;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={tabButton({ state: isActive ? 'active' : 'inactive' })}
          >
            {showIndicator && (
              <span
                className={clsx(
                  indicator,
                  isActive ? indicatorActive : indicatorInactive
                )}
              >
                {idx + 1}
              </span>
            )}
            {label}
          </button>
        );
      })}
    </nav>
  );
}
