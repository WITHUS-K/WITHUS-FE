'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IcSendBtn } from '@repo/ui/icons/mono';
import {
  IcBold,
  IcItalic,
  IcUnderline,
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
import { Descendant, Editor, Transforms, createEditor } from 'slate';
import {
  RichTextEditor,
  insertVariable,
  toggleMark,
  withVariables,
} from '../RichTextEditor/RichTextEditor';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { serializeHtml } from '@web/utils/serializers';
import { deserializeHtml } from '@web/utils/deserializeHtml';
import { getCookie } from 'cookies-next';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useModal } from '@repo/ui/hooks';

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

  const [localRecipients, setLocalRecipients] = useState<string[]>(recipients);
  useEffect(() => {
    setLocalRecipients(recipients);
  }, [recipients]);

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

  // 선택된 템플릿 상세
  const tplDetailQ = useTemplateDetailQuery(
    selectedTemplateId ? Number(selectedTemplateId) : -1
  );

  useEffect(() => {
    if (tplDetailQ.data && !isCreating) {
      setSubject(tplDetailQ.data.subject ?? tplDetailQ.data.name);
      const nodes = deserializeHtml(tplDetailQ.data.body);

      Transforms.deselect(editor);
      for (let i = editor.children.length - 1; i >= 0; i--) {
        Transforms.removeNodes(editor, { at: [i] });
      }
      Transforms.insertNodes(editor, nodes);
      setEditorValue(nodes);
      Transforms.deselect(editor);
    }
  }, [tplDetailQ.data, isCreating, editor]);

  const sendMail = useBulkMail();
  const createTpl = useCreateTemplate();
  // TODO: 업데이트용 mutation 준비되면 연결
  // const updateTpl = useUpdateTemplate();

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
    // 제목은 그대로 두고, body/subject 는 tplDetailQ effect 가 채워줍니다.
  };

  // 삭제
  const handleDelete = (tpl: Template) => {
    confirm({
      type: 'warning',
      description: '해당 템플릿을 삭제하시겠습니까?',
      cancelText: '취소',
      confirmText: '삭제',
      onConfirm: () => {
        // TODO: 삭제 API 연동
        // deleteTpl.mutate(tpl.id, { onSuccess: ... })

        setTemplates((prev) => prev.filter((item) => item.id !== tpl.id));

        if (selectedTemplateId === tpl.id) {
          setSelectedTemplateId(null);
          setSubject('');
          setEditorValue([
            { type: 'paragraph', children: [{ text: '' }] },
          ]);
        }
      },
    });
  };

  const handleSaveTemplate = () => {
    const html = serializeHtml(editorValue);
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

    // TODO: 실제 수정 API 나오면 여기서 호출
    // updateTpl.mutate(
    //   {
    //     id: Number(selectedTemplateId),
    //     name: /* 필요시 제목 */,
    //     subject,
    //     body: html,
    //     medium: 'MAIL',
    //     organizationId,
    //   },
    //   { onSuccess: ... }
    // );

    // 지금은 로컬 state 만 갱신
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === selectedTemplateId ? { ...t, body: html } : t
      )
    );
    setIsEditing(false);
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
      { onSuccess: () => onClose() }
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

  return (
    <SideTab
      icon={<IcHeaderMail width={24} height={24} />}
      title="메일 전송"
      onClose={onClose}
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
      {!isCreating && !isEditing &&  (
        <div className={styles.section} style={{ marginTop: '1.2rem' }}>
          <Text
            variant="sm_caption_semibold"
            color="grayscale70"
            style={{ width: '7.6rem' }}
          >
            받는 사람
          </Text>
          <div className={styles.tags}>
            {localRecipients.map((r) => (
              <div key={r} className={styles.tag}>
                {r}
                <button
                  onClick={() => {
                    setLocalRecipients((prev) =>
                      prev.filter((item) => item !== r)
                    );
                  }}
                  aria-label="삭제"
                  style={{ height: '1.6rem' }}
                >
                  <IcTagDelete width={16} height={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
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

      {!isCreating && (
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
      )}

      <div className={styles.sectionText}>
        <Text
          variant="sm_caption_semibold"
          color="grayscale70"
          style={{ width: '7.6rem' }}
        >
          글자 설정
        </Text>
        <Flex align="center" gap="0.8rem">
          <button
            className={styles.iconBtn}
            onClick={() => toggleMark(editor, 'bold')}
            aria-label="굵게"
          >
            <IcBold width={24} height={24} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => toggleMark(editor, 'italic')}
            aria-label="이탤릭"
          >
            <IcItalic width={24} height={24} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => toggleMark(editor, 'underline')}
            aria-label="밑줄"
          >
            <IcUnderline width={24} height={24} />
          </button>
        </Flex>
      </div>

      {isCreating && (
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
      )}

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
