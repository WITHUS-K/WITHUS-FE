import type { TagColor } from '@repo/utils';
import { mapServerColorToTagHex } from '@web/utils/color';

interface PositionLike {
  organizationRoleName?: string | null;
  appliedPositions?: string[] | null;
}

export function toAppliedPositionTags(
  item: PositionLike,
  posColorMap: Record<string, string>
): { label: string; color: TagColor }[] {
  const labels =
    item.appliedPositions && item.appliedPositions.length > 0
      ? item.appliedPositions
      : [item.organizationRoleName ?? '공통'];

  return labels.map((label) => ({
    label,
    color:
      label === '공통'
        ? '#5A5C72'
        : mapServerColorToTagHex(posColorMap[label] ?? ''),
  }));
}
