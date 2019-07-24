import { createModel } from '@rematch/core';
import produce from 'immer';

export interface AppStateLoadStatusState {
  completed: boolean;
}

export const appStateLoadStatus = createModel<AppStateLoadStatusState>({
  state: { completed: false },
  reducers: {
    finishLoading: produce((draftState: AppStateLoadStatusState) => {
      draftState.completed = true;
    }),
  },
});
