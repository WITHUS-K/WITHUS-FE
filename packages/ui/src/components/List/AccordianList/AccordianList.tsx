import { ListLayout } from '../ListLayout';
import { ScoreChip, ScoreInfo } from '../../Chips/ScoreChip/ScoreChip';
import * as styles from './AccordianList.css';
import { IcArrowDropdown } from '../../../icons/src/colored';
import { Flex } from '../../Flex';
import { Divider } from '../../Divider/Divider';
import { Text } from '../../Text';

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
  item: AccordianItemType;
  index: number;
  isNumbering?: boolean;
  isOpen: boolean;
  onToggle: (idx: number) => void;
  width?: string;
}

export const AccordianList = ({
  item,
  index,
  isOpen,
  isNumbering = true,
  onToggle,
  width = '100%',
}: AccordianListProps) => {
  const scoreItems: ScoreInfo[] = (item.reviewers ?? []).map((r) => ({
    src: r.avatar,
    alt: r.name,
    name: r.name,
    score: r.score,
  }));

  return (
    <ListLayout width={width} direction={isOpen ? 'column' : 'row'}>
      <Flex direction="row" justify="spaceBetween" grow="grow1" align="center">
        <button
          className={styles.headerButton}
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
        >
          <Text variant="md2_text_regular" color="grayscale90">
            {isNumbering && `${index + 1}. `}
            {item.title}
          </Text>
        </button>

        <div className={styles.listRightSection}>
          {scoreItems.length > 0 && <ScoreChip items={scoreItems} />}
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
  );
};
