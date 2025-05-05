// 지원서 양식 설정
'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import SectionTitle from './SectionTitle/SectionTitle';
import SectionBasicInfo from './SectionBasicInfo/SectionBasicInfo';
import SectionParts from './SectionParts/SectionParts';
import SectionDetailItems from './SectionDetailItems/SectionDetailItems';

export default function FormTab() {
  return (
    <Flex direction="column" gap="4.8rem" width="100%" marginTop="4rem">
      <SectionTitle />
      <SectionBasicInfo />
      <SectionParts />
      <SectionDetailItems />
    </Flex>
  );
}
