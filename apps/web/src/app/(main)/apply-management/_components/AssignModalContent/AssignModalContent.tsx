import { Flex } from '@repo/ui/Flex';
import { TabBar } from '@repo/ui/TabBar';
import { useState } from 'react';
import DistributionContainer, {
  OrgRole,
} from './DistributionContainer/DistributionContainer';
import { useUserStore } from '@web/store/state/userStore';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
import { mapServerColorToTagHex } from '@web/utils/color';

const TABS = ['documents', 'interviews'];
const SUPPORT_PARTS = ['기획', '디자인', '프론트엔드', '백엔드'];

export default function AssignModalContent() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>('documents');

  const organizationId = useUserStore.getState().organizationId!;

  // 조직 역할 로드
  // 조직 역할 로드 (OrganizationRolesData)
  const { data: rolesData } = useOrganizationRolesQuery(organizationId!);

  // RoleDto[] 배열 추출
  const rolesArray = rolesData?.roles ?? [];

  // OrgRole 형식으로 매핑
  const availableRoles: OrgRole[] = rolesArray.map((r) => ({
    id: r.id,
    label: r.roleName,
    color: mapServerColorToTagHex(r.color),
  }));

  return (
    <Flex direction="column" gap="4rem" width="100%">
      <TabBar
        tabs={TABS}
        active={activeTab}
        onChange={(tab) => setActiveTab(tab as any)}
      />

      <DistributionContainer
        parts={SUPPORT_PARTS}
        availableRoles={availableRoles}
      />
    </Flex>
  );
}
