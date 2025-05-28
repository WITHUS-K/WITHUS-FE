import { Flex } from '@repo/ui/Flex';
import { AdminHomeHeader } from '@web/app/(main)/_components/admin/AdminHomeHeader/AdminHomeHeader';
import { NoAnnouncements } from '@web/app/(main)/_components/admin/EmptyState/NoAnnouncements';
import { NoTasks } from '@web/app/(main)/_components/admin/EmptyState/NoTasks';
import React from 'react';

export const AdminHomeEmptyScreen = () => (
  <Flex
    width="100%"
    direction="column"
    gap="4rem"
    paddingBottom="2.4rem"
    paddingLeft="2.4rem"
    paddingRight="2.4rem"
    paddingTop="2.4rem"
  >
    <AdminHomeHeader />
    <Flex width="100%" direction="column" gap="2rem">
      <NoAnnouncements />
      <NoTasks />
    </Flex>
  </Flex>
);
