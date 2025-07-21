import clsx from 'clsx';
import { IcHeaderProfile } from '../../icons/src/colored';
import * as styles from './Profile.css';

interface ProfileProps {
  src?: string | null;
  alt: string;
  size?: number | string;
  bordered?: boolean;
}

export const Profile = ({
  src,
  alt,
  size = 24,
  bordered = false,
}: ProfileProps) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={clsx(styles.profileWrapper, {
        [styles.profileItem]: bordered,
      })}
      style={{ width: dimension, height: dimension }}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.profileImage} />
      ) : (
        <div className={styles.emptyProfile} />
      )}
    </div>
  );
};
