'use client';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Button } from '@repo/ui/Button';
import { TabBar } from '@repo/ui/TabBar';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcLinkCopy, IcPreview, IcSave } from '@repo/ui/icons/mono';
import { SettingContext } from '@web/app/(main)/application-list/setting/_context/SettingContext';
import { FormValues } from '@web/types/application';
import FormTab from '@web/app/(main)/application-list/setting/_components/FormTab/FormTab';
import StageTab from '@web/app/(main)/application-list/setting/_components/StageTab/StageTab';
import { useDraftRecruitmentMutation } from '@web/store/mutation/useDraftRecruitmentMutation';
import { usePublishRecruitmentMutation } from '@web/store/mutation/usePublishRecruitmentMutation';
import { convertFormToRequest } from '@web/utils/convertFormToRequest';
import * as styles from './SettingForm.css';
import * as C from '@web/constants/application';
import { useToast } from '@repo/ui/hooks';
import CriteriaDocsTab from '../CriteriaTabs/CriteriaDocsTab/CriteriaDocsTab';
import CriteriaInterviewTab from '../CriteriaTabs/CriteriaInterviewTab/CriteriaInterviewTab';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

type TabKey = 'form' | 'stages' | 'docs' | 'interview';
const TAB_KEYS: TabKey[] = ['form', 'stages', 'docs', 'interview'];

interface SettingFormProps {
  existentForm?: Boolean;
  slug?: string;
  organization?: string;
}

