'use client';
import React from 'react';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { IcCopy, IcLinkCopy, IcModify, IcTrash } from '@repo/ui/icons/mono';
import * as styles from './RecruitmentCard.css';
import { Button } from '@repo/ui/Button';
import { useToast } from '@repo/ui/hooks';

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
  isTemporary: boolean;
  onModify?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}

export const RecruitmentCard = ({
  isTemporary,
  count,
  recruitTitle,
  dueDate,
  recruitLink,
  currentApplicantList,
  onModify,
  onCopy,
  onDelete,
}: RecruitmentCardProps) => {
  //console.log("임시저장", isTemporary)
  const toast = useToast();

  console.log("공통리스트", currentApplicantList)

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(recruitLink)
      .then(() => toast.success('링크가 복사되었습니다.'))
      .catch(() => toast.error('링크 복사에 실패했습니다.'));
  };
  
  return (
    <div className={styles.cardWrapper}>
      {/* 왼쪽 */}
    <Flex direction='column' width='100%'>
    <Flex direction="column" marginBottom="0.6rem" width='100%'>
      <Flex width='100%' justify='spaceBetween' align='center'>
      <Flex gap="0.8rem" align="center">
          {isTemporary ? (
            <Chip bg="primary50" color="white">
              작성중
            </Chip>
          ) : count > 0 ? (
            <Chip bg="primary50" color="white">
              D-{count}
            </Chip>
          ) : count === 0 ? (
            <Chip bg="primary50" color="white">
              D-DAY
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

        <Button
        size='32'
        variant='white'
        width='9.7rem'
        onClick={handleCopyLink}
         leftIcon={<IcLinkCopy />}>
        
          링크복사
        </Button>
      </Flex>
       
   
        
        <Text variant="sm_caption_medium" color="grayscale50">
          {dueDate}
        </Text>
        <Text variant="sm_caption_medium" color="grayscale50">
          {recruitLink}
        </Text>
      </Flex>


      <Flex
  justify="spaceBetween"
  align="center"
  width="100%"
  marginTop={currentApplicantList.length ? '1.6rem' : '0rem'}
>
      <Flex wrap="wrap" gap="0.8rem">
          {currentApplicantList.map(({ position, numOfApplicant }, idx) => (
            <Flex key={idx} direction="column" align="center">
              <Chip bg="primary5" color="primary50">
                {position} {numOfApplicant}명
              </Chip>
            </Flex>
          ))}
        </Flex>
        <Flex wrap="wrap" gap="0.8rem">
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
        
      </Flex>
    </Flex>

      
    </div>
  );
};
