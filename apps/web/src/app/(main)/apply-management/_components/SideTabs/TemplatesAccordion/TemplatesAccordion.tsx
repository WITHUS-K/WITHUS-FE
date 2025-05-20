'use client';
import React, { useState } from 'react';
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

interface AccordionProps {
  templates: Template[];
  onSelect: (t: Template) => void;
  onCreateNew: () => void;
}

export function TemplatesAccordion({
  templates,
  onSelect,
  onCreateNew,
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <button className={styles.header} onClick={() => setOpen((o) => !o)}>
        <Text variant="md2_text_semibold" color="grayscale70">
          저장된 템플릿 불러오기
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
            onClick={onCreateNew}
          >
            새로운 템플릿 만들기
          </Button>
          <div className={styles.list}>
            {templates.map((t) => (
              <div key={t.id}>
                <Button
                  variant="sub"
                  size="32"
                  width="16.667rem"
                  onClick={() => onSelect(t)}
                >
                  {t.title}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
