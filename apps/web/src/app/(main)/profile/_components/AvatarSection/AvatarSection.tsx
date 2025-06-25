'use client';
import { useRef, useState } from 'react';
import { IcProfileBasic, IcProfileEdit } from '@repo/ui/icons/colored';
import * as styles from './AvatarSection.css';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { useFormContext } from 'react-hook-form';
import { ProfileFormValues } from '../../ProfilePage';
interface AvatarSectionProps {
  role: 'ADMIN' | 'USER';
  isEditing: boolean;
  imageUrl: string;
  organizations: { id: number; name: string }[];
}

export default function AvatarSection({
  role,
  isEditing,
  imageUrl,
  organizations,
}: AvatarSectionProps) {
  const { setValue } = useFormContext<ProfileFormValues>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setValue('profileImageFile', file);
  };

  const src = preview ?? imageUrl;

  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}>
        {src ? (
          <img src={src} alt="avatar" className={styles.profileImage} />
        ) : (
          <div className={styles.emptyProfile}>
            <IcProfileBasic width={36} height={36} />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className={styles.hiddenInput}
          onChange={handleFile}
        />
        <button
          type="button"
          className={styles.editButton}
          onClick={handleClick}
        >
          <IcProfileEdit width={24} height={24} />
        </button>
      </div>

      <Flex direction="column" gap="0.5rem" marginTop="2.4rem" align="center">
        {role === 'ADMIN' && (
          <Text variant="lg_subtitle_semibold" color="grayscale90">
            {organizations[0]?.name}
          </Text>
        )}
        <Text variant="md1_text_regular" color="grayscale70">
          withus@email.com
        </Text>
      </Flex>
    </div>
  );
}
