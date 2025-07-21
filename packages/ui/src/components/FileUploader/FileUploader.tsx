'use client';

import React from 'react';
import { ListLayout } from '../List/ListLayout';
import * as styles from './FileUploader.css';
import { Text } from '../Text';
import { Flex } from '../Flex';
import { IcDownload, IcFileDelete } from '../../icons/src/colored';

export interface FileInfo {
  name: string;
  size: number;
  downloadUrl?: string;
}

export interface FileUploaderProps {
  file: FileInfo;
  /** 커스텀 다운로드 로직이 필요하면 전달 */
  onDownload?: (file: FileInfo) => void;
  onDelete?: (file: FileInfo) => void;
  readOnly?: boolean;
}

function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toUpperCase() ?? 'FILE';
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  file,
  onDownload,
  onDelete,
  readOnly = false,
}) => {
  const isDeletable = typeof onDelete === 'function';

  return (
    <ListLayout readOnly={readOnly}>
      <Flex direction="row" gap="1.6rem" align="center">
        <div className={styles.pdfIcon}>
          <Text variant="sm_caption_medium" color="grayscale40">
            {getFileExtension(file.name)}
          </Text>
        </div>
        <Flex direction="column" align="flexStart">
          <Text variant="md2_text_semibold" color="grayscale90">
            {file.name}
          </Text>
          <Text variant="sm_caption_medium" color="grayscale50">
            {file.size.toFixed(2)} MB
          </Text>
        </Flex>
      </Flex>

      <div className={styles.rightSection}>
        {isDeletable ? (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete!(file)}
          >
            <IcFileDelete width={24} height={24} />
          </button>
        ) : (
          <button
            type="button"
            className={styles.downloadButton}
            onClick={() => onDownload?.(file)}
          >
            <IcDownload width={24} height={24} />
            <Text variant="sm_caption_medium" color="grayscale60">
              다운로드
            </Text>
          </button>
        )}
      </div>
    </ListLayout>
  );
};
