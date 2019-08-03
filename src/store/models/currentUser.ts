import { createModel, ModelConfig } from '@rematch/core';
import produce from 'immer';
import { User } from '@app/core';

export type CurrentUserState = User;

const defaultUser: CurrentUserState = {
  id: '',
  displayName: '',
  avatarUrl: '',
  isLoggedIn: false,
  emailVerified: undefined,
  loginType: 'EMAIL',
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
