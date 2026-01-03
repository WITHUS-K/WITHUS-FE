'use client';
import React from 'react';
import * as styles from './UserAnnouncementProgress.css';
import { Text } from '@repo/ui/Text';
import { Tag } from '@repo/ui/Tag';

export interface AnnouncementEvent {
  label: string;
  daysBefore: number;
}

export interface UserAnnouncementProgressProps {
  title: string;
  events: AnnouncementEvent[];
}

export const UserAnnouncementProgress: React.FC<
  UserAnnouncementProgressProps
> = ({ title, events }) => {
  const count = events.length;

  const lastCompletedIndex = events.reduce<number>(
    (max, e, i) => (e.daysBefore <= 0 ? i : max),
    -1
  );

  const ratioActive =
    lastCompletedIndex >= 0 && count > 1 ? lastCompletedIndex / (count - 1) : 0;

  const getBadgeColor = (days: number) => {
    if (days <= 0) return '#2C60FF';
    if (days <= 3) return '#FF2A3A';
    return '#7F82A1';
  };

  const getBadgeText = (days: number) => {
    if (days < 0) return '완료';
    if (days === 0) return 'D-Day';
    return `D-${days}`;
  };

  const START_OFFSET = 178;
  const END_OFFSET = 178;
  const fillWidthCalc = `
    calc(
      ${START_OFFSET}px 
      + (100% - ${START_OFFSET + END_OFFSET}px) * ${ratioActive}
    )
  `;

  return (
    <section className={styles.root}>
      <Text variant="md1_text_semibold" color="grayscale90">
        {title}
      </Text>

      <div className={styles.timeline}>
        <div className={styles.track} />
        <div className={styles.fill} style={{ width: fillWidthCalc.trim() }} />

        {events.map((e, i) => {
          const ratio = count > 1 ? i / (count - 1) : 0;
          const leftCalc = `
            calc(
              ${START_OFFSET}px 
              + (100% - ${START_OFFSET + END_OFFSET}px) * ${ratio}
            )
          `;

          const isActive = i <= lastCompletedIndex;

          const badgeText = getBadgeText(e.daysBefore);
          const badgeColor = getBadgeColor(e.daysBefore);

          return (
            <React.Fragment key={i}>
              <div
                className={styles.marker}
                style={{ left: leftCalc.trim() }}
                data-active={isActive}
              />
              <div
                className={styles.labelItem}
                style={{ left: leftCalc.trim() }}
              >
                <Tag color={badgeColor}>{badgeText}</Tag>
                <Text variant="sm_caption_medium" color="grayscale90">
                  {e.label}
                </Text>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
