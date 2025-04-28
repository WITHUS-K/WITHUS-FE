'use client';
import React from 'react';
import { vars } from '@repo/theme';
import * as styles from './RolePalettePanel.css';
import type { PaletteColor } from '@repo/utils';

interface ColorPaletteProps {
  options: PaletteColor[];
  selected: PaletteColor;
  onSelect: (color: PaletteColor) => void;
}

export function ColorPalette({
  options,
  selected,
  onSelect,
}: ColorPaletteProps) {
  return (
    <div className={styles.paletteContainer}>
      {options.map((c) => {
        const isSel = c === selected;
        return (
          <div
            key={c}
            className={styles.paletteColor}
            style={{
              backgroundColor: c,
              border: isSel ? `2px solid ${vars.colors.white}` : undefined,
              boxShadow: isSel ? '0 0 4px rgba(0,0,0,0.25)' : undefined,
            }}
            onClick={() => onSelect(c)}
          />
        );
      })}
    </div>
  );
}
