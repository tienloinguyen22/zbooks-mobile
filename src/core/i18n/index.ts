import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

const LANGUAGE_VI = 'vi';
const LANGUAGE_EN = 'en';
export type LanguageType = typeof LANGUAGE_EN | typeof LANGUAGE_VI;
export const LANGUAGES = [
  {
    id: LANGUAGE_EN,
    name: 'English',
  },
  {
    id: LANGUAGE_VI,
    name: 'Tiếng Việt',
  },
];

const initialize = async () => {
  const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (cb: any) => cb(LANGUAGE_EN),
    init: () => {
      // blank
    },
    cacheUserLanguage: () => {
      // blank
    },
  };

  await i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: LANGUAGE_EN,
      debug: __DEV__,
      resources: {
        en: { translation: en },
        vi: { translation: vi },
      },
    });
};

export const i18n = {
  LANGUAGE_VI,
  LANGUAGE_EN,
  LANGUAGES,
  initialize,
};
