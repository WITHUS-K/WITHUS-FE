import React from 'react';
import * as styles from './DocTimeline.css';
import { Text } from '@repo/ui/Text';
import { Tag } from '@repo/ui/Tag';
import { Divider, Flex } from '@repo/ui';
import { IcArrowLeft, IcArrowRight } from '@repo/ui/icons/mono';

export interface TimelineEvent {
  date: string;
  label: string;
  daysBefore: number;
}

export interface DocTimelineProps {
  title: string;
  currentMonth: Date;
  deadlineDays: number;
  events: TimelineEvent[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const DocTimeline = ({
  title,
  currentMonth,
  deadlineDays,
  events,
  onPrevMonth,
  onNextMonth,
}: DocTimelineProps) => {
  const monthLabel = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`;

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <Flex gap="0.8rem" align="center">
          <Text variant="md1_text_semibold" color="grayscale90">
            {title}
          </Text>
          <Tag color="#FF2A3A">마감 D-{deadlineDays}</Tag>
        </Flex>

        <Flex align="center" justify="spaceBetween" width="100%">
          <Text variant="md2_text_semibold" color="grayscale60">
            {monthLabel}
          </Text>
          <Flex align="center" gap="1.6rem">
            <button onClick={onPrevMonth} className={styles.arrow}>
              <IcArrowLeft width={24} height={24} />
            </button>
            <button onClick={onNextMonth} className={styles.arrow}>
              <IcArrowRight width={24} height={24} />
            </button>
          </Flex>
        </Flex>

        <Divider length="100%" borderColor="grayscale10" />
      </header>

      <ul className={styles.events}>
        {events.map((e) => (
          <li key={e.date} className={styles.event}>
            <span className={styles.dot} />
            <Flex direction="column" gap="0.8rem" width="100%">
              <Flex gap="0.8rem" align="center" width="100%">
                <Text variant="sm_caption_medium" color="grayscale90">
                  {new Date(e.date).getMonth() + 1}월{' '}
                  {new Date(e.date).getDate()}일
                </Text>
                <Text
                  variant="sm_caption_medium"
                  color={e.daysBefore > 3 ? 'grayscale60' : 'error'}
                >
                  D-{e.daysBefore}
                </Text>
              </Flex>
              <div className={styles.label}>{e.label}</div>
            </Flex>
          </li>
        ))}
      </ul>
    </section>
  );
};
