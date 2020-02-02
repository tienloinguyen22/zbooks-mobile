import { useEffect, useState } from 'react';
import { colors, Theme, THEME_DARK } from '@app/core';
import gql from 'graphql-tag';
import { apolloClient } from '@app/graphql';

interface CurrentTheme {
  theme: Theme;
  primaryColor: string;
  textColor: string;
  screenBackgroundColor: string;
  componentBackgroundColor: string;
}

const APP_SETTINGS = gql`
  query GetAppSettings {
    appSettings @client
  }
`;

export const useTheme = (): CurrentTheme => {
  const graphQlData = apolloClient.readQuery({
    query: APP_SETTINGS,
  });

  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>({
    theme: 'light',
    primaryColor: colors.white,
    textColor: colors.white,
    screenBackgroundColor: colors.white,
    componentBackgroundColor: colors.white,
  });

  useEffect(() => {
    const { appSettings } = graphQlData;
    const settings = appSettings;

    setCurrentTheme({
      theme: settings.theme,
      primaryColor: colors.primaryColor,
      textColor: settings.theme === THEME_DARK ? colors.white : colors.black,
      screenBackgroundColor: settings.theme === THEME_DARK ? colors.darkBackgroundColor : colors.lightBackgroundColor,
      componentBackgroundColor: settings.theme === THEME_DARK ? colors.black : colors.white,
    });
  }, [graphQlData]);

  return {
    ...currentTheme,
  };
};
