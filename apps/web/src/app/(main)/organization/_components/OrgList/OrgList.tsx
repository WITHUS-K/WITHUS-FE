'use client';

import { Member, Role } from '@web/types/organization';
import React from 'react';
import * as styles from './OrgList.css';
import { CheckBox } from '@repo/ui/CheckBox';
import OrgListItem from '../OrgListItem/OrgListItem';

interface Props {
  data: Member[];
  selectedIds: string[];
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: string, checked: boolean) => void;
  availableRoles: Role[];
  onAddRole: (memberId: string, role: Role) => void;
}

export default function OrgList({
  data,
  selectedIds,
  onToggleAll,
  onToggleOne,
  availableRoles,
  onAddRole,
}: Props) {
  const allChecked =
    data.length > 0 && data.every((m) => selectedIds.includes(m.id));

  return (
    <div className={styles.root}>
      {/* 헤더 (고정) */}
      <div className={styles.header}>
        <div style={{ marginRight: '2.4rem', height: '2.4rem' }}>
          <CheckBox
            isChecked={allChecked}
            onChange={() => onToggleAll(!allChecked)}
          />
        </div>
        <div style={{ marginRight: '1.8rem', width: '2.3rem' }}>순번</div>
        <div style={{ width: '24rem', marginRight: '1.8rem' }}>이름</div>
        <div style={{ width: '31rem', marginRight: '4.4rem' }}>역할</div>
        <div style={{ marginRight: '4.4rem', width: '2.1rem' }}>성별</div>
        <div style={{ width: '7.7rem', marginRight: '4.4rem' }}>생년월일</div>
        <div style={{ width: '10.6rem', marginRight: '4.4rem' }}>전화번호</div>
        <div style={{ width: '7.7rem' }}>가입일자</div>
      </div>

      <div className={styles.listContainer}>
        {data.map((m) => (
          <OrgListItem
            key={m.id}
            member={m}
            isSelected={selectedIds.includes(m.id)}
            onToggle={(checked) => onToggleOne(m.id, checked)}
            availableRoles={availableRoles}
            onAddRole={(role) => onAddRole(m.id, role)}
          />
        ))}
      </div>
    </div>
  );
}
