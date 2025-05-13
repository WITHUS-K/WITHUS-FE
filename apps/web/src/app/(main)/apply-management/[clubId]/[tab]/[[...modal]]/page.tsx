'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import TabClient from '../TabClient';
import ChargeModal from '../@modal/(.)charge/page';

export default function TabPage() {
  const { modal } = useParams() as { modal?: string[] };
  const show = modal?.[0] === 'charge';
  console.log(show);

  return (
    <>
      <TabClient />
      {show && <ChargeModal />}
    </>
  );
}
