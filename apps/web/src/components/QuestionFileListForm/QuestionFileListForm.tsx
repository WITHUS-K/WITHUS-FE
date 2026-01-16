'use client';

import React, { useContext } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { QuestionInput } from '@repo/ui/InputField';
import type { DetailItem } from '@web/types/application';
import * as s from '../../app/(main)/application-list/setting/(preview)/_components/QuestionFileList/QuestionFileList.css';
import { FileUpload } from '@web/components/FileUpload/FileUpload';
import { FormFieldStatusContext } from '@web/app/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';
import clsx from 'clsx';
import { FileInfo } from '@repo/ui';
import { vars } from '@repo/theme';

export type AnswerFile = File | FileInfo;

interface QuestionAndFileListFormProps {
  detailItems: Array<
    DetailItem & {
      questionId?: number;
      type: 'text' | 'file';
      includeWhitespace?: boolean;
    }
  >;
  answers?: string[];
  files: AnswerFile[][];
  onAnswerChange: (textIndex: number, value: string) => void;
  onFileChange: (fileIndex: number, files: AnswerFile[]) => void;
  readOnly?: boolean;
}

export const QuestionAndFileListForm = ({
  detailItems,
  answers = [],
  files,
  onAnswerChange,
  onFileChange,
  readOnly = false,
}: QuestionAndFileListFormProps) => {
  const { getStatus } = useContext(FormFieldStatusContext);

  let t = 0;
  let f = 0;

  
  return (
    <div className={s.wrapper}>
      {detailItems.map((item) => {
        if (item.type === 'text') {
          const textIndex = t++;
          const status = getStatus(`question-text-${textIndex}`);

          const maxLength =
            item.typeInfo.info === '제한 없음'
              ? undefined
              : Number(item.typeInfo.info.replace('자', ''));

              const valueText = readOnly
  ? ((item as any).answer ?? '')
  : (answers[textIndex] ?? '');

  const count = item.includeWhitespace
  ? valueText.replace(/[\r\n]/g, '').length
  : valueText.replace(/\s/g, '').length;


          return (
            <div
              key={item.questionId}
              id={`question-text-${textIndex}`}
              tabIndex={-1}
              className={clsx(s.questionContainer, focusableWrapper)}
            >
              <Flex width="100%" align="center" justify="spaceBetween">
                <Flex gap="0.4rem" align="center" width="100%">
                  <Text variant="md1_text_semibold" color="grayscale70">
                    질문-{textIndex + 1}
                  </Text>
                  {item.required && (
                    <Text variant="md2_text_semibold" color="error">
                      *
                    </Text>
                  )}
                </Flex>{' '}
              </Flex>

              <Flex width="100%" direction="column" gap="1rem">
                <QuestionInput
                  title={item.description}
                  description={item.addDescription}
                  infoDetail={item.typeInfo.infoDetail}
                  value={
                    readOnly
                      ? ((item as any).answer ?? '')
                      : (answers[textIndex] ?? '')
                  }
                  maxLength={maxLength as number | undefined}
                  includeWhitespace={item.includeWhitespace}
                  onFocus={status.setEditing}
                  onChange={(val) => {
                    if (readOnly) return;
                    onAnswerChange(textIndex, val);
                    status.setEditing();
                  }}
                  onBlur={(e) => {
                    e.currentTarget.value.trim()
                      ? status.setCompleted()
                      : status.setDefault();
                  }}
                  readOnly={readOnly}
                />

                <Text
                  variant="sm_caption_medium"
                  style={{
                    whiteSpace: 'nowrap',
                    textAlign: 'end',
                    width: '100%',
                  }}
                >
                   {readOnly ? (
    // readOnly: 전체 글자수만 표시
    <span style={{ color: vars.colors.grayscale40 }}>
      {count}자 {item.includeWhitespace ? '(공백 포함)' : '(공백 제외)'}
    </span>
  ) : maxLength === undefined ? (
    // editable + 제한 없음
    <span style={{ color: vars.colors.grayscale40 }}>
      {count}자
    </span>
  ) : (
    // editable + 제한 있음
    <>
      <span
        style={{
          color:
            count > maxLength
              ? vars.colors.error
              : vars.colors.grayscale40,
        }}
      >
        {count}
      </span>
      <span style={{ color: vars.colors.grayscale40 }}>
        /{maxLength}자{' '}
        {item.typeInfo.infoDetail &&
          `(${item.typeInfo.infoDetail})`}
      </span>
    </>
  )}
                </Text>
              </Flex>
            </div>
          );
        }

        // file
        const fileIndex = f++;
        const status = getStatus(`question-file-${fileIndex}`);

        return (
          <div
            key={item.questionId}
            id={`question-file-${fileIndex}`}
            style={{ marginBottom: '2rem' }}
            onMouseDown={status.setEditing}
            tabIndex={-1}
            className={focusableWrapper}
          >
            <FileUpload
              item={item}
              files={files[fileIndex] || []}
              readOnly={readOnly}
              onChange={(newFiles) => {
                onFileChange(fileIndex, newFiles);
              }}
              onValidityChange={(ok) => {
                const hasAny = (files[fileIndex]?.length ?? 0) > 0;

                if (!hasAny) status.setDefault();
                else if (ok) status.setCompleted();
                else status.setEditing(); //  invalid면 미완료(연필)
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
