import { LoginType } from '@app/core';

export interface User {
  id: string;
  displayName?: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
  email?: string;
  emailVerified?: boolean;
  loginType: LoginType;
}

export const initialCurrentUser = {
  id: '',
  displayName: '',
  avatarUrl: '',
  isLoggedIn: false,
  email: '',
  emailVerified: false,
  loginType: '',
};
