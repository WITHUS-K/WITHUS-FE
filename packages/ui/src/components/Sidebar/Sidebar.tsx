import React, { useState } from 'react';
import {
  IcSidebarCalender,
  IcSidebarGroup,
  IcSidebarHome,
  IcSidebarInfo,
  IcSidebarPaper,
  IcSidebarSearch,
} from '../../icons/src/mono';
import SidebarList from './SidebarList';
import SidebarItem from './SidebarItem';
import { sidebarContainer } from './Sidebar.css';

interface SidebarProps {
  role: 'user' | 'admin';
}

const Sidebar = ({ role }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<string>('');

  const adminItems = [
    { icon: <IcSidebarHome width={24} height={24} />, label: '홈' },
    { icon: <IcSidebarHome width={24} height={24} />, label: '지원서 관리' },
    { icon: <IcSidebarPaper width={24} height={24} />, label: '지원서 생성' },
    {
      icon: <IcSidebarSearch width={24} height={24} />,
      label: '지원 현황 관리',
    },
    { icon: <IcSidebarCalender width={24} height={24} />, label: '면접 관리' },
    { icon: <IcSidebarGroup width={24} height={24} />, label: '조직 관리' },
    { icon: <IcSidebarInfo width={24} height={24} />, label: '관리자 정보' },
  ];

  const userItems = [
    { icon: <IcSidebarHome width={24} height={24} />, label: '홈' },
    { icon: <IcSidebarPaper width={24} height={24} />, label: '지원서 관리' },
    {
      icon: <IcSidebarCalender width={24} height={24} />,
      label: '지원서 생성',
    },
    { icon: <IcSidebarInfo width={24} height={24} />, label: '사용자 정보' },
  ];

  const items = role === 'admin' ? adminItems : userItems;

  return (
    <nav className={sidebarContainer}>
      <SidebarList>
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={activeItem === item.label}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </SidebarList>
    </nav>
  );
};

export default Sidebar;
