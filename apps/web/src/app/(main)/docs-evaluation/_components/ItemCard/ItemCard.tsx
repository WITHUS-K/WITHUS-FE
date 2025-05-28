'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tag } from '@repo/ui/Tag';
import { Flex } from '@repo/ui/Flex';
import { IcCalendar20 } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import StatusBadge from '../StatusBadge/StatusBadge';
import { Item } from '@web/constants/document';
import * as styles from './ItemCard.css';

interface Props {
  item: Item;
}

export default function ItemCard({ item }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const recruitmentId = sp.get('recruitmentId');
  const {
    id,
    name,
    positionName,
    tagColor,
    evaluationStatus,
    pass,
    evaluationScore,
    interviewDate,
    interviewTime,
  } = item;

  let label: string;
  let variant: 'default' | 'success' | 'danger';
  if (evaluationStatus === 'BEFORE') {
    label = `-점/100점`;
    variant = 'default';
  } else if (pass) {
    label = `${evaluationScore}점/100점`;
    variant = 'success';
  } else {
    label = `불합격`;
    variant = 'danger';
  }

  const handleClick = () => {
    const base = `/docs-evaluation/application/${id}`;
    // recruitmentId가 있으면 쿼리스트링으로 추가
    const url = recruitmentId
      ? `${base}?recruitmentId=${encodeURIComponent(recruitmentId)}`
      : base;
    router.push(url);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      {/* 제목 영역 */}
      <Flex align="center" gap="1.2rem">
        <Tag color={tagColor}>{positionName}</Tag>
        <Text variant="lg_subtitle_semibold" color="grayscale90">
          {name}
        </Text>
      </Flex>

      {/* 면접 일정 — 평가완료일 때만 보여줌 */}
      {evaluationStatus === 'COMPLETED' && (
        <Flex
          width="100%"
          justify="spaceBetween"
          align="center"
          marginTop="1.2rem"
        >
          <Flex align="center" gap="0.4rem">
            <IcCalendar20 width={20} height={20} />
            <Text variant="sm_caption_medium" color="grayscale50">
              면접 일정
            </Text>
          </Flex>

          {pass ? (
            <Text variant="sm_caption_medium" color="grayscale50">
              {interviewDate} {interviewTime}
            </Text>
          ) : (
            <Text variant="sm_caption_medium" color="grayscale50">
              해당 없음
            </Text>
          )}
        </Flex>
      )}

      <div className={styles.divider} />

      {/* 평가 상태 */}
      <Flex width="100%" justify="spaceBetween" align="center">
        <Text
          variant="md2_text_medium"
          color={evaluationStatus === 'COMPLETED' ? 'primary50' : 'grayscale50'}
        >
          {evaluationStatus === 'COMPLETED' ? '평가 완료' : '평가 전'}
        </Text>
        <StatusBadge label={label} variant={variant} />
      </Flex>
    </div>
  );
}
