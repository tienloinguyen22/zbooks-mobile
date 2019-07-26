import React, { useEffect } from 'react';
import { ScreenProps } from '@app/core';
// import { auth } from 'react-native-firebase';
import i18next from 'i18next';
import SplashScreen from 'react-native-splash-screen';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { navigationService } from '@app/services';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ appLoaded, language, isLoggedIn }: Props) => {
  useEffect(() => {
    if (!appLoaded) {
      return;
    }
    i18next.changeLanguage(language);

    if (isLoggedIn) {
      navigationService.setRootHome();
      SplashScreen.hide();
      return;
    }

    navigationService.setRootLogin();
    SplashScreen.hide();
  }, [appLoaded]);
  return <></>;
};
