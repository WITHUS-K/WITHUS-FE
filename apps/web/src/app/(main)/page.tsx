'use client';
import { AdminHomeDashboardScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeDashboardScreen';
import { AdminHomeEmptyScreen } from '@web/app/(main)/_components/home/Admin/AdminHomeEmptyScreen';
import { getCookie } from 'cookies-next';
import { useMemo } from 'react';

export default function HomePage() {
  const role = useMemo<'admin' | 'user'>(() => {
    const raw = getCookie('role');
    return raw === 'ADMIN' ? 'admin' : 'user';
  }, []);

  // 임시 값
  const adminHasData = true;
  const userHasData = true;
  if (role === 'admin') {
    // 관리자 홈
    return adminHasData ? (
      <AdminHomeDashboardScreen />
    ) : (
      <AdminHomeEmptyScreen />
    );
  }

  // 일반 사용자 홈
  return userHasData ? <div>임시 루트페이지</div> : <div>임시 루트페이지</div>;
}
