import { PaletteColor, TagColor } from '@repo/utils';

export interface Role {
  label: string;
  color: PaletteColor;
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
