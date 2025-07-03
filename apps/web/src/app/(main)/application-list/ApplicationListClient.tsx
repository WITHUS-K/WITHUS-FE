'use client';
import { Button, Flex, Text } from '@repo/ui';
import { SearchInput } from '@repo/ui/SearchInput';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { IcFileUpload, IcRefresh } from '@repo/ui/icons/mono';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecruitmentCard } from './_components/RecruitmentCard/RecruitmentCard';
import { useDeleteRecruitmentMutation } from '@web/store/mutation/useDeleteRecruitmentMutation';
import { useRecruitmentsListQuery } from '@web/store/query/useRecruitmentsListQuery';
import { useModal, useToast } from '@repo/ui/hooks';

export default function ApplicationListClient() {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const { confirm } = useModal();
  const toast = useToast();

  const {
    data: recruitments,
    isFetching,
    refetch,
  } = useRecruitmentsListQuery(search);

  const deleteMutation = useDeleteRecruitmentMutation();

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleModify = (recruitmentId: number) => {
    router.push(`/application-list/setting/${recruitmentId}`);
  };

  const handleCopy = (slug: string, organization: string) => {
    const url = `${window.location.origin}/apply/${organization}/${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('응답자 링크가 복사되었습니다!'))
      .catch(() => toast.error('복사에 실패했습니다.'));
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
          지원서 생성
        </Button>
      </Flex>

      <Flex direction="column" gap="1.2rem" marginTop="1.2rem" width="100%">
        {recruitments?.map((item) => {
          const deadline = new Date(item.documentDeadline.replace(/\./g, '-'));
          const today = new Date();
          const diffDays = Math.ceil(
            (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );

          //console.log('리스트', item);

          const handleDelete = () => {
            confirm({
              type: 'warning',
              title: '모집 공고 삭제',
              description: `${item.title} 모집 공고를\n 정말 삭제 하시겠습니까?`,
              cancelText: '취소',
              confirmText: '삭제',
              onConfirm: () => deleteMutation.mutate(item.recruitmentId),
            });
          };

          return (
            <RecruitmentCard
              key={item.recruitmentId}
              id={item.recruitmentId.toString()}
              recruitTitle={item.title}
              dueDate={item.documentDeadline}
              recruitLink={`${window.location.origin}/apply/${item.organizationName}/${item.urlSlug}`}
              count={diffDays}
              currentApplicantList={item.positionSummaries.map((ps) => ({
                position: ps.name,
                numOfApplicant: ps.applicantCount,
              }))}
              isTemporary={item.isTemporary}
              onModify={() => handleModify(item.recruitmentId)}
              onCopy={() => handleCopy(item.urlSlug, item.organizationName)}
              onDelete={handleDelete}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
