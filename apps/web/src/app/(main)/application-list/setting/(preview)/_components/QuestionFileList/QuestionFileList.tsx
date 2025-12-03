'use client';
import React, { useEffect, useMemo, useState } from 'react';
import type { DetailItem } from '@web/types/application';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { QuestionInput } from '@repo/ui/InputField';
import { FileUpload } from '../../../../../../../components/FileUpload/FileUpload';
import * as s from './QuestionFileList.css';
import { AnswerFile } from '@web/components/QuestionFileListForm/QuestionFileListForm';
import { vars } from '@repo/theme';

interface Props {
  detailItems: DetailItem[];
}

export const QuestionAndFileList: React.FC<Props> = ({ detailItems }) => {
  // 텍스트/파일 개수를 원본 배열에서 바로 샘플링
  const textCount = useMemo(
    () => detailItems.filter((i) => i.type === 'text').length,
    [detailItems]
  );
  const fileCount = useMemo(
    () => detailItems.filter((i) => i.type === 'file').length,
    [detailItems]
  );

  // 미리보기라 입력은 막혀있지만(포인터 비활성) 컨트롤드 컴포넌트라서 값 배열은 유지
  const [answers, setAnswers] = useState<string[]>(Array(textCount).fill(''));
  const [files, setFiles] = useState<AnswerFile[][]>(
    Array(fileCount).fill([] as AnswerFile[])
  );

  // detailItems가 바뀔 때 길이만 맞춰줌(기존 값 최대한 유지)
  useEffect(() => {
    setAnswers((prev) => {
      const next = Array(textCount).fill('');
      for (let i = 0; i < Math.min(prev.length, next.length); i++)
        next[i] = prev[i]!;
      return next;
    });
  }, [textCount]);

  useEffect(() => {
    setFiles((prev) => {
      const next = Array(fileCount).fill([] as AnswerFile[]);
      for (let i = 0; i < Math.min(prev.length, next.length); i++)
        next[i] = prev[i]!;
      return next;
    });
  }, [fileCount]);

  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  const handleFileChange = (idx: number, newFiles: AnswerFile[]) => {
    setFiles((prev) => {
      const copy = [...prev];
      copy[idx] = newFiles;
      return copy;
    });
  };

  // 여기서 핵심: detailItems를 **분리하지 않고** 받은 순서대로 렌더
  let t = 0; // 텍스트 러닝 인덱스
  let f = 0; // 파일 러닝 인덱스

  return (
    <div className={s.wrapper} style={{ pointerEvents: 'none' }}>
      {detailItems.map((item) => {
        if (item.type === 'text') {
          const textIndex = t++;

          const rawMax = parseInt(
            item.typeInfo.infoDetail.replace(/\D/g, ''),
            10
          );
          const maxLengthValue = Number.isNaN(rawMax) ? undefined : rawMax;

          const includeWhitespace =
            (item as any).includeWhitespace !== undefined
              ? (item as any).includeWhitespace
              : true;

          const rawValue = answers[textIndex] ?? '';
          const normalized = rawValue.replace(/[\r\n]/g, '');
          const currentCount = includeWhitespace
            ? normalized.length
            : normalized.replace(/\s/g, '').length;

          const hasError =
            maxLengthValue !== undefined && currentCount > maxLengthValue;

          return (
            <div key={`t-${textIndex}`} className={s.questionContainer}>
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
                </Flex>
                <Text
                  variant="sm_caption_medium"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {maxLengthValue === undefined ? (
                    <span style={{ color: vars.colors.grayscale40 }}>
                      {currentCount}자
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          color: hasError
                            ? vars.colors.error
                            : vars.colors.grayscale40,
                        }}
                      >
                        {currentCount}
                      </span>
                      <span style={{ color: vars.colors.grayscale40 }}>
                        /{maxLengthValue}자{' '}
                        {item.typeInfo.infoDetail &&
                          `(${item.typeInfo.infoDetail})`}
                      </span>
                    </>
                  )}
                </Text>
              </Flex>

              <QuestionInput
                title={item.description}
                maxLength={maxLengthValue as number | undefined}
                infoDetail={item.typeInfo.infoDetail}
                value={answers[textIndex] ?? ''}
                onChange={(val) => handleAnswerChange(textIndex, val)}
                description={item.addDescription}
                // 프리뷰이므로 실제 입력은 막혀 있음(pointer-events: none)
              />
            </div>
          );
        }

        // file
        const fileIndex = f++;
        // FileUpload가 숫자 문자열만 받는다면 기존 로직 유지
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
          <div key={`f-${fileIndex}`} style={{ marginBottom: '2rem' }}>
            <FileUpload
              item={stringItem}
              files={files[fileIndex] || []}
              onChange={(newFiles) => handleFileChange(fileIndex, newFiles)}
              // 프리뷰라 클릭 불가지만 prop은 그대로 전달
            />
          </div>
        );
      })}
    </div>
  );
};
