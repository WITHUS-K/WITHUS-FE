'use client';

import { ReactNode, useEffect } from 'react';

export default function ClubLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
      {modal}
    </>
  );
}
