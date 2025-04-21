import * as styles from './Profile.css';

interface ProfileProps {
  src: string;
  alt: string;
}

export const Profile = ({ src, alt }: ProfileProps) => (
  <div className={styles.profileWrapper}>
    <img
      src={src}
      alt={alt}
      width={24}
      height={24}
      className={styles.profileImage}
    />
  </div>
);
