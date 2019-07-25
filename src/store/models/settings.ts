import { createModel } from '@rematch/core';
import produce from 'immer';
import { LanguageType, i18n } from '@app/core';
import i18next from 'i18next';
import { navigationService } from '@app/services';

export interface SettingsState {
  appLoaded: boolean;
  lang: string;
}

export const settings = createModel<SettingsState>({
  state: {
    appLoaded: false,
    lang: i18n.LANGUAGE_EN,
  },
  reducers: {
    finishLoadingApp: produce((draftState: SettingsState) => {
      draftState.appLoaded = true;
    }),
    changeLanguage: produce((draftState: SettingsState, payload: LanguageType) => {
      draftState.lang = payload;
    }),
  },
  effects: {
    async changeLanguageWithI18next(payload: LanguageType): Promise<void> {
      await i18next.changeLanguage(payload);
      this.changeLanguage(payload);
      navigationService.setRootHome(1);
    },
  },
});
