'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from './UserDocReviewList.css';
import { OptionsList, TextToggleSwitch } from '@repo/ui/TextToggleSwitch';
import { Text } from '@repo/ui/Text';
import { Tag } from '@repo/ui/Tag';
import { Button } from '@repo/ui/Button';
import { IcArrowRight } from '@repo/ui/icons/mono';
import { getPositionTagColor } from '@repo/utils/util/tag';

export interface ReviewItem {
  id: string;
  part: string;
  name: string;
}

export interface UserDocReviewListProps {
  itemsBefore: ReviewItem[];
  itemsAfter: ReviewItem[];
}

type ReviewTab = 'before' | 'after';

export const UserDocReviewList: React.FC<UserDocReviewListProps> = ({
  itemsBefore,
  itemsAfter,
}) => {
  const router = useRouter();
  const [tab, setTab] = useState<ReviewTab>('before');

  const items = useMemo(
    () => (tab === 'before' ? itemsBefore : itemsAfter),
    [tab, itemsBefore, itemsAfter]
  );

  const toggleOptions: OptionsList<ReviewTab> = [
    { value: 'before', label: `평가전 (${itemsBefore.length})` },
    { value: 'after', label: `평가 완료 (${itemsAfter.length})` },
  ];

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <Text variant="md1_text_semibold" color="grayscale90">
          서류 평가
        </Text>
        <Button
          variant="sub"
          size="32"
          width="15.2rem"
          onClick={() => router.push('/docs-evaluation')}
          rightIcon={<IcArrowRight width={16} height={16} />}
        >
          서류 평가 바로가기
        </Button>
      </div>

      <div className={styles.toggle}>
        <TextToggleSwitch
          options={toggleOptions}
          selected={tab}
          onChange={setTab}
          fullWidth
        />
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <Text variant="sm_caption_medium" color="grayscale50">
            평가할 항목이 없습니다.
          </Text>
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((it, idx) => {
            const color = getPositionTagColor(idx);

            return (
              <div key={it.id} className={styles.card}>
                <Tag color={color}>{it.part}</Tag>
                <Text variant="md2_text_medium" color="grayscale90">
                  {it.name}
                </Text>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
