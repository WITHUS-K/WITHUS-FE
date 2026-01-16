'use client';
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import {
  useSearchParams,
  useRouter,
  useSelectedLayoutSegments,
  useParams,
} from 'next/navigation';
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
import { buildRecruitUrl } from '@web/utils/url';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';

type TabKey = 'form' | 'stages' | 'docs' | 'interview';
const TAB_KEYS: TabKey[] = ['form', 'stages', 'docs', 'interview'];
type Params = { id?: string | string[] };

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
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'form';

  const recruitmentIdFromQuery = searchParams.get('recruitmentId');
  const recruitmentIdFromQueryNum =
    recruitmentIdFromQuery && !Number.isNaN(Number(recruitmentIdFromQuery))
      ? Number(recruitmentIdFromQuery)
      : null;
  
  // 기존 로직(segments leaf)로 계산한 id
  const segs = useSelectedLayoutSegments();
  const leaf = segs.at(-1) ?? 'new';
  const params = useParams<{ id?: string | string[] }>();
  const idRaw = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const isNewPage = !idRaw || idRaw === 'new';
  const recruitmentIdFromPath = isNewPage ? null : Number(leaf);
  


  const hasIdParam = !!leaf && leaf !== 'new';
  const currentId = idRaw ?? 'new';
  //const recruitmentId = isNewPage ? null : Number(leaf);
  const basePath = `/application-list/setting/${currentId}`;
  const recruitmentId =
  currentId === 'new' ? null : Number(currentId);
  const isTemporaryParam = searchParams.get('isTemporary');
  const isTemporary = isTemporaryParam === 'true';
  const hasApplicantsParam = searchParams.get('hasApplicants');
  const hasApplicants = hasApplicantsParam === 'true';

  const ctx = useContext(SettingContext)!;
  const toast = useToast();

  const { organizationId } = getClientSideTokens();

  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });

const roleNameById = useMemo(() => {
  const m = new Map<number, string>();
  (rolesData?.roles ?? []).forEach((r) => m.set(r.id, r.roleName));
  return m;
}, [rolesData]);


  const draftMutation = useDraftRecruitmentMutation();
  const publishMutation = usePublishRecruitmentMutation();

  const initial = ctx.form;
  const initialRoleIds = initial.applicationParts?.isSelected
  ? initial.applicationParts.parts
  : [];

// ✅ seeded에 쓸 roleNames
const initialRoleNames = useMemo(() => {
  return initialRoleIds
    .map((id) => roleNameById.get(id))
    .filter(Boolean) as string[];
}, [initialRoleIds, roleNameById]);

