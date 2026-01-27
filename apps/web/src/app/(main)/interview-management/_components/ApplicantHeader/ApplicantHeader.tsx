'use client';
import React from 'react';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { Divider } from '@repo/ui/Divider';
import { Button } from '@repo/ui/Button';
import * as styles from './ApplicantHeader.css';
import ApplicantToggle, {
  ApplicantItem,
} from '@web/app/(main)/interview-management/_components/ApplicantToggle/ApplicantToggle';

export interface ApplicantSliderHeaderProps {
  name: string;
  current: number;
  onViewApplication: () => void;
  isOtherUser?: boolean;
  applicants: ApplicantItem[];
  currentId: number;
  onSelect: (id: number) => void;
}

export const ApplicantSliderHeader = ({
  name,
  current,
  onViewApplication,
  isOtherUser = true,
  applicants,
  currentId,
  onSelect,
}: ApplicantSliderHeaderProps) => {
  return (
    <div className={styles.container}>
      <Flex align="center" gap="1.6rem" width="26rem">
        <Flex align="center" gap="1.2rem">
          <Text
            variant="md1_text_medium"
            color="grayscale50"
            style={{ whiteSpace: 'nowrap' }}
          >
            지원자{current}
          </Text>
          <Divider
            direction="column"
            length="2.8rem"
            borderColor="grayscale10"
          />
          <Text
            variant="md1_text_medium"
            color="black"
            style={{ whiteSpace: 'nowrap' }}
          >
            {name}
          </Text>
        </Flex>

        {isOtherUser && (
          <Button
            variant="sub"
            size="32"
            width="8.8rem"
            onClick={onViewApplication}
          >
            지원서 열람
          </Button>
        )}
      </Flex>

      <div style={{ width: '99px', minWidth: 'auto' }}>
        <ApplicantToggle
          applicants={applicants}
          currentId={currentId}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};
