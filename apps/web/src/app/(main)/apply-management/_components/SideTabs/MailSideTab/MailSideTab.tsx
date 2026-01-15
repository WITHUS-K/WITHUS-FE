'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IcSendBtn } from '@repo/ui/icons/mono';
import {
  IcFilePlus,
  IcHeaderMail,
  IcTagDelete,
} from '@repo/ui/icons/colored';
import { SideTab } from '../SideTab/SideTab';
import {
  TemplatesAccordion,
  Template,
} from '../TemplatesAccordion/TemplatesAccordion';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import * as styles from './MailSideTab.css';
import { useBulkMail } from '@web/store/mutation/useBulkMail';
import { useCreateTemplate } from '@web/store/mutation/useCreateTemplate';
import {
  useTemplatesQuery,
  TemplateDetail,
} from '@web/store/query/useTemplatesQuery';
import { useTemplateDetailQuery } from '@web/store/query/useTemplateDetailQuery';
import { Descendant, Editor, Transforms, createEditor,   Element as SlateElement, } from 'slate';
import {
  RichTextEditor,
  insertVariable,
  toggleMark,
  withVariables,
  setFontSize,
  setColor,
  setAlign,
  TextAlign,
} from '../RichTextEditor/RichTextEditor';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { serializeHtml } from '@web/utils/serializers';
import { deserializeHtml } from '@web/utils/deserializeHtml';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useModal } from '@repo/ui/hooks';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type as TypeIcon,
  Palette as PaletteIcon,
} from 'lucide-react';
import clsx from 'clsx';
import { useRecipientsStore } from '@web/store/state/useRecipientsStore';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useUpdateTemplate } from '@web/store/mutation/useUpdateTemplate';
import { useDeleteTemplate } from '@web/store/mutation/useDeleteTemplate';

interface MailSideTabProps {
  applicationIds: number[];
  recipients: string[];
  onClose: () => void;
}

