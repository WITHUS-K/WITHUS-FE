'use client';

import React, { useRef, useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import {
  IcApplicationFileUpload,
  IcApplicationFileUploadCo,
  IcInputError,
} from '@repo/ui/icons/colored';
import { IcFileUpload } from '@repo/ui/icons/mono';
import * as styles from './FileUpload.css';
import type { DetailItem } from '@web/types/application';
import { FileUploader } from '@repo/ui/FileUploader';
import { AttachmentListItem } from '../AttachmentListItem/AttachmentListItem';
import { FileInfo } from '@repo/ui';
import { useFileDownload } from '@web/store/mutation/useFileDownload';
import { AnswerFile } from '../QuestionFileListForm/QuestionFileListForm';

export interface FileUploadProps {
  item: DetailItem;
  files: AnswerFile[];
  onChange: (files: AnswerFile[]) => void;
  readOnly?: boolean;
}

function formatMB(bytes: number, decimals = 2) {
  return (bytes / (1024 * 1024)).toFixed(decimals) + ' MB';
}

/**
 * 이름에서 UUID prefix와 중복된 suffix를 제거하고,
 * 첫 번째 확장자 이후로만 포함하여 순수한 원본 파일명만 추출
 */
function extractOriginalName(name: string): string {
  const idx = name.indexOf('_');
  const raw = idx >= 0 ? name.slice(idx + 1) : name;
  const match = raw.match(/\.(?:pdf|png|jpg|jpeg)/i);
  if (match) {
    const ext = match[0];
    const pos = raw.indexOf(ext);
    return raw.slice(0, pos + ext.length);
  }
  return raw;
}

function getOriginalFileName(fileRef: string): string {
  let name = fileRef;
  try {
    const url = new URL(fileRef);
    name = decodeURIComponent(url.pathname.split('/').pop() || fileRef);
  } catch {
    name = fileRef.split(/[/\\]/).pop() || fileRef;
  }
  return extractOriginalName(name);
}

function normalizeFile(f: AnswerFile) {
  const rawRef = (f as any).downloadUrl ?? f.name;
  const displayName = getOriginalFileName(rawRef);
  const size = (f as any).size;
  const downloadUrl = (f as any).downloadUrl;
  return { displayName, size, downloadUrl };
}

export const FileUpload: React.FC<FileUploadProps> = ({
  item,
  files,
  onChange,
  readOnly = false,
}) => {
  const {
    typeInfo: { info, infoDetail },
  } = item;
  const maxCount = Number(info);
  const maxMB = Number(infoDetail);
  const download = useFileDownload();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    const combined = [...files, ...selected];
    const unique = combined.filter(
      (f, i) => combined.findIndex((g) => g.name === f.name) === i
    );

    if (unique.length > maxCount) {
      setHasError(true);
      setErrorMessage(`최대 ${maxCount}개까지 업로드할 수 있습니다.`);
      e.target.value = '';
      return;
    }

    const overSized = unique.filter((f) => f.size > maxMB * 1024 * 1024);
    if (overSized.length) {
      setHasError(true);
      setErrorMessage(
        `다음 파일이 ${maxMB}MB를 초과했습니다: ` +
          overSized.map((f) => f.name).join(', ')
      );
      e.target.value = '';
      return;
    }

    setHasError(false);
    setErrorMessage('');

    onChange(unique);
    e.target.value = '';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (!e.dataTransfer.files.length) return;
    const dtFiles = Array.from(e.dataTransfer.files);
    const combined = [...files, ...dtFiles];
    const unique = combined.filter(
      (f, i) => combined.findIndex((g) => g.name === f.name) === i
    );
    if (unique.length > maxCount) {
      setHasError(true);
      setErrorMessage(`최대 ${maxCount}개까지 업로드할 수 있습니다.`);
      return;
    }
    const overSized = unique.filter((f) => f.size > maxMB * 1024 * 1024);
    if (overSized.length) {
      setHasError(true);
      setErrorMessage(
        `다음 파일이 ${maxMB}MB를 초과했습니다: ` +
          overSized.map((f) => f.name).join(', ')
      );
      return;
    }

    setHasError(false);
    setErrorMessage('');

    onChange(unique);
  };

  const handleRemove = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    setHasError(false);
    setErrorMessage('');
    onChange(next);
  };

  const handleDownload = (fileInfo: FileInfo) => {
    download.mutate({
      imageUrl: fileInfo.downloadUrl!,
      fileName: fileInfo.name,
    });
  };

  const dedupedFiles = React.useMemo<AnswerFile[]>(() => {
    const seen = new Set<string>();
    return files.filter((f) => {
      const { displayName } = normalizeFile(f);
      if (seen.has(displayName)) return false;
      seen.add(displayName);
      return true;
    });
  }, [files]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Flex align="center" gap="0.5rem">
          <Text variant="md1_text_semibold" color="grayscale70">
            첨부파일
          </Text>
          {item.required && (
            <Text variant="md1_text_semibold" color="error">
              *
            </Text>
          )}
        </Flex>
        <Text variant="sm_caption_medium" color="grayscale50">
          지원 형식: PDF, PNG, JPG
        </Text>
      </div>

      <div
        className={styles.bodyContainer}
        data-read-only={readOnly ? 'true' : 'false'}
        data-has-error={hasError ? 'true' : 'false'}
      >
        <Flex direction="column" gap="1.6rem" marginBottom="2.8rem">
          <Flex align="center" justify="spaceBetween" width="100%">
            <Text variant="md1_text_semibold" color="grayscale70">
              {!item.required ? `(선택) ` : ''}
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

        <Flex direction="column" gap="1rem" width="100%">
          {dedupedFiles.map((f, idx) => {
            const { displayName, size, downloadUrl } = normalizeFile(f);

            if (readOnly) {
              return (
                <FileUploader
                  key={displayName + idx}
                  readOnly
                  file={{ name: displayName, size, downloadUrl }}
                  onDownload={() =>
                    handleDownload({ name: displayName, size, downloadUrl })
                  }
                />
              );
            }

            return (
              <AttachmentListItem
                key={displayName + idx}
                name={displayName}
                size={formatMB(size)}
                extension={displayName.split('.').pop() ?? ''}
                onRemove={() => handleRemove(idx)}
              />
            );
          })}
        </Flex>

        {!readOnly && (
          <label
            data-drag-active={dragActive ? 'true' : 'false'}
            className={styles.dropZone}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              multiple
              ref={inputRef}
              className={styles.input}
              onChange={handleSelect}
            />
            {dragActive ? (
              <IcApplicationFileUploadCo width={72} height={73} />
            ) : (
              <IcApplicationFileUpload width={72} height={73} />
            )}
            <Text
              variant="md2_text_medium"
              color={dragActive ? 'primary50' : 'grayscale50'}
            >
              파일을 드래그 앤 드롭하거나 직접 추가하세요。
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
        )}
        {hasError && (
          <div className={styles.errorTextStyle}>
            <IcInputError width={24} height={24} />
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
