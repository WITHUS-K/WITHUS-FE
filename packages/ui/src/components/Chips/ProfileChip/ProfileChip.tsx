import { Profile } from '../../Profile/Profile';
import Text from '../../Text/Text';
import { IcDelete } from '../../../icons/src/colored';
import * as styles from './ProfileChip.css';

interface ProfileChipProps {
  src: string;
  alt: string;
  name: string;
  onDelete: () => void;
}

export const ProfileChip = ({ src, alt, name, onDelete }: ProfileChipProps) => {
  return (
    <div className={styles.profileChipWrapper}>
      <Profile src={src} alt={alt} />
      <Text variant="sm_caption_medium" color="grayscale90">
        {name}
      </Text>
      <button
        className={styles.buttonStyle}
        onClick={onDelete}
        aria-label={`delete-${name}`}
      >
        <IcDelete width={16} height={16} />
      </button>
    </div>
  );
};
