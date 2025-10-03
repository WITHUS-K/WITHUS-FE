'use client';
import { useState, useMemo, ChangeEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Text } from '@repo/ui/Text';
import OrgSearchToolbar from './_components/OrgSearchToolbar/OrgSearchToolbar';
import OrgList from './_components/OrgList/OrgList';
import SelectionNotification from './_components/SelectionNotification/SelectionNotification';
import { Pagination } from '@repo/ui/Pagination';
import { useModal } from '@repo/ui/hooks';
import { useOrganizationMembersQuery } from '@web/store/query/useOrganizationMembersQuery';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
import { useDeleteOrganizationUsersMutation } from '@web/store/mutation/useDeleteOrganizationUsersMutation';
import { mapServerColorToTagHex } from '@web/utils/color';
import InviteModal from './@modal/(.)invite/page';
import { Flex } from '@repo/ui/Flex';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import * as styles from './page.css';
import { useRouter, useSearchParams } from 'next/navigation';
import PartModal from './@modal/(.)part/page';
import { usePartModalStore } from '@web/store/state/partModalStore';
import { useOrganizationUsersClientQuery } from '@web/store/query/useOrganizationUsersQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useOrganizationInviteCodeQuery } from '@web/store/query/useOrganizationInviteCodeQuery';

const PAGE_SIZE = 20;

interface Props {
  organizationId: number;
  showInvite: boolean;
  showPart: boolean;
}

type SelectionMode = 'page' | 'all';

