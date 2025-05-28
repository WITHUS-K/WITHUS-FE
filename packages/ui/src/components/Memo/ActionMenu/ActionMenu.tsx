'use client';
import React from 'react';
import { useOverlay, useOutsideClick } from '@repo/utils';
import * as styles from './ActionMenu.css';
import {
  IcDotsMenu,
  IcEditMenu,
  IcDeleteMenu,
} from '../../../icons/src/colored';
export interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionMenu({ onEdit, onDelete }: ActionMenuProps) {
  const { isOpen, toggle, close } = useOverlay();
  const ref = useOutsideClick<HTMLDivElement>(close);

  return (
    <div ref={ref} className={styles.container}>
      <div onClick={toggle} className={styles.trigger}>
        <IcDotsMenu width={16} height={16} />
      </div>
      {isOpen && (
        <div className={styles.list}>
          <button
            className={styles.item}
            onClick={() => {
              close();
              onDelete();
            }}
          >
            <IcDeleteMenu width={20} height={20} />
            삭제하기
          </button>
          <button
            className={styles.item}
            onClick={() => {
              close();
              onEdit();
            }}
          >
            <IcEditMenu width={20} height={20} />
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