const seededSectionNames: Array<string | null> =
  initialRoleNames.length > 0 ? [...initialRoleNames] : [null];

  const customParts = initial.applicationParts?.isSelected
    ? initial.applicationParts.parts
    : [];
  const sections = customParts.length > 0 ? [...customParts] : [null];

  const seededPaperEvaluateItems =
  initial.paperEvaluateItems?.length
    ? initial.paperEvaluateItems
    : initialRoleIds.length > 0
    ? initialRoleIds.map((roleId) => ({
        organizationRoleId: roleId,
        items: [{ evaluate: '', evaluateDetail: '' }],
      }))
    : [
        {
          organizationRoleId: 0, // 공통
          items: [{ evaluate: '', evaluateDetail: '' }],
        },
      ];


      const seededInterviewEvaluateItems =
      initial.interviewEvaluateItems && initial.interviewEvaluateItems.length > 0
        ? initial.interviewEvaluateItems
        : initialRoleIds.length > 0
        ? initialRoleIds.map((roleId) => ({
            organizationRoleId: roleId,
            items: [{ evaluate: '', evaluateDetail: '' }],
          }))
        : [
            {
              organizationRoleId: 0, // 공통
              items: [{ evaluate: '', evaluateDetail: '' }],
            },
          ];
          
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

  // 1) useForm 초기화
  const methods = useForm<FormValues>({
    defaultValues: seeded,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
  });

  // 컨텍스트 → 폼 동기화
  useEffect(() => {
    methods.reset(ctx.form, {
      keepDirtyValues: true,
      keepTouched: true,
      keepErrors: true,
    });
  
    // ✅ ctx 변경 중에서도 "applicationParts"는 강제로 반영
    const ap = ctx.form.applicationParts;
  
    methods.setValue('applicationParts.parts', ap?.parts ?? [], {
      shouldDirty: true,
      shouldTouch: false,
      shouldValidate: false,
    });
  
    methods.setValue('applicationParts.isSelected', !!ap?.isSelected, {
      shouldDirty: true,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [ctx.form, methods]);
  

  const roleIds = methods.watch('applicationParts.parts') ?? [];

  // ✅ criteria 동기화는 "roleName" 배열을 사용
  const parts = useMemo(
    () => roleIds.map((id) => roleNameById.get(id)).filter(Boolean) as string[],
    [roleIds, roleNameById]
  );
  const paperItems =
    useWatch({ control: methods.control, name: 'paperEvaluateItems' }) || [];
  const interviewItems =
    useWatch({ control: methods.control, name: 'interviewEvaluateItems' }) ||
    [];

    const sameRoleIds = (
      a: { organizationRoleId: number }[],
      b: number[]
    ) =>
      a.length === b.length &&
      a.every((sec, i) => sec.organizationRoleId === b[i]);

  // 서류 평가 기준 동기화
  useEffect(() => {
    const sectionRoleIds = roleIds.length > 0 ? [...roleIds] : [0];
    if (sameRoleIds(paperItems, sectionRoleIds)) return;
  
    const next = sectionRoleIds.map((rid) => {
      const existing = paperItems.find(
        (sec) => sec.organizationRoleId === rid
      );
      return {
        organizationRoleId: rid,
        items: existing
          ? existing.items
          : [{ evaluate: '', evaluateDetail: '' }],
      };
    });
  
    methods.setValue('paperEvaluateItems', next, { shouldValidate: false });
  }, [roleIds, paperItems, methods]);


  // 면접 평가 기준 동기화
  useEffect(() => {
    const sectionRoleIds = roleIds.length > 0 ? [...roleIds] : [0];
    if (sameRoleIds(interviewItems, sectionRoleIds)) return;
  
    const next = sectionRoleIds.map((rid) => {
      const existing = interviewItems.find(
        (sec) => sec.organizationRoleId === rid
      );
      return {
        organizationRoleId: rid,
        items: existing
          ? existing.items
          : [{ evaluate: '', evaluateDetail: '' }],
      };
    });
  
    methods.setValue('interviewEvaluateItems', next, { shouldValidate: false });
  }, [roleIds, interviewItems, methods]);
  

  const title = methods.watch('title') || '';
  const basicInfo = methods.watch('basicInfo')!;
  const detailItems = methods.watch('detailItems')!;
  const deadline = methods.watch('deadline')!;
  const interviewDuration = methods.watch('interviewDuration')!;
  const finalResultDate = methods.watch('finalResultDate')!;
  const hasParts = methods.watch('applicationParts.isSelected') === true;

  // 검증
  const isTitleOk = !!title.trim();
  const isBasicInfoOk = true;
  const isDetailItemsOk =
  (detailItems?.length ?? 0) > 0 &&
  detailItems.every((d) => (d?.description ?? '').trim().length > 0);

  const isDeadlineOk = !!deadline;
  const isDurationOk = !!interviewDuration;
  const isFinalOk = !!finalResultDate;
  const isPaperOk =
    paperItems.length > 0 &&
    paperItems.every((section) => {
      if (section.organizationRoleId === null && hasParts) return true; // 파트가 있으면 공통 무시
      return (
        section.items.length > 0 &&
        section.items.every((item) => item.evaluate.trim().length > 0)
      );
    });
  const isInterviewOk =
    interviewItems.length > 0 &&
    interviewItems.every((section) => {
      if (section.organizationRoleId === null && hasParts) return true;
      return (
        section.items.length > 0 &&
        section.items.every((item) => item.evaluate.trim().length > 0)
      );
    });

  // 최종 버튼 활성
  const canSubmit =
    isTitleOk &&
    isBasicInfoOk &&
    isDetailItemsOk &&
    isDeadlineOk &&
    isDurationOk &&
    isFinalOk &&
    isPaperOk &&
    isInterviewOk;

  const onTabChange = (tab: string) => {
    ctx.setForm(methods.getValues());

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${basePath}?${params.toString()}`);
  };
  const handlePreview = useCallback(() => {
    ctx.setForm(methods.getValues());
    router.push(`${basePath}/preview`);
  }, [ctx, methods, router, basePath]);

  const handleCopyLink = useCallback(() => {
    if (!slug || !organization) return;
    const url = buildRecruitUrl(window.location.origin, organization, slug);
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('응답자에게 보낼 링크가 복제되었습니다.'))
      .catch(() => toast.error('링크 복사에 실패했습니다.'));
  }, [slug, organization, toast]);

  const handleSave = useCallback(() => {
    const values = methods.getValues();
    const payload = convertFormToRequest(values, recruitmentId, organizationId);
    draftMutation.mutate(payload, {
      onSuccess: (result) => {
        toast.success('임시 저장 되었습니다.');
         // ✅ new 페이지에서 임시저장 성공하면 URL을 /setting/{id}로 교체
      if (currentId === 'new') {
        const params = new URLSearchParams(searchParams.toString());

        // ✅ isTemporary/hasApplicants 같은 플래그도 유지하고 싶으면 그대로 두고
        // 필요하면 isTemporary를 true로 강제해도 됨
        params.set('isTemporary', 'true');

        router.replace(
          `/application-list/setting/${result.recruitmentId}?${params.toString()}`
        );
      }
      },
      onError: (err) => {
        console.error('임시 저장 실패', err);
      },
    });
  }, [draftMutation, methods, recruitmentId, organizationId, toast]);

  const onSubmit = useCallback(
    (data: FormValues) => {
      const payload = convertFormToRequest(data, recruitmentId, organizationId);
      publishMutation.mutate(payload, {
        onSuccess: () => {
          router.push('/application-list');
        },
      });
    },
    [publishMutation, router, recruitmentId, organizationId]
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
              if (e.key === 'Enter') e.preventDefault();
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
