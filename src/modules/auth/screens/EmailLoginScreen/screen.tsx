import React, { useState } from 'react';
import { Button, Text, Field, Container } from '@app/components';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ScreenProps, i18n, screenNames, handleError } from '@app/core';
import { navigationService, authService } from '@app/services';
import { styles } from './styles';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

interface FormData {
  email: string;
  password: string;
}

export const Screen = ({ componentId, login, language }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const initialValues: FormData = {
    email: '',
    password: '',
  };
  const fieldNames = {
    email: 'email',
    password: 'password',
  };
  const validationSchema = Yup.object().shape({
    [fieldNames.email]: Yup.string()
      .email(
        t('error.invalid', {
          field: t('emailLoginScreen.email'),
        }),
      )
      .required(
        t('error.required', {
          field: t('emailLoginScreen.email'),
        }),
      ),
    [fieldNames.password]: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        t('error.invalid', {
          field: t('emailLoginScreen.password'),
        }),
      )
      .required(
        t('error.required', {
          field: t('emailLoginScreen.password'),
        }),
      ),
  });

  const onSubmit = async (values: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      const user = await authService.signInWithEmailAndPassword(values.email, values.password);
      login(user);
      if (user.emailVerified) {
        navigationService.setRootHome();
      } else {
        navigationService.setRootEmailVerification();
      }
    } catch (error) {
      handleError(error, {
        'auth/invalid-email': t('emailLoginScreen.wrongEmailOrPassword'),
        'auth/user-disabled': t('emailLoginScreen.userDisabled'),
        'auth/user-not-found': t('emailLoginScreen.wrongEmailOrPassword'),
        'auth/wrong-password': t('emailLoginScreen.wrongEmailOrPassword'),
      });
    } finally {
      setIsBusy(false);
    }
  };

  const forgotPassword = (): void =>
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.ForgotPasswordScreen,
    });

  return (
    <Container showHeader showBackButton componentId={componentId} headerTitle={t('emailLoginScreen.login')}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <>
              <Field
                label={t('emailLoginScreen.email')}
                value={values.email}
                onChangeText={handleChange(fieldNames.email)}
                onBlur={handleBlur(fieldNames.email)}
                error={touched.email && !!errors.email}
                success={touched.email && !errors.email}
                errorMessage={errors.email}
              />
              <Field
                label={t('emailLoginScreen.password')}
                value={values.password}
                onChangeText={handleChange(fieldNames.password)}
                onBlur={handleBlur(fieldNames.password)}
                error={touched.password && !!errors.password}
                success={touched.password && !errors.password}
                errorMessage={errors.password}
                secureTextEntry
                hasTooltip
                tooltipText={t('common.passwordInfo')}
                tooltipHeight={language === i18n.LANGUAGE_EN ? 140 : 100}
              />
              <Button onPress={handleSubmit} disabled={isBusy} style={[styles.button, styles.firstButton]}>
                <Text white>{t('emailLoginScreen.login')}</Text>
              </Button>
              <Button onPress={forgotPassword} disabled={isBusy} style={styles.button}>
                <Text white>{t('emailLoginScreen.forgotPassword')}</Text>
              </Button>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};
