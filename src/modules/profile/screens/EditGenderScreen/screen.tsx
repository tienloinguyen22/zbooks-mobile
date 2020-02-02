import React, { useState } from 'react';
import { ScreenProps, showNotification, NotificationTypes, Genders } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container, Text, View, FormItem, Radio } from '@app/components';
import { Formik, FormikContext } from 'formik';
import * as yup from 'yup';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import gql from 'graphql-tag';
import _ from 'lodash';
import { navigationService } from '@app/services';
import { styles } from './styles';

type Props = {
  gender: string;
} & ScreenProps;

interface Values {
  gender: string;
}

const fieldNames = {
  gender: 'gender',
};

const UPDATE_GENDER = gql`
  mutation UpdateFullname($payload: UpdateUserInfoPayload!) {
    users {
      me(payload: $payload) {
        id
        gender
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateGender = async (values: Values): Promise<void> => {
    try {
      setLoading(true);
      const updateUserResult = await apolloClient.mutate({
        mutation: UPDATE_GENDER,
        variables: {
          payload: {
            gender: values.gender,
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
    gender: props.gender,
  };

  const validationSchema = yup.object().shape({
    [fieldNames.gender]: yup
      .string()
      .required(t('editGenderScreen.pleaseSelectGender'))
      .oneOf([Genders.male, Genders.female, Genders.other], t('editGenderScreen.invalidGender')),
  });

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdateGender}
    >
      {(context: FormikContext<Values>) => {
        const { values, errors, setFieldValue, handleSubmit } = context;

        return (
          <Container {...props} onRightButtonPress={handleSubmit} loading={loading}>
            <View style={styles.titleContainer}>
              <Text bold textCenter>
                {t('editGenderScreen.selectYourGender')}
              </Text>
            </View>

            <FormItem error={errors.gender}>
              <Radio
                value={Genders.male}
                label={t(`common.${Genders.male}`)}
                isActive={values.gender === Genders.male}
                onSelect={(value: string) => setFieldValue('gender', value)}
              />
              <Radio
                value={Genders.female}
                label={t(`common.${Genders.female}`)}
                isActive={values.gender === Genders.female}
                onSelect={(value: string) => setFieldValue('gender', value)}
              />
              <Radio
                value={Genders.other}
                label={t(`common.${Genders.other}`)}
                isActive={values.gender === Genders.other}
                onSelect={(value: string) => setFieldValue('gender', value)}
              />
            </FormItem>
          </Container>
        );
      }}
    </Formik>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
