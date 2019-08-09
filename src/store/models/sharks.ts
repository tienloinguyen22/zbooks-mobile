import { createModel } from '@rematch/core';
import { sleep } from '@app/core';
import produce from 'immer';

export interface SharksState {
  count: number;
}

export const sharks = createModel<SharksState>({
  state: {
    count: 0,
  },
  reducers: {
    increment: produce((draftState: SharksState, payload: number) => {
      draftState.count += payload;
    }),
  },
  effects: {
    // TODO: Optional args breaks TypeScript autocomplete (e.g. payload: number = 1)
    async incrementAsync(payload: number): Promise<void> {
      await sleep(500);
      this.increment(payload || 1);
    },
  },
});
