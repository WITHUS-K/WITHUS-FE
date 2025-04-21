'use client';

import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import {
  IcAdminActive,
  IcAdminDefault,
  IcAdminHover,
  IcUserActive,
  IcUserDefault,
  IcUserHover,
} from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { buttonStyle } from './Step1.css';

type MemberType = 'admin' | 'user';
type IconState = 'default' | 'hover' | 'active';

const ICON_MAP: Record<
  MemberType,
  Record<IconState, React.ComponentType<any>>
> = {
  admin: {
    default: IcAdminDefault,
    hover: IcAdminHover,
    active: IcAdminActive,
  },
  user: {
    default: IcUserDefault,
    hover: IcUserHover,
    active: IcUserActive,
  },
};

interface Step1Props {
  onNext: (memberType: MemberType) => void;
}

export default function Step1({ onNext }: Step1Props) {
  const [selected, setSelected] = useState<MemberType | null>(null);
  const [hovered, setHovered] = useState<MemberType | null>(null);

  const types: MemberType[] = ['admin', 'user'];

  return (
    <Flex direction="column" marginTop="2.8rem">
      <Text variant="md1_text_semibold" color="grayscale80">
        가입하려는 회원 유형을 선택해주세요.
      </Text>

      <Flex gap="2rem" marginTop="1.6rem">
        {types.map((type) => {
          let state: IconState = 'default';
          if (selected === type) state = 'active';
          else if (hovered === type) state = 'hover';

          const Icon = ICON_MAP[type][state];
          return (
            <Icon
              key={type}
              width={207}
              height={100}
              onClick={() => setSelected(type)}
              onMouseEnter={() => setHovered(type)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            />
          );
        })}
      </Flex>

      <Button
        variant="main"
        size="64"
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
        className={buttonStyle}
        width="43.4rem"
      >
        다음
      </Button>
    </Flex>
  );
}
