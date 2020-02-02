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

const keyExtractor = (_item: FavoriteBook[], index: number): string => `${index}`;
const itemsPerPage = 8;
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

const formatFavoriteBookData = (data: FavoriteBook[]): FavoriteBook[][] => {
  const result: FavoriteBook[][] = [];
  let temporaryItem: FavoriteBook[] = [];
  data.forEach((item) => {
    if (temporaryItem.length < 2) {
      temporaryItem.push(item);
    } else {
      result.push(temporaryItem);
      temporaryItem = [];
      temporaryItem.push(item);
    }
  });
  result.push(temporaryItem);

  return result;
};

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [numberOfFavoriteBooks, setNumberOfFavoriteBooks] = useState<number>(0);
  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[][]>([]);

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

      const data = _.get(getFavoriteBooksResult, 'data.favorite_books.find.data', []);
      setFavoriteBooks([...favoriteBooks, ...formatFavoriteBookData(data)]);
      setNumberOfFavoriteBooks(numberOfFavoriteBooks + data.length);
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
    if (numberOfFavoriteBooks < total && !loading) {
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

  const renderFavoriteBook = ({ item }: ListRenderItemInfo<FavoriteBook[]>): JSX.Element => {
    return (
      <View center row spread>
        <View flex={1}>
          <BookCard.Small
            coverUrl={_.get(item, '0.book.coverUrl')}
            author={_.get(item, '0.book.author')}
            title={_.get(item, '0.book.title')}
            onPress={() => navigateToBookDetailScreen(_.get(item, '0.book.id'), _.get(item, '0.book.title'))}
          />
        </View>
        <View flex={1}>
          {item[1] ? (
            <BookCard.Small
              coverUrl={_.get(item, '1.book.coverUrl')}
              author={_.get(item, '1.book.author')}
              title={_.get(item, '1.book.title')}
              onPress={() => navigateToBookDetailScreen(_.get(item, '1.book.id'), _.get(item, '1.book.title'))}
            />
          ) : (
            <></>
          )}
        </View>
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

    if (numberOfFavoriteBooks >= total) {
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
        contentContainerStyle={styles.flatlist}
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
