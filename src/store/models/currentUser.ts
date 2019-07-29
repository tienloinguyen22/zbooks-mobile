import { createModel, ModelConfig } from '@rematch/core';
import produce from 'immer';

export interface CurrentUserState {
  id: string;
  displayName: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

const defaultUser: CurrentUserState = {
  id: '',
  displayName: '',
  avatarUrl: '',
  isLoggedIn: false,
};

export const currentUser: ModelConfig<CurrentUserState> = createModel<CurrentUserState>({
  state: defaultUser,
  reducers: {
    login: produce((draftState: CurrentUserState, payload: CurrentUserState) => {
      Object.assign(draftState, payload);
    }),
    logout: produce((draftState: CurrentUserState) => {
      console.log('logout');
      Object.assign(draftState, defaultUser);
    }),
  },
  effects: {},
});
