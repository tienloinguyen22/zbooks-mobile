import React from 'react';
import { ScreenProps, i18n, catchAndLog, screenNames, Language } from '@app/core';
import { config } from '@app/config';
import { List, ListItemData, Picker, Image, Text, Container, Icon, View } from '@app/components';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { navigationService, authService } from '@app/services';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';
import { styles } from './styles';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ componentId, changeLanguage, language, currentUser, logout }: Props): JSX.Element => {
  const { t } = useTranslation();
  const appVersion = Platform.OS === 'android' ? config.android.version : config.ios.version;

  const performLogout = catchAndLog(async () => {
    await authService.logout();
    logout();
    navigationService.setRootLogin();
  });

  const selectLanguage = (): void => {
    Picker.show<string>({
      dataSources: i18n.LANGUAGES.map((lang: Language) => ({
        value: lang.id,
        text: lang.name,
      })),
      initialValue: language,
      onValueChanged: changeLanguage,
    });
  };

  const openChangePasswordScreen = (): void =>
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.ChangePasswordScreen,
    });

  const settingData: ListItemData[] = [
    {
      title: t('settingsScreen.settings'),
      isHeader: true,
    },
    {
      title: t('settingsScreen.language'),
      isHeader: false,
      value: i18n.getLanguageName(language),
      onPress: selectLanguage,
      showIcon: true,
    },
    {
      title: t('settingsScreen.about'),
      isHeader: true,
    },
    {
      title: t('settingsScreen.author'),
      isHeader: false,
      value: config.author,
    },
    {
      title: t('settingsScreen.version'),
      isHeader: false,
      value: appVersion,
    },
    {
      title: t('settingsScreen.logout'),
      isHeader: false,
      showIcon: true,
      onPress: performLogout,
    },
  ];

  if (currentUser && currentUser.loginType === 'EMAIL') {
    settingData.splice(2, 0, {
      title: t('settingsScreen.changePassword'),
      isHeader: false,
      onPress: openChangePasswordScreen,
      showIcon: true,
    });
  }

  return (
    <Container showHeader headerTitle={t('settingsScreen.settings')}>
      {!!currentUser.avatarUrl && (
        <Image
          source={{
            uri: currentUser.avatarUrl,
          }}
          style={styles.avatar}
        />
      )}
      {!currentUser.avatarUrl && (
        <View style={styles.avatar}>
          <Icon name='account-circle-outline' size={150} />
        </View>
      )}
      <Text style={styles.displayName}>{currentUser.displayName}</Text>
      <List data={settingData} />
    </Container>
  );
};
