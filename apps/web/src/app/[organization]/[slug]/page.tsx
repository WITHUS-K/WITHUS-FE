import * as styles from './page.css';
import { Text } from '@repo/ui/Text';

interface Props {
  params: { organization: string; slug: string };
}

export default function RespondPage({ params: { organization, slug } }: Props) {
  // 일단 파일 구조만 잡아놓음.. api 수정 및 디자인 나오면 적용하기
  return (
    <div className={styles.wrapper}>
      <Text>{decodeURIComponent(organization)}</Text>
      <Text>{slug}</Text>
    </div>
  );
}
