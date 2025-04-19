import { ReactNode } from 'react';
import { Flex } from '@repo/ui/Flex';
import JoinHeader from '../_components/JoinHeader/JoinHeader';

export default async function JoinLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const stepNum = parseInt(step, 10) || 1;

  return (
    <Flex direction="column" width="43.4rem" paddingTop="8.4rem">
      <JoinHeader step={stepNum} />
      <div style={{ width: '100%' }}>{children}</div>
    </Flex>
  );
}
