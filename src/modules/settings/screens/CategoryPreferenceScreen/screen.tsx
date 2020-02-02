import React, { useState } from 'react';
import { ScreenProps, showNotification, NotificationTypes } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container, View, Text, Radio } from '@app/components';
import { LargeList, IndexPath } from 'react-native-largelist-v3';
import gql from 'graphql-tag';
import { jsonSources } from '@app/assets';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import { navigationService } from '@app/services';
import { styles } from './styles';

type Props = ScreenProps;

const categories = jsonSources.categories();
const categoryGroups = Object.keys(categories);
const largeListData = categoryGroups.map((item: string) => {
  return {
    items: categories[item],
  };
});

const CURRENT_USER_PREFERENCE_CATEGORIES = gql`
  query GetCurrentUserPreferenceCategories {
    currentUser @client {
      id
      preferenceCategories
    }
  }
`;

const UPDATE_PREFERENCE_CATEGORIES = gql`
  mutation UpdatePreferenceCategories($payload: UpdateUserInfoPayload!) {
    users {
      me(payload: $payload) {
        id
        preferenceCategories
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const userPreferenceCategoriesQuery = useQuery(CURRENT_USER_PREFERENCE_CATEGORIES);

  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    _.get(userPreferenceCategoriesQuery, 'data.currentUser.preferenceCategories', []),
  );

  const onSelect = (value: string): void => {
    const valueIndex = selectedCategories.indexOf(value);
    if (valueIndex > -1) {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      const updateUserResult = await apolloClient.mutate({
        mutation: UPDATE_PREFERENCE_CATEGORIES,
        variables: {
          payload: {
            preferenceCategories: selectedCategories,
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

  const renderIndexPath = (indexPath: IndexPath): JSX.Element => {
    const categoryGroup = categoryGroups[indexPath.section];
    const category = categories[categoryGroup][indexPath.row];

    return (
      <View flex={1} centerVertical>
        <Radio value={category} label={category} isActive={selectedCategories.includes(category)} onSelect={onSelect} />
      </View>
    );
  };

  if (userPreferenceCategoriesQuery.loading) {
    return <></>;
  }

  return (
    <Container {...props} onRightButtonPress={handleSubmit} loading={loading}>
      <View style={styles.titleContainer}>
        <Text bold textCenter>
          {t('categoryPreferenceScreen.selectYourFavoriteCategories')}
        </Text>
      </View>

      <View style={styles.categoryList}>
        <LargeList
          data={largeListData}
          heightForIndexPath={() => 42}
          renderIndexPath={renderIndexPath}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
