'use client';
import * as styles from './layout.css';
import { Suspense } from 'react';
import { Header } from '@repo/ui/Header';
import Sidebar from '@web/components/Sidebar/Sidebar';
import { useUserStore } from '@web/store/state/userStore';
import { useModal } from 'node_modules/@repo/ui/dist/hooks/useModal';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
    children,
    username,
    role,
    profileUrl,
    position,
    part,
  }: {
    children: React.ReactNode;
    username: string;
    role: string;
    profileUrl: string;
    position: string;
    part: string;
  }) {

  const router = useRouter();


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
        deleteCookie('name', { path: '/' });
        deleteCookie('role', { path: '/' });
        deleteCookie('profileUrl', { path: '/' });
        deleteCookie('position', { path: '/' });
        deleteCookie('part', { path: '/' });
        deleteCookie('organizationId', { path: '/' });
        deleteCookie('userId', { path: '/' });
        clearUser();
        router.push('/');
      },
    });
  };

  return (
  
    <Suspense fallback={null}>
      <div className={styles.layoutStyle}>
        <Header
          username={username}
          profileUrl={profileUrl as string}
          role={role}
          position={position}
          part={part}
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
