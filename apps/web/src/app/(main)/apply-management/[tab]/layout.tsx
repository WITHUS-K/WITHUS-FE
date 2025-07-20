'use client';

import { ReactNode, useEffect } from 'react';
import { container } from './layout.css';
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
        className={container}
        style={{
          height: '100%',
          width: '100%',
          //overflow: 'hidden',
        }}
      >
        {children}
      </div>
      {modal}
    </>
  );
}
