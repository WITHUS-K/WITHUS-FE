'use client';

import React, { useContext, useMemo } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Controller, useFormContext } from 'react-hook-form';
import { SimpleToggleSwitch } from '@repo/ui/SimpleToggleSwitch';
import { PartTag } from './Tag/PartTag';
import { AddButton } from './Tag/AddButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { SettingContext } from '../../../_context/SettingContext';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export default function SectionParts() {
  const { control, watch, setValue } = useFormContext();
  const ctx = useContext(SettingContext)!;
  const enabled: boolean = watch('applicationParts.isSelected');
  const parts: number[] = watch('applicationParts.parts') || [];

  const router = useRouter();
  const searchParams = useSearchParams();
  const { organizationId } = getClientSideTokens();
  const { data } = useOrganizationRolesQuery({ organizationId });

  const roleNameById = useMemo(() => {
    const m = new Map<number, string>();
    (data?.roles ?? []).forEach((r) => m.set(r.id, r.roleName));
    return m;
  }, [data]);
  
  const openPartModal = () => {
    const qs = searchParams.toString();
    router.push(`/application-list/setting/part${qs ? `?${qs}` : ''}`, {
      scroll: false,
    });
  };

  const handleRemove = (idx: number) => {
    const next = parts.filter((_, i) => i !== idx);

    setValue('applicationParts.parts', next, { shouldDirty: true });
    setValue('applicationParts.isSelected', next.length > 0, {
      shouldDirty: true,
    });

    ctx.setForm((prev) => ({
      ...prev,
      applicationParts: { isSelected: next.length > 0, parts: next },
    }));
  };

  return (
    <Flex direction="column" gap="1.6rem" align="flexStart" width="100%">
      <Flex align="center" gap="1rem">
        <Text variant="md1_text_semibold" color="grayscale70">
          지원 파트
        </Text>
        <Controller
          name="applicationParts.isSelected"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SimpleToggleSwitch
              checked={value}
              onChange={(next: boolean) => {
                onChange(next);
                if (!next) {
                  setValue('applicationParts.parts', [], { shouldDirty: true });
                  ctx.setForm((prev) => ({
                    ...prev,
                    applicationParts: { isSelected: false, parts: [] },
                  }));
                } else {
                  ctx.setForm((prev) => ({
                    ...prev,
                    applicationParts: {
                      ...prev.applicationParts!,
                      isSelected: true,
                    },
                  }));
                }
              }}
            />
          )}
        />
      </Flex>

      {/* 파트 태그 + 추가 버튼 (인라인 입력 제거) */}
      <Flex wrap="wrap" gap="2.3rem" width="100%">
      {parts.map((id, i) => {
          const label = roleNameById.get(id) ?? `알 수 없음(#${id})`;
          return (
            <PartTag
              key={`${id}-${i}`}
              label={label}
              onRemove={() => handleRemove(i)}
              onEdit={openPartModal}
              disabled={!enabled}
            />
          );
        })}
        <AddButton onClick={openPartModal} disabled={!enabled} />
      </Flex>
    </Flex>
  );
}
