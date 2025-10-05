'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcSubmit } from '@repo/ui/icons/colored';
import { Divider } from '@repo/ui';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { fromShareSegment, safeDecodeURIComponent } from '@web/utils/url';
export default function SubmittedPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const rawOrganization =
    typeof params.organization === 'string' ? params.organization : '';
  const decodedOrg = safeDecodeURIComponent(rawOrganization);

  const organizationName = fromShareSegment(decodedOrg);
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
          [{organizationName}]
        </Text>
        <Text variant="xl_title_bold" color="grayscale90">
          {title}
        </Text>
        <div style={{ marginTop: '2.8rem' }}>
          <Divider direction="row" length="43.4rem" borderColor="grayscale10" />
        </div>
      </Flex>

      <Flex direction="column" align="center" justify="center" gap="3.2rem">
        <Image
          src="/images/apply.png"
          alt="submit"
          width={136.8}
          height={148}
          quality={100}
        />
        <Text variant="xl_title_semibold" color="grayscale80">
          지원서 접수가 완료되었습니다.
        </Text>
      </Flex>
    </Flex>
  );
}
