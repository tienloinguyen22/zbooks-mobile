import React, { useEffect } from 'react';
import { ScreenProps } from '@app/core';
// import { auth } from 'react-native-firebase';
import i18next from 'i18next';
import SplashScreen from 'react-native-splash-screen';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { navigationService } from '@app/services';
import { Loading, View } from '@app/components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ appStateLoadStatus, language }: Props) => {
  useEffect(() => {
    SplashScreen.hide();
    if (!appStateLoadStatus.completed) {
      return;
    }
    i18next.changeLanguage(language.lang);

    navigationService.setRootLogin();

    // check firebase to see if user is logged in or not
    // const unsubscribe = auth().onAuthStateChanged(async (_user) => {
    //   await navigationService.setRootHome();
    //   SplashScreen.hide();
    // });

    return () => {
      // unsubscribe();
    };
  }, [appStateLoadStatus.completed]);
  return (
    <View>
      <Loading />
    </View>
  );
};
