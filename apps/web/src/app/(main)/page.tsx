'use client';

import { useMemo } from 'react';
import { getCookie } from 'cookies-next';
import { AdminHomeDashboardScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeDashboardScreen';
import { AdminHomeEmptyScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeEmptyScreen';
import { UserHomeDashboardScreen } from '@web/app/(main)/_components/home/User/UserHomeDashboardScreen';
import { UserHomeEmptyScreen } from '@web/app/(main)/_components/home/User/UserHomeEmptyScreen';
import { useCurrentRecruitmentSummaryQuery } from '@web/store/query/useCurrentRecruitmentSummaryQuery';
import { Spinner } from '@repo/ui/Spinner';
import { useCurrentRecruitmentSummaryByOrgQuery } from '@web/store/query/useCurrentRecruitmentSummaryByOrgQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export default function HomePage() {
  const role = useMemo<'admin' | 'user'>(() => {
    const raw = getCookie('role');
    return raw === 'ADMIN' ? 'admin' : 'user';
  }, []);

  const { organizationId } = getClientSideTokens();
  const orgId = Number(organizationId);

  const { data: adminSummaryData, isLoading: isAdminLoading } =
    useCurrentRecruitmentSummaryQuery();

  const { data: userSummaryData, isLoading: isUserLoading } =
    useCurrentRecruitmentSummaryByOrgQuery(orgId);

  const LoadingIndicator = (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: '18%',
        zIndex: 9999,
      }}
    >
      <Spinner size={64} strokeWidth={4} color="rgba(44, 96, 255, 0.7)" />
    </div>
  );

  if (role === 'admin') {
    if (isAdminLoading) {
      return LoadingIndicator;
    }

    const adminHasData = adminSummaryData && adminSummaryData.length > 0;

    return adminHasData ? (
      <AdminHomeDashboardScreen />
    ) : (
      <AdminHomeEmptyScreen />
    );
  }

  if (isUserLoading) {
    return LoadingIndicator;
  }

  const userHasData = userSummaryData && userSummaryData.length > 0;

  return userHasData ? <UserHomeDashboardScreen /> : <UserHomeEmptyScreen />;
}
