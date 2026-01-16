'use client';

import { Flex } from "@repo/ui/Flex";
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger, AccordianListLayout } from "@repo/ui/List";
import { ReactNode } from "react";
import { Divider, Text } from "@repo/ui";
import { IcArrowDropdown } from "@repo/ui/icons/colored";
import * as styles from './DetailScoreItem.css';

export interface DetailScoreItemType {
  content: ReactNode;
  score: number;
}

interface DetailScoreItemProps {
  items: DetailScoreItemType [];
  width?: string;
}

export const DetailScoreItem = ({
  items,
  width = '100%',
}: DetailScoreItemProps) => (
  <AccordionRoot multiple={false}>
    {items.map((item, idx) => {

      return (
        <AccordionItem key={idx} value={idx.toString()}>
          <AccordianListLayout
            width={width}
            direction="column"
          >
            <Flex
              direction="row"
              justify="spaceBetween"
              grow="grow1"
              align="center"
            >
              <AccordionTrigger className={styles.headerButton}>
                <Text variant="md2_text_regular" color="grayscale90">
                  { `${idx + 1}. `}

                </Text>

                <Flex align="center" gap="2rem">
                <span>
                    점수 넣기!
                    
                </span>

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
                styles.contentWrapper
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
