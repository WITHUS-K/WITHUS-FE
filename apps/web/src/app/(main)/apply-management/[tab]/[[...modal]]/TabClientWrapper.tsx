'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import AssignManagerModal from '../@modal/(.)assign-manager/page';
import PageClient from '../PageClient';
import ChargeModal from '../@modal/(.)charge/page';
import InviteRecipientsModal from '../@modal/(.)invite-recipients/page';

interface WrapperProps {
  modal?: string[];
}

export default function TabClientWrapper({ modal }: WrapperProps) {
  const search = useSearchParams();
  const recIdStr = search.get('recruitmentId') ?? '';
  const recId = recIdStr ? Number(recIdStr) : undefined;

  const showCharge = modal?.[0] === 'charge';
  const showAssign = modal?.[0] === 'assign-manager';
  const showInvite = modal?.[0] === 'invite-recipients'; 

  return (
    <>
      {/* 탭 UI + 컨텐츠 렌더링 */}
      <PageClient recId={recId} modal={modal} />

      {/* 모달 */}
      {showCharge && <ChargeModal />}
      {showAssign && <AssignManagerModal />}
      {showInvite && <InviteRecipientsModal />}
    </>
  );
}
