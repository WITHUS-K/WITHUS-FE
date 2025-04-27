import { TagColor } from '@repo/utils';

export interface Role {
  label: string;
  color: TagColor;
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
