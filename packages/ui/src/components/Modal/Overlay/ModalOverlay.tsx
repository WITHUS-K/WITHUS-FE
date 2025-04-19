'use client';

import { ReactNode } from 'react';
import * as styles from './ModalOverlay.css';

export interface ModalOverlayProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export function ModalOverlay({ open, onClose, children }: ModalOverlayProps) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </>
  );
}
