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
import { useAssignRoleToUserMutation } from '@web/store/mutation/useAssignRoleToUserMutation';
import { mapServerColorToTagHex } from '@web/utils/color';
import InviteModal from './@modal/(.)invite/page';
import { Flex } from '@repo/ui/Flex';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import * as styles from './page.css';
import { useRouter, useSearchParams } from 'next/navigation';
import PartModal from './@modal/(.)part/page';
import { usePartModalStore } from '@web/store/state/partModalStore';

const PAGE_SIZE = 20;

interface Props {
  organizationId: number;
  showInvite: boolean;
  showPart: boolean;
}

export default function OrganizationPageClient({
  organizationId,
  showInvite,
  showPart,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUserRoleInfo = usePartModalStore((s) => s.setUserRoleInfo);
  const [search, setSearch] = useState('');
  //const [page, setPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { confirm } = useModal();
  const qc = useQueryClient();

  const pageParam = Number(searchParams.get('page') ?? '1');
  const page = pageParam >= 1 ? pageParam : 1;

  // 멤버 리스트
  //const apiPage = page + 1;
  const { data: paged, isFetching } = useOrganizationMembersQuery({
    organizationId,
    page,
    size: PAGE_SIZE,
  });
  const members = paged?.content ?? [];
  const totalCount = paged?.totalElements ?? 0;

  // 역할 리스트
  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });
  const allRoles =
    rolesData?.roles.map((r) => ({
      roleName: r.roleName,
      color: r.color,
      id: r.id,
    })) ?? [];

  // 삭제
  const deleteMutation = useDeleteOrganizationUsersMutation(
    organizationId,
    page,
    PAGE_SIZE
  );

  // 선택 토글
  const handleToggleOne = (id: string, checked: boolean) =>
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  const handleToggleAll = (checked: boolean) =>
    setSelectedIds(checked ? members.map((m) => String(m.userId)) : []);

  const isAllPageSelected =
    members.length > 0 &&
    members.every((m) => selectedIds.includes(String(m.userId)));

  // 배너 토글
  const showBanner =
    selectedIds.length > 0 &&
    (isAllPageSelected || selectedIds.length === totalCount);

  // 삭제
  const handleDeleteClick = () => {
    confirm({
      type: 'warning',
      title: `${selectedIds.length}명을 정말 삭제하시겠습니까?`,
      cancelText: '취소',
      confirmText: '삭제',
      onConfirm: () => {
        deleteMutation.mutate({ userIds: selectedIds.map(Number) });
        setSelectedIds([]);
      },
    });
  };

  // 필터링 + 페이징
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
                pageCount={filtered.length}
                totalCount={totalCount}
                isAllSelected={selectedIds.length === totalCount}
                onToggleScope={() =>
                  setSelectedIds(
                    selectedIds.length === totalCount
                      ? filtered.map((m) => String(m.userId))
                      : filtered.map((m) => String(m.userId))
                  )
                }
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
          selectedCount={selectedIds.length}
          totalCount={totalCount}
          onDelete={handleDeleteClick}
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
            selectedIds={selectedIds}
            onToggleAll={handleToggleAll}
            onToggleOne={handleToggleOne}
            availableRoles={rolesData.roles.map((r) => ({
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
                setSelectedIds([]);
              }}
            />
          </div>
        </Flex>
      </Flex>
    </>
  );
}
