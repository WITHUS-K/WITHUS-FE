'use client';
import { ReactNode } from 'react';

import { Flex } from '@repo/ui/Flex';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex width="100%" height="100%" padding="2.4rem">
      {children}
    </Flex>
  );
}
