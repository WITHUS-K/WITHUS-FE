'use client';

import { OverlayProvider } from 'overlay-kit';
import { QueryClientProvider } from '@web/store/query/QueryClientProvider';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <OverlayProvider>{children}</OverlayProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