export function SettingForm({
  existentForm,
  slug,
  organization,
}: SettingFormProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const didInitCriteria = useRef(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'form';

  const lastSegment = pathname.split('/').pop();
  const isNewPage = lastSegment === 'new';
  const isTemporaryParam = searchParams.get('isTemporary');
  const hasIdParam = lastSegment != null && lastSegment !== 'new';
  const isTemporary = isTemporaryParam === 'true';
  const hasApplicantsParam = searchParams.get('hasApplicants');
  const hasApplicants = hasApplicantsParam === 'true';

  const ctx = useContext(SettingContext)!;
  const toast = useToast();

  const { organizationId } = getClientSideTokens();
  //console.log('id', organizationId);

  const draftMutation = useDraftRecruitmentMutation();
  const publishMutation = usePublishRecruitmentMutation();

  const initial = ctx.form;
  const customParts = initial.applicationParts?.isSelected
    ? initial.applicationParts.parts
    : [];
  // 항상 공통(null) + 사용자 파트 순으로 섹션을 시딩
  const sections = [null, ...customParts];

  const seededPaperEvaluateItems =
    initial.paperEvaluateItems && initial.paperEvaluateItems.length > 0
      ? initial.paperEvaluateItems
      : sections.map((partName) => ({
          positionName: partName,
          items: [{ evaluate: '', evaluateDetail: '' }],
        }));

  const seededInterviewEvaluateItems =
    initial.interviewEvaluateItems && initial.interviewEvaluateItems.length > 0
      ? initial.interviewEvaluateItems
      : sections.map((partName) => ({
          positionName: partName,
          items: [{ evaluate: '', evaluateDetail: '' }],
        }));

  const seeded: FormValues = {
    ...initial,
    paperEvaluateItems: seededPaperEvaluateItems,
    interviewEvaluateItems: seededInterviewEvaluateItems,

    detailItems:
      initial.detailItems && initial.detailItems.length > 0
        ? initial.detailItems
        : [
            {
              required: false,
              type: 'text',
              description: '',
              addDescription: '',
              responseTarget: 0,
              typeInfo: {
                info: C.BLANK_OPTIONS[0]!,
                infoDetail: C.CHAR_LIMITS[2]!,
              },
            },
          ],
  };

  // 1. useForm 초기화 (Context에서 받은 초기값)
  const methods = useForm<FormValues>({
    defaultValues: seeded,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
  });

  console.log('폼', ctx.form);
  /*useEffect(() => {
    if (existentForm) {
      const next = ctx.form;
      methods.reset(next);
    }
  }, [ctx.form, methods]);*/

  useEffect(() => {
    methods.reset(ctx.form);
  }, [ctx.form, methods]);

  const parts = methods.watch('applicationParts.parts') ?? [];

  const paperItems =
    useWatch({ control: methods.control, name: 'paperEvaluateItems' }) || [];
  const interviewItems =
    useWatch({ control: methods.control, name: 'interviewEvaluateItems' }) ||
    [];

  // 서류 평가 기준 동기화
  useEffect(() => {
    const needed = (parts.length > 0 ? parts.length : 0) + 1; // 공통(null) + parts
    if (paperItems.length === needed) return;

    const sectionNames = parts.length > 0 ? [null, ...parts] : [null];
    const newPaper = sectionNames.map((p) => {
      const existing = paperItems.find((sec) => sec.positionName === p);
      return {
        positionName: p,
        items: existing
          ? existing.items
          : [{ evaluate: '', evaluateDetail: '' }],
      };
    });

    methods.setValue('paperEvaluateItems', newPaper, { shouldValidate: false });
  }, [parts, paperItems, methods]);

  //  면접 평가 기준 동기화
  useEffect(() => {
    const needed = (parts.length > 0 ? parts.length : 0) + 1;
    if (interviewItems.length === needed) return;

    const sectionNames = parts.length > 0 ? [null, ...parts] : [null];
    const newInterview = sectionNames.map((p) => {
      const existing = interviewItems.find((sec) => sec.positionName === p);
      return {
        positionName: p,
        items: existing
          ? existing.items
          : [{ evaluate: '', evaluateDetail: '' }],
      };
    });

    methods.setValue('interviewEvaluateItems', newInterview, {
      shouldValidate: false,
    });
  }, [parts, interviewItems, methods]);

  const title = methods.watch('title') || '';
  const basicInfo = methods.watch('basicInfo')!;
  const detailItems = methods.watch('detailItems')!;
  const deadline = methods.watch('deadline')!;
  const interviewDuration = methods.watch('interviewDuration')!;
  const finalResultDate = methods.watch('finalResultDate')!;
  //const paperItems = methods.watch('paperEvaluateItems')!;
  //const interviewItems = methods.watch('interviewEvaluateItems')!;

  const last = pathname.split('/').pop()!;
  const recruitmentId = last === 'new' ? null : Number(last);

  const hasParts = methods.watch('applicationParts.isSelected') === true;

  // 개별 검증
  const isTitleOk = !!title.trim();
  const isBasicInfoOk = true;
  const isDetailItemsOk =
    detailItems.length > 0 &&
    detailItems.every((d) => d.description.trim().length > 0);
  const isDeadlineOk = !!deadline;
  const isDurationOk = !!interviewDuration;
  const isFinalOk = !!finalResultDate;
  const isPaperOk =
    paperItems.length > 0 &&
    paperItems.every((section) => {
      if (section.positionName === null && hasParts) {
        return true; // 파트가 있으면 공통 무시
      }
      return (
        section.items.length > 0 &&
        section.items.every((item) => item.evaluate.trim().length > 0)
      );
    });
  const isInterviewOk =
    interviewItems.length > 0 &&
    interviewItems.every((section) => {
      if (section.positionName === null && hasParts) {
        return true; // 파트가 있으면 공통 무시
      }
      return (
        section.items.length > 0 &&
        section.items.every((item) => item.evaluate.trim().length > 0)
      );
    });

  // 최종 버튼 활성 조건
  const canSubmit =
    isTitleOk &&
    isBasicInfoOk &&
    isDetailItemsOk &&
    isDeadlineOk &&
    isDurationOk &&
    isFinalOk &&
    isPaperOk &&
    isInterviewOk;

  // 탭 & 버튼 핸들러
  const onTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePreview = useCallback(() => {
    ctx.setForm(methods.getValues());

    router.push(`${pathname}/preview`);
  }, [ctx, methods, router, pathname]);

  const handleCopyLink = useCallback(() => {
    if (!slug || !organization) return;
    const url = `${window.location.origin}/apply/${organization}/${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('응답자에게 보낼 링크가 복제됐습니다.'))
      .catch(() => toast.error('링크 복사에 실패했습니다.'));
  }, [slug, organization, toast]);

  const handleSave = useCallback(() => {
    const values = methods.getValues();
    const payload = convertFormToRequest(values, recruitmentId, organizationId);
    //console.log('임시 저장:', payload);
    draftMutation.mutate(payload, {
      onSuccess: (res) => {
        /*if (pathname.endsWith('/new')) {
          router.replace(`/application-list/setting/${res.recruitmentId}`);
        }*/
        toast.success('임시 저장 되었습니다.');
      },
      onError: (err) => {
        console.error('임시 저장 실패', err);
      },
    });
  }, [draftMutation, methods, pathname, router, recruitmentId]);

  const onSubmit = useCallback(
    (data: FormValues) => {
      const payload = convertFormToRequest(data, recruitmentId, organizationId);
      // console.log('최종 저장:', payload);
      publishMutation.mutate(payload, {
        onSuccess: () => {
          router.push('/application-list');
        },
      });
    },
    [publishMutation, router, recruitmentId]
  );

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <Breadcrumb style={{ marginTop: '1.2rem' }}>
          <Breadcrumb.Item asChild>
            <Link href="/application-list">지원서 목록</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>지원서 생성</Breadcrumb.Item>
        </Breadcrumb>

        <Flex
          align="center"
          width="100%"
          justify="spaceBetween"
          marginTop="2.4rem"
          marginBottom="2.4rem"
        >
          <Text variant="xl_title_semibold" color="black">
            지원서 생성
          </Text>
          <Flex gap="0.8rem">
            <Button
              variant="sub"
              leftIcon={<IcLinkCopy />}
              size="40"
              width="14.6rem"
              disabled={isTemporary || isNewPage}
              onClick={handleCopyLink}
            >
              응답자 링크
            </Button>
            <Button
              variant="sub"
              leftIcon={<IcPreview />}
              onClick={handlePreview}
              size="40"
              width="12.8rem"
            >
              미리보기
            </Button>
            <Button
              variant="sub"
              leftIcon={<IcSave />}
              size="40"
              width="13.2rem"
              onClick={handleSave}
              disabled={hasApplicants || (!isTemporary && hasIdParam)}
            >
              임시 저장
            </Button>
            <Button
              variant="main"
              type="submit"
              form="application-form"
              disabled={hasApplicants || !canSubmit}
              size="40"
              width="10rem"
            >
              완료
            </Button>
          </Flex>
        </Flex>

        {/* Tabs */}
        <TabBar
          tabs={TAB_KEYS}
          active={activeTab}
          onChange={onTabChange}
          showIndicator
        />

        {/* Form */}
        <div className={styles.scrollArea} ref={scrollAreaRef}>
          <form
            id="application-form"
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', width: '100%' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            {activeTab === 'form' && <FormTab />}
            {activeTab === 'stages' && (
              <StageTab scrollContainerRef={scrollAreaRef} />
            )}
            {activeTab === 'docs' && <CriteriaDocsTab />}
            {activeTab === 'interview' && <CriteriaInterviewTab />}
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
