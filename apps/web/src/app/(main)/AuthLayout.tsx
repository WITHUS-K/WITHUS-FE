'use client';
import * as styles from './layout.css';
import { Suspense } from 'react';
import { Header } from '@repo/ui/Header';
import Sidebar from '@web/components/Sidebar/Sidebar';
import { useUserStore } from '@web/store/state/userStore';
import { useModal } from '@repo/ui/hooks';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useMyOrganizationsQuery } from '@web/store/query/useMyOrganizationsQuery';

interface AuthLayoutProps {
  children: React.ReactNode;
  username: string;
  role: string;
  profileUrl: string;
  position: string;
  part: string;
  currentOrganizationId: number | null;
}

export default function AuthLayout({
  children,
  username,
  role,
  profileUrl,
  position,
  part,
  currentOrganizationId,
}: AuthLayoutProps) {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const { confirm } = useModal();

  const { data: organizations = [] } = useMyOrganizationsQuery();
  console.log('조직', organizations);

  const handleLogout = () => {
    confirm({
      type: 'logout',
      title: `정말 로그아웃 하시겠습니까?`,
      cancelText: '취소',
      confirmText: '로그아웃',
      onConfirm: () => {
        const cookiesToRemove = [
          'accessToken',
          'refreshToken',
          'name',
          'role',
          'profileImageUrl',
          'position',
          'part',
          'organizationId',
          'userId',
        ];
        cookiesToRemove.forEach((cookieName) =>
          deleteCookie(cookieName, { path: '/' })
        );

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
          <Sidebar
            role={role}
            currentOrganizationId={currentOrganizationId}
            organizations={organizations}
          />
          <main className={styles.contentStyle}>{children}</main>
        </div>
      </div>
    </Suspense>
  );
}
