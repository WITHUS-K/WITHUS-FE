'use client';
import React from 'react';
import type { RoleSelect } from '@web/types/organization';
import { RoleItem } from './RoleItem';
import type { PaletteColor } from '@repo/utils';

interface RoleListProps {
  roles: RoleSelect[];
  search: string;
  selectedIdx: number | null;
  onSelect: (i: number) => void;
  onEdit: (i: number) => void;
}

export function RoleList({
  roles,
  search,
  selectedIdx,
  onSelect,
  onEdit,
}: RoleListProps) {
  return (
    <>
      {roles.map((r, i) => (
        <RoleItem
          key={i}
          label={r.label}
          color={r.color as PaletteColor}
          search={search}
          isSelected={selectedIdx === i}
          onClick={() => onSelect(i)}
          onDoubleClick={() => onEdit(i)}
        />
      ))}
    </>
  );
}
