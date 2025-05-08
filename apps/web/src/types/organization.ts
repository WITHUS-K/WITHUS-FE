/* api */
import type { ApiResponse } from '@web/api/types';

export interface RoleDto {
  id: number;
  roleName: string;
  color: string; // 서버: 'blue', 'red' 등
  assignedUserCount: number;
}

export interface OrganizationRolesData {
  totalRoleCount: number;
  roles: RoleDto[];
}

export type OrganizationRolesResponse = ApiResponse<OrganizationRolesData>;

export interface CreateRoleRequest {
  name: string;
  color: string;
}

export type CreateRoleDto = Pick<RoleDto, 'id' | 'roleName' | 'color'>;

export type CreateRoleResponse = ApiResponse<CreateRoleDto>;

/* UI 에서 썼던거 */
import { PaletteColor, TagColor } from '@repo/utils';

export interface Role {
  label: string;
  color: TagColor;
}

export interface RoleSelect {
  label: string;
  color: PaletteColor;
}

export interface RoleSelectWithCount extends RoleSelect {
  count: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  gender: string;
  dob: string;
  phone: string;
  joined: string;
  profileUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileUrl?: string;
}
