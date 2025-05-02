'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcNotice } from '@repo/ui/icons/colored';
import * as styles from './SelectionNotification.css';

interface Props {
  pageCount: number; // 현재 페이지 아이템 수
  totalCount: number; // 전체 필터된 아이템 수
  isAllSelected: boolean; // 전체(필터된) 아이템이 다 선택됐는지 여부
  onToggleScope: () => void; // 액션 버튼 클릭 시 호출
}

export default function SelectionNotification({
  pageCount,
  totalCount,
  isAllSelected,
  onToggleScope,
}: Props) {
  const message = isAllSelected
    ? `전체 페이지에 있는 항목 ${totalCount}건이 모두 선택되었습니다`
    : `이 페이지에 있는 항목 ${pageCount}건만 선택되었습니다`;

  const actionText = isAllSelected
    ? `해당 페이지 항목 ${pageCount}건만 선택`
    : `전체 ${totalCount}건 모두 선택`;

  return (
    <div className={styles.root}>
      <Flex align="center" gap="0.4rem">
        <IcNotice width={24} height={24} />
        <Text variant="sm_caption_medium" color="grayscale80">
          {message}
        </Text>
      </Flex>
      <Text
        variant="sm_caption_semibold"
        color="primary50"
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          marginLeft: '2.6rem',
        }}
        onClick={onToggleScope}
      >
        {actionText}
      </Text>
    </div>
  );
}
