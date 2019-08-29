import React, { useState } from 'react';
import { View, Button, Text, Field, Container } from '@app/components';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ScreenProps, showNotification, handleError } from '@app/core';
import { navigationService, authService } from '@app/services';
import { styles } from './styles';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

interface FormData {
  email: string;
}

export const Screen = ({ componentId, language }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const initialValues: FormData = {
    email: '',
  };
  const fieldNames = {
    email: 'email',
  };
  const validationSchema = Yup.object().shape({
    [fieldNames.email]: Yup.string()
      .email(
        t('error.invalid', {
          field: t('forgotPasswordScreen.email'),
        }),
      )
      .required(
        t('error.required', {
          field: t('forgotPasswordScreen.email'),
        }),
      ),
  });

  const onSubmit = async (values: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      await authService.sendPasswordResetEmail(values.email, language);
      setTimeout(() => {
        showNotification({
          type: 'SUCCESS',
          message: t('forgotPasswordScreen.passwordResetEmailSent'),
        });
        navigationService.goBack({
          componentId,
        });
      }, 2000);
    } catch (error) {
      handleError(error, {
        'auth/user-not-found': t('forgotPasswordScreen.userNotFound'),
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
      headerTitle={t('forgotPasswordScreen.forgotPassword')}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <>
              <Field
                label={t('forgotPasswordScreen.email')}
                value={values.email}
                onChangeText={handleChange(fieldNames.email)}
                onBlur={handleBlur(fieldNames.email)}
                error={touched.email && !!errors.email}
                success={touched.email && !errors.email}
                errorMessage={errors.email}
              />
              <View column>
                <Button onPress={handleSubmit} disabled={isBusy} style={styles.button}>
                  <Text white>{t('forgotPasswordScreen.sendPasswordResetEmail')}</Text>
                </Button>
              </View>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};
