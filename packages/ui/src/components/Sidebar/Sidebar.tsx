import React from 'react';
import {
  IcSidebarCalender,
  IcSidebarGroup,
  IcSidebarHome,
  IcSidebarInfo,
  IcSidebarPaper,
  IcSidebarSearch,
} from '@/icons/src/mono';
import SidebarRoot from '@/components/Sidebar/SidebarRoot';
import SidebarList from '@/components/Sidebar/SidebarList';
import SidebarItem from '@/components/Sidebar/SidebarItem';

interface SidebarProps {
  role: 'user' | 'admin';
}

const Sidebar = ({ role }: SidebarProps) => {
  const adminItems = [
    {
      icon: <IcSidebarHome width={24} height={24} />,
      label: '홈',
    },
    {
      icon: <IcSidebarHome width={24} height={24} />,
      label: '지원서 관리',
    },
    {
      icon: <IcSidebarPaper width={24} height={24} />,
      label: '지원서 생성',
    },
    {
      icon: <IcSidebarSearch width={24} height={24} />,
      label: '지원 현황 관리',
    },
    {
      icon: <IcSidebarCalender width={24} height={24} />,
      label: '면접 관리',
    },
    {
      icon: <IcSidebarGroup width={24} height={24} />,
      label: '조직 관리',
    },
    {
      icon: <IcSidebarInfo width={24} height={24} />,
      label: '관리자 정보',
    },
  ];

  const userItems = [
    {
      icon: <IcSidebarHome width={24} height={24} />,
      label: '홈',
    },
    {
      icon: <IcSidebarPaper width={24} height={24} />,
      label: '지원서 관리',
    },
    {
      icon: <IcSidebarCalender width={24} height={24} />,
      label: '지원서 생성',
    },
    {
      icon: <IcSidebarInfo width={24} height={24} />,
      label: '사용자 정보',
    },
  ];

  const items = role === 'admin' ? adminItems : userItems;

  return (
    <SidebarRoot>
      <SidebarList>
        {items.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </SidebarList>
    </SidebarRoot>
  );
};

export default Sidebar;
