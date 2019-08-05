import React, { useState } from 'react';
import { Button, Text, Container, View } from '@app/components';
import { useTranslation } from 'react-i18next';
import { catchAndLog, ScreenProps, showNotification } from '@app/core';
import { authService, navigationService } from '@app/services';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { styles } from './styles';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ componentId, updateUser }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const checkStatus = catchAndLog(
    async () => {
      setIsBusy(true);
      if (await authService.isEmailVerified()) {
        const user = authService.getCurrentUser();
        if (!user) {
          navigationService.setRootLogin();
          return;
        }
        updateUser(user);
        navigationService.setRootHome();
      } else {
        showNotification({
          type: 'WARNING',
          message: t('emailVerificationScreen.emailNotVerified'),
        });
      }
    },
    async () => setIsBusy(false),
  );

  const resendVerification = catchAndLog(
    async () => {
      setIsBusy(true);
      // showNotification({ type: 'ERROR', message });
    },
    async () => setIsBusy(false),
  );

  const openMailbox = catchAndLog(
    async () => {
      setIsBusy(true);
      // showNotification({ type: 'ERROR', message });
    },
    async () => setIsBusy(false),
  );

  const logout = catchAndLog(
    async () => {
      setIsBusy(true);
      // showNotification({ type: 'ERROR', message });
    },
    async () => setIsBusy(false),
  );

  return (
    <Container showHeader componentId={componentId} headerTitle={t('emailVerificationScreen.verifyEmail')}>
      <View column style={styles.buttonContainer}>
        <Button full onPress={checkStatus} disabled={isBusy} style={styles.buttonContainer}>
          <Text>{t('emailVerificationScreen.check')}</Text>
        </Button>
        <Button full onPress={resendVerification} disabled={isBusy} style={styles.buttonContainer}>
          <Text>{t('emailVerificationScreen.resendVerification')}</Text>
        </Button>
        <Button full onPress={openMailbox} disabled={isBusy} style={styles.buttonContainer}>
          <Text>{t('emailVerificationScreen.openMailbox')}</Text>
        </Button>
        <Button full onPress={logout} disabled={isBusy} style={styles.buttonContainer}>
          <Text>{t('emailVerificationScreen.useAnotherAccount')}</Text>
        </Button>
      </View>
    </Container>
  );
};
