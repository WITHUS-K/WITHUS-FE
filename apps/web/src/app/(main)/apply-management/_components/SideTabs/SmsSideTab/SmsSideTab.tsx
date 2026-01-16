'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IcSendBtn } from '@repo/ui/icons/mono';
import { IcHeaderSms, IcFilePlus, IcTagDelete } from '@repo/ui/icons/colored';
import * as styles from '../MailSideTab/MailSideTab.css';
import { SideTab } from '../SideTab/SideTab';
import {
  TemplatesAccordion,
  Template,
} from '../TemplatesAccordion/TemplatesAccordion';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { IcFileBtn } from '@repo/ui/icons/mono';
import { useBulkSms } from '@web/store/mutation/useBulkSms';
import { useCreateTemplate } from '@web/store/mutation/useCreateTemplate';
import {
  useTemplatesQuery,
  TemplateDetail,
} from '@web/store/query/useTemplatesQuery';
import { useTemplateDetailQuery } from '@web/store/query/useTemplateDetailQuery';

import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import {
  RichTextEditor,
  insertVariable,
  serialize,
  withVariables,
} from '../RichTextEditor/RichTextEditor';
import { deserializeHtml } from '@web/utils/deserializeHtml';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useModal } from '@repo/ui/hooks';
import { useRecipientsStore } from '@web/store/state/useRecipientsStore';
import { useUpdateTemplate } from '@web/store/mutation/useUpdateTemplate';
import { useDeleteTemplate } from '@web/store/mutation/useDeleteTemplate';

function ensureParagraph(html: string) {
  const trimmed = html.trim();
  if (!trimmed) return '<p></p>';

  // 이미 <p>로 시작/끝나면 그대로
  if (trimmed.startsWith('<p') && trimmed.endsWith('</p>')) {
    return trimmed;
  }

  return `<p>${trimmed}</p>`;
}

interface SmsSideTabProps {
  applicationIds: number[];
  recipients: string[];
  onClose: () => void;
}

