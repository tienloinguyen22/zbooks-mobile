import { createModel } from '@rematch/core';
import produce from 'immer';

export interface VersionCheckState {
  shouldShownUpdateWarning: boolean;
}

export const minumumVersionChecks = createModel<VersionCheckState>({
  state: {
    shouldShownUpdateWarning: true,
  },
  reducers: {
    updateShownUpdateWarning: produce((draftState: VersionCheckState, payload: boolean) => {
      draftState.shouldShownUpdateWarning = payload;
    }),
  },
});
