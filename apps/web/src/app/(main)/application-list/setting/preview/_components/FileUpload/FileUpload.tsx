'use client';
import React, { useRef } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import { IcApplicationFileUpload } from '@repo/ui/icons/colored';
import { IcFileUpload } from '@repo/ui/icons/mono';
import * as styles from './FileUpload.css';
import type { DetailItem } from '@web/types/application';
import { FileUploader } from '@repo/ui/FileUploader';

export interface FileUploadProps {
  item: DetailItem;
  file?: File | null;
  onChange: (file: File | null) => void;
  readOnly?: boolean;
}

function formatMB(bytes: number, decimals = 2) {
  return (bytes / (1024 * 1024)).toFixed(decimals) + ' MB';
}

export const FileUpload = ({
  item,
  file,
  onChange,
  readOnly = false,
}: FileUploadProps) => {
  const {
    isEssential,
    typeInfo: { info, infoDetail },
  } = item;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onChange(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    onChange(f);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Text variant="md1_text_semibold" color="grayscale70">
          첨부파일
        </Text>
        <Text variant="sm_caption_medium" color="grayscale50">
          지원 형식: PDF, PNG, JPG
        </Text>
      </div>

      <div
        className={styles.bodyContainer}
        data-read-only={readOnly ? 'true' : 'false'}
      >
        <Flex direction="column" gap="1.6rem" marginBottom="2.8rem">
          <Flex align="center" justify="spaceBetween" width="100%">
            <Text variant="md1_text_semibold" color="grayscale70">
              {item.description}
            </Text>
            <Text variant="sm_caption_medium" color="grayscale40">
              (최대 파일 수: {info}개 / 최대 파일 용량: {infoDetail}MB)
            </Text>
          </Flex>
          <div className={styles.commentDivider} />
          <Text
            variant="md2_text_regular"
            color="grayscale70"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {item.addDescription}
          </Text>
        </Flex>

        {readOnly ? (
          <>
            <FileUploader
              readOnly={readOnly}
              file={{
                name: file?.name ?? '임시 파일입니다.pdf',
                size: file ? formatMB(file.size) : '8MB',
                downloadUrl: file ? URL.createObjectURL(file) : '',
              }}
            />
          </>
        ) : (
          <>
            {file && (
              <FileUploader
                file={{
                  name: file.name,
                  size: formatMB(file.size),
                  downloadUrl: URL.createObjectURL(file),
                }}
                onDelete={() => onChange(null)}
              />
            )}

            <div
              className={styles.dropZone}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <IcApplicationFileUpload width={72} height={73} />
              <Text variant="md2_text_medium" color="grayscale50">
                파일을 드래그 드랍 or 직접 추가해주세요.
              </Text>
              <Button
                width="13.2rem"
                variant="stroke"
                size="40"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                leftIcon={<IcFileUpload width={24} height={24} />}
              >
                파일 추가
              </Button>

              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                multiple={false}
                ref={inputRef}
                className={styles.input}
                onChange={handleSelect}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
