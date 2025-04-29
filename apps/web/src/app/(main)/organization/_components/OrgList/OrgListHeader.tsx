'use client';

import React, { memo } from 'react';
import * as styles from './OrgList.css';
import { CheckBox } from '@repo/ui/CheckBox';

type CellStyle = {
  width?: string;
  marginRight?: string;
  height?: string;
};

export type HeaderMeta = CellStyle & {
  key: string;
  content: React.ReactNode;
};

// 헤더 메타데이터
export const HEADER_META: HeaderMeta[] = [
  { key: 'checkbox', content: null!, marginRight: '2.4rem', height: '2.4rem' },
  { key: 'id', content: '순번', width: '2.3rem', marginRight: '1.8rem' },
  { key: 'name', content: '이름', width: '24rem', marginRight: '1.8rem' },
  { key: 'role', content: '역할', width: '31rem', marginRight: '4.4rem' },
  { key: 'gender', content: '성별', width: '2.1rem', marginRight: '4.4rem' },
  { key: 'dob', content: '생년월일', width: '7.7rem', marginRight: '4.4rem' },
  {
    key: 'phone',
    content: '전화번호',
    width: '10.6rem',
    marginRight: '4.4rem',
  },
  { key: 'joined', content: '가입일자', width: '7.7rem' },
];

// 스타일 적용을 담당하는 셀 컴포넌트
const HeaderCell = memo<HeaderMeta>(
  ({ content, width, marginRight, height }) => (
    <div
      style={{
        ...(width && { width }),
        ...(marginRight && { marginRight }),
        ...(height && { height }),
      }}
    >
      {content}
    </div>
  )
);

interface Props {
  allChecked: boolean;
  onToggleAll: (checked: boolean) => void;
}
export function OrgListHeader({ allChecked, onToggleAll }: Props) {
  return (
    <div className={styles.header}>
      {HEADER_META.map((meta) => {
        const { key: metaKey, content: defaultContent, ...styleProps } = meta;

        if (metaKey === 'checkbox') {
          return (
            <HeaderCell
              key={metaKey}
              {...styleProps}
              content={
                <CheckBox
                  isChecked={allChecked}
                  onChange={() => onToggleAll(!allChecked)}
                />
              }
            />
          );
        }

        return (
          <HeaderCell key={metaKey} {...styleProps} content={defaultContent} />
        );
      })}
    </div>
  );
}
