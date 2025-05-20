'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import TabClient from '../TabClient';
import ChargeModal from '../@modal/(.)charge/page';
import AssignManagerModal from '../@modal/(.)assign-manager/page';

export default function TabPage() {
  const params = useParams();
  const search = useSearchParams();
  const modal = params.modal as string[] | undefined;
  const show = modal?.[0] === 'charge';
  const showAssign = modal?.[0] === 'assign-manager';
  return (
    <>
      <TabClient />
      {show && <ChargeModal />}
      {showAssign && <AssignManagerModal />}
    </>
  );
}
