'use client';

import React from 'react';
import { Dropdown } from '@repo/ui/DropDown';
import { Role } from '@web/types/organization';
import { Tag } from '@repo/ui/Tag';
import { IcPlusRole } from '@repo/ui/icons/mono';
import { HoverCallout } from '@repo/ui/Callout';
import * as styles from './RolesDropdown.css';
interface Props {
  availableRoles: Role[];
  onSelect: (role: Role) => void;
}

export default function RolesDropdown({ availableRoles, onSelect }: Props) {
  return (
    <Dropdown>
      {/* Trigger + Callout + List 를 한 곳에 묶어서 */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* 호버 시 “역할 추가” Callout, 클릭 시 Dropdown 열림 */}
        <HoverCallout
          trigger={
            <Dropdown.Trigger>
              <button type="button" className={styles.buttonStyle}>
                <IcPlusRole width={11} height={11} />
              </button>
            </Dropdown.Trigger>
          }
          texts="역할 추가"
          position="top"
          offsetX={0}
        />

        {/* 클릭 시 뜨는 실제 드롭다운 리스트 */}
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
