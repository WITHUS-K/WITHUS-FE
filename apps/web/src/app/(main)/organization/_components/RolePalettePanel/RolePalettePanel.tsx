// src/app/(main)/settings/_components/RolePalettePanel.tsx
'use client';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { SearchInput } from '@repo/ui/SearchInput';
import { Button } from '@repo/ui/Button';
import { IcRoleBtn } from '@repo/ui/icons/mono';
import * as styles from './RolePalettePanel.css';
import type { RoleSelectWithCount } from '@web/types/organization';
import type { PaletteColor } from '@repo/utils';
import { RoleEditor } from './RoleEditor';
import { RoleItem } from './RoleItem';

const COLOR_OPTIONS: PaletteColor[] = [
  '#FF5360',
  '#FF995A',
  '#FFD062',
  '#5BDF87',
  '#86DAF9',
  '#6289FF',
  '#AD90FF',
  '#F196F8',
  '#C4C6D4',
  '#A9ABC0',
];

interface Props {
  roles: RoleSelectWithCount[];
  search: string;
  selectedIdx: number | null;
  onSelectRole: (i: number) => void;
  onSearchChange?: (v: string) => void;
  onAddRole: (r: { label: string; color: PaletteColor }) => void;
  onUpdateRole: (i: number, label: string, color: PaletteColor) => void;
}
export default function RolePalettePanel({
  roles,
  search,
  selectedIdx,
  onSelectRole,
  onSearchChange,
  onAddRole,
  onUpdateRole,
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0]!);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editColor, setEditColor] = useState(COLOR_OPTIONS[0]!);
  const [editOpen, setEditOpen] = useState(false);

  const handleAddKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLabel.trim()) {
      onAddRole({ label: newLabel.trim(), color: newColor });
      setIsAdding(false);
      setNewLabel('');
    }
  };
  const handleEditKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingIdx != null) {
      onUpdateRole(editingIdx, editLabel.trim(), editColor);
      setEditingIdx(null);
      setEditOpen(false);
    }
  };

  return (
    <div className={styles.root}>
      <Flex align="center" gap="0.8rem">
        <Text variant="md1_text_semibold">역할</Text>
        <Text variant="md1_text_medium">{roles.length}</Text>
      </Flex>
      <div style={{ height: '4rem' }}>
        <SearchInput
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          width="100%"
        />
      </div>
      <Flex direction="column" gap="1.2rem" marginTop="0.8rem">
        <Button
          leftIcon={<IcRoleBtn />}
          onClick={() => {
            setIsAdding(true);
            setEditingIdx(null);
          }}
          width="100%"
          size="32"
          variant="basic"
        >
          추가
        </Button>
        <div className={styles.list}>
          {roles.map((r, i) => {
            const isSel = selectedIdx === i;
            const isEd = editingIdx === i;
            if (isEd) {
              return (
                <RoleEditor
                  key={`edit-${i}`}
                  label={editLabel}
                  color={editColor}
                  isOpen={editOpen}
                  options={COLOR_OPTIONS}
                  onLabelChange={(e) => setEditLabel(e.target.value)}
                  onColorChange={(c) => setEditColor(c)}
                  onKeyDown={handleEditKey}
                  onTogglePalette={() => setEditOpen((o) => !o)}
                />
              );
            }
            return (
              <RoleItem
                key={i}
                label={r.label}
                color={r.color}
                count={r.count}
                search={search}
                isSelected={isSel}
                onClick={() => onSelectRole(i)}
                onDoubleClick={() => {
                  setEditingIdx(i);
                  setEditLabel(r.label);
                  setEditColor(r.color);
                  setEditOpen(false);
                }}
              />
            );
          })}
          {isAdding && (
            <RoleEditor
              key="add"
              label={newLabel}
              color={newColor}
              isOpen
              options={COLOR_OPTIONS}
              onLabelChange={(e) => setNewLabel(e.target.value)}
              onColorChange={(c) => setNewColor(c)}
              onKeyDown={handleAddKey}
              onTogglePalette={() => setEditOpen((o) => !o)}
            />
          )}
        </div>
      </Flex>
    </div>
  );
}
