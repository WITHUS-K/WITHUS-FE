'use client';
import { useState, ChangeEvent } from 'react';
import { Member, Role } from '@web/types/organization';
import OrgSearchToolbar from './_components/OrgSearchToolbar/OrgSearchToolbar';
import { Pagination } from '@repo/ui/Pagination';
import { Flex } from '@repo/ui/Flex';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Text } from '@repo/ui/Text';
import * as styles from './page.css';

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

export default function OrganizationPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 필터 + 페이징
  const filtered = members.filter((m) => m.name.includes(search));
  const perPage = 20;
  const start = (currentPage - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  return (
    <Flex direction="column">
      <Flex direction="column" width="100%" height="100%" padding="2.4rem">
        <Flex direction="column" gap="1.8rem" marginBottom="1.8rem">
          <Breadcrumb>
            <Breadcrumb.Item active>조직 관리</Breadcrumb.Item>
          </Breadcrumb>

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
        />
      </Flex>

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
