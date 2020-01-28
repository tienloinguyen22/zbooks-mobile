import React, { useState, useEffect } from 'react';
import { ScreenProps, FavoriteBook, showNotification, NotificationTypes, colors, screenNames } from '@app/core';
import { Container, BookCard, View, Text } from '@app/components';
import { FlatList, ListRenderItemInfo, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import gql from 'graphql-tag';
import { apolloClient } from '@app/graphql';
import { navigationService } from '@app/services';
import { styles } from './styles';

type Props = ScreenProps;

const keyExtractor = (_item: FavoriteBook, index: number): string => `${index}`;
const itemsPerPage = 4;
const orderBy = `createdAt_desc`;

const FAVORITE_BOOKS = gql`
  query GetFavoriteBooks($payload: FindFavoriteBooksQuery!) {
    favorite_books {
      find(payload: $payload) {
        data {
          id
          book {
            id
            coverUrl
            author
            title
          }
        }
        pagination {
          total
        }
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[]>([]);

  const getFavoriteBooks = async (): Promise<void> => {
    try {
      setLoading(true);
      const getFavoriteBooksResult = await apolloClient.query({
        query: FAVORITE_BOOKS,
        variables: {
          payload: {
            orderBy,
            pageIndex,
            itemsPerPage,
          },
        },
      });
      setFavoriteBooks([...favoriteBooks, ..._.get(getFavoriteBooksResult, 'data.favorite_books.find.data', [])]);
      setTotal(_.get(getFavoriteBooksResult, 'data.favorite_books.find.pagination.total'));
    } catch (error) {
      showNotification({
        type: NotificationTypes.ERROR,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = (): void => {
    if (favoriteBooks.length < total && !loading) {
      setPageIndex(pageIndex + 1);
    }
  };

  useEffect(() => {
    getFavoriteBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

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

  const renderFavoriteBook = ({ item }: ListRenderItemInfo<FavoriteBook>): JSX.Element => {
    return (
      <View center>
        <BookCard.Large
          coverUrl={_.get(item, 'book.coverUrl')}
          author={_.get(item, 'book.author')}
          title={_.get(item, 'book.title')}
          onPress={() => navigateToBookDetailScreen(_.get(item, 'book.id'), _.get(item, 'book.title'))}
        />
      </View>
    );
  };

  const renderFooter = (): JSX.Element => {
    if (loading) {
      return (
        <View center style={styles.loadingPadding}>
          <ActivityIndicator size='small' color={colors.primaryColor} />
        </View>
      );
    }

    if (favoriteBooks.length >= total) {
      return (
        <View center style={styles.loadingPadding}>
          <Text s2 italic style={styles.greyText} textCenter>
            {t('common.youReachedTheEnd')}
          </Text>
        </View>
      );
    }

    return <></>;
  };

  return (
    <Container showHeader headerTitle={t('favoriteBooksScreen.myFavorites')}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={favoriteBooks}
        renderItem={renderFavoriteBook}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter()}
      />
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
