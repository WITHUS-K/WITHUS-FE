'use client';
import React, { KeyboardEvent, ChangeEvent } from 'react';
import * as styles from './RolePalettePanel.css';
import { ColorPalette } from './ColorPalette';
import type { PaletteColor } from '@repo/utils';

interface RoleEditorProps {
  label: string;
  color: PaletteColor;
  isOpen: boolean;
  options: PaletteColor[];
  onLabelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onColorChange: (c: PaletteColor) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onTogglePalette: () => void;
}

export function RoleEditor({
  label,
  color,
  isOpen,
  options,
  onLabelChange,
  onColorChange,
  onKeyDown,
  onTogglePalette,
}: RoleEditorProps) {
  if (isOpen) {
    return (
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <div
            className={styles.colorIcon}
            style={{ backgroundColor: color }}
            onClick={onTogglePalette}
          />
          <input
            className={styles.inputWithIcon}
            value={label}
            onChange={onLabelChange}
            onKeyDown={onKeyDown}
            autoFocus
          />
        </div>
        <ColorPalette
          options={options}
          selected={color}
          onSelect={onColorChange}
        />
      </div>
    );
  }

  return (
    <div className={styles.inputContainer}>
      <div
        className={styles.colorIcon}
        style={{ backgroundColor: color }}
        onClick={onTogglePalette}
      />
      <input
        className={styles.inputWithIcon}
        value={label}
        onChange={onLabelChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
    </div>
  );
}
