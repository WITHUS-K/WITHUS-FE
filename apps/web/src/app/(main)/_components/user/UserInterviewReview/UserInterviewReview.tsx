'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export interface InterviewScheduleItem {
  date: Date;
  slotsByRole: Record<ReviewerRole, InterviewSlot[]>;
}

export interface UserInterviewReviewProps {
  schedules: InterviewScheduleItem[];
}

export const UserInterviewReview: React.FC<UserInterviewReviewProps> = ({
  schedules,
}) => {
  const router = useRouter();
  const [role, setRole] = useState<ReviewerRole>('interviewer');
  const [dateIndex, setDateIndex] = useState(0);

  const toggleOptions: OptionsList<ReviewerRole> = [
    { value: 'interviewer', label: '면접관' },
    { value: 'guide', label: '안내자' },
  ];

  const current = schedules[dateIndex];
  const slots = current?.slotsByRole[role] ?? [];

  const dateLabel = current
    ? `${current.date.getFullYear()}년 ${current.date.getMonth() + 1}월 ${current.date.getDate()}일`
    : '면접 일정 없음';

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
          onClick={() => router.push('/interview-evaluation')}
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
            <button
              className={styles.navButton}
              onClick={() => setDateIndex((i) => Math.max(0, i - 1))}
              disabled={dateIndex === 0}
            >
              <IcArrowLeft width={24} height={24} />
            </button>
            <button
              className={styles.navButton}
              onClick={() => setDateIndex((i) => Math.min(schedules.length - 1, i + 1))}
              disabled={dateIndex === schedules.length - 1 || schedules.length === 0}
            >
              <IcArrowRight width={24} height={24} />
            </button>
          </Flex>
        </div>
        <Divider length="100%" borderColor="grayscale10" />

        {slots.length === 0 ? (
          <Flex justify="center" paddingTop="2rem">
            <Text variant="sm_caption_medium" color="grayscale50">
              배정된 면접이 없습니다.
            </Text>
          </Flex>
        ) : (
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
        )}
      </Flex>
    </section>
  );
};
