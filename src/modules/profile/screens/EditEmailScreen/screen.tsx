import React, { useState } from 'react';
import { ScreenProps, commonStyles, showNotification, NotificationTypes } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container, Text, View, FormItem, Input } from '@app/components';
import { Formik, FormikContext } from 'formik';
import * as yup from 'yup';
import { config } from '@app/config';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import gql from 'graphql-tag';
import _ from 'lodash';
import { styles } from './styles';
import { navigationService } from '../../../../services';

type Props = {
  email: string;
} & ScreenProps;

interface Values {
  email: string;
}

const fieldNames = {
  email: 'email',
};

const UPDATE_EMAIL = gql`
  mutation UpdateEmail($payload: UpdateUserInfoPayload!) {
    users {
      me(payload: $payload) {
        id
        email
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateEmail = async (values: Values): Promise<void> => {
    try {
      setLoading(true);
      const updateUserResult = await apolloClient.mutate({
        mutation: UPDATE_EMAIL,
        variables: {
          payload: {
            email: values.email,
          },
        },
      });

      updateCurrentUser(_.get(updateUserResult, 'data.users.me'));
      navigationService.goBack({
        componentId: props.componentId,
      });
    } catch (error) {
      showNotification({
        type: NotificationTypes.ERROR,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    email: props.email,
  };

  const validationSchema = yup.object().shape({
    [fieldNames.email]: yup
      .string()
      .required(t('finishRegisterScreen.pleaseInputEmail'))
      .matches(config.regex.email, t('finishRegisterScreen.invalidEmailAddress')),
  });

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdateEmail}
    >
      {(context: FormikContext<Values>) => {
        const { values, errors, setFieldValue, handleSubmit } = context;
        return (
          <Container {...props} onRightButtonPress={handleSubmit} loading={loading}>
            <View style={styles.titleContainer}>
              <Text bold textCenter>
                {t('editEmailScreen.enterYourEmail')}
              </Text>
            </View>

            <FormItem error={errors.email}>
              <Input
                value={values.email}
                placeholder={t('editEmailScreen.emailPlaceholder')}
                style={commonStyles.maxWidth}
                autoCapitalize='none'
                keyboardType='email-address'
                onChangeText={(value: string) => setFieldValue('email', value)}
              />
            </FormItem>
          </Container>
        );
      }}
    </Formik>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
