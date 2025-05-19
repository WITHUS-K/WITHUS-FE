import { Flex } from '@repo/ui/Flex';
import { TabBar } from '@repo/ui/TabBar';
import { useState } from 'react';
import DistributionContainer, {
  OrgRole,
} from './DistributionContainer/DistributionContainer';

const TABS = ['documents', 'interviews'];
const SUPPORT_PARTS = ['기획', '디자인', '프론트엔드', '백엔드'];
const AVAILABLE_ROLES: OrgRole[] = [
  { id: 1, label: '기획', color: '#FF2A3A' },
  { id: 2, label: '디자인', color: '#EE6B00' },
  { id: 3, label: '프론트엔드', color: '#FF2A3A' },
];

export default function AssignModalContent() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>('documents');
  return (
    <Flex direction="column" gap="4rem" width="100%">
      <TabBar
        tabs={TABS}
        active={activeTab}
        onChange={(tab) => setActiveTab(tab as any)}
      />

      <DistributionContainer
        parts={SUPPORT_PARTS}
        availableRoles={AVAILABLE_ROLES}
      />
    </Flex>
  );
}
