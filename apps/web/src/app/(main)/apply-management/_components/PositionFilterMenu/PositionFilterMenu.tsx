'use client';

import React from 'react';
import { useOverlay, useOutsideClick } from '@repo/utils';
import * as styles from './PositionFilterMenu.css';
import { IcMenuBtn } from '@repo/ui/icons/colored';

export interface PositionFilterMenuProps {
  options: string[];              // 예: ['기획', '디자인', '프론트엔드', '백엔드']
  selected?: string | null;       // 현재 선택된 파트 이름
  onChange: (value: string) => void;
  children?: React.ReactNode;     // "지원 분야" 라벨
}

export default function PositionFilterMenu({
  options,
  selected = null,
  onChange,
  children,
}: PositionFilterMenuProps) {
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
          {options.map((opt) => {
            const isSelected = opt === selected;
            return (
              <div
                key={opt}
                className={`${styles.item} ${
                  isSelected ? styles.itemSelected : ''
                }`}
                onClick={() => {
                  onChange(opt);
                  close();
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
