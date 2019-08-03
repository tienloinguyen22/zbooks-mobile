import { createModel } from '@rematch/core';
import { sleep } from '@app/core';
import produce from 'immer';
import { Dispatch } from '../store';

export interface DolphinsState {
  count: number;
}

export const dolphins = createModel<DolphinsState>({
  state: { count: 0 },
  reducers: {
    increment: produce((draftState: DolphinsState, payload: number) => {
      draftState.count += payload;
    }),
  },
  effects: (dispatch: Dispatch) => ({
    // TODO: Optional args breaks TypeScript autocomplete (e.g. payload: number = 1)
    incrementAsync: async (payload: number): Promise<void> => {
      await sleep(500);
      dispatch.dolphins.increment(payload || 1);
    },
  }),
});
