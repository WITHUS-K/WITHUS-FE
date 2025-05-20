'use client';

import React, { useEffect, useState } from 'react';
import { IcSendBtn } from '@repo/ui/icons/mono';
import {
  IcBold,
  IcItalic,
  IcUnderline,
  IcFilePlus,
} from '@repo/ui/icons/colored';
import * as styles from './MailSideTab.css';
import {
  Template,
  TemplatesAccordion,
} from '../TemplatesAccordion/TemplatesAccordion';
import { SideTab } from '../SideTab/SideTab';
import { IcHeaderMail, IcTagDelete } from '@repo/ui/icons/colored';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { IcFileBtn } from '@repo/ui/icons/mono';

interface MailSideTabProps {
  recipients: string[];
  templates: Template[];
  onClose: () => void;
  onSend: (data: {
    templateId?: string;
    recipients: string[];
    subject: string;
    body: string;
    attachments: File[];
  }) => void;
}

export function MailSideTab({
  recipients,
  templates,
  onClose,
  onSend,
}: MailSideTabProps) {
  // 템플릿 선택
  const [template, setTemplate] = useState<Template | null>(null);
  const [subject, setSubject] = useState(template?.title ?? '');
  const [body, setBody] = useState(template?.body ?? '');
  const [files, setFiles] = useState<File[]>([]);
  // **로컬** 받는 사람 목록 (태그 삭제 반영용)
  const [localRecipients, setLocalRecipients] = useState<string[]>(recipients);
  useEffect(() => setLocalRecipients(recipients), [recipients]);

  // 굵게/이탤릭/밑줄 토글 상태
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <SideTab
      icon={<IcHeaderMail width={24} height={24} />}
      title="메일 전송"
      onClose={onClose}
    >
      {/* 템플릿 아코디언 */}
      <TemplatesAccordion
        templates={templates}
        onSelect={(t) => {
          setTemplate(t);
          setSubject(t.title);
          setBody(t.body);
        }}
        onCreateNew={() => {}}
      />

      {/* 받는 사람 */}
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
                onClick={() =>
                  setLocalRecipients((lst) => lst.filter((x) => x !== r))
                }
                style={{ height: '1.6rem' }}
                aria-label="삭제"
              >
                <IcTagDelete width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 제목 */}
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

      {/* 파일첨부 */}
      <div className={styles.section}>
        <Text
          variant="sm_caption_semibold"
          color="grayscale70"
          style={{ width: '7.6rem' }}
        >
          파일 첨부
        </Text>
        <div className={styles.fileInputWrapper}>
          <Button
            variant="white"
            size="32"
            width="8.5rem"
            leftIcon={<IcFileBtn />}
          >
            업로드
          </Button>
          <input
            id="mail-file-upload"
            type="file"
            className={styles.hiddenInput}
            onChange={(e) => {
              const f = e.target.files;
              setFiles(f ? Array.from(f) : []);
            }}
            multiple={false}
          />
          <Flex align="center" gap="0.25rem">
            <IcFilePlus width={16} height={16} />
            <Text variant="sm_caption_medium" color="grayscale20">
              {files.length > 0
                ? files[0]!.name
                : '파일을 마우스로 끌어 오세요 (최대 3MB, 1개)'}
            </Text>
          </Flex>
        </div>
      </div>

      {/* 글자 설정 툴바 */}
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
            className={`${styles.iconBtn} ${bold ? styles.activeIcon : ''}`}
            onClick={() => setBold((b) => !b)}
            aria-label="굵게"
          >
            <IcBold width={24} height={24} />
          </button>
          <button
            className={`${styles.iconBtn} ${italic ? styles.activeIcon : ''}`}
            onClick={() => setItalic((i) => !i)}
            aria-label="이탤릭"
          >
            <IcItalic width={24} height={24} />
          </button>
          <button
            className={`${styles.iconBtn} ${underline ? styles.activeIcon : ''}`}
            onClick={() => setUnderline((u) => !u)}
            aria-label="밑줄"
          >
            <IcUnderline width={24} height={24} />
          </button>
        </Flex>
      </div>

      {/* 본문 */}
      <div className={styles.section} style={{ marginTop: '1.2rem' }}>
        <textarea
          className={styles.textarea}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="내용을 입력해주세요."
          style={{
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
          }}
        />
      </div>

      {/* 전송 버튼 */}

      <Button
        variant="main"
        size="40"
        width="100%"
        leftIcon={<IcSendBtn />}
        onClick={() =>
          onSend({
            templateId: template?.id,
            recipients,
            subject,
            body,
            attachments: files,
          })
        }
      >
        보내기
      </Button>
    </SideTab>
  );
}
