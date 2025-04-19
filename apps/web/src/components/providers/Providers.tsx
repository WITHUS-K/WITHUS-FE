'use client';

import { OverlayProvider } from 'overlay-kit';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    // 리액트 쿼리 설정 여기에 설정
    <OverlayProvider>{children}</OverlayProvider>
  );
}
