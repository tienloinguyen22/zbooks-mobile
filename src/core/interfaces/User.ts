import { LoginType } from './LoginType';

export interface User {
  id: string;
  displayName?: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
  emailVerified?: boolean;
  loginType: LoginType;
}
