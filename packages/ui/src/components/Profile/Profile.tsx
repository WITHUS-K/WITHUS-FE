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
        // src가 없을 때는 <img>를 렌더링하지 않고 빈 div만 두거나
        // 기본 아이콘/플레이스홀더를 넣으세요
        <div className={styles.emptyProfile} />
      )}
    </div>
  );
};
