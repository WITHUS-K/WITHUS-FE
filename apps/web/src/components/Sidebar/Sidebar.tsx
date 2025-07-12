'use client';
import React, { useState } from 'react';
import SidebarList from './SidebarList';
import SidebarItem from './SidebarItem';
import { sidebarContainer, sidebarOrgs } from './Sidebar.css';
import {
  IcSidebarCalender,
  IcSidebarGroup,
  IcSidebarHome,
  IcSidebarInfo,
  IcSidebarPaper,
  IcSidebarSearch,
} from '@repo/ui/icons/mono';
import { usePathname, useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { Option } from '@repo/ui/Option';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Divider } from '@repo/ui/Divider';

interface SidebarProps {
  role: string;
  organizations: Organization[];
  currentOrganizationId: number | null;
}

export interface Organization {
  id: number;
  name: string;
}

const Sidebar = ({
  role,
  organizations,
  currentOrganizationId,
}: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>('');

  console.log('넘겨진 조직', organizations);
  const onSelectOrg = (orgId: number) => {
    console.log('흠', orgId);
    setCookie('organizationId', String(orgId), { path: '/' });
    router.refresh();
  };

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

      {role === 'USER' && (
        <Flex direction="column" gap="1.2rem" width="100%">
          <Divider direction="row" length="100%" borderColor="grayscale10" />
          <Text variant="sm_caption_medium" color="grayscale50">
            소속
          </Text>
          <div className={sidebarOrgs}>
            {organizations.map((org) => (
              <Option
                key={org.id}
                type="radio"
                label={org.name}
                isSelected={org.id === currentOrganizationId}
                onChange={() => onSelectOrg(org.id)}
                width="100%"
                height="3.7rem"
              />
            ))}
          </div>
        </Flex>
      )}
    </nav>
  );
};

export default Sidebar;
