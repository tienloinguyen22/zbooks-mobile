import createRematchPersist from '@rematch/persist';
import { models } from './models';
import { init, RematchRootState } from '@rematch/core';
import storage from '@react-native-community/async-storage';
import { persistStore } from 'redux-persist';

const persistPlugin = createRematchPersist({
  whitelist: ['appStateLoadStatus', 'language', 'sharks'],
  throttle: 2000,
  version: 1,
  storage,
});

export const store = init({
  plugins: [persistPlugin],
  models,
});

export const persistor = persistStore(store, undefined, () => {
  const { appStateLoadStatus } = store.getState();
  // we only should do it only 1 time when user installs & opens the app for the first time
  if (!appStateLoadStatus.completed) {
    store.dispatch.appStateLoadStatus.finishLoading();
  }
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type iRootState = RematchRootState<typeof models>;
