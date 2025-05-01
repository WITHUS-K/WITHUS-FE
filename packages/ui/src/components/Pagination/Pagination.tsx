import { useEffect, useState, useCallback } from 'react';
import * as styles from './Pagination.css';
import { IcArrowLeft, IcArrowRight } from '../../icons/src/mono';

export interface PaginationProps {
  totalItems: number;
  itemCountPerPage?: number;
  //한 그룹에 보여줄 페이지 개수
  pageCount?: number;
  currentPage: number;
  // 페이지가 바뀔 때 호출되는 콜백
  onPageChange?: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemCountPerPage = 1,
  pageCount = 8,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const groupSize = pageCount;

  // 현재 페이지에 맞춰 그룹 시작 페이지 계산
  const [startPage, setStartPage] = useState(
    Math.floor((currentPage - 1) / groupSize) * groupSize + 1
  );

  // currentPage나 groupSize가 바뀌면 startPage 재계산
  useEffect(() => {
    const newStart = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    setStartPage(newStart);
  }, [currentPage, groupSize]);

  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const goTo = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      onPageChange?.(page);
    },
    [onPageChange, totalPages]
  );

  return (
    <div className={styles.paginationWrapper}>
      <ul className={styles.listStyle}>
        {/* 이전 페이지 */}
        <button
          type="button"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
          className={
            currentPage === 1 ? styles.arrowDisabledStyle : styles.arrowStyle
          }
        >
          <IcArrowLeft width={24} height={24} />
        </button>

        {/* 페이지 번호 */}
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={page} className={styles.listItemStyle}>
              <button
                type="button"
                onClick={() => goTo(page)}
                disabled={page === currentPage}
                aria-current={isActive || undefined}
                className={[
                  styles.pageItemStyle,
                  isActive && styles.pageItemActiveStyle,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* 다음 페이지 */}
        <button
          type="button"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="다음 페이지"
          className={
            currentPage === totalPages
              ? styles.arrowDisabledStyle
              : styles.arrowStyle
          }
        >
          <IcArrowRight width={24} height={24} />
        </button>
      </ul>
    </div>
  );
};
