'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import * as s from './StageTab.css';
import LeftPanel from './Left/LeftPanel';
import { Flex } from '@repo/ui/Flex';
import RightPanel from './Right/RightPanel';

export default function StageTab() {
  const { watch } = useFormContext();
  return (
    <Flex width="100%" gap="2rem" marginTop="4rem" paddingBottom="5rem">
      <LeftPanel />
      <RightPanel />
    </Flex>
  );
}
