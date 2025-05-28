import React, { useState } from 'react';
import * as styles from './OverallProgress.css';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Tag } from '@repo/ui/Tag';
import { allTagColors, TagColor } from '@repo/utils';
import {
  IcHomeDocsColored,
  IcHomeInterviewColored,
} from '@repo/ui/icons/colored';

export interface Task {
  id: string;
  type: '서류' | '면접';
  title: string;
  daysBefore: number;
  total: number;
  completed: number;
  partLabel: string;
}

export interface OverallProgressProps {
  tasks: Task[];
}

export const OverallProgress = ({ tasks }: OverallProgressProps) => {
  const [tab, setTab] = useState<'서류' | '면접'>('서류');
  const filtered = tasks.filter((t) => t.type === tab);

  function getRandomTagColor(idx: number): TagColor {
    return allTagColors[idx];
  }

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <Text variant="md1_text_semibold" color="grayscale90">
          전체 업무 진행 상황
        </Text>
        <Flex gap="1.2rem" align="center">
          {(['서류', '면접'] as const).map((t) => (
            <Button
              variant="sub"
              isPressed={tab === t}
              size="32"
              key={t}
              width="4.9rem"
              onClick={() => setTab(t)}
            >
              {t}
            </Button>
          ))}
        </Flex>
      </header>

      <div className={styles.list}>
        {filtered.map((t, idx) => {
          const tagColor = getRandomTagColor(idx);
          const pct = Math.round((t.completed / t.total) * 100);
          const Icon =
            t.type === '면접' ? IcHomeInterviewColored : IcHomeDocsColored;
          return (
            <div key={t.id} className={styles.card}>
              <Flex gap="1.2rem" align="center">
                <div className={styles.icon}>
                  <Icon width={24} height={24} />
                </div>
                <div className={styles.meta}>
                  <Flex direction="column" gap="0" align="flexStart">
                    <Flex gap="0.5rem" align="center">
                      <Text variant="sm_caption_semibold" color="error">
                        D-{t.daysBefore}
                      </Text>
                      <Text variant="sm_caption_semibold" color="grayscale70">
                        {t.title}
                      </Text>
                    </Flex>
                    <Text variant="xs_caption_regular" color="grayscale70">
                      평가해야 될 서류: {t.total - t.completed}개
                    </Text>
                  </Flex>
                  <Tag isDotBaseStyle withCircle color={tagColor}>
                    {t.partLabel}
                  </Tag>
                </div>
              </Flex>

              <div className={styles.progressContainer}>
                <div className={styles.progressInfo}>
                  <Flex gap="0.4rem" align="center">
                    <Text variant="xs_caption_medium" color="grayscale70">
                      진행률
                    </Text>
                    <Text variant="xs_caption_medium" color="primary50">
                      {pct}%
                    </Text>
                  </Flex>
                  <Text variant="xs_caption_medium" color="grayscale70">
                    {t.completed}/{t.total}개
                  </Text>
                </div>
                <div className={styles.barBackground}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
