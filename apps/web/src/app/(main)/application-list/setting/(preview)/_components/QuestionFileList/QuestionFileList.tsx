'use client';
import React, { useState } from 'react';
import type { DetailItem } from '@web/types/application';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { QuestionInput } from '@repo/ui/InputField';
import { FileUpload } from '../../../../../../../components/FileUpload/FileUpload';
import * as s from './QuestionFileList.css';
import { AnswerFile } from '@web/components/QuestionFileListForm/QuestionFileListForm';

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
  const [files, setFiles] = useState<AnswerFile[][]>(
    fileItems.map(() => []) // 초기엔 질문별 빈 배열
  );

  const handleFileChange = (idx: number, newFiles: AnswerFile[]) => {
    setFiles((prev) => {
      const copy = [...prev];
      copy[idx] = newFiles; // 질문 idx 에 newFiles 배열 전체를 저장
      return copy;
    });
  };
  //console.log('파일 질문', fileItems);

  return (
    <div className={s.wrapper} style={{ pointerEvents: 'none' }}>
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
            description={item.addDescription}
          />
        </div>
      ))}
      {fileItems.map((item, idx) => {
        const countStr = item.typeInfo.info.replace(/\D/g, '');
        const sizeStr = item.typeInfo.infoDetail.replace(/\D/g, '');

        const stringItem: DetailItem = {
          ...item,
          typeInfo: {
            info: countStr,
            infoDetail: sizeStr,
          },
        };
        return (
          <div key={`f-${idx}`} style={{ marginBottom: '2rem' }}>
            <FileUpload
              item={stringItem}
              files={files[idx]!}
              onChange={(newFiles) => handleFileChange(idx, newFiles)}
            />
          </div>
        );
      })}
    </div>
  );
};
