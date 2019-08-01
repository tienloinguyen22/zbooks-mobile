import React, { useState } from 'react';
import { View, Button, Form, Text, Field } from '@app/components';
import { useTranslation } from 'react-i18next';
import { Container } from '@app/components';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { Formik, FormikProps } from 'formik';
import { catchAndLog, ScreenProps, screenNames, showNotification } from '@app/core';
import { styles } from './styles';
import { navigationService } from '@app/services';

interface FormData {
  email: string;
  isEmailRegistered: boolean;
  password: string;
  confirmPassword: string;
}

export const Screen = ({ componentId }: ScreenProps) => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const initialValues: FormData = {
    email: '',
    isEmailRegistered: false,
    password: '',
    confirmPassword: '',
  };
  const fieldNames = {
    email: 'email',
    isEmailRegistered: 'isEmailRegistered',
    password: 'password',
    confirmPassword: 'confirmPassword',
  };
  const validationSchema = Yup.object().shape({
    [fieldNames.email]: Yup.string()
      .email(t('error.invalid', { field: t('emailRegisterScreen.email') }))
      .required(t('error.required', { field: t('emailRegisterScreen.email') })),
    [fieldNames.isEmailRegistered]: Yup.boolean().oneOf(
      [false],
      t('emailRegisterScreen.emailHasBeenAlreadyRegistered'),
    ),
    [fieldNames.password]: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        t('error.invalid', { field: t('emailRegisterScreen.password') }),
      )
      .required(t('error.required', { field: t('emailRegisterScreen.password') })),
    [fieldNames.confirmPassword]: Yup.string()
      .oneOf([Yup.ref('password')], t('emailRegisterScreen.confirmPasswordDoesNotMatch'))
      .required(t('error.required', { field: t('emailRegisterScreen.confirmPassword') })),
  });

  let formikProps: FormikProps<FormData>;

  const validateUniqueEmail = catchAndLog(
    async (email: string) => {
      if (formikProps.errors.email) {
        return;
      }
      let isEmailRegistered = false;
      try {
        await auth().signInWithEmailAndPassword(email, ' ');
      } catch (error) {
        if (error.code !== 'auth/user-not-found') {
          isEmailRegistered = true;
        }
        if (!error.code) {
          throw error;
        }
      }
      const message = isEmailRegistered ? t('emailRegisterScreen.emailHasBeenAlreadyRegistered') : undefined;
      formikProps.setFieldValue('isEmailRegistered', isEmailRegistered);
      formikProps.setFieldError('isEmailRegistered', message as any);
    },
    async () => setIsBusy(false),
  );
  const debounceValidateUniqueEmail = _.debounce(validateUniqueEmail, 500);
  const handleChangeEmail = (email: string) => {
    formikProps.handleChange(fieldNames.email)(email);
    debounceValidateUniqueEmail(email);
  };
  const onSubmit = catchAndLog(
    async (values: FormData) => {
      setIsBusy(true);
      await validateUniqueEmail(values.email);
      if (!formikProps.isValid) {
        return;
      }
      showNotification({ type: 'success', message: t('emailRegisterScreen.accountHasBeenCreated') });
      const credential = await auth().createUserWithEmailAndPassword(values.email, values.password);
      credential.user.sendEmailVerification();
      showNotification({ type: 'success', message: t('emailRegisterScreen.accountHasBeenCreated') });
      navigationService.navigateTo({ componentId, screenName: screenNames.EmailVerificationScreen });
    },
    async () => setIsBusy(false),
  );

  return (
    <Container showHeader showBackButton componentId={componentId} headerTitle={t('emailRegisterScreen.register')}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => {
          formikProps = props;
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <Form>
              <Field
                label={t('emailRegisterScreen.email')}
                value={values.email}
                onChangeText={handleChangeEmail}
                onBlur={handleBlur(fieldNames.email)}
                showError={(touched.email && !!errors.email) || (touched.email && !!errors.isEmailRegistered)}
                errorMessage={touched.email && !!errors.email ? errors.email : errors.isEmailRegistered}
              />
              <Field
                label={t('emailRegisterScreen.password')}
                value={values.password}
                onChangeText={handleChange(fieldNames.password)}
                onBlur={handleBlur(fieldNames.password)}
                showError={touched.password && !!errors.password}
                errorMessage={errors.password}
                secureTextEntry
              />
              <Field
                label={t('emailRegisterScreen.confirmPassword')}
                value={values.confirmPassword}
                onChangeText={handleChange(fieldNames.confirmPassword)}
                onBlur={handleBlur(fieldNames.confirmPassword)}
                showError={touched.confirmPassword && !!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                secureTextEntry
              />
              <View style={styles.buttonContainer}>
                <Button full onPress={handleSubmit} disabled={isBusy}>
                  <Text>{t('emailRegisterScreen.register')}</Text>
                </Button>
              </View>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
