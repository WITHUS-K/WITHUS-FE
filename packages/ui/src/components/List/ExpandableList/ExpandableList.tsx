'use client';

import { ReactNode, useState, useRef, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { Flex } from '../../Flex';
import { Text } from '../../Text';
import { ScoreChip, ScoreInfo } from '../../Chips/ScoreChip/ScoreChip';
import { IcArrowDropdown } from '../../../icons/src/colored';
import * as styles from './ExpandableList.css';

export interface Reviewer {
  name: string;
  avatar: string;
  score: number;
}

export interface ExpandableItemType {
  title: string;
  content: ReactNode;
  reviewers?: Reviewer[];
}

interface ExpandableListProps {
  items: ExpandableItemType[];
  isNumbering?: boolean;
  width?: string;
  readOnly?: boolean;
}

const ExpandableItem = ({
  item,
  idx,
  isNumbering,
  readOnly,
}: {
  item: ExpandableItemType;
  idx: number;
  isNumbering: boolean;
  readOnly: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    if (readOnly || !isOverflowing) return;
    setIsExpanded((prev) => !prev);
  };

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current;
      if (el) {
        if (!isExpanded) {
          setIsOverflowing(el.scrollHeight > el.clientHeight);
        }
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [item.content, isExpanded]);

  const scoreItems: ScoreInfo[] = (item.reviewers ?? []).map((r) => ({
    src: r.avatar,
    alt: r.name,
    name: r.name,
    score: r.score,
  }));

  const showArrow = !readOnly && isOverflowing;

  return (
    <div
      className={clsx(styles.listWrapperBase, styles.listWrapperDir.column)}
      data-read-only={readOnly}
    >
      <button
        className={styles.headerButton}
        onClick={toggleExpand}
        disabled={!showArrow}
        style={{ cursor: showArrow ? 'pointer' : 'default' }}
      >
        <Text variant="md2_text_regular" color="grayscale90">
          {isNumbering && `${idx + 1}. `}
          {item.title}
        </Text>

        <div className={styles.accordianListRightSection}>
          {scoreItems.length > 0 && <ScoreChip items={scoreItems} />}
        </div>
      </button>

      <div
        className={
          readOnly ? styles.readOnlyContentWrapper : styles.contentWrapper
        }
      >
        {/* [수정] Divider 컴포넌트 제거 (CSS border-top으로 대체됨) */}

        <div className={styles.answerContainer}>
          <div
            ref={contentRef}
            className={
              isExpanded ? styles.expandedContent : styles.clampedContent
            }
          >
            {item.content}
          </div>

          {showArrow && (
            <IcArrowDropdown
              width={24}
              height={24}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className={clsx(styles.arrowIcon, {
                [styles.arrowRotated]: isExpanded,
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const ExpandableList = ({
  items,
  isNumbering = true,
  width = '100%',
  readOnly = false,
}: ExpandableListProps) => {
  return (
    <Flex direction="column" width={width} gap="1rem">
      {items.map((item, idx) => (
        <ExpandableItem
          key={idx}
          idx={idx}
          item={item}
          isNumbering={isNumbering}
          readOnly={readOnly}
        />
      ))}
    </Flex>
  );
};
