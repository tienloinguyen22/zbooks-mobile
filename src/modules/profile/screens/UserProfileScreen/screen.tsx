import React from 'react';
import { ScreenProps, screenNames, colors } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container, View, FormItem, Input, Touchable, ScrollView } from '@app/components';
import { navigationService } from '@app/services';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import { ProfilePicture } from './components';
import { styles } from './styles';

type Props = ScreenProps;

const MY_PROFILE = gql`
  query GetMyProfile {
    currentUser @client {
      id
      email
      fullName
      countryCode
      phoneNo
      address
      avatarUrl
      dob
      gender
      firebaseId
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { data } = useQuery(MY_PROFILE);

  const navigateToEditEmailScreen = (): void => {
    navigationService.navigateTo({
      componentId: props.componentId,
      screenName: screenNames.EditEmailScreen,
      options: {
        passProps: {
          showHeader: true,
          showBackButton: true,
          headerTitle: t('editEmailScreen.headerTitle'),
          rightIcon: 'check',
          rightIconColor: colors.link,
          email: _.get(data, 'currentUser.email'),
        },
      },
    });
  };

  const navigateToEditFullNameScreen = (): void => {
    navigationService.navigateTo({
      componentId: props.componentId,
      screenName: screenNames.EditFullnameScreen,
      options: {
        passProps: {
          showHeader: true,
          showBackButton: true,
          headerTitle: t('editFullnameScreen.headerTitle'),
          rightIcon: 'check',
          rightIconColor: colors.link,
          fullName: _.get(data, 'currentUser.fullName'),
        },
      },
    });
  };

  const navigateToEditPhoneNoScreen = (): void => {
    navigationService.navigateTo({
      componentId: props.componentId,
      screenName: screenNames.EditPhoneNoScreen,
      options: {
        passProps: {
          showHeader: true,
          showBackButton: true,
          headerTitle: t('editPhoneNoScreen.headerTitle'),
          rightIcon: 'check',
          rightIconColor: colors.link,
          countryCode: _.get(data, 'currentUser.countryCode'),
          phoneNo: _.get(data, 'currentUser.phoneNo'),
        },
      },
    });
  };

  const navigateToEditGenderScreen = (): void => {
    navigationService.navigateTo({
      componentId: props.componentId,
      screenName: screenNames.EditGenderScreen,
      options: {
        passProps: {
          showHeader: true,
          showBackButton: true,
          headerTitle: t('editGenderScreen.headerTitle'),
          rightIcon: 'check',
          rightIconColor: colors.link,
          gender: _.get(data, 'currentUser.gender'),
        },
      },
    });
  };

  return (
    <Container {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfilePicture avatarUrl={_.get(data, 'currentUser.avatarUrl')} />

        <View>
          <Touchable
            onPress={navigateToEditFullNameScreen}
            hitSlop={{
              bottom: 20,
            }}
          >
            <FormItem label={t('userProfileScreen.fullName')}>
              <Input
                value={_.get(data, 'currentUser.fullName')}
                editable={false}
                pointerEvents='none'
                placeholder={t('userProfileScreen.fullnamePlaceholder')}
                style={styles.input}
              />
            </FormItem>
          </Touchable>

          <Touchable
            onPress={navigateToEditEmailScreen}
            hitSlop={{
              bottom: 20,
            }}
          >
            <FormItem label={t('userProfileScreen.email')}>
              <Input
                value={_.get(data, 'currentUser.email')}
                editable={false}
                pointerEvents='none'
                placeholder={t('userProfileScreen.emailPlaceholder')}
                style={styles.input}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            </FormItem>
          </Touchable>

          <Touchable
            onPress={navigateToEditPhoneNoScreen}
            hitSlop={{
              bottom: 20,
            }}
          >
            <FormItem label={t('userProfileScreen.phoneNo')}>
              <Input
                value={_.get(data, 'currentUser.phoneNo')}
                editable={false}
                pointerEvents='none'
                placeholder={t('userProfileScreen.phoneNoPlaceholder')}
                style={styles.input}
              />
            </FormItem>
          </Touchable>

          <Touchable
            onPress={navigateToEditGenderScreen}
            hitSlop={{
              bottom: 20,
            }}
          >
            <FormItem label={t('userProfileScreen.gender')}>
              <Input
                value={_.get(data, 'currentUser.gender') ? _.capitalize(_.get(data, 'currentUser.gender')) : ''}
                editable={false}
                pointerEvents='none'
                placeholder={t('userProfileScreen.genderPlaceholder')}
                style={styles.input}
              />
            </FormItem>
          </Touchable>
        </View>
      </ScrollView>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
