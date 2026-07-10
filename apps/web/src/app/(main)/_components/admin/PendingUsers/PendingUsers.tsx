import React from 'react';
import * as styles from './PendingUsers.css';
import { Profile } from '@repo/ui/Profile';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcAlaram } from '@repo/ui/icons/mono';
import { vars } from '@repo/theme';
import { Divider } from '@repo/ui';
import { PendingEvaluatorsResult } from '@web/store/query/usePendingEvaluatorsQuery';

export interface PendingUsersProps {
  data: PendingEvaluatorsResult;
  onRemind: () => void;
  isReminding?: boolean;
}

export const PendingUsers = ({ data, onRemind, isReminding }: PendingUsersProps) => {
  const deadline = new Date(data.deadline);

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <Text variant="md1_text_semibold" color="grayscale90">
          평가 미완료 사용자 명단
        </Text>
        <Button
          variant="sub"
          size="32"
          width="12.5rem"
          leftIcon={
            <IcAlaram
              width={18}
              height={19}
              style={{ color: vars.colors.primary50 }}
            />
          }
          onClick={onRemind}
          isLoading={isReminding}
          disabled={isReminding}
        >
          리마인드 알림
        </Button>
      </header>

      <div className={styles.subheader}>
        <Text variant="xs_caption_medium" color="grayscale50">
          평가 마감 : {deadline.getFullYear()}.
          {(deadline.getMonth() + 1).toString().padStart(2, '0')}.
          {deadline.getDate().toString().padStart(2, '0')}{' '}
          {deadline.getHours().toString().padStart(2, '0')}:
          {deadline.getMinutes().toString().padStart(2, '0')}
        </Text>
        <Text variant="xs_caption_medium" color="error">
          ({data.hoursToDeadline}시간 남음)
        </Text>
      </div>

      <ul className={styles.list}>
        {data.users.map((u, idx) => (
          <Flex
            key={u.userId}
            gap="1.6rem"
            direction="column"
            marginTop={idx !== 0 ? '1.6rem' : '0'}
          >
            <li className={styles.item}>
              <Profile
                size={32}
                src={
                  u.profileImageUrl 
                }
                alt={u.name}
              />
              <Text variant="md2_text_medium" color="grayscale90">
                {u.name}
              </Text>
            </li>

            {idx < data.users.length - 1 && (
              <Divider length="100%" borderColor="grayscale10" />
            )}
          </Flex>
        ))}
      </ul>
    </section>
  );
};
