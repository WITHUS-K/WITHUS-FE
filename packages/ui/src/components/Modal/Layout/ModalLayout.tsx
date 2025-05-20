'use client';
import { ReactNode } from 'react';
import * as styles from './ModalLayout.css';

type ModalLayoutProps = {
  children: ReactNode;
  width?: string;
};

export function ModalLayout({ children, width = '42rem' }: ModalLayoutProps) {
  return (
    <div className={styles.container} style={{ width }}>
      {children}{' '}
    </div>
  );
}
