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
  const safeMax = Number.isNaN(maxLength) ? Infinity : maxLength;
  const hasError = safeMax !== Infinity && currentCount > safeMax;

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };

  useLayoutEffect(() => {
    autoResize();
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.currentTarget.value);
    autoResize();
  };

  return (
    <div
      className={styles.commentInputWrapper}
      data-read-only={readOnly ? 'true' : 'false'}
      data-has-error={hasError ? 'true' : 'false'}
    >
      <Flex justify="spaceBetween" align="center" width="100%" gap="2rem">
        <Flex width="100%" align="flexStart" direction="column" gap="1rem">
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
        <Text variant="sm_caption_medium" style={{ whiteSpace: 'nowrap' }}>
          <span
            style={{
              color: hasError ? vars.colors.error : vars.colors.grayscale40,
            }}
          >
            {currentCount}
          </span>
          {safeMax !== Infinity && (
            <span style={{ color: vars.colors.grayscale40 }}>
              /{safeMax}자 {infoDetail && `(${infoDetail})`}
            </span>
          )}
        </Text>
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
          style={{
            resize: 'none',
            overflow: 'hidden',
            height: 'auto',
          }}
        />
      </div>

      {hasError && (
        <div className={styles.errorTextStyle}>
          <IcInputError width={24} height={24} />
          최대 {safeMax}자까지 입력 가능합니다.
        </div>
      )}
    </div>
  );
};
