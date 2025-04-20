import { Chip } from '@/components/Chips/Chip/Chip';
import { Profile } from '@/components/Profile/Profile';
import Text from '@/components/Text/Text';
import { ListLayout } from './ListLayout';
import * as styles from './List.css';

interface ListProps {
  question: string;
  src: string;
  alt: string;
  name: string;
  width?: string;
}

export const List = ({ question, src, alt, name, width }: ListProps) => (
  <ListLayout width={width}>
    <Text variant="md2_text_regular" color="grayscale90">
      {question}
    </Text>

    <div className={styles.listRightSection}>
      <Chip bg="grayscale5" color="grayscale70">
        작성자
      </Chip>
      <Profile src={src} alt={alt} />
      <Text variant="sm_caption_medium" color="grayscale90">
        {name}
      </Text>
    </div>
  </ListLayout>
);
