'use client';
import { Button, Flex, Text } from '@repo/ui';
import { SearchInput } from '@repo/ui/SearchInput';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { IcFileUpload, IcRefresh } from '@repo/ui/icons/mono';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecruitmentCard } from './_components/RecruitmentCard/RecruitmentCard';
import { useRecruitmentsQuery } from '@web/store/query/useRecruitmentsQuery';
import { usePublishRecruitmentMutation } from '@web/store/mutation/usePublishRecruitmentMutation';
import { useDeleteRecruitmentMutation } from '@web/store/mutation/useDeleteRecruitmentMutation';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import {
  FileQuestionDto,
  PublishRecruitmentRequest,
  TextQuestionDto,
} from '@web/types/recruitment';

export default function ApplicationList() {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const {
    data: recruitments = [],
    isFetching,
    refetch,
  } = useRecruitmentsQuery(search);
  useEffect(() => {
    console.log('🏷 recruitments:', recruitments);
    // console.error('❌ error:', error);
  }, [recruitments]);

  const publishMutation = usePublishRecruitmentMutation();
  const deleteMutation = useDeleteRecruitmentMutation();

  const [copyId, setCopyId] = useState<number | null>(null);

  const { data: copyDetail } = useRecruitmentDetailQuery(copyId);

  useEffect(() => {
    if (!copyDetail) return;

    const applicationQuestions = copyDetail.applicationQuestions.map((q) => {
      if (q.type === 'TEXT') {
        return {
          type: 'TEXT' as const,
          title: q.title,
          description: q.description,
          required: q.required,
          positionName: q.positionName,
          textLimit: (q as TextQuestionDto).textLimit,
          includeWhitespace: (q as TextQuestionDto).includeWhitespace,
        };
      } else {
        return {
          type: 'FILE' as const,
          title: q.title,
          description: q.description,
          required: q.required,
          positionName: q.positionName,
          maxFileCount: (q as FileQuestionDto).maxFileCount,
          maxFileSizeMb: (q as FileQuestionDto).maxFileSizeMb,
        };
      }
    });

    const payload: PublishRecruitmentRequest = {
      recruitmentId: null,
      title: copyDetail.title + '_사본',
      content: copyDetail.content,
      fileUrl: copyDetail.fileUrl,

      positions: copyDetail.positions.map((p) => p.name),

      applicationQuestions: applicationQuestions,

      documentDeadline: copyDetail.documentDeadline,
      documentResultDate: copyDetail.documentResultDate,
      finalResultDate: copyDetail.finalResultDate,
      interviewDuration: copyDetail.interviewDuration,

      organizationId: copyDetail.organizationId,

      needGender: copyDetail.needGender,
      needAddress: copyDetail.needAddress,
      needSchool: copyDetail.needSchool,
      needBirthDate: copyDetail.needBirthDate,
      needMajor: copyDetail.needMajor,
      needAcademicStatus: copyDetail.needAcademicStatus,

      documentScaleType: copyDetail.documentScaleType,
      interviewScaleType: copyDetail.interviewScaleType,

      documentEvaluationCriteria: copyDetail.documentEvaluationCriteria.map(
        (c) => ({
          content: c.content,
          description: c.description,
          type: c.type,
        })
      ),

      interviewEvaluationCriteria: copyDetail.interviewEvaluationCriteria.map(
        (c) => ({
          content: c.content,
          description: c.description,
          type: c.type,
        })
      ),

      availableTimeRanges: copyDetail.availableTimeRanges.map((r) => ({
        date: r.date,
        startTime: r.startTime,
        endTime: r.endTime,
      })),
    };

    publishMutation.mutate(payload);
    setCopyId(null);
  }, [copyDetail, publishMutation]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleModify = (recruitmentId: number) => {
    router.push(`/application-list/setting/${recruitmentId}`);
  };

  return (
    <Flex
      direction="column"
      paddingLeft="2.4rem"
      paddingTop="1.8rem"
      paddingRight="2.4rem"
      paddingBottom="1.8rem"
      width="100%"
    >
      <Breadcrumb style={{ marginBottom: '2.4rem' }}>
        <Breadcrumb.Item active>지원서 리스트</Breadcrumb.Item>
      </Breadcrumb>

      <Text variant="xl_title_semibold" color="black">
        지원서 리스트
      </Text>

      <Flex
        align="center"
        justify="spaceBetween"
        width="100%"
        marginTop="1.2rem"
      >
        <Flex gap="0.8rem">
          <SearchInput
            placeholder="검색"
            value={search}
            onChange={onSearchChange}
            onClick={() => refetch()}
            width="30rem"
          />
          <Button
            variant="white"
            size="40"
            width="4rem"
            style={{ alignSelf: 'center', paddingTop: '0.4rem' }}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <IcRefresh width={16} height={16} />
          </Button>
        </Flex>

        <Button
          variant="main"
          size="48"
          width="14.6rem"
          leftIcon={<IcFileUpload width={24} height={24} />}
          onClick={() => router.push(`/application-list/setting/new`)}
        >
          <Text variant="md2_text_medium" color="white">
            지원서 생성
          </Text>
        </Button>
      </Flex>

      <Flex direction="column" gap="1.2rem" marginTop="1.2rem" width="100%">
        {recruitments.map((item) => {
          const deadline = new Date(item.documentDeadline.replace(/\./g, '-'));
          const today = new Date();
          const diffDays = Math.ceil(
            (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );

          const handleCopy = () => {
            setCopyId(item.recruitmentId);
          };

          return (
            <RecruitmentCard
              key={item.recruitmentId}
              id={item.recruitmentId.toString()}
              recruitTitle={item.title}
              dueDate={item.documentDeadline}
              recruitLink={item.urlSlug}
              count={diffDays}
              currentApplicantList={item.positionSummaries.map((ps) => ({
                position: ps.name,
                numOfApplicant: ps.applicantCount,
              }))}
              onModify={() => handleModify(item.recruitmentId)}
              onCopy={handleCopy}
              onDelete={() => deleteMutation.mutate(item.recruitmentId)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
