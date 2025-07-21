'use client';
import { ListLayout } from '../ListLayout';
import { ScoreChip, ScoreInfo } from '../../Chips/ScoreChip/ScoreChip';
import * as styles from './AccordianList.css';
import { IcArrowDropdown } from '../../../icons/src/colored';
import { Flex } from '../../Flex';
import { Divider } from '../../Divider/Divider';
import { Text } from '../../Text';
import { AccordionRoot } from '../Accordion/AccordionRoot';
import { AccordionItem } from '../Accordion/AccordionItem';
import { AccordionTrigger } from '../Accordion/AccordionTrigger';
import { AccordionContent } from '../Accordion/AccordionContent';
import { ReactNode } from 'react';
import { AccordianListLayout } from './AccordianListLayout';

export interface Reviewer {
  name: string;
  avatar: string;
  score: number;
}

export interface AccordianItemType {
  title: string;
  content: ReactNode;
  reviewers?: Reviewer[];
}

interface AccordianListProps {
  items: AccordianItemType[];
  isNumbering?: boolean;
  width?: string;
  readOnly?: boolean;
}

export const AccordianList = ({
  items,
  isNumbering = true,
  width = '100%',
  readOnly = false,
}: AccordianListProps) => (
  <AccordionRoot multiple={false}>
    {items.map((item, idx) => {
      const scoreItems: ScoreInfo[] = (item.reviewers ?? []).map((r) => ({
        src: r.avatar,
        alt: r.name,
        name: r.name,
        score: r.score,
      }));

      return (
        <AccordionItem key={idx} value={idx.toString()}>
          <AccordianListLayout
            width={width}
            direction="column"
            readOnly={readOnly}
          >
            <Flex
              direction="row"
              justify="spaceBetween"
              grow="grow1"
              align="center"
            >
              <AccordionTrigger className={styles.headerButton}>
                <Text variant="md2_text_regular" color="grayscale90">
                  {isNumbering && `${idx + 1}. `}
                  {item.title}
                </Text>

                <Flex align="center" gap="2rem">
                  {scoreItems.length > 0 && <ScoreChip items={scoreItems} />}

                  <IcArrowDropdown
                    width={24}
                    height={24}
                    className={styles.arrowIcon}
                  />
                </Flex>
              </AccordionTrigger>
            </Flex>

            <AccordionContent
              className={
                readOnly ? styles.readOnlyContentWrapper : styles.contentWrapper
              }
            >
              <Divider
                direction="row"
                length="100%"
                borderColor="grayscale10"
              />
              {item.content}
            </AccordionContent>
          </AccordianListLayout>
        </AccordionItem>
      );
    })}
  </AccordionRoot>
);
