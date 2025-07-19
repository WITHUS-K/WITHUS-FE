'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  ApplyListHeader,
  HeaderMeta,
} from '../ApplyListHeader/ApplyListHeader';
import ApplyListItem, {
  Evaluator,
  MemberWithEval,
} from '../ApplyListItem/ApplyListItem';
import { Text } from '@repo/ui/Text';
import * as styles from './ApplyList.css';
import ApplyListItemFinal from '../ApplyListItem/ApplyListItemFinal';
import { IcApplyEmpty } from '@repo/ui/icons/colored';

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
  isLoading: boolean;
  isFetching: boolean;
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
  isLoading,
  isFetching,
  currentPage,
  totalItems,
  onPageChange,
  pageSize,
}: Props) {
  const params = useParams();
  const rawTab = params.tab;
  const tab = Array.isArray(rawTab) ? rawTab[0] : rawTab;

  const useFinalItem = tab === 'final' || tab === 'rejected';
  const showEmpty = !isLoading && !isFetching && data.length === 0;

  const [isScrollable, setIsScrollable] = useState(false);

  const allChecked =
    data.length > 0 && data.every((m) => selectedIds.includes(m.id));

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    setIsScrollable(el.scrollHeight > el.clientHeight);
  }, [data]);

  return (
    <div className={styles.root}>
      <ApplyListHeader
        headerMeta={headerMeta}
        allChecked={allChecked}
        onToggleAll={onToggleAll}
        sortState={sortState}
        onSortChange={onSortChange}
      />

      {showEmpty ? (
        // ─── 빈 상태일 때 보여줌 ───
        <div className={styles.emptyContainer}>
          <IcApplyEmpty width={48} height={48} />
          <Text variant="lg_subtitle_semibold" color="grayscale30">
            아직 접수된 지원자가 없습니다.
          </Text>
        </div>
      ) : (
        <div
          className={styles.listContainer}
          //ref={listRef}
          //style={{ paddingBottom: isScrollable ? '10rem' : '0.6rem' }}
        >
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
      )}
    </div>
  );
}
