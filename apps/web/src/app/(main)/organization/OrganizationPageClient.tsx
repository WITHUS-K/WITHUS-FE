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

const PAGE_SIZE = 20;

interface Props {
  organizationId: number;
  showInvite: boolean;
}

export default function OrganizationPageClient({
  organizationId,
  showInvite,
}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { confirm } = useModal();
  const qc = useQueryClient();

  // 멤버 리스트
  const { data: paged, isFetching } = useOrganizationMembersQuery(
    organizationId,
    page,
    PAGE_SIZE
  );
  const members = paged?.content ?? [];
  const totalCount = paged?.totalElements ?? 0;

  // 역할 리스트
  const { data: rolesData } = useOrganizationRolesQuery(organizationId);
  const allRoles = rolesData.roles.map((r) => ({
    label: r.roleName,
    color: r.color,
    id: r.id,
  }));

  // 삭제
  const deleteMutation = useDeleteOrganizationUsersMutation(
    organizationId,
    page,
    PAGE_SIZE
  );

  // 단일 역할 부여
  const assignRoleMutation = useAssignRoleToUserMutation(
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

  // 역할 부여
  const handleAddRole = (memberId: string, role: { id: number }) => {
    assignRoleMutation.mutate({ userId: Number(memberId), roleIds: [role.id] });
  };

  // 필터링 + 페이징
  const filtered = useMemo(
    () =>
      members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      ),
    [members, search]
  );

  return (
    <>
      {showInvite && <InviteModal />}
      <Flex direction="column">
        <Flex
          direction="column"
          gap="1.8rem"
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
            joined: m.createdAt.replace('.', '/'),
          }))}
          selectedIds={selectedIds}
          onToggleAll={handleToggleAll}
          onToggleOne={handleToggleOne}
          availableRoles={rolesData.roles.map((r) => ({
            id: r.id,
            label: r.roleName,
            color: mapServerColorToTagHex(r.color),
          }))}
          onAddRole={handleAddRole}
          search={search}
        />
        <div className={styles.paginationStyle}>
          <Pagination
            currentPage={page + 1}
            totalItems={totalCount}
            itemCountPerPage={PAGE_SIZE}
            pageCount={5}
            onPageChange={(p) => {
              setPage(p - 1);
              setSelectedIds([]);
            }}
          />
        </div>
      </Flex>
    </>
  );
}
