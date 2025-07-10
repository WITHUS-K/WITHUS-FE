'use client';
import * as styles from './Input.css';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import React, { FocusEvent, useEffect, useRef } from 'react';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  info?: string;
  infoDetail?: string;
  readOnly?: boolean;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  includeWhitespace?: boolean;
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
  maxLength,
  includeWhitespace,
}: QuestionInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 높이 자동 조정
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }, [value]);

  // 입력된 문자열을 조건에 따라 자르는 유틸
  const enforceLimit = (text: string) => {
    if (maxLength === Infinity) return text;
    if (includeWhitespace) {
      return text.slice(0, maxLength);
    } else {
      let count = 0;
      let result = '';
      for (const ch of text) {
        if (ch !== ' ') {
          count += 1;
        }
        if (count > maxLength!) break;
        result += ch;
      }
      return result;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const raw = e.currentTarget.value;
    const truncated = enforceLimit(raw);
    onChange(truncated);
  };

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
        onChange={handleChange}
        rows={5}
        disabled={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};
