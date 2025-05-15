import * as styles from './Profile.css';

interface ProfileProps {
  src?: string | null;
  alt: string;
  size?: number | string;
}

export const Profile = ({ src, alt, size = 24 }: ProfileProps) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={styles.profileWrapper}
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
