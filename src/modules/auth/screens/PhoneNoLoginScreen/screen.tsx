import React, { useState } from 'react';
import { Container } from '@app/components';
import { useTranslation } from 'react-i18next';
import { ScreenProps, showNotification, handleError } from '@app/core';
import { useEffectOnce } from '@app/hooks';
import { authService, navigationService } from '@app/services';
import auth, { Auth } from '@react-native-firebase/auth';
import produce from 'immer';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { PhoneNoInput, VerificationCodeInput, ResendVerificationCodeStatus } from './components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

interface State {
  phoneNo: string;
  confirmResult?: Auth.ConfirmationResult;
  isVerificationCodeSent: boolean;
  waitingTimeToResend: number;
  showPhoneNoInput: boolean;
}

export const Screen = ({ componentId, login, language }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    phoneNo: '',
    confirmResult: undefined,
    isVerificationCodeSent: false,
    waitingTimeToResend: 0,
    showPhoneNoInput: true,
  });
  let resendInterval: NodeJS.Timeout | undefined;

  useEffectOnce(() => {
    const unsubscribeOnAuthStateChanged = auth().onAuthStateChanged((user) => {
      if (user) {
        login(authService.getUser(user));
        navigationService.setRootHome();
      }
    });
    return () => {
      // console.log(resendInterval);
      if (resendInterval) {
        clearInterval(resendInterval);
      }
      if (unsubscribeOnAuthStateChanged) {
        unsubscribeOnAuthStateChanged();
      }
    };
  });

  const sendVerificationCode = async (phoneNo: string): Promise<void> => {
    try {
      setIsBusy(true);
      const result = await authService.sendSmsVerification(phoneNo, language);
      setState(
        produce((draftState: State) => {
          draftState.phoneNo = phoneNo;
          draftState.showPhoneNoInput = false;
          draftState.isVerificationCodeSent = true;
          draftState.waitingTimeToResend = 30;
          draftState.confirmResult = result;
        }),
      );
      resendInterval = setInterval(() => {
        setState(
          produce((draftState: ResendVerificationCodeStatus) => {
            if (!draftState.isVerificationCodeSent) {
              draftState.isVerificationCodeSent = true;
            }
            if (draftState.waitingTimeToResend > 1) {
              draftState.waitingTimeToResend -= 1;
            } else if (draftState.waitingTimeToResend === 1) {
              draftState.isVerificationCodeSent = false;
              draftState.waitingTimeToResend = 0;
            }
          }),
        );
      }, 1000);
    } catch (error) {
      handleError(
        error,
        {
          'auth/too-many-requests': t('phoneNoLoginScreen.tooManyRequests'),
        },
        {
          'auth/popup-closed-by-user': true,
        },
      );
    } finally {
      setIsBusy(false);
    }
  };

  const resendVerificationCode = (): Promise<void> => sendVerificationCode(state.phoneNo);

  const verifyCode = async (code: string): Promise<void> => {
    try {
      if (!state.confirmResult) {
        return;
      }
      setIsBusy(true);
      const user = await authService.verifySmsCode(state.confirmResult, code);
      if (!user) {
        showNotification({
          type: 'ERROR',
          message: t('phoneNoLoginScreen.invalidVerificationCode'),
        });
        return;
      }
      login(user);
      navigationService.setRootHome();
    } catch (error) {
      handleError(error, {
        'auth/invalid-verification-code': t('phoneNoLoginScreen.invalidVerificationCode'),
        'auth/user-disabled': t('phoneNoLoginScreen.userDisabled'),
      });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Container showHeader showBackButton componentId={componentId} headerTitle={t('phoneNoLoginScreen.login')}>
      {state.showPhoneNoInput && <PhoneNoInput isBusy={isBusy} sendVerificationCode={sendVerificationCode} />}
      {!state.showPhoneNoInput && (
        <VerificationCodeInput
          phoneNo={state.phoneNo}
          isBusy={isBusy}
          verifyCode={verifyCode}
          resendVerificationCodeStatus={state}
          resendVerificationCode={resendVerificationCode}
        />
      )}
    </Container>
  );
};
