import * as styles from './AvatarChip.css';
import { Text } from '../../Text';
import { mapServerColorToTagHex } from '@repo/utils';

export type AvatarChipProps = {
  label: string;
  /** 색상 팔레트 인덱스 (0~9) */
  index?: number;
  zIndex?: number;
  serverColor?: string;
};

export const AvatarChip = ({
  label,
  index = 0,
  serverColor,
  zIndex = 0,
}: AvatarChipProps) => {
  //const idx = Math.min(Math.max(0, index), styles.colorList.length - 1);
  const bg = mapServerColorToTagHex(serverColor!);
  return (
    <div className={styles.circleWrapper} style={{ zIndex }}>
      <div className={styles.circle} style={{ backgroundColor: bg }}>
        <Text variant="sm_caption_medium" color="white">
          {label.charAt(1)}
        </Text>
      </div>
    </div>
  );
};
