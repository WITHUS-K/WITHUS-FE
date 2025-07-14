'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import React from 'react';
import { Option } from '@repo/ui/Option';

interface DocsDetailHeaderProps {
  name: string;
  isChecked: boolean;
  onToggle: () => void;
}

export function DocsDetailHeader({
  name,
  isChecked,
  onToggle,
}: DocsDetailHeaderProps) {
  return (
    <Flex
      direction="column"
      gap="0.4rem"
      width="100%"
      //marginBottom="1.2rem"
      //marginLeft="0.5rem"
    >
      <Breadcrumb>
        <Breadcrumb.Item>서류 평가</Breadcrumb.Item>
        <Breadcrumb.Item active>{name} 상세 정보</Breadcrumb.Item>
      </Breadcrumb>
      <Flex align="center" justify="spaceBetween" width="100%">
        <Text variant="xl_title_semibold" color="black">
          {name} 상세 정보
        </Text>
        <Option
          type="checkbox"
          label="지인이에요"
          width="14.2rem"
          height="4.8rem"
          isChecked={isChecked}
          onChange={onToggle}
        />
      </Flex>
    </Flex>
  );
}
