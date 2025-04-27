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

export interface Reviewer {
  name: string;
  avatar: string;
  score: number;
}

export interface AccordianItemType {
  title: string;
  content: string;
  reviewers?: Reviewer[];
}

interface AccordianListProps {
  items: AccordianItemType[];
  isNumbering?: boolean;
  width?: string;
}

export const AccordianList = ({
  items,
  isNumbering = true,
  width = '100%',
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
          <ListLayout width={width} direction="column">
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
                <IcArrowDropdown
                  width={24}
                  height={24}
                  className={styles.arrowIcon}
                />
              </AccordionTrigger>

              {scoreItems.length > 0 && <ScoreChip items={scoreItems} />}
            </Flex>

            <AccordionContent className={styles.contentWrapper}>
              <Divider
                direction="row"
                length="100%"
                borderColor="grayscale10"
              />
              <div>{item.content}</div>
            </AccordionContent>
          </ListLayout>
        </AccordionItem>
      );
    })}
  </AccordionRoot>
);
