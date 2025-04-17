import { useEffect, useState } from 'react';
import * as styles from './Pagination.css';
import { IcArrowLeft, IcArrowRight } from '@/icons/src/mono';

interface PaginationProps {
  totalItems: number;
  itemCountPerPage?: number;
  pageCount?: number;
  currentPage: number;
}

export const Pagination = ({
  totalItems,
  itemCountPerPage = 1,
  pageCount = 8,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);

  const MIN_SLOTS = 8;
  const displayCount = pageCount < MIN_SLOTS ? MIN_SLOTS : pageCount;

  const isFirstPage = start === 1;
  const isLastPage = start + displayCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage >= start + displayCount) {
      setStart((prev) => prev + displayCount);
    } else if (currentPage < start) {
      setStart((prev) => Math.max(1, prev - displayCount));
    }
  }, [currentPage, displayCount, start]);

  const slots = Array.from({ length: displayCount }, (_, i) => start + i);

  return (
    <div className={styles.paginationWrapper}>
      <ul className={styles.listStyle}>
        <li
          className={
            isFirstPage ? styles.pageItemDisabledStyle : styles.arrowStyle
          }
        >
          <a
            href={isFirstPage ? '#' : `?page=${start - 1}`}
            aria-disabled={isFirstPage}
          >
            <IcArrowLeft width={24} height={24} />
          </a>
        </li>

        {slots.map((page) => {
          const isValid = page <= totalPages;
          const isActive = page === currentPage;

          return (
            <li key={page} className={styles.listItemStyle}>
              <a
                href={isValid ? `?page=${page}` : '#'}
                className={[
                  styles.pageItemStyle,
                  isActive && styles.pageItemActiveStyle,
                  !isValid && styles.pageItemDisabledStyle,
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-disabled={!isValid}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={
            isLastPage ? styles.pageItemDisabledStyle : styles.arrowStyle
          }
        >
          <a
            href={isLastPage ? '#' : `?page=${start + displayCount}`}
            aria-disabled={isLastPage}
          >
            <IcArrowRight width={24} height={24} />
          </a>
        </li>
      </ul>
    </div>
  );
};
