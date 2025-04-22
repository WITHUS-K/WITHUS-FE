import { ListLayout } from '../ListLayout';
import { ScoreChip, ScoreInfo } from '../../Chips/ScoreChip/ScoreChip';
import * as styles from './AccordianList.css';
import { IcArrowDropdown } from '../../../icons/src/colored';
import { Flex } from '../../Flex';
import { Divider } from '../../Divider/Divider';

export interface Reviewer {
  name: string;
  avatar: string;
  score: number;
}

export interface AccordianItemType {
  title: string;
  content: string;
  reviewers: Reviewer[];
}

interface AccordianListProps {
  item: AccordianItemType;
  index: number;
  isOpen: boolean;
  onToggle: (idx: number) => void;
  width?: string;
}

export const AccordianList = ({
  item,
  index,
  isOpen,
  onToggle,
  width = '1101px',
}: AccordianListProps) => {
  const scoreItems: ScoreInfo[] = item.reviewers.map((r) => ({
    src: r.avatar,
    alt: r.name,
    name: r.name,
    score: r.score,
  }));

  return (
    <div className={styles.accordionItem}>
      <ListLayout width={width} direction={isOpen ? 'column' : 'row'}>
        <Flex
          direction="row"
          justify="spaceBetween"
          grow="grow1"
          align="center"
        >
          <button
            className={styles.headerButton}
            onClick={() => onToggle(index)}
            aria-expanded={isOpen}
          >
            <span className={styles.title}>
              {index + 1}. {item.title}
            </span>
          </button>

          <div className={styles.listRightSection}>
            <ScoreChip items={scoreItems} />
            <button
              className={styles.toggleButton}
              onClick={() => onToggle(index)}
              aria-label={isOpen ? '접기' : '펼치기'}
            >
              <IcArrowDropdown
                width={24}
                height={24}
                className={styles.arrowStyle[isOpen ? 'open' : 'closed']}
              />
            </button>
          </div>
        </Flex>

        {isOpen && (
          <>
            <Divider direction="row" length="100%" borderColor="grayscale10" />
            <div className={styles.contentWrapper}>{item.content}</div>
          </>
        )}
      </ListLayout>
    </div>
  );
};
