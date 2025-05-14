import * as styles from './AvatarChip.css';
import { Text } from '../../Text';

export type AvatarChipProps = {
  label: string;
  /** 색상 팔레트 인덱스 (0~9) */
  index?: number;
  zIndex?: number;
};

export const AvatarChip = ({
  label,
  index = 0,
  zIndex = 0,
}: AvatarChipProps) => {
  const idx = Math.min(Math.max(0, index), styles.colorList.length - 1);

  return (
    <div className={styles.circleWrapper} style={{ zIndex }}>
      <div className={`${styles.circle} ${styles.bg[idx.toString()]}`}>
        <Text variant="sm_caption_medium" color="white">
          {label.charAt(0)}
        </Text>
      </div>
    </div>
  );
};
