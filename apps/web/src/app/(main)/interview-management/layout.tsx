import { ReactNode } from 'react';
import Filters from './_components/Filters/Filters';
import { Flex } from '@repo/ui/Flex';

export const dynamic = 'force-dynamic';

export default function InterviewLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column" width="100%" height="100%" padding="2.4rem">
      <Filters />
      {children}
    </Flex>
  );
}
