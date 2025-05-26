import { AvatarChip } from '../AvatarChip/AvatarChip';
import * as styles from './AvatarStack.css';

// items를 이름과 서버 컬러 정보가 있는 객체 배열로 받습니다.
type AvatarItem = { name: string; serverColor: string };
export type AvatarStackProps = { items: AvatarItem[] };
const MAX_DISPLAY = 9;

export function AvatarStack({ items }: AvatarStackProps) {
  const visibleCount = Math.min(items.length, MAX_DISPLAY);
  const extraCount = items.length - MAX_DISPLAY;

  // 표시할 첫 MAX_DISPLAY개의 아이템
  const showItems = items.slice(0, visibleCount);

  return (
    <div className={styles.container}>
      {showItems.map((item, i) => (
        <AvatarChip
          key={item.name + i}
          label={item.name}
          serverColor={item.serverColor}
          zIndex={visibleCount - i}
        />
      ))}

      {items.length > MAX_DISPLAY && (
        <AvatarChip
          label={`+${extraCount}`}
          serverColor="gray" // 추가 카운트에 기본 색 지정
          zIndex={0}
        />
      )}
    </div>
  );
}
