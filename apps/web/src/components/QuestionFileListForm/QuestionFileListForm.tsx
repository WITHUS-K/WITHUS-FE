'use client';

import React, { useContext } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { QuestionInput } from '@repo/ui/InputField';
import type { DetailItem } from '@web/types/application';
import * as s from '../../app/(main)/application-list/setting/(preview)/_components/QuestionFileList/QuestionFileList.css';
import { FileUpload } from '@web/components/FileUpload/FileUpload';
import { FormFieldStatusContext } from '@web/app/apply/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/apply/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';
import clsx from 'clsx';
import { FileInfo } from '@repo/ui';

export type AnswerFile = File | FileInfo;

interface QuestionAndFileListFormProps {
  detailItems: DetailItem[];
  answers?: string[];
  files: AnswerFile[][];
  onAnswerChange: (idx: number, value: string) => void;
  onFileChange: (idx: number, files: AnswerFile[]) => void;
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

  let textIdx = -1;
  let fileIdx = -1;

  return (
    <div className={s.wrapper}>
      {detailItems.map((item, idx) => {
        if (item.type === 'text') {
          textIdx += 1;
          const status = getStatus(`question-text-${textIdx}`);
          const maxLength =
            item.typeInfo.info === '제한 없음'
              ? Infinity
              : Number(item.typeInfo.info.replace('자', ''));

          return (
            <div
              key={`text-${textIdx}`}
              id={`question-text-${textIdx}`}
              tabIndex={-1}
              className={clsx(s.questionContainer, focusableWrapper)}
            >
              <Flex gap="0.4rem" align="center" width="100%">
                <Text variant="md1_text_semibold" color="grayscale70">
                  질문-{textIdx + 1}
                </Text>
                {item.required && (
                  <Text variant="md2_text_semibold" color="error">
                    *
                  </Text>
                )}
              </Flex>

              <QuestionInput
                title={item.description}
                description={item.addDescription}
                infoDetail={item.typeInfo.infoDetail}
                value={
                  readOnly ? (item.answer ?? '') : (answers[textIdx] ?? '')
                }
                maxLength={maxLength}
                includeWhitespace={item.includeWhitespace}
                onFocus={status.setEditing}
                onChange={(val) => {
                  if (!readOnly) {
                    onAnswerChange(textIdx, val);
                    status.setEditing();
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.value.trim()
                    ? status.setCompleted()
                    : status.setDefault();
                }}
                readOnly={readOnly}
              />
            </div>
          );
        }

        fileIdx += 1;
        const status = getStatus(`question-file-${fileIdx}`);

        return (
          <div
            key={`file-${fileIdx}`}
            id={`question-file-${fileIdx}`}
            style={{ marginBottom: '2rem' }}
            onMouseDown={status.setEditing}
            tabIndex={-1}
            className={focusableWrapper}
          >
            <FileUpload
              item={item}
              files={files[fileIdx] || []}
              readOnly={readOnly}
              onChange={(newFiles) => {
                onFileChange(fileIdx, newFiles);
                newFiles.length ? status.setCompleted() : status.setDefault();
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
