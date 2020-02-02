import { LanguageType, Theme, i18n, THEME_LIGHT, colors } from '@app/core';

export interface AppSettings {
  appLoaded: boolean;
  language: LanguageType;
  theme: Theme;
  primaryColorCode: string;
}

export const initialAppSettings = {
  appLoaded: false,
  language: i18n.LANGUAGE_EN,
  theme: THEME_LIGHT,
  primaryColorCode: colors.primaryColor,
  __typename: 'appSettings',
};
