import React, { useState } from 'react';
import * as styles from './DocTimeline.css';
import { Text } from '@repo/ui/Text';
import { Tag } from '@repo/ui/Tag';
import { Divider, Flex } from '@repo/ui';
import { IcArrowLeft, IcArrowRight } from '@repo/ui/icons/mono';
import { RecruitmentSummaryItem } from '@web/store/query/useCurrentRecruitmentSummaryQuery';

export interface DocTimelineProps {
  data: RecruitmentSummaryItem;
}

export const DocTimeline = ({ data }: DocTimelineProps) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const monthLabel = `${currentMonthDate.getFullYear()}년 ${currentMonthDate.getMonth() + 1}월`;

  const handlePrevMonth = () => {
    setCurrentMonthDate(
      new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(
      new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1)
    );
  };

  const events = data.dDays.map((d) => ({
    date: new Date(d.date.replaceAll('/', '-')),
    label: d.label,
    daysBefore: d.daysRemaining,
  }));

  const upcoming = events
    .filter((e) => e.daysBefore >= 0)
    .sort((a, b) => a.daysBefore - b.daysBefore)[0];
  const deadlineDays = upcoming ? upcoming.daysBefore : 0;

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <Flex gap="0.8rem" align="center">
          <Text variant="md1_text_semibold" color="grayscale90">
            채용 일정
          </Text>
          <Tag color="#FF2A3A">마감 D-{deadlineDays}</Tag>
        </Flex>

        <Flex align="center" justify="spaceBetween" width="100%">
          <Text variant="md2_text_semibold" color="grayscale60">
            {monthLabel}
          </Text>
          <Flex align="center" gap="1.6rem">
            <button onClick={handlePrevMonth} className={styles.arrow}>
              <IcArrowLeft width={24} height={24} />
            </button>
            <button onClick={handleNextMonth} className={styles.arrow}>
              <IcArrowRight width={24} height={24} />
            </button>
          </Flex>
        </Flex>

        <Divider length="100%" borderColor="grayscale10" />
      </header>

      <ul className={styles.events}>
        {events.map((e) => {
          const dateStr = `${e.date.getMonth() + 1}월 ${e.date.getDate()}일`;
          return (
            <li key={e.label + dateStr} className={styles.event}>
              <span className={styles.dot} />
              <Flex direction="column" gap="0.8rem" width="100%">
                <Flex gap="0.8rem" align="center" width="100%">
                  <Text variant="sm_caption_medium" color="grayscale90">
                    {dateStr}
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
          );
        })}
      </ul>
    </section>
  );
};
