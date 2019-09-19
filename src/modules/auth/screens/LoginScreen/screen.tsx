import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageSources } from '@app/assets';
import { ScreenProps, screenNames, colors, showNotification } from '@app/core';
import { Image, Button, Text, Icon, Loading, Container } from '@app/components';
import { navigationService, authService, LoginResult, appService } from '@app/services';
import { useEffectOnce } from '@app/hooks';
import { styles } from './styles';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

const appIconSource = imageSources.appIcon();

export const Screen = ({
  login,
  componentId,
  shouldShownUpdateWarning,
  updateShownUpdateWarning,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);
  useEffectOnce(() => {
    if (shouldShownUpdateWarning) {
      appService.checkNeedUpdateNewBinaryVersion();
      updateShownUpdateWarning(false);
    }
  });
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

  const loginEmail = (): void =>
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.EmailLoginScreen,
    });
  const loginPhoneNo = (): void =>
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.PhoneNoLoginScreen,
    });

  const registerByEmail = (): void => {
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.EmailRegisterScreen,
    });
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
      <Button rounded onPress={loginEmail} style={[styles.button]}>
        <Text white>{t('loginScreen.loginWithEmail')}</Text>
      </Button>
      <Button rounded onPress={loginPhoneNo} style={[styles.button]}>
        <Text white>{t('loginScreen.loginWithPhoneNo')}</Text>
      </Button>
      <Text style={styles.notHaveAccountText}>{t('loginScreen.notHaveAccount')}</Text>
      <Button rounded onPress={registerByEmail} style={styles.button}>
        <Text white>{t('loginScreen.registerByEmail')}</Text>
      </Button>
    </Container>
  );
};
