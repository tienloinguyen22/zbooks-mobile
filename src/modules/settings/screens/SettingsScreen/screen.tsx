import React from 'react';
import { ScreenProps, i18n, catchAndLog } from '@app/core';
import { config } from '@app/config';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { BaseLayout, List, ListItemData, Picker, Image, Text } from '@app/components';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';
import { navigationService } from '@app/services';
import { styles } from './styles';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ changeLanguage, language, currentUser }: Props) => {
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

  const selectLanguage = () => {
    Picker.show({
      pickerData: i18n.LANGUAGE_TEXTS,
      selectedValue: [i18n.getLanguageName(language)],
      onPickerConfirm: (data) => {
        const language = i18n.getLanguageByName(data[0]);
        if (language) {
          changeLanguage(language.id);
        }
      },
    });
  };

  const data: ListItemData[] = [
    { title: t('settings.settings'), isHeader: true },
    {
      title: t('settings.language'),
      isHeader: false,
      value: i18n.getLanguageName(language),
      onPress: selectLanguage,
      showIcon: true,
    },
    { title: t('settings.about'), isHeader: true },
    { title: t('settings.author'), isHeader: false, value: config.author },
    { title: t('settings.version'), isHeader: false, value: appVersion },
    { title: t('settings.logout'), isHeader: false, showIcon: true, onPress: logout },
  ];

  return (
    <BaseLayout>
      <Image source={{ uri: currentUser.avatarUrl }} style={styles.avatar} />
      <Text style={styles.displayName}>{currentUser.displayName}</Text>
      <List data={data} />
    </BaseLayout>
  );
};
