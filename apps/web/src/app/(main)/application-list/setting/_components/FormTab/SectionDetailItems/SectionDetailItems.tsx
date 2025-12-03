'use client';

import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import * as C from '@web/constants/application';
import * as styles from './SectionDetailItems.css';
import DetailItemCard from './Item/DetailItemCard';
import { IcBtnPlusCircle } from '@repo/ui/icons/colored';

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

type SortableDetailItemProps = {
  id: string;
  index: number;
  onRemove: () => void;
  onDuplicate: () => void;
};

function SortableDetailItem({
  id,
  index,
  onRemove,
  onDuplicate,
}: SortableDetailItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    willChange: 'transform',
    width: '100%',
  };

  const dragHandleProps = { ...attributes, ...listeners };

  return (
    <div ref={setNodeRef} style={style}>
      <DetailItemCard
        index={index}
        onRemove={onRemove}
        dragHandleProps={dragHandleProps}
        onDuplicate={onDuplicate}
      />
    </div>
  );
}

export default function SectionDetailItems() {
  const { control, getValues } = useFormContext();
  const { fields, append, remove, move, insert } = useFieldArray({
    name: 'detailItems',
    control,
  });

  // 터치/마우스 입력 모두 안정적으로 잡기 위한 sensor 설정
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const handleDuplicate = (index: number) => {
    const all = getValues('detailItems') || [];
    const target = all[index];
    if (!target) return;

    const cloned = JSON.parse(JSON.stringify(target));

    insert(index + 1, cloned);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = fields.map((f) => f.id);
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      move(oldIndex, newIndex); // RHF 필드 배열과 값이 함께 이동
    }
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({
        required: false,
        type: 'text',
        description: '',
        addDescription: '',
        responseTarget: 0,
        typeInfo: {
          info: C.BLANK_OPTIONS[0],
          infoDetail: C.CHAR_LIMITS[2],
        },
      });
    }
  }, [fields.length, append]);

  return (
    <Flex direction="column" width="100%" align="flexStart" gap="1.6rem">
      <Text variant="md1_text_semibold" color="grayscale70">
        상세 내용 <span style={{ color: 'red' }}>*</span>
      </Text>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <Flex direction="column" gap="1.6rem" align="center" width="100%">
            {fields.map((f, idx) => (
              <SortableDetailItem
                key={`${f.id}-${idx}`}
                id={f.id}
                index={idx}
                onRemove={() => remove(idx)}
                onDuplicate={() => handleDuplicate(idx)}
              />
            ))}

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                append({
                  required: false,
                  type: 'text',
                  description: '',
                  addDescription: '',
                  responseTarget: 0,
                  typeInfo: {
                    info: C.BLANK_OPTIONS[0],
                    infoDetail: C.CHAR_LIMITS[2],
                  },
                })
              }
            >
              <IcBtnPlusCircle width={24} height={24} />
              <Text variant="md2_text_semibold" color="grayscale40">
                추가
              </Text>
            </button>
          </Flex>
        </SortableContext>
      </DndContext>
    </Flex>
  );
}
