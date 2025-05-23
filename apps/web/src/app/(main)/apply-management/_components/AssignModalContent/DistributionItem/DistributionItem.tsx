'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';

import { Stepper } from '@repo/ui/Stepper';
import { Tag } from '@repo/ui/Tag';
import { OrgRole } from '../DistributionContainer/DistributionContainer';
import { RolesDropdown } from '@repo/ui/DropDown';
import { Text } from '@repo/ui/Text';
import { paddingStyle, itemStyle } from './DistributionItem.css';

interface DistributionItemProps {
  part: string;
  availableRoles: OrgRole[];
  selectedRoles: OrgRole[];
  count: number;
  onRoleSelect: (part: string, role: OrgRole) => void;
  onCountChange: (name: string, next: number) => void;
}

export default function DistributionItem({
  part,
  availableRoles,
  selectedRoles,
  count,
  onRoleSelect,
  onCountChange,
}: DistributionItemProps) {
  return (
    <div className={itemStyle}>
      {/* 1) 지원 파트 */}
      <Text
        variant="md2_text_medium"
        color="grayscale70"
        style={{ width: '13.9rem' }}
      >
        {part}
      </Text>

      {/* 2) 드롭다운 + Tags */}
      <Flex align="center" gap="0.8rem" width="16.8rem">
        <RolesDropdown
          availableRoles={availableRoles}
          onSelect={(role) => onRoleSelect(part, role)}
        />
        <Flex>
          {selectedRoles.map((role) => (
            <Tag key={role.id} color={role.color} withCircle>
              {role.label}
            </Tag>
          ))}
        </Flex>
      </Flex>

      {/* 3) 인원 수 스테퍼 */}
      <Stepper name={part} value={count} onChange={onCountChange} />
    </div>
  );
}
