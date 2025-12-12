'use client';

import React, { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Option } from '@repo/ui/Option';
import { Text } from '@repo/ui/Text';
import { FormValues } from '@web/types/application';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
interface Props {
  index: number;
}

type TargetOption = { id: number; label: string };

export default function ResponseTargets({ index }: Props) {
  const { control, watch } = useFormContext<FormValues>();
  const enabled = watch('applicationParts.isSelected');
  const roleIds = watch('applicationParts.parts') ?? []; // number[]

  const { organizationId } = getClientSideTokens();
  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });

  const roleNameById = useMemo(() => {
    const m = new Map<number, string>();
    (rolesData?.roles ?? []).forEach((r) => m.set(r.id, r.roleName));
    return m;
  }, [rolesData]);

  const options: TargetOption[] = useMemo(() => {
    const common: TargetOption = { id: 0, label: '공통' };
    if (!enabled) return [common];

    return [
      common,
      ...roleIds.map((id) => ({
        id,
        label: roleNameById.get(id) ?? String(id), // 혹시 매핑 없으면 fallback
      })),
    ];
  }, [enabled, roleIds, roleNameById]);

  const optionIds = options.map((o) => o.id);
  return (
    <Flex direction="column" gap="1.2rem">
      <Text variant="md1_text_semibold" color="grayscale50">
        응답 대상
      </Text>
      <Flex wrap="wrap" gap="0.8rem" width="60.2rem">
      <Controller
          name={`detailItems.${index}.responseTarget` as const}
          control={control}
          defaultValue={0}
          render={({ field }) => {
            // ✅ 과거에 index로 저장돼 있던 값도 깨지지 않게 “마이그레이션” 처리
            const raw = field.value;
            const currentId =
              typeof raw === 'number'
                ? optionIds.includes(raw)
                  ? raw // 이미 id 형태로 들어있음
                  : optionIds[raw] ?? 0 // 예전 index 형태면 id로 해석
                : 0;

            return (
              <>
                {options.map((opt) => (
                  <Option
                    key={opt.id}
                    type="radio"
                    label={opt.label}
                    isSelected={currentId === opt.id}
                    onChange={() => field.onChange(opt.id)} // ✅ 저장은 id
                    width="12rem"
                    height="4.4rem"
                  />
                ))}
              </>
            );
          }}
        />
      </Flex>
    </Flex>
  );
}
