'use client';

import React, { useState, ChangeEvent } from 'react';
import { Text } from '@repo/ui/Text';
import { SearchInput } from '@repo/ui/SearchInput';
import MemberPanel from './MemberPanel';
import type { UserResult } from '@web/types/organization';
import * as styles from './MemberAssignmentPanel.css';
import { IcDeleteRight, IcPlusLeft } from '@repo/ui/icons/mono';

interface Props {
  addedMembers: UserResult[];
  availableMembers: UserResult[];
  onAdd: (u: UserResult) => void;
  onRemove: (u: UserResult) => void;
}

export default function MemberAssignmentPanel({
  addedMembers,
  availableMembers,
  onAdd,
  onRemove,
}: Props) {
  const [search, setSearch] = useState('');
  const [selAdded, setSelAdded] = useState<Set<number>>(new Set());
  const [selAvail, setSelAvail] = useState<Set<number>>(new Set());

  const q = search.toLowerCase().trim();

  const filteredAdded = addedMembers.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q)
  );

  const filteredAvail = availableMembers.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q)
  );

  const allAdded =
    filteredAdded.length > 0 &&
    filteredAdded.every((u) => selAdded.has(u.userId));
  const allAvail =
    filteredAvail.length > 0 &&
    filteredAvail.every((u) => selAvail.has(u.userId));

  const toggleSet = (
    set: Set<number>,
    setFn: React.Dispatch<Set<number>>,
    id: number
  ) => {
    const nxt = new Set(set);
    nxt.has(id) ? nxt.delete(id) : nxt.add(id);
    setFn(nxt);
  };

  return (
    <div className={styles.root}>
      <Text variant="md1_text_semibold" color="grayscale90">
        파트 부여
      </Text>
      <div style={{ height: '4rem' }}>
        <SearchInput
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="검색"
          width="100%"
        />
      </div>
      <div className={styles.panels}>
        <MemberPanel
          title="추가하지 않은 멤버"
          count={filteredAvail.length}
          items={filteredAvail}
          selected={selAvail}
          allSelected={allAvail}
          onToggleAll={() =>
            setSelAvail(
              allAvail ? new Set() : new Set(filteredAvail.map((u) => u.userId))
            )
          }
          onAction={() => {
            filteredAvail.forEach((u) => {
              if (selAvail.has(u.userId)) onAdd(u);
            });
            setSelAvail(new Set());
          }}
          actionLabel="추가"
          actionIcon={<IcDeleteRight />}
          onToggleItem={(id) => toggleSet(selAvail, setSelAvail, id)}
          search={search}
        />

        <MemberPanel
          title="추가된 멤버"
          count={filteredAdded.length}
          items={filteredAdded}
          selected={selAdded}
          allSelected={allAdded}
          onToggleAll={() =>
            setSelAdded(
              allAdded ? new Set() : new Set(filteredAdded.map((u) => u.userId))
            )
          }
          onAction={() => {
            filteredAdded.forEach((u) => {
              if (selAdded.has(u.userId)) onRemove(u);
            });
            setSelAdded(new Set());
          }}
          actionLabel="제외"
          actionIcon={<IcPlusLeft />}
          onToggleItem={(id) => toggleSet(selAdded, setSelAdded, id)}
          search={search}
        />
      </div>
    </div>
  );
}
