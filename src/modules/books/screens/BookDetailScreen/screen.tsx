import React, { useState } from 'react';
import { ScreenProps, commonStyles, colors, showNotification, NotificationTypes } from '@app/core';
import { useQuery, gql } from '@apollo/client';
import _ from 'lodash';
import { Container, View, Image, Text, Divider, ScrollView, Button, Icon } from '@app/components';
import { useTranslation } from 'react-i18next';
import HTML from 'react-native-render-html';
import { apolloClient } from '@app/graphql';
import { styles } from './styles';

type Props = {
  id: string;
} & ScreenProps;

const BOOK_DETAIL = gql`
  query GetBookDetail($id: ID!, $payload: FindByBookQuery!) {
    favorite_books {
      findByBook(payload: $payload) {
        id
      }
    }
    books {
      findById(id: $id) {
        id
        title
        author
        coverUrl
        category
        year
        pages
        description
      }
    }
  }
`;

const SAVE_FAVORITE_BOOK = gql`
  mutation SaveFavoriteBook($payload: FindByBookQuery!) {
    favorite_books {
      create(payload: $payload) {
        id
      }
    }
  }
`;

const REMOVE_FAVORITE_BOOK = gql`
  mutation SaveFavoriteBook($payload: FindByBookQuery!) {
    favorite_books {
      delete(payload: $payload)
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const bookDetailQuery = useQuery(BOOK_DETAIL, {
    variables: {
      id: props.id,
      payload: {
        book: props.id,
      },
    },
    onCompleted: (data) => {
      setIsSaved(Boolean(_.get(data, 'favorite_books.findByBook.id')));
    },
  });

  const removeFromFavorites = async (): Promise<void> => {
    try {
      setLoading(true);
      await apolloClient.mutate({
        mutation: REMOVE_FAVORITE_BOOK,
        variables: {
          payload: {
            book: props.id,
          },
        },
      });
      setIsSaved(false);
    } catch (error) {
      showNotification({
        type: NotificationTypes.ERROR,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const saveToFavorites = async (): Promise<void> => {
    try {
      setLoading(true);
      await apolloClient.mutate({
        mutation: SAVE_FAVORITE_BOOK,
        variables: {
          payload: {
            book: props.id,
          },
        },
      });
      setIsSaved(true);
    } catch (error) {
      showNotification({
        type: NotificationTypes.ERROR,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (bookDetailQuery.loading) {
    return <></>;
  }

  const bookInfo = _.get(bookDetailQuery, 'data.books.findById', {});
  const bookCategories = _.get(bookInfo, 'category', []).filter((item: string) => !!item);

  return (
    <>
      <Container componentId={props.componentId} showHeader showBackButton {...props}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <View column center>
            <View style={[styles.coverContainer, commonStyles.boxShadow]}>
              <Image
                source={{
                  uri: bookInfo.coverUrl,
                }}
                style={styles.cover}
              />
            </View>

            <View style={styles.nameContainer}>
              <Text h6 bold textCenter>
                {bookInfo.title}
              </Text>
              <Text style={styles.author} textCenter>
                {bookInfo.author}
              </Text>
            </View>
          </View>

          <Divider />

          <View row>
            <View flex={2} style={styles.bookInfoContainer}>
              <Text s2 style={styles.greyTitle}>
                {t('bookDetailScreen.category')}
              </Text>
              {bookCategories.length === 0 ? (
                <Text bold>N/A</Text>
              ) : (
                bookCategories.map((item: string, index: number) => {
                  return (
                    <Text bold key={index}>
                      {item}
                    </Text>
                  );
                })
              )}
            </View>
            <View flex={1} style={styles.bookInfoContainer}>
              <Text s2 style={styles.greyTitle}>
                {t('bookDetailScreen.year')}
              </Text>
              <Text bold numberOfLines={1}>
                {bookInfo.year ? bookInfo.year : 'N/A'}
              </Text>
              <View />
            </View>
            <View flex={1}>
              <Text s2 style={styles.greyTitle}>
                {t('bookDetailScreen.pages')}
              </Text>
              <Text bold numberOfLines={1}>
                {Number(bookInfo.pages) ? bookInfo.pages : 'N/A'}
              </Text>
              <View />
            </View>
          </View>

          <View>
            <Text s2 style={styles.greyTitle}>
              {t('bookDetailScreen.description')}
            </Text>
            <HTML html={bookInfo.description ? bookInfo.description : 'N/A'} />
          </View>
        </ScrollView>
      </Container>

      <View style={[styles.saveButtonContainer, commonStyles.boxShadow]}>
        <Button
          small
          style={[styles.saveButton, commonStyles.boxShadow]}
          onPress={isSaved ? removeFromFavorites : saveToFavorites}
          disabled={loading}
        >
          <Icon name={isSaved ? 'check' : 'heart-outline'} color={colors.white} size={20} style={styles.saveIcon} />
          <Text s2 style={styles.saveText}>
            {isSaved ? t('bookDetailScreen.saved') : t('bookDetailScreen.saveToFavorites')}
          </Text>
        </Button>
      </View>
    </>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
