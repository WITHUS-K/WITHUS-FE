'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import OrganizationPageClient from '../OrganizationPageClient';
import InviteModal from '../@modal/(.)invite/page';

export default function Page() {
  // URL이 /organization/invite 면 modal = ['invite']
  const { modal } = useParams() as { modal?: string[] };
  const showInvite = modal?.[0] === 'invite';

  return (
    <>
      <OrganizationPageClient />
      {showInvite && <InviteModal />}
    </>
  );
}
