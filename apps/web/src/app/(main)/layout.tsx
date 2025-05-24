'use client';
import * as styles from './layout.css';
import { Suspense } from 'react';
import { Header } from '@repo/ui/Header';
import Sidebar from '@web/components/Sidebar/Sidebar';
import { useUserStore } from '@web/store/state/userStore';
import { useModal } from 'node_modules/@repo/ui/dist/hooks/useModal';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const name = useUserStore.getState().name;
  const role = useUserStore.getState().role;
  const profileUrl = useUserStore.getState().profileImageUrl;
  const organizationRole = useUserStore.getState().userOrganizationRoles;

  const clearUser = useUserStore((state) => state.clearUser);

  const { confirm } = useModal();

  const handleLogout = () => {
    confirm({
      type: 'logout',
      title: `정말 로그아웃 하시겠습니까?`,
      cancelText: '취소',
      confirmText: '로그아웃',
      onConfirm: () => {
        deleteCookie('accessToken', { path: '/' });
        deleteCookie('refreshToken', { path: '/' });
        clearUser();
        router.push('/');
      },
    });
  };

  return (
    // 추후 서버에서 받아온 값으로 바꾸기!!
    <Suspense fallback={null}>
      <div className={styles.layoutStyle}>
        <Header
          username={name}
          profileUrl={profileUrl as string}
          role={role}
          position={organizationRole[0]?.roleName}
          part={organizationRole[1]?.roleName}
          onLogout={handleLogout}
        />
        <div className={styles.containerStyle}>
          <Sidebar role={role} />
          <main className={styles.contentStyle}>{children}</main>
        </div>
      </div>
    </Suspense>
  );
}
