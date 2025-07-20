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

  // — 템플릿 목록 가져오기
  const { data: tplSummaries = [] } = useTemplatesQuery('MAIL');
  const [templates, setTemplates] = useState<Template[]>([]);
  useEffect(() => {
    setTemplates(
      tplSummaries.map((t) => ({
        id: String(t.id),
        title: t.name,
        body: '', // body 는 detail 로 따로 불러오니까 빈 문자열로 둡니다
      }))
    );
  }, [tplSummaries]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // — 로컬 받는사람 복사본
  const [localRecipients, setLocalRecipients] = useState<string[]>(recipients);
  useEffect(() => {
    setLocalRecipients(recipients);
  }, [recipients]);

  // — 템플릿 선택/생성 모드
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachment, setAttachment] = useState<File>();

  const editor = useMemo(
    () => withHistory(withReact(withVariables(createEditor()))),
    []
  );
  // — Slate 리치 에디터 값
  const [editorValue, setEditorValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: '' }] },
  ]);

  const tplDetailQ = useTemplateDetailQuery(
    selectedTemplateId ? Number(selectedTemplateId) : -1
  );

  useEffect(() => {
    if (tplDetailQ.data && !isCreating) {
      setSubject(tplDetailQ.data.subject ?? tplDetailQ.data.name);
      // 줄마다 paragraph 로 deserialize
      const nodes = deserializeHtml(tplDetailQ.data.body);
      Transforms.deselect(editor);

      for (let i = editor.children.length - 1; i >= 0; i--) {
        Transforms.removeNodes(editor, { at: [i] });
      }
      Transforms.insertNodes(editor, nodes);

      setEditorValue(nodes);
      Transforms.deselect(editor);
    }
  }, [tplDetailQ.data, isCreating]);

  const sendMail = useBulkMail();
  const createTpl = useCreateTemplate();

  const handleCreate = () => {
    setSelectedTemplateId(null);
    setIsCreating(true);
    setNewTitle('');
    setSubject('');
    setEditorValue([{ type: 'paragraph', children: [{ text: '' }] }]);
  };

  const handleSaveTemplate = () => {
    const html = serializeHtml(editorValue);
    createTpl.mutate(
      {
        name: newTitle,
        subject,
        body: html,
        medium: 'MAIL',
        organizationId: organizationId,
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
        newTitle={newTitle}
        onNewTitleChange={setNewTitle}
        onSelect={(tpl) => {
          setSelectedTemplateId(tpl.id);
          setIsCreating(false);
        }}
        onCreate={handleCreate}
      />

      {/* 받는 사람 */}
      {!isCreating && (
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

      <div className={styles.section}>
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
        onClick={isCreating ? handleSaveTemplate : handleSend}
        disabled={isCreating ? !newTitle.trim() : false}
      >
        {isCreating ? '저장하기' : '보내기'}
      </Button>
    </SideTab>
  );
}
