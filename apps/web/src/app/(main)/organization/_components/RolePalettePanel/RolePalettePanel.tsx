'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { RoleSelect } from '@web/types/organization';
import { PaletteColor } from '@repo/utils';
import { SearchInput } from '@repo/ui/SearchInput';
import * as styles from './RolePalettePanel.css';
import { vars } from '@repo/theme';
import { Button } from '@repo/ui/Button';
import { IcRoleBtn } from '@repo/ui/icons/mono';

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
  roles: RoleSelect[];
  onAddRole: (r: RoleSelect) => void;
  onUpdateRole: (index: number, label: string, color: PaletteColor) => void;
}

export default function RolePalettePanel({
  roles,
  onAddRole,
  onUpdateRole,
}: Props) {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState<PaletteColor>(COLOR_OPTIONS[0]!);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editColor, setEditColor] = useState<PaletteColor>(COLOR_OPTIONS[0]!);
  const [editPaletteOpen, setEditPaletteOpen] = useState(false);

  const filtered = roles.filter((r) =>
    r.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLabel.trim()) {
      onAddRole({ label: newLabel.trim(), color: newColor });
      setIsAdding(false);
      setNewLabel('');
    }
  };

  const handleEditKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingIdx !== null) {
      const idx = editingIdx;
      onUpdateRole(idx, editLabel.trim(), editColor);
      setEditingIdx(null);
      setEditPaletteOpen(false);
      //  편집 전 선택 상태가 아니었다면 편집 후엔 선택 해제
      if (selectedIdx !== idx) {
        setSelectedIdx(null);
      }
    }
  };

  return (
    <div className={styles.root}>
      {/* 헤더 */}
      <Flex align="center" gap="0.8rem">
        <Text variant="md1_text_semibold" color="grayscale90">
          역할
        </Text>
        <Text variant="md1_text_medium" color="grayscale30">
          {roles.length}
        </Text>
      </Flex>

      {/* 검색 */}
      <div style={{ height: '4rem' }}>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
        {/* 추가 버튼 */}
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

        {/* 리스트 */}
        <div className={styles.list}>
          {filtered.map((r, i) => {
            const isSelected = selectedIdx === i;
            const isEditing = editingIdx === i;

            // 편집 모드
            if (isEditing) {
              return editPaletteOpen ? (
                <div key={i} className={styles.inputWrapper}>
                  <div className={styles.inputContainer}>
                    <div
                      className={styles.colorIcon}
                      style={{ backgroundColor: editColor }}
                      onClick={() => setEditPaletteOpen(false)}
                    />
                    <input
                      className={styles.inputWithIcon}
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      onKeyDown={handleEditKey}
                      autoFocus
                    />
                  </div>
                  <div className={styles.paletteContainer}>
                    {COLOR_OPTIONS.map((c) => {
                      const sel = c === editColor;
                      return (
                        <div
                          key={c}
                          className={styles.paletteColor}
                          style={{
                            backgroundColor: c,
                            border: sel
                              ? `2px solid ${vars.colors.white}`
                              : undefined,
                            boxShadow: sel
                              ? '0 0 4px rgba(0,0,0,0.25)'
                              : undefined,
                          }}
                          onClick={() => setEditColor(c)}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div key={i} className={styles.inputContainer}>
                  <div
                    className={styles.colorIcon}
                    style={{ backgroundColor: editColor }}
                    onClick={() => setEditPaletteOpen(true)}
                  />
                  <input
                    className={styles.inputWithIcon}
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    onKeyDown={handleEditKey}
                    autoFocus
                  />
                </div>
              );
            }

            // 검색어 하이라이팅
            const parts = search
              ? r.label.split(new RegExp(`(${search})`, 'gi'))
              : [r.label];

            //  기본 모드: 싱글 클릭은 선택/해제 토글, 더블 클릭은 편집 모드
            return (
              <Flex
                key={i}
                align="center"
                gap="0.8rem"
                className={
                  isSelected
                    ? `${styles.item} ${styles.selectedItem}`
                    : styles.item
                }
                onClick={() => {
                  // 토글
                  setSelectedIdx(isSelected ? null : i);
                  setEditingIdx(null);
                }}
                onDoubleClick={() => {
                  setEditingIdx(i);
                  setEditLabel(r.label);
                  setEditColor(r.color as PaletteColor);
                }}
              >
                <div
                  className={styles.colorBlock}
                  style={{ backgroundColor: r.color }}
                />
                <Text
                  variant="sm_caption_regular"
                  color={isSelected ? 'primary50' : 'grayscale90'}
                >
                  {parts.map((part, idx) =>
                    search && part.toLowerCase() === search.toLowerCase() ? (
                      <span key={idx} className={styles.highlight}>
                        {part}
                      </span>
                    ) : (
                      <React.Fragment key={idx}>{part}</React.Fragment>
                    )
                  )}
                  <span className={styles.count}> 0</span>
                </Text>
              </Flex>
            );
          })}

          {/* ➕ 추가 모드 */}
          {isAdding && (
            <div className={styles.inputWrapper}>
              <div className={styles.inputContainer}>
                <div
                  className={styles.colorIcon}
                  style={{ backgroundColor: newColor }}
                />
                <input
                  className={styles.inputWithIcon}
                  placeholder="역할"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyDown={handleAddKey}
                  autoFocus
                />
              </div>
              <div className={styles.paletteContainer}>
                {COLOR_OPTIONS.map((c) => {
                  const sel = c === newColor;
                  return (
                    <div
                      key={c}
                      className={styles.paletteColor}
                      style={{
                        backgroundColor: c,
                        border: sel
                          ? `2px solid ${vars.colors.white}`
                          : undefined,
                        boxShadow: sel ? '0 0 4px rgba(0,0,0,0.25)' : undefined,
                      }}
                      onClick={() => setNewColor(c)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
}
