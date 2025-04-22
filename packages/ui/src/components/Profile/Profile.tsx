import * as styles from './Profile.css';

interface ProfileProps {
  src: string;
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
      <img src={src} alt={alt} className={styles.profileImage} />
    </div>
  );
};
