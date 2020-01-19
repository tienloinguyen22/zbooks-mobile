import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Container, Text, Input, FormItem } from '@app/components';
import { ScreenProps, commonStyles, showNotification, NotificationTypes } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Formik, FormikContext, FormikActions } from 'formik';
import * as yup from 'yup';
import { config } from '@app/config';
import gql from 'graphql-tag';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import { authService, navigationService } from '@app/services';
import _ from 'lodash';
import { styles } from './styles';

type Props = {
  userInfo: {
    email: string;
    fullName: string;
  };
} & ScreenProps;

interface Values {
  email: string;
  fullName: string;
}

const fieldNames = {
  email: 'email',
  fullName: 'fullName',
};

const REGISTER_USER_WITH_TOKEN = gql`
  mutation registerUserWithToken($payload: RegisterWithTokenPayload!) {
    users {
      registerWithToken(payload: $payload) {
        id
        email
        fullName
        avatarUrl
        firebaseId
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinishRegister = async (values: Values, _formikActions: FormikActions<Values>): Promise<void> => {
    try {
      setLoading(true);
      const idToken = await authService.getIdToken();
      const registerUserResult = await apolloClient.mutate({
        mutation: REGISTER_USER_WITH_TOKEN,
        variables: {
          payload: {
            token: idToken,
            email: values.email,
            fullName: values.fullName,
          },
        },
      });

      updateCurrentUser({
        ..._.get(registerUserResult, 'data.users.registerWithToken'),
        isLoggedIn: true,
      });
      navigationService.setRootHome();
    } catch (error) {
      showNotification({
        message: error.message,
        type: NotificationTypes.ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = yup.object().shape({
    [fieldNames.email]: yup
      .string()
      .required(t('finishRegisterScreen.pleaseInputEmail'))
      .matches(config.regex.email, t('finishRegisterScreen.invalidEmailAddress')),
    [fieldNames.fullName]: yup.string().required(t('finishRegisterScreen.pleaseInputFullName')),
  });

  const initialValues = props.userInfo;

  return (
    <Container
      showHeader={props.showHeader}
      showBackButton={props.showBackButton}
      headerTitle={props.headerTitle}
      componentId={props.componentId}
      center
    >
      <View style={styles.welcomeContainer}>
        <View style={styles.titleContainer}>
          <Text h2 bold style={styles.textCenter}>
            {t('finishRegisterScreen.title')}
          </Text>
        </View>
        <View>
          <Text style={styles.textCenter}>{t('finishRegisterScreen.description')}</Text>
        </View>
      </View>

      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFinishRegister}
      >
        {(context: FormikContext<Values>) => {
          const { values, errors, setFieldValue, handleSubmit } = context;

          return (
            <View style={styles.formContainer}>
              <FormItem error={errors.email}>
                <Input
                  value={values.email}
                  placeholder={t('finishRegisterScreen.emailPlaceholder')}
                  style={[styles.input]}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  onChangeText={(value: string) => setFieldValue('email', value)}
                />
              </FormItem>

              <FormItem error={errors.fullName}>
                <Input
                  placeholder={t('finishRegisterScreen.fullNamePlaceholder')}
                  style={[styles.input]}
                  autoCapitalize='words'
                  value={values.fullName}
                  onChangeText={(value: string) => setFieldValue('fullName', value)}
                />
              </FormItem>

              <Button rounded onPress={handleSubmit} style={commonStyles.boxShadow} disabled={loading}>
                <Text white>{t('common.continue')}</Text>
              </Button>
            </View>
          );
        }}
      </Formik>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
