'use client';

import { Divider } from '@repo/ui';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcExpiredDateLg, IcExpiredDateSm } from '@repo/ui/icons/colored';
import { useRecruitmentBySlugQuery } from '@web/store/query/useRecruitmentBySlugQuery';
import { useParams } from 'next/navigation';

export default function EndPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useRecruitmentBySlugQuery({ slug });

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile)
    return (
      <Flex
        direction="column"
        height="100%"
        width="100%"
        align="center"
        justify="center"
      >
        <Flex direction="column" align="center" justify="center" gap="2.4rem">
          <IcExpiredDateSm width={43.755} height={47.999} />
          <Text variant="lg_subtitle_bold" color="grayscale80">
            지원 기간이 아닙니다.
          </Text>
        </Flex>
      </Flex>
    );
  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      align="center"
      justify="center"
      gap="8.4rem"
    >
      <Flex direction="column" align="center" justify="center" gap="2.8rem">
        <Text variant="xl_title_semibold">
          [{data.organizationName}]<br />
          {data.title}
        </Text>
        <Divider length="43.4rem" borderColor="grayscale10" />
      </Flex>
      <Flex direction="column" align="center" justify="center" gap="3.2rem">
        <IcExpiredDateLg width={134} height={147} />
        <Text variant="lg_subtitle_medium" color="grayscale80">
          지원 기간이 아닙니다.
        </Text>
      </Flex>
    </Flex>
  );
}
