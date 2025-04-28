'use client';
import { useState, ChangeEvent } from 'react';
import { Member, Role } from '@web/types/organization';
import OrgSearchToolbar from './_components/OrgSearchToolbar/OrgSearchToolbar';
import { Pagination } from '@repo/ui/Pagination';
import { Flex } from '@repo/ui/Flex';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Text } from '@repo/ui/Text';
import * as styles from './page.css';
import OrgList from './_components/OrgList/OrgList';
import { useModal } from '@repo/ui/hooks';
import SelectionNotification from './_components/SelectionNotification/SelectionNotification';

// 목데이터 + 전체 가능한 역할 목록
const INITIAL_MEMBERS: Member[] = Array.from({ length: 38 }, (_, i) => ({
  id: String(i + 1).padStart(3, '0'),
  name: '김현호',
  email: 'rable8264@gmail.com',
  roles: [{ label: '프론트엔드', color: '#E2A500' }],
  gender: '남',
  dob: '2001.01.16',
  phone: '010-3940-5094',
  joined: '2025.04.18',
  profileUrl:
    'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
}));

const ALL_ROLES: Role[] = [
  { label: '기획', color: '#FF2A3A' },
  { label: '디자인', color: '#EE6B00' },
  { label: '백엔드', color: '#E2A500' },
  { label: '프론트엔드', color: '#E2A500' },
  { label: '부학회장', color: '#009857' },
  { label: '학회장', color: '#813DFF' },
];

export default function OrganizationPageClient() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { confirm } = useModal();
  // 필터 + 페이징
  const filtered = members.filter((m) => m.name.includes(search));
  const perPage = 20;
  const start = (currentPage - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 배너 표시 여부 계산
  const isPageOnly = selectedIds.length === pageData.length;
  const isAll = selectedIds.length === filtered.length;
  const showBanner = selectedIds.length > 0 && (isPageOnly || isAll);

  // 전체 페이지 토글 핸들러
  const handleToggleScope = () => {
    if (isAll) {
      // 전체 → 페이지만
      setSelectedIds(pageData.map((m) => m.id));
    } else {
      // 페이지 → 전체
      setSelectedIds(filtered.map((m) => m.id));
    }
  };

  // 체크박스
  const handleToggleAll = (checked: boolean) =>
    setSelectedIds(checked ? pageData.map((m) => m.id) : []);
  const handleToggleOne = (id: string, checked: boolean) =>
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );

  // 역할 추가
  const handleAddRole = (memberId: string, role: Role) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              roles: [...m.roles.filter((r) => r.label !== role.label), role],
            }
          : m
      )
    );
  };
  // 삭제 클릭 시
  const handleDeleteClick = () => {
    confirm({
      type: 'warning',
      title: `${selectedIds.length}명의 멤버를 삭제하시겠습니까?`,
      cancelText: '취소',
      confirmText: '삭제',
      onConfirm: () => {
        // 실제 삭제 로직 추가하기!
        //setMembers((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
        //setSelectedIds([]);
      },
    });
  };

  return (
    <Flex direction="column" padding="2.4rem" width="100%" height="100%">
      <Flex direction="column" gap="1.8rem" marginBottom="1.8rem" width="100%">
        <Flex align="center" justify="spaceBetween" width="100%">
          <Breadcrumb>
            <Breadcrumb.Item active>조직 관리</Breadcrumb.Item>
          </Breadcrumb>

          {showBanner && (
            <SelectionNotification
              pageCount={pageData.length}
              totalCount={filtered.length}
              isAllSelected={isAll}
              onToggleScope={handleToggleScope}
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
          setCurrentPage(1);
        }}
        selectedCount={selectedIds.length}
        totalCount={filtered.length}
        onDelete={handleDeleteClick}
      />

      <OrgList
        search={search}
        data={pageData}
        selectedIds={selectedIds}
        onToggleAll={handleToggleAll}
        onToggleOne={handleToggleOne}
        availableRoles={ALL_ROLES}
        onAddRole={handleAddRole}
      />

      <div className={styles.paginationStyle}>
        <Pagination
          totalItems={filtered.length}
          itemCountPerPage={perPage}
          pageCount={8}
          currentPage={currentPage}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </Flex>
  );
}
