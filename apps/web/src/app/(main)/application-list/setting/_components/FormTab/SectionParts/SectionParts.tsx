import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { useState } from 'react';
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

      <Flex wrap="wrap" gap="2.3rem" width="100%">
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

        {/* 항상 AddButton은 렌더, 클릭은 enabled 상태에서만 동작 */}
        {editingIndex === null &&
          (isAdding ? (
            <PartInput
              defaultValue=""
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          ) : (
            <AddButton onClick={() => setIsAdding(true)} disabled={!enabled} />
          ))}
      </Flex>
    </Flex>
  );
}