export function SmsSideTab({ applicationIds, recipients, onClose }: SmsSideTabProps) {
  const { organizationId } = getClientSideTokens();
  const { confirm } = useModal();

  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();

  const tab = Array.isArray(params.tab) ? params.tab[0] : (params.tab as string);
  const recruitmentId = search.get('recruitmentId');
  const sideTab = search.get('sideTab') ?? 'sms'; 

  const openInviteModal = () => {
    if (!recruitmentId) return;
    router.push(
      `/apply-management/${tab}/invite-recipients?recruitmentId=${recruitmentId}&sideTab=${sideTab}`
    );
  };

  const {
    recipients: storeRecipients,
    removeRecipient,
    mergeRecipients,
    clearRecipients,
  } = useRecipientsStore();

  useEffect(() => {
    const seeds = (recipients ?? [])
      .filter(Boolean)
      .map((name, idx) => ({
        id: `seed-sms-${idx}-${name}`,
        name,
        email: '', 
      }));

    mergeRecipients(seeds, 'name');
  }, [recipients, mergeRecipients]);

  

  const handleClose = () => {
    clearRecipients();
    onClose();
  };

  const { data: tplSummaries = [] } = useTemplatesQuery('SMS');
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
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const [attachment, setAttachment] = useState<File>();

  const editor = useMemo(() => withHistory(withReact(withVariables(createEditor()))), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: '' }] },
  ]);

  const tplDetailQ = useTemplateDetailQuery(selectedTemplateId ? Number(selectedTemplateId) : -1);
  useEffect(() => {
    if (!selectedTemplateId) return;
    if (!tplDetailQ.data) return;
    if (isCreating) return;
  
    const nodes = deserializeHtml(tplDetailQ.data.body);
    setEditorValue(nodes);
  }, [selectedTemplateId, tplDetailQ.data, isCreating]);

  const sendSms = useBulkSms();
  const createTpl = useCreateTemplate();
  const updateTpl = useUpdateTemplate();
  const deleteTpl = useDeleteTemplate();
  
  const EMPTY_NODES: Descendant[] = [
    { type: 'paragraph', children: [{ text: '' }] },
  ];

  const resetEditorTo = (nodes: Descendant[]) => {
    setEditorValue(nodes);
  };

  const resetCreateDraft = () => {
    setSelectedTemplateId(null);
    setAttachment(undefined);
    setNewTitle('');
    resetEditorTo(EMPTY_NODES);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    resetCreateDraft();
  };

  const handleSelect = (tpl: Template) => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedTemplateId(tpl.id);
  };

  const handleEdit = (tpl: Template) => {
    setSelectedTemplateId(tpl.id);
    setIsCreating(false);
    setIsEditing(true);
  };

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
            medium: 'SMS',
          },
          {
            onSuccess: () => {
              setTemplates((prev) => prev.filter((t) => t.id !== tpl.id));
  
              if (selectedTemplateId === tpl.id) {
                setSelectedTemplateId(null);
                setEditorValue([{ type: 'paragraph', children: [{ text: '' }] }]);
              }
            },
          }
        );
      },
    });
  };

  const handleSaveTemplate = () => {
    const body = ensureParagraph(serialize(editorValue));

    createTpl.mutate(
      {
        name: newTitle,
        body,
        medium: 'SMS',
        organizationId,
      },
      {
        onSuccess: (newTpl: TemplateDetail) => {
          setTemplates((prev) => [
            ...prev,
            { id: String(newTpl.id), title: newTpl.name, body: newTpl.body },
          ]);
          setSelectedTemplateId(String(newTpl.id));
          setIsCreating(false);
        },
      }
    );
  };

  const handleUpdateTemplate = () => {
    const body = ensureParagraph(serialize(editorValue));
    if (!selectedTemplateId) return;
  
    updateTpl.mutate(
      {
        templateId: Number(selectedTemplateId),
        name: newTitle.trim() || tplSummaries.find((t) => String(t.id) === selectedTemplateId)?.name || '',
        body,
        medium: 'SMS',
        subject: undefined,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
  
          setTemplates((prev) =>
            prev.map((t) =>
              t.id === selectedTemplateId
                ? { ...t, title: newTitle.trim() || t.title, body }
                : t
            )
          );
        },
      }
    );
  };

  const handleSend = () => {
    const rawHtml = serialize(editorValue);
    const message = ensureParagraph(rawHtml);
  
    sendSms.mutate(
      {
        applicationIds,
        message,
        attachment,
      },
      {
        onSuccess: () => {
          clearRecipients();
          onClose();
        },
      }
    );
  };

  const actionLabel = isCreating ? '저장하기' : isEditing ? '수정하기' : '보내기';

  const handleActionClick = () => {
    if (isCreating) handleSaveTemplate();
    else if (isEditing) handleUpdateTemplate();
    else handleSend();
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    resetCreateDraft();
  };

  return (
    <SideTab
      icon={<IcHeaderSms width={24} height={24} />}
      title="문자 전송"
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
        onCancelCreate={handleCancelCreate} 
      />

  
      {!isCreating && !isEditing && (
        <div className={styles.section} style={{ marginTop: '1.2rem' }}>
          <Text variant="sm_caption_semibold" color="grayscale70" style={{ width: '7.6rem' }}>
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
          <Text variant="sm_caption_semibold" color="grayscale70" style={{ width: '7.6rem' }}>
            파일 첨부
          </Text>
          <label htmlFor="sms-file-upload" className={styles.fileInputWrapper}>
            <Button variant="white" size="32" width="8.5rem" leftIcon={<IcFileBtn />} onClick={() => fileInputRef.current?.click()}>
              업로드
            </Button>
            <input
             ref={fileInputRef}
              id="sms-file-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => e.target.files?.[0] && setAttachment(e.target.files[0])}
            />
            <Flex align="center" gap="0.25rem">
              <IcFilePlus width={16} height={16} />
              <Text variant="sm_caption_medium" color="grayscale20">
                {attachment?.name ?? '파일을 마우스로 끌어 오세요 (최대 3MB, 1개)'}
              </Text>
            </Flex>
          </label>
        </div>
  

        <div className={styles.section} >
          <Text variant="sm_caption_semibold" color="grayscale70" style={{ width: '7.6rem' }}>
            변수 설정
          </Text>
          <Flex align="center" gap="0.8rem" width='100%'>
            {(['name', 'position', 'interviewRoom', 'interviewDateTime'] as const).map((v) => (
              <button
              type="button"
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
          onChange={setEditorValue}
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
