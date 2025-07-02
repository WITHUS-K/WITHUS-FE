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
import { AttachmentListItem } from '../AttachmentListItem/AttachmentListItem';
import { FileInfo } from '@repo/ui';
import { useFileDownload } from '@web/store/mutation/useFileDownload';

export interface FileUploadProps {
  item: DetailItem;
  file?: {
    name: string | undefined;
    size: number;
    downloadUrl: string;
  } | null;
  onChange: (file: File | null) => void;
  readOnly?: boolean;
}

function formatMB(bytes: number, decimals = 2) {
  return (bytes / (1024 * 1024)).toFixed(decimals) + ' MB';
}

/**
 * URL의 마지막 세그먼트에서 UUID_를 제거하고 원래 파일명만 반환합니다.
 */
function getOriginalFileName(fileUrl: string): string {
  // URL 에서 마지막 세그먼트만 추출
  const lastSegment = decodeURIComponent(
    fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
  );
  // 마지막 언더스코어 위치
  const idx = lastSegment.lastIndexOf('_');
  // 언더스코어가 있으면 그 뒤만, 없으면 원본 세그먼트 전체
  return idx !== -1 ? lastSegment.substring(idx + 1) : lastSegment;
}
export const FileUpload: React.FC<FileUploadProps> = ({
  item,
  file,
  onChange,
  readOnly = false,
}) => {
  const {
    typeInfo: { info, infoDetail },
  } = item;

  const download = useFileDownload();

  //if (!file) return null;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onChange(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    onChange(f);
  };

  const handleDownload = (fileInfo: FileInfo) => {
    download.mutate({
      imageUrl: fileInfo.downloadUrl!,
      fileName: fileInfo.name,
    });
  };

  //console.log('파일네임', getOriginalFileName(file!.downloadUrl));
  // 읽기 전용 모드에서 FileUploader에 넘길 FileInfo 객체
  const wrappedFile: FileInfo | undefined = file
    ? {
        name: getOriginalFileName(file.downloadUrl),
        size: file.size,
        downloadUrl: file.downloadUrl,
      }
    : undefined;

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
          wrappedFile && (
            <FileUploader
              readOnly
              file={wrappedFile}
              onDownload={handleDownload}
            />
          )
        ) : (
          <>
            {file && (
              <AttachmentListItem
                name={getOriginalFileName(file.name!)}
                size={formatMB(file.size)}
                extension={file.name!.split('.').pop() ?? ''}
                onRemove={() => onChange(null)}
              />
            )}

            <label
              className={styles.dropZone}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                ref={inputRef}
                className={styles.input}
                onChange={handleSelect}
              />
              <IcApplicationFileUpload width={72} height={73} />
              <Text variant="md2_text_medium" color="grayscale50">
                파일을 드래그 드랍 or 직접 추가해주세요.
              </Text>
              <Button
                width="13.2rem"
                variant="stroke"
                size="40"
                leftIcon={<IcFileUpload width={24} height={24} />}
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                파일 추가
              </Button>
            </label>
          </>
        )}
      </div>
    </div>
  );
};
