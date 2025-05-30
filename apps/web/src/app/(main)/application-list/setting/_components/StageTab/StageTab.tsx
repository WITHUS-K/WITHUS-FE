'use client';

import React, { useRef } from 'react';
import LeftPanel from './Left/LeftPanel';
import { Flex } from '@repo/ui/Flex';
import RightPanel from './Right/RightPanel';

export default function StageTab() {
  const rightRef = useRef<HTMLDivElement>(null);

  const scrollToRight = () => {
    rightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Flex width="100%" gap="2rem" marginTop="4rem" paddingBottom="5rem">
      <LeftPanel onDateChipClick={scrollToRight} />
      <RightPanel containerRef={rightRef} />
    </Flex>
  );
}
