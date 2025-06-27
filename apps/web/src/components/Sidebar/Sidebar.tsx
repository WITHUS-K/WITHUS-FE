'use client';
import React, { useState } from 'react';
import SidebarList from './SidebarList';
import SidebarItem from './SidebarItem';
import { sidebarContainer } from './Sidebar.css';
import {
  IcSidebarCalender,
  IcSidebarGroup,
  IcSidebarHome,
  IcSidebarInfo,
  IcSidebarPaper,
  IcSidebarSearch,
} from '@repo/ui/icons/mono';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>('');

  const adminItems = [
    { icon: <IcSidebarHome width={24} height={24} />, label: '홈', route: '/' },
    {
      icon: <IcSidebarPaper width={24} height={24} />,
      label: '지원서 생성',
      route: '/application-list',
    },
    {
      icon: <IcSidebarSearch width={24} height={24} />,
      label: '지원 현황 관리',
      route: '/apply-management',
    },
    {
      icon: <IcSidebarCalender width={24} height={24} />,
      label: '면접 관리',
      route: '/interview-management',
    },
    {
      icon: <IcSidebarGroup width={24} height={24} />,
      label: '조직 관리',
      route: '/organization',
    },
    {
      icon: <IcSidebarInfo width={24} height={24} />,
      label: '관리자 정보',
      route: '/profile',
    },
  ];

  const userItems = [
    { icon: <IcSidebarHome width={24} height={24} />, label: '홈', route: '/' },
    {
      icon: <IcSidebarPaper width={24} height={24} />,
      label: '서류 평가',
      route: '/docs-evaluation',
    },
    {
      icon: <IcSidebarCalender width={24} height={24} />,
      label: '면접 평가',
      route: '/interview-evaluation',
    },
    {
      icon: <IcSidebarInfo width={24} height={24} />,
      label: '사용자 정보',
      route: '/profile',
    },
  ];

  const items = role === 'ADMIN' ? adminItems : userItems;

  const activeItemLabel =
    items.find((i) => {
      // 정확히 루트 매핑 또는 하위 경로 포함 여부
      return (
        pathname === i.route ||
        (i.route !== '/' && pathname.startsWith(i.route + '/'))
      );
    })?.label ?? '홈';

  return (
    <nav className={sidebarContainer}>
      <SidebarList>
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={item.label === activeItemLabel}
            onClick={() => {
              setActiveItem(item.label);
              router.push(item.route);
            }}
          />
        ))}
      </SidebarList>
    </nav>
  );
};

export default Sidebar;
