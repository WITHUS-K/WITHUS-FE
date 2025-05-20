'use client';
import React, { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  IcHeaderBottom,
  IcHeaderClose,
  IcHeaderMail,
  IcHeaderBig,
} from '@repo/ui/icons/colored';
import * as styles from './SideTab.css';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';

interface SideTabProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function SideTabInner({ icon, title, children, onClose }: SideTabProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className={styles.collapsedButton}>
        <Flex align="center" gap="0.8rem">
          {icon}
          <Text variant="md2_text_semibold" color="white">
            {title}
          </Text>
        </Flex>
        <Flex align="center" gap="0.4rem">
          <button onClick={() => setCollapsed(false)}>
            <IcHeaderBig width={24} height={24} />
          </button>
          <button onClick={onClose} aria-label="닫기">
            <IcHeaderClose width={24} height={24} />
          </button>
        </Flex>
      </div>
    );
  }

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <Flex align="center" gap="0.8rem">
          {icon}
          <Text variant="md2_text_semibold" color="white">
            {title}
          </Text>
        </Flex>

        <Flex align="center" gap="0.4rem">
          <button onClick={() => setCollapsed(true)} aria-label="축소">
            <IcHeaderBottom width={24} height={24} />
          </button>
          <button onClick={onClose} aria-label="닫기">
            <IcHeaderClose width={24} height={24} />
          </button>
        </Flex>
      </header>

      <div className={styles.content}>{children}</div>
    </aside>
  );
}

export function SideTab(props: SideTabProps) {
  return createPortal(<SideTabInner {...props} />, document.body);
}
