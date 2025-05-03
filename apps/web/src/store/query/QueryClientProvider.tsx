'use client';

import type { QueryClient } from '@tanstack/react-query'; // ← 타입만 import
import { QueryClientProvider as _QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { getQueryClient } from './getQueryClient';

export const queryClient: QueryClient = getQueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
