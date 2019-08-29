import React from 'react';
import { Button, Text, Field } from '@app/components';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { styles } from './styles';

interface Props {
  phoneNo: string;
  isBusy: boolean;
  resendVerificationCodeStatus: ResendVerificationCodeStatus;
  verifyCode: (code: string) => void;
  resendVerificationCode: () => void;
}

export interface ResendVerificationCodeStatus {
  isVerificationCodeSent: boolean;
  waitingTimeToResend: number;
}

interface FormData {
  code: string;
}

export const VerificationCodeInput = ({
  verifyCode,
  isBusy,
  resendVerificationCodeStatus,
  resendVerificationCode,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const initialValues: FormData = {
    code: '',
  };
  const fieldNames = {
    code: 'code',
  };
  const validationSchema = Yup.object().shape({
    [fieldNames.code]: Yup.string().required(
      t('error.required', {
        field: t('phoneNoLoginScreen.verificationCode'),
      }),
    ),
  });

  const onSubmit = (values: FormData): void => {
    verifyCode(values.code);
  };

  const waitForResend =
    resendVerificationCodeStatus.isVerificationCodeSent && resendVerificationCodeStatus.waitingTimeToResend > 0;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
        return (
          <>
            <Field
              label={t('phoneNoLoginScreen.verificationCode')}
              value={values.code}
              onChangeText={handleChange(fieldNames.code)}
              onBlur={handleBlur(fieldNames.code)}
              error={touched.code && !!errors.code}
              success={touched.code && !errors.code}
              errorMessage={errors.code}
              keyboardType='numeric'
            />
            <Button onPress={handleSubmit} disabled={isBusy} style={[styles.button, styles.firstButton]}>
              <Text white>{t('phoneNoLoginScreen.verify')}</Text>
            </Button>
            <Button
              onPress={resendVerificationCode}
              disabled={
                isBusy ||
                (resendVerificationCodeStatus.isVerificationCodeSent &&
                  resendVerificationCodeStatus.waitingTimeToResend > 0)
              }
              style={styles.button}
            >
              <Text white>
                {t('phoneNoLoginScreen.resendCode')}
                {waitForResend ? ` (${resendVerificationCodeStatus.waitingTimeToResend})` : ''}
              </Text>
            </Button>
          </>
        );
      }}
    </Formik>
  );
};
