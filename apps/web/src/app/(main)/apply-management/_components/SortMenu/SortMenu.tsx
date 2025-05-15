'use client';

import React from 'react';
import { useOverlay, useOutsideClick } from '@repo/utils';
import * as styles from './SortMenu.css';
import { IcMenuBtn } from '@repo/ui/icons/colored';

export type SortDirection = 'asc' | 'desc';

export interface SortMenuProps {
  direction?: SortDirection;
  onChange: (dir: SortDirection) => void;
  children?: React.ReactNode;
}

export default function SortMenu({
  direction = 'asc',
  onChange,
  children,
}: SortMenuProps) {
  const { isOpen, toggle, close } = useOverlay();
  const ref = useOutsideClick<HTMLDivElement>(close);

  return (
    <div ref={ref} className={styles.container}>
      <div onClick={toggle} className={styles.trigger}>
        {children}
        <IcMenuBtn width={16} height={16} />
      </div>
      {isOpen && (
        <div className={styles.list}>
          {(['asc', 'desc'] as SortDirection[]).map((d) => {
            const isSelected = d === direction;
            return (
              <div
                key={d}
                className={`${styles.item} ${
                  isSelected ? styles.itemSelected : ''
                }`}
                onClick={() => {
                  onChange(d);
                  close();
                }}
              >
                {d === 'asc' ? '오름차순' : '내림차순'}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
