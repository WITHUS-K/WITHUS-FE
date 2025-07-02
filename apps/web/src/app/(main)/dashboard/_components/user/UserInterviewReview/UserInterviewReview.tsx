'use client';

import React, { useState } from 'react';
import * as styles from './UserInterviewReview.css';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { TextToggleSwitch, OptionsList } from '@repo/ui/TextToggleSwitch';
import { IcArrowLeft, IcArrowRight } from '@repo/ui/icons/mono';
import { Profile } from '@repo/ui/Profile';
import { Divider } from '@repo/ui';

export type ReviewerRole = 'interviewer' | 'guide';

export interface InterviewSlot {
  start: string;
  end: string;
  applicants: string[];
  interviewers: { id: string; avatarUrl: string }[];
}

export interface UserInterviewReviewProps {
  initialDate: Date;
  slotsByRole: Record<ReviewerRole, InterviewSlot[]>;
}

export const UserInterviewReview: React.FC<UserInterviewReviewProps> = ({
  initialDate,
  slotsByRole,
}) => {
  const [role, setRole] = useState<ReviewerRole>('interviewer');
  const [currentDate] = useState(initialDate);

  const toggleOptions: OptionsList<ReviewerRole> = [
    { value: 'interviewer', label: '면접관' },
    { value: 'guide', label: '안내자' },
  ];

  const dateLabel = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  const slots = slotsByRole[role];

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <Text variant="md1_text_semibold" color="grayscale90">
          면접 평가
        </Text>
        <Button
          variant="sub"
          size="32"
          width="15.2rem"
          onClick={() => {}}
          rightIcon={<IcArrowRight width={16} height={16} />}
        >
          면접 평가 바로가기
        </Button>
      </div>

      <div className={styles.toggle}>
        <TextToggleSwitch
          options={toggleOptions}
          selected={role}
          onChange={(v) => setRole(v as ReviewerRole)}
          fullWidth
        />
      </div>

      <Flex direction="column" gap="1.6rem" width="100%">
        <div className={styles.dateNav}>
          <Text variant="md2_text_semibold" color="grayscale60">
            {dateLabel}
          </Text>
          <Flex gap="1.2rem" align="center">
            <button className={styles.navButton}>
              <IcArrowLeft width={24} height={24} />
            </button>
            <button className={styles.navButton}>
              <IcArrowRight width={24} height={24} />
            </button>
          </Flex>
        </div>
        <Divider length="100%" borderColor="grayscale10" />

        <ul className={styles.slots}>
          {slots.map((slot) => (
            <li key={`${slot.start}~${slot.end}`} className={styles.slot}>
              <span className={styles.dot} />
              <Flex
                direction="column"
                gap="0.8rem"
                align="flexStart"
                width="100%"
              >
                <Text variant="sm_caption_medium" color="grayscale90">
                  {slot.start} ~ {slot.end}
                </Text>

                <div className={styles.card}>
                  <Flex gap="1rem" align="center">
                    <Text variant="xs_caption_medium" color="grayscale80">
                      지원자
                    </Text>
                    {slot.applicants.map((name) => (
                      <span key={name} className={styles.applicantTag}>
                        {name}
                      </span>
                    ))}
                  </Flex>
                  <Divider
                    length="2.4rem"
                    borderColor="grayscale10"
                    direction="column"
                  />
                  <Flex gap="1rem" align="center">
                    <Text variant="xs_caption_medium" color="grayscale80">
                      {role === 'interviewer' ? '면접관' : '안내자'}
                    </Text>
                    <Flex gap="1.4rem" align="center">
                      {slot.interviewers.map((iv) => (
                        <Profile
                          key={iv.id}
                          src={iv.avatarUrl}
                          alt=""
                          size="32"
                        />
                      ))}
                    </Flex>
                  </Flex>
                </div>
              </Flex>
            </li>
          ))}
        </ul>
      </Flex>
    </section>
  );
};
