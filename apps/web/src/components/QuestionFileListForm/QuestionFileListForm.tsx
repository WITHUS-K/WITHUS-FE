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

interface QuestionAndFileListFormProps {
  detailItems: DetailItem[];
  answers?: string[];
  files: ({ name: string; size: number; downloadUrl: string } | null)[];
  onAnswerChange: (idx: number, value: string) => void;
  onFileChange: (idx: number, file: File | null) => void;
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

  const textItems = detailItems.filter((item) => item.type === 'text');
  const fileItems = detailItems.filter((item) => item.type === 'file');

  // 미리 getStatus 로 상태 객체들 생성
  const textStatuses = textItems.map((_, idx) =>
    getStatus(`question-text-${idx}`)
  );
  const fileStatuses = fileItems.map((_, idx) =>
    getStatus(`question-file-${idx}`)
  );

  return (
    <div className={s.wrapper}>
      {textItems.map((item, idx) => {
        const status = textStatuses[idx];
        const maxLength =
          item.typeInfo.info === '제한 없음'
            ? Infinity
            : Number(item.typeInfo.info.replace('자', ''));
        const includeWhitespace = item.typeInfo.infoDetail === '공백 포함';
        return (
          <div
            key={`text-${idx}`}
            id={`question-text-${idx}`}
            tabIndex={-1}
            className={clsx(s.questionContainer, focusableWrapper)}
          >
            <Flex gap="0.4rem" align="center" width="100%">
              <Text variant="md1_text_semibold" color="grayscale70">
                질문-{idx + 1}
              </Text>
              {item.isEssential && (
                <Text variant="md2_text_semibold" color="error">
                  *
                </Text>
              )}
            </Flex>
            <QuestionInput
              title={item.description}
              info={item.typeInfo.info}
              infoDetail={item.typeInfo.infoDetail}
              value={answers[idx] ?? ''}
              maxLength={maxLength}
              includeWhitespace={includeWhitespace}
              onFocus={status!.setEditing}
              onChange={(val) => {
                if (!readOnly) {
                  onAnswerChange(idx, val);
                  status!.setEditing();
                }
              }}
              onBlur={(e) => {
                e.currentTarget.value.trim()
                  ? status!.setCompleted()
                  : status!.setDefault();
              }}
              readOnly={readOnly}
            />
          </div>
        );
      })}

      {fileItems.map((item, idx) => {
        const status = fileStatuses[idx];
        return (
          <div
            key={`file-${idx}`}
            id={`question-file-${idx}`}
            style={{ marginBottom: '2rem' }}
            onMouseDown={status!.setEditing}
            tabIndex={-1}
            className={focusableWrapper}
          >
            <FileUpload
              item={item}
              file={files[idx]}
              readOnly={readOnly}
              onChange={(file) => {
                onFileChange(idx, file);
                file ? status!.setCompleted() : status!.setDefault();
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
