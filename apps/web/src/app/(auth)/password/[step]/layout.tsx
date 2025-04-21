import { ReactNode } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { dividerStyle } from '../../join/_components/JoinHeader/JoinHeader.css';

const titleMap: Record<string, string> = {
  find: '비밀번호 찾기',
  verify: '비밀번호 찾기',
  reset: '비밀번호 재설정',
  complete: '비밀번호 변경 완료',
};

export default async function StepLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const title = titleMap[step] ?? titleMap.find;

  return (
    <Flex direction="column" width="43.4rem" paddingTop="8.4rem">
      <Flex direction="column" width="100%" gap="2.8rem">
        <Text variant="xl_title_bold" color="grayscale90">
          {title}
        </Text>
        <div className={dividerStyle} />
      </Flex>
      <div style={{ marginTop: '2.8rem' }}>{children}</div>
    </Flex>
  );
}
