import { AvatarChip } from '../AvatarChip/AvatarChip';
import * as styles from './AvatarStack.css';

type AvatarStackProps = { items: string[] };
const MAX_DISPLAY = 9;

export const AvatarStack = ({ items }: AvatarStackProps) => {
  const visibleCount = Math.min(items.length, MAX_DISPLAY);
  const extraCount = items.length - MAX_DISPLAY;

  const showItems = items.slice(0, visibleCount);

  return (
    <div className={styles.container}>
      {showItems.map((name, i) => (
        <AvatarChip key={i} label={name} index={i} zIndex={visibleCount - i} />
      ))}

      {items.length > MAX_DISPLAY && (
        <AvatarChip label={`+${extraCount}`} index={MAX_DISPLAY} zIndex={0} />
      )}
    </div>
  );
};
