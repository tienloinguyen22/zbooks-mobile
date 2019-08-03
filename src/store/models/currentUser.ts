import { createModel, ModelConfig } from '@rematch/core';
import produce from 'immer';
import { LoginType, LOGIN_TYPE } from '@app/core';

export interface CurrentUserState {
  id: string;
  displayName?: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
  emailVerified?: boolean;
  loginType: LoginType;
}

const defaultUser: CurrentUserState = {
  id: '',
  displayName: '',
  avatarUrl: '',
  isLoggedIn: false,
  emailVerified: undefined,
  loginType: LOGIN_TYPE.EMAIL,
};

export const currentUser: ModelConfig<CurrentUserState> = createModel<CurrentUserState>({
  state: defaultUser,
  reducers: {
    login: produce((draftState: CurrentUserState, payload: CurrentUserState) => {
      Object.assign(draftState, payload);
    }),
    logout: produce((draftState: CurrentUserState) => {
      Object.assign(draftState, defaultUser);
    }),
  },
  effects: {},
});
