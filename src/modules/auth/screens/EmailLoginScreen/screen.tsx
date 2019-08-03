import React, { useState } from 'react';
import { View, Button, Form, Text, Field, Container } from '@app/components';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { catchAndLog, ScreenProps, showNotification, i18n } from '@app/core';
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
      .email(t('error.invalid', { field: t('emailLoginScreen.email') }))
      .required(t('error.required', { field: t('emailLoginScreen.email') })),
    [fieldNames.password]: Yup.string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, t('error.invalid', { field: t('emailLoginScreen.password') }))
      .required(t('error.required', { field: t('emailLoginScreen.password') })),
  });

  const onSubmit = catchAndLog(
    async (values: FormData) => {
      setIsBusy(true);
      try {
        const user = await authService.signInWithEmailAndPassword(values.email, values.password);
        login(user);
        navigationService.setRootHome();
      } catch (error) {
        if (!error.code) {
          throw error;
        }
        let message = '';
        switch (error.code) {
          case 'auth/invalid-email':
            message = t('emailLoginScreen.wrongEmailOrPassword');
            break;
          case 'auth/user-disabled':
            message = t('emailLoginScreen.userDisabled');
            break;
          case 'auth/user-not-found':
            message = t('emailLoginScreen.wrongEmailOrPassword');
            break;
          case 'auth/wrong-password':
            message = t('emailLoginScreen.wrongEmailOrPassword');
            break;
          default:
        }
        !!message && showNotification({ type: 'ERROR', message });
      }
    },
    async () => setIsBusy(false),
  );

  return (
    <Container showHeader showBackButton componentId={componentId} headerTitle={t('emailLoginScreen.login')}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <Form>
              <Field
                label={t('emailLoginScreen.email')}
                value={values.email}
                onChangeText={handleChange(fieldNames.email)}
                onBlur={handleBlur(fieldNames.email)}
                showError={touched.email && !!errors.email}
                showSuccess={touched.email && !errors.email}
                errorMessage={errors.email}
              />
              <Field
                label={t('emailLoginScreen.password')}
                value={values.password}
                onChangeText={handleChange(fieldNames.password)}
                onBlur={handleBlur(fieldNames.password)}
                showError={touched.password && !!errors.password}
                showSuccess={touched.email && !errors.password}
                errorMessage={errors.password}
                secureTextEntry
                hasTooltip
                tooltipText={t('emailLoginScreen.passwordInfo')}
                tooltipHeight={language === i18n.LANGUAGE_EN ? 140 : 100}
              />
              <View column style={styles.buttonContainer}>
                <Button full onPress={handleSubmit} disabled={isBusy}>
                  <Text>{t('emailLoginScreen.login')}</Text>
                </Button>
              </View>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
