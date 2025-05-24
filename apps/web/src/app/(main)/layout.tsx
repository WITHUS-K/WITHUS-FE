'use client';
import * as styles from './layout.css';
import { Suspense } from 'react';
import { Header } from '@repo/ui/Header';
import Sidebar from '@web/components/Sidebar/Sidebar';
import { useUserStore } from '@web/store/state/userStore';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = useUserStore.getState().name;
  const organization = useUserStore.getState().userOrganizationRoles;

  return (
    // 추후 서버에서 받아온 값으로 바꾸기!!
    <Suspense fallback={null}>
      <div className={styles.layoutStyle}>
        <Header username={userName} />
        <div className={styles.containerStyle}>
          <Sidebar role={organization[0]?.roleName as string} />
          <main className={styles.contentStyle}>{children}</main>
        </div>
      </div>
    </Suspense>
  );
}
