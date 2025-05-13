// components/Table/TableContainer.tsx
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
}

export default function TableContainer({
  headerMeta,
  data: initialData,
  availableEvals,
}: TableContainerProps) {
  // --- state ---
  const [rows, setRows] = useState<MemberWithEval[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortState, setSortState] = useState(
    Object.fromEntries(headerMeta.map((h) => [h.key, 'asc'])) as Record<
      string,
      'asc' | 'desc'
    >
  );

  // --- pagination ---
  const pageSize = 10;
  const start = (currentPage - 1) * pageSize;
  const pageData = useMemo(
    () => rows.slice(start, start + pageSize),
    [rows, start]
  );

  // --- sorting (간단) ---
  const sorted = useMemo(() => {
    // sortState 에서 'asc' 가 아닌 첫 번째 entry 를 찾는다
    const active = Object.entries(sortState).find(([, dir]) => dir !== 'asc');
    if (!active) return pageData;

    const [key, dir] = active as [string, 'asc' | 'desc'];
    return [...pageData].sort((a: any, b: any) =>
      dir === 'asc'
        ? String(a[key]).localeCompare(b[key])
        : String(b[key]).localeCompare(a[key])
    );
  }, [pageData, sortState]);

  // --- 선택 ---
  const allChecked =
    sorted.length > 0 && sorted.every((m) => selectedIds.includes(m.id));
  const toggleAll = (c: boolean) =>
    setSelectedIds(c ? sorted.map((m) => m.id) : []);
  const toggleOne = (id: string, c: boolean) =>
    setSelectedIds((prev) =>
      c ? [...prev, id] : prev.filter((x) => x !== id)
    );
  const handleAddEval = (rowId: string, ev: Evaluator) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId ? { ...r, evaluators: [...r.evaluators, ev] } : r
      )
    );
  };

  return (
    <Flex direction="column" width="100%">
      <ApplyList
        data={sorted}
        selectedIds={selectedIds}
        onToggleAll={toggleAll}
        onToggleOne={toggleOne}
        availableEvals={availableEvals!}
        onAddEval={handleAddEval}
        headerMeta={headerMeta}
        sortState={sortState}
        onSortChange={(k, d) => setSortState((s) => ({ ...s, [k]: d }))}
        currentPage={currentPage}
        totalItems={rows.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />

      <div className={styles.pagination}>
        <Pagination
          totalItems={rows.length}
          itemCountPerPage={pageSize}
          pageCount={5}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Flex>
  );
}
