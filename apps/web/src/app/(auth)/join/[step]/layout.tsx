// app/join/layout.tsx
'use client';

import { ReactNode } from 'react';
import { Flex } from '@repo/ui/Flex';
import { useParams } from 'next/navigation';
import JoinHeader from '../_components/JoinHeader/JoinHeader';
import { ClubProvider } from '../_context/ClubContext';

export default function JoinLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const { step } = useParams() as { step?: string };
  const stepNum = parseInt(step ?? '1', 10);

  return (
    <ClubProvider>
      <Flex direction="column" width="43.4rem" paddingTop="8.4rem">
        <JoinHeader step={stepNum} />
        <div style={{ width: '100%' }}>{children}</div>
      </Flex>
      {modal}
    </ClubProvider>
  );
}
