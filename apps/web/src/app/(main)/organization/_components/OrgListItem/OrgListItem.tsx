'use client';

import React from 'react';

import * as styles from './OrgListItem.css';
import { Member, OrgRole } from '@web/types/organization';
import { CheckBox } from '@repo/ui/CheckBox';
import { Tag } from '@repo/ui/Tag';
import { RolesDropdown } from '@repo/ui/DropDown';
import { Profile } from '@repo/ui/Profile';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { vars } from '@repo/theme';
interface Props {
  member: Member;
  isSelected: boolean;
  onToggle: (checked: boolean) => void;
  availableRoles: OrgRole[];
  onAddRole: (role: OrgRole) => void;
  search: string;
  index: number;
}

export default function OrgListItem({
  member,
  isSelected,
  onToggle,
  availableRoles,
  onAddRole,
  search,
  index,
}: Props) {
  // 검색어가 없거나 포함되지 않으면 원본 이름만
  const nameParts = search
    ? member.name.split(new RegExp(`(${search})`, 'gi'))
    : [member.name];

  return (
    <div className={`${styles.item} ${isSelected ? styles.selected : ''}`}>
      {/* 1) 체크박스 */}

      <div style={{ marginRight: '2.4rem', height: '2.4rem' }}>
        <CheckBox
          isChecked={isSelected}
          onChange={() => onToggle(!isSelected)}
        />
      </div>
      {/* 2) 순번 */}
      <Text
        variant="xs_caption_medium"
        color="grayscale50"
        style={{ marginRight: '1.8rem', width: '2.4rem' }}
      >
        {String(index + 1).padStart(3, '0')}
      </Text>

      <div style={{ marginRight: '1.8rem' }}>
        {/* 3) 프로필 */}
        <Profile src={member.profileUrl} alt={member.name} size={32} />
      </div>

      {/* 3) 이름+이메일 */}
      <Flex direction="column" width="19rem" marginRight="1.8rem">
        <Text variant="sm_caption_medium" color="grayscale70">
          {nameParts.map((part, index) =>
            search && part.toLowerCase() === search.toLowerCase() ? (
              <span
                key={index}
                style={{
                  color: vars.colors.white,
                  backgroundColor: vars.colors.primary50,
                }}
              >
                {part}
              </span>
            ) : (
              <React.Fragment key={index}>{part}</React.Fragment>
            )
          )}
        </Text>
        <Text variant="xs_caption_medium" color="grayscale50">
          {member.email}
        </Text>
      </Flex>

      <Flex align="center" gap="0.8rem" width="31rem" marginRight="4.4rem">
        <RolesDropdown
          availableRoles={availableRoles}
          onSelect={(r) => onAddRole(r)}
        />
        <div className={styles.tagContainer}>
          {member.roles.map((r) => (
            <Tag key={r.label} color={r.color} withCircle>
              {r.label}
            </Tag>
          ))}
        </div>
      </Flex>

      {/* 5) 성별 / 생년월일 / 전화번호 / 가입일 */}
      <Flex align="center" gap="4.4rem">
        <Text
          variant="sm_caption_medium"
          color="grayscale70"
          style={{ width: '2.1rem' }}
        >
          {member.gender}
        </Text>
        <Text
          variant="sm_caption_medium"
          color="grayscale70"
          style={{ width: '7.7rem' }}
        >
          {member.dob}
        </Text>
        <Text
          variant="sm_caption_medium"
          color="grayscale70"
          style={{ width: '10.6rem' }}
        >
          {member.phone}
        </Text>
        <Text variant="sm_caption_medium" color="grayscale70">
          {member.joined.split('/')[0]}
        </Text>
      </Flex>
    </div>
  );
}
