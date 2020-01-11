import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageSources } from '@app/assets';
import { ScreenProps, colors, showNotification } from '@app/core';
import { Image, Button, Text, Icon, Loading, Container } from '@app/components';
import { navigationService, authService, LoginResult } from '@app/services';
import { User, apolloClient } from '@app/graphql';
import { styles } from './styles';

type Props = ScreenProps;

const appIconSource = imageSources.appIcon();

export const Screen = (_props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const login = (user: User): void => {
    apolloClient.cache.writeData({
      data: {
        currentUser: user,
      },
    });
  };

  const performLogin = async (loginType: 'GOOGLE' | 'FACEBOOK'): Promise<void> => {
    let result: LoginResult | undefined;
    switch (loginType) {
      case 'GOOGLE':
        result = await authService.loginGoogle();
        break;
      default:
        result = await authService.loginFacebook();
        break;
    }
    if (!result.isSuccessful) {
      if (result.errorMessage) {
        showNotification({
          type: 'ERROR',
          message: result.errorMessage,
        });
      }
      return;
    }
    login(result.user);
    navigationService.setRootHome();
  };

  const loginFacebook = async (): Promise<void> => {
    try {
      setIsBusy(true);
      await performLogin('FACEBOOK');
    } finally {
      setIsBusy(false);
    }
  };

  const loginGoogle = async (): Promise<void> => {
    try {
      setIsBusy(true);
      await performLogin('GOOGLE');
    } finally {
      setIsBusy(false);
    }
  };

  if (isBusy) {
    return (
      <Container center centerVertical>
        <Loading />
      </Container>
    );
  }

  return (
    <Container center centerVertical>
      <Image style={styles.appIcon} source={appIconSource} />
      <Button rounded onPress={loginFacebook} style={[styles.button, styles.facebookButton]}>
        <Icon name='facebook' color={colors.white} style={styles.icon} />
        <Text white>{t('loginScreen.loginWith')} Facebook</Text>
      </Button>
      <Button rounded onPress={loginGoogle} style={[styles.button, styles.googleButton]}>
        <Icon name='google' color={colors.white} style={styles.icon} />
        <Text white>{t('loginScreen.loginWith')} Google</Text>
      </Button>
    </Container>
  );
};
