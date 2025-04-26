'use client';
import React from 'react';
import { Text, Flex } from '@repo/ui';
import { Comment } from '../../../../../../../../../packages/ui/src/components/Comment/Comment';
import { FileUploader } from '../../../../../../../../../packages/ui/src/components/FileUploader/FileUploader';
import { List } from '../../../../../../../../../packages/ui/src/components/List/List';
import { AccordianList } from '../../../../../../../../../packages/ui/src/components/List/AccordianList/AccordianList';
import { ApplicantDetail } from '../../../data';
import * as styles from './ApplicantDetailContent.style';
import { Divider } from 'node_modules/@repo/ui/src/components/Divider/Divider';

interface Props {
  detail: ApplicantDetail;
  introCount: number;
  openIdx: number | null;
  toggle: (idx: number) => void;
}

export const ApplicantDetailContent: React.FC<Props> = ({
  detail,
  introCount,
  openIdx,
  toggle,
}) => (
  <div className={styles.content}>
    <section aria-labelledby="self-intro-and-portfolio">
      <Text variant="lg_subtitle_semibold" color="grayscale90">
        자기소개서 & 포트폴리오
      </Text>

      <Flex
        direction="column"
        align="flexStart"
        gap="1.6rem"
        style={{ marginTop: '2.4rem' }}
      >
        <Text variant="md2_text_semibold" color="grayscale70">
          자기소개서 문항
        </Text>
        {detail.selfIntroductionContent.content.map((item, idx) => (
          <AccordianList
            key={item.question}
            item={{
              title: item.question,
              content: item.standardDetail,
              reviewers: [],
            }}
            index={idx}
            isOpen={openIdx === idx}
            onToggle={() => toggle(idx)}
          />
        ))}
      </Flex>

      <Flex
        direction="column"
        align="flexStart"
        gap="1.6rem"
        style={{ margin: '3.2rem 0 4rem 0' }}
      >
        <Text variant="md2_text_semibold" color="grayscale70">
          포트폴리오
        </Text>
        <FileUploader file={detail.portfolioFile} onDownload={() => {}} />
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
        style={{ marginTop: '4rem' }}
      >
        <Text variant="md2_text_semibold" color="grayscale70">
          면접 질문
        </Text>
        {detail.interviewQuestions.map((qes) => (
          <List
            key={qes.name}
            question={qes.question}
            src={qes.src}
            alt={qes.alt}
            name={qes.name}
          />
        ))}
      </Flex>

      <Flex
        direction="column"
        align="flexStart"
        gap="1.6rem"
        style={{ margin: '3.2rem 0 4rem 0' }}
      >
        <Text variant="md2_text_semibold" color="grayscale70">
          면접 평가
        </Text>
        {detail.interviewContent.content.map((evalItem, i) => {
          const idx = introCount + i;
          return (
            <AccordianList
              key={evalItem.question}
              item={{
                title: evalItem.question,
                content: evalItem.standardDetail,
                reviewers: evalItem.reviewers,
              }}
              index={idx}
              isOpen={openIdx === idx}
              onToggle={() => toggle(idx)}
            />
          );
        })}
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
        style={{ marginTop: '4rem' }}
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
        style={{ margin: '3.2rem 0 4rem 0' }}
      >
        <Text variant="md2_text_semibold" color="grayscale70">
          면접 평가
        </Text>
        <div className={styles.comment}>
          {detail.interviewComments.map((c, i) => (
            <React.Fragment key={c.comment}>
              <Comment user={c.user} comment={c.comment} />
              {i < detail.docsComments.length - 1 && (
                <Divider borderColor="grayscale10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </Flex>
    </section>
  </div>
);
