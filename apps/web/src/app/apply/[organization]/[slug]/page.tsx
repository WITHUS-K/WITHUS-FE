import * as styles from './page.css';
import { Text } from '@repo/ui/Text';

type RespondPageProps = {
  params: Promise<{
    organization: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RespondPage({
  params,
  searchParams,
}: RespondPageProps) {
  const { organization, slug } = await params;
  const actualSearchParams = await searchParams;

  return (
    <div className={styles.wrapper}>
      <Text>{decodeURIComponent(organization)}</Text>
      <Text>{slug}</Text>
    </div>
  );
}
