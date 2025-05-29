// src/web/app/(main)/application-list/setting/_components/FormTab/SectionParts.tsx
'use client';

import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Controller, useFormContext } from 'react-hook-form';
import { SimpleToggleSwitch } from '@repo/ui/SimpleToggleSwitch';
import { PartInput } from './Tag/PartInput';
import { PartTag } from './Tag/PartTag';
import { AddButton } from './Tag/AddButton';

export default function SectionParts() {
  const { control, watch, setValue } = useFormContext();
  const enabled: boolean = watch('applicationParts.isSelected');
  const parts: string[] = watch('applicationParts.parts') || [];

  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleConfirm = (newVal: string) => {
    if (!newVal) return handleCancel();

    if (editingIndex !== null) {
      const next = [...parts];
      next[editingIndex] = newVal;
      setValue('applicationParts.parts', next);
      setEditingIndex(null);
    } else {
      setValue('applicationParts.parts', [...parts, newVal]);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleRemove = (idx: number) => {
    setValue(
      'applicationParts.parts',
      parts.filter((_, i) => i !== idx)
    );
  };

  return (
    <Flex direction="column" gap="1.6rem" align="flexStart" width="100%">
      {/* 토글 스위치 */}
      <Flex align="center" gap="1rem">
        <Text variant="md1_text_semibold" color="grayscale70">
          지원 파트
        </Text>
        <Controller
          name="applicationParts.isSelected"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SimpleToggleSwitch checked={value} onChange={onChange} />
          )}
        />
      </Flex>

      {/* 파트 태그 및 입력, 추가 버튼 */}
      <Flex wrap="wrap" gap="2.3rem" width="100%">
        {/* 기존 파트 태그 */}
        {parts.map((p, i) =>
          editingIndex === i ? (
            <PartInput
              key={i}
              defaultValue={p}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          ) : (
            <PartTag
              key={i}
              label={p}
              onRemove={() => handleRemove(i)}
              onEdit={() => {
                setEditingIndex(i);
                setIsAdding(false);
              }}
              disabled={!enabled}
            />
          )
        )}

        {/* 입력창: isAdding 상태일 때만 */}
        {editingIndex === null && isAdding && (
          <PartInput
            defaultValue=""
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}

        {/* 항상 마지막에 추가 버튼 유지 */}
        <AddButton onClick={() => setIsAdding(true)} disabled={!enabled} />
      </Flex>
    </Flex>
  );
}
