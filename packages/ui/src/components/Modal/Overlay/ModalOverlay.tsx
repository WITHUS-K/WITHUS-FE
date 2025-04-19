'use client';

import { ReactNode } from 'react';
import * as styles from './ModalOverlay.css';

export interface ModalOverlayProps {
  /** overlay-kit이 전달하는 열림 여부 */
  open: boolean;
  /** overlay-kit close 함수 */
  onClose?: () => void;
  children: ReactNode;
}

export function ModalOverlay({ open, onClose, children }: ModalOverlayProps) {
  console.log('[ModalOverlay] render, open=', open);
  //if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </>
  );
}
