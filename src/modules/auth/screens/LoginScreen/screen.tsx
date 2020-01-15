import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageSources } from '@app/assets';
import { ScreenProps, showNotification, commonStyles } from '@app/core';
import { Image, Button, Text, Loading, Container, ImageIcon } from '@app/components';
import { navigationService, authService, LoginResult } from '@app/services';
import { User, apolloClient } from '@app/graphql';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import { styles } from './styles';

type Props = ScreenProps;

const appIconSource = imageSources.loginIcon();

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
      <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.appIconContainer}>
        <Image style={styles.appIcon} source={appIconSource} />
      </LinearGradient>

      <View style={styles.welcomeContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Welcome!!</Text>
        </View>
        <View>
          <Text style={styles.textCenter}>
            Create your account to get started. After that, you can share books and make friends
          </Text>
        </View>
      </View>

      <View>
        <Button rounded onPress={loginFacebook} style={[styles.button, styles.facebookButton, commonStyles.boxShadow]}>
          <ImageIcon source={imageSources.facebookIcon()} />
          <Text white>{t('loginScreen.continueWith')} Facebook</Text>
          <View />
        </Button>
        <Button rounded onPress={loginGoogle} style={[styles.button, styles.googleButton, commonStyles.boxShadow]}>
          <ImageIcon source={imageSources.googleIcon()} />
          <Text>{t('loginScreen.continueWith')} Google</Text>
          <View />
        </Button>
      </View>
    </Container>
  );
};
