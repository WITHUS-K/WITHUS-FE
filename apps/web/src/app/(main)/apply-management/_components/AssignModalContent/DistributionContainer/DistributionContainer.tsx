'use client';

import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import DistributionItem from '../DistributionItem/DistributionItem';
import HeaderItem from '../HeaderItem/HeaderItem';
import { containerStyle, headerStyle } from './DistributionContainer.css';
import { TagColor } from '@repo/utils';

export interface OrgRole {
  id: number;
  label: string;
  color: TagColor;
}

export interface PartState {
  roles: OrgRole[];
  count: number;
  positionId: number;
}

export interface DistributionContainerProps {
  parts: string[];
  availableRoles: OrgRole[];
  value: Record<string, PartState>;
  onRoleSelect: (part: string, role: OrgRole) => void;
  onCountChange: (part: string, next: number) => void;
}

export default function DistributionContainer({
  parts,
  availableRoles,
  value,
  onRoleSelect,
  onCountChange,
}: DistributionContainerProps) {
  const [openCallout, setOpenCallout] = useState<string | null>(null);

  return (
    <Flex direction="column" width="100%" className={containerStyle}>
      <div className={headerStyle}>
        <HeaderItem
          title="지원 파트"
          tooltip="파트별 평가할 담당자들을 설정해주세요"
          style={{ marginRight: '5.8rem' }}
          isOpen={openCallout === 'part'}
          onOpenChange={(open) => setOpenCallout(open ? 'part' : null)}
        />
        <HeaderItem
          title="평가 담당자"
          tooltip="파트별 평가할 담당자들을 설정해주세요"
          style={{ marginRight: '7rem' }}
          isOpen={openCallout === 'evaluator'}
          onOpenChange={(open) => setOpenCallout(open ? 'evaluator' : null)}
        />
        <HeaderItem
          title="평가 인원 수"
          tooltip="한 담당자 당 평가할 지원자 수를 설정해주세요."
          isOpen={openCallout === 'count'}
          onOpenChange={(open) => setOpenCallout(open ? 'count' : null)}
        />
      </div>

      <Flex padding="1.2rem 0" width="100%" direction="column" gap="1.2rem">
        {parts.map((part) => (
          <DistributionItem
            key={part}
            part={part}
            availableRoles={availableRoles}
            selectedRoles={value[part]!.roles}
            count={value[part]!.count}
            onRoleSelect={onRoleSelect}
            onCountChange={onCountChange}
          />
        ))}
      </Flex>
    </Flex>
  );
}
