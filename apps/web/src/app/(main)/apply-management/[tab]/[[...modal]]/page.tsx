'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import TabClient from '../TabClient';
import ChargeModal from '../@modal/(.)charge/page';

export default function TabPage() {
  const params = useParams(); // [tab]
  const search = useSearchParams(); // ?clubId=…
  const modal = params.modal as string[] | undefined;
  const show = modal?.[0] === 'charge';

  return (
    <>
      <TabClient />
      {show && <ChargeModal />}
    </>
  );
}
