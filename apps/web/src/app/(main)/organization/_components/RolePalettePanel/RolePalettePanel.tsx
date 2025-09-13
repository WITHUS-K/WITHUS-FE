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
import { mapServerColorToTagHex } from '@web/utils/color';
import { useModal } from '@repo/ui/hooks';

export const COLOR_OPTIONS: PaletteColor[] = [
  '#FF5C6C',
  '#FF9D32',
  '#FFD732',
  '#32CA89',
  '#32B6EE',
  '#5E92FF',
  '#B36FFF',
  '#FF8FFF',
  '#C4C6D4',
  '#A9ABC0',
];

export const colorHexToNameMap: Record<string, string> = {
  '#FF5C6C': 'red',
  '#FF9D32': 'orange',
  '#FFD732': 'yellow',
  '#32CA89': 'green',
  '#32B6EE': 'bluesky',
  '#5E92FF': 'blue',
  '#B36FFF': 'purple',
  '#FF8FFF': 'pink',
  '#C4C6D4': 'gray',
  '#A9ABC0': 'darkgray',
};

interface Props {
  roles: RoleSelectWithCount[];
  search: string;
  selectedIdx: number | null;
  onSelectRole: (i: number) => void;
  onSearchChange?: (v: string) => void;
  onAddRole: (r: { label: string; color: string }) => void;
  onUpdateRole: (i: number, label: string, color: string) => void;
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

  const { confirm } = useModal();

  const handleAddKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLabel.trim()) {
      const colorName = colorHexToNameMap[newColor] ?? 'gray';
      onAddRole({ label: newLabel.trim(), color: colorName });
      setIsAdding(false);
      setNewLabel('');
    }
  };
  const handleEditKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingIdx != null) {
      const colorName = colorHexToNameMap[editColor] ?? 'gray';
      onUpdateRole(editingIdx, editLabel.trim(), colorName);
      setEditingIdx(null);
      setEditOpen(false);
    }
  };

  const handleDelete = (roleIdx: number, label: string) => {
    confirm({
      type: 'warning',
      title: '정말 삭제하시겠습니까?',
      description: `"${label}" 파트를 삭제하면 복구할 수 없습니다.`,
      cancelText: '취소',
      confirmText: '삭제',
      onConfirm: () => {
        // 역할 삭제 api 연동
      },
    });
  };

  return (
    <div className={styles.root}>
      <Flex align="center" gap="0.8rem">
        <Text variant="md1_text_semibold">파트</Text>
        <Text variant="md1_text_medium" color="grayscale30">
          {roles.length}
        </Text>
      </Flex>

      <Flex
        direction="column"
        gap="1.2rem"
        marginTop="0.8rem"
        className={styles.listContainer}
      >
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
                onDelete={() => handleDelete(i, r.label)}
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
