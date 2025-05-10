/* api */
import type { ApiResponse } from '@web/api/types';

export interface AssignUsersRequest {
  userIds: number[];
}

export interface AssignUsersResult {
  id: number;
  userName: string;
  roleName: string;
}

export type AssignUsersResponse = ApiResponse<AssignUsersResult[]>;

export interface UserResult {
  /** 사용자 고유 ID */
  userId: number;
  /** 이름 */
  name: string;
  /** 이메일 */
  email: string;
  /** 프로필 이미지 URL (없으면 null) */
  imageUrl: string | null;
  /** 해당 역할에 할당된 상태 */
  isAssigned: boolean;
}

export type UserResponse = ApiResponse<UserResult[]>;

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
