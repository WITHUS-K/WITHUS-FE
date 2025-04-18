'use client';

import { IcPasswordComplete } from '@repo/ui/icons/colored';
import { useRouter, useSearchParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import { buttonStyle } from '../../join/_components/Step1/Step1.css';

export default function CompletePage() {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get('name') ?? ''; // 쿼리에서 이름 읽기

  return (
    <Flex direction="column" align="center" width="43.4rem" paddingTop="8.8rem">
      <IcPasswordComplete
        width={84}
        height={84}
        style={{ marginBottom: '1.6rem' }}
      />
      <Text variant="xl_title_semibold" color="grayscale80">
        {name && `${decodeURIComponent(name)}님`}의 비밀번호 변경이
        완료되었습니다.
      </Text>
      <Text variant="xl_title_semibold" color="grayscale80">
        위더스에 다시 로그인 해주세요.
      </Text>
      <Button
        variant="main"
        size="64"
        width="43.4rem"
        className={buttonStyle}
        onClick={() => router.push('/login')}
      >
        다시 로그인하기
      </Button>
    </Flex>
  );
}
