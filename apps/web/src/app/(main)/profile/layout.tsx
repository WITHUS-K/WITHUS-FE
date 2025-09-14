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
    <div>
      {children}
      {modal}
    </div>
  );
}
