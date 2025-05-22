'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { ITEMS, Item } from '@web/constants/document';
import ItemCard from '../../_components/ItemCard/ItemCard';
import { Pagination } from '@repo/ui/Pagination';

const PER_PAGE = 9;

export default function TabPage() {
  const { tab } = useParams() as { tab?: 'all' | 'BEFORE' | 'COMPLETED' };
  const activeTab = tab ?? 'all';

  const [currentPage, setCurrentPage] = useState<number>(1);

  // 탭 필터링: all 이면 전체, 아니면 status 일치 항목만
  const filtered = useMemo<Item[]>(() => {
    if (activeTab === 'all') return ITEMS;
    return ITEMS.filter((it) => it.evaluationStatus === activeTab);
  }, [activeTab]);

  // 현재 페이지에 보여줄 슬라이스
  const pageItems = useMemo<Item[]>(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <>
      <Flex
        wrap="wrap"
        gap="2rem"
        justify="flexStart"
        style={{ minHeight: '36rem' }}
      >
        {pageItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Flex>

      <div
        style={{
          marginTop: '4rem',
          textAlign: 'center',
          paddingBottom: '2.4rem',
        }}
      >
        <Pagination
          totalItems={filtered.length}
          itemCountPerPage={PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
