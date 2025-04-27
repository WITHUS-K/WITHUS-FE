'use client';
import { ReactNode } from 'react';
import Filters from './_components/Filters/Filters';
import { Flex } from '@repo/ui/Flex';
import { usePathname } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function InterviewLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isSlotPage =
    /^\/interview-management\/timetable\/[^/]+\/[^/]+\/[^/]+$/.test(pathname);

  return (
    <Flex direction="column" width="100%" height="100%">
      {!isSlotPage && <Filters />}
      {children}
    </Flex>
  );
}
