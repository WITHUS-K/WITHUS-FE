'use client';

import React, { RefObject, useContext, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import * as css from './FormNavigator.css';
import { FormFieldStatusContext } from '../../_context/FormFieldStatusContext';
import { IcNaviComplete, IcNaviEdit } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';

export interface NavItem {
  id: string;
  label: string;
  required: boolean;
  isDivider?: boolean;
}

interface Props {
  items: NavItem[];
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export function FormNavigator({ items, scrollContainerRef }: Props) {
  const { scrollY } = useScroll({ container: scrollContainerRef });
  const y = useSpring(scrollY, {
    stiffness: 300,
    damping: 15,
    mass: 1,
    restDelta: 0.5,
    restSpeed: 0.5,
  });

  // 현재 active된 아이템  (없으면 null)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { fieldStatuses, getStatus } = useContext(FormFieldStatusContext);

  // 모든 항목이 completed 상태인지 체크
  const filteredItems = items.filter(
    (item) => !item.isDivider && item.required
  ); // divider, 필수 항목 아닌 것 제외

  const isAllCompleted = filteredItems.every((item) => {
    const fs = fieldStatuses[item.id] ?? getStatus(item.id);
    return fs.status === 'completed';
  });

  const handleClick = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add(css.flash);
    setTimeout(() => {
      el.classList.remove(css.flash);
    }, 1000);

    const input = el.querySelector(
      'input, textarea, select, [contenteditable="true"]'
    ) as HTMLElement | null;
    if (input) {
      setTimeout(() => {
        input.focus();
      }, 300);
    }
  };

  return (
    <motion.div
      className={css.navigator}
      animate={{ float: [0, -8, 0] }}
      transition={{
        y: {
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 4,
          ease: 'easeInOut',
          delay: 0.5,
        },
      }}
    >
      <div className={css.scrollArea}>
        <div className={css.contentWrapper}>
          <Flex
            align="center"
            justify="spaceBetween"
            width="100%"
            marginBottom="2rem"
          >
            <Text
              variant="xl_title_bold"
              color="grayscale80"
              style={{ whiteSpace: 'nowrap' }}
            >
              전체 {filteredItems.length}개 항목
            </Text>
            <div className={css.space} />
            <Chip
              style={{ whiteSpace: 'nowrap' }}
              bg={isAllCompleted ? 'primary5' : 'grayscale5'}
              color={isAllCompleted ? 'primary50' : 'grayscale70'}
            >
              {isAllCompleted ? '완료' : '미완료'}
            </Chip>
          </Flex>

          {items.map((item) => {
            if (item.isDivider) {
              return (
                <div key={`div-${Math.random()}`} className={css.divider} />
              );
            }

            const fs = fieldStatuses[item.id] ?? getStatus(item.id);
            const { status, setCompleted } = fs;

            const isCompleted = status === 'completed';
            const isActive = selectedId === item.id;

            return (
              <div
                key={item.id}
                className={`${css.item} ${isActive ? css.active : ''}`}
                onClick={() => handleClick(item.id)}
              >
                <span className={css.labelWrapper}>
                  <span className={css.label}>{item.label}</span>
                  {item.required && <span className={css.required}> *</span>}
                </span>
                <span>
                  {isCompleted ? (
                    <div style={{ height: '2.1rem' }}>
                      <IcNaviComplete width={21} height={21} />
                    </div>
                  ) : (
                    <div style={{ height: '2.1rem' }}>
                      <IcNaviEdit width={21} height={21} />
                    </div>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
