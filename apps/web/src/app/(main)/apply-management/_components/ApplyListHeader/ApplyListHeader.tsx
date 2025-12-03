'use client';

import React, { memo } from 'react';
import { CheckBox } from '@repo/ui/CheckBox';
import * as styles from './ApplyListHeader.css';
import SortMenu, { SortDirection } from '../SortMenu/SortMenu';
import PositionFilterMenu from '../PositionFilterMenu/PositionFilterMenu';

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

    positionOptions?: string[];          
  selectedPosition?: string | null;
  onPositionChange?: (name: string) => void;

    statusOptions?: string[];
  selectedStatus?: string | null;
  onStatusChange?: (value: string) => void;
}

export const ApplyListHeader = memo(function ApplyListHeader({
  headerMeta,
  allChecked,
  onToggleAll,
  sortState,
  onSortChange,
  positionOptions,
  selectedPosition,
  onPositionChange,
  statusOptions,
  selectedStatus,
  onStatusChange,
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
          ) : key === 'fieldTags' && positionOptions && onPositionChange ? (
            // 지원 분야 필터
            <PositionFilterMenu
              options={positionOptions}
              selected={selectedPosition ?? null}
              onChange={onPositionChange}
            >
              {label}
            </PositionFilterMenu>
          ) : key === 'status' && statusOptions && onStatusChange ? (
            // 상태 필터 (서류/면접 탭에서만 props 내려줌)
            <PositionFilterMenu
              options={statusOptions}
              selected={selectedStatus ?? null}
              onChange={onStatusChange}
            >
              {label}
            </PositionFilterMenu>
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