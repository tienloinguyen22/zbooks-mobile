import { LanguageType, Theme, i18n, THEME_LIGHT } from '@app/core';
import { jsonSources } from '@app/assets';

const defaultPrimaryColorCode = jsonSources.primaryColors()[0].code;

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
  primaryColorCode: defaultPrimaryColorCode,
  __typename: 'appSettings',
};
