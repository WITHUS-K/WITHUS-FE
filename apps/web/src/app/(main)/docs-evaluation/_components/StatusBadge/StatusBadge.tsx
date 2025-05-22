'use client';
import React from 'react';
import { IcDocs } from '@repo/ui/icons/mono';
import * as styles from './StatusBadge.css';

interface Props {
  label: string;
  variant?: 'default' | 'success' | 'danger';
}

export default function StatusBadge({ label, variant = 'default' }: Props) {
  return (
    <div className={`${styles.badge} ${styles.badgeVariants[variant]}`}>
      {variant !== 'danger' && <IcDocs width={20} height={20} />}
      <span>{label}</span>
    </div>
  );
}
