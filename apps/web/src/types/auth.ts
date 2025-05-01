export interface LoginRequest {
  email: string;
  password: string;
}

export interface AdminJoinRequest {
  name: string;
  organizationName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface EmailCheckResult {
  isDuplicated: boolean;
}

export interface PhoneConfirmParams {
  phoneNumber: string;
  code: string;
}
