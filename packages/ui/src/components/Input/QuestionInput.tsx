'use client';
import * as styles from './Input.css';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import React, { FocusEvent } from 'react';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  info?: string;
  infoDetail?: string;
  readOnly?: boolean;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  /** 블러 시 e.currentTarget.value.trim()으로 빈값 체크 가능 */
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

export const QuestionInput = ({
  value,
  onChange,
  title = '질문 제목',
  info,
  infoDetail,
  readOnly = false,
  onFocus,
  onBlur,
}: QuestionInputProps) => {
  return (
    <div
      className={styles.commentInputWrapper}
      data-read-only={readOnly ? 'true' : 'false'}
    >
      <Flex justify="spaceBetween" align="center" width="100%">
        <Text variant="md1_text_semibold" color="grayscale70">
          {title}
        </Text>
        <Text variant="sm_caption_medium" color="grayscale40">
          ({info} {infoDetail})
        </Text>
      </Flex>
      <div className={styles.commentDivider} />
      <textarea
        className={styles.commentInput}
        placeholder={'답변을 입력해주세요'}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        rows={3}
        disabled={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};
