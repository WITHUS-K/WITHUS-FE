import React from 'react';
import * as styles from './AnnouncedCard.css';
import { IcHomeApplicant } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { IcArrowRight } from '@repo/ui/icons/mono';
import { Flex } from '@repo/ui/Flex';
import { Divider } from '@repo/ui/Divider';
import { Tag } from '@repo/ui/Tag';
import { allTagColors, TagColor } from '@repo/utils';
export interface PartCount {
  name: string;
  color: string;
  count: number;
}

export interface AnnounceCardProps {
  title: string;
  totalCount: number;
  parts: PartCount[];
  onViewDetail?: () => void;
}

function getRandomTagColor(idx: number): TagColor {
  return allTagColors[idx]!;
}

export const AnnounceCard = ({
  title,
  totalCount,
  parts,
  onViewDetail,
}: AnnounceCardProps) => (
  <section className={styles.root}>
    <header className={styles.header}>
      <Text variant="md1_text_semibold" color="grayscale90">
        {title}
      </Text>
      {onViewDetail && (
        <button className={styles.link} onClick={onViewDetail}>
          <Text variant="md2_text_medium" color="grayscale70">
            지원 현황 바로가기
          </Text>
          <IcArrowRight width={24} height={24} />
        </button>
      )}
    </header>
    <div className={styles.content}>
      <Flex gap="2rem" align="center">
        <IcHomeApplicant width={80} height={80} />
        <Flex direction="column" gap="0" align="center">
          <Text variant="xs_caption_medium" color="grayscale60">
            전체 지원자수
          </Text>
          <Text variant="xl_title_bold" color="primary50">
            {totalCount}명
          </Text>
        </Flex>
      </Flex>

      <Divider direction="column" borderColor="grayscale10" length="8rem" />

      <div className={styles.partsContainer}>
        {parts.map((p, idx) => {
          const tagColor = getRandomTagColor(idx);
          return (
            <div key={p.name} className={styles.partCard}>
              <Text variant="xs_caption_medium" color="grayscale60">
                파트{idx + 1}
              </Text>
              <Flex gap="0.8rem" align="center">
                <Tag color={tagColor}>{p.name}</Tag>
                <Text variant="lg_subtitle_bold" color="grayscale90">
                  {p.count}명
                </Text>
              </Flex>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
