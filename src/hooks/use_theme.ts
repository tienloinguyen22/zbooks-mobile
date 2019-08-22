import { useEffect, useState } from 'react';
import { store } from '@app/store';
import { getPrimaryColor, colors, Theme, THEME_DARK } from '@app/core';

interface CurrentTheme {
  theme: Theme;
  primaryColor: string;
  textColor: string;
  screenBackgroundColor: string;
  componentBackgroundColor: string;
}
export const useTheme = (): CurrentTheme => {
  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>({
    theme: 'light',
    primaryColor: colors.white,
    textColor: colors.white,
    screenBackgroundColor: colors.grey,
    componentBackgroundColor: colors.white,
  });

  useEffect(() => {
    const { settings } = store.getState();
    const primaryColorValue = getPrimaryColor(settings.primaryColorCode, settings.theme);
    setCurrentTheme({
      theme: settings.theme,
      primaryColor: primaryColorValue,
      textColor: settings.theme === THEME_DARK ? colors.white : colors.black,
      screenBackgroundColor: settings.theme === THEME_DARK ? colors.lightBlack : colors.lightGrey,
      componentBackgroundColor: settings.theme === THEME_DARK ? colors.black : colors.white,
    });
  }, []);

  return {
    ...currentTheme,
  };
};
