import { createModel, ModelConfig } from '@rematch/core';
import produce from 'immer';

export interface CurrentUserState {
  id: string;
  displayName: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

export const currentUser: ModelConfig<CurrentUserState> = createModel<CurrentUserState>({
  state: {
    id: '',
    displayName: '',
    avatarUrl: '',
    isLoggedIn: false,
  },
  reducers: {
    login: produce((draftState: CurrentUserState, payload: CurrentUserState) => {
      Object.assign(draftState, payload);
    }),
  },
  effects: {},
});