export function MailSideTab({
  applicationIds,
  recipients,
  onClose,
}: MailSideTabProps) {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();

  const tab = Array.isArray(params.tab) ? params.tab[0] : (params.tab as string);
  const recruitmentId = search.get('recruitmentId');
  const sideTab = search.get('sideTab') ?? 'mail';
  
  const { organizationId } = getClientSideTokens();
  const { confirm } = useModal();

  // 템플릿 목록
  const { data: tplSummaries = [] } = useTemplatesQuery('MAIL');
  const [templates, setTemplates] = useState<Template[]>([]);
  useEffect(() => {
    setTemplates(
      tplSummaries.map((t) => ({
        id: String(t.id),
        title: t.name,
        body: '',
      }))
    );
  }, [tplSummaries]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { recipients: storeRecipients, setRecipients, removeRecipient, clearRecipients , mergeRecipients } = useRecipientsStore();

  
  const [localRecipients, setLocalRecipients] = useState<string[]>(recipients);
  useEffect(() => {
    const seeds = (recipients ?? []).map((name, idx) => ({
      id: `seed-${idx}-${name}`,
      name,
      email: '', 
    }));
  
    mergeRecipients(seeds, 'name'); 
  }, [recipients, mergeRecipients]);


  const openInviteModal = () => {
    if (!recruitmentId) return;
    router.push(`/apply-management/${tab}/invite-recipients?recruitmentId=${recruitmentId}&sideTab=${sideTab}`);
  };

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const [subject, setSubject] = useState('');
  const [attachment, setAttachment] = useState<File>();

  const editor = useMemo(
    () => withHistory(withReact(withVariables(createEditor()))),
    []
  );
  const [editorValue, setEditorValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: '' }] },
  ]);

  const [currentFontSize, setCurrentFontSize] = useState('14px');
  const [currentColor, setCurrentColor] = useState('#333333');

  // 선택된 템플릿 상세
  const tplDetailQ = useTemplateDetailQuery(
    selectedTemplateId ? Number(selectedTemplateId) : -1
  );

  useEffect(() => {
    // 선택된 템플릿이 없으면(삭제/생성 초기화 상태) detail을 에디터에 반영하지 않음
    if (!selectedTemplateId) return;
    if (!tplDetailQ.data) return;
    if (isCreating) return;
  
    setSubject(tplDetailQ.data.subject ?? tplDetailQ.data.name);
  
    const nodes = deserializeHtml(tplDetailQ.data.body);
  
    Transforms.deselect(editor);
    for (let i = editor.children.length - 1; i >= 0; i--) {
      Transforms.removeNodes(editor, { at: [i] });
    }
    Transforms.insertNodes(editor, nodes);
    setEditorValue(nodes);
    Transforms.deselect(editor);
  }, [selectedTemplateId, tplDetailQ.data, isCreating, editor]);
  const sendMail = useBulkMail();
  const createTpl = useCreateTemplate();
  const updateTpl = useUpdateTemplate();
  const deleteTpl = useDeleteTemplate();
  
  const handleClose = () => {
    clearRecipients();   
    onClose();          
  };

  // 새 템플릿 생성
  const handleCreate = () => {
    setSelectedTemplateId(null);
    setIsCreating(true);
    setIsEditing(false);
    setNewTitle('');
    setSubject('');
    const empty: Descendant[] = [
      { type: 'paragraph', children: [{ text: '' }] },
    ];
    setEditorValue(empty);
  };

  // 템플릿 선택 (보기 모드)
  const handleSelect = (tpl: Template) => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedTemplateId(tpl.id);
  };

  // 수정 모드 진입
  const handleEdit = (tpl: Template) => {
    setSelectedTemplateId(tpl.id);
    setIsCreating(false);
    setIsEditing(true);
    // 제목은 그대로, body/subject는 tplDetailQ effect에서 채움
  };

  // 삭제
  const handleDelete = (tpl: Template) => {
    confirm({
      type: 'warning',
      description: '해당 템플릿을 삭제하시겠습니까?',
      cancelText: '취소',
      confirmText: '삭제',
      onConfirm: () => {
        deleteTpl.mutate(
          {
            templateId: Number(tpl.id),
            medium: 'MAIL',
          },
          {
            onSuccess: () => {
  
              setTemplates((prev) => prev.filter((item) => item.id !== tpl.id));
              if (selectedTemplateId === tpl.id) {
                setSelectedTemplateId(null);
                setSubject('');
                setEditorValue([{ type: 'paragraph', children: [{ text: '' }] }]);
              }
            }
          }
        );
      },
    });
  };

  const handleSaveTemplate = () => {
    const html = serializeHtml(editorValue);
    console.log("request", html)
    createTpl.mutate(
      {
        name: newTitle,
        subject,
        body: html,
        medium: 'MAIL',
        organizationId,
      },
      {
        onSuccess: (newTpl: TemplateDetail) => {
          const added: Template = {
            id: String(newTpl.id),
            title: newTpl.name,
            body: newTpl.body,
          };
          console.log("response", newTpl)
          setTemplates((prev) => [...prev, added]);
          setSelectedTemplateId(String(newTpl.id));
          setIsCreating(false);
        },
      }
    );
  };

  const handleUpdateTemplate = () => {
    const html = serializeHtml(editorValue);
    if (!selectedTemplateId) return;
  
    updateTpl.mutate(
      {
        templateId: Number(selectedTemplateId),
        name: newTitle.trim() || (tplDetailQ.data?.name ?? ''), // 제목 입력 UI가 별도로 없으면 기존 name 유지
        subject,
        body: html,
        medium: 'MAIL',
      },
      {
        onSuccess: () => {
          // UI state 정리 (필요 최소)
          setIsEditing(false);
  
          // (선택) 로컬 templates도 즉시 반영하고 싶으면 아래 유지
          setTemplates((prev) =>
            prev.map((t) =>
              t.id === selectedTemplateId
                ? { ...t, title: newTitle.trim() || t.title, body: html }
                : t
            )
          );
        },
      }
    );
  };

  const handleSend = () => {
    const html = serializeHtml(editorValue);
    sendMail.mutate(
      {
        applicationIds,
        subject,
        body: html,
        attachments: attachment ? [attachment] : [],
      },
      {
        onSuccess: () => {
          clearRecipients();  
          onClose();
        },
      }
    );
  };

  const actionLabel = isCreating
    ? '저장하기'
    : isEditing
      ? '수정하기'
      : '보내기';

  const handleActionClick = () => {
    if (isCreating) handleSaveTemplate();
    else if (isEditing) handleUpdateTemplate();
    else handleSend();
  };

  const isMarkActive = (
    editor: Editor,
    format: 'bold' | 'italic' | 'underline'
  ) => {
    const marks = (Editor.marks(editor) as Record<string, boolean>) || {};
    return marks[format] === true;
  };
  
  const isAlignActive = (editor: Editor, align: TextAlign) => {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any).type === 'paragraph' &&
        (n as any).align === align,
    });
    return !!match;
  };
  
  return (
    <SideTab
    icon={<IcHeaderMail width={24} height={24} />}
      title="메일 전송"
      onClose={handleClose}
    >
      <TemplatesAccordion
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        isCreating={isCreating}
        isEditing={isEditing}
        newTitle={newTitle}
        onNewTitleChange={setNewTitle}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

 {/* 받는 사람 */}
 {!isCreating && !isEditing && (
        <div className={styles.section1} style={{ marginTop: '1.2rem' }}>
          <Text
            variant="sm_caption_semibold"
            color="grayscale70"
            style={{ width: '7.6rem' }}
          >
            받는 사람
          </Text>
          {storeRecipients.length === 0 ? (
            <button
              type="button"
              onClick={openInviteModal}
              className={styles.emptyRecipients}
            >
              클릭해서 인원을 추가해주세요.
            </button>
          ) : (
            <div className={styles.tags}>
              {storeRecipients.map((u) => (
                <div key={u.id} className={styles.tag}>
                  {u.name}
                  <button
                    type="button"
                    onClick={() => removeRecipient(u.id)}
                    aria-label="삭제"
                    style={{ height: '1.6rem' }}
                  >
                    <IcTagDelete width={16} height={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.section} style={{ marginTop: '1.2rem' }}>
        <Text
          variant="sm_caption_semibold"
          color="grayscale70"
          style={{ width: '7.6rem' }}
        >
          제목
        </Text>
        <input
          className={styles.input}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

        <div className={styles.section}>
          <Text
            variant="sm_caption_semibold"
            color="grayscale70"
            style={{ width: '7.6rem' }}
          >
            파일 첨부
          </Text>
          <label htmlFor="mail-file-upload" className={styles.fileInputWrapper}>
            <Button
              variant="white"
              size="32"
              width="8.5rem"
              leftIcon={<IcFilePlus />}
              onClick={() => fileInputRef.current?.click()}
            >
              업로드
            </Button>
            <input
              ref={fileInputRef}
              id="mail-file-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) =>
                e.target.files?.[0] && setAttachment(e.target.files[0])
              }
            />
            <Flex align="center" gap="0.25rem">
            <IcFilePlus width={16} height={16} />
              <Text variant="sm_caption_medium" color="grayscale20">
                {attachment?.name ??
                  '파일을 마우스로 끌어 오세요 (최대 3MB, 1개)'}
              </Text>
            </Flex>
          </label>
        </div>


      {/* 글자 설정 */}
      <div className={styles.sectionText}>
        <Text
          variant="sm_caption_semibold"
          color="grayscale70"
          style={{ width: '7.6rem' }}
        >
          글자 설정
        </Text>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
    
          }}
        >
        <button
                className={clsx(
                  styles.iconBtn,
                  isMarkActive(editor, 'bold') && styles.activeIcon
                )}
              onClick={() => toggleMark(editor, 'bold')}
              aria-label="굵게"
            >
              <BoldIcon width={18} height={18} />
            </button>
            <button
              className={clsx(
                styles.iconBtn,
                isMarkActive(editor, 'italic') && styles.activeIcon
              )}
              onClick={() => toggleMark(editor, 'italic')}
              aria-label="이탤릭"
            >
              <ItalicIcon width={18} height={18} />
            </button>
            <button
               className={clsx(
                styles.iconBtn,
                isMarkActive(editor, 'underline') && styles.activeIcon
              )}
              onClick={() => toggleMark(editor, 'underline')}
              aria-label="밑줄"
            >
              <UnderlineIcon width={18} height={18} />
            </button>

          {/* 폰트 사이즈 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginLeft: '0.4rem',
            }}
          >
              <button className={styles.iconBtn} aria-hidden="true">
        <TypeIcon width={18} height={18} />
      </button>
            <select
              value={currentFontSize}
              onChange={(e) => {
                const size = e.target.value;
                setCurrentFontSize(size);
                setFontSize(editor, size);
              }}
              style={{
                fontSize: '1.2rem',
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #E0E0E0',
              }}
            >
              <option value="12px">12</option>
              <option value="14px">14</option>
              <option value="16px">16</option>
              <option value="18px">18</option>
              <option value="20px">20</option>
            </select>
          </div>

          {/* 글자 색상 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginLeft: '0.4rem',
            }}
          >
                <button className={styles.iconBtn} aria-hidden="true">
        <PaletteIcon width={18} height={18} />
      </button>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => {
                const color = e.target.value;
                setCurrentColor(color);
                setColor(editor, color);
              }}
              style={{
                width: '2rem',
                height: '2rem',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* 정렬 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginLeft: '0.4rem',
            }}
          >
            <button
              className={clsx(
                styles.iconBtn,
                isAlignActive(editor, 'left') && styles.activeIcon
              )}
              onClick={() => setAlign(editor, 'left')}
              aria-label="왼쪽 정렬"
            >
              <AlignLeft width={20} height={20} />
            </button>
            <button
              className={clsx(
                styles.iconBtn,
                isAlignActive(editor, 'center') && styles.activeIcon
              )}
              onClick={() => setAlign(editor, 'center')}
              aria-label="가운데 정렬"
            >
              <AlignCenter width={20} height={20} />
            </button>
            <button
              className={clsx(
                styles.iconBtn,
                isAlignActive(editor, 'right') && styles.activeIcon
              )}
              onClick={() => setAlign(editor, 'right')}
              aria-label="오른쪽 정렬"
            >
              <AlignRight width={20} height={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 변수 설정 (새 템플릿 생성일 때만) */}

        <div className={styles.section}>
          <Text
            variant="sm_caption_semibold"
            color="grayscale70"
            style={{ width: '7.6rem' }}
          >
            변수 설정
          </Text>
          <Flex align="center" gap="0.8rem">
            {(
              [
                'name',
                'position',
                'interviewRoom',
                'interviewDateTime',
              ] as const
            ).map((v) => (
              <button
                key={v}
                onClick={() => insertVariable(editor, v)}
                style={{ cursor: 'pointer' }}
                className={styles.variableStyles[v]}
              >
                {v === 'name'
                  ? '이름'
                  : v === 'position'
                    ? '지원한 파트명'
                    : v === 'interviewRoom'
                      ? '면접실'
                      : '면접일시'}
              </button>
            ))}
          </Flex>
        </div>


      <div className={styles.section} style={{ marginTop: '1.2rem' }}>
        <RichTextEditor
          editor={editor}
          value={editorValue}
          onChange={(v) => setEditorValue(v)}
          placeholder="내용을 입력해주세요."
        />
      </div>

      <Button
        variant="main"
        size="40"
        width="100%"
        leftIcon={<IcSendBtn />}
        onClick={handleActionClick}
        disabled={isCreating && !newTitle.trim()}
      >
        {actionLabel}
      </Button>
    </SideTab>
  );
}
