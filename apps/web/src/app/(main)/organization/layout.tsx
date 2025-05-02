'use client';

import React, { ReactNode } from 'react';

export default function OrganizationLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div
      style={{
        padding: '2.4rem',
        height: '100%',
        width: '100%',
      }}
    >
      {children}
      {modal}
    </div>
  );
}
