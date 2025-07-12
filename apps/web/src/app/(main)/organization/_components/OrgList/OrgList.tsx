'use client';

import React from 'react';
import * as styles from './OrgList.css';
import { OrgListHeader } from './OrgListHeader';
import OrgListItem from '../OrgListItem/OrgListItem';
import { Member, OrgRole, Role } from '@web/types/organization';

const PAGE_SIZE = 3;

interface Props {
  data: Member[];
  selectedIds: string[];
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: string, checked: boolean) => void;
  availableRoles: OrgRole[];
  // 💥 onAddRole 에도 OrgRole 타입을 맞춰 줍니다
  onAddRole: (memberId: string, role: OrgRole) => void;
  search: string;
  page: number;
}

export default function OrgList({
  data,
  selectedIds,
  onToggleAll,
  onToggleOne,
  availableRoles,
  onAddRole,
  search,
  page,
}: Props) {
  const allChecked =
    data.length > 0 && data.every((m) => selectedIds.includes(m.id));

  return (
    <div className={styles.root}>
      {/* 분리된 헤더 컴포넌트 */}
      <OrgListHeader allChecked={allChecked} onToggleAll={onToggleAll} />

      <div className={styles.listContainer}>
        {data.map((m, idx) => (
          <OrgListItem
            key={m.id}
            member={m}
            isSelected={selectedIds.includes(m.id)}
            onToggle={(checked) => onToggleOne(m.id, checked)}
            availableRoles={availableRoles}
            onAddRole={(role) => onAddRole(m.id, role)}
            search={search}
            index={(page - 1) * PAGE_SIZE + idx}
          />
        ))}
      </div>
    </div>
  );
}
