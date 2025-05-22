'use client';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { QuestionInput } from '@repo/ui/InputField';
import type { DetailItem } from '@web/types/application';
import * as s from '../../../../application-list/setting/preview/_components/QuestionFileList/QuestionFileList.css';
import { FileUpload } from '@web/app/(main)/application-list/setting/preview/_components/FileUpload/FileUpload';

interface QuestionAndFileListFormProps {
  detailItems: DetailItem[];
  answers: string[];
  files: (File | null)[];
  onAnswerChange: (idx: number, value: string) => void;
  onFileChange: (idx: number, file: File | null) => void;
  readOnly?: boolean;
}

export const QuestionAndFileListForm = ({
  detailItems,
  answers,
  files,
  onAnswerChange,
  onFileChange,
  readOnly = false,
}: QuestionAndFileListFormProps) => {
  const textItems = detailItems.filter((item) => item.type === 'text');
  const fileItems = detailItems.filter((item) => item.type === 'file');

  return (
    <div className={s.wrapper}>
      {textItems.map((item, idx) => (
        <div key={idx} className={s.questionContainer}>
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
            value={answers[idx] as string}
            onChange={(val) => !readOnly && onAnswerChange(idx, val)}
          />
        </div>
      ))}

      {fileItems.map((item, idx) => (
        <div key={`f-${idx}`} style={{ marginBottom: '2rem' }}>
          <FileUpload
            item={item}
            file={files[idx]} // ← 여기!
            onChange={(file) => onFileChange(idx, file)}
          />
        </div>
      ))}
    </div>
  );
};
