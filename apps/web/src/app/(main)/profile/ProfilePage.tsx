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
import { useGetMyPageQuery } from '@web/store/query/useGetMyPageQuery';
import { useUpdateUserMutation } from '@web/store/mutation/useUpdateUserMutation';
import { FormProvider, useForm } from 'react-hook-form';

interface ProfilePageProps {
  role: 'ADMIN' | 'USER';
}

export interface ProfileFormValues {
  name: string;
  phoneNumber: string;
  currentPassword?: string;
  newPassword1?: string;
  newPassword2?: string;
  profileImageFile?: File;
}

export default function ProfilePage({ role }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user } = useGetMyPageQuery();
  const updateMut = useUpdateUserMutation();

  const methods = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      phoneNumber: user.phoneNumber,
      currentPassword: '',
      newPassword1: '',
      newPassword2: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleSave = (values: ProfileFormValues) => {
    const data = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      currentPassword: values.currentPassword ?? '',
      newPassword1: values.newPassword1 ?? '',
      newPassword2: values.newPassword2 ?? '',
    };

    const profileImageFile = values.profileImageFile;

    updateMut.mutate(
      {
        data,
        profileImageFile,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
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
            onClick={handleSubmit(handleSave)}
            disabled={!isValid}
            variant="main"
            size="40"
            leftIcon={<IcSave />}
            width="13.2rem"
          >
            수정 완료
          </Button>
        </Flex>
      </Flex>

      <FormProvider {...methods}>
        <Flex width="100%" marginTop="4rem" gap="4rem">
          <AvatarSection
            role={role}
            isEditing={isEditing}
            imageUrl={user.imageUrl}
            organizations={user.organizations}
          />
          <Flex direction="column" width="100%" gap="3.2rem">
            <InfoSection role={role} user={user} />
            <Divider borderColor="grayscale10" length="100%" />
            <PasswordSection />
          </Flex>
        </Flex>
      </FormProvider>
    </div>
  );
}
