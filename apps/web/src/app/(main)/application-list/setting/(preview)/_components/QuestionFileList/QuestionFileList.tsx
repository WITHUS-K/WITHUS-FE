'use client';
import React, { useState } from 'react';
import type { DetailItem } from '@web/types/application';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { QuestionInput } from '@repo/ui/InputField';
import { FileUpload } from '../../../../../../../components/FileUpload/FileUpload';
import * as s from './QuestionFileList.css';

interface Props {
  detailItems: DetailItem[];
}

export const QuestionAndFileList: React.FC<Props> = ({ detailItems }) => {
  const textItems = detailItems.filter((item) => item.type === 'text');
  const [answers, setAnswers] = useState<string[]>(textItems.map(() => ''));

  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  const fileItems = detailItems.filter((item) => item.type === 'file');
  const [files, setFiles] = useState<(File | null)[]>(
    fileItems.map(() => null)
  );

  const handleFileChange = (idx: number, file: File | null) => {
    setFiles((prev) => {
      const copy = [...prev];
      copy[idx] = file;
      return copy;
    });
  };

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
            onChange={(val) => handleAnswerChange(idx, val)}
          />
        </div>
      ))}
      {fileItems.map((item, idx) => (
        <div key={`f-${idx}`} style={{ marginBottom: '2rem' }}>
          <FileUpload
            item={item}
            onChange={(file) => handleFileChange(idx, file)}
          />
        </div>
      ))}
    </div>
  );
};