export default function OrganizationPageClient({
  organizationId,
  showInvite,
  showPart,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUserRoleInfo = usePartModalStore((s) => s.setUserRoleInfo);

  const [search, setSearch] = useState('');
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('page');
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // page 모드용
  const [deselectedIds, setDeselectedIds] = useState<string[]>([]); // all 모드용 (제외 목록)
  const { confirm } = useModal();
  const qc = useQueryClient();

  const pageParam = Number(searchParams.get('page') ?? '1');
  const page = pageParam >= 1 ? pageParam : 1;

  const { data: paged, isFetching } = useOrganizationMembersQuery({
    organizationId,
    page,
    size: PAGE_SIZE,
  });
  const members = paged?.content ?? [];
  const totalCount = paged?.totalElements ?? 0;

  const { data: invite } = useOrganizationInviteCodeQuery(organizationId);
  const inviteCode = invite?.inviteCode ?? '';

  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });
  const allRoles =
    rolesData?.roles.map((r) => ({
      roleName: r.roleName,
      color: r.color,
      id: r.id,
    })) ?? [];

  // 전체 사용자 조회: all 모드에서 삭제할 때 사용
  const { userId: myUserId } = getClientSideTokens();
  const { data: allUsers = [] } = useOrganizationUsersClientQuery({
    organizationId,
    keyword: search?.trim() || undefined,
  });

  const deleteMutation = useDeleteOrganizationUsersMutation(
    organizationId,
    page,
    PAGE_SIZE
  );

  // 체크박스 토글(한 개)
  const handleToggleOne = (id: string, checked: boolean) => {
    if (selectionMode === 'page') {
      setSelectedIds((prev) =>
        checked ? [...prev, id] : prev.filter((x) => x !== id)
      );
    } else {
      // all 모드: 체크 해제 시 제외 목록에 넣고, 체크 시 제외 목록에서 제거
      setDeselectedIds((prev) =>
        checked
          ? prev.filter((x) => x !== id)
          : Array.from(new Set([...prev, id]))
      );
    }
  };

  // 페이지 전체 토글
  const handleToggleAll = (checked: boolean) => {
    const pageIds = members.map((m) => String(m.userId));
    if (selectionMode === 'page') {
      setSelectedIds((prev) =>
        checked
          ? Array.from(new Set([...prev, ...pageIds]))
          : prev.filter((x) => !pageIds.includes(x))
      );
    } else {
      // all 모드: 페이지 전체를 체크 해제 => 해당 페이지 ids를 제외 목록에 추가
      //           페이지 전체를 체크    => 제외 목록에서 제거
      setDeselectedIds((prev) =>
        checked
          ? prev.filter((x) => !pageIds.includes(x))
          : Array.from(new Set([...prev, ...pageIds]))
      );
    }
  };

  // 현재 페이지에서 실제로 체크된 아이템들
  const visibleSelectedIds =
    selectionMode === 'page'
      ? selectedIds
      : members
          .filter((m) => !deselectedIds.includes(String(m.userId)))
          .map((m) => String(m.userId));

  const isAllPageSelected =
    members.length > 0 && visibleSelectedIds.length === members.length;

  // 배너 노출 조건
  const showBanner =
    (selectionMode === 'page' && selectedIds.length > 0) ||
    // all 모드일 때: '단 하나라도 해제(제외)된 항목이 있으면' 배너 숨김
    (selectionMode === 'all' && deselectedIds.length === 0);

  // 배너의 범위 토글
  const handleBannerToggleScope = () => {
    if (selectionMode === 'page') {
      setSelectionMode('all');
      setSelectedIds([]);
      setDeselectedIds([]);
    } else {
      setSelectionMode('page');
      setSelectedIds(members.map((m) => String(m.userId))); // 현재 페이지만 선택
      setDeselectedIds([]);
    }
  };

  // 삭제
  const handleDeleteClick = () => {
    const finalizeIds = () => {
      if (selectionMode === 'page') {
        return selectedIds.map(Number);
      }
      const allIds = allUsers
        .map((u) => String(u.userId))
        .filter((id) => id !== String(myUserId));
      const finalStrIds = allIds.filter((id) => !deselectedIds.includes(id));
      return finalStrIds.map(Number);
    };

    const targets = finalizeIds();

    confirm({
      type: 'warning',
      title: `${targets.length}명을 정말 삭제하시겠습니까?`,
      cancelText: '취소',
      confirmText: '삭제',
      onConfirm: () => {
        deleteMutation.mutate({ userIds: targets });
        setSelectedIds([]);
        setDeselectedIds([]);
        setSelectionMode('page');
      },
    });
  };

  const filtered = useMemo(
    () =>
      members.filter((m) => {
        const q = search.toLowerCase().trim();
        if (!q) return true;
        return (
          m.name.toLowerCase().includes(q) ||
          (m.email ?? '').toLowerCase().includes(q)
        );
      }),
    [members, search]
  );

  const handlePartClick = (memberId: number) => {
    const member = members.find((m) => m.userId === memberId);
    if (!member) return;

    setUserRoleInfo(
      member.userId,
      member.roles.map((r) => ({
        id: r.id,
        roleName: r.roleName,
        color: r.color,
      }))
    );

    router.push('/organization/part');
  };

  return (
    <>
      {showInvite && <InviteModal />}
      {showPart && <PartModal />}
      <Flex direction="column">
        <Flex
          direction="column"
          gap="0.4rem"
          marginBottom="1.8rem"
          width="100%"
        >
          <Flex align="center" justify="spaceBetween" width="100%">
            <Breadcrumb>
              <Breadcrumb.Item active>조직 관리</Breadcrumb.Item>
            </Breadcrumb>

            {showBanner && (
              <SelectionNotification
                pageCount={members.length}
                totalCount={totalCount}
                isAllSelected={selectionMode === 'all'}
                onToggleScope={handleBannerToggleScope}
              />
            )}
          </Flex>

          <Text variant="xl_title_semibold" color="black">
            조직 관리
          </Text>
        </Flex>

        <OrgSearchToolbar
          search={search}
          onSearchChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
          selectedCount={
            selectionMode === 'page'
              ? selectedIds.length
              : // all 모드면 '현재 페이지에서 보이는 선택 수' 또는 totalCount를 보여줄지 정책 결정
                visibleSelectedIds.length
          }
          totalCount={totalCount}
          onDelete={handleDeleteClick}
          code={inviteCode}
        />

        <Flex width="100%" paddingBottom="1.5rem" height="100%">
          <OrgList
            data={filtered.map((m) => ({
              id: String(m.userId),
              name: m.name,
              email: m.email,
              profileUrl: m.profileImageUrl ?? '',
              roles: m.roles.map((r) => ({
                id: r.id,
                label: r.roleName,
                color: mapServerColorToTagHex(r.color),
              })),
              gender: m.gender,
              dob: m.birthDate,
              phone: m.phoneNumber,
              joined: m.createdAt,
            }))}
            page={page}
            selectedIds={visibleSelectedIds}
            onToggleAll={handleToggleAll}
            onToggleOne={handleToggleOne}
            availableRoles={(rolesData?.roles ?? []).map((r) => ({
              id: r.id,
              label: r.roleName,
              color: mapServerColorToTagHex(r.color),
            }))}
            search={search}
            onPartClick={handlePartClick}
          />

          <div className={styles.paginationStyle}>
            <Pagination
              currentPage={page}
              totalItems={totalCount}
              itemCountPerPage={PAGE_SIZE}
              pageCount={5}
              onPageChange={(p) => {
                router.push(`?page=${p}`);
                if (selectionMode === 'page') setSelectedIds([]);
              }}
            />
          </div>
        </Flex>
      </Flex>
    </>
  );
}
