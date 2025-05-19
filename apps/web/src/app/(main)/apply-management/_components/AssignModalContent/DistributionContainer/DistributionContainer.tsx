import { Flex } from '@repo/ui/Flex';
import { TagColor } from '@repo/utils';
import { useState } from 'react';
import DistributionItem from '../DistributionItem/DistributionItem';
import HeaderItem from '../HeaderItem/HeaderItem';
import { containerStyle, headerStyle } from './DistributionContainer.css';

export interface OrgRole {
  id: number;
  label: string;
  color: TagColor;
}

interface PartState {
  roles: OrgRole[];
  count: number;
}

interface DistributionContainerProps {
  parts: string[]; // ex) ['기획','디자인','프론트엔드','백엔드']
  availableRoles: OrgRole[];
}

export default function DistributionContainer({
  parts,
  availableRoles,
}: DistributionContainerProps) {
  // 초기 state 세팅
  const initial: Record<string, PartState> = {};
  parts.forEach((part) => {
    initial[part] = { roles: [], count: 1 };
  });

  const [state, setState] = useState<Record<string, PartState>>(initial);

  const handleRoleSelect = (part: string, role: OrgRole) => {
    setState((prev) => {
      // 1) 기존 state를 얕게 복제
      const nextState = { ...prev };

      // 2) 해당 파트만 PartState 타입을 확실히 보장하며 덮어쓰기
      nextState[part] = {
        ...prev[part]!, // non-null assertion
        roles: [...prev[part]!.roles, role], // roles 추가
        count: prev[part]!.count, // count는 그대로
      };

      return nextState; // 타입은 Record<string,PartState> 그대로!
    });
  };

  const handleCountChange = (name: string, next: number) => {
    setState((prev) => {
      const nextState = { ...prev };

      nextState[name] = {
        ...prev[name]!, // PartState 보장
        count: Math.max(1, next), // count만 변경
      };

      return nextState;
    });
  };
  return (
    <Flex direction="column" width="100%" className={containerStyle}>
      {/* 헤더 */}
      <div className={headerStyle}>
        <HeaderItem
          title="지원 파트"
          tooltip="파트별 평가할 담당자들을 설정해주세요"
          style={{ marginRight: '5.8rem' }}
        />
        <HeaderItem
          title="평가 담당자"
          tooltip="파트별 평가할 담당자들을 설정해주세요"
          style={{ marginRight: '7rem' }}
        />
        <HeaderItem
          title="평가 인원 수"
          tooltip="한 담당자 당 평가할 지원자 수를 설정해주세요."
        />
      </div>

      <Flex padding="1.2rem 0rem" width="100%" direction="column" gap="1.2rem">
        {/* 각 파트별 Row */}
        {parts.map((part) => (
          <DistributionItem
            key={part}
            part={part}
            availableRoles={availableRoles}
            selectedRoles={state[part]!.roles}
            count={state[part]!.count}
            onRoleSelect={handleRoleSelect}
            onCountChange={handleCountChange}
          />
        ))}
      </Flex>
    </Flex>
  );
}
