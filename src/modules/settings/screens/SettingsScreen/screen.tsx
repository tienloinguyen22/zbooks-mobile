import React from 'react';
import { ScreenProps, i18n, LanguageType, catchAndLog } from '@app/core';
import { config } from '@app/config';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { BaseLayout, List, ListItemData } from '@app/components';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';
import { navigationService } from '@app/services';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

const getCurrentLanguageText = (language: LanguageType) => {
  const currentLang = i18n.LANGUAGES.find((lang) => lang.id === language);
  return currentLang ? currentLang.name : undefined;
};

export const Screen = ({ changeLanguage, language }: Props) => {
  const { t } = useTranslation();
  const appVersion = Platform.OS == 'android' ? config.android.version : config.ios.version;

  const logout = catchAndLog(async () => {
    if (auth().currentUser) {
      const user = auth().currentUser!;
      if (
        user.providerData &&
        user.providerData.length > 0 &&
        user.providerData[0].providerId === 'google.com' &&
        (await GoogleSignin.isSignedIn())
      ) {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
      }
      await auth().signOut();
    }
    navigationService.setRootLogin();
  });

  const toggleLanguage = () => {
    changeLanguage(language === i18n.LANGUAGE_EN ? i18n.LANGUAGE_VI : i18n.LANGUAGE_EN);
  };

  const data: ListItemData[] = [
    { title: t('settings.settings'), isHeader: true },
    {
      title: t('settings.language'),
      isHeader: false,
      value: getCurrentLanguageText(language),
      onPress: toggleLanguage,
    },
    { title: t('settings.about'), isHeader: true },
    { title: t('settings.author'), isHeader: false, value: config.author },
    { title: t('settings.version'), isHeader: false, value: appVersion },
    { title: t('settings.logout'), isHeader: false, showIcon: true, onPress: logout },
  ];

  return (
    <BaseLayout>
      <List data={data} />
    </BaseLayout>
  );
};
