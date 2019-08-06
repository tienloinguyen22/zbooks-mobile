import React, { useEffect } from 'react';
import { ScreenProps } from '@app/core';
import i18next from 'i18next';
import SplashScreen from 'react-native-splash-screen';
import { navigationService, authService } from '@app/services';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ appLoaded, language, currentUser }: Props): JSX.Element => {
  useEffect(() => {
    if (!appLoaded) {
      return;
    }
    i18next.changeLanguage(language);

    (async (): Promise<void> => {
      if (currentUser.isLoggedIn) {
        if (currentUser.loginType !== 'EMAIL' || (await authService.isEmailVerified())) {
          navigationService.setRootHome();
        } else {
          navigationService.setRootEmailVerification();
        }
      } else {
        navigationService.setRootLogin();
      }
      SplashScreen.hide();
    })();
  }, [appLoaded, language, currentUser.isLoggedIn, currentUser.loginType]);
  return <></>;
};
