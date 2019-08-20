import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageSources } from '@app/assets';
import { ScreenProps, catchAndLog, screenNames, colors, showNotification } from '@app/core';
import { Image, Button, Text, Icon, Loading, Container } from '@app/components';
import { navigationService, authService, LoginResult } from '@app/services';
import { styles } from './styles';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

const appIconSource = imageSources.appIcon();

export const Screen = ({ login, componentId }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const performLogin = async (loginType: 'GOOGLE' | 'FACEBOOK'): Promise<void> => {
    let result: LoginResult | undefined;
    switch (loginType) {
      case 'FACEBOOK':
        result = await authService.loginFacebook();
        break;
      case 'GOOGLE':
        result = await authService.loginGoogle();
        break;
      default:
        return;
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

  const loginFacebook = catchAndLog(
    async () => {
      setIsBusy(true);
      await performLogin('FACEBOOK');
    },
    async () => setIsBusy(false),
  );

  const loginGoogle = catchAndLog(
    async () => {
      setIsBusy(true);
      await performLogin('GOOGLE');
    },
    async () => setIsBusy(false),
  );

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
      <Button full rounded onPress={loginFacebook} style={[styles.button, styles.facebookButton]}>
        <Icon name='facebook' color={colors.white} />
        <Text white>{t('loginScreen.loginWith')} Facebook</Text>
      </Button>
      <Button full rounded onPress={loginGoogle} style={[styles.button, styles.googleButton]}>
        <Icon name='google' color={colors.white} />
        <Text white>{t('loginScreen.loginWith')} Google</Text>
      </Button>
      <Button full rounded onPress={loginEmail} style={[styles.button]}>
        <Text white>{t('loginScreen.loginWithEmail')}</Text>
      </Button>
      <Button full rounded onPress={loginPhoneNo} style={[styles.button]}>
        <Text white>{t('loginScreen.loginWithPhoneNo')}</Text>
      </Button>
      <Text style={styles.notHaveAccountText}>{t('loginScreen.notHaveAccount')}</Text>
      <Button full rounded onPress={registerByEmail} style={styles.button}>
        <Text white>{t('loginScreen.registerByEmail')}</Text>
      </Button>
    </Container>
  );
};
