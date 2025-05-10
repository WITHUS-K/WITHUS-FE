'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { SearchInput } from '@repo/ui/SearchInput';
import { Button } from '@repo/ui/Button';
import { IcRoleBtn } from '@repo/ui/icons/mono';
import * as styles from './RolePalettePanel.css';
import type { RoleSelect, RoleSelectWithCount } from '@web/types/organization';
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
  onAddRole: (r: RoleSelect) => void;
  onSearchChange?: (value: string) => void;
  onUpdateRole: (i: number, label: string, color: PaletteColor) => void;
}

export default function RolePalettePanel({
  roles,
  search,
  onAddRole,
  onUpdateRole,
  onSearchChange,
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState<PaletteColor>(COLOR_OPTIONS[0]!);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editColor, setEditColor] = useState<PaletteColor>(COLOR_OPTIONS[0]!);
  const [editOpen, setEditOpen] = useState(false);

  /*const filtered = roles.filter((r) =>
    r.label.toLowerCase().includes(search.toLowerCase())
  );*/

  const handleAddKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLabel.trim()) {
      onAddRole({ label: newLabel.trim(), color: newColor });
      setIsAdding(false);
      setNewLabel('');
    }
  };

  const handleEditKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingIdx !== null) {
      onUpdateRole(editingIdx, editLabel.trim(), editColor);
      setEditingIdx(null);
      setEditOpen(false);
      if (selectedIdx !== editingIdx) setSelectedIdx(null);
    }
  };

  return (
    <div className={styles.root}>
      <Flex align="center" gap="0.8rem">
        <Text variant="md1_text_semibold" color="grayscale90">
          역할
        </Text>
        <Text variant="md1_text_medium" color="grayscale30">
          {roles.length}
        </Text>
      </Flex>

      <div style={{ height: '4rem' }}>
        <SearchInput
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearchChange?.(e.target.value)
          }
          width="100%"
        />
      </div>

      <Flex
        width="100%"
        direction="column"
        gap="1.2rem"
        marginTop="0.8rem"
        className={styles.listContainer}
      >
        <Button
          variant="basic"
          size="32"
          leftIcon={<IcRoleBtn />}
          onClick={() => {
            setIsAdding(true);
            setNewLabel('');
            setNewColor(COLOR_OPTIONS[0]!);
            setEditingIdx(null);
          }}
          width="100%"
        >
          추가
        </Button>

        <div className={styles.list}>
          {roles.map((r, i) => {
            const isSelected = selectedIdx === i;
            const isEditing = editingIdx === i;

            if (isEditing) {
              return (
                <RoleEditor
                  key={`edit-${i}`}
                  label={editLabel}
                  color={editColor}
                  isOpen={editOpen}
                  options={COLOR_OPTIONS}
                  onLabelChange={(e) => setEditLabel(e.target.value)}
                  onColorChange={setEditColor}
                  onKeyDown={handleEditKey}
                  onTogglePalette={() => setEditOpen((o) => !o)}
                />
              );
            }

            return (
              <RoleItem
                key={i}
                label={r.label}
                color={r.color as PaletteColor}
                search={search}
                count={r.count}
                isSelected={isSelected}
                onClick={() => {
                  setSelectedIdx(isSelected ? null : i);
                  setEditingIdx(null);
                }}
                onDoubleClick={() => {
                  setEditingIdx(i);
                  setEditLabel(r.label);
                  setEditColor(r.color as PaletteColor);
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
              isOpen={true}
              options={COLOR_OPTIONS}
              onLabelChange={(e) => setNewLabel(e.target.value)}
              onColorChange={setNewColor}
              onKeyDown={handleAddKey}
              onTogglePalette={() => setEditOpen((o) => !o)}
            />
          )}
        </div>
      </Flex>
    </div>
  );
}
