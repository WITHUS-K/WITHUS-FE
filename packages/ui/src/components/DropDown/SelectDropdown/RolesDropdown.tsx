'use client';

import { Dropdown } from '..';
import { Tag } from '../../Tag';
import { HoverCallout } from '../../Callout';
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
  return (
    <Dropdown>
      <div className={rolesDropdwon}>
        {/* 호버 시 “역할 추가” Callout, 클릭 시 Dropdown 열림 */}
        <HoverCallout
          trigger={
            <Dropdown.Trigger>
              <RolesDropdownTriggerContent />
            </Dropdown.Trigger>
          }
          texts="역할 추가"
          position="top"
          offsetX={0}
        />

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
      </div>
    </Dropdown>
  );
}
