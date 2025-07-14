'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcSubmit } from '@repo/ui/icons/colored';
import { Button } from '@repo/ui/Button';
import { Divider } from '@repo/ui';
import { useParams, useSearchParams } from 'next/navigation';

export default function SubmittedPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const rawOrganization =
    typeof params.organization === 'string' ? params.organization : '';
  const organization = decodeURIComponent(rawOrganization);
  const title = searchParams.get('title');

  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      align="center"
      justify="center"
      gap="8rem"
    >
      <Flex direction="column" align="flexStart">
        <Text variant="xl_title_bold" color="grayscale90">
          [{organization}]
        </Text>
        <Text variant="xl_title_bold" color="grayscale90">
          {title}
        </Text>
        <div style={{ marginTop: '2.8rem' }}>
          <Divider direction="row" length="43.4rem" borderColor="grayscale10" />
        </div>
      </Flex>

      <Flex direction="column" align="center" justify="center" gap="3.2rem">
        <IcSubmit width={136.8} height={148} />
        <Text variant="xl_title_semibold" color="grayscale80">
          지원서 접수가 완료되었습니다.
        </Text>
      </Flex>

      <Button variant="main" width="43.4rem">
        확인
      </Button>
    </Flex>
  );
}
