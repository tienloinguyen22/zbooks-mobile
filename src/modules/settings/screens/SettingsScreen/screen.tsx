import React, { useState } from 'react';
import { ScreenProps } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container } from '@app/components';
import { SettingMenuItem, LogoutModal } from './components';

type Props = ScreenProps;

const BaseScreen = (_props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

  const openLogoutModal = (): void => {
    setLogoutModalVisible(true);
  };

  const closeLogoutModal = (): void => {
    setLogoutModalVisible(false);
  };

  const navigateToProfileScreen = (): void => {
    //
  };

  return (
    <Container showHeader headerTitle={t('settingsScreen.settings')}>
      <SettingMenuItem
        title={t('settingsScreen.profile')}
        showTopBorder={true}
        showArrow={true}
        onPress={navigateToProfileScreen}
      />
      <SettingMenuItem
        title={t('settingsScreen.notifications')}
        showTopBorder={false}
        showArrow={true}
        onPress={navigateToProfileScreen}
      />
      <SettingMenuItem
        title={t('settingsScreen.genresPreferences')}
        showTopBorder={false}
        showArrow={true}
        onPress={navigateToProfileScreen}
      />
      <SettingMenuItem
        title={t('settingsScreen.logout')}
        showTopBorder={false}
        showArrow={false}
        onPress={openLogoutModal}
      />

      <LogoutModal visible={logoutModalVisible} closeLogoutModal={closeLogoutModal} />
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
