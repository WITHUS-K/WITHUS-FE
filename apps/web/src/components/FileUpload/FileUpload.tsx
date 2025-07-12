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

function getOriginalFileName(fileUrl: string): string {
  const [path] = fileUrl.split('?');
  const lastSegment = decodeURIComponent(
    path!.substring(path!.lastIndexOf('/') + 1)
  );

  // ✅ 모든 UUID_원본파일명 패턴을 찾고, 마지막 그룹1 값만 사용
  const allMatches = [
    ...lastSegment.matchAll(
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}_(.+?)(?=[0-9a-fA-F]{8}-|$)/g
    ),
  ];

  const lastMatch = allMatches.at(-1);
  return lastMatch ? lastMatch[1]! : lastSegment;
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
  const inputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 처리 (중복 방지 + input 초기화)
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f) {
      // 이미 같은 이름의 파일이 업로드되어 있으면 무시
      if (file?.name === f.name) {
        e.target.value = '';
        return;
      }
      onChange(f);
    }
    // input value 초기화해서 같은 파일도 다시 선택 가능
    e.target.value = '';
  };

  // 드롭 처리도 마찬가지로 input 초기화
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f) {
      if (file?.name === f.name) {
        if (inputRef.current) inputRef.current.value = '';
        return;
      }
      onChange(f);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  // 삭제 시 input 초기화
  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDownload = (fileInfo: FileInfo) => {
    download.mutate({
      imageUrl: fileInfo.downloadUrl!,
      fileName: fileInfo.name,
    });
  };

  console.log('파일', file?.downloadUrl);
  const wrappedFile: FileInfo | undefined = file
    ? {
        name: getOriginalFileName(file.downloadUrl),
        size: file.size,
        downloadUrl: file.downloadUrl,
      }
    : undefined;

  return (
    <div className={styles.wrapper}>
      {/* 헤더 */}
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
        {/* 설명 */}
        <Flex direction="column" gap="1.6rem" marginBottom="2.8rem">
          <Flex align="center" justify="spaceBetween" width="100%">
            <Text variant="md1_text_semibold" color="grayscale70">
              {!item.isEssential ? `(선택) ` : ''}
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
          // 읽기 전용 모드
          wrappedFile && (
            <FileUploader
              readOnly
              file={wrappedFile}
              onDownload={handleDownload}
            />
          )
        ) : (
          // 편집 모드
          <>
            {file && (
              <AttachmentListItem
                name={getOriginalFileName(file.name!)}
                size={formatMB(file.size)}
                extension={file.name!.split('.').pop() ?? ''}
                onRemove={handleRemove}
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
