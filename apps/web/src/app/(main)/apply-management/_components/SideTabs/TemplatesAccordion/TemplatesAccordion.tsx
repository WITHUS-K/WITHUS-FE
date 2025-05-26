'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IcPlus } from '@repo/ui/icons/mono';
import { IcArrowDropdown } from '@repo/ui/icons/colored';
import * as styles from './TemplatesAccordion.css';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';

export interface Template {
  id: string;
  title: string;
  body: string;
}

interface TemplatesAccordionProps {
  templates: Template[];
  selectedTemplateId: string | null;
  isCreating: boolean;
  newTitle: string;
  onNewTitleChange: (val: string) => void;
  onSelect: (tpl: Template) => void;
  onCreate: () => void;
}

export function TemplatesAccordion({
  templates,
  selectedTemplateId,
  isCreating,
  newTitle,
  onNewTitleChange,
  onSelect,
  onCreate,
}: TemplatesAccordionProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 생성 모드 진입 시 포커스, 모드 빠져나오면 입력 초기화
  useEffect(() => {
    if (isCreating) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isCreating]);

  const selectedTitle =
    templates.find((t) => t.id === selectedTemplateId)?.title ||
    '저장된 템플릿 불러오기';

  return (
    <div className={styles.accordion}>
      <button className={styles.header} onClick={() => setOpen((o) => !o)}>
        <Text variant="md2_text_semibold" color="grayscale70">
          {selectedTitle}
        </Text>
        <IcArrowDropdown className={open ? '' : styles.rotated} />
      </button>

      {open && (
        <div className={styles.body}>
          <Button
            variant="stroke"
            size="32"
            width="100%"
            leftIcon={<IcPlus />}
            onClick={onCreate}
            disabled={isCreating}
          >
            새로운 템플릿 만들기
          </Button>

          <div className={styles.list}>
            {templates.map((t) => (
              <Button
                key={t.id}
                variant="sub"
                size="32"
                width="16.667rem"
                onClick={() => {
                  onSelect(t);
                  setOpen(false);
                }}
                disabled={isCreating}
              >
                {t.title}
              </Button>
            ))}

            {isCreating && (
              <input
                ref={inputRef}
                className={styles.newInput}
                type="text"
                value={newTitle}
                onChange={(e) => onNewTitleChange(e.target.value)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
