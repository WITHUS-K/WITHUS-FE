'use client';

import React, { ReactNode } from 'react';
import { container } from './layout.css';

export default function OrganizationLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div
      className={container}
      style={{
        height: '100%',
        width: '100%',
        padding: '2.4rem',
      }}
    >
      {children}
      {modal}
    </div>
  );
}
