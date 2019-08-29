import React from 'react';
import { Button, Text, Field, PickerDataItem } from '@app/components';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { jsonSources } from '@app/assets';
import { config } from '@app/config';
import { styles } from './styles';

interface Props {
  isBusy: boolean;
  sendVerificationCode: (phoneNo: string) => void;
}

interface FormData {
  countryCode: string;
  phoneNo: string;
}

const countries: PickerDataItem<string>[] = jsonSources.countries().map((country) => ({
  value: country.dialCode,
  text: `${country.name} (${country.dialCode})`,
}));

export const PhoneNoInput = ({ sendVerificationCode, isBusy }: Props): JSX.Element => {
  const { t } = useTranslation();

  const initialValues: FormData = {
    countryCode: '+84',
    phoneNo: '',
  };
  const fieldNames = {
    countryCode: 'countryCode',
    phoneNo: 'phoneNo',
  };
  const validationSchema = Yup.object().shape({
    [fieldNames.countryCode]: Yup.string().required(
      t('error.required', {
        field: t('phoneNoLoginScreen.countryCode'),
      }),
    ),
    [fieldNames.phoneNo]: Yup.string()
      .matches(
        config.regex.phone,
        t('error.invalid', {
          field: t('phoneNoLoginScreen.phoneNo'),
        }),
      )
      .required(
        t('error.required', {
          field: t('phoneNoLoginScreen.phoneNo'),
        }),
      ),
  });

  const onSubmit = (values: FormData): void => {
    sendVerificationCode(`${values.countryCode}${values.phoneNo}`);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
        return (
          <>
            <Field
              label={t('phoneNoLoginScreen.countryCode')}
              value={values.countryCode}
              onChangeText={handleChange(fieldNames.countryCode)}
              onBlur={handleBlur(fieldNames.countryCode)}
              error={touched.countryCode && !!errors.countryCode}
              success={touched.countryCode && !errors.countryCode}
              errorMessage={errors.countryCode}
              type='picker'
              pickerDataSources={countries}
            />
            <Field
              label={t('phoneNoLoginScreen.phoneNo')}
              value={values.phoneNo}
              onChangeText={handleChange(fieldNames.phoneNo)}
              onBlur={handleBlur(fieldNames.phoneNo)}
              error={touched.phoneNo && !!errors.phoneNo}
              success={touched.phoneNo && !errors.phoneNo}
              errorMessage={errors.phoneNo}
              keyboardType='numeric'
            />
            <Button onPress={handleSubmit} disabled={isBusy} style={styles.button}>
              <Text white>{t('phoneNoLoginScreen.sendVerificationCode')}</Text>
            </Button>
          </>
        );
      }}
    </Formik>
  );
};
