export interface PartOption {
  id: number;
  label: string;
}

export interface RoleGroupOption {
  id: number;
  name: string;
  selectionMinCount: number;
  selectionMaxCount: number;
  roles: PartOption[];
}

export function buildRoleGroups(
  positions: PartOption[],
  roleGroups?: RoleGroupOption[]
): RoleGroupOption[] {
  const groupsWithRoles = (roleGroups ?? []).filter((group) => group.roles.length > 0);

  if (groupsWithRoles.length > 0) {
    return groupsWithRoles;
  }

  if (positions.length === 0) {
    return [];
  }

  return [
    {
      id: 0,
      name: '지원 파트',
      selectionMinCount: 1,
      selectionMaxCount: 1,
      roles: positions,
    },
  ];
}

export function isPartSelectionValid(
  groups: RoleGroupOption[],
  selectedPartIds: number[]
) {
  if (groups.length === 0) {
    return true;
  }

  return groups.every((group) => {
    const selectedCount = group.roles.filter((role) =>
      selectedPartIds.includes(role.id)
    ).length;

    return (
      selectedCount >= group.selectionMinCount &&
      selectedCount <= group.selectionMaxCount
    );
  });
}

export function toSelectedPartLabels(
  selectedParts: PartOption[] | undefined
) {
  return new Set((selectedParts ?? []).map((part) => part.label));
}
