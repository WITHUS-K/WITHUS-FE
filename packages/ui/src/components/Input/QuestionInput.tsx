'use client';
import * as styles from './Input.css';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import React, { FocusEvent, useLayoutEffect, useRef, ChangeEvent } from 'react';
import { IcInputError } from '../../icons/src/colored';
import { vars } from '@repo/theme';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  infoDetail?: string;
  readOnly?: boolean;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  includeWhitespace?: boolean;
  description?: string;
}

export const QuestionInput = ({
  value,
  onChange,
  title = '질문 제목',
  infoDetail,
  readOnly = false,
  onFocus,
  onBlur,
  maxLength = Infinity,
  includeWhitespace = true,
  description,
}: QuestionInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentCount = includeWhitespace
    ? value.length
    : value.replace(/\s/g, '').length;

  // maxLength <= 0 또는 Infinity면 “제한 없음” 처리
  const safeMax = maxLength > 0 ? maxLength : Infinity;
  // 제한이 있을 때만 에러 판단
  const hasError = safeMax !== Infinity && currentCount > safeMax;

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };
  useLayoutEffect(autoResize, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let next = e.currentTarget.value;
  
    if (safeMax !== Infinity) {
      if (includeWhitespace) {
        if (next.length > safeMax) next = next.slice(0, safeMax);
      } else {
        // ✅ 공백 기준을 \s로 통일 (스페이스/개행/탭 포함)
        let count = 0;
        let result = '';
  
        for (const ch of next) {
          if (!/\s/.test(ch)) count++;
          if (count > safeMax) break;
          result += ch;
        }
  
        next = result;
      }
    }
  
    onChange(next);
    autoResize();
  };

  return (
    <div
      className={styles.commentInputWrapper}
      data-read-only={readOnly ? 'true' : 'false'}
      data-has-error={hasError ? 'true' : 'false'}
    >
      <Flex
        width="100%"
        align="flexStart"
        direction="column"
        gap="1rem"
        style={{
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
      >
        <Text variant="md1_text_semibold" color="grayscale70">
          {title}
        </Text>
        {description && (
          <Text
            variant="md2_text_regular"
            color="grayscale60"
            style={{ whiteSpace: 'pre-line' }}
          >
            {description}
          </Text>
        )}
      </Flex>

      <div className={styles.commentDivider} />

      <div className={styles.commentTextArea}>
        <textarea
          ref={textareaRef}
          className={styles.commentInput}
          placeholder="답변을 입력해주세요"
          value={value}
          onChange={handleChange}
          disabled={readOnly}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={includeWhitespace && safeMax !== Infinity ? safeMax : undefined}
        />
      </div>

      {hasError && safeMax !== Infinity && (
        <div className={styles.errorTextStyle}>
          <IcInputError width={24} height={24} />
          최대 {safeMax}자까지 입력 가능합니다.
        </div>
      )}
    </div>
  );
};
