// app/(main)/interview-management/timetable/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getOrgInterviewsOptions } from '@web/store/query/useOrganizationInterviewsQuery';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import ScheduleClient from './ScheduleClient';

interface PageProps {
  searchParams: Promise<{
    recruitmentId?: string;
    interviewId?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { recruitmentId: recIdStr, interviewId: ivStr } = await searchParams;
  const recruitmentId = recIdStr ? Number(recIdStr) : NaN;
  const initialInterviewId = ivStr ? Number(ivStr) : undefined;
  if (isNaN(recruitmentId)) {
    return notFound();
  }

  const { accessToken, refreshToken, organizationId } =
    await getServerSideTokens();
  if (!organizationId) {
    return notFound();
  }
  const tokens = { accessToken, refreshToken };

  const orgInterviewsOptions = getOrgInterviewsOptions(organizationId, tokens);

  return (
    <ServerFetchBoundary fetchOptions={orgInterviewsOptions}>
      <ScheduleClient organizationId={organizationId} />
    </ServerFetchBoundary>
  );
}
