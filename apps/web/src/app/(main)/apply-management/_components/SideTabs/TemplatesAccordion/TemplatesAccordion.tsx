'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IcPlus } from '@repo/ui/icons/mono';
import { IcArrowDropdown } from '@repo/ui/icons/colored';
import * as styles from './TemplatesAccordion.css';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { IcDots } from '@repo/ui/icons/mono';

export interface Template {
  id: string;
  title: string;
  body: string;
}

interface TemplatesAccordionProps {
  templates: Template[];
  selectedTemplateId: string | null;
  isCreating: boolean;
  isEditing: boolean;
  newTitle: string;
  onNewTitleChange: (val: string) => void;
  onSelect: (tpl: Template) => void;
  onCreate: () => void;
  onEdit: (tpl: Template) => void;
  onDelete: (tpl: Template) => void;
}

export function TemplatesAccordion({
  templates,
  selectedTemplateId,
  isCreating,
  isEditing,
  newTitle,
  onNewTitleChange,
  onSelect,
  onCreate,
  onEdit,
  onDelete,
}: TemplatesAccordionProps) {
  const [open, setOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 생성 모드 진입 시 포커스
  useEffect(() => {
    if (isCreating) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isCreating]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!menuOpenId) return;

      const el = itemRefs.current[menuOpenId];
      if (!el) return;

      // 현재 열린 템플릿 영역 밖을 클릭하면 닫기
      if (!el.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [menuOpenId]);


  const selectedTitle =
    templates.find((t) => t.id === selectedTemplateId)?.title ||
    '저장된 템플릿 불러오기';

  return (
    <div className={styles.accordion}>
      <button
       type="button"
        className={styles.header}
        onClick={() => {
          setOpen((o) => !o);
          setMenuOpenId(null);
        }}
      >
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
            onClick={() => {
              setMenuOpenId(null);
              onCreate();
            }}
            disabled={isCreating || isEditing}
          >
            새로운 템플릿 만들기
          </Button>

          <div className={styles.list}>
            {templates.map((t) => (
              <div
                key={t.id}
                ref={(node) => {
                  itemRefs.current[t.id] = node;
                }}
                className={styles.templateItem}
                //onMouseLeave={() => setMenuOpenId((prev) => (prev === t.id ? null : prev))}
              >
                <Button
                  variant={
                    t.id === selectedTemplateId ? 'main' : 'sub'
                  }
                  size="32"
                  width="16.667rem"
                  onClick={() => {
                    setMenuOpenId(null);
                    onSelect(t);
                  }}
                  disabled={isCreating || isEditing}
                >
                  {t.title}
                </Button>

                {/* 점 3개 아이콘 (hover 시 노출) */}
                <button
                  type="button"
                  className={`${styles.moreButton} ${
                    t.id === selectedTemplateId ? styles.moreButtonSelected : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenId((prev) => (prev === t.id ? null : t.id));
                  }}
                  aria-label="템플릿 메뉴 열기"
                  disabled={isCreating}
                >
                  <IcDots width={10} height={24} />
                </button>

                {/* 수정 / 삭제 메뉴 */}
                {menuOpenId === t.id && (
                  <div className={styles.moreMenu} onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className={styles.moreMenuItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(null);
                        onEdit(t);
                      }}
                    >
                      <Text variant='sm_caption_medium' color='grayscale50'>
                      수정
                      </Text>
                      
                    </button>
                    <button
                      type="button"
                      className={styles.moreMenuItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(null);
                        onDelete(t);
                      }}
                    >
                       <Text variant='sm_caption_medium' color='grayscale50'>
                      삭제
                      </Text>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isCreating && (
              <input
                ref={inputRef}
                className={styles.newInput}
                type="text"
                value={newTitle}
                onChange={(e) => onNewTitleChange(e.target.value)}
                //placeholder="템플릿 제목을 입력하세요"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
