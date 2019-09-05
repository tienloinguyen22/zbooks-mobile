import React, { useState } from 'react';
import { Button, Text, Field, Container } from '@app/components';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ScreenProps, showNotification, i18n, handleError } from '@app/core';
import { navigationService, authService } from '@app/services';
import { styles } from './styles';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

interface FormData {
  password: string;
  confirmPassword: string;
}

export const Screen = ({ componentId, language }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const initialValues: FormData = {
    password: '',
    confirmPassword: '',
  };
  const fieldNames = {
    password: 'password',
    confirmPassword: 'confirmPassword',
  };
  const validationSchema = Yup.object().shape({
    [fieldNames.password]: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        t('error.invalid', {
          field: t('changePasswordScreen.password'),
        }),
      )
      .required(
        t('error.required', {
          field: t('changePasswordScreen.password'),
        }),
      ),
    [fieldNames.confirmPassword]: Yup.string()
      .oneOf([Yup.ref('password')], t('changePasswordScreen.confirmPasswordDoesNotMatch'))
      .required(
        t('error.required', {
          field: t('changePasswordScreen.confirmPassword'),
        }),
      ),
  });

  const onSubmit = async (values: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      await authService.changePassword(values.password);
      showNotification({
        type: 'SUCCESS',
        message: t('changePasswordScreen.passwordChanged'),
      });
      navigationService.goBack({
        componentId,
      });
    } catch (error) {
      handleError(error, {
        'auth/requires-recent-login': t('changePasswordScreen.requireRecentLogin'),
      });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Container
      showHeader
      showBackButton
      componentId={componentId}
      headerTitle={t('changePasswordScreen.changePassword')}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <>
              <Field
                label={t('changePasswordScreen.password')}
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
              <Field
                label={t('changePasswordScreen.confirmPassword')}
                value={values.confirmPassword}
                onChangeText={handleChange(fieldNames.confirmPassword)}
                onBlur={handleBlur(fieldNames.confirmPassword)}
                error={touched.confirmPassword && !!errors.confirmPassword}
                success={touched.confirmPassword && !errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                secureTextEntry
              />
              <Button onPress={handleSubmit} disabled={isBusy} style={styles.button}>
                <Text white>{t('changePasswordScreen.changePassword')}</Text>
              </Button>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};
