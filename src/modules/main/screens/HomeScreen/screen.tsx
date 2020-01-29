import React from 'react';
import { ScreenProps, Book, screenNames } from '@app/core';
import { Container, Text, Divider, View, BookCard } from '@app/components';
import { navigationService } from '@app/services';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import _ from 'lodash';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';

import { styles } from './styles';

type Props = ScreenProps;

const BOOKS_AND_CURRENT_USER = gql`
  query GetBooksAndCurrentUser(
    $trendingPayload: FindBooksQuery!
    $newReleasePayload: FindBooksQuery!
    $selectedForYouPayload: FindBooksQuery!
  ) {
    currentUser @client {
      fullName
    }
    trendingBooks: books {
      find(payload: $trendingPayload) {
        data {
          id
          title
          coverUrl
        }
      }
    }
    newReleaseBooks: books {
      find(payload: $newReleasePayload) {
        data {
          id
          title
          author
          coverUrl
        }
      }
    }
    selectedForYouBooks: books {
      findByUserPreferences(payload: $selectedForYouPayload) {
        data {
          id
          title
          author
          coverUrl
        }
      }
    }
  }
`;

const keyExtractor = (_item: Book, index: number): string => `${index}`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  const booksAndCurrentUserQuery = useQuery(BOOKS_AND_CURRENT_USER, {
    variables: {
      trendingPayload: {
        orderBy: 'downloadCount_desc',
        pageIndex: 0,
        itemsPerPage: 10,
      },
      newReleasePayload: {
        orderBy: 'createdAt_desc',
        pageIndex: 0,
        itemsPerPage: 10,
      },
      selectedForYouPayload: {
        orderBy: 'createdAt_desc',
        pageIndex: 0,
        itemsPerPage: 10,
      },
    },
  });

  const navigateToBookDetailScreen = (bookId: string, title: string): void => {
    navigationService.navigateTo({
      componentId: props.componentId,
      screenName: screenNames.BookDetailScreen,
      options: {
        passProps: {
          showHeader: true,
          showBackButton: true,
          headerTitle: title,
          id: bookId,
        },
      },
    });
  };

  const renderLargeItem = ({ item }: ListRenderItemInfo<Book>): JSX.Element => {
    return <BookCard.Large coverUrl={item.coverUrl} onPress={() => navigateToBookDetailScreen(item.id, item.title)} />;
  };

  const renderSmallItem = ({ item }: ListRenderItemInfo<Book>): JSX.Element => {
    return (
      <BookCard.Small
        coverUrl={item.coverUrl}
        author={item.author}
        title={item.title}
        onPress={() => navigateToBookDetailScreen(item.id, item.title)}
      />
    );
  };

  // const retrieveIdToken = async (): Promise<void> => {
  //   const idToken = await authService.getIdToken();
  //   console.log('TCL: idToken', idToken);
  // };

  // useEffectOnce(() => {
  //   retrieveIdToken();
  // });

  if (booksAndCurrentUserQuery.loading) {
    return <></>;
  }

  return (
    <Container componentId={props.componentId}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text h4 style={styles.title}>
          {t('homeScreen.hi')} {_.get(booksAndCurrentUserQuery, 'data.currentUser.fullName', '')},
        </Text>
        <Text italic style={styles.quote}>
          {t('homeScreen.betweenThePagesOfABookIsALovelyPlaceToBe')}
        </Text>
        <Divider />

        <View>
          <View style={styles.bookSectionTitleContainer}>
            <Text bold>{t('homeScreen.trending')}</Text>
          </View>
          <FlatList
            style={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={keyExtractor}
            data={_.get(booksAndCurrentUserQuery, 'data.trendingBooks.find.data', [])}
            renderItem={renderLargeItem}
          />
          <Divider />
        </View>

        <View>
          <View style={styles.bookSectionTitleContainer}>
            <Text bold>{t('homeScreen.newUpdated')}</Text>
          </View>
          <FlatList
            style={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={keyExtractor}
            data={_.get(booksAndCurrentUserQuery, 'data.newReleaseBooks.find.data', [])}
            renderItem={renderSmallItem}
          />
          <Divider />
        </View>

        <View>
          <View style={styles.bookSectionTitleContainer}>
            <Text bold>{t('homeScreen.selectedForYou')}</Text>
          </View>
          <FlatList
            style={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={keyExtractor}
            data={_.get(booksAndCurrentUserQuery, 'data.selectedForYouBooks.findByUserPreferences.data', [])}
            renderItem={renderSmallItem}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
