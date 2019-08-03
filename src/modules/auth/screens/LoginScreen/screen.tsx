import React, { useState } from 'react';
import { View, Image, Button, Text, Icon, Loading, Container } from '@app/components';
import { navigationService } from '@app/services';
import { ScreenProps, catchAndLog, LoginType, LOGIN_TYPE, screenNames, colors } from '@app/core';
import { useTranslation } from 'react-i18next';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import auth, { Auth } from '@react-native-firebase/auth';
import { imageSources } from '@app/assets';
import { styles } from './styles';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

const appIconSource = imageSources.appIcon();

export const Screen = ({ login, componentId }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const loginFacebookAndGetCredential = async (): Promise<Auth.AuthCredential | undefined> => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      return undefined;
    }
    // get the access token
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      // handle this however suites the flow of your app
      throw new Error('Something went wrong obtaining the users access token');
    }
    return auth.FacebookAuthProvider.credential(data.accessToken);
  };

  const loginGoogleAndGetCredential = async (): Promise<Auth.AuthCredential | undefined> => {
    try {
      await GoogleSignin.signIn();
      const { idToken, accessToken } = await GoogleSignin.getTokens();
      return auth.GoogleAuthProvider.credential(idToken, accessToken);
    } catch (error) {
      if (
        error.message.indexOf('The user canceled the sign in request') > -1 ||
        error.message.indexOf('Sign in action cancelled') > -1
      ) {
        return undefined;
      }
      throw error;
    }
  };

  const performLogin = catchAndLog(
    async (loginType: LoginType) => {
      setIsBusy(true);
      let credential: Auth.AuthCredential | undefined;
      switch (loginType) {
        case LOGIN_TYPE.FACEBOOK:
          credential = await loginFacebookAndGetCredential();
          break;
        case LOGIN_TYPE.GOOGLE:
          credential = await loginGoogleAndGetCredential();
          break;
        default:
          break;
      }

      if (!credential) {
        setIsBusy(false);
        return;
      }

      // login with credential
      const { user } = await auth().signInWithCredential(credential);
      const avatarUrl =
        user.photoURL && user.photoURL.indexOf('facebook') > -1 ? `${user.photoURL}?height=500` : user.photoURL;
      login({
        id: user.uid,
        displayName: user.displayName || undefined,
        avatarUrl: avatarUrl || undefined,
        isLoggedIn: true,
      });
      navigationService.setRootHome();
    },
    async () => setIsBusy(false),
  );

  const loginFacebook = (): Promise<void> => performLogin(LOGIN_TYPE.FACEBOOK);

  const loginGoogle = (): Promise<void> => performLogin(LOGIN_TYPE.GOOGLE);

  const registerByEmail = (): void => {
    navigationService.navigateTo({ componentId, screenName: screenNames.EmailRegisterScreen });
  };

  if (isBusy) {
    return (
      <Container>
        <View center centerVertical>
          <Loading />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View center centerVertical>
        <Image style={styles.appIcon} source={appIconSource} />
        <Button full rounded onPress={loginFacebook} style={[styles.button, styles.facebookButton]}>
          <Icon name='facebook' color={colors.white} />
          <Text>{t('loginScreen.loginWith')} Facebook</Text>
        </Button>
        <Button full rounded onPress={loginGoogle} style={[styles.button, styles.googleButton]}>
          <Icon name='google' color={colors.white} />
          <Text>{t('loginScreen.loginWith')} Google</Text>
        </Button>
        <Button full rounded onPress={loginGoogle} style={[styles.button]}>
          <Text>{t('loginScreen.loginWithEmail')}</Text>
        </Button>
        <Button full rounded onPress={loginGoogle} style={[styles.button]}>
          <Text>{t('loginScreen.loginWithPhoneNo')}</Text>
        </Button>
        <Text style={styles.notHaveAccountText}>{t('loginScreen.notHaveAccount')}</Text>
        <Button full rounded onPress={registerByEmail} style={styles.button}>
          <Text>{t('loginScreen.registerByEmail')}</Text>
        </Button>
        <Button full rounded onPress={registerByEmail} style={styles.button}>
          <Text>{t('loginScreen.registerByPhoneNo')}</Text>
        </Button>
      </View>
    </Container>
  );
};
