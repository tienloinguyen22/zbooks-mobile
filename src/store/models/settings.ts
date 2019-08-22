import { createModel, ModelConfig } from '@rematch/core';
import produce from 'immer';
import { LanguageType, i18n, Theme, THEME_LIGHT } from '@app/core';
import i18next from 'i18next';
import { navigationService } from '@app/services';
import { jsonSources } from '@app/assets';
import { RootState } from '..';

export interface SettingsState {
  appLoaded: boolean;
  language: LanguageType;
  theme: Theme;
  primaryColorCode: string;
}

const defaultPrimaryColorCode = jsonSources.primaryColors()[0].code;

export const settings: ModelConfig<SettingsState> = createModel<SettingsState>({
  state: {
    appLoaded: false,
    language: i18n.LANGUAGE_EN,
    theme: THEME_LIGHT,
    primaryColorCode: defaultPrimaryColorCode,
  },
  reducers: {
    finishLoadingApp: produce((draftState: SettingsState) => {
      draftState.appLoaded = true;
    }),
    changeLanguage: produce((draftState: SettingsState, payload: LanguageType) => {
      draftState.language = payload;
    }),
    changeTheme: produce((draftState: SettingsState, payload: Theme) => {
      draftState.theme = payload;
    }),
    changePrimaryColor: produce((draftState: SettingsState, payload: string) => {
      draftState.primaryColorCode = payload;
    }),
  },
  effects: {
    async changeLanguageWithI18next(payload: LanguageType, rootState: RootState): Promise<void> {
      if (payload === rootState.settings.language) {
        return;
      }
      await i18next.changeLanguage(payload);
      this.changeLanguage(payload);
      navigationService.setRootHome(1); // refresh & go to Settings tab
    },
    async changeThemeAndReload(payload: Theme, rootState: RootState): Promise<void> {
      if (payload === rootState.settings.theme) {
        return;
      }
      this.changeTheme(payload);
      navigationService.setRootHome(1); // refresh & go to Settings tab
    },
    async changePrimaryColorAndReload(payload: string, rootState: RootState): Promise<void> {
      if (payload === rootState.settings.primaryColorCode) {
        return;
      }
      this.changePrimaryColor(payload);
      navigationService.setRootHome(1); // refresh & go to Settings tab
    },
  },
});
