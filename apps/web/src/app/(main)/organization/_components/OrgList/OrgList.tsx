'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  search: string;
  page: number;
  onPartClick: (memberId: number) => void;
}

export default function OrgList({
  data,
  selectedIds,
  onToggleAll,
  onToggleOne,
  availableRoles,
  onPartClick,
  search,
  page,
}: Props) {
  const allChecked =
    data.length > 0 && data.every((m) => selectedIds.includes(m.id));

  const listRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    setIsScrollable(el.scrollHeight > el.clientHeight);
  }, [data]);

  return (
    <div className={styles.root}>
      <OrgListHeader allChecked={allChecked} onToggleAll={onToggleAll} />

      <div
        className={styles.listContainer}
        ref={listRef}
        style={{ paddingBottom: isScrollable ? '5rem' : '0.6rem' }}
      >
        {data.map((m, idx) => (
          <OrgListItem
            key={m.id}
            member={m}
            isSelected={selectedIds.includes(m.id)}
            onToggle={(checked) => onToggleOne(m.id, checked)}
            availableRoles={availableRoles}
            onPartClick={onPartClick}
            search={search}
            index={(page - 1) * PAGE_SIZE + idx}
          />
        ))}
      </div>
    </div>
  );
}
