'use client';

import { vars } from '@repo/theme';
import Spinner from 'node_modules/@repo/ui/dist/components/Spinner/Spinner';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        zIndex: 9999,
      }}
    >
      <Spinner size={64} strokeWidth={4} color={vars.colors.primary50} />
    </div>
  );
}
