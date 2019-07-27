import { createModel, ModelConfig } from '@rematch/core';
import produce from 'immer';
import { LanguageType, i18n } from '@app/core';
import i18next from 'i18next';
import { navigationService } from '@app/services';

export interface SettingsState {
  appLoaded: boolean;
  language: LanguageType;
}

export const settings: ModelConfig<SettingsState> = createModel<SettingsState>({
  state: {
    appLoaded: false,
    language: i18n.LANGUAGE_EN,
  },
  reducers: {
    finishLoadingApp: produce((draftState: SettingsState) => {
      draftState.appLoaded = true;
    }),
    changeLanguage: produce((draftState: SettingsState, payload: LanguageType) => {
      draftState.language = payload;
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
