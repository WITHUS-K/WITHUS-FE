'use client';

import React, { useState, ChangeEvent } from 'react';
import { Text } from '@repo/ui/Text';
import { SearchInput } from '@repo/ui/SearchInput';
import MemberPanel from './MemberPanel';
import { User } from '@web/types/organization';
import * as styles from './MemberAssignmentPanel.css';
import { IcDeleteRight, IcPlusLeft } from '@repo/ui/icons/mono';

interface Props {
  addedMembers: User[];
  availableMembers: User[];
  onAdd: (u: User) => void;
  onRemove: (u: User) => void;
}

export default function MemberAssignmentPanel({
  addedMembers,
  availableMembers,
  onAdd,
  onRemove,
}: Props) {
  const [search, setSearch] = useState('');
  const [selAdded, setSelAdded] = useState<Set<string>>(new Set());
  const [selAvail, setSelAvail] = useState<Set<string>>(new Set());

  const filteredAdded = addedMembers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredAvail = availableMembers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const allAdded =
    filteredAdded.length > 0 && filteredAdded.every((u) => selAdded.has(u.id));
  const allAvail =
    filteredAvail.length > 0 && filteredAvail.every((u) => selAvail.has(u.id));

  const toggleSet = (
    set: Set<string>,
    setFn: React.Dispatch<Set<string>>,
    id: string
  ) => {
    const nxt = new Set(set);
    nxt.has(id) ? nxt.delete(id) : nxt.add(id);
    setFn(nxt);
  };

  const toggleAdded = (id: string) => toggleSet(selAdded, setSelAdded, id);
  const toggleAvail = (id: string) => toggleSet(selAvail, setSelAvail, id);

  const selectAllAdded = () => {
    if (allAdded) setSelAdded(new Set());
    else setSelAdded(new Set(filteredAdded.map((u) => u.id)));
  };

  const selectAllAvail = () => {
    if (allAvail) setSelAvail(new Set());
    else setSelAvail(new Set(filteredAvail.map((u) => u.id)));
  };

  return (
    <div className={styles.root}>
      <Text variant="md1_text_semibold" color="grayscale90">
        멤버 할당
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
          title="추가된 멤버"
          count={addedMembers.length}
          items={filteredAdded}
          selected={selAdded}
          allSelected={allAdded}
          onToggleAll={selectAllAdded}
          onAction={() => {
            filteredAdded.forEach((u) => {
              if (selAdded.has(u.id)) onRemove(u);
            });
            setSelAdded(new Set());
          }}
          actionLabel="제외"
          actionIcon={<IcDeleteRight />}
          onToggleItem={toggleAdded}
          search={search}
        />
        <MemberPanel
          title="추가하지 않은 멤버"
          count={availableMembers.length}
          items={filteredAvail}
          selected={selAvail}
          allSelected={allAvail}
          onToggleAll={selectAllAvail}
          onAction={() => {
            filteredAvail.forEach((u) => {
              if (selAvail.has(u.id)) onAdd(u);
            });
            setSelAvail(new Set());
          }}
          actionLabel="추가"
          actionIcon={<IcPlusLeft />}
          onToggleItem={toggleAvail}
          search={search}
        />
      </div>
    </div>
  );
}
