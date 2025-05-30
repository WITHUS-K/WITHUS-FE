'use client';

import { Dropdown } from '..';
import { Tag } from '../../Tag';
import { TagColor } from '@repo/utils';
import RolesDropdownTriggerContent from './RolesDropdownTriggerContent';
import { rolesDropdwon } from '../Dropdown.css';

export interface OrgRole {
  id: number;
  label: string;
  color: TagColor;
}

interface Props {
  availableRoles: OrgRole[];
  onSelect: (role: OrgRole) => void;
}

export default function RolesDropdown({ availableRoles, onSelect }: Props) {
  //console.log('RolesDropdown availableRoles:', availableRoles);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <RolesDropdownTriggerContent />
      </Dropdown.Trigger>

      {/* 리스트 */}
      <Dropdown.List width="14.8rem">
        {availableRoles.map((r) => (
          <Dropdown.Item key={r.label} onSelect={() => onSelect(r)}>
            <Tag color={r.color} withCircle>
              {r.label}
            </Tag>
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
