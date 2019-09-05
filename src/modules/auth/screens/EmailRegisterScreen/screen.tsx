import React, { useState } from 'react';
import { Button, Text, Field, Container } from '@app/components';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { Formik, FormikProps } from 'formik';
import { ScreenProps, showNotification, i18n } from '@app/core';
import { navigationService, authService } from '@app/services';
import { styles } from './styles';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

interface FormData {
  email: string;
  isEmailRegistered: boolean;
  password: string;
  confirmPassword: string;
}

export const Screen = ({ componentId, language, login }: Props): JSX.Element => {
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
      .email(
        t('error.invalid', {
          field: t('emailRegisterScreen.email'),
        }),
      )
      .required(
        t('error.required', {
          field: t('emailRegisterScreen.email'),
        }),
      ),
    [fieldNames.isEmailRegistered]: Yup.boolean().oneOf(
      [false],
      t('emailRegisterScreen.emailHasBeenAlreadyRegistered'),
    ),
    [fieldNames.password]: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        t('error.invalid', {
          field: t('emailRegisterScreen.password'),
        }),
      )
      .required(
        t('error.required', {
          field: t('emailRegisterScreen.password'),
        }),
      ),
    [fieldNames.confirmPassword]: Yup.string()
      .oneOf([Yup.ref('password')], t('emailRegisterScreen.confirmPasswordDoesNotMatch'))
      .required(
        t('error.required', {
          field: t('emailRegisterScreen.confirmPassword'),
        }),
      ),
  });

  let formikProps: FormikProps<FormData>;

  const validateUniqueEmail = async (email: string): Promise<void> => {
    if (formikProps.errors.email) {
      return;
    }
    const isEmailRegistered = await authService.isEmailRegistered(email);
    const message = isEmailRegistered ? t('emailRegisterScreen.emailHasBeenAlreadyRegistered') : undefined;
    formikProps.setFieldValue('isEmailRegistered', isEmailRegistered);
    formikProps.setFieldError('isEmailRegistered', (message as unknown) as string);
  };

  const debounceValidateUniqueEmail = _.debounce(validateUniqueEmail, 500);

  const handleChangeEmail = (email: string): void => {
    formikProps.handleChange(fieldNames.email)(email);
    debounceValidateUniqueEmail(email);
  };

  const onSubmit = async (values: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      await validateUniqueEmail(values.email);
      if (!formikProps.isValid) {
        return;
      }
      const user = await authService.createUserWithEmailAndPassword(values.email, values.password, language);
      login(user);
      showNotification({
        type: 'SUCCESS',
        message: t('emailRegisterScreen.accountHasBeenCreated'),
      });
      navigationService.setRootEmailVerification();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Container showHeader showBackButton componentId={componentId} headerTitle={t('emailRegisterScreen.register')}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => {
          formikProps = props;
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <>
              <Field
                label={t('emailRegisterScreen.email')}
                value={values.email}
                onChangeText={handleChangeEmail}
                onBlur={handleBlur(fieldNames.email)}
                error={(touched.email && !!errors.email) || (touched.email && !!errors.isEmailRegistered)}
                success={touched.email && !errors.email && !errors.isEmailRegistered}
                errorMessage={touched.email && !!errors.email ? errors.email : errors.isEmailRegistered}
              />
              <Field
                label={t('emailRegisterScreen.password')}
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
                label={t('emailRegisterScreen.confirmPassword')}
                value={values.confirmPassword}
                onChangeText={handleChange(fieldNames.confirmPassword)}
                onBlur={handleBlur(fieldNames.confirmPassword)}
                error={touched.confirmPassword && !!errors.confirmPassword}
                success={touched.confirmPassword && !errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                secureTextEntry
              />
              <Button onPress={handleSubmit} disabled={isBusy} style={styles.button}>
                <Text white>{t('emailRegisterScreen.register')}</Text>
              </Button>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};
