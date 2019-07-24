import { i18n, LanguageType } from '@app/core';
import { createModel } from '@rematch/core';
import produce from 'immer';
import i18next from 'i18next';
import { navigationService } from '@app/services';

export interface LanguageState {
  lang: LanguageType;
}

export const language = createModel<LanguageState>({
  state: { lang: i18n.LANGUAGE_EN },
  reducers: {
    changeLanguage: produce((draftState: LanguageState, payload: LanguageType) => {
      draftState.lang = payload;
    }),
  },
  effects: {
    async changeLanguageWithI18next(payload: LanguageType): Promise<void> {
      await i18next.changeLanguage(payload);
      this.changeLanguage(payload);
      navigationService.setRootHome(2);
    },
  },
});
