'use client';
import { ReactNode } from 'react';
import * as styles from './ModalLayout.css';

type ModalLayoutProps = {
  children: ReactNode;
};

export function ModalLayout({ children }: ModalLayoutProps) {
  return <div className={styles.container}>{children}</div>;
}
