'use client';

import React, { memo } from 'react';
import { CheckBox } from '@repo/ui/CheckBox';
import * as styles from './ApplyListHeader.css';
import SortMenu, { SortDirection } from '../SortMenu/SortMenu';

export type HeaderMeta = {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
};

interface Props {
  headerMeta: HeaderMeta[];
  allChecked: boolean;
  onToggleAll: (checked: boolean) => void;
  sortState: Record<string, SortDirection>;
  onSortChange: (key: string, dir: SortDirection) => void;
}

export const ApplyListHeader = memo(function ApplyListHeader({
  headerMeta,
  allChecked,
  onToggleAll,
  sortState,
  onSortChange,
}: Props) {
  return (
    <div className={styles.row}>
      {headerMeta.map(({ key, label, width, sortable }) => (
        <div key={key} className={styles.cell} style={{ width }}>
          {key === 'checkbox' ? (
            <CheckBox
              isChecked={allChecked}
              onChange={() => onToggleAll(!allChecked)}
            />
          ) : sortable ? (
            <SortMenu
              direction={sortState[key]}
              onChange={(dir) => onSortChange(key, dir)}
            >
              {label}
            </SortMenu>
          ) : (
            <span>{label}</span>
          )}
        </div>
      ))}
    </div>
  );
});
