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
import { LargeList, IndexPath } from 'react-native-largelist-v3';
import { KeyboardAvoidingView } from 'react-native';
import { jsonSources, CountryCode } from '@app/assets';
import { config } from '@app/config';
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
  const [countries, setCountries] = useState<CountryCode[]>([]);
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

  const renderIndexPath = (indexPath: IndexPath, setFieldValue: (key: string, value: string) => void): JSX.Element => {
    const country = countries[indexPath.row];

    const selectCountryCode = (): void => {
      setFieldValue('countryCode', _.get(country, 'dialCode', ''));
      closeCountryCodeModal();
    };

    return (
      <Touchable onPress={selectCountryCode}>
        <View row centerVertical style={styles.countryCodeItem}>
          <Text numberOfLines={1}>
            {_.get(country, 'name', '')} ({_.get(country, 'dialCode', '')})
          </Text>
        </View>
      </Touchable>
    );
  };

  const handleSearchCountryCode = (value: string): void => {
    if (!value) {
      setCountries(jsonSources.countries());
    } else {
      const regex = new RegExp(value, 'i');

      const searchCountriesResult = jsonSources.countries().filter((item) => {
        return regex.test(item.name) || regex.test(item.dialCode);
      });

      setCountries(searchCountriesResult);
    }
  };

  const onCountryCodesModalShow = (): void => {
    if (!countries || !countries.length) {
      setCountries(jsonSources.countries());
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
    [fieldNames.lineNo]: yup
      .string()
      .required(t('editPhoneNoScreen.pleaseInputPhoneNo'))
      .matches(config.regex.phone, t('editPhoneNoScreen.invalidPhoneNo')),
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

              <Modal
                deviceWidth={layouts.deviceWidth}
                deviceHeight={layouts.deviceHeight}
                isVisible={countryCodeModalVisible}
                onBackButtonPress={closeCountryCodeModal}
                onBackdropPress={closeCountryCodeModal}
                onModalShow={onCountryCodesModalShow}
              >
                <KeyboardAvoidingView behavior='position' enabled>
                  <View style={styles.modalContainer}>
                    <Input
                      placeholder={t('editPhoneNoScreen.countryCodePlaceholder')}
                      style={commonStyles.maxWidth}
                      icon='search-web'
                      onChangeText={handleSearchCountryCode}
                    />

                    <LargeList
                      style={styles.countryCodeContainer}
                      data={[
                        {
                          items: countries,
                        },
                      ]}
                      heightForIndexPath={() => 42}
                      renderIndexPath={(indexPath: IndexPath) => renderIndexPath(indexPath, setFieldValue)}
                    />
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            </Container>
          );
        }}
      </Formik>
    </>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
