import React, { useEffect } from 'react';
import { ScreenProps } from '@app/core';
import i18next from 'i18next';
import SplashScreen from 'react-native-splash-screen';
import { navigationService } from '@app/services';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import _ from 'lodash';

type Props = ScreenProps;

const APP_SETTINGS_AND_CURRENT_USER = gql`
  query GetAppSettingsAndCurrentUser {
    appSettings @client {
      language
      primaryColorCode
    }
    currentUser @client {
      isLoggedIn
    }
  }
`;

export const Screen = (_props: Props): JSX.Element => {
  const { data, loading } = useQuery(APP_SETTINGS_AND_CURRENT_USER);
  const language = _.get(data, 'appSettings.language');
  const isLoggedIn = _.get(data, 'currentUser.isLoggedIn');

  useEffect(() => {
    if (loading) {
      return;
    }
    i18next.changeLanguage(language);

    (async (): Promise<void> => {
      if (isLoggedIn) {
        navigationService.setRootHome();
      } else {
        navigationService.setRootLogin();
      }

      SplashScreen.hide();
    })();
  }, [isLoggedIn, language, loading]);

  return <></>;
};
