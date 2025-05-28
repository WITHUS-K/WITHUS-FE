'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { UserHomeHeader } from '@web/app/(main)/_components/user/UserHomeHeader/UserHomeHeader';
import { NoAnnouncements } from '@web/app/(main)/_components/user/EmptyState/NoAnnouncements';
import { NoDocs } from '@web/app/(main)/_components/user/EmptyState/NoDocs';
import { NoInterview } from '@web/app/(main)/_components/user/EmptyState/NoInterviews';

export const UserHomeEmptyScreen: React.FC = () => {
  return (
    <Flex
      width="100%"
      direction="column"
      gap="4rem"
      paddingBottom="2.4rem"
      paddingLeft="2.4rem"
      paddingRight="2.4rem"
      paddingTop="2.4rem"
    >
      <UserHomeHeader />
      <Flex direction="column" gap="2rem" width="100%">
        <NoAnnouncements />

        <Flex gap="2rem" width="100%">
          <NoDocs />
          <NoInterview />
        </Flex>
      </Flex>
    </Flex>
  );
};
