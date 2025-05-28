'use client';
import React from 'react';
import * as styles from './ApplicantDetailContent.css';
import { Applicant } from '@web/constants/timetable';
import { AccordianList, List } from '@repo/ui/List';
import { Divider } from '@repo/ui/Divider';
import { Comment } from '@repo/ui/Comment';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { FileUploader } from '@repo/ui/FileUploader';
import { useFileDownload } from '@web/store/mutation/useFileDownload';

export interface FileInfo {
  name: string;
  size: number;
  downloadUrl?: string;
}

interface ApplicantDetailContentProps {
  detail: Applicant;
}

export const ApplicantDetailContent = ({
  detail,
}: ApplicantDetailContentProps) => {
  const download = useFileDownload();

  const handlePortfolioDownload = (file: FileInfo) => {
    download.mutate({
      imageUrl: file.downloadUrl!,
      fileName: file.name,
    });
  };

  return (
    <div className={styles.content}>
      <section aria-labelledby="self-intro-and-portfolio">
        <Text variant="lg_subtitle_semibold" color="grayscale90">
          자기소개서 & 포트폴리오
        </Text>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          width="100%"
          marginTop="2.4rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            자기소개서 문항
          </Text>

          <AccordianList
            items={detail.selfIntroductionContent.content
              .filter((q) => q.questionType === 'TEXT')
              .map((q) => ({
                title: q.question,
                content: q.standardDetail,
                reviewers: [],
              }))}
            isNumbering
            width="100%"
          />
        </Flex>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="3.2rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            포트폴리오
          </Text>
          <FileUploader
            file={detail.portfolioFile}
            onDownload={handlePortfolioDownload}
          />
        </Flex>
      </section>

      <Divider borderColor="grayscale10" />

      <section aria-labelledby="interview-info">
        <Text variant="lg_subtitle_semibold" color="grayscale90">
          면접
        </Text>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="4rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            면접 질문
          </Text>
          {detail.interviewQuestions.map((q, i) => (
            <List
              key={q.question}
              question={q.question}
              src={q.src}
              alt={q.alt}
              name={q.name}
              idx={i + 1}
            />
          ))}
        </Flex>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="3.2rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            면접 평가
          </Text>

          <AccordianList
            items={detail.interviewContent.content.map((e) => ({
              title: e.question,
              content: e.standardDetail,
              reviewers: e.reviewers,
            }))}
            isNumbering={false}
            width="100%"
          />
        </Flex>
      </section>

      <Divider borderColor="grayscale10" />

      <section aria-labelledby="comment-content">
        <Text variant="lg_subtitle_semibold" color="grayscale90">
          코멘트
        </Text>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="4rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            서류 평가
          </Text>
          <div className={styles.comment}>
            {detail.docsComments.map((c, i) => (
              <React.Fragment key={c.comment}>
                <Comment user={c.user} comment={c.comment} />
                {i < detail.docsComments.length - 1 && (
                  <Divider borderColor="grayscale10" />
                )}
              </React.Fragment>
            ))}
          </div>
        </Flex>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="3.2rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            면접 평가
          </Text>
          <div className={styles.comment}>
            {detail.interviewComments.map((c, i) => (
              <React.Fragment key={c.comment}>
                <Comment user={c.user} comment={c.comment} />
                {i < detail.interviewComments.length - 1 && (
                  <Divider borderColor="grayscale10" />
                )}
              </React.Fragment>
            ))}
          </div>
        </Flex>
      </section>
    </div>
  );
};
