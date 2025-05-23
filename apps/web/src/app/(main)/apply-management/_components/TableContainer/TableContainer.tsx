'use client';

import React, { useState, useMemo } from 'react';
import { Pagination } from '@repo/ui/Pagination';
import { Flex } from '@repo/ui/Flex';

import * as styles from './TableContainer.css';
import { ApplyList } from '../ApplyList/ApplyList';

import { HeaderMeta } from '../ApplyListHeader/ApplyListHeader';
import { Evaluator, MemberWithEval } from '../ApplyListItem/ApplyListItem';

export interface TableContainerProps {
  headerMeta: HeaderMeta[];
  data: MemberWithEval[];
  availableEvals?: Evaluator[];

  /** 선택된 ID들 (상위에서 관리) */
  selectedIds: string[];
  /** 전체 체크/해제 콜백 */
  onToggleAll: (checked: boolean) => void;
  /** 개별 체크/해제 콜백 */
  onToggleOne: (id: string, checked: boolean) => void;

  /** 특정 행에 평가자 추가 */
  onAddEval?: (rowId: string, ev: Evaluator) => void;
  /** 정렬 상태 */
  sortState: Record<string, 'asc' | 'desc'>;
  /** 정렬 변경 */
  onSortChange: (key: string, dir: 'asc' | 'desc') => void;
  /** 현재 페이지 (1-based) */
  currentPage: number;
  /** 전체 아이템 수 */
  totalItems: number;
  /** 페이지당 아이템 수 */
  pageSize: number;
  /** 페이지 변경 */
  onPageChange: (page: number) => void;
}

export default function TableContainer({
  headerMeta,
  data,
  availableEvals = [],
  selectedIds,
  onToggleAll,
  onToggleOne,
  onAddEval,
  sortState,
  onSortChange,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: TableContainerProps) {
  return (
    <Flex direction="column" width="100%">
      <ApplyList
        data={data}
        selectedIds={selectedIds}
        onToggleAll={onToggleAll}
        onToggleOne={onToggleOne}
        availableEvals={availableEvals!}
        onAddEval={onAddEval ?? (() => {})}
        headerMeta={headerMeta}
        sortState={sortState}
        onSortChange={onSortChange}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />

      <div className={styles.pagination}>
        <Pagination
          totalItems={totalItems}
          itemCountPerPage={pageSize}
          pageCount={8}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </Flex>
  );
}
