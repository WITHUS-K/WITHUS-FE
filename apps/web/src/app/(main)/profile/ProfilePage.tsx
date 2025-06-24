'use client';
import { useState } from 'react';
import { Button, Divider } from '@repo/ui';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import * as styles from './page.css';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { IcSave } from '@repo/ui/icons/mono';
import AvatarSection from './_components/AvatarSection/AvatarSection';
import InfoSection from './_components/InfoSection/InfoSection';
import PasswordSection from './_components/PasswordSection/PasswordSection';

interface ProfilePageProps {
  role: 'ADMIN' | 'USER';
}

export default function ProfilePage({ role }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // TODO: api 연동
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <Flex width="100%" direction="column" align="flexStart" gap="1.8rem">
        <Breadcrumb>
          <Breadcrumb.Item active>
            {role === 'ADMIN' ? '관리자 정보' : '사용자 정보'}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Flex width="100%" justify="spaceBetween" align="center">
          <Text variant="xl_title_semibold" color="black">
            {role === 'ADMIN' ? '관리자 정보' : '사용자 정보'}
          </Text>
          <Button
            onClick={handleSave}
            variant="main"
            size="40"
            leftIcon={<IcSave />}
            width="13.2rem"
          >
            수정 완료
          </Button>
        </Flex>
      </Flex>

      <Flex width="100%" marginTop="4rem" gap="4rem">
        <AvatarSection role={role} isEditing={isEditing} />
        <Flex direction="column" width="100%" gap="3.2rem">
          <InfoSection role={role} isEditing={isEditing} />
          <Divider borderColor="grayscale10" length="100%" />
          <PasswordSection />
        </Flex>
      </Flex>
    </div>
  );
}
