'use client';
import React from 'react';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { IcCopy, IcModify, IcTrash } from '@repo/ui/icons/mono';
import * as styles from './RecruitmentCard.css';

export type Applicant = {
  position: string;
  numOfApplicant: number;
};

export interface RecruitmentCardProps {
  id: string;
  /** D-day 카운트 */
  count: number;
  /** 모집 제목 */
  recruitTitle: string;
  /** 마감일 */
  dueDate: string;
  /** 링크 (URL 문자열) */
  recruitLink: string;
  /** 포지션별 지원자 정보 리스트 */
  currentApplicantList: Applicant[];
  onModify?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}

export const RecruitmentCard = ({
  count,
  recruitTitle,
  dueDate,
  recruitLink,
  currentApplicantList,
  onModify,
  onCopy,
  onDelete,
}: RecruitmentCardProps) => {
  return (
    <div className={styles.cardWrapper}>
      {/* 왼쪽 */}
      <Flex direction="column" marginBottom="0.6rem">
        <Flex gap="0.8rem" align="center">
          {count > 0 ? (
            <Chip bg="primary50" color="white">
              D-{count}
            </Chip>
          ) : (
            <Chip bg="grayscale30" color="white">
              마감
            </Chip>
          )}
          <Text variant="md1_text_semibold" color="grayscale90">
            {recruitTitle}
          </Text>
        </Flex>
        <Text variant="sm_caption_medium" color="grayscale50">
          {dueDate}
        </Text>
        <Text variant="sm_caption_medium" color="grayscale50">
          {recruitLink}
        </Text>
        <Flex wrap="wrap" gap="0.8rem" marginTop="1.6rem">
          {currentApplicantList.map(({ position, numOfApplicant }, idx) => (
            <Flex key={idx} direction="column" align="center">
              <Chip bg="primary5" color="primary50">
                {position} {numOfApplicant}명
              </Chip>
            </Flex>
          ))}
        </Flex>
      </Flex>
      {/* 오른쪽 */}
      <Flex gap="0.8rem" marginTop="auto" marginLeft="auto">
        <button className={styles.iconButton} onClick={onModify}>
          <IcModify width={32} height={32} />
        </button>
        <button className={styles.iconButton} onClick={onCopy}>
          <IcCopy width={32} height={32} />
        </button>
        <button className={styles.iconButton} onClick={onDelete}>
          <IcTrash width={32} height={32} />
        </button>
      </Flex>
    </div>
  );
};
