import React, { useState } from 'react';
import { ScreenProps, commonStyles, showNotification, NotificationTypes } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container, Text, View, FormItem, Input } from '@app/components';
import { Formik, FormikContext } from 'formik';
import * as yup from 'yup';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import gql from 'graphql-tag';
import _ from 'lodash';
import { navigationService } from '@app/services';
import { styles } from './styles';

type Props = {
  fullName: string;
} & ScreenProps;

interface Values {
  fullName: string;
}

const fieldNames = {
  fullName: 'fullName',
};

const UPDATE_FULLNAME = gql`
  mutation UpdateFullname($payload: UpdateUserInfoPayload!) {
    users {
      me(payload: $payload) {
        id
        fullName
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateFullname = async (values: Values): Promise<void> => {
    try {
      setLoading(true);
      const updateUserResult = await apolloClient.mutate({
        mutation: UPDATE_FULLNAME,
        variables: {
          payload: {
            fullName: values.fullName,
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
    fullName: props.fullName,
  };

  const validationSchema = yup.object().shape({
    [fieldNames.fullName]: yup.string().required(t('finishRegisterScreen.pleaseInputFullName')),
  });

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdateFullname}
    >
      {(context: FormikContext<Values>) => {
        const { values, errors, setFieldValue, handleSubmit } = context;
        return (
          <Container {...props} onRightButtonPress={handleSubmit} loading={loading}>
            <View style={styles.titleContainer}>
              <Text bold textCenter>
                {t('editFullnameScreen.enterYourFullname')}
              </Text>
            </View>

            <FormItem error={errors.fullName}>
              <Input
                value={values.fullName}
                placeholder={t('editFullnameScreen.fullnamePlaceholder')}
                style={commonStyles.maxWidth}
                autoCapitalize='words'
                onChangeText={(value: string) => setFieldValue('fullName', value)}
              />
            </FormItem>
          </Container>
        );
      }}
    </Formik>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
