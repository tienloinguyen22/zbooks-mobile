import React, { useState } from 'react';
import { ScreenProps, commonStyles, showNotification, NotificationTypes, colors, getLayout } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container, Text, View, FormItem, Input, Touchable, Icon } from '@app/components';
import { Formik, FormikContext } from 'formik';
import * as yup from 'yup';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import gql from 'graphql-tag';
import _ from 'lodash';
import { navigationService } from '@app/services';
import Modal from 'react-native-modal';
import { styles } from './styles';

type Props = {
  countryCode: string;
  phoneNo: string;
} & ScreenProps;

interface Values {
  countryCode: string;
  lineNo: string;
}

const fieldNames = {
  countryCode: 'countryCode',
  lineNo: 'lineNo',
};

const UPDATE_PHONE_NO = gql`
  mutation UpdatePhoneNo($payload: UpdateUserInfoPayload!) {
    users {
      me(payload: $payload) {
        id
        countryCode
        phoneNo
      }
    }
  }
`;

const layouts = getLayout();

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState<boolean>(false);

  const openCountryCodeModal = (): void => {
    setCountryCodeModalVisible(true);
  };

  const closeCountryCodeModal = (): void => {
    setCountryCodeModalVisible(false);
  };

  const handleUpdatePhoneNo = async (values: Values): Promise<void> => {
    try {
      setLoading(true);
      const updateUserResult = await apolloClient.mutate({
        mutation: UPDATE_PHONE_NO,
        variables: {
          payload: {
            countryCode: values.countryCode,
            phoneNo: `${values.countryCode}${values.lineNo}`,
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

  const countryCode = _.get(props, 'countryCode') || '+84';
  const phoneNo = _.get(props, 'phoneNo') || '';
  const lineNo = phoneNo.replace(countryCode, '');

  const initialValues = {
    countryCode,
    lineNo,
  };

  const validationSchema = yup.object().shape({
    [fieldNames.countryCode]: yup.string().required(t('editPhoneNoScreen.pleaseSelectCountryCode')),
    [fieldNames.lineNo]: yup.string().required(t('editPhoneNoScreen.pleaseInputPhoneNo')),
  });

  return (
    <>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdatePhoneNo}
      >
        {(context: FormikContext<Values>) => {
          const { values, errors, setFieldValue, handleSubmit } = context;

          return (
            <Container {...props} onRightButtonPress={handleSubmit} loading={loading}>
              <View style={styles.titleContainer}>
                <Text bold textCenter>
                  {t('editPhoneNoScreen.enterYourPhoneNo')}
                </Text>
              </View>

              <FormItem error={errors.countryCode || errors.lineNo}>
                <Input
                  addonBefore={
                    <Touchable onPress={openCountryCodeModal} style={styles.countryCodeButton}>
                      <Text style={[styles.countryCodeText, commonStyles.textCenter]}>{values.countryCode}</Text>
                      <Icon name='chevron-down' color={colors.grey} size={20} />
                    </Touchable>
                  }
                  value={values.lineNo}
                  placeholder={t('editPhoneNoScreen.phoneNoPlaceholder')}
                  style={commonStyles.maxWidth}
                  onChangeText={(value: string) => setFieldValue('lineNo', value)}
                  keyboardType='number-pad'
                />
              </FormItem>
            </Container>
          );
        }}
      </Formik>

      <Modal
        deviceWidth={layouts.deviceWidth}
        deviceHeight={layouts.deviceHeight}
        isVisible={countryCodeModalVisible}
        onBackButtonPress={closeCountryCodeModal}
        onBackdropPress={closeCountryCodeModal}
      >
        <View style={styles.modalContainer}>
          <Input
            placeholder={t('editPhoneNoScreen.countryCodePlaceholder')}
            style={commonStyles.maxWidth}
            icon='search-web'
          />
        </View>
      </Modal>
    </>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
