'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
  ApplyListHeader,
  HeaderMeta,
} from '../ApplyListHeader/ApplyListHeader';
import ApplyListItem, {
  Evaluator,
  MemberWithEval,
} from '../ApplyListItem/ApplyListItem';

import * as styles from './ApplyList.css';
import ApplyListItemFinal from '../ApplyListItem/ApplyListItemFinal';

interface Props {
  data: MemberWithEval[];
  selectedIds: string[];
  onToggleAll: (c: boolean) => void;
  onToggleOne: (id: string, c: boolean) => void;
  availableEvals: Evaluator[];
  onAddEval: (rowId: string, ev: Evaluator) => void;
  headerMeta: HeaderMeta[];
  sortState: Record<string, 'asc' | 'desc'>;
  onSortChange: (k: string, d: 'asc' | 'desc') => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (p: number) => void;
  pageSize: number;
}

export function ApplyList({
  data,
  selectedIds,
  onToggleAll,
  onToggleOne,
  availableEvals,
  onAddEval,
  headerMeta,
  sortState,
  onSortChange,
  currentPage,
  totalItems,
  onPageChange,
  pageSize,
}: Props) {
  const params = useParams();
  const rawTab = params.tab;
  const tab = Array.isArray(rawTab) ? rawTab[0] : rawTab;

  const useFinalItem = tab === 'final' || tab === 'rejected';

  const allChecked =
    data.length > 0 && data.every((m) => selectedIds.includes(m.id));

  return (
    <div className={styles.root}>
      <ApplyListHeader
        headerMeta={headerMeta}
        allChecked={allChecked}
        onToggleAll={onToggleAll}
        sortState={sortState}
        onSortChange={onSortChange}
      />

      <div className={styles.listContainer}>
        {data.map((m) =>
          useFinalItem ? (
            <ApplyListItemFinal
              key={m.id}
              member={m}
              isSelected={selectedIds.includes(m.id)}
              onToggle={(c) => onToggleOne(m.id, c)}
            />
          ) : (
            <ApplyListItem
              key={m.id}
              member={m}
              isSelected={selectedIds.includes(m.id)}
              onToggle={(c) => onToggleOne(m.id, c)}
              availableEvals={availableEvals}
              onAddEval={(ev) => onAddEval(m.id, ev)}
            />
          )
        )}
      </div>
    </div>
  );
}
